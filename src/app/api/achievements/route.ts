import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";

export async function GET() {
  try {
    const achievements = await prisma.achievement.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json({ success: true, achievements });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const user = await getCurrentUser();
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const body = await req.json();
    const item = await prisma.achievement.create({
      data: {
        title: body.title,
        category: body.category || "STUDENT",
        recipient: body.recipient,
        year: body.year || "2024",
        description: body.description,
        imageUrl: body.imageUrl || null,
        isPublished: body.isPublished ?? true,
      },
    });

    try {
      revalidatePath("/", "layout");
      revalidatePath("/student-life/student-achievements");
    } catch {}

    return NextResponse.json({ success: true, achievement: item });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
