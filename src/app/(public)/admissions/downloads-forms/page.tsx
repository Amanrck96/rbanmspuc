import { prisma } from "@/lib/prisma";
import { Download, FileText, FileCheck, ArrowRight, Sparkles } from "lucide-react";

export default async function DownloadsPage() {
  const downloads = await prisma.downloadItem.findMany({
    where: { isPublished: true },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text)] py-12 transition-colors">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-[#800000] dark:text-[var(--gold)]">
            Document Repository
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-[#1E3A8A] dark:text-blue-300 font-serif">
            Downloads & Forms
          </h1>
          <p className="text-sm text-[var(--text)]/80">
            Download printable application forms, academic syllabi, college prospectus, timetables, and scholarship declarations.
          </p>
        </div>

        <div className="space-y-4">
          {downloads.map((item) => {
            const isProspectus =
              item.category?.toUpperCase() === "PROSPECTUS" ||
              item.title?.toLowerCase().includes("prospectus");

            if (isProspectus) {
              return (
                <div
                  key={item.id}
                  className="prospectus-card p-6 sm:p-8 rounded-3xl flex flex-col sm:flex-row sm:items-center justify-between gap-6 border-2 border-[var(--gold)] transition shadow-lg"
                >
                  <div className="flex items-center gap-4">
                    <div className="p-3.5 rounded-2xl bg-white/20 text-[var(--gold)] shrink-0 border border-[var(--gold)]/40">
                      <FileCheck className="w-7 h-7 text-[var(--gold)]" />
                    </div>
                    <div className="space-y-1">
                      <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/15 text-[var(--gold)] text-[10px] font-bold uppercase tracking-wider">
                        <Sparkles className="w-3 h-3 text-[var(--gold)]" /> Official College Handbook
                      </div>
                      <h3 className="font-extrabold text-lg sm:text-xl text-white font-serif">
                        {item.title}
                      </h3>
                      <div className="text-xs text-white/80">File format: {item.fileType} • Size: {item.fileSize}</div>
                    </div>
                  </div>

                  <a
                    href={item.fileUrl}
                    target="_blank"
                    rel="noreferrer"
                    download
                    className="btn-prospectus inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-extrabold text-xs uppercase tracking-wider transition shrink-0 shadow-md"
                  >
                    <Download className="w-4 h-4 text-[var(--maroon-dark)]" /> Download Prospectus
                  </a>
                </div>
              );
            }

            return (
              <div
                key={item.id}
                className="p-6 rounded-3xl bg-white dark:bg-[var(--card)] border border-slate-200 dark:border-slate-800 shadow-xs hover:border-[#1E3A8A] hover:shadow-md transition flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div className="flex items-center gap-4">
                  <div className="p-3.5 rounded-2xl bg-[var(--maroon-tint)] text-[#800000] dark:text-[var(--gold)] shrink-0">
                    <FileText className="w-6 h-6 text-[#800000]" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--gold)]">
                      {item.category} • {item.fileType}
                    </span>
                    <h3 className="font-bold text-base text-[#1E3A8A] dark:text-blue-300">
                      {item.title}
                    </h3>
                    <div className="text-xs text-[var(--text)]/60">File size: {item.fileSize}</div>
                  </div>
                </div>

                <a
                  href={item.fileUrl}
                  target="_blank"
                  rel="noreferrer"
                  download
                  className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[#800000] hover:bg-[#5A0F1B] text-white font-bold text-xs uppercase tracking-wider transition shrink-0 shadow-xs"
                >
                  <Download className="w-4 h-4 text-[var(--gold)]" /> Download PDF
                </a>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
