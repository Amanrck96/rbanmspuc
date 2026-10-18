import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { GraduationCap, CheckCircle2, ArrowRight, BookOpen, Clock, Users, Award } from "lucide-react";

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
          <span className="text-xs font-bold uppercase tracking-widest text-[var(--maroon)] dark:text-[var(--gold)]">
            Academic Programs
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-[var(--maroon)] dark:text-white font-serif">
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
                className="bg-white dark:bg-[var(--card)] rounded-3xl p-6 sm:p-8 shadow-sm border border-[var(--maroon-light)]/20 hover:border-[var(--maroon)] hover:shadow-xl transition flex flex-col justify-between space-y-6"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider bg-[var(--maroon-tint)] text-[var(--maroon)] dark:text-[var(--gold)] border border-[var(--maroon-light)]/30">
                      {c.stream} Stream
                    </span>
                    <span className="text-xs font-semibold text-[var(--text)]/60">Intake: {c.intake} Seats</span>
                  </div>

                  <div>
                    <span className="text-xs font-mono font-bold text-[var(--gold)]">Code: {c.code}</span>
                    <h3 className="text-2xl font-bold text-[var(--maroon)] dark:text-white font-serif">
                      {c.code}
                    </h3>
                    <p className="text-sm font-semibold text-[var(--text)]/90 mt-0.5">{c.name}</p>
                  </div>

                  <div className="space-y-3 pt-2">
                    <div>
                      <span className="text-[11px] font-bold uppercase tracking-wider text-[var(--maroon)] dark:text-[var(--gold)] block mb-1">
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

                <div className="pt-4 border-t border-[var(--maroon-light)]/15 flex items-center justify-between">
                  <span className="text-xs text-[var(--text)]/60">{c.duration}</span>
                  <Link
                    href={`/admissions/apply?course=${c.code}`}
                    className="px-4 py-2 rounded-xl bg-[var(--maroon)] hover:bg-[var(--maroon-dark)] text-white font-bold text-xs flex items-center gap-1.5 transition shadow-xs"
                  >
                    Apply Now <ArrowRight className="w-3.5 h-3.5 text-[var(--gold)]" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {/* Compulsory Languages Section */}
        <div className="bg-white dark:bg-[var(--card)] rounded-3xl p-8 border border-[var(--maroon-light)]/20 shadow-sm space-y-4">
          <h3 className="font-bold text-xl text-[var(--maroon)] dark:text-[var(--gold)] font-serif">
            Compulsory Language Requirements
          </h3>
          <p className="text-xs text-[var(--text)]/80 leading-relaxed">
            In addition to the four core subjects of their chosen stream, all students must study two languages:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div className="p-4 rounded-2xl bg-[var(--maroon-tint)]/50 border border-[var(--maroon-light)]/20">
              <span className="text-xs font-bold text-[var(--maroon)] dark:text-[var(--gold)] uppercase block mb-1">
                Part I: First Language
              </span>
              <p className="text-sm font-semibold text-[var(--text)]">
                English (Compulsory for all students)
              </p>
            </div>
            <div className="p-4 rounded-2xl bg-[var(--maroon-tint)]/50 border border-[var(--maroon-light)]/20">
              <span className="text-xs font-bold text-[var(--maroon)] dark:text-[var(--gold)] uppercase block mb-1">
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
