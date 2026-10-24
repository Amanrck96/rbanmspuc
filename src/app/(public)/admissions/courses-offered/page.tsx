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
          <span className="text-xs font-bold uppercase tracking-widest text-black">
            Academic Programs
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-black font-serif">
            Courses & Combinations Offered
          </h1>
          <p className="text-sm sm:text-base text-gray-700">
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
                className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-gray-200 hover:border-black transition flex flex-col justify-between space-y-6"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="bg-gray-100 text-black border border-gray-300 text-xs font-bold px-3.5 py-1 rounded-full uppercase tracking-wider">
                      {c.stream} Stream
                    </span>
                    <span className="text-xs font-semibold text-gray-500">Intake: {c.intake} Seats</span>
                  </div>

                  <div>
                    <span className="text-xs font-mono font-bold text-black">Code: {c.code}</span>
                    <h3 className="text-2xl font-bold text-black font-serif">
                      {c.code}
                    </h3>
                    <p className="text-sm font-semibold text-black mt-0.5">{c.name}</p>
                  </div>

                  <div className="space-y-3 pt-2">
                    <div>
                      <span className="text-[11px] font-bold uppercase tracking-wider text-black block mb-1">
                        Core Subjects
                      </span>
                      <p className="text-xs text-black font-medium leading-relaxed bg-gray-50 p-3 rounded-xl border border-gray-200">
                        {c.subjects}
                      </p>
                    </div>

                    <div>
                      <span className="text-[11px] font-bold uppercase tracking-wider text-gray-500 block mb-1">
                        Eligibility
                      </span>
                      <p className="text-xs text-black leading-relaxed">
                        {c.eligibility}
                      </p>
                    </div>

                    <div>
                      <span className="text-[11px] font-bold uppercase tracking-wider text-gray-500 block mb-1">
                        Career Prospects
                      </span>
                      <p className="text-xs text-black leading-relaxed">
                        {c.careerProspects}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-200 flex items-center justify-between">
                  <span className="text-xs text-gray-500">{c.duration}</span>
                  <Link
                    href={`/admissions/apply?course=${c.code}`}
                    className="px-4 py-2 rounded-xl bg-white hover:bg-gray-100 text-black border border-black font-bold text-xs flex items-center gap-1.5 transition shadow-xs"
                  >
                    Apply Now <ArrowRight className="w-3.5 h-3.5 text-black" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {/* Prospectus Feature Card */}
        <div className="rounded-3xl p-8 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6 border border-gray-200 bg-white shadow-sm">
          <div className="space-y-3 text-center md:text-left max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gray-100 text-black text-xs font-bold uppercase tracking-wider border border-gray-300">
              <FileCheck className="w-3.5 h-3.5 text-black" /> Official College Handbook
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-black font-serif">
              Download Academic Prospectus 2025–26
            </h3>
            <p className="text-xs sm:text-sm text-gray-700 leading-relaxed">
              Find complete combination curriculum breakdowns, laboratory practical hours, annual tuition fee schedules, and trust scholarship eligibility criteria.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
            <a
              href="/uploads/rbanms-prospectus-2025-26.pdf"
              target="_blank"
              download
              className="px-6 py-3.5 rounded-xl font-extrabold text-xs uppercase tracking-wider flex items-center gap-2 transition bg-white text-black border-2 border-black hover:bg-gray-100 shadow-sm"
            >
              <Download className="w-4 h-4 text-black" /> Download Prospectus PDF
            </a>
            <Link
              href="/admissions/apply"
              className="px-5 py-3 rounded-xl bg-white hover:bg-gray-100 text-black font-bold text-xs uppercase tracking-wider border border-gray-300 transition"
            >
              Apply Online
            </Link>
          </div>
        </div>

        {/* Compulsory Languages Section */}
        <div className="bg-white rounded-3xl p-8 border border-gray-200 shadow-sm space-y-4">
          <h3 className="font-bold text-xl text-black font-serif">
            Compulsory Language Requirements
          </h3>
          <p className="text-xs text-gray-700 leading-relaxed">
            In addition to the four core subjects of their chosen stream, all students must study two languages:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div className="p-4 rounded-2xl bg-gray-50 border border-gray-200">
              <span className="text-xs font-bold text-black uppercase block mb-1">
                Part I: First Language
              </span>
              <p className="text-sm font-semibold text-black">
                English (Compulsory for all students)
              </p>
            </div>
            <div className="p-4 rounded-2xl bg-gray-50 border border-gray-200">
              <span className="text-xs font-bold text-black uppercase block mb-1">
                Part II: Second Language (Choose One)
              </span>
              <p className="text-sm font-semibold text-black">
                Kannada, Hindi, or Tamil
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
