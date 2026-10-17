import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";
import { stageDeletedItem } from "@/lib/activity";

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const user = await getCurrentUser();
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { id } = await params;
    const body = await req.json();

    const updated = await prisma.achievement.update({
      where: { id },
      data: body,
    });

    try {
      revalidatePath("/", "layout");
      revalidatePath("/student-life/student-achievements");
    } catch {}

    return NextResponse.json({ success: true, achievement: updated });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const user = await getCurrentUser();
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { id } = await params;
    const existing = await prisma.achievement.findUnique({ where: { id } });
    if (!existing) return NextResponse.json({ error: "Achievement not found" }, { status: 404 });

    await stageDeletedItem({
      entityType: "ACHIEVEMENT",
      entityId: existing.id,
      entityName: existing.title,
      originalData: existing,
      deletedBy: user.name,
    });

    await prisma.achievement.delete({ where: { id } });

    try {
      revalidatePath("/", "layout");
      revalidatePath("/student-life/student-achievements");
    } catch {}

    return NextResponse.json({ success: true });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
