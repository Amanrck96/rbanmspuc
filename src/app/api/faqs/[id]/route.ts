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

    const updated = await prisma.faq.update({
      where: { id },
      data: {
        ...body,
        order: body.order !== undefined ? parseInt(body.order) : undefined,
      },
    });

    try {
      revalidatePath("/", "layout");
      revalidatePath("/admissions/faqs");
    } catch {}

    return NextResponse.json({ success: true, faq: updated });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const user = await getCurrentUser();
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { id } = await params;
    const existing = await prisma.faq.findUnique({ where: { id } });
    if (!existing) return NextResponse.json({ error: "FAQ not found" }, { status: 404 });

    await stageDeletedItem({
      entityType: "FAQ",
      entityId: existing.id,
      entityName: existing.question,
      originalData: existing,
      deletedBy: user.name,
    });

    await prisma.faq.delete({ where: { id } });

    try {
      revalidatePath("/", "layout");
      revalidatePath("/admissions/faqs");
    } catch {}

    return NextResponse.json({ success: true });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
