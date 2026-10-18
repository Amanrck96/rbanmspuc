"use client";

import { useState } from "react";
import { Bell, Pin, Download, Calendar } from "lucide-react";

interface NoticeItem {
  id: string;
  title: string;
  description: string;
  category: string;
  date: string | Date;
  fileUrl?: string | null;
  isPinned: boolean;
}

export default function NoticeBoardClient({ initialNotices }: { initialNotices: NoticeItem[] }) {
  const [selectedCategory, setSelectedCategory] = useState("ALL");

  const categories = ["ALL", "ADMISSION", "ACADEMIC", "EXAMINATION", "EVENT", "GENERAL"];

  const filteredNotices =
    selectedCategory === "ALL"
      ? initialNotices
      : initialNotices.filter((n) => n.category.toUpperCase() === selectedCategory);

  return (
    <div className="space-y-8">
      {/* Active Tabs Filter in Maroon (#800000) */}
      <div className="flex flex-wrap items-center justify-center gap-2">
        {categories.map((cat) => {
          const isActive = selectedCategory === cat;
          return (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs font-bold transition cursor-pointer ${
                isActive
                  ? "tab-active bg-[#800000] text-white shadow-md border border-[#800000]"
                  : "tab-inactive bg-[#F1F5F9] text-black border border-[#CBD5E1] hover:border-[#800000]/40 dark:bg-slate-800 dark:text-slate-200 dark:border-slate-700"
              }`}
            >
              {cat === "ALL" ? "All Circulars" : cat}
            </button>
          );
        })}
      </div>

      {/* Notices List */}
      <div className="space-y-4">
        {filteredNotices.map((notice) => (
          <div
            key={notice.id}
            className={`p-6 rounded-3xl bg-white dark:bg-[var(--card)] border transition shadow-xs hover:shadow-md ${
              notice.isPinned
                ? "border-2 border-[var(--gold)] bg-[var(--maroon-tint)]/20"
                : "border border-slate-200 dark:border-slate-800 hover:border-[#1E3A8A]"
            }`}
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
              <div className="flex items-center gap-2">
                {notice.isPinned && (
                  <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-[var(--gold)] text-[var(--maroon-dark)] uppercase">
                    <Pin className="w-3 h-3 fill-current" /> Pinned
                  </span>
                )}
                <span className="badge-blue text-xs font-bold px-3 py-0.5 rounded-full uppercase">
                  {notice.category}
                </span>
              </div>
              <div className="flex items-center gap-1.5 text-xs text-[var(--text)]/60">
                <Calendar className="w-3.5 h-3.5 text-[#800000] dark:text-[var(--gold)]" />
                <span>
                  {new Date(notice.date).toLocaleDateString("en-IN", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </span>
              </div>
            </div>

            <h2 className="text-xl font-bold text-[#1E3A8A] dark:text-blue-300 mb-2 font-serif">
              {notice.title}
            </h2>
            <p className="text-xs sm:text-sm text-[var(--text)]/80 leading-relaxed">
              {notice.description}
            </p>

            {notice.fileUrl && (
              <div className="pt-4 mt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <span className="text-xs text-[var(--text)]/60">Official Board Circular Attachment</span>
                <a
                  href={notice.fileUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[#800000] dark:text-[var(--gold)] hover:underline link-maroon"
                >
                  <Download className="w-3.5 h-3.5 text-[#800000] dark:text-[var(--gold)]" /> View / Download Document
                </a>
              </div>
            )}
          </div>
        ))}

        {filteredNotices.length === 0 && (
          <div className="text-center py-16 bg-white dark:bg-[var(--card)] rounded-3xl border border-slate-200 dark:border-slate-800">
            <p className="text-sm text-[var(--text)]/60">No active circulars in this category.</p>
          </div>
        )}
      </div>
    </div>
  );
}
