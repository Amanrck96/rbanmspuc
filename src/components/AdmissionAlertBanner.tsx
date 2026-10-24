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
    <div
      data-testid="admission-alert-banner"
      className="bg-gray-100 text-black text-xs sm:text-sm py-2 px-4 shadow-sm border-b border-gray-300 transition-all font-medium"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
        <div className="flex items-center gap-2 flex-1 justify-center text-center">
          <Megaphone className="w-4 h-4 text-black shrink-0 animate-bounce" />
          <span className="font-bold tracking-wide text-black">{bannerText}</span>
          <Link
            href={bannerLink}
            className="ml-2 inline-flex items-center gap-1 underline font-black text-black hover:opacity-80 transition"
          >
            Apply Now <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
        <button
          onClick={() => setDismissed(true)}
          className="text-black hover:bg-black/10 p-1 rounded-full transition cursor-pointer"
          title="Dismiss notification"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
