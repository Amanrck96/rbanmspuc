import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { GraduationCap, CheckCircle2, ArrowRight, BookOpen, Clock, Users, Award, Download, FileCheck } from "lucide-react";

export default async function CoursesOfferedPage() {
  const courses = await prisma.course.findMany({
    where: { isPublished: true },
    orderBy: { order: "asc" },
  });

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text)] py-12 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-[#800000] dark:text-[var(--gold)]">
            Academic Programs
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-[#1E3A8A] dark:text-blue-300 font-serif">
            Courses & Combinations Offered
          </h1>
          <p className="text-sm sm:text-base text-[var(--text)]/80">
            Approved by the Karnataka Pre-University Board. Offering Science (PCMB, PCMC), Commerce (CEBA, SEBA), and Arts (HEGP) with dedicated laboratories and expert faculty.
          </p>
        </div>

        {/* Course Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map((c) => {
            return (
              <div
                key={c.id}
                id={c.code.toLowerCase()}
                className="bg-white dark:bg-[var(--card)] rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200 dark:border-slate-800 hover:border-[#1E3A8A] hover:shadow-xl transition flex flex-col justify-between space-y-6"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="badge-blue text-xs font-bold px-3.5 py-1 rounded-full uppercase tracking-wider">
                      {c.stream} Stream
                    </span>
                    <span className="text-xs font-semibold text-[var(--text)]/60">Intake: {c.intake} Seats</span>
                  </div>

                  <div>
                    <span className="text-xs font-mono font-bold text-[var(--gold)]">Code: {c.code}</span>
                    <h3 className="text-2xl font-bold text-[#1E3A8A] dark:text-blue-300 font-serif">
                      {c.code}
                    </h3>
                    <p className="text-sm font-semibold text-[var(--text)]/90 mt-0.5">{c.name}</p>
                  </div>

                  <div className="space-y-3 pt-2">
                    <div>
                      <span className="text-[11px] font-bold uppercase tracking-wider text-[#1E3A8A] dark:text-blue-300 block mb-1">
                        Core Subjects
                      </span>
                      <p className="text-xs text-[var(--text)]/80 font-medium leading-relaxed bg-[var(--maroon-tint)]/40 p-3 rounded-xl border border-[var(--maroon-light)]/15">
                        {c.subjects}
                      </p>
                    </div>

                    <div>
                      <span className="text-[11px] font-bold uppercase tracking-wider text-[var(--text)]/60 block mb-1">
                        Eligibility
                      </span>
                      <p className="text-xs text-[var(--text)]/80 leading-relaxed">
                        {c.eligibility}
                      </p>
                    </div>

                    <div>
                      <span className="text-[11px] font-bold uppercase tracking-wider text-[var(--text)]/60 block mb-1">
                        Career Prospects
                      </span>
                      <p className="text-xs text-[var(--text)]/80 leading-relaxed">
                        {c.careerProspects}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                  <span className="text-xs text-[var(--text)]/60">{c.duration}</span>
                  <Link
                    href={`/admissions/apply?course=${c.code}`}
                    className="px-4 py-2 rounded-xl bg-[#800000] hover:bg-[#5A0F1B] text-white font-bold text-xs flex items-center gap-1.5 transition shadow-xs"
                  >
                    Apply Now <ArrowRight className="w-3.5 h-3.5 text-[var(--gold)]" />
                  </Link>
                </div>
              </div>
            );
          })}
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
              Find complete combination curriculum breakdowns, laboratory practical hours, annual tuition fee schedules, and trust scholarship eligibility criteria.
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
              href="/admissions/apply"
              className="px-5 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs uppercase tracking-wider border border-white/30 transition"
            >
              Apply Online
            </Link>
          </div>
        </div>

        {/* Compulsory Languages Section */}
        <div className="bg-white dark:bg-[var(--card)] rounded-3xl p-8 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <h3 className="font-bold text-xl text-[#1E3A8A] dark:text-blue-300 font-serif">
            Compulsory Language Requirements
          </h3>
          <p className="text-xs text-[var(--text)]/80 leading-relaxed">
            In addition to the four core subjects of their chosen stream, all students must study two languages:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div className="p-4 rounded-2xl bg-[var(--maroon-tint)]/50 border border-[var(--maroon-light)]/20">
              <span className="text-xs font-bold text-[#800000] dark:text-[var(--gold)] uppercase block mb-1">
                Part I: First Language
              </span>
              <p className="text-sm font-semibold text-[var(--text)]">
                English (Compulsory for all students)
              </p>
            </div>
            <div className="p-4 rounded-2xl bg-[var(--maroon-tint)]/50 border border-[var(--maroon-light)]/20">
              <span className="text-xs font-bold text-[#800000] dark:text-[var(--gold)] uppercase block mb-1">
                Part II: Second Language (Choose One)
              </span>
              <p className="text-sm font-semibold text-[var(--text)]">
                Kannada, Hindi, or Tamil
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
