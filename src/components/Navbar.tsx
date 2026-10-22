"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Menu,
  X,
  ChevronDown,
  GraduationCap,
  BookOpen,
  Award,
  Calendar,
  Compass,
  Building,
  Phone,
  FileText,
  Users,
  ShieldAlert,
  HelpCircle,
  Clock,
  FlaskConical,
  Trophy,
  Camera,
  HeartHandshake,
  CheckCircle,
  Building2,
  Sparkles,
} from "lucide-react";

interface NavbarProps {
  settings?: any;
}

export default function Navbar({ settings }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  // Exact navigation tree from "RBANMS PU College Website - Information Map" (Rbanms website.docx)
  const navLinks = [
    { label: "Home", href: "/" },
    {
      label: "About Us",
      href: "/about/history",
      dropdown: [
        { label: "History & Founder Arcot Mudaliar", href: "/about/history", desc: "Our 1883 philanthropic heritage" },
        { label: "Legacy, Vision & Mission", href: "/about/legacy-vision-mission", desc: "Core values & principles" },
        { label: "Principal's Message", href: "/about/principals-message", desc: "Words from Dr. K. S. Rajendra" },
        { label: "Director's Message", href: "/about/directors-message", desc: "Vision from Prof. Vasantha Kumar" },
        { label: "Management & Trustees", href: "/about/management", desc: "RBANMS Educational Charities Board" },
        { label: "Who's Who", href: "/about/whos-who", desc: "Leadership and administrative directory" },
        { label: "Statements & Declarations", href: "/about/statements", desc: "Anti-ragging, inclusion & safety" },
        { label: "Accreditation & Recognition", href: "/about/accreditation-recognition", desc: "Karnataka PU Board code AS0042" },
        { label: "Policies & Mandatory Documents", href: "/about/policies-documents", desc: "Student code & disclosures" },
      ],
    },
    {
      label: "Admissions",
      href: "/admissions/admission-process",
      dropdown: [
        { label: "Admission Process & Guidelines", href: "/admissions/admission-process", desc: "How to apply for I Year PUC" },
        { label: "Eligibility Criteria", href: "/admissions/eligibility", desc: "SSLC / Class 10 requirements" },
        { label: "Courses Offered", href: "/admissions/courses-offered", desc: "Science, Commerce & Arts streams" },
        { label: "Fee Structure (2025-26)", href: "/admissions/fee-structure", desc: "Transparent, affordable fees" },
        { label: "Scholarships & Concessions", href: "/admissions/scholarships", desc: "Trust endowment & merit aid" },
        { label: "Prospectus & Brochure", href: "/admissions/prospectus", desc: "Official 2025-26 college handbook" },
        { label: "Downloads & Forms", href: "/admissions/downloads-forms", desc: "Application & declaration forms" },
        { label: "Frequently Asked Questions", href: "/admissions/faqs", desc: "Common queries answered" },
        { label: "Apply / Enquiry Online", href: "/admissions/apply", desc: "Submit online application" },
      ],
    },
    {
      label: "Academics",
      href: "/academics/departments",
      dropdown: [
        { label: "Departments", href: "/academics/departments", desc: "Specialized academic faculties" },
        { label: "Faculty Directory", href: "/academics/faculty", desc: "Meet our dedicated educators" },
        { label: "Academic Calendar", href: "/academics/academic-calendar", desc: "Term schedule & exam milestones" },
        { label: "Timetable & Schedules", href: "/academics/timetable", desc: "Class and practical lecture hours" },
        { label: "Curriculum & Syllabus", href: "/academics/syllabus", desc: "Karnataka PU Board NCERT curriculum" },
        { label: "Examinations & Tests", href: "/academics/examination", desc: "Unit tests, preparatory & finals" },
        { label: "Board Results", href: "/academics/results", desc: "98.4% pass record & distinctions" },
        { label: "Library & Resource Center", href: "/academics/library", desc: "25,000+ volumes & journals" },
        { label: "Computer Laboratories", href: "/academics/computer-lab", desc: "120 workstations with gigabit LAN" },
        { label: "Science Laboratories", href: "/academics/science-laboratories", desc: "Spacious Physics, Chem & Bio labs" },
      ],
    },
    {
      label: "Student Life",
      href: "/student-life/sports",
      dropdown: [
        { label: "Sports & Athletics", href: "/student-life/sports", desc: "Cricket, volleyball, track & field" },
        { label: "National Cadet Corps (NCC)", href: "/student-life/ncc", desc: "Army & Naval wings" },
        { label: "Cultural Activities", href: "/student-life/cultural-activities", desc: "Music, dance & drama festivals" },
        { label: "Clubs & Societies", href: "/student-life/clubs-societies", desc: "Science, Commerce & Rotaract clubs" },
        { label: "Career Guidance & Counseling", href: "/student-life/career-guidance", desc: "Mentorship & competitive coaching" },
        { label: "Student Achievements", href: "/student-life/student-achievements", desc: "State ranks & sports medals" },
        { label: "Campus Facilities", href: "/student-life/campus-facilities", desc: "Ulsoor Lake campus amenities" },
        { label: "Transport & Connectivity", href: "/student-life/transport", desc: "Metro & BMTC connectivity" },
        { label: "College Canteen", href: "/student-life/canteen", desc: "Hygienic vegetarian dining" },
      ],
    },
    {
      label: "Media",
      href: "/media/notice-board",
      dropdown: [
        { label: "Digital Notice Board", href: "/media/notice-board", desc: "Official circulars & timetables" },
        { label: "News & Press Releases", href: "/media/news", desc: "Latest campus achievements" },
        { label: "Official Announcements", href: "/media/announcements", desc: "Advisories & department updates" },
        { label: "Circulars & Government Orders", href: "/media/circulars", desc: "PU department directives" },
        { label: "Upcoming & Past Events", href: "/media/events", desc: "Science & Commerce fests, sports day" },
        { label: "Photo Gallery", href: "/media/photo-gallery", desc: "Campus & activity photographs" },
        { label: "Video Gallery", href: "/media/video-gallery", desc: "Event recordings & celebrations" },
      ],
    },
    {
      label: "Alumni",
      href: "/alumni/alumni",
      dropdown: [
        { label: "Alumni Recognition", href: "/alumni/alumni", desc: "Global network of proud graduates" },
        { label: "Success Stories", href: "/alumni/success-stories", desc: "Distinguished alumni journeys" },
      ],
    },
    { label: "Contact", href: "/contact" },
  ];

  return (
    <header className="sticky top-0 z-40 bg-[var(--primary)] text-white shadow-lg border-b border-[var(--border)] backdrop-blur-md transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Brand Logo & Name (Using official RBANM's Educational Institutions crest) */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative w-16 h-12 shrink-0 bg-white rounded-xl p-1 border border-white/20 shadow-xs flex items-center justify-center overflow-hidden group-hover:scale-105 transition">
              <Image
                src={settings?.logoUrl || "/images/rbanms-logo.png"}
                alt="RBANMS Educational Institutions Logo"
                fill
                className="object-contain p-0.5"
                priority
              />
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-base sm:text-lg tracking-tight text-white font-serif leading-none group-hover:text-[var(--accent)] transition">
                RBANM&apos;S
              </span>
              <span className="font-bold text-xs sm:text-sm tracking-wider text-[var(--accent)] uppercase leading-tight">
                Pre-University College
              </span>
              <span className="text-[10px] text-white/80 font-medium tracking-wide">
                ESTD. 1883 • Near Ulsoor Lake, Bengaluru
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-0.5 xl:space-x-1">
            {navLinks.map((link) => {
              const hasDropdown = !!link.dropdown;
              return (
                <div
                  key={link.label}
                  className="relative group"
                  onMouseEnter={() => hasDropdown && setActiveDropdown(link.label)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <Link
                    href={link.href}
                    className="flex items-center gap-1 px-2.5 xl:px-3 py-2 text-xs xl:text-sm font-semibold text-white/95 hover:text-[var(--accent)] hover:bg-white/10 rounded-lg transition"
                  >
                    <span>{link.label}</span>
                    {hasDropdown && (
                      <ChevronDown className="w-3.5 h-3.5 text-[var(--accent)] group-hover:rotate-180 transition-transform duration-200" />
                    )}
                  </Link>

                  {/* Dropdown Menu */}
                  {hasDropdown && (
                    <div className="absolute top-full left-0 w-72 pt-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                      <div className="bg-white dark:bg-[var(--card)] rounded-2xl shadow-2xl border border-[var(--border)] p-2.5 space-y-1">
                        {link.dropdown?.map((sub) => (
                          <Link
                            key={sub.label}
                            href={sub.href}
                            className="block p-2 rounded-xl hover:bg-[var(--tint)] transition group/item"
                          >
                            <div className="font-bold text-xs text-[var(--primary)] group-hover/item:text-[var(--secondary)] transition-colors">
                              {sub.label}
                            </div>
                            {sub.desc && (
                              <div className="text-[11px] text-[var(--muted)] line-clamp-1 mt-0.5">
                                {sub.desc}
                              </div>
                            )}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}

            {/* Quick Apply CTA */}
            <Link
              href="/admissions/apply"
              className="ml-2 px-3.5 py-2 rounded-xl bg-[var(--accent)] hover:brightness-110 text-[var(--primary-dark)] font-extrabold text-xs uppercase tracking-wider shadow-sm transition"
            >
              Apply Online
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center gap-2">
            <Link
              href="/admissions/apply"
              className="px-3 py-1.5 rounded-lg bg-[var(--accent)] text-[var(--primary-dark)] text-xs font-bold uppercase tracking-wider"
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

      {/* Mobile Drawer Navigation matching Rbanms website.docx */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-white/10 bg-[var(--primary-dark)] px-4 pt-3 pb-8 max-h-[85vh] overflow-y-auto animate-fade-in text-white space-y-3">
          {navLinks.map((link) => (
            <div key={link.label} className="border-b border-white/10 pb-2">
              <Link
                href={link.href}
                onClick={() => !link.dropdown && setMobileMenuOpen(false)}
                className="block py-2 text-sm font-bold text-white hover:text-[var(--accent)]"
              >
                {link.label}
              </Link>
              {link.dropdown && (
                <div className="pl-3 space-y-1 mt-1 border-l border-[var(--accent)]/30">
                  {link.dropdown.map((sub) => (
                    <Link
                      key={sub.label}
                      href={sub.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className="block py-1 text-xs text-white/80 hover:text-[var(--accent)]"
                    >
                      {sub.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}

          {/* Concept Demo & Campuses Link */}
          <div className="pt-2">
            <Link
              href="/campuses"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-between p-3 rounded-xl bg-white/10 text-xs font-bold text-[var(--accent)]"
            >
              <span>Explore Multi-Campus Demo</span>
              <Building2 className="w-4 h-4" />
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
