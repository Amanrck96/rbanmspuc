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

    const existing = await prisma.downloadItem.findUnique({ where: { id } });
    if (!existing) return NextResponse.json({ error: "Download not found" }, { status: 404 });

    const updated = await prisma.downloadItem.update({
      where: { id },
      data: body,
    });

    try {
      revalidatePath("/", "layout");
      revalidatePath("/admissions/downloads-forms");
    } catch {}

    return NextResponse.json({ success: true, download: updated });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const user = await getCurrentUser();
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { id } = await params;
    const existing = await prisma.downloadItem.findUnique({ where: { id } });
    if (!existing) return NextResponse.json({ error: "Download not found" }, { status: 404 });

    await stageDeletedItem({
      entityType: "DOWNLOAD",
      entityId: existing.id,
      entityName: existing.title,
      originalData: existing,
      deletedBy: user.name,
    });

    await prisma.downloadItem.delete({ where: { id } });

    try {
      revalidatePath("/", "layout");
      revalidatePath("/admissions/downloads-forms");
    } catch {}

    return NextResponse.json({ success: true });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
