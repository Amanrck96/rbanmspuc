import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";

export async function GET() {
  try {
    const items = await prisma.galleryItem.findMany({
      orderBy: { order: "asc" },
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

    const body = await req.json();
    const item = await prisma.galleryItem.create({
      data: {
        title: body.title,
        category: body.category || "CAMPUS",
        type: body.type || "IMAGE",
        url: body.url,
        caption: body.caption || null,
        isFeatured: body.isFeatured || false,
        order: parseInt(body.order) || 0,
      },
    });

    try {
      revalidatePath("/", "layout");
      revalidatePath("/media/photo-gallery");
    } catch {}

    return NextResponse.json({ success: true, item });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
