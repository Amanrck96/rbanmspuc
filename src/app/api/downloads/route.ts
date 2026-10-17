import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";
import { logActivity } from "@/lib/activity";

export async function GET() {
  try {
    const downloads = await prisma.downloadItem.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json({ success: true, downloads });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const user = await getCurrentUser();
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const body = await req.json();
    const item = await prisma.downloadItem.create({
      data: {
        title: body.title,
        category: body.category || "GENERAL",
        fileUrl: body.fileUrl,
        fileSize: body.fileSize || "PDF",
        fileType: body.fileType || "PDF",
      },
    });

    await logActivity({
      userName: user.name,
      userRole: user.role,
      action: "CREATE",
      entityType: "DOWNLOAD",
      entityId: item.id,
      details: `Added download item "${item.title}"`,
    });

    try {
      revalidatePath("/", "layout");
      revalidatePath("/admissions/downloads-forms");
    } catch {}

    return NextResponse.json({ success: true, download: item });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
