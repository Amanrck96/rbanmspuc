import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";

export async function GET() {
  try {
    const faqs = await prisma.faq.findMany({
      orderBy: { order: "asc" },
    });
    return NextResponse.json({ success: true, faqs });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const user = await getCurrentUser();
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const body = await req.json();
    const faq = await prisma.faq.create({
      data: {
        question: body.question,
        answer: body.answer,
        category: body.category || "GENERAL",
        order: parseInt(body.order) || 0,
        isPublished: body.isPublished ?? true,
      },
    });

    try {
      revalidatePath("/", "layout");
      revalidatePath("/admissions/faqs");
    } catch {}

    return NextResponse.json({ success: true, faq });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
