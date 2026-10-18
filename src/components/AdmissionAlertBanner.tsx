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
      className="bg-[var(--gold)] text-[var(--maroon-dark)] text-xs sm:text-sm py-2 px-4 shadow-sm border-b border-[var(--maroon-dark)]/10 transition-all font-medium"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
        <div className="flex items-center gap-2 flex-1 justify-center text-center">
          <Megaphone className="w-4 h-4 text-[var(--maroon-dark)] shrink-0 animate-bounce" />
          <span className="font-bold tracking-wide text-[var(--maroon-dark)]">{bannerText}</span>
          <Link
            href={bannerLink}
            className="ml-2 inline-flex items-center gap-1 underline font-black text-[var(--maroon-dark)] hover:opacity-80 transition"
          >
            Apply Now <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
        <button
          onClick={() => setDismissed(true)}
          className="text-[var(--maroon-dark)] hover:bg-[var(--maroon-dark)]/10 p-1 rounded-full transition cursor-pointer"
          title="Dismiss notification"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
