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
      <div className="bg-white text-black text-xs border-b border-gray-200 shadow-xs transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 flex flex-wrap justify-between items-center gap-2">
          {/* Left Info: Contact & Affiliation (Rbanms website.docx) */}
          <div className="flex items-center gap-4 text-[11px] text-black">
            <span className="hidden sm:inline">
              🏛️ <strong>RBANM&apos;s Educational Charities</strong> (Estd. 1883)
            </span>
            <span className="hidden md:inline text-gray-300">|</span>
            <span className="hidden md:inline">
              📞 <a href="tel:+918025512911" className="hover:text-gray-600 transition">+91 80 2551 2911</a>
            </span>
            <span className="hidden lg:inline text-gray-300">|</span>
            <span className="hidden lg:inline">
              ✉️ <a href="mailto:admissions@rbanmspuc.edu.in" className="hover:text-gray-600 transition">admissions@rbanmspuc.edu.in</a>
            </span>
          </div>

          {/* Right Utility Actions (Search, Notifications, Downloads, Quick Links, Social Media, Admin) */}
          <div className="flex items-center gap-2 sm:gap-3 ml-auto">
            {/* Global Search trigger (Cmd+K) */}
            <button
              onClick={() => setSearchOpen(true)}
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-white hover:bg-gray-100 text-black transition text-[11px] font-semibold border border-gray-300 shadow-xs cursor-pointer"
              title="Search website (Cmd+K)"
            >
              <Search className="w-3.5 h-3.5 text-black" />
              <span>Search</span>
              <kbd className="hidden sm:inline text-[9px] bg-gray-100 px-1 py-0.5 rounded text-black border border-gray-300">⌘K</kbd>
            </button>

            {/* Notifications Dropdown (Rbanms website.docx) */}
            <div className="relative">
              <button
                onClick={() => setNotificationsOpen(!notificationsOpen)}
                className="flex items-center gap-1 px-2 py-1 rounded hover:bg-gray-100 text-black transition text-[11px] cursor-pointer"
              >
                <Bell className="w-3.5 h-3.5 text-black" />
                <span className="hidden sm:inline">Notifications</span>
                {latestNotices.length > 0 && (
                  <span className="w-2 h-2 rounded-full bg-black animate-ping"></span>
                )}
              </button>
              {notificationsOpen && (
                <div
                  className="absolute right-0 mt-2 w-72 sm:w-80 bg-white rounded-xl shadow-2xl border border-gray-200 z-50 p-3 text-black animate-fade-in"
                  onClick={() => setNotificationsOpen(false)}
                >
                  <div className="flex justify-between items-center pb-2 border-b border-gray-200 mb-2">
                    <span className="font-bold text-xs uppercase tracking-wider text-black">
                      Latest Notifications
                    </span>
                    <Link href="/media/notice-board" className="text-[10px] text-gray-600 hover:underline">
                      View all
                    </Link>
                  </div>
                  <div className="space-y-2">
                    {latestNotices.slice(0, 3).map((notice: any) => (
                      <Link
                        key={notice.id}
                        href="/media/notice-board"
                        className="block p-2 rounded hover:bg-gray-50 transition"
                      >
                        <div className="font-medium text-xs line-clamp-1 text-black">{notice.title}</div>
                        <div className="text-[10px] text-gray-600 mt-0.5">{notice.category}</div>
                      </Link>
                    ))}
                    {latestNotices.length === 0 && (
                      <div className="text-xs text-gray-500 py-2">No new notifications.</div>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Downloads Link (Rbanms website.docx) */}
            <Link
              href="/admissions/downloads-forms"
              className="flex items-center gap-1 px-2 py-1 rounded hover:bg-gray-100 text-black transition text-[11px]"
            >
              <Download className="w-3.5 h-3.5 text-black" />
              <span className="hidden sm:inline">Downloads</span>
            </Link>

            {/* Quick Links Dropdown (Rbanms website.docx) */}
            <div className="relative">
              <button
                onClick={() => setQuickLinksOpen(!quickLinksOpen)}
                className="flex items-center gap-1 px-2 py-1 rounded hover:bg-gray-100 text-black transition text-[11px] cursor-pointer"
              >
                <span>Quick Links</span>
                <ChevronDown className="w-3 h-3 text-black" />
              </button>
              {quickLinksOpen && (
                <div
                  className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-2xl border border-gray-200 z-50 p-2 text-black text-xs animate-fade-in"
                  onClick={() => setQuickLinksOpen(false)}
                >
                  <Link href="/admissions/fee-structure" className="block px-3 py-1.5 rounded hover:bg-gray-50 text-black">
                    Fee Structure
                  </Link>
                  <Link href="/admissions/scholarships" className="block px-3 py-1.5 rounded hover:bg-gray-50 text-black">
                    Scholarships
                  </Link>
                  <Link href="/academics/academic-calendar" className="block px-3 py-1.5 rounded hover:bg-gray-50 text-black">
                    Academic Calendar
                  </Link>
                  <Link href="/academics/results" className="block px-3 py-1.5 rounded hover:bg-gray-50 text-black">
                    Exam Results
                  </Link>
                  <Link href="/about/management" className="block px-3 py-1.5 rounded hover:bg-gray-50 text-black">
                    Trustees &amp; Management
                  </Link>
                </div>
              )}
            </div>

            {/* Social Media Links (Rbanms website.docx) */}
            <div className="hidden xl:flex items-center gap-2.5 pl-2 border-l border-gray-200">
              <a
                href={settings?.facebookUrl || "https://facebook.com"}
                target="_blank"
                rel="noreferrer"
                className="text-black hover:text-gray-600 transition"
                aria-label="Facebook"
              >
                FB
              </a>
              <a
                href={settings?.instagramUrl || "https://instagram.com"}
                target="_blank"
                rel="noreferrer"
                className="text-black hover:text-gray-600 transition"
                aria-label="Instagram"
              >
                IG
              </a>
              <a
                href={settings?.youtubeUrl || "https://youtube.com"}
                target="_blank"
                rel="noreferrer"
                className="text-black hover:text-gray-600 transition"
                aria-label="YouTube"
              >
                YT
              </a>
            </div>

            {/* Dark Mode toggle */}
            <button
              onClick={toggleDarkMode}
              className="p-1 rounded hover:bg-gray-100 text-black hover:text-gray-600 transition cursor-pointer"
              title="Toggle Dark Mode"
            >
              {isDark ? <Sun className="w-3.5 h-3.5 text-black" /> : <Moon className="w-3.5 h-3.5" />}
            </button>

            {/* Staff & Admin Login */}
            <Link
              href="/admin/login"
              className="flex items-center gap-1 px-2.5 py-1 rounded-md bg-white hover:bg-gray-100 text-black text-[11px] font-semibold border border-gray-300 shadow-xs"
            >
              <Shield className="w-3 h-3 text-black" />
              <span>Staff Login</span>
            </Link>
          </div>
        </div>
      </div>

      <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
