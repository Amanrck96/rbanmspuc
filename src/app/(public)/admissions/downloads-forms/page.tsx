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
          <span className="text-xs font-bold uppercase tracking-widest text-black">
            Document Repository
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-black font-serif">
            Downloads & Forms
          </h1>
          <p className="text-sm text-gray-700">
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
                  className="p-6 sm:p-8 rounded-3xl flex flex-col sm:flex-row sm:items-center justify-between gap-6 border border-gray-200 bg-white transition shadow-sm"
                >
                  <div className="flex items-center gap-4">
                    <div className="p-3.5 rounded-2xl bg-gray-100 text-black shrink-0 border border-gray-300">
                      <FileCheck className="w-7 h-7 text-black" />
                    </div>
                    <div className="space-y-1">
                      <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-gray-100 text-black text-[10px] font-bold uppercase tracking-wider border border-gray-300">
                        <Sparkles className="w-3 h-3 text-black" /> Official College Handbook
                      </div>
                      <h3 className="font-extrabold text-lg sm:text-xl text-black font-serif">
                        {item.title}
                      </h3>
                      <div className="text-xs text-gray-600">File format: {item.fileType} • Size: {item.fileSize}</div>
                    </div>
                  </div>

                  <a
                    href={item.fileUrl}
                    target="_blank"
                    rel="noreferrer"
                    download
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-extrabold text-xs uppercase tracking-wider transition shrink-0 bg-white text-black border-2 border-black hover:bg-gray-100 shadow-sm"
                  >
                    <Download className="w-4 h-4 text-black" /> Download Prospectus
                  </a>
                </div>
              );
            }

            return (
              <div
                key={item.id}
                className="p-6 rounded-3xl bg-white border border-gray-200 shadow-xs hover:border-black transition flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div className="flex items-center gap-4">
                  <div className="p-3.5 rounded-2xl bg-gray-100 text-black shrink-0 border border-gray-300">
                    <FileText className="w-6 h-6 text-black" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-black">
                      {item.category} • {item.fileType}
                    </span>
                    <h3 className="font-bold text-base text-black">
                      {item.title}
                    </h3>
                    <div className="text-xs text-gray-500">File size: {item.fileSize}</div>
                  </div>
                </div>

                <a
                  href={item.fileUrl}
                  target="_blank"
                  rel="noreferrer"
                  download
                  className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-white hover:bg-gray-100 text-black border border-black font-bold text-xs uppercase tracking-wider transition shrink-0 shadow-xs"
                >
                  <Download className="w-4 h-4 text-black" /> Download PDF
                </a>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
