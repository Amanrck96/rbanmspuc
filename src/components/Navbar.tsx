"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Menu,
  X,
  ChevronDown,
  ChevronRight,
  GraduationCap,
  Building2,
  Compass,
  Briefcase,
  Users,
  PhoneCall,
  Sparkles,
  Award,
} from "lucide-react";

interface NavbarProps {
  settings?: any;
}

export default function Navbar({ settings }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [activeCampusMenu, setActiveCampusMenu] = useState<string | null>(null);

  // 5 Campuses and their 5 mandatory sub-pages (Section 7B)
  const campuses = [
    { id: "itpl", name: "ITPL Campus (Whitefield)" },
    { id: "hrbr", name: "HRBR Layout Campus (Kalyan Nagar)" },
    { id: "btm", name: "BTM Layout Campus (South)" },
    { id: "byrathi", name: "Byrathi Campus (Hennur)" },
    { id: "nice-road", name: "NICE Road Campus (West)" },
  ];

  const campusSubPages = [
    { label: "About Us", slug: "about" },
    { label: "Academics", slug: "academics" },
    { label: "Admissions", slug: "admissions" },
    { label: "Student Experience", slug: "student-experience" },
    { label: "College & Career Guidance", slug: "guidance" },
  ];

  // Co-curricular menu items (Section 7B)
  const coCurricularItems = [
    { label: "College & Career Guidance", href: "/co-curricular/career-guidance", desc: "Targeted competitive exam & university counseling" },
    { label: "Wellbeing & Counseling", href: "/co-curricular/wellbeing", desc: "Mental, emotional & social student wellness" },
    { label: "Outbound Learning", href: "/co-curricular/outbound-learning", desc: "Field immersions, science expeditions & bootcamps" },
    { label: "Work Exposure Programs", href: "/co-curricular/work-exposure", desc: "Corporate internships, shadow days & industrial visits" },
  ];

  return (
    <header className="sticky top-0 z-40 bg-[var(--primary)] text-white shadow-lg border-b border-white/10 backdrop-blur-md transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Brand Logo & Name (Placeholder for client re-skinning) */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative w-11 h-11 shrink-0 bg-white/10 rounded-2xl p-2 border border-white/20 shadow-xs flex items-center justify-center text-[var(--accent)] group-hover:bg-white/20 transition">
              <GraduationCap className="w-6 h-6" />
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-base sm:text-lg tracking-tight text-white font-serif leading-tight">
                Bengaluru PU College
              </span>
              <span className="font-bold text-[10px] sm:text-[11px] tracking-wider text-[var(--accent)] uppercase leading-none">
                Integrated Pre-University Portal
              </span>
              <span className="text-[9px] text-white/70 font-medium">
                5 Campuses Across Bengaluru
              </span>
            </div>
          </Link>

          {/* Desktop Navigation (Section 7B) */}
          <nav className="hidden lg:flex items-center space-x-1">
            {/* 1. About Us */}
            <Link
              href="/about"
              className="px-3 py-2 text-xs font-bold text-white/90 hover:text-[var(--accent)] hover:bg-white/10 rounded-xl transition"
            >
              About Us
            </Link>

            {/* 2. Academics */}
            <Link
              href="/academics"
              className="px-3 py-2 text-xs font-bold text-white/90 hover:text-[var(--accent)] hover:bg-white/10 rounded-xl transition"
            >
              Academics
            </Link>

            {/* 3. Campuses (Dropdown with 5 campuses and 5 sub-items each) */}
            <div
              className="relative group"
              onMouseEnter={() => setActiveDropdown("campuses")}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button
                className="flex items-center gap-1 px-3 py-2 text-xs font-bold text-white/90 hover:text-[var(--accent)] hover:bg-white/10 rounded-xl transition cursor-pointer"
              >
                <Building2 className="w-3.5 h-3.5 text-[var(--accent)]" />
                <span>Campuses</span>
                <ChevronDown className="w-3.5 h-3.5 text-[var(--accent)] group-hover:rotate-180 transition-transform duration-200" />
              </button>

              {/* Flyout 2-Column Campus Dropdown */}
              <div className="absolute top-full left-0 w-[520px] pt-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                <div className="bg-[var(--surface)] text-[var(--text)] rounded-2xl shadow-2xl border border-[var(--border)] p-4 grid grid-cols-5 gap-3">
                  {/* Left Column: 5 Campuses */}
                  <div className="col-span-2 space-y-1 border-r border-[var(--border)] pr-2">
                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-[var(--muted)] px-2 block pb-1">
                      Our 5 Campuses
                    </span>
                    {campuses.map((c) => (
                      <Link
                        key={c.id}
                        href={`/campuses/${c.id}`}
                        onMouseEnter={() => setActiveCampusMenu(c.id)}
                        className={`block px-2.5 py-1.5 rounded-xl text-xs font-bold transition flex items-center justify-between ${
                          activeCampusMenu === c.id || (!activeCampusMenu && c.id === "itpl")
                            ? "bg-[var(--tint)] text-[var(--primary)] font-extrabold"
                            : "hover:bg-[var(--tint)]/60 text-[var(--text)]"
                        }`}
                      >
                        <span className="truncate">{c.name.split("(")[0]}</span>
                        <ChevronRight className="w-3 h-3 text-[var(--secondary)] shrink-0" />
                      </Link>
                    ))}
                  </div>

                  {/* Right Column: 5 Campus Sub-Pages */}
                  <div className="col-span-3 space-y-1 pl-1">
                    <div className="flex items-center justify-between pb-1 px-2 border-b border-[var(--border)]">
                      <span className="text-[10px] font-extrabold uppercase tracking-wider text-[var(--secondary)]">
                        Campus Sub-Sections
                      </span>
                      <Link
                        href={`/campuses/${activeCampusMenu || "itpl"}`}
                        className="text-[10px] font-bold text-[var(--primary)] hover:underline"
                      >
                        Main Hub →
                      </Link>
                    </div>
                    {campusSubPages.map((sub) => (
                      <Link
                        key={sub.slug}
                        href={`/campuses/${activeCampusMenu || "itpl"}/${sub.slug}`}
                        className="block px-2.5 py-1.5 rounded-xl text-xs font-semibold text-[var(--text)] hover:bg-[var(--tint)] hover:text-[var(--primary)] transition"
                      >
                        {sub.label}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* 4. Admissions */}
            <Link
              href="/admissions"
              className="px-3 py-2 text-xs font-bold text-white/90 hover:text-[var(--accent)] hover:bg-white/10 rounded-xl transition"
            >
              Admissions
            </Link>

            {/* 5. Co-Curricular Dropdown */}
            <div
              className="relative group"
              onMouseEnter={() => setActiveDropdown("co-curricular")}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button
                className="flex items-center gap-1 px-3 py-2 text-xs font-bold text-white/90 hover:text-[var(--accent)] hover:bg-white/10 rounded-xl transition cursor-pointer"
              >
                <Compass className="w-3.5 h-3.5 text-[var(--secondary-soft)]" />
                <span>Co-Curricular</span>
                <ChevronDown className="w-3.5 h-3.5 text-[var(--accent)] group-hover:rotate-180 transition-transform duration-200" />
              </button>

              <div className="absolute top-full left-0 w-80 pt-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                <div className="bg-[var(--surface)] text-[var(--text)] rounded-2xl shadow-2xl border border-[var(--border)] p-2.5 space-y-1">
                  {coCurricularItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="block px-3 py-2 rounded-xl hover:bg-[var(--tint)] transition group/item"
                    >
                      <div className="text-xs font-bold text-[var(--text)] group-hover/item:text-[var(--primary)]">
                        {item.label}
                      </div>
                      <div className="text-[11px] text-[var(--muted)] line-clamp-1">
                        {item.desc}
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {/* 6. Careers */}
            <Link
              href="/careers"
              className="px-3 py-2 text-xs font-bold text-white/90 hover:text-[var(--accent)] hover:bg-white/10 rounded-xl transition"
            >
              Careers
            </Link>

            {/* 7. Contact Us */}
            <Link
              href="/contact"
              className="px-3 py-2 text-xs font-bold text-white/90 hover:text-[var(--accent)] hover:bg-white/10 rounded-xl transition"
            >
              Contact Us
            </Link>

            {/* 8. Alumni */}
            <Link
              href="/alumni"
              className="px-3 py-2 text-xs font-bold text-white/90 hover:text-[var(--accent)] hover:bg-white/10 rounded-xl transition"
            >
              Alumni
            </Link>

            {/* Prominent Application CTA Button */}
            <Link
              href="/admissions/apply"
              className="ml-3 px-4 py-2 rounded-xl bg-[var(--accent)] hover:brightness-110 text-[var(--primary-dark)] font-extrabold text-xs uppercase tracking-wider shadow-md transition transform hover:-translate-y-0.5 border border-white/20"
            >
              Apply Online
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 lg:hidden">
            <Link
              href="/admissions/apply"
              className="px-3 py-1.5 rounded-lg bg-[var(--accent)] text-[var(--primary-dark)] font-bold text-xs shadow-xs"
            >
              Apply
            </Link>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-white hover:bg-white/10 transition cursor-pointer"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6 text-[var(--accent)]" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Navigation (Section 7B: Identical Tree) */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-white/10 bg-[var(--primary-dark)] px-4 pt-3 pb-8 max-h-[85vh] overflow-y-auto animate-fade-in text-white space-y-3">
          <Link
            href="/"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-sm font-bold border-b border-white/10"
          >
            Home
          </Link>
          <Link
            href="/about"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-sm font-bold border-b border-white/10"
          >
            About Us
          </Link>
          <Link
            href="/academics"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-sm font-bold border-b border-white/10"
          >
            Academics
          </Link>

          {/* Campuses Accordion */}
          <div className="border-b border-white/10 pb-2">
            <div
              onClick={() => setActiveDropdown(activeDropdown === "campuses" ? null : "campuses")}
              className="flex justify-between items-center py-2 font-bold text-sm text-[var(--accent)] cursor-pointer"
            >
              <span>Our 5 Campuses</span>
              <ChevronDown className={`w-4 h-4 transform transition-transform ${activeDropdown === "campuses" ? "rotate-180" : ""}`} />
            </div>
            {activeDropdown === "campuses" && (
              <div className="pl-3 space-y-2.5 mt-2 border-l-2 border-[var(--accent)]/50">
                {campuses.map((c) => (
                  <div key={c.id} className="space-y-1">
                    <Link
                      href={`/campuses/${c.id}`}
                      onClick={() => setMobileMenuOpen(false)}
                      className="block font-bold text-xs text-white hover:text-[var(--accent)]"
                    >
                      📍 {c.name}
                    </Link>
                    <div className="pl-3 text-[11px] text-white/70 space-y-1">
                      {campusSubPages.map((sub) => (
                        <Link
                          key={sub.slug}
                          href={`/campuses/${c.id}/${sub.slug}`}
                          onClick={() => setMobileMenuOpen(false)}
                          className="block hover:text-[var(--accent)]"
                        >
                          • {sub.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <Link
            href="/admissions"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-sm font-bold border-b border-white/10"
          >
            Admissions
          </Link>

          {/* Co-curricular Accordion */}
          <div className="border-b border-white/10 pb-2">
            <div
              onClick={() => setActiveDropdown(activeDropdown === "co-curricular" ? null : "co-curricular")}
              className="flex justify-between items-center py-2 font-bold text-sm text-white cursor-pointer"
            >
              <span>Co-Curricular</span>
              <ChevronDown className={`w-4 h-4 transform transition-transform ${activeDropdown === "co-curricular" ? "rotate-180" : ""}`} />
            </div>
            {activeDropdown === "co-curricular" && (
              <div className="pl-3 space-y-1.5 mt-1 border-l-2 border-[var(--secondary-soft)]">
                {coCurricularItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="block text-xs text-white/80 hover:text-[var(--accent)] py-1"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            )}
          </div>

          <Link
            href="/careers"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-sm font-bold border-b border-white/10"
          >
            Careers
          </Link>
          <Link
            href="/contact"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-sm font-bold border-b border-white/10"
          >
            Contact Us
          </Link>
          <Link
            href="/alumni"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-sm font-bold border-b border-white/10"
          >
            Alumni
          </Link>

          <div className="pt-4 flex flex-col gap-2">
            <Link
              href="/admissions/apply"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center py-3 rounded-xl bg-[var(--accent)] text-[var(--primary-dark)] font-extrabold text-sm shadow-md"
            >
              Apply Online 2025–2026
            </Link>
            <Link
              href="/admin/login"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center py-2.5 rounded-xl bg-white/10 text-white font-semibold text-xs border border-white/20"
            >
              Educator & CRM Portal
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
