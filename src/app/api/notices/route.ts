import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";
import { logActivity } from "@/lib/activity";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const category = searchParams.get("category");
    const where: any = {};
    if (category) where.category = category;

    const notices = await prisma.notice.findMany({
      where,
      orderBy: [{ isPinned: "desc" }, { date: "desc" }],
    });
    return NextResponse.json({ success: true, notices });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const user = await getCurrentUser();
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const body = await req.json();
    const notice = await prisma.notice.create({
      data: {
        title: body.title,
        category: body.category || "NOTICE",
        description: body.description,
        fileUrl: body.fileUrl || null,
        isPinned: body.isPinned || false,
        isPublished: body.isPublished ?? true,
        date: body.date ? new Date(body.date) : new Date(),
      },
    });

    await logActivity({
      userName: user.name,
      userRole: user.role,
      action: "CREATE",
      entityType: "NOTICE",
      entityId: notice.id,
      details: `Created notice "${notice.title}"`,
    });

    try {
      revalidatePath("/", "layout");
      revalidatePath("/media/notice-board");
    } catch {}

    return NextResponse.json({ success: true, notice });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
