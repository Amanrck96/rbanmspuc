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
    { label: "Admissions 2025", href: "/admissions/apply", icon: GraduationCap, bg: "bg-white hover:bg-gray-50", text: "text-black" },
    { label: "Courses Offered", href: "/admissions/courses-offered", icon: BookOpen, bg: "bg-white hover:bg-gray-50", text: "text-black" },
    { label: "Exam Results", href: "/academics/results", icon: Award, bg: "bg-white hover:bg-gray-50", text: "text-black" },
    { label: "Contact Us", href: "/contact", icon: Phone, bg: "bg-white hover:bg-gray-50", text: "text-black" },
    { label: "Downloads & Forms", href: "/admissions/downloads-forms", icon: Download, bg: "bg-white hover:bg-gray-50", text: "text-black" },
    { label: "Notice Board", href: "/media/notice-board", icon: Bell, bg: "bg-white hover:bg-gray-50", text: "text-black" },
  ];

  return (
    <div className="space-y-16 pb-16 bg-white text-black transition-colors">
      {/* 1. Hero Section */}
      <section className="relative min-h-[560px] flex items-center justify-center bg-white border-b border-gray-200 overflow-hidden">
        {/* Background Campus Illustration */}
        <div className="absolute inset-0 opacity-10 grayscale">
          <Image
            src="/uploads/campus-hero.svg"
            alt="RBANMS Campus"
            fill
            className="object-cover"
            priority
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-white via-white/80 to-transparent" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center sm:text-left flex flex-col lg:flex-row items-center justify-between gap-12">
          <div className="max-w-2xl space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gray-100 border border-gray-300 text-black text-xs font-bold tracking-wide uppercase">
              <Sparkles className="w-3.5 h-3.5 text-black" /> 140+ Years of Academic Distinction
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-black tracking-tight font-serif leading-tight">
              Empowering Minds, <br />
              <span>Enriching Character</span>{" "}
              Since 1883.
            </h1>
            <p className="text-base sm:text-lg text-gray-700 leading-relaxed font-normal">
              Founded by Dharmarathnakara Rai Bahadur Arcot Narrainswamy Mudaliar.
              Bengaluru&apos;s premier pre-university institution offering comprehensive education in
              Science, Commerce, and Arts with outstanding faculty and modern laboratories.
            </p>
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 pt-2">
              <Link
                href="/admissions/apply"
                className="px-6 py-3.5 rounded-xl bg-white hover:bg-gray-100 text-black font-extrabold text-sm uppercase tracking-wider shadow-sm transition transform hover:-translate-y-0.5 border-2 border-black"
              >
                Apply for Admission 2025-26
              </Link>
              <Link
                href="/admissions/courses-offered"
                className="px-6 py-3.5 rounded-xl bg-white hover:bg-gray-100 border border-gray-300 text-black font-bold text-sm transition"
              >
                Explore Courses
              </Link>
            </div>
          </div>

          {/* Quick Notice Widget */}
          <div className="w-full lg:w-96 bg-white rounded-2xl p-5 border border-gray-200 shadow-xl text-left">
            <div className="flex items-center justify-between pb-3 border-b border-gray-200 mb-4">
              <div className="flex items-center gap-2 text-black font-bold text-sm">
                <Bell className="w-4 h-4 text-black" /> Live Announcements
              </div>
              <Link href="/media/notice-board" className="text-xs text-gray-600 hover:text-black underline">
                View All
              </Link>
            </div>
            <div className="space-y-3">
              {notices.slice(0, 3).map((notice) => (
                <Link
                  key={notice.id}
                  href="/media/notice-board"
                  className="block p-3 rounded-xl bg-gray-50 hover:bg-gray-100 border border-gray-200 transition group"
                >
                  <div className="text-xs text-gray-600 font-semibold uppercase tracking-wider mb-1">
                    {notice.category}
                  </div>
                  <div className="text-xs font-medium text-black group-hover:text-gray-700 line-clamp-2">
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
                className={`p-4 rounded-2xl ${btn.bg} ${btn.text} border border-gray-200 shadow-md hover:shadow-lg transition transform hover:-translate-y-1 flex flex-col items-center text-center justify-center gap-2 group`}
              >
                <div className="p-2.5 rounded-xl bg-gray-100 border border-gray-200 group-hover:scale-110 transition-transform">
                  <Icon className="w-5 h-5 text-black" />
                </div>
                <span className="font-bold text-xs tracking-tight">{btn.label}</span>
              </Link>
            );
          })}
        </div>
      </section>

      {/* 3. Key Institutional Stats */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 p-8 rounded-3xl bg-gray-50 border border-gray-200 shadow-xs">
          <div className="text-center space-y-1">
            <div className="text-3xl sm:text-4xl font-extrabold text-black dark:text-black font-serif">1883</div>
            <div className="text-xs font-semibold text-[var(--text)]/80 uppercase tracking-wider">
              Year of Foundation
            </div>
          </div>
          <div className="text-center space-y-1">
            <div className="text-3xl sm:text-4xl font-extrabold text-black dark:text-black font-serif">98.4%</div>
            <div className="text-xs font-semibold text-[var(--text)]/80 uppercase tracking-wider">
              PU Board Pass Rate
            </div>
          </div>
          <div className="text-center space-y-1">
            <div className="text-3xl sm:text-4xl font-extrabold text-black dark:text-black font-serif">50,000+</div>
            <div className="text-xs font-semibold text-[var(--text)]/80 uppercase tracking-wider">
              Distinguished Alumni
            </div>
          </div>
          <div className="text-center space-y-1">
            <div className="text-3xl sm:text-4xl font-extrabold text-black dark:text-black font-serif">100%</div>
            <div className="text-xs font-semibold text-[var(--text)]/80 uppercase tracking-wider">
              Dedicated Faculty
            </div>
          </div>
        </div>
      </section>

      {/* 4. Academic Streams Overview */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-black">
            Curriculum & Combinations
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-black font-serif">
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
              <h3 className="text-xl font-bold text-black font-serif">PCMB & PCMC</h3>
              <p className="text-xs text-[var(--text)]/80 leading-relaxed">
                Physics, Chemistry, Mathematics with Biology or Computer Science. Supported by advanced laboratories and KCET/NEET coaching.
              </p>
              <ul className="space-y-2 text-xs text-[var(--text)]/90">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-black shrink-0" />
                  Engineering & Medical Pathways
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-black shrink-0" />
                  Separate Physics, Chem & Bio Labs
                </li>
              </ul>
            </div>
            <div className="pt-6 border-t border-slate-100 dark:border-slate-800 mt-6">
              <Link
                href="/admissions/courses-offered#pcmc"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-black hover:gap-2 transition-all link-maroon"
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
              <h3 className="text-xl font-bold text-black font-serif">CEBA & SEBA</h3>
              <p className="text-xs text-[var(--text)]/80 leading-relaxed">
                Accountancy, Business Studies, Economics with Computer Science or Statistics. Foundation for CA, CS, and Corporate Finance.
              </p>
              <ul className="space-y-2 text-xs text-[var(--text)]/90">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-black shrink-0" />
                  Chartered Accountancy Mentorship
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-black shrink-0" />
                  Business Simulation Software Lab
                </li>
              </ul>
            </div>
            <div className="pt-6 border-t border-slate-100 dark:border-slate-800 mt-6">
              <Link
                href="/admissions/courses-offered#ceba"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-black hover:gap-2 transition-all link-maroon"
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
              <h3 className="text-xl font-bold text-black font-serif">HEGP</h3>
              <p className="text-xs text-[var(--text)]/80 leading-relaxed">
                History, Economics, Geography, and Political Science. The ideal springboard for Civil Services (UPSC/KPSC), Law, and Public Administration.
              </p>
              <ul className="space-y-2 text-xs text-[var(--text)]/90">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-black shrink-0" />
                  Civil Services Foundation Club
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-black shrink-0" />
                  Heritage Archival Map Room
                </li>
              </ul>
            </div>
            <div className="pt-6 border-t border-slate-100 dark:border-slate-800 mt-6">
              <Link
                href="/admissions/courses-offered#hegp"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-black hover:gap-2 transition-all link-maroon"
              >
                View Arts Syllabus <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>

        {/* Prospectus Feature Card */}
        <div className="rounded-3xl p-8 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6 border-2 border-gray-200 bg-white text-black shadow-sm">
          <div className="space-y-3 text-center md:text-left max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gray-100 text-black text-xs font-bold uppercase tracking-wider border border-gray-300">
              <FileCheck className="w-3.5 h-3.5 text-black" /> Official College Handbook
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-black font-serif">
              Download Academic Prospectus 2025–26
            </h3>
            <p className="text-xs sm:text-sm text-gray-700 leading-relaxed">
              Detailed fee structure, subject combinations, scholarship rules, laboratory details, and sports amenities in one comprehensive PDF guide.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
            <a
              href="/uploads/rbanms-prospectus-2025-26.pdf"
              target="_blank"
              download
              className="px-6 py-3.5 rounded-xl font-extrabold text-xs uppercase tracking-wider flex items-center gap-2 transition bg-white hover:bg-gray-100 text-black border-2 border-black shadow-xs"
            >
              <Download className="w-4 h-4 text-black" /> Download Prospectus PDF
            </a>
            <Link
              href="/admissions/prospectus"
              className="px-5 py-3 rounded-xl bg-white hover:bg-gray-100 text-black font-bold text-xs uppercase tracking-wider border border-gray-300 transition"
            >
              View Online
            </Link>
          </div>
        </div>
      </section>

      {/* 5. Principal's Message Preview & Heritage Story */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-white text-black p-8 sm:p-12 border border-gray-200 shadow-sm overflow-hidden relative">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-4 flex justify-center">
              <div className="relative w-56 h-64 sm:w-64 sm:h-72 rounded-2xl overflow-hidden border-2 border-gray-200 shadow-sm">
                <Image
                  src="/uploads/principal.jpg"
                  alt="Principal Dr. K. S. Rajendra"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
            <div className="lg:col-span-8 space-y-4 text-left">
              <span className="text-xs font-bold uppercase tracking-widest text-gray-600">
                From the Desk of the Principal
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold font-serif text-black">
                &ldquo;A Bridge of Excellence Transforming Young Aspirations&rdquo;
              </h2>
              <blockquote className="text-sm text-gray-700 italic leading-relaxed border-l-2 border-black pl-4">
                &ldquo;At RBANMS, we nurture not just academic proficiency, but moral fortitude and intellectual inquiry.
                For more than a century, our portals have opened doors of opportunity for every dedicated student.
                I warmly welcome you to experience holistic pre-university learning on our historic campus.&rdquo;
              </blockquote>
              <div className="pt-2">
                <div className="font-bold text-sm text-black">Dr. K. S. Rajendra, M.Sc., Ph.D.</div>
                <div className="text-xs text-gray-600">Principal, RBANMS Pre-University College</div>
              </div>
              <div className="pt-2">
                <Link
                  href="/about/principals-message"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white hover:bg-gray-100 text-black font-extrabold text-xs uppercase tracking-wider transition border-2 border-black shadow-xs"
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
            <div className="flex items-center justify-between pb-3 border-b border-gray-200">
              <h3 className="text-2xl font-bold text-black font-serif flex items-center gap-2">
                <Calendar className="w-6 h-6 text-black" /> Upcoming Events
              </h3>
              <Link href="/media/events" className="text-xs font-bold text-black hover:underline">
                View Calendar
              </Link>
            </div>
            <div className="space-y-4">
              {events.map((ev) => (
                <div
                  key={ev.id}
                  className="flex gap-4 p-4 rounded-2xl bg-white border border-gray-200 shadow-xs hover:border-black hover:shadow-sm transition"
                >
                  <div className="w-16 h-16 rounded-xl bg-gray-100 text-black border border-gray-200 flex flex-col items-center justify-center shrink-0">
                    <span className="text-lg font-extrabold font-serif">
                      {new Date(ev.eventDate).getDate()}
                    </span>
                    <span className="text-[10px] font-bold uppercase">
                      {new Date(ev.eventDate).toLocaleString("en-IN", { month: "short" })}
                    </span>
                  </div>
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-gray-600">
                      {ev.category}
                    </span>
                    <h4 className="font-bold text-sm text-black">{ev.title}</h4>
                    <p className="text-xs text-gray-600 line-clamp-2">{ev.description}</p>
                    <div className="flex items-center gap-1 text-[11px] text-gray-500 pt-1">
                      <MapPin className="w-3 h-3 text-black" /> {ev.venue}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Announcements & Notice Board */}
          <div className="space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-gray-200">
              <h3 className="text-2xl font-bold text-black font-serif flex items-center gap-2">
                <Bell className="w-6 h-6 text-black" /> Official Circulars
              </h3>
              <Link href="/media/notice-board" className="text-xs font-bold text-black hover:underline">
                All Notices
              </Link>
            </div>
            <div className="space-y-3">
              {notices.map((notice) => (
                <div
                  key={notice.id}
                  className="p-4 rounded-2xl bg-white border border-gray-200 shadow-xs hover:border-black transition"
                >
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-gray-100 text-black border border-gray-200 uppercase">
                      {notice.category}
                    </span>
                    <span className="text-[11px] text-gray-500">
                      {new Date(notice.date).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}
                    </span>
                  </div>
                  <h4 className="font-bold text-sm text-black">{notice.title}</h4>
                  <p className="text-xs text-gray-600 mt-1 line-clamp-2">
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
          <span className="text-xs font-bold uppercase tracking-widest text-gray-600">
            Hall of Distinction
          </span>
          <h2 className="text-3xl font-extrabold text-black font-serif">
            Recent Institutional Achievements
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {achievements.map((ach) => (
            <div
              key={ach.id}
              className="p-6 rounded-3xl bg-white border border-gray-200 shadow-xs hover:shadow-md hover:border-black transition space-y-3"
            >
              <div className="p-3 rounded-2xl bg-gray-100 text-black w-fit">
                <Award className="w-6 h-6 text-black" />
              </div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-gray-500">
                {ach.category} • {ach.year}
              </span>
              <h4 className="font-bold text-base text-black">{ach.title}</h4>
              <div className="text-xs font-semibold text-gray-800">{ach.recipient}</div>
              <p className="text-xs text-gray-600">{ach.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 8. Photo Gallery Preview */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex items-center justify-between pb-3 border-b border-gray-200">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-gray-600">
              Campus Moments
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-black font-serif">
              Life at RBANMS
            </h2>
          </div>
          <Link
            href="/media/photo-gallery"
            className="text-xs font-bold text-black hover:underline inline-flex items-center gap-1"
          >
            Explore Gallery <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {gallery.map((g) => (
            <div
              key={g.id}
              className="group relative h-44 rounded-2xl overflow-hidden border border-gray-200 shadow-xs"
            >
              <Image
                src={g.url}
                alt={g.title}
                fill
                className="object-cover group-hover:scale-105 transition duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-3 flex flex-col justify-end">
                <span className="text-[10px] font-semibold text-white leading-tight">{g.title}</span>
                <span className="text-[9px] text-gray-200">{g.category}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 9. Admission Call to Action */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-white p-8 sm:p-12 text-black text-center space-y-6 shadow-sm border-2 border-gray-200">
          <h2 className="text-3xl sm:text-4xl font-extrabold font-serif tracking-tight text-black">
            Begin Your Pre-University Journey With RBANMS
          </h2>
          <p className="max-w-2xl mx-auto text-sm sm:text-base text-gray-700 leading-relaxed">
            Limited seats available for Science (PCMB/PCMC), Commerce (SEBA/CEBA), and Arts (HEGP).
            Apply online today or connect with our admissions counselors for immediate guidance.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <Link
              href="/admissions/apply"
              className="px-8 py-3.5 rounded-xl bg-white hover:bg-gray-100 text-black font-extrabold text-sm uppercase tracking-wider shadow-sm transition transform hover:-translate-y-0.5 border-2 border-black"
            >
              Start Online Application
            </Link>
            <Link
              href="/contact"
              className="px-6 py-3.5 rounded-xl bg-white hover:bg-gray-100 text-black font-bold text-sm transition border border-gray-300"
            >
              Visit Campus Desk
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
