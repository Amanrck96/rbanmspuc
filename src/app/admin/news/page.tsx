"use client";

import { useState, useEffect } from "react";
import { Newspaper, Plus, Trash2, Edit, Save, X, Loader2 } from "lucide-react";

interface NewsItem {
  id: string;
  title: string;
  category: string;
  summary: string;
  content: string;
  imageUrl: string | null;
  isPublished: boolean;
}

export default function NewsManagerPage() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingNews, setEditingNews] = useState<NewsItem | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [saving, setSaving] = useState(false);

  const fetchNews = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/news");
      const data = await res.json();
      if (data.success) setNews(data.news || []);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  const openCreateModal = () => {
    setEditingNews({
      id: "",
      title: "",
      category: "ACADEMICS",
      summary: "",
      content: "<p>Write full news content here...</p>",
      imageUrl: "/uploads/campus-hero.svg",
      isPublished: true,
    });
    setIsCreating(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingNews) return;
    setSaving(true);
    try {
      const url = isCreating ? "/api/news" : `/api/news/${editingNews.id}`;
      const method = isCreating ? "POST" : "PATCH";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editingNews),
      });
      if (res.ok) {
        fetchNews();
        setEditingNews(null);
      }
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this news article?")) return;
    const res = await fetch(`/api/news/${id}`, { method: "DELETE" });
    if (res.ok) fetchNews();
  };

  return (
    <div className="space-y-8 animate-fade-in max-w-5xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[var(--maroon-light)]/20">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-[var(--maroon-light)] dark:text-[var(--gold)]">
            Press & Media
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[var(--text)] font-serif">
            News & Press Releases
          </h1>
          <p className="text-xs text-muted-foreground mt-1">
            Publish academic achievements, sports honors, and institutional updates.
          </p>
        </div>
        <button
          onClick={openCreateModal}
          className="btn-maroon inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-white font-bold text-xs uppercase tracking-wider transition shadow-sm cursor-pointer"
        >
          <Plus className="w-4 h-4" /> Publish News
        </button>
      </div>

      {loading ? (
        <div className="py-20 flex justify-center">
          <Loader2 className="w-8 h-8 text-[var(--maroon)] animate-spin" />
        </div>
      ) : (
        <div className="space-y-4">
          {news.map((n) => (
            <div
              key={n.id}
              className="p-6 rounded-3xl bg-white dark:bg-[var(--card)] border border-[var(--maroon-light)]/20 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4"
            >
              <div className="space-y-1.5 flex-1">
                <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-[var(--maroon-tint)] text-[var(--maroon-dark)] dark:bg-[var(--maroon-dark)] dark:text-[var(--gold)] uppercase">
                  {n.category}
                </span>
                <h3 className="font-bold text-base text-[var(--maroon)] dark:text-white">{n.title}</h3>
                <p className="text-xs text-muted-foreground line-clamp-2">{n.summary}</p>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() => {
                    setEditingNews({ ...n });
                    setIsCreating(false);
                  }}
                  className="px-3 py-1.5 rounded-xl bg-[var(--maroon-tint)] hover:bg-[var(--maroon)] hover:text-white text-[var(--maroon-dark)] text-xs font-semibold transition"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(n.id)}
                  className="p-1.5 rounded-xl text-red-500 hover:bg-red-50 dark:hover:bg-red-950/40 transition"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* News Modal */}
      {editingNews && (
        <div
          className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto animate-fade-in"
          onClick={() => setEditingNews(null)}
        >
          <div
            className="w-full max-w-xl bg-white dark:bg-[var(--card)] border border-[var(--maroon-light)]/20 rounded-3xl p-6 sm:p-8 space-y-4 text-left shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center pb-2 border-b border-[var(--maroon-light)]/20">
              <h2 className="text-lg font-bold text-[var(--maroon)] dark:text-white font-serif">
                {isCreating ? "Publish News Item" : "Edit News Article"}
              </h2>
              <button onClick={() => setEditingNews(null)} className="text-muted-foreground hover:text-[var(--text)] transition">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[var(--text)] mb-1">Title</label>
                <input
                  type="text"
                  required
                  value={editingNews.title}
                  onChange={(e) => setEditingNews({ ...editingNews, title: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-black/30 text-[var(--text)] text-xs focus:border-[var(--maroon)] focus:ring-1 focus:ring-[var(--maroon)] outline-hidden"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[var(--text)] mb-1">Category</label>
                <input
                  type="text"
                  value={editingNews.category}
                  onChange={(e) => setEditingNews({ ...editingNews, category: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-black/30 text-[var(--text)] text-xs uppercase focus:border-[var(--maroon)] focus:ring-1 focus:ring-[var(--maroon)] outline-hidden"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[var(--text)] mb-1">Summary</label>
                <textarea
                  rows={2}
                  required
                  value={editingNews.summary}
                  onChange={(e) => setEditingNews({ ...editingNews, summary: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-black/30 text-[var(--text)] text-xs focus:border-[var(--maroon)] focus:ring-1 focus:ring-[var(--maroon)] outline-hidden"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[var(--text)] mb-1">Body Content (HTML)</label>
                <textarea
                  rows={6}
                  required
                  value={editingNews.content}
                  onChange={(e) => setEditingNews({ ...editingNews, content: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-black/30 text-[var(--text)] font-mono text-xs focus:border-[var(--maroon)] focus:ring-1 focus:ring-[var(--maroon)] outline-hidden"
                />
              </div>

              <div className="flex justify-end gap-3 pt-3 border-t border-[var(--maroon-light)]/20">
                <button
                  type="button"
                  onClick={() => setEditingNews(null)}
                  className="px-4 py-2 rounded-xl border border-gray-300 dark:border-gray-700 text-[var(--text)] text-xs font-bold hover:bg-gray-100 dark:hover:bg-gray-800 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="btn-maroon px-5 py-2 rounded-xl text-white font-bold text-xs uppercase tracking-wider transition"
                >
                  {saving ? "Saving..." : "Save News"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
