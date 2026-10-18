import { prisma } from "@/lib/prisma";
import { Bell, Pin, Download, Calendar, ExternalLink, Search } from "lucide-react";

export default async function NoticeBoardPage() {
  const notices = await prisma.notice.findMany({
    where: { isPublished: true },
    orderBy: [{ isPinned: "desc" }, { date: "desc" }],
  });

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text)] py-12 transition-colors">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-[var(--gold)]">
            Official Communications
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-[var(--maroon)] dark:text-white font-serif">
            Digital Notice Board
          </h1>
          <p className="text-sm text-[var(--text)]/80">
            Stay updated with official college circulars, board examination schedules, admission guidelines, and academic announcements.
          </p>
        </div>

        {/* Notices List */}
        <div className="space-y-4">
          {notices.map((notice) => (
            <div
              key={notice.id}
              className={`p-6 rounded-3xl bg-white dark:bg-[var(--card)] border transition shadow-xs hover:shadow-md ${
                notice.isPinned
                  ? "border-[var(--gold)] bg-[var(--maroon-tint)]/40"
                  : "border-[var(--maroon-light)]/20 hover:border-[var(--maroon)]"
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                <div className="flex items-center gap-2">
                  {notice.isPinned && (
                    <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-[var(--gold)] text-[var(--maroon-dark)] uppercase">
                      <Pin className="w-3 h-3 fill-current" /> Pinned
                    </span>
                  )}
                  <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-[var(--maroon-tint)] text-[var(--maroon)] dark:text-[var(--gold)] uppercase">
                    {notice.category}
                  </span>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-[var(--text)]/60">
                  <Calendar className="w-3.5 h-3.5 text-[var(--gold)]" />
                  <span>
                    {new Date(notice.date).toLocaleDateString("en-IN", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </span>
                </div>
              </div>

              <h2 className="text-lg font-bold text-[var(--text)] mb-2 font-serif">
                {notice.title}
              </h2>
              <p className="text-xs sm:text-sm text-[var(--text)]/80 leading-relaxed">
                {notice.description}
              </p>

              {notice.fileUrl && (
                <div className="pt-4 mt-4 border-t border-[var(--maroon-light)]/15 flex items-center justify-between">
                  <span className="text-xs text-[var(--text)]/60">Attachment Available</span>
                  <a
                    href={notice.fileUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[var(--maroon)] dark:text-[var(--gold)] hover:underline link-maroon"
                  >
                    <Download className="w-3.5 h-3.5 text-[var(--gold)]" /> View / Download Document
                  </a>
                </div>
              )}
            </div>
          ))}

          {notices.length === 0 && (
            <div className="text-center py-16 bg-white dark:bg-[var(--card)] rounded-3xl border border-[var(--maroon-light)]/20">
              <p className="text-sm text-[var(--text)]/60">No active notices at this moment.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
