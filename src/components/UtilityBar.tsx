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
      <div className="bg-slate-900 text-slate-200 text-xs border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-1.5 flex flex-wrap justify-between items-center gap-2">
          {/* Left Info: Contact & Affiliation */}
          <div className="flex items-center gap-4 text-[11px] text-slate-300">
            <span className="hidden sm:inline">
              🏛️ <strong>RBANM&apos;s Educational Charities</strong> (Estd. 1883)
            </span>
            <span className="hidden md:inline text-slate-400">|</span>
            <span className="hidden md:inline">
              📞 <a href="tel:+918025512911" className="hover:text-amber-400 transition">+91 80 2551 2911</a>
            </span>
            <span className="hidden lg:inline text-slate-400">|</span>
            <span className="hidden lg:inline">
              ✉️ <a href="mailto:admissions@rbanmspuc.edu.in" className="hover:text-amber-400 transition">admissions@rbanmspuc.edu.in</a>
            </span>
          </div>

          {/* Right Utility Actions */}
          <div className="flex items-center gap-2 sm:gap-3 ml-auto">
            {/* Global Search trigger */}
            <button
              onClick={() => setSearchOpen(true)}
              className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 transition text-[11px] font-medium border border-slate-700"
              title="Search website (Cmd+K)"
            >
              <Search className="w-3.5 h-3.5 text-amber-400" />
              <span>Search</span>
              <kbd className="hidden sm:inline text-[9px] bg-slate-900 px-1 py-0.5 rounded text-slate-400 border border-slate-700">⌘K</kbd>
            </button>

            {/* Notifications Dropdown */}
            <div className="relative">
              <button
                onClick={() => setNotificationsOpen(!notificationsOpen)}
                className="flex items-center gap-1 px-2 py-1 rounded hover:bg-slate-800 text-slate-300 transition text-[11px]"
              >
                <Bell className="w-3.5 h-3.5 text-amber-400" />
                <span className="hidden sm:inline">Notifications</span>
                {latestNotices.length > 0 && (
                  <span className="w-2 h-2 rounded-full bg-red-500 animate-ping"></span>
                )}
              </button>
              {notificationsOpen && (
                <div
                  className="absolute right-0 mt-2 w-72 sm:w-80 bg-white dark:bg-slate-900 rounded-xl shadow-2xl border border-gray-200 dark:border-slate-800 z-50 p-3 text-gray-800 dark:text-gray-100 animate-fade-in"
                  onClick={() => setNotificationsOpen(false)}
                >
                  <div className="flex justify-between items-center pb-2 border-b border-gray-100 dark:border-slate-800 mb-2">
                    <span className="font-bold text-xs uppercase tracking-wider text-blue-700 dark:text-blue-400">
                      Latest Notifications
                    </span>
                    <Link href="/media/notice-board" className="text-[10px] text-gray-500 hover:underline">
                      View all
                    </Link>
                  </div>
                  <div className="space-y-2">
                    {latestNotices.slice(0, 3).map((notice: any) => (
                      <Link
                        key={notice.id}
                        href="/media/notice-board"
                        className="block p-2 rounded hover:bg-gray-50 dark:hover:bg-slate-800 transition"
                      >
                        <div className="font-medium text-xs line-clamp-1">{notice.title}</div>
                        <div className="text-[10px] text-gray-500 mt-0.5">{notice.category}</div>
                      </Link>
                    ))}
                    {latestNotices.length === 0 && (
                      <div className="text-xs text-gray-400 py-2">No new notifications.</div>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Downloads Link */}
            <Link
              href="/admissions/downloads-forms"
              className="flex items-center gap-1 px-2 py-1 rounded hover:bg-slate-800 text-slate-300 transition text-[11px]"
            >
              <Download className="w-3.5 h-3.5 text-sky-400" />
              <span className="hidden sm:inline">Downloads</span>
            </Link>

            {/* Quick Links Dropdown */}
            <div className="relative">
              <button
                onClick={() => setQuickLinksOpen(!quickLinksOpen)}
                className="flex items-center gap-1 px-2 py-1 rounded hover:bg-slate-800 text-slate-300 transition text-[11px]"
              >
                <span>Quick Links</span>
                <ChevronDown className="w-3 h-3 text-slate-400" />
              </button>
              {quickLinksOpen && (
                <div
                  className="absolute right-0 mt-2 w-48 bg-white dark:bg-slate-900 rounded-xl shadow-2xl border border-gray-200 dark:border-slate-800 z-50 p-2 text-gray-800 dark:text-gray-100 text-xs animate-fade-in"
                  onClick={() => setQuickLinksOpen(false)}
                >
                  <Link href="/admissions/fee-structure" className="block px-3 py-1.5 rounded hover:bg-gray-100 dark:hover:bg-slate-800">
                    Fee Structure
                  </Link>
                  <Link href="/admissions/scholarships" className="block px-3 py-1.5 rounded hover:bg-gray-100 dark:hover:bg-slate-800">
                    Scholarships
                  </Link>
                  <Link href="/academics/academic-calendar" className="block px-3 py-1.5 rounded hover:bg-gray-100 dark:hover:bg-slate-800">
                    Academic Calendar
                  </Link>
                  <Link href="/academics/results" className="block px-3 py-1.5 rounded hover:bg-gray-100 dark:hover:bg-slate-800">
                    Exam Results
                  </Link>
                  <Link href="/about/management" className="block px-3 py-1.5 rounded hover:bg-gray-100 dark:hover:bg-slate-800">
                    Trustees & Management
                  </Link>
                </div>
              )}
            </div>

            {/* Social Media Links */}
            <div className="hidden xl:flex items-center gap-2 pl-2 border-l border-slate-700">
              <a
                href={settings?.facebookUrl || "https://facebook.com"}
                target="_blank"
                rel="noreferrer"
                className="hover:text-blue-400 text-slate-400 transition"
                title="Facebook"
              >
                FB
              </a>
              <a
                href={settings?.instagramUrl || "https://instagram.com"}
                target="_blank"
                rel="noreferrer"
                className="hover:text-pink-400 text-slate-400 transition"
                title="Instagram"
              >
                IG
              </a>
              <a
                href={settings?.youtubeUrl || "https://youtube.com"}
                target="_blank"
                rel="noreferrer"
                className="hover:text-red-400 text-slate-400 transition"
                title="YouTube"
              >
                YT
              </a>
            </div>

            {/* Dark Mode Toggle */}
            <button
              onClick={toggleDarkMode}
              className="p-1 rounded-full text-slate-400 hover:text-amber-400 hover:bg-slate-800 transition"
              title="Toggle Light / Dark Mode"
            >
              {isDark ? <Sun className="w-3.5 h-3.5" /> : <Moon className="w-3.5 h-3.5" />}
            </button>

            {/* Admin Login Link */}
            <Link
              href="/admin"
              className="flex items-center gap-1 px-2.5 py-1 rounded bg-amber-600 hover:bg-amber-500 text-white font-semibold text-[11px] transition shadow-xs"
              title="Access RBANMS Admin CRM Panel"
            >
              <Shield className="w-3 h-3" />
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
