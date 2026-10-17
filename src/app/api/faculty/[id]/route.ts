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

    const existing = await prisma.faculty.findUnique({ where: { id } });
    if (!existing) return NextResponse.json({ error: "Faculty not found" }, { status: 404 });

    const updated = await prisma.faculty.update({
      where: { id },
      data: {
        ...body,
        order: body.order !== undefined ? parseInt(body.order) : undefined,
      },
    });

    await logActivity({
      userName: user.name,
      userRole: user.role,
      action: "UPDATE",
      entityType: "FACULTY",
      entityId: id,
      details: `Updated faculty member ${updated.name}`,
    });

    try {
      revalidatePath("/", "layout");
      revalidatePath("/academics/faculty");
    } catch {}

    return NextResponse.json({ success: true, faculty: updated });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const user = await getCurrentUser();
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { id } = await params;
    const existing = await prisma.faculty.findUnique({ where: { id } });
    if (!existing) return NextResponse.json({ error: "Faculty not found" }, { status: 404 });

    await stageDeletedItem({
      entityType: "FACULTY",
      entityId: existing.id,
      entityName: existing.name,
      originalData: existing,
      deletedBy: user.name,
    });

    await prisma.faculty.delete({ where: { id } });

    await logActivity({
      userName: user.name,
      userRole: user.role,
      action: "DELETE",
      entityType: "FACULTY",
      entityId: id,
      details: `Deleted faculty member ${existing.name}`,
    });

    try {
      revalidatePath("/", "layout");
      revalidatePath("/academics/faculty");
    } catch {}

    return NextResponse.json({ success: true });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
