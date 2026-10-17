import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";
import { logActivity } from "@/lib/activity";

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const body = await req.json();
    const { status, followUpDate } = body;
    const notes = body.notes !== undefined ? body.notes : body.counselorNotes;

    const existing = await prisma.enquiry.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json({ error: "Enquiry not found" }, { status: 404 });
    }

    const updateData: any = {};
    if (status !== undefined) updateData.status = status;
    if (notes !== undefined) updateData.notes = notes;
    if (followUpDate !== undefined) {
      updateData.followUpDate = followUpDate ? new Date(followUpDate) : null;
    }

    const updated = await prisma.enquiry.update({
      where: { id },
      data: updateData,
    });

    await logActivity({
      userName: user.name,
      userRole: user.role,
      action: "UPDATE",
      entityType: "ENQUIRY",
      entityId: id,
      details: `Updated enquiry ${existing.applicationNumber} (${existing.fullName}) status to ${status || existing.status}`,
    });

    return NextResponse.json({ success: true, enquiry: updated });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const user = await getCurrentUser();
    if (!user || user.role !== "SUPER_ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const existing = await prisma.enquiry.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json({ error: "Enquiry not found" }, { status: 404 });
    }

    await prisma.enquiry.delete({ where: { id } });

    await logActivity({
      userName: user.name,
      userRole: user.role,
      action: "DELETE",
      entityType: "ENQUIRY",
      entityId: id,
      details: `Deleted enquiry ${existing.applicationNumber} for ${existing.fullName}`,
    });

    return NextResponse.json({ success: true });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export const PUT = PATCH;
