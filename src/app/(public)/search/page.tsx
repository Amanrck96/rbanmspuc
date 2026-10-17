"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import {
  Search,
  Loader2,
  BookOpen,
  Bell,
  GraduationCap,
  Users,
  Download,
  HelpCircle,
  Image as ImageIcon,
  ArrowRight,
} from "lucide-react";

function SearchContent() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get("q") || "";
  const [query, setQuery] = useState(initialQuery);
  const [activeTab, setActiveTab] = useState("ALL");
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<Record<string, any[]>>({});
  const [total, setTotal] = useState(0);
  const router = useRouter();

  const performSearch = async (term: string) => {
    if (!term || term.trim().length < 2) {
      setResults({});
      setTotal(0);
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(`/api/search?q=${encodeURIComponent(term.trim())}`);
      const data = await res.json();
      if (data.success) {
        setResults(data.results || {});
        setTotal(data.total || 0);
      }
    } catch (err) {
      console.error("Search failed:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (initialQuery) {
      setQuery(initialQuery);
      performSearch(initialQuery);
    }
  }, [initialQuery]);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query.trim())}`);
      performSearch(query.trim());
    }
  };

  const categories = Object.keys(results);
  const filteredCategories = activeTab === "ALL" ? categories : categories.filter((c) => c === activeTab);

  const getSectionIcon = (category: string) => {
    switch (category) {
      case "Pages & Information":
        return <BookOpen className="w-4 h-4 text-blue-600" />;
      case "Notices & Circulars":
        return <Bell className="w-4 h-4 text-amber-600" />;
      case "Courses & Academics":
        return <GraduationCap className="w-4 h-4 text-emerald-600" />;
      case "Faculty & Staff":
        return <Users className="w-4 h-4 text-purple-600" />;
      case "Downloads & Forms":
        return <Download className="w-4 h-4 text-cyan-600" />;
      case "FAQs & Help":
        return <HelpCircle className="w-4 h-4 text-orange-600" />;
      default:
        return <ImageIcon className="w-4 h-4 text-gray-600" />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Search Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-slate-100 font-serif">
            Global Knowledge Search
          </h1>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            Search across our entire database: admissions, courses, notices, faculty, curriculum, fees, and campus life.
          </p>
        </div>

        {/* Input Bar */}
        <form onSubmit={handleFormSubmit} className="relative max-w-2xl mx-auto">
          <div className="relative flex items-center shadow-lg rounded-2xl bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 p-2">
            <Search className="w-5 h-5 text-gray-400 ml-3 mr-2" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by keywords, course code (PCMB/CEBA), faculty name..."
              className="w-full py-2 bg-transparent text-slate-900 dark:text-slate-100 placeholder-gray-400 focus:outline-hidden text-sm sm:text-base"
            />
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-blue-700 hover:bg-blue-800 text-white font-bold text-xs uppercase tracking-wider shrink-0 transition"
            >
              Search
            </button>
          </div>
        </form>

        {/* Category Tabs */}
        {categories.length > 0 && (
          <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
            <button
              onClick={() => setActiveTab("ALL")}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition ${
                activeTab === "ALL"
                  ? "bg-blue-700 text-white shadow-xs"
                  : "bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-gray-200 dark:border-slate-800 hover:bg-gray-100"
              }`}
            >
              All Results ({total})
            </button>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveTab(cat)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition flex items-center gap-1.5 ${
                  activeTab === cat
                    ? "bg-blue-700 text-white shadow-xs"
                    : "bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-gray-200 dark:border-slate-800 hover:bg-gray-100"
                }`}
              >
                <span>{cat}</span>
                <span className="text-[10px] opacity-80">({results[cat]?.length || 0})</span>
              </button>
            ))}
          </div>
        )}

        {/* Results Stream */}
        {loading ? (
          <div className="py-20 flex flex-col items-center justify-center space-y-3">
            <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
            <p className="text-xs text-gray-500">Searching RBANMS database...</p>
          </div>
        ) : query && total === 0 ? (
          <div className="text-center py-20 bg-white dark:bg-slate-900 rounded-3xl border border-gray-200 dark:border-slate-800 p-8 space-y-3">
            <p className="text-lg font-bold text-slate-800 dark:text-slate-200">
              No matching results found for &ldquo;{query}&rdquo;
            </p>
            <p className="text-xs text-gray-500 max-w-md mx-auto">
              Please check your spelling, or try searching for broader keywords like &quot;admissions&quot;, &quot;fees&quot;, &quot;science&quot;, &quot;commerce&quot;, or &quot;history&quot;.
            </p>
          </div>
        ) : (
          <div className="space-y-8">
            {filteredCategories.map((category) => {
              const items = results[category] || [];
              return (
                <div key={category} className="space-y-4">
                  <div className="flex items-center gap-2 pb-2 border-b border-gray-200 dark:border-slate-800">
                    {getSectionIcon(category)}
                    <h3 className="font-bold text-base text-slate-900 dark:text-slate-100 font-serif">
                      {category}
                    </h3>
                    <span className="text-xs text-gray-400">({items.length})</span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {items.map((item) => (
                      <Link
                        key={item.id}
                        href={item.url}
                        className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 hover:border-blue-500 shadow-xs hover:shadow-md transition group flex flex-col justify-between"
                      >
                        <div className="space-y-2">
                          <div className="flex items-start justify-between gap-2">
                            <h4 className="font-bold text-base text-slate-900 dark:text-slate-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition">
                              {item.title}
                            </h4>
                            <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-blue-600 transition shrink-0 mt-1" />
                          </div>
                          {item.subtitle && (
                            <div className="text-xs font-semibold text-amber-700 dark:text-amber-400">
                              {item.subtitle}
                            </div>
                          )}
                          {item.snippet && (
                            <p
                              className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed"
                              dangerouslySetInnerHTML={{ __html: item.snippet }}
                            />
                          )}
                        </div>
                        <div className="pt-3 mt-3 border-t border-gray-100 dark:border-slate-800/60 text-[11px] font-semibold text-blue-600 dark:text-blue-400 flex items-center gap-1">
                          Navigate to page <ArrowRight className="w-3 h-3" />
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen py-20 flex justify-center items-center">
          <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
        </div>
      }
    >
      <SearchContent />
    </Suspense>
  );
}
