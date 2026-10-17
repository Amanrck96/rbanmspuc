import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifyPassword, signToken, AUTH_COOKIE_NAME } from "@/lib/auth";
import { logActivity } from "@/lib/activity";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const identifier = (body.emailOrUsername || body.email || body.username || "").toLowerCase().trim();
    const password = body.password;

    if (!identifier || !password) {
      return NextResponse.json({ error: "Email/username and password are required" }, { status: 400 });
    }

    const user = await prisma.user.findFirst({
      where: {
        OR: [
          { email: identifier },
          // Allow login by username 'admin' or 'staff'
          ...(identifier === "admin" ? [{ role: "SUPER_ADMIN" }] : []),
          ...(identifier === "staff" ? [{ role: "RECEPTIONIST" }] : []),
        ],
      },
    });

    if (!user || !user.isActive) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    const isValid = await verifyPassword(password, user.passwordHash);
    if (!isValid) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    const token = signToken({
      userId: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
    });

    await logActivity({
      userName: user.name,
      userRole: user.role,
      action: "LOGIN",
      entityType: "USER",
      entityId: user.id,
      details: `User ${user.email} logged into Admin CRM`,
    });

    const response = NextResponse.json({
      success: true,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });

    response.cookies.set(AUTH_COOKIE_NAME, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: "/",
    });

    return response;
  } catch (err: any) {
    console.error("Login error:", err);
    return NextResponse.json({ error: err.message || "Login failed" }, { status: 500 });
  }
}
