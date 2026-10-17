import fs from "fs/promises";
import path from "path";

const MIME_TYPES: Record<string, string> = {
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".gif": "image/gif",
  ".pdf": "application/pdf",
  ".mp4": "video/mp4",
  ".webm": "video/webm",
  ".txt": "text/plain",
  ".csv": "text/csv",
};

export async function GET(
  req: Request,
  { params }: { params: Promise<{ filename: string[] }> }
) {
  try {
    const { filename } = await params;
    if (!filename || filename.length === 0) {
      return new Response("Not found", { status: 404 });
    }

    const safeRelativePath = filename.map((segment) => path.basename(segment)).join(path.sep);
    const uploadsDir = path.join(process.cwd(), "public", "uploads");
    const filePath = path.join(uploadsDir, safeRelativePath);

    // Prevent directory traversal
    if (!filePath.startsWith(uploadsDir)) {
      return new Response("Forbidden", { status: 403 });
    }

    const stat = await fs.stat(filePath);
    if (!stat.isFile()) {
      return new Response("Not found", { status: 404 });
    }

    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || "application/octet-stream";
    const fileBuffer = await fs.readFile(filePath);

    return new Response(fileBuffer, {
      status: 200,
      headers: {
        "Content-Type": contentType,
        "Content-Length": stat.size.toString(),
        "Cache-Control": "no-cache, no-store, must-revalidate",
        "Pragma": "no-cache",
        "Expires": "0",
        "Last-Modified": stat.mtime.toUTCString(),
      },
    });
  } catch (err: any) {
    if (err.code === "ENOENT") {
      return new Response("File not found", { status: 404 });
    }
    return new Response("Internal Server Error", { status: 500 });
  }
}
