import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";
import { logActivity } from "@/lib/activity";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const fullName = (body.fullName || body.studentName || body.name || "").trim();
    const email = (body.email || "").trim().toLowerCase();
    const phone = (body.phone || "").trim();
    const courseInterested = (body.courseInterested || body.courseStream || "General / Multiple").trim();
    const campus = (body.campus || body.campusPreference || "Main Campus").trim();
    const natureOfEnquiry = (body.natureOfEnquiry || "ADMISSIONS").trim();
    const tenthPercentage = body.tenthPercentage;
    const schoolName = body.schoolName || body.previousSchool;
    const parentName = body.parentName;
    const parentPhone = body.parentPhone;
    const address = body.address;
    const city = body.city;
    const message = body.message;

    if (!fullName || !email || !phone) {
      return NextResponse.json(
        { error: "Full name, email, and phone number are required." },
        { status: 400 }
      );
    }

    const count = await prisma.enquiry.count();
    const applicationNumber = `ENQ-2025-${String(count + 101).padStart(4, "0")}`;

    const enquiry = await prisma.enquiry.create({
      data: {
        applicationNumber,
        fullName: fullName.trim(),
        email: email.trim().toLowerCase(),
        phone: phone.trim(),
        courseInterested,
        campus: campus || "Main Campus",
        natureOfEnquiry: natureOfEnquiry || "ADMISSIONS",
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
      details: `New enquiry [${natureOfEnquiry}] submitted: ${applicationNumber} (${fullName} - ${courseInterested} [${campus}])`,
    });

    return NextResponse.json({
      success: true,
      applicationNumber,
      applicationNo: applicationNumber,
      message: "Enquiry submitted successfully! Our admissions counselor will contact you shortly.",
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
    const requestedCampus = searchParams.get("campus");
    const nature = searchParams.get("nature");
    const search = searchParams.get("search")?.toLowerCase().trim();

    const where: any = {};

    // Role-based scoping: CAMPUS_ADMIN can only view enquiries for their assigned campus
    if (user.role === "CAMPUS_ADMIN" && user.assignedCampus) {
      where.campus = user.assignedCampus;
    } else if (requestedCampus && requestedCampus !== "ALL") {
      where.campus = requestedCampus;
    }

    if (status && status !== "ALL") {
      where.status = status;
    }
    if (nature && nature !== "ALL") {
      where.natureOfEnquiry = nature;
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

    // Compute global/scoped stats
    const baseWhere = user.role === "CAMPUS_ADMIN" && user.assignedCampus ? { campus: user.assignedCampus } : {};
    const allCount = await prisma.enquiry.count({ where: baseWhere });
    const newCount = await prisma.enquiry.count({ where: { ...baseWhere, status: "NEW" } });
    const contactedCount = await prisma.enquiry.count({ where: { ...baseWhere, status: "CONTACTED" } });
    const appliedCount = await prisma.enquiry.count({ where: { ...baseWhere, status: "APPLIED" } });
    const admittedCount = await prisma.enquiry.count({ where: { ...baseWhere, status: "ADMITTED" } });
    const rejectedCount = await prisma.enquiry.count({ where: { ...baseWhere, status: "REJECTED" } });

    // Grouping by campus for multi-campus summary
    const allEnquiries = await prisma.enquiry.findMany({
      where: baseWhere,
      select: { campus: true, status: true, natureOfEnquiry: true },
    });

    const campusBreakdown: Record<string, { total: number; admitted: number; contacted: number; new: number }> = {};
    for (const item of allEnquiries) {
      const camp = item.campus || "Unassigned";
      if (!campusBreakdown[camp]) {
        campusBreakdown[camp] = { total: 0, admitted: 0, contacted: 0, new: 0 };
      }
      campusBreakdown[camp].total++;
      if (item.status === "ADMITTED") campusBreakdown[camp].admitted++;
      if (item.status === "CONTACTED") campusBreakdown[camp].contacted++;
      if (item.status === "NEW") campusBreakdown[camp].new++;
    }

    return NextResponse.json({
      success: true,
      userRole: user.role,
      assignedCampus: user.assignedCampus || null,
      enquiries,
      stats: {
        total: allCount,
        new: newCount,
        contacted: contactedCount,
        applied: appliedCount,
        admitted: admittedCount,
        rejected: rejectedCount,
        conversionRate: allCount > 0 ? ((admittedCount / allCount) * 100).toFixed(1) + "%" : "0%",
      },
      campusBreakdown,
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
