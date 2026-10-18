import Link from "next/link";
import Image from "next/image";
import { prisma } from "@/lib/prisma";
import {
  GraduationCap,
  BookOpen,
  Award,
  Bell,
  Download,
  Phone,
  ArrowRight,
  Calendar,
  CheckCircle2,
  Sparkles,
  MapPin,
  Clock,
  ArrowUpRight,
  FileCheck,
} from "lucide-react";

export default async function HomePage() {
  const [
    settings,
    notices,
    events,
    achievements,
    gallery,
    principalPage,
    courses,
  ] = await Promise.all([
    prisma.siteSetting.findUnique({ where: { id: "default" } }),
    prisma.notice.findMany({
      where: { isPublished: true },
      orderBy: [{ isPinned: "desc" }, { date: "desc" }],
      take: 6,
    }),
    prisma.event.findMany({
      where: { isPublished: true },
      orderBy: { eventDate: "asc" },
      take: 4,
    }),
    prisma.achievement.findMany({
      where: { isPublished: true },
      orderBy: { createdAt: "desc" },
      take: 3,
    }),
    prisma.galleryItem.findMany({
      take: 6,
      orderBy: { order: "asc" },
    }),
    prisma.page.findUnique({
      where: { slug: "principals-message" },
    }),
    prisma.course.findMany({
      where: { isPublished: true },
      orderBy: { order: "asc" },
    }),
  ]);

  const quickActionButtons = [
    { label: "Admissions 2025", href: "/admissions/apply", icon: GraduationCap, bg: "bg-[var(--maroon)] hover:bg-[var(--maroon-dark)]", text: "text-white" },
    { label: "Courses Offered", href: "/admissions/courses-offered", icon: BookOpen, bg: "bg-[var(--maroon-dark)] hover:bg-[var(--maroon)]", text: "text-white" },
    { label: "Exam Results", href: "/academics/results", icon: Award, bg: "bg-[var(--maroon)] hover:bg-[var(--maroon-dark)]", text: "text-white" },
    { label: "Contact Us", href: "/contact", icon: Phone, bg: "bg-[var(--maroon-dark)] hover:bg-[var(--maroon)]", text: "text-white" },
    { label: "Downloads & Forms", href: "/admissions/downloads-forms", icon: Download, bg: "bg-[var(--maroon)] hover:bg-[var(--maroon-dark)]", text: "text-white" },
    { label: "Notice Board", href: "/media/notice-board", icon: Bell, bg: "bg-[var(--maroon-dark)] hover:bg-[var(--maroon)]", text: "text-white" },
  ];

  return (
    <div className="space-y-16 pb-16 bg-[var(--bg)] text-[var(--text)] transition-colors">
      {/* 1. Hero Section */}
      <section className="relative min-h-[560px] flex items-center justify-center bg-[var(--maroon-dark)] overflow-hidden">
        {/* Background Campus Illustration */}
        <div className="absolute inset-0 opacity-20">
          <Image
            src="/uploads/campus-hero.svg"
            alt="RBANMS Campus"
            fill
            className="object-cover"
            priority
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--maroon-dark)] via-[var(--maroon-dark)]/90 to-transparent" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center sm:text-left flex flex-col lg:flex-row items-center justify-between gap-12">
          <div className="max-w-2xl space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[var(--gold)]/20 border border-[var(--gold)]/40 text-[var(--gold)] text-xs font-bold tracking-wide uppercase">
              <Sparkles className="w-3.5 h-3.5 text-[var(--gold)]" /> 140+ Years of Academic Distinction
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight font-serif leading-tight">
              Empowering Minds, <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--gold)] via-[#E5C158] to-[var(--gold)]">
                Enriching Character
              </span>{" "}
              Since 1883.
            </h1>
            <p className="text-base sm:text-lg text-white/90 leading-relaxed font-normal">
              Founded by Dharmarathnakara Rai Bahadur Arcot Narrainswamy Mudaliar.
              Bengaluru&apos;s premier pre-university institution offering comprehensive education in
              Science, Commerce, and Arts with outstanding faculty and modern laboratories.
            </p>
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 pt-2">
              <Link
                href="/admissions/apply"
                className="px-6 py-3.5 rounded-xl bg-white hover:bg-[var(--maroon-tint)] text-[var(--maroon)] font-extrabold text-sm uppercase tracking-wider shadow-lg shadow-black/20 transition transform hover:-translate-y-0.5 border border-white/40"
              >
                Apply for Admission 2025-26
              </Link>
              <Link
                href="/admissions/courses-offered"
                className="px-6 py-3.5 rounded-xl bg-[var(--maroon)] hover:bg-[var(--maroon-light)] border border-[var(--gold)]/60 text-white font-bold text-sm transition"
              >
                Explore Courses
              </Link>
            </div>
          </div>

          {/* Quick Notice Widget */}
          <div className="w-full lg:w-96 bg-[var(--maroon)]/40 backdrop-blur-md rounded-2xl p-5 border border-[var(--gold)]/30 shadow-2xl text-left">
            <div className="flex items-center justify-between pb-3 border-b border-[var(--gold)]/30 mb-4">
              <div className="flex items-center gap-2 text-[var(--gold)] font-bold text-sm">
                <Bell className="w-4 h-4 text-[var(--gold)]" /> Live Announcements
              </div>
              <Link href="/media/notice-board" className="text-xs text-white/80 hover:text-[var(--gold)] underline">
                View All
              </Link>
            </div>
            <div className="space-y-3">
              {notices.slice(0, 3).map((notice) => (
                <Link
                  key={notice.id}
                  href="/media/notice-board"
                  className="block p-3 rounded-xl bg-black/20 hover:bg-black/30 border border-white/10 transition group"
                >
                  <div className="text-xs text-[var(--gold)] font-semibold uppercase tracking-wider mb-1">
                    {notice.category}
                  </div>
                  <div className="text-xs font-medium text-white group-hover:text-[var(--gold)] line-clamp-2">
                    {notice.title}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 2. Quick Action Buttons */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 sm:-mt-14 relative z-10">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          {quickActionButtons.map((btn) => {
            const Icon = btn.icon;
            return (
              <Link
                key={btn.label}
                href={btn.href}
                className={`p-4 rounded-2xl ${btn.bg} ${btn.text} border border-[var(--gold)]/30 shadow-xl hover:shadow-2xl transition transform hover:-translate-y-1 flex flex-col items-center text-center justify-center gap-2 group`}
              >
                <div className="p-2.5 rounded-xl bg-white/15 backdrop-blur-xs group-hover:scale-110 transition-transform">
                  <Icon className="w-5 h-5 text-[var(--gold)]" />
                </div>
                <span className="font-bold text-xs tracking-tight">{btn.label}</span>
              </Link>
            );
          })}
        </div>
      </section>

      {/* 3. Key Institutional Stats */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 p-8 rounded-3xl bg-[var(--maroon-tint)] border border-[var(--maroon-light)]/20 shadow-xs">
          <div className="text-center space-y-1">
            <div className="text-3xl sm:text-4xl font-extrabold text-[var(--maroon)] dark:text-[var(--gold)] font-serif">1883</div>
            <div className="text-xs font-semibold text-[var(--text)]/80 uppercase tracking-wider">
              Year of Foundation
            </div>
          </div>
          <div className="text-center space-y-1">
            <div className="text-3xl sm:text-4xl font-extrabold text-[var(--maroon)] dark:text-[var(--gold)] font-serif">98.4%</div>
            <div className="text-xs font-semibold text-[var(--text)]/80 uppercase tracking-wider">
              PU Board Pass Rate
            </div>
          </div>
          <div className="text-center space-y-1">
            <div className="text-3xl sm:text-4xl font-extrabold text-[var(--maroon)] dark:text-[var(--gold)] font-serif">50,000+</div>
            <div className="text-xs font-semibold text-[var(--text)]/80 uppercase tracking-wider">
              Distinguished Alumni
            </div>
          </div>
          <div className="text-center space-y-1">
            <div className="text-3xl sm:text-4xl font-extrabold text-[var(--maroon)] dark:text-[var(--gold)] font-serif">100%</div>
            <div className="text-xs font-semibold text-[var(--text)]/80 uppercase tracking-wider">
              Dedicated Faculty
            </div>
          </div>
        </div>
      </section>

      {/* 4. Academic Streams Overview */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-[#800000] dark:text-[var(--gold)]">
            Curriculum & Combinations
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1E3A8A] dark:text-blue-300 font-serif">
            Courses Offered at RBANMS
          </h2>
          <p className="text-sm text-[var(--text)]/80">
            Approved by the Department of Pre-University Education, Karnataka. Designed to foster both board excellence and national competitive examination success.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Science Stream */}
          <div className="rounded-3xl p-6 bg-white dark:bg-[var(--card)] border border-slate-200 dark:border-slate-800 shadow-md hover:shadow-xl hover:border-[#1E3A8A] transition flex flex-col justify-between">
            <div className="space-y-4">
              <div className="badge-blue px-3.5 py-1 text-xs font-bold uppercase tracking-wider">
                Science Stream
              </div>
              <h3 className="text-xl font-bold text-[#1E3A8A] dark:text-blue-300 font-serif">PCMB & PCMC</h3>
              <p className="text-xs text-[var(--text)]/80 leading-relaxed">
                Physics, Chemistry, Mathematics with Biology or Computer Science. Supported by advanced laboratories and KCET/NEET coaching.
              </p>
              <ul className="space-y-2 text-xs text-[var(--text)]/90">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#800000] dark:text-[var(--gold)] shrink-0" />
                  Engineering & Medical Pathways
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#800000] dark:text-[var(--gold)] shrink-0" />
                  Separate Physics, Chem & Bio Labs
                </li>
              </ul>
            </div>
            <div className="pt-6 border-t border-slate-100 dark:border-slate-800 mt-6">
              <Link
                href="/admissions/courses-offered#pcmc"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-[#800000] dark:text-[var(--gold)] hover:gap-2 transition-all link-maroon"
              >
                View Science Syllabus <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Commerce Stream */}
          <div className="rounded-3xl p-6 bg-white dark:bg-[var(--card)] border border-slate-200 dark:border-slate-800 shadow-md hover:shadow-xl hover:border-[#1E3A8A] transition flex flex-col justify-between">
            <div className="space-y-4">
              <div className="badge-blue px-3.5 py-1 text-xs font-bold uppercase tracking-wider">
                Commerce Stream
              </div>
              <h3 className="text-xl font-bold text-[#1E3A8A] dark:text-blue-300 font-serif">CEBA & SEBA</h3>
              <p className="text-xs text-[var(--text)]/80 leading-relaxed">
                Accountancy, Business Studies, Economics with Computer Science or Statistics. Foundation for CA, CS, and Corporate Finance.
              </p>
              <ul className="space-y-2 text-xs text-[var(--text)]/90">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#800000] dark:text-[var(--gold)] shrink-0" />
                  Chartered Accountancy Mentorship
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#800000] dark:text-[var(--gold)] shrink-0" />
                  Business Simulation Software Lab
                </li>
              </ul>
            </div>
            <div className="pt-6 border-t border-slate-100 dark:border-slate-800 mt-6">
              <Link
                href="/admissions/courses-offered#ceba"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-[#800000] dark:text-[var(--gold)] hover:gap-2 transition-all link-maroon"
              >
                View Commerce Syllabus <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Arts Stream */}
          <div className="rounded-3xl p-6 bg-white dark:bg-[var(--card)] border border-slate-200 dark:border-slate-800 shadow-md hover:shadow-xl hover:border-[#1E3A8A] transition flex flex-col justify-between">
            <div className="space-y-4">
              <div className="badge-blue px-3.5 py-1 text-xs font-bold uppercase tracking-wider">
                Humanities Stream
              </div>
              <h3 className="text-xl font-bold text-[#1E3A8A] dark:text-blue-300 font-serif">HEGP</h3>
              <p className="text-xs text-[var(--text)]/80 leading-relaxed">
                History, Economics, Geography, and Political Science. The ideal springboard for Civil Services (UPSC/KPSC), Law, and Public Administration.
              </p>
              <ul className="space-y-2 text-xs text-[var(--text)]/90">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#800000] dark:text-[var(--gold)] shrink-0" />
                  Civil Services Foundation Club
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#800000] dark:text-[var(--gold)] shrink-0" />
                  Heritage Archival Map Room
                </li>
              </ul>
            </div>
            <div className="pt-6 border-t border-slate-100 dark:border-slate-800 mt-6">
              <Link
                href="/admissions/courses-offered#hegp"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-[#800000] dark:text-[var(--gold)] hover:gap-2 transition-all link-maroon"
              >
                View Arts Syllabus <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>

        {/* Prospectus Feature Card in Maroon (#800000) with Gold Trim */}
        <div className="prospectus-card rounded-3xl p-8 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6 border-2 border-[var(--gold)]">
          <div className="space-y-3 text-center md:text-left max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 text-[var(--gold)] text-xs font-bold uppercase tracking-wider border border-[var(--gold)]/40">
              <FileCheck className="w-3.5 h-3.5 text-[var(--gold)]" /> Official College Handbook
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white font-serif">
              Download Academic Prospectus 2025–26
            </h3>
            <p className="text-xs sm:text-sm text-white/90 leading-relaxed">
              Detailed fee structure, subject combinations, scholarship rules, laboratory details, and sports amenities in one comprehensive PDF guide.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
            <a
              href="/uploads/rbanms-prospectus-2025-26.pdf"
              target="_blank"
              download
              className="btn-prospectus px-6 py-3.5 rounded-xl font-extrabold text-xs uppercase tracking-wider flex items-center gap-2 transition"
            >
              <Download className="w-4 h-4 text-[var(--maroon-dark)]" /> Download Prospectus PDF
            </a>
            <Link
              href="/admissions/prospectus"
              className="px-5 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs uppercase tracking-wider border border-white/30 transition"
            >
              View Online
            </Link>
          </div>
        </div>
      </section>

      {/* 5. Principal's Message Preview & Heritage Story */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-gradient-to-br from-[var(--maroon-dark)] via-[#420A13] to-[var(--maroon)] text-white p-8 sm:p-12 border border-[var(--gold)]/30 shadow-2xl overflow-hidden relative">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-4 flex justify-center">
              <div className="relative w-56 h-64 sm:w-64 sm:h-72 rounded-2xl overflow-hidden border-4 border-[var(--gold)]/60 shadow-2xl">
                <Image
                  src="/uploads/principal.jpg"
                  alt="Principal Dr. K. S. Rajendra"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
            <div className="lg:col-span-8 space-y-4 text-left">
              <span className="text-xs font-bold uppercase tracking-widest text-[var(--gold)]">
                From the Desk of the Principal
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold font-serif">
                &ldquo;A Bridge of Excellence Transforming Young Aspirations&rdquo;
              </h2>
              <blockquote className="text-sm text-white/90 italic leading-relaxed border-l-2 border-[var(--gold)] pl-4">
                &ldquo;At RBANMS, we nurture not just academic proficiency, but moral fortitude and intellectual inquiry.
                For more than a century, our portals have opened doors of opportunity for every dedicated student.
                I warmly welcome you to experience holistic pre-university learning on our historic campus.&rdquo;
              </blockquote>
              <div className="pt-2">
                <div className="font-bold text-sm text-white">Dr. K. S. Rajendra, M.Sc., Ph.D.</div>
                <div className="text-xs text-[var(--gold)]">Principal, RBANMS Pre-University College</div>
              </div>
              <div className="pt-2">
                <Link
                  href="/about/principals-message"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[var(--gold)] hover:brightness-110 text-[var(--maroon-dark)] font-extrabold text-xs uppercase tracking-wider transition shadow-md"
                >
                  Read Full Message <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Upcoming Events & Notice Board */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Upcoming Events */}
          <div className="space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
              <h3 className="text-2xl font-bold text-[#1E3A8A] dark:text-blue-300 font-serif flex items-center gap-2">
                <Calendar className="w-6 h-6 text-[#800000] dark:text-[var(--gold)]" /> Upcoming Events
              </h3>
              <Link href="/media/events" className="text-xs font-bold text-[#800000] dark:text-[var(--gold)] hover:underline link-maroon">
                View Calendar
              </Link>
            </div>
            <div className="space-y-4">
              {events.map((ev) => (
                <div
                  key={ev.id}
                  className="flex gap-4 p-4 rounded-2xl bg-white dark:bg-[var(--card)] border border-slate-200 dark:border-slate-800 shadow-xs hover:border-[#1E3A8A] hover:shadow-md transition"
                >
                  <div className="w-16 h-16 rounded-xl bg-[var(--maroon-tint)] text-[#800000] dark:text-[var(--gold)] border border-[var(--maroon-light)]/30 flex flex-col items-center justify-center shrink-0">
                    <span className="text-lg font-extrabold font-serif">
                      {new Date(ev.eventDate).getDate()}
                    </span>
                    <span className="text-[10px] font-bold uppercase">
                      {new Date(ev.eventDate).toLocaleString("en-IN", { month: "short" })}
                    </span>
                  </div>
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--gold)]">
                      {ev.category}
                    </span>
                    <h4 className="font-bold text-sm text-[#1E3A8A] dark:text-blue-300">{ev.title}</h4>
                    <p className="text-xs text-[var(--text)]/70 line-clamp-2">{ev.description}</p>
                    <div className="flex items-center gap-1 text-[11px] text-[var(--text)]/60 pt-1">
                      <MapPin className="w-3 h-3 text-[#800000]" /> {ev.venue}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Announcements & Notice Board */}
          <div className="space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
              <h3 className="text-2xl font-bold text-[#1E3A8A] dark:text-blue-300 font-serif flex items-center gap-2">
                <Bell className="w-6 h-6 text-[#800000] dark:text-[var(--gold)]" /> Official Circulars
              </h3>
              <Link href="/media/notice-board" className="text-xs font-bold text-[#800000] dark:text-[var(--gold)] hover:underline link-maroon">
                All Notices
              </Link>
            </div>
            <div className="space-y-3">
              {notices.map((notice) => (
                <div
                  key={notice.id}
                  className="p-4 rounded-2xl bg-white dark:bg-[var(--card)] border border-slate-200 dark:border-slate-800 shadow-xs hover:border-[#1E3A8A] transition"
                >
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-50 text-[#1E3A8A] border border-blue-200 uppercase">
                      {notice.category}
                    </span>
                    <span className="text-[11px] text-[var(--text)]/60">
                      {new Date(notice.date).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}
                    </span>
                  </div>
                  <h4 className="font-bold text-sm text-[#1E3A8A] dark:text-blue-300">{notice.title}</h4>
                  <p className="text-xs text-[var(--text)]/70 mt-1 line-clamp-2">
                    {notice.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 7. Achievements Showcase */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-bold uppercase tracking-widest text-[#800000] dark:text-[var(--gold)]">
            Hall of Distinction
          </span>
          <h2 className="text-3xl font-extrabold text-[#1E3A8A] dark:text-blue-300 font-serif">
            Recent Institutional Achievements
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {achievements.map((ach) => (
            <div
              key={ach.id}
              className="p-6 rounded-3xl bg-white dark:bg-[var(--card)] border border-slate-200 dark:border-slate-800 shadow-xs hover:shadow-lg hover:border-[#1E3A8A] transition space-y-3"
            >
              <div className="p-3 rounded-2xl bg-[var(--maroon-tint)] text-[#800000] dark:text-[var(--gold)] w-fit">
                <Award className="w-6 h-6 text-[#800000]" />
              </div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--text)]/60">
                {ach.category} • {ach.year}
              </span>
              <h4 className="font-bold text-base text-[#1E3A8A] dark:text-blue-300">{ach.title}</h4>
              <div className="text-xs font-semibold text-[#800000] dark:text-[var(--gold)]">{ach.recipient}</div>
              <p className="text-xs text-[var(--text)]/70">{ach.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 8. Photo Gallery Preview */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-[#800000] dark:text-[var(--gold)]">
              Campus Moments
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1E3A8A] dark:text-blue-300 font-serif">
              Life at RBANMS
            </h2>
          </div>
          <Link
            href="/media/photo-gallery"
            className="text-xs font-bold text-[#800000] dark:text-[var(--gold)] hover:underline inline-flex items-center gap-1 link-maroon"
          >
            Explore Gallery <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {gallery.map((g) => (
            <div
              key={g.id}
              className="group relative h-44 rounded-2xl overflow-hidden border border-[var(--maroon-light)]/20 shadow-xs"
            >
              <Image
                src={g.url}
                alt={g.title}
                fill
                className="object-cover group-hover:scale-110 transition duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--maroon-dark)]/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-3 flex flex-col justify-end">
                <span className="text-[10px] font-semibold text-white leading-tight">{g.title}</span>
                <span className="text-[9px] text-[var(--gold)]">{g.category}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 9. Admission Call to Action */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-gradient-to-r from-[var(--maroon-dark)] via-[#420A13] to-[var(--maroon)] p-8 sm:p-12 text-white text-center space-y-6 shadow-2xl border border-[var(--gold)]/40">
          <h2 className="text-3xl sm:text-4xl font-extrabold font-serif tracking-tight">
            Begin Your Pre-University Journey With RBANMS
          </h2>
          <p className="max-w-2xl mx-auto text-sm sm:text-base text-white/90 leading-relaxed">
            Limited seats available for Science (PCMB/PCMC), Commerce (SEBA/CEBA), and Arts (HEGP).
            Apply online today or connect with our admissions counselors for immediate guidance.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <Link
              href="/admissions/apply"
              className="px-8 py-3.5 rounded-xl bg-[var(--gold)] hover:brightness-110 text-[var(--maroon-dark)] font-extrabold text-sm uppercase tracking-wider shadow-lg transition transform hover:-translate-y-0.5"
            >
              Start Online Application
            </Link>
            <Link
              href="/contact"
              className="px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-sm transition border border-[var(--gold)]/40"
            >
              Visit Campus Desk
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
