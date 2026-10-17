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
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-2 text-xs font-medium text-slate-500 dark:text-slate-400">
          <Link href="/" className="hover:text-blue-700 dark:hover:text-blue-400 transition">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="capitalize">{formatSectionTitle(section)}</span>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-slate-900 dark:text-slate-100 font-semibold">{page.title}</span>
        </nav>

        {/* Page Banner & Header */}
        <div className="relative rounded-3xl overflow-hidden bg-slate-900 text-white shadow-xl min-h-[220px] flex items-center">
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
          <div className="absolute inset-0 bg-gradient-to-r from-blue-950/95 via-slate-900/90 to-transparent" />
          <div className="relative p-8 sm:p-12 max-w-3xl space-y-3">
            <span className="text-xs font-bold uppercase tracking-widest text-amber-400">
              {formatSectionTitle(section)}
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-serif tracking-tight leading-tight">
              {page.title}
            </h1>
            {page.subtitle && (
              <p className="text-sm sm:text-base text-slate-300 font-normal leading-relaxed">
                {page.subtitle}
              </p>
            )}
          </div>
        </div>

        {/* Two Column Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Main Article Content from DB */}
          <article className="lg:col-span-8 bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-10 shadow-sm border border-gray-200 dark:border-slate-800 space-y-6">
            <div
              className="prose dark:prose-invert max-w-none 
                prose-headings:font-serif prose-headings:font-bold prose-headings:text-slate-900 dark:prose-headings:text-slate-100
                prose-h2:text-2xl prose-h2:border-b prose-h2:border-gray-100 dark:prose-h2:border-slate-800 prose-h2:pb-2 prose-h2:mt-8
                prose-h3:text-xl prose-h3:mt-6
                prose-p:text-slate-700 dark:prose-p:text-slate-300 prose-p:leading-relaxed prose-p:text-base
                prose-ul:list-disc prose-ul:pl-6 prose-ul:space-y-2
                prose-ol:list-decimal prose-ol:pl-6 prose-ol:space-y-2
                prose-blockquote:border-l-4 prose-blockquote:border-amber-500 prose-blockquote:bg-amber-50/50 dark:prose-blockquote:bg-slate-800/40 prose-blockquote:p-4 prose-blockquote:rounded-r-xl prose-blockquote:italic
                prose-table:w-full prose-table:border-collapse prose-th:bg-gray-100 dark:prose-th:bg-slate-800 prose-th:p-3 prose-td:p-3 prose-td:border-b prose-td:border-gray-100 dark:prose-td:border-slate-800"
              dangerouslySetInnerHTML={{ __html: page.content }}
            />

            {/* In-page Action Box */}
            <div className="pt-8 border-t border-gray-100 dark:border-slate-800 mt-10">
              <div className="p-6 rounded-2xl bg-gradient-to-r from-blue-900 to-indigo-950 text-white flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <h4 className="font-bold text-base font-serif">Have questions about admissions?</h4>
                  <p className="text-xs text-slate-300 mt-1">Our counseling team is ready to guide you.</p>
                </div>
                <Link
                  href="/admissions/apply"
                  className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs uppercase tracking-wider shrink-0 transition"
                >
                  Apply Online
                </Link>
              </div>
            </div>
          </article>

          {/* Sidebar */}
          <aside className="lg:col-span-4 space-y-6">
            {/* Related Pages in this section */}
            <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-xs border border-gray-200 dark:border-slate-800 space-y-4">
              <h3 className="font-bold text-base text-slate-900 dark:text-slate-100 font-serif pb-2 border-b border-gray-100 dark:border-slate-800">
                In this Section
              </h3>
              <div className="space-y-1">
                {relatedPages.map((rp) => {
                  const isActive = rp.slug === slug;
                  return (
                    <Link
                      key={rp.id}
                      href={`/${rp.section}/${rp.slug}`}
                      className={`block px-3.5 py-2 rounded-xl text-xs font-semibold transition ${
                        isActive
                          ? "bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 border-l-4 border-blue-600"
                          : "text-slate-700 dark:text-slate-300 hover:bg-gray-50 dark:hover:bg-slate-800"
                      }`}
                    >
                      {rp.title}
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* Quick Contact Widget */}
            <div className="bg-gradient-to-br from-slate-900 to-blue-950 text-white rounded-3xl p-6 shadow-md border border-slate-800 space-y-4">
              <h4 className="font-bold text-sm text-amber-400 uppercase tracking-wider">
                Admissions Help Desk
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                Connect directly with the RBANMS admissions desk on Annaswamy Mudaliar Road.
              </p>
              <div className="space-y-2 text-xs">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-amber-300">Phone:</span>
                  <a href="tel:+918025512911" className="hover:underline">
                    +91 80 2551 2911
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-amber-300">Email:</span>
                  <a href="mailto:admissions@rbanmspuc.edu.in" className="hover:underline">
                    admissions@rbanmspuc.edu.in
                  </a>
                </div>
              </div>
              <div className="pt-2">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-400 hover:text-amber-300 underline"
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
