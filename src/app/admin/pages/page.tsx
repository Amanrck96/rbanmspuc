"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  FileText,
  Search,
  Plus,
  Edit,
  Trash2,
  ExternalLink,
  Eye,
  Save,
  X,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Bold,
  Italic,
  Heading2,
  Heading3,
  List,
  Quote,
  Table as TableIcon,
  Image as ImageIcon,
  Sparkles,
} from "lucide-react";

interface PageItem {
  id: string;
  slug: string;
  section: string;
  title: string;
  subtitle: string | null;
  content: string;
  bannerImage: string | null;
  isPublished: boolean;
  order: number;
  updatedAt: string;
}

export default function PagesManagerPage() {
  const [pages, setPages] = useState<PageItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [sectionFilter, setSectionFilter] = useState("ALL");
  const [editingPage, setEditingPage] = useState<PageItem | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [previewMode, setPreviewMode] = useState(false);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const fetchPages = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/pages");
      const data = await res.json();
      if (data.success) {
        setPages(data.pages);
      }
    } catch (err) {
      console.error("Failed to load pages:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPages();
  }, []);

  const openEditor = (page: PageItem) => {
    setEditingPage({ ...page });
    setIsCreating(false);
    setPreviewMode(false);
    setMessage(null);
  };

  const openCreateModal = () => {
    setEditingPage({
      id: "",
      slug: "",
      section: "about",
      title: "",
      subtitle: "",
      content: "<h2>Overview</h2><p>Write your detailed page content here...</p>",
      bannerImage: "/uploads/campus-hero.svg",
      isPublished: true,
      order: 0,
      updatedAt: new Date().toISOString(),
    });
    setIsCreating(true);
    setPreviewMode(false);
    setMessage(null);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingPage) return;
    setSaving(true);
    setMessage(null);

    try {
      const url = isCreating ? "/api/pages" : `/api/pages/${editingPage.id}`;
      const method = isCreating ? "POST" : "PATCH";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editingPage),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Failed to save page");
      }

      setMessage("Page saved and live website revalidated successfully!");
      fetchPages();
      setTimeout(() => setEditingPage(null), 1500);
    } catch (err: any) {
      setMessage(`Error: ${err.message}`);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Are you sure you want to delete "${title}"? (You can restore it anytime from the Recycle Bin)`)) {
      return;
    }
    try {
      const res = await fetch(`/api/pages/${id}`, { method: "DELETE" });
      if (res.ok) {
        fetchPages();
        setEditingPage(null);
      }
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  // Editor insertion helper
  const insertFormatting = (tagStart: string, tagEnd: string = "") => {
    if (!editingPage) return;
    const textarea = document.getElementById("page-content-editor") as HTMLTextAreaElement;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selected = editingPage.content.substring(start, end);
    const replacement = `${tagStart}${selected || "Sample Text"}${tagEnd}`;

    const newContent =
      editingPage.content.substring(0, start) + replacement + editingPage.content.substring(end);

    setEditingPage({ ...editingPage, content: newContent });
  };

  const filteredPages = pages.filter((p) => {
    const matchesSection = sectionFilter === "ALL" || p.section === sectionFilter;
    const matchesSearch =
      !search ||
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.slug.toLowerCase().includes(search.toLowerCase());
    return matchesSection && matchesSearch;
  });

  const sections = Array.from(new Set(pages.map((p) => p.section)));

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
            Content Management System
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white font-serif">
            Website Pages & Sections
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Every section, message, and policy on the public portal is dynamic and editable from here.
          </p>
        </div>

        <button
          onClick={openCreateModal}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs uppercase tracking-wider transition shadow-sm cursor-pointer"
        >
          <Plus className="w-4 h-4" /> Create New Page
        </button>
      </div>

      {/* Filters & Search */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setSectionFilter("ALL")}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
              sectionFilter === "ALL"
                ? "bg-amber-500 text-slate-950 shadow-md"
                : "bg-slate-900 border border-slate-800 text-slate-300 hover:bg-slate-800"
            }`}
          >
            All Sections ({pages.length})
          </button>
          {sections.map((sec) => (
            <button
              key={sec}
              onClick={() => setSectionFilter(sec)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold uppercase transition cursor-pointer ${
                sectionFilter === sec
                  ? "bg-amber-500 text-slate-950 shadow-md"
                  : "bg-slate-900 border border-slate-800 text-slate-300 hover:bg-slate-800"
              }`}
            >
              {sec} ({pages.filter((p) => p.section === sec).length})
            </button>
          ))}
        </div>

        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search page title or slug..."
            className="w-full pl-9 pr-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-hidden focus:ring-2 focus:ring-amber-500"
          />
        </div>
      </div>

      {/* Pages List */}
      <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 shadow-sm overflow-hidden">
        {loading ? (
          <div className="py-20 flex flex-col items-center justify-center space-y-3">
            <Loader2 className="w-8 h-8 text-amber-500 animate-spin" />
            <p className="text-xs text-slate-400">Loading pages...</p>
          </div>
        ) : filteredPages.length === 0 ? (
          <div className="text-center py-20 space-y-2">
            <p className="text-base font-bold text-white">No pages found</p>
            <p className="text-xs text-slate-400">Try adjusting your filters or search term.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 uppercase tracking-wider text-[10px]">
                  <th className="py-3 px-3">Page Title</th>
                  <th className="py-3 px-3">Section</th>
                  <th className="py-3 px-3">URL Slug</th>
                  <th className="py-3 px-3">Status</th>
                  <th className="py-3 px-3">Last Modified</th>
                  <th className="py-3 px-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {filteredPages.map((page) => (
                  <tr key={page.id} className="hover:bg-slate-800/50 transition">
                    <td className="py-3.5 px-3">
                      <div className="font-bold text-white text-sm">{page.title}</div>
                      {page.subtitle && (
                        <div className="text-[11px] text-slate-400 line-clamp-1">{page.subtitle}</div>
                      )}
                    </td>
                    <td className="py-3.5 px-3">
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase bg-slate-800 text-amber-400 border border-slate-700">
                        {page.section}
                      </span>
                    </td>
                    <td className="py-3.5 px-3 font-mono text-slate-400 text-[11px]">
                      /{page.section}/{page.slug}
                    </td>
                    <td className="py-3.5 px-3">
                      <span
                        className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                          page.isPublished
                            ? "bg-emerald-500/20 text-emerald-300"
                            : "bg-slate-700 text-slate-400"
                        }`}
                      >
                        {page.isPublished ? "Published" : "Draft"}
                      </span>
                    </td>
                    <td className="py-3.5 px-3 text-slate-500 text-[11px]">
                      {new Date(page.updatedAt).toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </td>
                    <td className="py-3.5 px-3 text-right space-x-2">
                      <button
                        onClick={() => openEditor(page)}
                        className="px-2.5 py-1 rounded-lg bg-blue-600/20 hover:bg-blue-600/30 text-blue-300 text-xs font-semibold transition"
                      >
                        Edit Content
                      </button>
                      <Link
                        href={`/${page.section}/${page.slug}`}
                        target="_blank"
                        className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold inline-flex items-center gap-1 transition"
                      >
                        View ↗
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Rich Page Editor Drawer / Modal */}
      {editingPage && (
        <div
          className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex justify-end p-0 sm:p-4 overflow-y-auto animate-fade-in"
          onClick={() => setEditingPage(null)}
        >
          <div
            className="w-full max-w-4xl bg-slate-900 border-l border-slate-800 p-6 sm:p-8 space-y-6 overflow-y-auto text-left shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Editor Header */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
                  {isCreating ? "Create New Page" : "Edit Page Content & Banner"}
                </span>
                <h2 className="text-xl sm:text-2xl font-extrabold text-white font-serif">
                  {editingPage.title || "Untitled Page"}
                </h2>
              </div>
              <div className="flex items-center gap-2">
                {!isCreating && (
                  <button
                    type="button"
                    onClick={() => handleDelete(editingPage.id, editingPage.title)}
                    className="p-2 rounded-xl text-red-400 hover:bg-red-950/50 hover:text-red-300 transition"
                    title="Move to Recycle Bin"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => setEditingPage(null)}
                  className="p-2 rounded-full text-slate-400 hover:text-white hover:bg-slate-800"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {message && (
              <div
                className={`p-3.5 rounded-2xl text-xs flex items-center gap-2 ${
                  message.startsWith("Error")
                    ? "bg-red-950/60 border border-red-800/80 text-red-300"
                    : "bg-emerald-950/60 border border-emerald-800/80 text-emerald-300"
                }`}
              >
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>{message}</span>
              </div>
            )}

            <form onSubmit={handleSave} className="space-y-6">
              {/* Top metadata grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Page Title <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={editingPage.title}
                    onChange={(e) => setEditingPage({ ...editingPage, title: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs sm:text-sm focus:ring-2 focus:ring-amber-500 focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Section <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={editingPage.section}
                    onChange={(e) => setEditingPage({ ...editingPage, section: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs sm:text-sm focus:ring-2 focus:ring-amber-500 focus:outline-hidden"
                  >
                    <option value="about">About Us</option>
                    <option value="admissions">Admissions</option>
                    <option value="academics">Academics</option>
                    <option value="student-life">Student Life</option>
                    <option value="media">Media</option>
                    <option value="alumni">Alumni</option>
                    <option value="contact">Contact</option>
                  </select>
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Subtitle / Summary
                  </label>
                  <input
                    type="text"
                    value={editingPage.subtitle || ""}
                    onChange={(e) => setEditingPage({ ...editingPage, subtitle: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs sm:text-sm focus:ring-2 focus:ring-amber-500 focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    URL Slug <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={editingPage.slug}
                    onChange={(e) => setEditingPage({ ...editingPage, slug: e.target.value })}
                    placeholder="e.g. history"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 font-mono text-white text-xs sm:text-sm focus:ring-2 focus:ring-amber-500 focus:outline-hidden"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Banner Image URL
                  </label>
                  <input
                    type="text"
                    value={editingPage.bannerImage || ""}
                    onChange={(e) => setEditingPage({ ...editingPage, bannerImage: e.target.value })}
                    placeholder="/uploads/campus-hero.svg"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 font-mono text-white text-xs focus:ring-2 focus:ring-amber-500 focus:outline-hidden"
                  />
                </div>

                <div className="flex items-center gap-3 pt-6">
                  <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-slate-200">
                    <input
                      type="checkbox"
                      checked={editingPage.isPublished}
                      onChange={(e) => setEditingPage({ ...editingPage, isPublished: e.target.checked })}
                      className="w-4 h-4 rounded text-amber-500"
                    />
                    <span>Publish on Website</span>
                  </label>
                </div>
              </div>

              {/* Rich Content Editor Toolbar */}
              <div className="space-y-2">
                <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                  <div className="flex flex-wrap items-center gap-1">
                    <button
                      type="button"
                      onClick={() => insertFormatting("<h2>", "</h2>")}
                      className="px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 text-xs font-bold text-slate-300"
                      title="Heading 2"
                    >
                      H2
                    </button>
                    <button
                      type="button"
                      onClick={() => insertFormatting("<h3>", "</h3>")}
                      className="px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 text-xs font-bold text-slate-300"
                      title="Heading 3"
                    >
                      H3
                    </button>
                    <button
                      type="button"
                      onClick={() => insertFormatting("<strong>", "</strong>")}
                      className="p-1.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300"
                      title="Bold"
                    >
                      <Bold className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => insertFormatting("<em>", "</em>")}
                      className="p-1.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300"
                      title="Italic"
                    >
                      <Italic className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => insertFormatting("<ul>\n  <li>", "</li>\n</ul>")}
                      className="p-1.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300"
                      title="Bullet List"
                    >
                      <List className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => insertFormatting("<blockquote>\n  ", "\n</blockquote>")}
                      className="p-1.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300"
                      title="Quote Block"
                    >
                      <Quote className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        insertFormatting(
                          '<table class="w-full text-left border-collapse my-4">\n  <thead><tr class="border-b font-bold"><th class="p-2">Header 1</th><th class="p-2">Header 2</th></tr></thead>\n  <tbody><tr class="border-b"><td class="p-2">Value 1</td><td class="p-2">Value 2</td></tr></tbody>\n</table>'
                        )
                      }
                      className="p-1.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300"
                      title="Table"
                    >
                      <TableIcon className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <button
                    type="button"
                    onClick={() => setPreviewMode(!previewMode)}
                    className="px-3 py-1 rounded-xl bg-slate-800 hover:bg-slate-700 text-amber-400 text-xs font-semibold flex items-center gap-1.5"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>{previewMode ? "Code Editor" : "Live Preview"}</span>
                  </button>
                </div>

                {previewMode ? (
                  <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 min-h-[300px] overflow-y-auto prose prose-invert max-w-none text-xs sm:text-sm">
                    <div dangerouslySetInnerHTML={{ __html: editingPage.content }} />
                  </div>
                ) : (
                  <textarea
                    id="page-content-editor"
                    rows={14}
                    value={editingPage.content}
                    onChange={(e) => setEditingPage({ ...editingPage, content: e.target.value })}
                    className="w-full p-4 rounded-2xl bg-slate-950 border border-slate-800 text-slate-200 font-mono text-xs focus:ring-2 focus:ring-amber-500 focus:outline-hidden leading-relaxed"
                  />
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex justify-between items-center pt-4 border-t border-slate-800">
                {!isCreating && (
                  <Link
                    href={`/${editingPage.section}/${editingPage.slug}`}
                    target="_blank"
                    className="text-xs font-bold text-slate-400 hover:text-white inline-flex items-center gap-1"
                  >
                    Preview on public website ↗
                  </Link>
                )}
                <div className="flex items-center gap-3 ml-auto">
                  <button
                    type="button"
                    onClick={() => setEditingPage(null)}
                    className="px-4 py-2.5 rounded-xl border border-slate-700 text-slate-300 text-xs font-bold hover:bg-slate-800 transition"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={saving}
                    className="px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 transition cursor-pointer disabled:opacity-50"
                  >
                    {saving ? (
                      <>
                        <Loader2 className="w-3.5 h-3.5 animate-spin" /> Saving...
                      </>
                    ) : (
                      <>
                        <Save className="w-3.5 h-3.5" /> Save Changes & Revalidate
                      </>
                    )}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
