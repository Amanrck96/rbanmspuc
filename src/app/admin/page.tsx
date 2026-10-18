import { prisma } from "@/lib/prisma";
import Link from "next/link";
import {
  Users,
  Bell,
  Calendar,
  GraduationCap,
  FileText,
  FolderOpen,
  ArrowRight,
  Clock,
  CheckCircle2,
  AlertCircle,
  TrendingUp,
  UserCheck,
  Plus,
} from "lucide-react";

export default async function AdminDashboardPage() {
  const [
    totalEnquiries,
    newEnquiries,
    contactedEnquiries,
    admittedEnquiries,
    noticesCount,
    eventsCount,
    coursesCount,
    facultyCount,
    pagesCount,
    mediaCount,
    recentEnquiries,
    recentActivities,
  ] = await Promise.all([
    prisma.enquiry.count(),
    prisma.enquiry.count({ where: { status: "NEW" } }),
    prisma.enquiry.count({ where: { status: "CONTACTED" } }),
    prisma.enquiry.count({ where: { status: "ADMITTED" } }),
    prisma.notice.count(),
    prisma.event.count(),
    prisma.course.count(),
    prisma.faculty.count(),
    prisma.page.count(),
    prisma.mediaFile.count(),
    prisma.enquiry.findMany({
      take: 6,
      orderBy: { createdAt: "desc" },
    }),
    prisma.activityLog.findMany({
      take: 8,
      orderBy: { createdAt: "desc" },
    }),
  ]);

  // Compute course stream distributions
  const allEnquiries = await prisma.enquiry.findMany({ select: { courseInterested: true } });
  const streamCounts: Record<string, number> = { Science: 0, Commerce: 0, Arts: 0 };
  allEnquiries.forEach((e) => {
    if (e.courseInterested.startsWith("PCM")) streamCounts.Science++;
    else if (e.courseInterested.endsWith("BA")) streamCounts.Commerce++;
    else streamCounts.Arts++;
  });

  return (
    <div className="space-y-8 animate-fade-in text-[var(--text)]">
      {/* Welcome Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[var(--maroon-light)]/20">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-[var(--maroon)] dark:text-[var(--gold)]">
            Management Overview
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[var(--maroon)] dark:text-white font-serif">
            Executive CRM Dashboard
          </h1>
          <p className="text-xs text-[var(--text)]/70 mt-1">
            Real-time admissions pipeline, content management status, and audit records.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/admin/enquiries"
            className="px-4 py-2 rounded-xl bg-[var(--maroon)] hover:bg-[var(--maroon-dark)] text-white font-bold text-xs uppercase tracking-wider transition shadow-sm"
          >
            Manage Enquiries ({newEnquiries} New)
          </Link>
          <Link
            href="/"
            target="_blank"
            className="px-3.5 py-2 rounded-xl bg-white dark:bg-[var(--card)] border border-[var(--maroon-light)]/30 text-[var(--text)] font-semibold text-xs hover:bg-[var(--maroon-tint)] transition"
          >
            Live Site ↗
          </Link>
        </div>
      </div>

      {/* Metric Cards Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <div className="p-5 rounded-3xl bg-white dark:bg-[var(--card)] border border-[var(--maroon-light)]/20 shadow-xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-[var(--text)]/60">Total Enquiries</span>
            <div className="p-2 rounded-xl bg-[var(--maroon-tint)] text-[var(--maroon)] dark:text-[var(--gold)]">
              <Users className="w-5 h-5" />
            </div>
          </div>
          <div className="text-3xl font-extrabold text-[var(--maroon)] dark:text-white font-mono">{totalEnquiries}</div>
          <div className="text-[11px] text-emerald-600 dark:text-emerald-400 flex items-center gap-1 font-semibold">
            <TrendingUp className="w-3 h-3" /> {newEnquiries} pending review
          </div>
        </div>

        <div className="p-5 rounded-3xl bg-white dark:bg-[var(--card)] border border-[var(--maroon-light)]/20 shadow-xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-[var(--text)]/60">Admissions Confirmed</span>
            <div className="p-2 rounded-xl bg-[var(--maroon-tint)] text-emerald-600 dark:text-emerald-400">
              <CheckCircle2 className="w-5 h-5" />
            </div>
          </div>
          <div className="text-3xl font-extrabold text-[var(--maroon)] dark:text-white font-mono">{admittedEnquiries}</div>
          <div className="text-[11px] text-[var(--text)]/60">Across Science, Commerce & Arts</div>
        </div>

        <div className="p-5 rounded-3xl bg-white dark:bg-[var(--card)] border border-[var(--maroon-light)]/20 shadow-xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-[var(--text)]/60">Active Notices</span>
            <div className="p-2 rounded-xl bg-[var(--maroon-tint)] text-[var(--gold)]">
              <Bell className="w-5 h-5" />
            </div>
          </div>
          <div className="text-3xl font-extrabold text-[var(--maroon)] dark:text-white font-mono">{noticesCount}</div>
          <div className="text-[11px] text-[var(--text)]/60">Live on public portal</div>
        </div>

        <div className="p-5 rounded-3xl bg-white dark:bg-[var(--card)] border border-[var(--maroon-light)]/20 shadow-xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-[var(--text)]/60">CMS Pages</span>
            <div className="p-2 rounded-xl bg-[var(--maroon-tint)] text-[var(--maroon-light)] dark:text-[var(--gold)]">
              <FileText className="w-5 h-5" />
            </div>
          </div>
          <div className="text-3xl font-extrabold text-[var(--maroon)] dark:text-white font-mono">{pagesCount}</div>
          <div className="text-[11px] text-[var(--text)]/60">Fully editable from admin</div>
        </div>
      </div>

      {/* Interactive Charts & Stream Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Stream Breakdown */}
        <div className="p-6 rounded-3xl bg-white dark:bg-[var(--card)] border border-[var(--maroon-light)]/20 shadow-xs space-y-5">
          <div className="flex items-center justify-between pb-2 border-b border-[var(--maroon-light)]/15">
            <h3 className="font-bold text-sm text-[var(--maroon)] dark:text-[var(--gold)] uppercase tracking-wider">
              Enquiry Stream Breakdown
            </h3>
            <span className="text-xs text-[var(--maroon)] dark:text-[var(--gold)] font-mono font-semibold">{totalEnquiries} Total</span>
          </div>

          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-xs font-semibold mb-1">
                <span className="text-[var(--maroon)] dark:text-[var(--gold)]">Science (PCMB / PCMC)</span>
                <span className="font-mono text-[var(--text)]/80">
                  {streamCounts.Science} (
                  {totalEnquiries > 0 ? Math.round((streamCounts.Science / totalEnquiries) * 100) : 0}%)
                </span>
              </div>
              <div className="w-full h-3 bg-[var(--maroon-tint)] rounded-full overflow-hidden">
                <div
                  className="h-full bg-[var(--maroon)] rounded-full"
                  style={{
                    width: `${totalEnquiries > 0 ? (streamCounts.Science / totalEnquiries) * 100 : 0}%`,
                  }}
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-semibold mb-1">
                <span className="text-[var(--gold)]">Commerce (CEBA / SEBA)</span>
                <span className="font-mono text-[var(--text)]/80">
                  {streamCounts.Commerce} (
                  {totalEnquiries > 0 ? Math.round((streamCounts.Commerce / totalEnquiries) * 100) : 0}%)
                </span>
              </div>
              <div className="w-full h-3 bg-[var(--maroon-tint)] rounded-full overflow-hidden">
                <div
                  className="h-full bg-[var(--gold)] rounded-full"
                  style={{
                    width: `${totalEnquiries > 0 ? (streamCounts.Commerce / totalEnquiries) * 100 : 0}%`,
                  }}
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-semibold mb-1">
                <span className="text-[var(--maroon-light)]">Arts / Humanities (HEGP)</span>
                <span className="font-mono text-[var(--text)]/80">
                  {streamCounts.Arts} (
                  {totalEnquiries > 0 ? Math.round((streamCounts.Arts / totalEnquiries) * 100) : 0}%)
                </span>
              </div>
              <div className="w-full h-3 bg-[var(--maroon-tint)] rounded-full overflow-hidden">
                <div
                  className="h-full bg-[var(--maroon-light)] rounded-full"
                  style={{
                    width: `${totalEnquiries > 0 ? (streamCounts.Arts / totalEnquiries) * 100 : 0}%`,
                  }}
                />
              </div>
            </div>
          </div>

          <div className="pt-2 text-[11px] text-[var(--text)]/60 border-t border-[var(--maroon-light)]/15">
            Aggregated from website online enquiry and application submissions.
          </div>
        </div>

        {/* Quick CMS Control Shortcuts */}
        <div className="p-6 rounded-3xl bg-white dark:bg-[var(--card)] border border-[var(--maroon-light)]/20 shadow-xs space-y-4">
          <h3 className="font-bold text-sm text-[var(--maroon)] dark:text-[var(--gold)] uppercase tracking-wider pb-2 border-b border-[var(--maroon-light)]/15">
            Quick Actions
          </h3>
          <div className="grid grid-cols-2 gap-2.5">
            <Link
              href="/admin/notices"
              className="p-3 rounded-2xl bg-[var(--maroon-tint)] hover:bg-[var(--maroon)] hover:text-white border border-[var(--maroon-light)]/20 transition flex flex-col justify-between group"
            >
              <Bell className="w-5 h-5 text-[var(--gold)] mb-2" />
              <div className="font-bold text-xs text-[var(--text)] group-hover:text-white">Post Notice</div>
              <div className="text-[10px] text-[var(--text)]/60 group-hover:text-white/80">Instant publish</div>
            </Link>

            <Link
              href="/admin/media"
              className="p-3 rounded-2xl bg-[var(--maroon-tint)] hover:bg-[var(--maroon)] hover:text-white border border-[var(--maroon-light)]/20 transition flex flex-col justify-between group"
            >
              <FolderOpen className="w-5 h-5 text-[var(--maroon)] dark:text-[var(--gold)] mb-2 group-hover:text-white" />
              <div className="font-bold text-xs text-[var(--text)] group-hover:text-white">Upload Media</div>
              <div className="text-[10px] text-[var(--text)]/60 group-hover:text-white/80">Shared /uploads</div>
            </Link>

            <Link
              href="/admin/pages"
              className="p-3 rounded-2xl bg-[var(--maroon-tint)] hover:bg-[var(--maroon)] hover:text-white border border-[var(--maroon-light)]/20 transition flex flex-col justify-between group"
            >
              <FileText className="w-5 h-5 text-[var(--maroon-light)] mb-2 group-hover:text-white" />
              <div className="font-bold text-xs text-[var(--text)] group-hover:text-white">Edit Pages</div>
              <div className="text-[10px] text-[var(--text)]/60 group-hover:text-white/80">48 dynamic pages</div>
            </Link>

            <Link
              href="/admin/settings"
              className="p-3 rounded-2xl bg-[var(--maroon-tint)] hover:bg-[var(--maroon)] hover:text-white border border-[var(--maroon-light)]/20 transition flex flex-col justify-between group"
            >
              <GraduationCap className="w-5 h-5 text-[var(--gold)] mb-2" />
              <div className="font-bold text-xs text-[var(--text)] group-hover:text-white">Site Skin</div>
              <div className="text-[10px] text-[var(--text)]/60 group-hover:text-white/80">Colors & branding</div>
            </Link>
          </div>
        </div>

        {/* System Summary */}
        <div className="p-6 rounded-3xl bg-gradient-to-br from-[var(--maroon-dark)] to-[var(--maroon)] text-white border border-[var(--gold)]/30 space-y-4 shadow-sm">
          <h3 className="font-bold text-sm text-[var(--gold)] uppercase tracking-wider pb-2 border-b border-[var(--gold)]/20">
            System & Storage
          </h3>
          <ul className="space-y-3 text-xs">
            <li className="flex justify-between items-center text-white/90">
              <span>Database Engine:</span>
              <span className="font-mono text-emerald-300 font-semibold">SQLite (Prisma 6)</span>
            </li>
            <li className="flex justify-between items-center text-white/90">
              <span>Media Files Stored:</span>
              <span className="font-mono text-[var(--gold)] font-semibold">{mediaCount} files</span>
            </li>
            <li className="flex justify-between items-center text-white/90">
              <span>Revalidation:</span>
              <span className="font-mono text-white font-semibold">On-Demand Instant</span>
            </li>
            <li className="flex justify-between items-center text-white/90">
              <span>Faculty Members:</span>
              <span className="font-mono text-white font-semibold">{facultyCount}</span>
            </li>
          </ul>
          <div className="pt-2">
            <Link
              href="/admin/trash"
              className="w-full py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition border border-white/20"
            >
              Open Recycle Bin & Undo
            </Link>
          </div>
        </div>
      </div>

      {/* Recent Enquiries & Activity Feed */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Recent Enquiries Table */}
        <div className="lg:col-span-8 p-6 rounded-3xl bg-white dark:bg-[var(--card)] border border-[var(--maroon-light)]/20 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[var(--maroon-light)]/15">
            <div>
              <h3 className="font-bold text-base text-[var(--maroon)] dark:text-white font-serif">Recent Admissions Enquiries</h3>
              <p className="text-xs text-[var(--text)]/60">Applications submitted from the public portal</p>
            </div>
            <Link
              href="/admin/enquiries"
              className="text-xs font-bold text-[var(--maroon)] dark:text-[var(--gold)] hover:underline flex items-center gap-1 link-maroon"
            >
              View Full CRM <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-[var(--maroon-light)]/20 text-[var(--text)]/60 uppercase tracking-wider text-[10px]">
                  <th className="py-2.5 px-3">App No</th>
                  <th className="py-2.5 px-3">Applicant Name</th>
                  <th className="py-2.5 px-3">Course</th>
                  <th className="py-2.5 px-3">Phone</th>
                  <th className="py-2.5 px-3">Status</th>
                  <th className="py-2.5 px-3">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--maroon-light)]/10">
                {recentEnquiries.map((enq) => (
                  <tr key={enq.id} className="hover:bg-[var(--maroon-tint)]/40 transition">
                    <td className="py-3 px-3 font-mono font-semibold text-[var(--text)]">{enq.applicationNumber}</td>
                    <td className="py-3 px-3 font-bold text-[var(--text)]">{enq.fullName}</td>
                    <td className="py-3 px-3 font-mono text-[var(--maroon)] dark:text-[var(--gold)] font-semibold">{enq.courseInterested}</td>
                    <td className="py-3 px-3 text-[var(--text)]/80">{enq.phone}</td>
                    <td className="py-3 px-3">
                      <span
                        className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                          enq.status === "NEW"
                            ? "bg-[var(--maroon-tint)] text-[var(--maroon)] dark:text-[var(--gold)]"
                            : enq.status === "ADMITTED"
                            ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300"
                            : enq.status === "CONTACTED"
                            ? "bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300"
                            : "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300"
                        }`}
                      >
                        {enq.status}
                      </span>
                    </td>
                    <td className="py-3 px-3">
                      <Link
                        href={`/admin/enquiries?id=${enq.id}`}
                        className="text-xs font-semibold text-[var(--maroon)] dark:text-[var(--gold)] hover:underline link-maroon"
                      >
                        Open Dossier
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Live Activity Audit Feed */}
        <div className="lg:col-span-4 p-6 rounded-3xl bg-white dark:bg-[var(--card)] border border-[var(--maroon-light)]/20 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[var(--maroon-light)]/15">
            <h3 className="font-bold text-sm text-[var(--maroon)] dark:text-[var(--gold)] uppercase tracking-wider flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-[var(--gold)]" /> Audit Activity Feed
            </h3>
            <Link href="/admin/activity" className="text-xs text-[var(--text)]/60 hover:text-[var(--maroon)] link-maroon">
              History
            </Link>
          </div>

          <div className="space-y-3">
            {recentActivities.map((act) => (
              <div
                key={act.id}
                className="p-3 rounded-2xl bg-[var(--maroon-tint)]/40 border border-[var(--maroon-light)]/15 text-xs space-y-1"
              >
                <div className="flex items-center justify-between text-[10px]">
                  <span className="font-bold text-[var(--maroon)] dark:text-[var(--gold)] uppercase tracking-wider">{act.action}</span>
                  <span className="text-[var(--text)]/60">
                    {new Date(act.createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                  </span>
                </div>
                <p className="text-[var(--text)]/80 text-xs leading-snug">{act.details}</p>
                <div className="text-[10px] text-[var(--text)]/60">Actor: {act.userName} ({act.userRole})</div>
              </div>
            ))}
            {recentActivities.length === 0 && (
              <div className="text-xs text-[var(--text)]/60 py-6 text-center">No recent activities recorded.</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
