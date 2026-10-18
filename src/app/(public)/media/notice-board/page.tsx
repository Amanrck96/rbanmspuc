import { prisma } from "@/lib/prisma";
import NoticeBoardClient from "./NoticeBoardClient";

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
          <span className="text-xs font-bold uppercase tracking-widest text-[#800000] dark:text-[var(--gold)]">
            Official Communications
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-[#1E3A8A] dark:text-blue-300 font-serif">
            Digital Notice Board
          </h1>
          <p className="text-sm text-[var(--text)]/80">
            Stay updated with official college circulars, board examination schedules, admission guidelines, and academic announcements.
          </p>
        </div>

        {/* Client Interactive Tab Component */}
        <NoticeBoardClient initialNotices={JSON.parse(JSON.stringify(notices))} />
      </div>
    </div>
  );
}
