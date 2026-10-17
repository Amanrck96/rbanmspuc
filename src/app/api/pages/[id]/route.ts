import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";
import { logActivity, stageDeletedItem } from "@/lib/activity";

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const page = await prisma.page.findUnique({ where: { id } });
    if (!page) return NextResponse.json({ error: "Page not found" }, { status: 404 });
    return NextResponse.json({ success: true, page });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const user = await getCurrentUser();
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { id } = await params;
    const body = await req.json();

    const existing = await prisma.page.findUnique({ where: { id } });
    if (!existing) return NextResponse.json({ error: "Page not found" }, { status: 404 });

    const updated = await prisma.page.update({
      where: { id },
      data: body,
    });

    await logActivity({
      userName: user.name,
      userRole: user.role,
      action: "UPDATE",
      entityType: "PAGE",
      entityId: id,
      details: `Updated page content for "${updated.title}"`,
    });

    try {
      revalidatePath("/", "layout");
      revalidatePath(`/${updated.section}/${updated.slug}`);
    } catch {}

    return NextResponse.json({ success: true, page: updated });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const user = await getCurrentUser();
    if (!user || user.role === "RECEPTIONIST") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const existing = await prisma.page.findUnique({ where: { id } });
    if (!existing) return NextResponse.json({ error: "Page not found" }, { status: 404 });

    // Stage in Recycle Bin for undo/restore
    await stageDeletedItem({
      entityType: "PAGE",
      entityId: existing.id,
      entityName: existing.title,
      originalData: existing,
      deletedBy: user.name,
    });

    await prisma.page.delete({ where: { id } });

    await logActivity({
      userName: user.name,
      userRole: user.role,
      action: "DELETE",
      entityType: "PAGE",
      entityId: id,
      details: `Deleted page "${existing.title}"`,
    });

    try {
      revalidatePath("/", "layout");
    } catch {}

    return NextResponse.json({ success: true });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
