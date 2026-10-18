import { prisma } from "@/lib/prisma";
import { HelpCircle, ChevronDown, Sparkles } from "lucide-react";

export default async function FaqsPage() {
  const faqs = await prisma.faq.findMany({
    where: { isPublished: true },
    orderBy: { order: "asc" },
  });

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text)] py-12 transition-colors">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-[#800000] dark:text-[var(--gold)]">
            Common Inquiries
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-[#1E3A8A] dark:text-blue-300 font-serif">
            Frequently Asked Questions
          </h1>
          <p className="text-sm text-[var(--text)]/80">
            Answers to common questions about eligibility, fee structures, laboratory practicals, scholarships, and campus admissions.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq) => (
            <details
              key={faq.id}
              className="group p-6 rounded-3xl bg-white dark:bg-[var(--card)] border border-slate-200 dark:border-slate-800 shadow-xs transition open:border-[#800000] open:shadow-md"
            >
              <summary className="flex items-center justify-between cursor-pointer list-none font-bold text-base text-[#1E3A8A] dark:text-blue-300">
                <span className="flex items-center gap-3">
                  <HelpCircle className="w-5 h-5 text-[#800000] dark:text-[var(--gold)] shrink-0" />
                  <span>{faq.question}</span>
                </span>
                <ChevronDown className="w-5 h-5 text-[#800000] group-open:rotate-180 transition-transform duration-200 shrink-0 ml-2" />
              </summary>
              <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800 text-xs sm:text-sm text-[var(--text)]/80 leading-relaxed pl-8">
                {faq.answer}
              </div>
            </details>
          ))}
        </div>
      </div>
    </div>
  );
}
