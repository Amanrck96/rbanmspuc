import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";
import { logActivity, stageDeletedItem } from "@/lib/activity";

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const user = await getCurrentUser();
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { id } = await params;
    const body = await req.json();

    const existing = await prisma.course.findUnique({ where: { id } });
    if (!existing) return NextResponse.json({ error: "Course not found" }, { status: 404 });

    const updated = await prisma.course.update({
      where: { id },
      data: {
        ...body,
        code: body.code ? body.code.toUpperCase().trim() : undefined,
        intake: body.intake !== undefined ? parseInt(body.intake) : undefined,
        order: body.order !== undefined ? parseInt(body.order) : undefined,
      },
    });

    await logActivity({
      userName: user.name,
      userRole: user.role,
      action: "UPDATE",
      entityType: "COURSE",
      entityId: id,
      details: `Updated course ${updated.code}`,
    });

    try {
      revalidatePath("/", "layout");
      revalidatePath("/admissions/courses-offered");
    } catch {}

    return NextResponse.json({ success: true, course: updated });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const user = await getCurrentUser();
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { id } = await params;
    const existing = await prisma.course.findUnique({ where: { id } });
    if (!existing) return NextResponse.json({ error: "Course not found" }, { status: 404 });

    await stageDeletedItem({
      entityType: "COURSE",
      entityId: existing.id,
      entityName: `${existing.code}: ${existing.name}`,
      originalData: existing,
      deletedBy: user.name,
    });

    await prisma.course.delete({ where: { id } });

    await logActivity({
      userName: user.name,
      userRole: user.role,
      action: "DELETE",
      entityType: "COURSE",
      entityId: id,
      details: `Deleted course ${existing.code}`,
    });

    try {
      revalidatePath("/", "layout");
      revalidatePath("/admissions/courses-offered");
    } catch {}

    return NextResponse.json({ success: true });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
