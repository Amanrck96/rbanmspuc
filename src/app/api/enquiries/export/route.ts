import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";
import { logActivity } from "@/lib/activity";

export async function GET() {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const enquiries = await prisma.enquiry.findMany({
      orderBy: { createdAt: "desc" },
    });

    const headers = [
      "Application No",
      "Full Name",
      "Email",
      "Phone",
      "Course Interested",
      "Campus",
      "10th Percentage",
      "School Name",
      "Parent Name",
      "Parent Phone",
      "City",
      "Status",
      "Counselor Notes",
      "Follow-up Date",
      "Submitted At",
    ];

    const escapeCsv = (val: any) => {
      if (val === null || val === undefined) return '""';
      const str = String(val).replace(/"/g, '""');
      return `"${str}"`;
    };

    const rows = enquiries.map((e) => [
      escapeCsv(e.applicationNumber),
      escapeCsv(e.fullName),
      escapeCsv(e.email),
      escapeCsv(e.phone),
      escapeCsv(e.courseInterested),
      escapeCsv(e.campus || "Main Campus"),
      escapeCsv(e.tenthPercentage ? `${e.tenthPercentage}%` : ""),
      escapeCsv(e.schoolName),
      escapeCsv(e.parentName),
      escapeCsv(e.parentPhone),
      escapeCsv(e.city),
      escapeCsv(e.status),
      escapeCsv(e.notes),
      escapeCsv(e.followUpDate ? new Date(e.followUpDate).toISOString().split("T")[0] : ""),
      escapeCsv(new Date(e.createdAt).toLocaleString("en-IN")),
    ]);

    const csvContent = [headers.join(","), ...rows.map((r) => r.join(","))].join("\r\n");

    await logActivity({
      userName: user.name,
      userRole: user.role,
      action: "EXPORT",
      entityType: "ENQUIRY",
      details: `Exported ${enquiries.length} admission enquiry records to CSV`,
    });

    return new NextResponse(csvContent, {
      status: 200,
      headers: {
        "Content-Type": "text/csv; charset=utf-8",
        "Content-Disposition": `attachment; filename="rbanms-admission-enquiries-${new Date().toISOString().split("T")[0]}.csv"`,
      },
    });
  } catch (err: any) {
    return new NextResponse(err.message, { status: 500 });
  }
}
