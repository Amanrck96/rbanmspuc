import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";
import { logActivity } from "@/lib/activity";

export async function GET() {
  try {
    const courses = await prisma.course.findMany({
      orderBy: { order: "asc" },
    });
    return NextResponse.json({ success: true, courses });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const user = await getCurrentUser();
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const body = await req.json();
    const course = await prisma.course.create({
      data: {
        code: body.code.toUpperCase().trim(),
        name: body.name,
        stream: body.stream,
        duration: body.duration || "2 Years",
        eligibility: body.eligibility,
        intake: parseInt(body.intake) || 80,
        subjects: body.subjects,
        careerProspects: body.careerProspects,
        isPublished: body.isPublished ?? true,
        order: parseInt(body.order) || 0,
      },
    });

    await logActivity({
      userName: user.name,
      userRole: user.role,
      action: "CREATE",
      entityType: "COURSE",
      entityId: course.id,
      details: `Created course ${course.code} - ${course.name}`,
    });

    try {
      revalidatePath("/", "layout");
      revalidatePath("/admissions/courses-offered");
    } catch {}

    return NextResponse.json({ success: true, course });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
