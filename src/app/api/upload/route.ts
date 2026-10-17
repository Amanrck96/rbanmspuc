import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import fs from "fs/promises";
import path from "path";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";
import { logActivity } from "@/lib/activity";

export async function POST(req: Request) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const formData = await req.formData();
    const file = formData.get("file") as File | null;
    const replaceFileName = formData.get("replaceFileName") as string | null;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const uploadsDir = path.join(process.cwd(), "public", "uploads");
    await fs.mkdir(uploadsDir, { recursive: true });

    let finalFileName: string;

    if (replaceFileName) {
      // Direct replacement - sanitizing filename
      const safeName = path.basename(replaceFileName);
      finalFileName = safeName;
    } else {
      // Create new unique name
      const ext = path.extname(file.name) || ".jpg";
      const baseName = path
        .basename(file.name, ext)
        .toLowerCase()
        .replace(/[^a-z0-9]/g, "-")
        .slice(0, 30);
      finalFileName = `${baseName}-${Date.now()}${ext}`;
    }

    const filePath = path.join(uploadsDir, finalFileName);
    await fs.writeFile(filePath, buffer);

    const fileUrl = `/uploads/${finalFileName}`;

    // Upsert or create MediaFile record
    const media = await prisma.mediaFile.upsert({
      where: { fileName: finalFileName },
      update: {
        originalName: file.name,
        fileUrl,
        mimeType: file.type || "application/octet-stream",
        size: buffer.length,
        uploadedBy: user.name,
      },
      create: {
        originalName: file.name,
        fileName: finalFileName,
        fileUrl,
        mimeType: file.type || "application/octet-stream",
        size: buffer.length,
        uploadedBy: user.name,
      },
    });

    await logActivity({
      userName: user.name,
      userRole: user.role,
      action: replaceFileName ? "UPDATE" : "CREATE",
      entityType: "MEDIA",
      entityId: media.id,
      details: `${replaceFileName ? "Replaced" : "Uploaded"} file ${finalFileName}`,
    });

    // On-demand revalidation to guarantee instant update on website
    try {
      revalidatePath("/", "layout");
    } catch {}

    return NextResponse.json({
      success: true,
      url: fileUrl,
      fileUrl,
      fileName: finalFileName,
      originalName: file.name,
      size: buffer.length,
      mimeType: file.type,
    });
  } catch (err: any) {
    console.error("Upload error:", err);
    return NextResponse.json({ error: err.message || "Failed to upload file" }, { status: 500 });
  }
}
