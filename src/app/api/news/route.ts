import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";
import { logActivity } from "@/lib/activity";

export async function GET() {
  try {
    const news = await prisma.news.findMany({
      orderBy: { publishedDate: "desc" },
    });
    return NextResponse.json({ success: true, news });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const user = await getCurrentUser();
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const body = await req.json();
    const item = await prisma.news.create({
      data: {
        title: body.title,
        category: body.category || "GENERAL",
        summary: body.summary,
        content: body.content,
        imageUrl: body.imageUrl || null,
        isPublished: body.isPublished ?? true,
      },
    });

    await logActivity({
      userName: user.name,
      userRole: user.role,
      action: "CREATE",
      entityType: "NEWS",
      entityId: item.id,
      details: `Published news: "${item.title}"`,
    });

    try {
      revalidatePath("/", "layout");
      revalidatePath("/media/news");
    } catch {}

    return NextResponse.json({ success: true, news: item });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
