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
    <div className="space-y-8 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
            Digital Notice Board
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white font-serif">
            Notices, Circulars & Announcements
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Publish circulars, timetable notices, and admission alerts with PDF attachments.
          </p>
        </div>

        <button
          onClick={openCreateModal}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs uppercase tracking-wider transition shadow-sm cursor-pointer"
        >
          <Plus className="w-4 h-4" /> Create Notice
        </button>
      </div>

      {loading ? (
        <div className="py-20 flex flex-col items-center justify-center space-y-3">
          <Loader2 className="w-8 h-8 text-amber-500 animate-spin" />
          <p className="text-xs text-slate-400">Loading notices...</p>
        </div>
      ) : (
        <div className="space-y-4">
          {notices.map((n) => (
            <div
              key={n.id}
              className="p-5 rounded-3xl bg-slate-900 border border-slate-800 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4"
            >
              <div className="space-y-1.5 flex-1">
                <div className="flex items-center gap-2">
                  {n.isPinned && (
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-500 text-slate-950 uppercase flex items-center gap-1">
                      <Pin className="w-3 h-3 fill-current" /> Pinned
                    </span>
                  )}
                  <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-slate-800 text-slate-300 uppercase">
                    {n.category}
                  </span>
                  <span className="text-[11px] text-slate-500">
                    {new Date(n.date).toLocaleDateString("en-IN", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </span>
                </div>
                <h3 className="font-bold text-base text-white">{n.title}</h3>
                <p className="text-xs text-slate-400 line-clamp-2">{n.description}</p>
                {n.fileUrl && (
                  <div className="text-[11px] text-blue-400 flex items-center gap-1">
                    <Download className="w-3 h-3" /> Attached: {n.fileUrl}
                  </div>
                )}
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() => openEditModal(n)}
                  className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(n.id, n.title)}
                  className="p-1.5 rounded-xl bg-red-950/60 text-red-400 hover:bg-red-900 transition"
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
            className="w-full max-w-xl bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 text-left shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h2 className="text-lg font-bold text-white font-serif">
                {isCreating ? "Create Official Notice" : "Edit Notice"}
              </h2>
              <button
                onClick={() => setEditingNotice(null)}
                className="p-1 rounded-full text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {message && (
              <div className="p-3 rounded-2xl bg-emerald-950/60 border border-emerald-800 text-emerald-300 text-xs">
                {message}
              </div>
            )}

            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Notice Title</label>
                <input
                  type="text"
                  required
                  value={editingNotice.title}
                  onChange={(e) => setEditingNotice({ ...editingNotice, title: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs sm:text-sm"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Category</label>
                  <select
                    value={editingNotice.category}
                    onChange={(e) => setEditingNotice({ ...editingNotice, category: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs"
                  >
                    <option value="NOTICE">NOTICE</option>
                    <option value="CIRCULAR">CIRCULAR</option>
                    <option value="ANNOUNCEMENT">ANNOUNCEMENT</option>
                    <option value="ADMISSION">ADMISSION</option>
                    <option value="RESULT">RESULT</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Notice Date</label>
                  <input
                    type="date"
                    value={
                      editingNotice.date
                        ? new Date(editingNotice.date).toISOString().split("T")[0]
                        : ""
                    }
                    onChange={(e) => setEditingNotice({ ...editingNotice, date: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Description</label>
                <textarea
                  rows={4}
                  required
                  value={editingNotice.description}
                  onChange={(e) => setEditingNotice({ ...editingNotice, description: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Attachment File URL (Optional)
                </label>
                <input
                  type="text"
                  value={editingNotice.fileUrl || ""}
                  onChange={(e) => setEditingNotice({ ...editingNotice, fileUrl: e.target.value })}
                  placeholder="/uploads/campus-hero.svg"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 font-mono text-white text-xs"
                />
              </div>

              <div className="flex items-center gap-6 pt-2">
                <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-slate-300">
                  <input
                    type="checkbox"
                    checked={editingNotice.isPinned}
                    onChange={(e) => setEditingNotice({ ...editingNotice, isPinned: e.target.checked })}
                    className="w-4 h-4 rounded text-amber-500"
                  />
                  <span>Pin to Top of Notice Board</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-slate-300">
                  <input
                    type="checkbox"
                    checked={editingNotice.isPublished}
                    onChange={(e) => setEditingNotice({ ...editingNotice, isPublished: e.target.checked })}
                    className="w-4 h-4 rounded text-amber-500"
                  />
                  <span>Published</span>
                </label>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setEditingNotice(null)}
                  className="px-4 py-2 rounded-xl border border-slate-700 text-slate-300 text-xs font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs uppercase tracking-wider"
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
