import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { GraduationCap, CheckCircle2, ArrowRight, BookOpen, Clock, Users, Award } from "lucide-react";

export default async function CoursesOfferedPage() {
  const courses = await prisma.course.findMany({
    where: { isPublished: true },
    orderBy: { order: "asc" },
  });

  const streamColors: Record<string, { bg: string; text: string; badge: string }> = {
    SCIENCE: {
      bg: "border-blue-200 dark:border-blue-900",
      text: "text-blue-700 dark:text-blue-300",
      badge: "bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-200",
    },
    COMMERCE: {
      bg: "border-amber-200 dark:border-amber-900",
      text: "text-amber-700 dark:text-amber-300",
      badge: "bg-amber-100 text-amber-800 dark:bg-amber-900/50 dark:text-amber-200",
    },
    ARTS: {
      bg: "border-purple-200 dark:border-purple-900",
      text: "text-purple-700 dark:text-purple-300",
      badge: "bg-purple-100 text-purple-800 dark:bg-purple-900/50 dark:text-purple-200",
    },
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-blue-700 dark:text-blue-400">
            Academic Programs
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-slate-100 font-serif">
            Courses & Combinations Offered
          </h1>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400">
            Approved by the Karnataka Pre-University Board. Offering Science (PCMB, PCMC), Commerce (CEBA, SEBA), and Arts (HEGP) with dedicated laboratories and expert faculty.
          </p>
        </div>

        {/* Course Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map((c) => {
            const styles = streamColors[c.stream] || streamColors.SCIENCE;
            return (
              <div
                key={c.id}
                id={c.code.toLowerCase()}
                className={`bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 shadow-sm border ${styles.bg} hover:shadow-xl transition flex flex-col justify-between space-y-6`}
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className={`text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider ${styles.badge}`}>
                      {c.stream} Stream
                    </span>
                    <span className="text-xs font-semibold text-gray-500">Intake: {c.intake} Seats</span>
                  </div>

                  <div>
                    <span className="text-xs font-mono font-bold text-gray-400">Code: {c.code}</span>
                    <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-100 font-serif">
                      {c.code}
                    </h3>
                    <p className={`text-sm font-semibold ${styles.text} mt-0.5`}>{c.name}</p>
                  </div>

                  <div className="space-y-3 pt-2">
                    <div>
                      <span className="text-[11px] font-bold uppercase tracking-wider text-gray-400 block mb-1">
                        Core Subjects
                      </span>
                      <p className="text-xs text-slate-700 dark:text-slate-300 font-medium leading-relaxed bg-slate-50 dark:bg-slate-800/60 p-3 rounded-xl border border-gray-100 dark:border-slate-800">
                        {c.subjects}
                      </p>
                    </div>

                    <div>
                      <span className="text-[11px] font-bold uppercase tracking-wider text-gray-400 block mb-1">
                        Eligibility
                      </span>
                      <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                        {c.eligibility}
                      </p>
                    </div>

                    <div>
                      <span className="text-[11px] font-bold uppercase tracking-wider text-gray-400 block mb-1">
                        Career Prospects
                      </span>
                      <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                        {c.careerProspects}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-100 dark:border-slate-800 flex items-center justify-between">
                  <span className="text-xs text-gray-500">{c.duration}</span>
                  <Link
                    href={`/admissions/apply?course=${c.code}`}
                    className="px-4 py-2 rounded-xl bg-blue-700 hover:bg-blue-800 text-white font-bold text-xs flex items-center gap-1.5 transition"
                  >
                    Apply Now <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {/* Compulsory Languages Section */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 border border-gray-200 dark:border-slate-800 shadow-sm space-y-4">
          <h3 className="font-bold text-xl text-slate-900 dark:text-slate-100 font-serif">
            Compulsory Language Requirements
          </h3>
          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
            In addition to the four core subjects of their chosen stream, all students must study two languages:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div className="p-4 rounded-2xl bg-blue-50/50 dark:bg-slate-800/50 border border-blue-100 dark:border-slate-800">
              <span className="text-xs font-bold text-blue-700 dark:text-blue-300 uppercase block mb-1">
                Part I: First Language
              </span>
              <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                English (Compulsory for all students)
              </p>
            </div>
            <div className="p-4 rounded-2xl bg-amber-50/50 dark:bg-slate-800/50 border border-amber-100 dark:border-slate-800">
              <span className="text-xs font-bold text-amber-700 dark:text-amber-300 uppercase block mb-1">
                Part II: Second Language (Choose One)
              </span>
              <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                Kannada, Hindi, or Tamil
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
