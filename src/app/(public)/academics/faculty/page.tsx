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
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text)] py-12 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-[var(--maroon)] dark:text-[var(--gold)]">
            Teaching Excellence
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-[var(--maroon)] dark:text-white font-serif">
            Faculty Directory
          </h1>
          <p className="text-sm sm:text-base text-[var(--text)]/80">
            Our experienced and dedicated educators bring decades of subject mastery, board examination expertise, and student mentorship across Science, Commerce, Arts, and Languages.
          </p>
        </div>

        {/* Departments & Faculty Section */}
        <div className="space-y-16">
          {departments.map((dept) => (
            <div key={dept.id} className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b-2 border-[var(--maroon)]/30">
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[var(--gold)]">
                    {dept.stream} Stream
                  </span>
                  <h2 className="text-2xl font-bold text-[var(--maroon)] dark:text-white font-serif">
                    {dept.name}
                  </h2>
                </div>
                {dept.labs && (
                  <span className="text-xs text-[var(--text)]/70 bg-white dark:bg-[var(--card)] px-3 py-1 rounded-full border border-[var(--maroon-light)]/20 shadow-xs">
                    🔬 {dept.labs}
                  </span>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {dept.faculty.map((fac) => (
                  <div
                    key={fac.id}
                    className="p-6 rounded-3xl bg-white dark:bg-[var(--card)] border border-[var(--maroon-light)]/20 shadow-xs hover:shadow-lg hover:border-[var(--maroon)] transition space-y-4 flex flex-col justify-between"
                  >
                    <div className="space-y-4">
                      <div className="flex items-center gap-4">
                        <div className="relative w-16 h-16 rounded-2xl overflow-hidden bg-[var(--maroon-tint)] shrink-0 border-2 border-[var(--gold)]/50">
                          <Image
                            src={fac.photoUrl || "/uploads/avatar-placeholder.svg"}
                            alt={fac.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <h3 className="font-bold text-base text-[var(--text)] leading-snug">
                            {fac.name}
                          </h3>
                          <div className="text-xs text-[var(--maroon)] dark:text-[var(--gold)] font-semibold">
                            {fac.designation}
                          </div>
                          <div className="text-[11px] text-[var(--text)]/60">{fac.experience} Experience</div>
                        </div>
                      </div>

                      <div className="space-y-2 text-xs text-[var(--text)]/80">
                        <div className="flex items-center gap-2">
                          <GraduationCap className="w-4 h-4 text-[var(--gold)] shrink-0" />
                          <span>{fac.qualification}</span>
                        </div>
                        {fac.email && (
                          <div className="flex items-center gap-2">
                            <Mail className="w-4 h-4 text-[var(--maroon)] dark:text-[var(--gold)] shrink-0" />
                            <a href={`mailto:${fac.email}`} className="hover:underline text-[var(--maroon)] dark:text-[var(--gold)] link-maroon">
                              {fac.email}
                            </a>
                          </div>
                        )}
                        {fac.bio && (
                          <p className="text-xs text-[var(--text)]/70 pt-1 italic">
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
