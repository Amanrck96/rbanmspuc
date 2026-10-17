import { prisma } from "@/lib/prisma";
import { Bell, Pin, Download, Calendar, ExternalLink, Search } from "lucide-react";

export default async function NoticeBoardPage() {
  const notices = await prisma.notice.findMany({
    where: { isPublished: true },
    orderBy: [{ isPinned: "desc" }, { date: "desc" }],
  });

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-amber-600 dark:text-amber-400">
            Official Communications
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-slate-100 font-serif">
            Digital Notice Board
          </h1>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            Stay updated with official college circulars, board examination schedules, admission guidelines, and academic announcements.
          </p>
        </div>

        {/* Notices List */}
        <div className="space-y-4">
          {notices.map((notice) => (
            <div
              key={notice.id}
              className={`p-6 rounded-3xl bg-white dark:bg-slate-900 border transition shadow-xs hover:shadow-md ${
                notice.isPinned
                  ? "border-amber-400/80 bg-amber-50/20 dark:bg-amber-950/20"
                  : "border-gray-200 dark:border-slate-800"
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                <div className="flex items-center gap-2">
                  {notice.isPinned && (
                    <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-500 text-slate-950 uppercase">
                      <Pin className="w-3 h-3 fill-current" /> Pinned
                    </span>
                  )}
                  <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 uppercase">
                    {notice.category}
                  </span>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-slate-400">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>
                    {new Date(notice.date).toLocaleDateString("en-IN", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </span>
                </div>
              </div>

              <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100 mb-2">
                {notice.title}
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                {notice.description}
              </p>

              {notice.fileUrl && (
                <div className="pt-4 mt-4 border-t border-gray-100 dark:border-slate-800/60 flex items-center justify-between">
                  <span className="text-xs text-gray-400">Attachment Available</span>
                  <a
                    href={notice.fileUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-700 dark:text-blue-400 hover:underline"
                  >
                    <Download className="w-3.5 h-3.5" /> View / Download Document
                  </a>
                </div>
              )}
            </div>
          ))}

          {notices.length === 0 && (
            <div className="text-center py-16 bg-white dark:bg-slate-900 rounded-3xl border border-gray-200 dark:border-slate-800">
              <p className="text-sm text-gray-500">No active notices at this moment.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
