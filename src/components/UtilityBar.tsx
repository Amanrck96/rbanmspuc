"use client";

import { useState } from "react";
import Link from "next/link";
import { Search, Bell, Download, ExternalLink, Moon, Sun, Shield, ChevronDown } from "lucide-react";
import SearchModal from "./SearchModal";

interface UtilityBarProps {
  settings?: any;
  latestNotices?: any[];
}

export default function UtilityBar({ settings, latestNotices = [] }: UtilityBarProps) {
  const [searchOpen, setSearchOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [quickLinksOpen, setQuickLinksOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);

  const toggleDarkMode = () => {
    const isNowDark = !isDark;
    setIsDark(isNowDark);
    if (isNowDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  return (
    <>
      <div className="bg-[var(--maroon-dark)] text-white text-xs border-b border-[var(--maroon)]/40 shadow-xs transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 flex flex-wrap justify-between items-center gap-2">
          {/* Left Info: Contact & Affiliation */}
          <div className="flex items-center gap-4 text-[11px] text-white/90">
            <span className="hidden sm:inline">
              🏛️ <strong>RBANM&apos;s Educational Charities</strong> (Estd. 1883)
            </span>
            <span className="hidden md:inline text-white/40">|</span>
            <span className="hidden md:inline">
              📞 <a href="tel:+918025512911" className="hover:text-[var(--gold)] transition">+91 80 2551 2911</a>
            </span>
            <span className="hidden lg:inline text-white/40">|</span>
            <span className="hidden lg:inline">
              ✉️ <a href="mailto:admissions@rbanmspuc.edu.in" className="hover:text-[var(--gold)] transition">admissions@rbanmspuc.edu.in</a>
            </span>
          </div>

          {/* Right Utility Actions */}
          <div className="flex items-center gap-2 sm:gap-3 ml-auto">
            {/* Global Search trigger */}
            <button
              onClick={() => setSearchOpen(true)}
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[var(--maroon)] hover:bg-[var(--maroon-light)] text-white transition text-[11px] font-semibold border border-[var(--gold)]/40 shadow-xs cursor-pointer"
              title="Search website (Cmd+K)"
            >
              <Search className="w-3.5 h-3.5 text-[var(--gold)]" />
              <span>Search</span>
              <kbd className="hidden sm:inline text-[9px] bg-[var(--maroon-dark)] px-1 py-0.5 rounded text-[var(--gold)] border border-[var(--gold)]/30">⌘K</kbd>
            </button>

            {/* Notifications Dropdown */}
            <div className="relative">
              <button
                onClick={() => setNotificationsOpen(!notificationsOpen)}
                className="flex items-center gap-1 px-2 py-1 rounded hover:bg-[var(--maroon)] text-white transition text-[11px] cursor-pointer"
              >
                <Bell className="w-3.5 h-3.5 text-[var(--gold)]" />
                <span className="hidden sm:inline">Notifications</span>
                {latestNotices.length > 0 && (
                  <span className="w-2 h-2 rounded-full bg-[var(--gold)] animate-ping"></span>
                )}
              </button>
              {notificationsOpen && (
                <div
                  className="absolute right-0 mt-2 w-72 sm:w-80 bg-white dark:bg-[var(--card)] rounded-xl shadow-2xl border border-[var(--maroon-light)]/30 z-50 p-3 text-[var(--text)] animate-fade-in"
                  onClick={() => setNotificationsOpen(false)}
                >
                  <div className="flex justify-between items-center pb-2 border-b border-[var(--maroon-tint)] dark:border-[var(--maroon-light)]/20 mb-2">
                    <span className="font-bold text-xs uppercase tracking-wider text-[var(--maroon)] dark:text-[var(--gold)]">
                      Latest Notifications
                    </span>
                    <Link href="/media/notice-board" className="text-[10px] text-[var(--maroon)] dark:text-[var(--gold)] hover:underline">
                      View all
                    </Link>
                  </div>
                  <div className="space-y-2">
                    {latestNotices.slice(0, 3).map((notice: any) => (
                      <Link
                        key={notice.id}
                        href="/media/notice-board"
                        className="block p-2 rounded hover:bg-[var(--maroon-tint)] dark:hover:bg-[var(--maroon)]/20 transition"
                      >
                        <div className="font-medium text-xs line-clamp-1 text-[var(--text)]">{notice.title}</div>
                        <div className="text-[10px] text-[var(--maroon-light)] dark:text-[var(--gold)] mt-0.5">{notice.category}</div>
                      </Link>
                    ))}
                    {latestNotices.length === 0 && (
                      <div className="text-xs text-slate-400 py-2">No new notifications.</div>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Downloads Link */}
            <Link
              href="/admissions/downloads-forms"
              className="flex items-center gap-1 px-2 py-1 rounded hover:bg-[var(--maroon)] text-white transition text-[11px]"
            >
              <Download className="w-3.5 h-3.5 text-[var(--gold)]" />
              <span className="hidden sm:inline">Downloads</span>
            </Link>

            {/* Quick Links Dropdown */}
            <div className="relative">
              <button
                onClick={() => setQuickLinksOpen(!quickLinksOpen)}
                className="flex items-center gap-1 px-2 py-1 rounded hover:bg-[var(--maroon)] text-white transition text-[11px] cursor-pointer"
              >
                <span>Quick Links</span>
                <ChevronDown className="w-3 h-3 text-[var(--gold)]" />
              </button>
              {quickLinksOpen && (
                <div
                  className="absolute right-0 mt-2 w-48 bg-white dark:bg-[var(--card)] rounded-xl shadow-2xl border border-[var(--maroon-light)]/30 z-50 p-2 text-[var(--text)] text-xs animate-fade-in"
                  onClick={() => setQuickLinksOpen(false)}
                >
                  <Link href="/admissions/fee-structure" className="block px-3 py-1.5 rounded hover:bg-[var(--maroon-tint)] dark:hover:bg-[var(--maroon)]/20 text-[var(--text)]">
                    Fee Structure
                  </Link>
                  <Link href="/admissions/scholarships" className="block px-3 py-1.5 rounded hover:bg-[var(--maroon-tint)] dark:hover:bg-[var(--maroon)]/20 text-[var(--text)]">
                    Scholarships
                  </Link>
                  <Link href="/academics/academic-calendar" className="block px-3 py-1.5 rounded hover:bg-[var(--maroon-tint)] dark:hover:bg-[var(--maroon)]/20 text-[var(--text)]">
                    Academic Calendar
                  </Link>
                  <Link href="/academics/results" className="block px-3 py-1.5 rounded hover:bg-[var(--maroon-tint)] dark:hover:bg-[var(--maroon)]/20 text-[var(--text)]">
                    Exam Results
                  </Link>
                  <Link href="/about/management" className="block px-3 py-1.5 rounded hover:bg-[var(--maroon-tint)] dark:hover:bg-[var(--maroon)]/20 text-[var(--text)]">
                    Trustees & Management
                  </Link>
                </div>
              )}
            </div>

            {/* Social Media Links */}
            <div className="hidden xl:flex items-center gap-2.5 pl-2 border-l border-[var(--maroon)]/50">
              <a
                href={settings?.facebookUrl || "https://facebook.com"}
                target="_blank"
                rel="noreferrer"
                className="text-white/80 hover:text-[var(--gold)] transition font-bold text-[10px]"
                title="Facebook"
              >
                FB
              </a>
              <a
                href={settings?.instagramUrl || "https://instagram.com"}
                target="_blank"
                rel="noreferrer"
                className="text-white/80 hover:text-[var(--gold)] transition font-bold text-[10px]"
                title="Instagram"
              >
                IG
              </a>
              <a
                href={settings?.youtubeUrl || "https://youtube.com"}
                target="_blank"
                rel="noreferrer"
                className="text-white/80 hover:text-[var(--gold)] transition font-bold text-[10px]"
                title="YouTube"
              >
                YT
              </a>
            </div>

            {/* Dark Mode Toggle */}
            <button
              onClick={toggleDarkMode}
              className="p-1 rounded-full text-white/80 hover:text-[var(--gold)] hover:bg-[var(--maroon)] transition cursor-pointer"
              title="Toggle Light / Dark Mode"
            >
              {isDark ? <Sun className="w-3.5 h-3.5 text-[var(--gold)]" /> : <Moon className="w-3.5 h-3.5" />}
            </button>

            {/* Admin Login Link */}
            <Link
              href="/admin"
              className="flex items-center gap-1.5 px-3 py-1 rounded-md bg-[var(--maroon)] hover:bg-[var(--maroon-light)] text-white font-bold text-[11px] transition shadow-xs border border-[var(--gold)]/50"
              title="Access RBANMS Admin CRM Panel"
            >
              <Shield className="w-3 h-3 text-[var(--gold)]" />
              <span>Admin CRM</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Global Search Modal */}
      <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
