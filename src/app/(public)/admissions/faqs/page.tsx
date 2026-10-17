import { prisma } from "@/lib/prisma";
import { HelpCircle, ChevronDown, Sparkles } from "lucide-react";

export default async function FaqsPage() {
  const faqs = await prisma.faq.findMany({
    where: { isPublished: true },
    orderBy: { order: "asc" },
  });

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-amber-600 dark:text-amber-400">
            Common Inquiries
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-slate-100 font-serif">
            Frequently Asked Questions
          </h1>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            Answers to common questions about eligibility, fee structures, laboratory practicals, scholarships, and campus admissions.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq) => (
            <details
              key={faq.id}
              className="group p-6 rounded-3xl bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 shadow-xs transition open:shadow-md"
            >
              <summary className="flex items-center justify-between cursor-pointer list-none font-bold text-base text-slate-900 dark:text-slate-100">
                <span className="flex items-center gap-3">
                  <HelpCircle className="w-5 h-5 text-blue-600 shrink-0" />
                  <span>{faq.question}</span>
                </span>
                <ChevronDown className="w-5 h-5 text-gray-400 group-open:rotate-180 transition-transform duration-200 shrink-0 ml-2" />
              </summary>
              <div className="mt-4 pt-4 border-t border-gray-100 dark:border-slate-800 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed pl-8">
                {faq.answer}
              </div>
            </details>
          ))}
        </div>
      </div>
    </div>
  );
}
