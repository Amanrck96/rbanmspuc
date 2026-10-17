import { prisma } from "@/lib/prisma";
import { Download, FileText, FileCheck, ArrowRight } from "lucide-react";

export default async function DownloadsPage() {
  const downloads = await prisma.downloadItem.findMany({
    where: { isPublished: true },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-blue-700 dark:text-blue-400">
            Document Repository
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-slate-100 font-serif">
            Downloads & Forms
          </h1>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            Download printable application forms, academic syllabi, college prospectus, timetables, and scholarship declarations.
          </p>
        </div>

        <div className="space-y-4">
          {downloads.map((item) => (
            <div
              key={item.id}
              className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 shadow-xs hover:shadow-md transition flex flex-col sm:flex-row sm:items-center justify-between gap-4"
            >
              <div className="flex items-center gap-4">
                <div className="p-3.5 rounded-2xl bg-blue-100 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 shrink-0">
                  <FileText className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
                    {item.category} • {item.fileType}
                  </span>
                  <h3 className="font-bold text-base text-slate-900 dark:text-slate-100">
                    {item.title}
                  </h3>
                  <div className="text-xs text-gray-400">File size: {item.fileSize}</div>
                </div>
              </div>

              <a
                href={item.fileUrl}
                target="_blank"
                rel="noreferrer"
                download
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-blue-700 hover:bg-blue-800 text-white font-bold text-xs uppercase tracking-wider transition shrink-0"
              >
                <Download className="w-4 h-4" /> Download PDF
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
