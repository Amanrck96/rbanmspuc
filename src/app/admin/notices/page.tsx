"use client";

import { useState, useEffect } from "react";
import {
  Bell,
  Plus,
  Trash2,
  Edit,
  Pin,
  Calendar,
  Save,
  X,
  CheckCircle2,
  Loader2,
  Download,
} from "lucide-react";

interface NoticeItem {
  id: string;
  title: string;
  category: string;
  date: string;
  description: string;
  fileUrl: string | null;
  isPinned: boolean;
  isPublished: boolean;
}

export default function NoticesManagerPage() {
  const [notices, setNotices] = useState<NoticeItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingNotice, setEditingNotice] = useState<NoticeItem | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const fetchNotices = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/notices");
      const data = await res.json();
      if (data.success) setNotices(data.notices || []);
    } catch (err) {
      console.error("Failed to load notices:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotices();
  }, []);

  const openCreateModal = () => {
    setEditingNotice({
      id: "",
      title: "",
      category: "NOTICE",
      date: new Date().toISOString().split("T")[0],
      description: "",
      fileUrl: null,
      isPinned: false,
      isPublished: true,
    });
    setIsCreating(true);
    setMessage(null);
  };

  const openEditModal = (item: NoticeItem) => {
    setEditingNotice({ ...item });
    setIsCreating(false);
    setMessage(null);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingNotice) return;
    setSaving(true);
    setMessage(null);

    try {
      const url = isCreating ? "/api/notices" : `/api/notices/${editingNotice.id}`;
      const method = isCreating ? "POST" : "PATCH";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editingNotice),
      });

      const data = await res.json();
      if (!res.ok || !data.success) throw new Error(data.error || "Failed to save notice");

      setMessage("Notice saved and updated live on website!");
      fetchNotices();
      setTimeout(() => setEditingNotice(null), 1500);
    } catch (err: any) {
      setMessage(`Error: ${err.message}`);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Delete notice "${title}"? (Can be restored from Recycle Bin)`)) return;
    try {
      const res = await fetch(`/api/notices/${id}`, { method: "DELETE" });
      if (res.ok) fetchNotices();
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  return (
    <div className="space-y-8 animate-fade-in text-[var(--text)]">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[var(--maroon-light)]/20">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-[var(--maroon)] dark:text-[var(--gold)]">
            Digital Notice Board
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[var(--maroon)] dark:text-white font-serif">
            Notices, Circulars & Announcements
          </h1>
          <p className="text-xs text-[var(--text)]/70 mt-1">
            Publish circulars, timetable notices, and admission alerts with PDF attachments.
          </p>
        </div>

        <button
          onClick={openCreateModal}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[var(--maroon)] hover:bg-[var(--maroon-dark)] text-white font-bold text-xs uppercase tracking-wider transition shadow-sm cursor-pointer"
        >
          <Plus className="w-4 h-4 text-[var(--gold)]" /> Create Notice
        </button>
      </div>

      {loading ? (
        <div className="py-20 flex flex-col items-center justify-center space-y-3">
          <Loader2 className="w-8 h-8 text-[var(--gold)] animate-spin" />
          <p className="text-xs text-[var(--text)]/60">Loading notices...</p>
        </div>
      ) : (
        <div className="space-y-4">
          {notices.map((n) => (
            <div
              key={n.id}
              className="p-5 rounded-3xl bg-white dark:bg-[var(--card)] border border-[var(--maroon-light)]/20 shadow-xs hover:border-[var(--maroon)] flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition"
            >
              <div className="space-y-1.5 flex-1">
                <div className="flex items-center gap-2">
                  {n.isPinned && (
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[var(--gold)] text-[var(--maroon-dark)] uppercase flex items-center gap-1 font-black">
                      <Pin className="w-3 h-3 fill-current" /> Pinned
                    </span>
                  )}
                  <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-[var(--maroon-tint)] text-[var(--maroon)] dark:text-[var(--gold)] uppercase">
                    {n.category}
                  </span>
                  <span className="text-[11px] text-[var(--text)]/60">
                    {new Date(n.date).toLocaleDateString("en-IN", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </span>
                </div>
                <h3 className="font-bold text-base text-[var(--text)] font-serif">{n.title}</h3>
                <p className="text-xs text-[var(--text)]/70 line-clamp-2">{n.description}</p>
                {n.fileUrl && (
                  <div className="text-[11px] text-[var(--maroon)] dark:text-[var(--gold)] flex items-center gap-1 link-maroon">
                    <Download className="w-3 h-3" /> Attached: {n.fileUrl}
                  </div>
                )}
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() => openEditModal(n)}
                  className="px-3 py-1.5 rounded-xl bg-[var(--maroon-tint)] hover:bg-[var(--maroon)] hover:text-white text-[var(--maroon)] dark:text-[var(--gold)] text-xs font-semibold transition cursor-pointer"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(n.id, n.title)}
                  className="p-1.5 rounded-xl bg-red-100 dark:bg-red-950/60 text-red-600 dark:text-red-400 hover:bg-red-200 transition cursor-pointer"
                  title="Move to Recycle Bin"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Editor Modal */}
      {editingNotice && (
        <div
          className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto animate-fade-in"
          onClick={() => setEditingNotice(null)}
        >
          <div
            className="w-full max-w-xl bg-white dark:bg-[var(--card)] border border-[var(--maroon-light)]/30 rounded-3xl p-6 sm:p-8 space-y-6 text-left shadow-2xl text-[var(--text)]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b border-[var(--maroon-light)]/20">
              <h2 className="text-lg font-bold text-[var(--text)] font-serif">
                {isCreating ? "Create Official Notice" : "Edit Notice"}
              </h2>
              <button
                onClick={() => setEditingNotice(null)}
                className="p-1 rounded-full text-[var(--text)]/60 hover:text-[var(--text)] hover:bg-[var(--maroon-tint)] cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {message && (
              <div className="p-3 rounded-2xl bg-emerald-100 dark:bg-emerald-950/60 border border-emerald-500/40 text-emerald-800 dark:text-emerald-300 text-xs">
                {message}
              </div>
            )}

            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[var(--text)] mb-1">Notice Title</label>
                <input
                  type="text"
                  required
                  value={editingNotice.title}
                  onChange={(e) => setEditingNotice({ ...editingNotice, title: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white dark:bg-[var(--card)] border border-[var(--maroon-light)]/30 text-[var(--text)] text-xs sm:text-sm focus:ring-2 focus:ring-[var(--maroon)] focus:outline-hidden"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[var(--text)] mb-1">Category</label>
                  <select
                    value={editingNotice.category}
                    onChange={(e) => setEditingNotice({ ...editingNotice, category: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-white dark:bg-[var(--card)] border border-[var(--maroon-light)]/30 text-[var(--text)] text-xs focus:ring-2 focus:ring-[var(--maroon)] focus:outline-hidden"
                  >
                    <option value="NOTICE">NOTICE</option>
                    <option value="CIRCULAR">CIRCULAR</option>
                    <option value="ANNOUNCEMENT">ANNOUNCEMENT</option>
                    <option value="ADMISSION">ADMISSION</option>
                    <option value="RESULT">RESULT</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[var(--text)] mb-1">Notice Date</label>
                  <input
                    type="date"
                    value={
                      editingNotice.date
                        ? new Date(editingNotice.date).toISOString().split("T")[0]
                        : ""
                    }
                    onChange={(e) => setEditingNotice({ ...editingNotice, date: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-white dark:bg-[var(--card)] border border-[var(--maroon-light)]/30 text-[var(--text)] text-xs focus:ring-2 focus:ring-[var(--maroon)] focus:outline-hidden"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[var(--text)] mb-1">Description</label>
                <textarea
                  rows={4}
                  required
                  value={editingNotice.description}
                  onChange={(e) => setEditingNotice({ ...editingNotice, description: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white dark:bg-[var(--card)] border border-[var(--maroon-light)]/30 text-[var(--text)] text-xs focus:ring-2 focus:ring-[var(--maroon)] focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[var(--text)] mb-1">
                  Attachment File URL (Optional)
                </label>
                <input
                  type="text"
                  value={editingNotice.fileUrl || ""}
                  onChange={(e) => setEditingNotice({ ...editingNotice, fileUrl: e.target.value })}
                  placeholder="/uploads/campus-hero.svg"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white dark:bg-[var(--card)] border border-[var(--maroon-light)]/30 font-mono text-[var(--text)] text-xs focus:ring-2 focus:ring-[var(--maroon)] focus:outline-hidden"
                />
              </div>

              <div className="flex items-center gap-6 pt-2">
                <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-[var(--text)]">
                  <input
                    type="checkbox"
                    checked={editingNotice.isPinned}
                    onChange={(e) => setEditingNotice({ ...editingNotice, isPinned: e.target.checked })}
                    className="w-4 h-4 rounded text-[var(--maroon)]"
                  />
                  <span>Pin to Top of Notice Board</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-[var(--text)]">
                  <input
                    type="checkbox"
                    checked={editingNotice.isPublished}
                    onChange={(e) => setEditingNotice({ ...editingNotice, isPublished: e.target.checked })}
                    className="w-4 h-4 rounded text-[var(--maroon)]"
                  />
                  <span>Published</span>
                </label>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-[var(--maroon-light)]/20">
                <button
                  type="button"
                  onClick={() => setEditingNotice(null)}
                  className="px-4 py-2 rounded-xl border border-[var(--maroon-light)]/30 text-[var(--text)]/80 text-xs font-bold hover:bg-[var(--maroon-tint)] transition cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-5 py-2 rounded-xl bg-[var(--maroon)] hover:bg-[var(--maroon-dark)] text-white font-bold text-xs uppercase tracking-wider transition cursor-pointer shadow-xs disabled:opacity-50"
                >
                  {saving ? "Saving..." : "Save Notice"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
