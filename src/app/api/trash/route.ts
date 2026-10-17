import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";
import { logActivity } from "@/lib/activity";

export async function GET() {
  try {
    const user = await getCurrentUser();
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const items = await prisma.deletedItem.findMany({
      orderBy: { deletedAt: "desc" },
    });
    return NextResponse.json({ success: true, items });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const user = await getCurrentUser();
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { id } = await req.json();
    const item = await prisma.deletedItem.findUnique({ where: { id } });
    if (!item) return NextResponse.json({ error: "Item not found in trash" }, { status: 404 });

    const data = JSON.parse(item.originalData);

    // Restore depending on entityType
    if (item.entityType === "PAGE") {
      await prisma.page.create({ data });
    } else if (item.entityType === "NOTICE") {
      await prisma.notice.create({ data });
    } else if (item.entityType === "EVENT") {
      await prisma.event.create({ data });
    } else if (item.entityType === "NEWS") {
      await prisma.news.create({ data });
    } else if (item.entityType === "COURSE") {
      await prisma.course.create({ data });
    } else if (item.entityType === "FACULTY") {
      await prisma.faculty.create({ data });
    } else if (item.entityType === "FAQ") {
      await prisma.faq.create({ data });
    } else if (item.entityType === "DOWNLOAD") {
      await prisma.downloadItem.create({ data });
    } else if (item.entityType === "GALLERY") {
      await prisma.galleryItem.create({ data });
    } else if (item.entityType === "ACHIEVEMENT") {
      await prisma.achievement.create({ data });
    }

    await prisma.deletedItem.delete({ where: { id } });

    await logActivity({
      userName: user.name,
      userRole: user.role,
      action: "RESTORE",
      entityType: item.entityType,
      entityId: item.entityId,
      details: `Restored deleted ${item.entityType.toLowerCase()} "${item.entityName}"`,
    });

    try {
      revalidatePath("/", "layout");
    } catch {}

    return NextResponse.json({ success: true, message: "Restored successfully" });
  } catch (err: any) {
    console.error("Restore error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
