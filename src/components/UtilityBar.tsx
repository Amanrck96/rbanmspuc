"use client";

import { useState } from "react";
import Link from "next/link";
import { Search, Phone, Mail, HelpCircle, LogIn, ChevronDown } from "lucide-react";
import SearchModal from "./SearchModal";
import PaletteSwitcher from "./PaletteSwitcher";
import ConceptDemoBanner from "./ConceptDemoBanner";

interface UtilityBarProps {
  settings?: any;
  latestNotices?: any[];
}

export default function UtilityBar({ settings, latestNotices }: UtilityBarProps) {
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <>
      {/* Top Persistent Concept Demo Notice */}
      <ConceptDemoBanner position="top" />

      {/* Main Utility Bar matching 7B */}
      <div className="bg-[var(--primary-dark)] text-white text-xs border-b border-white/10 shadow-xs transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 flex flex-wrap justify-between items-center gap-2">
          {/* Left: Phone, Email & Support Slot */}
          <div className="flex items-center gap-3 sm:gap-4 text-[11px] text-white/90">
            <a
              href="tel:08047095123"
              className="flex items-center gap-1.5 hover:text-[var(--accent)] transition"
              title="Central Admissions Desk"
            >
              <Phone className="w-3.5 h-3.5 text-[var(--accent)]" />
              <span className="hidden sm:inline">080-47095123</span>
            </a>

            <span className="text-white/30 hidden sm:inline">|</span>

            <a
              href="mailto:demo@bengaluru-puc-concept.edu.in"
              className="flex items-center gap-1.5 hover:text-[var(--accent)] transition"
              title="Admissions & General Enquiries"
            >
              <Mail className="w-3.5 h-3.5 text-[var(--accent)]" />
              <span className="hidden md:inline">admissions@concept-puc.edu.in</span>
            </a>

            <span className="text-white/30 hidden md:inline">|</span>

            {/* Support Slot */}
            <Link
              href="/contact"
              className="flex items-center gap-1 hover:text-[var(--accent)] transition text-[11px]"
            >
              <HelpCircle className="w-3.5 h-3.5 text-[var(--secondary-soft)]" />
              <span className="hidden lg:inline">Support & Helpdesk</span>
            </Link>
          </div>

          {/* Right Utility: Social Icons, Search, Palette Switcher, Educator Login, Enquire Now */}
          <div className="flex items-center gap-2 sm:gap-3 ml-auto">
            {/* Social Placeholders */}
            <div className="hidden xl:flex items-center gap-2 text-[10px] font-bold text-white/70 pr-2 border-r border-white/20">
              <span className="hover:text-[var(--accent)] cursor-pointer">X</span>
              <span className="hover:text-[var(--accent)] cursor-pointer">IN</span>
              <span className="hover:text-[var(--accent)] cursor-pointer">YT</span>
            </div>

            {/* Global Search trigger */}
            <button
              onClick={() => setSearchOpen(true)}
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-white/10 hover:bg-white/20 text-white transition text-[11px] font-semibold border border-white/15 cursor-pointer"
              title="Search website (Cmd+K)"
            >
              <Search className="w-3.5 h-3.5 text-[var(--accent)]" />
              <span className="hidden sm:inline">Search</span>
              <kbd className="hidden sm:inline text-[9px] bg-black/30 px-1 py-0.5 rounded text-[var(--accent)] border border-white/10">⌘K</kbd>
            </button>

            {/* Live Design System Palette Switcher (Section 7C) */}
            <PaletteSwitcher />

            {/* Educator Login Slot */}
            <Link
              href="/admin/login"
              className="flex items-center gap-1 px-2.5 py-1 rounded-md bg-white/10 hover:bg-white/20 text-white transition text-[11px] font-medium border border-white/10"
              title="Faculty & Administrator CRM Portal"
            >
              <LogIn className="w-3 h-3 text-[var(--secondary-soft)]" />
              <span className="hidden sm:inline">Educator Portal</span>
            </Link>

            {/* Prominent Enquire Now Button (Section 7B) */}
            <Link
              href="/admissions/apply"
              className="px-3.5 py-1 rounded-full bg-[var(--accent)] hover:brightness-110 text-[var(--primary-dark)] font-extrabold text-[11px] tracking-wide shadow-md transition transform hover:scale-105 active:scale-95"
            >
              Enquire Now
            </Link>
          </div>
        </div>
      </div>

      {/* Global Search Modal */}
      <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
