"use client";

import { useState } from "react";
import Link from "next/link";
import { Megaphone, ArrowRight, X } from "lucide-react";

interface BannerProps {
  bannerText?: string;
  bannerLink?: string;
  bannerActive?: boolean;
}

export default function AdmissionAlertBanner({
  bannerText = "Admissions Open 2025-2026: Apply online now for Science (PCMB/PCMC), Commerce (SEBA/CEBA) & Arts (HEGP)!",
  bannerLink = "/admissions/apply",
  bannerActive = true,
}: BannerProps) {
  const [dismissed, setDismissed] = useState(false);

  if (!bannerActive || dismissed) return null;

  return (
    <div className="bg-gradient-to-r from-amber-600 via-amber-700 to-amber-800 text-white text-xs sm:text-sm py-2 px-4 shadow-md transition-all">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
        <div className="flex items-center gap-2 flex-1 justify-center text-center">
          <Megaphone className="w-4 h-4 text-amber-200 shrink-0 animate-bounce" />
          <span className="font-semibold tracking-wide">{bannerText}</span>
          <Link
            href={bannerLink}
            className="ml-2 inline-flex items-center gap-1 underline font-bold text-amber-200 hover:text-white transition"
          >
            Apply Now <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
        <button
          onClick={() => setDismissed(true)}
          className="text-amber-200 hover:text-white p-1 rounded-full hover:bg-amber-800/50 transition"
          title="Dismiss notification"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
