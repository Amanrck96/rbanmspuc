import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";
import { logActivity } from "@/lib/activity";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const section = searchParams.get("section");
    const slug = searchParams.get("slug");

    const where: any = {};
    if (section) where.section = section;
    if (slug) where.slug = slug;

    const pages = await prisma.page.findMany({
      where,
      orderBy: [{ section: "asc" }, { order: "asc" }],
    });

    return NextResponse.json({ success: true, pages });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const user = await getCurrentUser();
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const body = await req.json();
    const { slug, section, title, subtitle, content, bannerImage, isPublished, order } = body;

    if (!slug || !section || !title) {
      return NextResponse.json({ error: "Slug, section, and title are required" }, { status: 400 });
    }

    const cleanSlug = slug.toLowerCase().trim().replace(/[^a-z0-9-]/g, "-");

    const page = await prisma.page.create({
      data: {
        slug: cleanSlug,
        section,
        title,
        subtitle,
        content: content || "",
        bannerImage,
        isPublished: isPublished ?? true,
        order: order || 0,
      },
    });

    await logActivity({
      userName: user.name,
      userRole: user.role,
      action: "CREATE",
      entityType: "PAGE",
      entityId: page.id,
      details: `Created new page: "${page.title}" (/${page.section}/${page.slug})`,
    });

    try {
      revalidatePath("/", "layout");
      revalidatePath(`/${page.section}/${page.slug}`);
    } catch {}

    return NextResponse.json({ success: true, page });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
