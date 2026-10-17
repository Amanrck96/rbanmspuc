import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";
import { logActivity } from "@/lib/activity";

export async function GET() {
  try {
    const events = await prisma.event.findMany({
      orderBy: { eventDate: "asc" },
    });
    return NextResponse.json({ success: true, events });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const user = await getCurrentUser();
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const body = await req.json();
    const event = await prisma.event.create({
      data: {
        title: body.title,
        category: body.category || "ACADEMIC",
        eventDate: new Date(body.eventDate),
        venue: body.venue || "College Auditorium",
        description: body.description,
        imageUrl: body.imageUrl || null,
        isPublished: body.isPublished ?? true,
      },
    });

    await logActivity({
      userName: user.name,
      userRole: user.role,
      action: "CREATE",
      entityType: "EVENT",
      entityId: event.id,
      details: `Created event "${event.title}"`,
    });

    try {
      revalidatePath("/", "layout");
      revalidatePath("/media/events");
    } catch {}

    return NextResponse.json({ success: true, event });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
