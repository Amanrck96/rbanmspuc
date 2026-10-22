import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";
import { logActivity } from "@/lib/activity";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const fullName = (body.fullName || body.studentName || "").trim();
    const email = (body.email || "").trim().toLowerCase();
    const phone = (body.phone || "").trim();
    const courseInterested = (body.courseInterested || body.courseStream || "").trim();
    const campus = (body.campus || body.campusPreference || "Main Campus").trim();
    const tenthPercentage = body.tenthPercentage;
    const schoolName = body.schoolName || body.previousSchool;
    const parentName = body.parentName;
    const parentPhone = body.parentPhone;
    const address = body.address;
    const city = body.city;
    const message = body.message;

    if (!fullName || !email || !phone || !courseInterested) {
      return NextResponse.json(
        { error: "Full name, email, phone number, and course choice are required." },
        { status: 400 }
      );
    }

    const count = await prisma.enquiry.count();
    const applicationNumber = `RBANMS-2025-${String(count + 101).padStart(4, "0")}`;

    const enquiry = await prisma.enquiry.create({
      data: {
        applicationNumber,
        fullName: fullName.trim(),
        email: email.trim().toLowerCase(),
        phone: phone.trim(),
        courseInterested,
        campus: campus || "Main Campus",
        tenthPercentage: tenthPercentage ? parseFloat(tenthPercentage) : null,
        schoolName: schoolName?.trim() || null,
        parentName: parentName?.trim() || null,
        parentPhone: parentPhone?.trim() || null,
        address: address?.trim() || null,
        city: city?.trim() || "Bengaluru",
        message: message?.trim() || null,
        status: "NEW",
      },
    });

    await logActivity({
      userName: fullName,
      userRole: "APPLICANT",
      action: "CREATE",
      entityType: "ENQUIRY",
      entityId: enquiry.id,
      details: `New online application submitted: ${applicationNumber} (${fullName} - ${courseInterested} [${campus}])`,
    });

    return NextResponse.json({
      success: true,
      applicationNumber,
      applicationNo: applicationNumber,
      message: "Application submitted successfully! Our admissions counselor will contact you shortly.",
      enquiryId: enquiry.id,
      enquiry,
    });
  } catch (err: any) {
    console.error("Enquiry submission error:", err);
    return NextResponse.json({ error: err.message || "Failed to submit enquiry" }, { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const status = searchParams.get("status");
    const campus = searchParams.get("campus");
    const search = searchParams.get("search")?.toLowerCase().trim();

    const where: any = {};
    if (status && status !== "ALL") {
      where.status = status;
    }
    if (campus && campus !== "ALL") {
      where.campus = campus;
    }
    if (search) {
      where.OR = [
        { fullName: { contains: search } },
        { email: { contains: search } },
        { phone: { contains: search } },
        { applicationNumber: { contains: search } },
        { courseInterested: { contains: search } },
        { campus: { contains: search } },
        { schoolName: { contains: search } },
      ];
    }

    const enquiries = await prisma.enquiry.findMany({
      where,
      orderBy: { createdAt: "desc" },
    });

    const allCount = await prisma.enquiry.count();
    const newCount = await prisma.enquiry.count({ where: { status: "NEW" } });
    const contactedCount = await prisma.enquiry.count({ where: { status: "CONTACTED" } });
    const appliedCount = await prisma.enquiry.count({ where: { status: "APPLIED" } });
    const admittedCount = await prisma.enquiry.count({ where: { status: "ADMITTED" } });
    const rejectedCount = await prisma.enquiry.count({ where: { status: "REJECTED" } });

    return NextResponse.json({
      success: true,
      enquiries,
      stats: {
        total: allCount,
        new: newCount,
        contacted: contactedCount,
        applied: appliedCount,
        admitted: admittedCount,
        rejected: rejectedCount,
      },
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
