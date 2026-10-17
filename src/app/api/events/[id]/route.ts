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

    const existing = await prisma.event.findUnique({ where: { id } });
    if (!existing) return NextResponse.json({ error: "Event not found" }, { status: 404 });

    const updated = await prisma.event.update({
      where: { id },
      data: {
        ...body,
        eventDate: body.eventDate ? new Date(body.eventDate) : undefined,
      },
    });

    await logActivity({
      userName: user.name,
      userRole: user.role,
      action: "UPDATE",
      entityType: "EVENT",
      entityId: id,
      details: `Updated event "${updated.title}"`,
    });

    try {
      revalidatePath("/", "layout");
      revalidatePath("/media/events");
    } catch {}

    return NextResponse.json({ success: true, event: updated });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const user = await getCurrentUser();
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { id } = await params;
    const existing = await prisma.event.findUnique({ where: { id } });
    if (!existing) return NextResponse.json({ error: "Event not found" }, { status: 404 });

    await stageDeletedItem({
      entityType: "EVENT",
      entityId: existing.id,
      entityName: existing.title,
      originalData: existing,
      deletedBy: user.name,
    });

    await prisma.event.delete({ where: { id } });

    await logActivity({
      userName: user.name,
      userRole: user.role,
      action: "DELETE",
      entityType: "EVENT",
      entityId: id,
      details: `Deleted event "${existing.title}"`,
    });

    try {
      revalidatePath("/", "layout");
      revalidatePath("/media/events");
    } catch {}

    return NextResponse.json({ success: true });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
