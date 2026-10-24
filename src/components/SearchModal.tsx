"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { Search, X, Loader2, ArrowRight, BookOpen, Bell, GraduationCap, Users, Download, HelpCircle, Image as ImageIcon } from "lucide-react";

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<Record<string, any[]>>({});
  const [total, setTotal] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery("");
      setResults({});
      setTotal(0);
    }
  }, [isOpen]);

  // Global shortcut to open/close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        if (isOpen) onClose();
      }
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  // Debounced search
  useEffect(() => {
    if (!query.trim() || query.trim().length < 2) {
      setResults({});
      setTotal(0);
      setLoading(false);
      return;
    }

    setLoading(true);
    const timer = setTimeout(async () => {
      try {
        const res = await fetch(`/api/search?q=${encodeURIComponent(query.trim())}`);
        const data = await res.json();
        if (data.success) {
          setResults(data.results || {});
          setTotal(data.total || 0);
        }
      } catch (err) {
        console.error("Search error:", err);
      } finally {
        setLoading(false);
      }
    }, 250);

    return () => clearTimeout(timer);
  }, [query]);

  const handleSelect = (url: string) => {
    onClose();
    router.push(url);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onClose();
      router.push(`/search?q=${encodeURIComponent(query.trim())}`);
    }
  };

  const getSectionIcon = (category: string) => {
    switch (category) {
      case "Pages & Information":
        return <BookOpen className="w-4 h-4 text-black" />;
      case "Notices & Circulars":
        return <Bell className="w-4 h-4 text-black" />;
      case "Courses & Academics":
        return <GraduationCap className="w-4 h-4 text-black" />;
      case "Faculty & Staff":
        return <Users className="w-4 h-4 text-black" />;
      case "Downloads & Forms":
        return <Download className="w-4 h-4 text-black" />;
      case "FAQs & Help":
        return <HelpCircle className="w-4 h-4 text-black" />;
      default:
        return <ImageIcon className="w-4 h-4 text-black" />;
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto p-4 sm:p-6 md:p-20 bg-black/60 backdrop-blur-xs flex justify-center items-start animate-fade-in">
      <div
        className="relative w-full max-w-2xl bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-gray-200 dark:border-slate-800 overflow-hidden transform transition-all"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <form onSubmit={handleSubmit} className="relative flex items-center border-b border-gray-200 dark:border-slate-800 px-4">
          <Search className="w-5 h-5 text-gray-400 mr-3" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search RBANMS (courses, notices, faculty, admissions, history, fees)..."
            className="w-full py-4 bg-transparent text-gray-900 dark:text-gray-100 placeholder-gray-400 focus:outline-hidden text-base sm:text-lg"
          />
          {loading ? (
            <Loader2 className="w-5 h-5 text-black animate-spin mr-2" />
          ) : query ? (
            <button
              type="button"
              onClick={() => setQuery("")}
              className="p-1 rounded-full text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 mr-2"
            >
              <X className="w-4 h-4" />
            </button>
          ) : null}
          <button
            type="button"
            onClick={onClose}
            className="text-xs font-semibold px-2 py-1 rounded bg-gray-100 dark:bg-slate-800 text-gray-500 hover:bg-gray-200"
          >
            ESC
          </button>
        </form>

        {/* Results Container */}
        <div className="max-h-[65vh] overflow-y-auto p-4 space-y-5">
          {query.trim().length >= 2 && !loading && total === 0 && (
            <div className="text-center py-10 text-gray-500 dark:text-gray-400">
              <p className="text-base font-medium">No results found for &ldquo;{query}&rdquo;</p>
              <p className="text-xs text-gray-400 mt-1">Try searching with broader terms or check spelling.</p>
            </div>
          )}

          {query.trim().length < 2 && (
            <div className="py-6 px-2 text-sm text-gray-500 dark:text-gray-400">
              <div className="font-semibold text-xs tracking-wider text-gray-400 uppercase mb-3">Popular Searches</div>
              <div className="flex flex-wrap gap-2">
                {["PCMB", "PCMC", "CEBA", "Fee Structure", "Admissions 2025", "Scholarships", "Founder Arcot Mudaliar", "Notice Board", "Faculty"].map(
                  (term) => (
                    <button
                      key={term}
                      onClick={() => setQuery(term)}
                      className="px-3 py-1.5 rounded-full text-xs bg-gray-100 dark:bg-slate-800 hover:bg-gray-100 hover:text-black dark:hover:bg-slate-700 transition"
                    >
                      {term}
                    </button>
                  )
                )}
              </div>
            </div>
          )}

          {Object.entries(results).map(([category, items]) => (
            <div key={category} className="space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 px-2">
                {getSectionIcon(category)}
                <span>{category}</span>
                <span className="text-[10px] bg-gray-100 dark:bg-slate-800 px-1.5 py-0.5 rounded-full font-normal">
                  {items.length}
                </span>
              </div>
              <div className="space-y-1">
                {items.slice(0, 4).map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleSelect(item.url)}
                    className="w-full text-left p-2.5 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-50 transition flex items-start justify-between group"
                  >
                    <div className="pr-4">
                      <div className="font-semibold text-sm text-black dark:text-black group-hover:text-gray-700">
                        {item.title}
                      </div>
                      {item.subtitle && (
                        <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                          {item.subtitle}
                        </div>
                      )}
                      {item.snippet && (
                        <div
                          className="text-xs text-gray-600 dark:text-gray-300 line-clamp-2"
                          dangerouslySetInnerHTML={{ __html: item.snippet }}
                        />
                      )}
                    </div>
                    <ArrowRight className="w-4 h-4 text-gray-300 group-hover:text-black dark:group-hover:text-black mt-1 shrink-0 transition-transform group-hover:translate-x-1" />
                  </button>
                ))}
              </div>
            </div>
          ))}

          {total > 0 && (
            <div className="pt-2 border-t border-gray-100 dark:border-slate-800 text-center">
              <button
                onClick={handleSubmit}
                className="text-xs font-semibold text-black hover:text-gray-700 dark:text-black inline-flex items-center gap-1"
              >
                View all {total} matching results in full search page <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
        </div>

        {/* Footer info */}
        <div className="p-3 bg-gray-50 dark:bg-slate-800/50 border-t border-gray-100 dark:border-slate-800 text-[11px] text-gray-400 flex justify-between items-center px-4">
          <span>Global Typo-tolerant Search across RBANMS Database</span>
          <span>Press Enter to view all results</span>
        </div>
      </div>
    </div>
  );
}
