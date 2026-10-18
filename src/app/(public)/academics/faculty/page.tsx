import { prisma } from "@/lib/prisma";
import FacultyDirectoryClient from "./FacultyDirectoryClient";

export default async function FacultyPage() {
  const departments = await prisma.department.findMany({
    orderBy: { order: "asc" },
    include: {
      faculty: {
        where: { isPublished: true },
        orderBy: { order: "asc" },
      },
    },
  });

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text)] py-12 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-[#800000] dark:text-[var(--gold)]">
            Teaching Excellence
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-[#1E3A8A] dark:text-blue-300 font-serif">
            Faculty Directory
          </h1>
          <p className="text-sm sm:text-base text-[var(--text)]/80">
            Our experienced and dedicated educators bring decades of subject mastery, board examination expertise, and student mentorship across Science, Commerce, Arts, and Languages.
          </p>
        </div>

        {/* Client Interactive Filter Component */}
        <FacultyDirectoryClient departments={JSON.parse(JSON.stringify(departments))} />
      </div>
    </div>
  );
}
