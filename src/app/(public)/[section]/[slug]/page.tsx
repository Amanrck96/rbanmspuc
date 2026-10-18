import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { ChevronRight, ArrowRight, BookOpen, Clock, Calendar, CheckCircle2 } from "lucide-react";

interface PageProps {
  params: Promise<{
    section: string;
    slug: string;
  }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const page = await prisma.page.findUnique({ where: { slug } });
  if (!page) return { title: "Page Not Found | RBANMS PU College" };

  return {
    title: `${page.title} | RBANMS PU College`,
    description: page.subtitle || `Information about ${page.title} at RBANMS Pre-University College Bengaluru.`,
  };
}

export default async function DynamicSectionPage({ params }: PageProps) {
  const { section, slug } = await params;

  const [page, relatedPages, settings] = await Promise.all([
    prisma.page.findUnique({
      where: { slug },
    }),
    prisma.page.findMany({
      where: { section, isPublished: true },
      orderBy: { order: "asc" },
      select: { id: true, title: true, slug: true, section: true },
    }),
    prisma.siteSetting.findUnique({ where: { id: "default" } }),
  ]);

  if (!page || !page.isPublished) {
    notFound();
  }

  const formatSectionTitle = (sec: string) => {
    switch (sec) {
      case "about":
        return "About Us";
      case "admissions":
        return "Admissions";
      case "academics":
        return "Academics";
      case "student-life":
        return "Student Life";
      case "media":
        return "Media & Press";
      case "alumni":
        return "Alumni";
      case "contact":
        return "Contact";
      default:
        return sec.replace(/-/g, " ");
    }
  };

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text)] py-10 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-2 text-xs font-medium text-[var(--text)]/70">
          <Link href="/" className="hover:text-[var(--maroon)] dark:hover:text-[var(--gold)] transition">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="capitalize">{formatSectionTitle(section)}</span>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-[var(--maroon)] dark:text-[var(--gold)] font-bold">{page.title}</span>
        </nav>

        {/* Page Banner & Header */}
        <div className="relative rounded-3xl overflow-hidden bg-[var(--maroon-dark)] text-white shadow-xl min-h-[220px] flex items-center border border-[var(--gold)]/30">
          {page.bannerImage && (
            <div className="absolute inset-0 opacity-20">
              <Image
                src={page.bannerImage}
                alt={page.title}
                fill
                className="object-cover"
              />
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-r from-[var(--maroon-dark)] via-[var(--maroon-dark)]/90 to-transparent" />
          <div className="relative p-8 sm:p-12 max-w-3xl space-y-3">
            <span className="text-xs font-bold uppercase tracking-widest text-[var(--gold)]">
              {formatSectionTitle(section)}
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-serif tracking-tight leading-tight text-white">
              {page.title}
            </h1>
            {page.subtitle && (
              <p className="text-sm sm:text-base text-white/90 font-normal leading-relaxed">
                {page.subtitle}
              </p>
            )}
          </div>
        </div>

        {/* Two Column Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Main Article Content from DB */}
          <article className="lg:col-span-8 bg-white dark:bg-[var(--card)] rounded-3xl p-6 sm:p-10 shadow-sm border border-[var(--maroon-light)]/20 space-y-6">
            <div
              className="prose dark:prose-invert max-w-none 
                prose-headings:font-serif prose-headings:font-bold prose-headings:text-[#1E3A8A] dark:prose-headings:text-blue-300
                prose-h2:text-2xl prose-h2:border-b prose-h2:border-slate-200 dark:prose-h2:border-slate-800 prose-h2:pb-2 prose-h2:mt-8
                prose-h3:text-xl prose-h3:mt-6
                prose-p:text-[var(--text)]/90 prose-p:leading-relaxed prose-p:text-base
                prose-ul:list-disc prose-ul:pl-6 prose-ul:space-y-2
                prose-ol:list-decimal prose-ol:pl-6 prose-ol:space-y-2
                prose-blockquote:border-l-4 prose-blockquote:border-[var(--gold)] prose-blockquote:bg-[var(--maroon-tint)] prose-blockquote:p-4 prose-blockquote:rounded-r-xl prose-blockquote:italic
                prose-table:w-full prose-table:border-collapse prose-th:bg-[var(--maroon-tint)] prose-th:text-[#1E3A8A] dark:prose-th:text-blue-300 prose-th:p-3 prose-td:p-3 prose-td:border-b prose-td:border-slate-200 dark:prose-td:border-slate-800
                prose-a:text-[#800000] dark:text-[var(--gold)] prose-a:underline hover:prose-a:text-[var(--maroon-dark)]"
              dangerouslySetInnerHTML={{ __html: page.content }}
            />

            {/* In-page Action Box */}
            <div className="pt-8 border-t border-slate-100 dark:border-slate-800 mt-10">
              <div className="p-6 rounded-2xl bg-gradient-to-r from-[var(--maroon-dark)] to-[var(--maroon)] text-white flex flex-col sm:flex-row items-center justify-between gap-4 border border-[var(--gold)]/30">
                <div>
                  <h4 className="font-bold text-base font-serif text-white">Have questions about admissions?</h4>
                  <p className="text-xs text-white/80 mt-1">Our counseling team is ready to guide you.</p>
                </div>
                <Link
                  href="/admissions/apply"
                  className="px-5 py-2.5 rounded-xl bg-[var(--gold)] hover:brightness-110 text-[var(--maroon-dark)] font-extrabold text-xs uppercase tracking-wider shrink-0 transition shadow-md"
                >
                  Apply Online
                </Link>
              </div>
            </div>
          </article>

          {/* Sidebar */}
          <aside className="lg:col-span-4 space-y-6">
            {/* Related Pages in this section */}
            <div className="bg-white dark:bg-[var(--card)] rounded-3xl p-6 shadow-xs border border-slate-200 dark:border-slate-800 space-y-4">
              <h3 className="font-bold text-base text-[#1E3A8A] dark:text-blue-300 font-serif pb-2 border-b border-slate-200 dark:border-slate-800">
                In this Section
              </h3>
              <div className="space-y-1">
                {relatedPages.map((rp) => {
                  const isActive = rp.slug === slug;
                  return (
                    <Link
                      key={rp.id}
                      href={`/${rp.section}/${rp.slug}`}
                      className={`block px-3.5 py-2.5 rounded-xl text-xs font-semibold transition ${
                        isActive
                          ? "tab-active bg-[#800000] text-white font-bold shadow-sm border-l-4 border-[var(--gold)]"
                          : "text-[var(--text)]/80 hover:bg-[var(--maroon-tint)]/60 hover:text-[#800000]"
                      }`}
                    >
                      {rp.title}
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* Quick Contact Widget */}
            <div className="bg-gradient-to-br from-[var(--maroon-dark)] to-[var(--maroon)] text-white rounded-3xl p-6 shadow-md border border-[var(--gold)]/30 space-y-4">
              <h4 className="font-bold text-sm text-[var(--gold)] uppercase tracking-wider">
                Admissions Help Desk
              </h4>
              <p className="text-xs text-white/90 leading-relaxed">
                Connect directly with the RBANMS admissions desk on Annaswamy Mudaliar Road.
              </p>
              <div className="space-y-2 text-xs">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-[var(--gold)]">Phone:</span>
                  <a href="tel:+918025512911" className="hover:underline hover:text-[var(--gold)]">
                    +91 80 2551 2911
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-[var(--gold)]">Email:</span>
                  <a href="mailto:admissions@rbanmspuc.edu.in" className="hover:underline hover:text-[var(--gold)]">
                    admissions@rbanmspuc.edu.in
                  </a>
                </div>
              </div>
              <div className="pt-2">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[var(--gold)] hover:underline"
                >
                  View Campus Map & Directions <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
