"use client";

import { AlertTriangle, ExternalLink } from "lucide-react";

interface Props {
  position?: "top" | "bottom";
}

export default function ConceptDemoBanner({ position = "top" }: Props) {
  return (
    <div
      role="banner"
      className={`w-full text-center px-4 py-1.5 text-[11px] font-semibold tracking-wide border-b transition-colors z-50 flex items-center justify-center gap-2 ${
        position === "top"
          ? "bg-amber-500/15 border-amber-500/30 text-amber-900 dark:text-amber-200"
          : "bg-slate-900 border-slate-800 text-slate-300 py-2.5"
      }`}
    >
      <AlertTriangle className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400 shrink-0" />
      <span>
        <strong>Concept Demo</strong> — Not affiliated with CMR National PU College. Built for preview & technical demonstration purposes only.
      </span>
    </div>
  );
}
