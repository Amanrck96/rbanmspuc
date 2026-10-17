import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";
import { logActivity } from "@/lib/activity";

export async function GET() {
  try {
    const faculty = await prisma.faculty.findMany({
      include: { department: true },
      orderBy: [{ department: { order: "asc" } }, { order: "asc" }],
    });
    return NextResponse.json({ success: true, faculty });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const user = await getCurrentUser();
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const body = await req.json();
    const fac = await prisma.faculty.create({
      data: {
        name: body.name,
        designation: body.designation,
        departmentId: body.departmentId,
        qualification: body.qualification,
        experience: body.experience,
        email: body.email || null,
        photoUrl: body.photoUrl || "/uploads/principal.svg",
        bio: body.bio || null,
        isPublished: body.isPublished ?? true,
        order: parseInt(body.order) || 0,
      },
    });

    await logActivity({
      userName: user.name,
      userRole: user.role,
      action: "CREATE",
      entityType: "FACULTY",
      entityId: fac.id,
      details: `Added faculty member ${fac.name}`,
    });

    try {
      revalidatePath("/", "layout");
      revalidatePath("/academics/faculty");
    } catch {}

    return NextResponse.json({ success: true, faculty: fac });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
