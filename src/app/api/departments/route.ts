import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";
import { logActivity } from "@/lib/activity";

export async function GET() {
  try {
    const departments = await prisma.department.findMany({
      include: { faculty: true },
      orderBy: { order: "asc" },
    });
    return NextResponse.json({ success: true, departments });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const user = await getCurrentUser();
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const body = await req.json();
    const dept = await prisma.department.create({
      data: {
        name: body.name,
        code: body.code.toUpperCase().trim(),
        stream: body.stream,
        description: body.description,
        hodName: body.hodName,
        labs: body.labs || null,
        order: parseInt(body.order) || 0,
      },
    });

    await logActivity({
      userName: user.name,
      userRole: user.role,
      action: "CREATE",
      entityType: "DEPARTMENT",
      entityId: dept.id,
      details: `Created department ${dept.name}`,
    });

    return NextResponse.json({ success: true, department: dept });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
