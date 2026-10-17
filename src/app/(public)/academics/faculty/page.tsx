import { prisma } from "@/lib/prisma";
import Image from "next/image";
import { Mail, GraduationCap, Award, BookOpen } from "lucide-react";

export default async function FacultyPage() {
  const [departments, faculty] = await Promise.all([
    prisma.department.findMany({
      orderBy: { order: "asc" },
      include: {
        faculty: {
          where: { isPublished: true },
          orderBy: { order: "asc" },
        },
      },
    }),
    prisma.faculty.findMany({
      where: { isPublished: true },
      include: { department: true },
      orderBy: [{ department: { order: "asc" } }, { order: "asc" }],
    }),
  ]);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-blue-700 dark:text-blue-400">
            Teaching Excellence
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-slate-100 font-serif">
            Faculty Directory
          </h1>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400">
            Our experienced and dedicated educators bring decades of subject mastery, board examination expertise, and student mentorship across Science, Commerce, Arts, and Languages.
          </p>
        </div>

        {/* Departments & Faculty Section */}
        <div className="space-y-16">
          {departments.map((dept) => (
            <div key={dept.id} className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b-2 border-blue-600/30">
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
                    {dept.stream} Stream
                  </span>
                  <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 font-serif">
                    {dept.name}
                  </h2>
                </div>
                {dept.labs && (
                  <span className="text-xs text-slate-500 dark:text-slate-400 bg-white dark:bg-slate-900 px-3 py-1 rounded-full border border-gray-200 dark:border-slate-800">
                    🔬 {dept.labs}
                  </span>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {dept.faculty.map((fac) => (
                  <div
                    key={fac.id}
                    className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 shadow-xs hover:shadow-lg transition space-y-4 flex flex-col justify-between"
                  >
                    <div className="space-y-4">
                      <div className="flex items-center gap-4">
                        <div className="relative w-16 h-16 rounded-2xl overflow-hidden bg-slate-100 dark:bg-slate-800 shrink-0 border-2 border-amber-500/30">
                          <Image
                            src={fac.photoUrl || "/uploads/principal.svg"}
                            alt={fac.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <h3 className="font-bold text-base text-slate-900 dark:text-slate-100 leading-snug">
                            {fac.name}
                          </h3>
                          <div className="text-xs text-blue-700 dark:text-blue-400 font-semibold">
                            {fac.designation}
                          </div>
                          <div className="text-[11px] text-gray-500">{fac.experience} Experience</div>
                        </div>
                      </div>

                      <div className="space-y-2 text-xs text-slate-600 dark:text-slate-300">
                        <div className="flex items-center gap-2">
                          <GraduationCap className="w-4 h-4 text-amber-600 shrink-0" />
                          <span>{fac.qualification}</span>
                        </div>
                        {fac.email && (
                          <div className="flex items-center gap-2">
                            <Mail className="w-4 h-4 text-blue-600 shrink-0" />
                            <a href={`mailto:${fac.email}`} className="hover:underline text-blue-600 dark:text-blue-400">
                              {fac.email}
                            </a>
                          </div>
                        )}
                        {fac.bio && (
                          <p className="text-xs text-slate-500 dark:text-slate-400 pt-1 italic">
                            &ldquo;{fac.bio}&rdquo;
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
