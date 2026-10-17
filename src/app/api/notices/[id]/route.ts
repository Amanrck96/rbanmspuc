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

    const existing = await prisma.notice.findUnique({ where: { id } });
    if (!existing) return NextResponse.json({ error: "Notice not found" }, { status: 404 });

    const updated = await prisma.notice.update({
      where: { id },
      data: {
        ...body,
        date: body.date ? new Date(body.date) : undefined,
      },
    });

    await logActivity({
      userName: user.name,
      userRole: user.role,
      action: "UPDATE",
      entityType: "NOTICE",
      entityId: id,
      details: `Updated notice "${updated.title}"`,
    });

    try {
      revalidatePath("/", "layout");
      revalidatePath("/media/notice-board");
    } catch {}

    return NextResponse.json({ success: true, notice: updated });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const user = await getCurrentUser();
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { id } = await params;
    const existing = await prisma.notice.findUnique({ where: { id } });
    if (!existing) return NextResponse.json({ error: "Notice not found" }, { status: 404 });

    await stageDeletedItem({
      entityType: "NOTICE",
      entityId: existing.id,
      entityName: existing.title,
      originalData: existing,
      deletedBy: user.name,
    });

    await prisma.notice.delete({ where: { id } });

    await logActivity({
      userName: user.name,
      userRole: user.role,
      action: "DELETE",
      entityType: "NOTICE",
      entityId: id,
      details: `Deleted notice "${existing.title}"`,
    });

    try {
      revalidatePath("/", "layout");
      revalidatePath("/media/notice-board");
    } catch {}

    return NextResponse.json({ success: true });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
