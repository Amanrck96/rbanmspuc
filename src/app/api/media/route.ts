import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import fs from "fs/promises";
import path from "path";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";
import { logActivity } from "@/lib/activity";

export async function GET() {
  try {
    const files = await prisma.mediaFile.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json({ success: true, files });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await req.json();
    if (!id) {
      return NextResponse.json({ error: "Missing file id" }, { status: 400 });
    }

    const media = await prisma.mediaFile.findUnique({ where: { id } });
    if (!media) {
      return NextResponse.json({ error: "Media not found" }, { status: 404 });
    }

    // Try deleting physical file
    try {
      const filePath = path.join(process.cwd(), "public", "uploads", media.fileName);
      await fs.unlink(filePath);
    } catch (e) {
      // File might already be gone
    }

    await prisma.mediaFile.delete({ where: { id } });

    await logActivity({
      userName: user.name,
      userRole: user.role,
      action: "DELETE",
      entityType: "MEDIA",
      entityId: id,
      details: `Deleted media file ${media.fileName}`,
    });

    try {
      revalidatePath("/", "layout");
    } catch {}

    return NextResponse.json({ success: true });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
