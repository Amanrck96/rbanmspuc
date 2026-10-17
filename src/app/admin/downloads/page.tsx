"use client";

import { useState, useEffect } from "react";
import { Download, Plus, Trash2, Save, X, Loader2, FileText } from "lucide-react";

interface DownloadItem {
  id: string;
  title: string;
  category: string;
  fileUrl: string;
  fileSize: string;
  fileType: string;
  downloadCount: number;
  isPublished: boolean;
}

export default function DownloadsManagerPage() {
  const [downloads, setDownloads] = useState<DownloadItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingItem, setEditingItem] = useState<DownloadItem | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [saving, setSaving] = useState(false);

  const fetchDownloads = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/downloads");
      const data = await res.json();
      if (data.success) setDownloads(data.downloads || []);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDownloads();
  }, []);

  const openCreateModal = () => {
    setEditingItem({
      id: "",
      title: "",
      category: "ADMISSION_FORM",
      fileUrl: "/uploads/campus-hero.svg",
      fileSize: "500 KB",
      fileType: "PDF",
      downloadCount: 0,
      isPublished: true,
    });
    setIsCreating(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingItem) return;
    setSaving(true);
    try {
      const url = isCreating ? "/api/downloads" : `/api/downloads/${editingItem.id}`;
      const method = isCreating ? "POST" : "PATCH";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editingItem),
      });
      if (res.ok) {
        fetchDownloads();
        setEditingItem(null);
      }
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this download resource?")) return;
    const res = await fetch(`/api/downloads/${id}`, { method: "DELETE" });
    if (res.ok) fetchDownloads();
  };

  return (
    <div className="space-y-8 animate-fade-in max-w-5xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
            Document Repository
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white font-serif">
            Downloads & Forms Manager
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Manage prospectus PDFs, printable admission forms, examination blueprints, and circulars.
          </p>
        </div>
        <button
          onClick={openCreateModal}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs uppercase tracking-wider transition cursor-pointer"
        >
          <Plus className="w-4 h-4" /> Add Download Item
        </button>
      </div>

      {loading ? (
        <div className="py-20 flex justify-center">
          <Loader2 className="w-8 h-8 text-amber-500 animate-spin" />
        </div>
      ) : (
        <div className="space-y-4">
          {downloads.map((d) => (
            <div
              key={d.id}
              className="p-5 rounded-3xl bg-slate-900 border border-slate-800 shadow-sm flex items-center justify-between gap-4"
            >
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-2xl bg-slate-800 text-blue-400">
                  <FileText className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase text-amber-400">
                    {d.category} • {d.fileType}
                  </span>
                  <h3 className="font-bold text-sm text-white">{d.title}</h3>
                  <div className="text-[11px] font-mono text-slate-400">
                    URL: {d.fileUrl} ({d.fileSize})
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    setEditingItem({ ...d });
                    setIsCreating(false);
                  }}
                  className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(d.id)}
                  className="p-1.5 rounded-xl text-red-400 hover:bg-red-950/60"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {editingItem && (
        <div
          className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto animate-fade-in"
          onClick={() => setEditingItem(null)}
        >
          <div
            className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-4 text-left shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center pb-2 border-b border-slate-800">
              <h2 className="text-lg font-bold text-white font-serif">
                {isCreating ? "Add Download Item" : "Edit Download Item"}
              </h2>
              <button onClick={() => setEditingItem(null)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Title</label>
                <input
                  type="text"
                  required
                  value={editingItem.title}
                  onChange={(e) => setEditingItem({ ...editingItem, title: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Category</label>
                <select
                  value={editingItem.category}
                  onChange={(e) => setEditingItem({ ...editingItem, category: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs"
                >
                  <option value="BROCHURE">PROSPECTUS / BROCHURE</option>
                  <option value="ADMISSION_FORM">ADMISSION FORM</option>
                  <option value="SYLLABUS">SYLLABUS</option>
                  <option value="TIMETABLE">TIMETABLE</option>
                  <option value="CIRCULAR">CIRCULAR</option>
                  <option value="EXAM_RESULT">EXAM RESULT</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">File URL</label>
                <input
                  type="text"
                  required
                  value={editingItem.fileUrl}
                  onChange={(e) => setEditingItem({ ...editingItem, fileUrl: e.target.value })}
                  placeholder="/uploads/prospectus.pdf"
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-800 border border-slate-700 font-mono text-white text-xs"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">File Size</label>
                  <input
                    type="text"
                    value={editingItem.fileSize}
                    onChange={(e) => setEditingItem({ ...editingItem, fileSize: e.target.value })}
                    placeholder="e.g. 2.4 MB"
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">File Type</label>
                  <input
                    type="text"
                    value={editingItem.fileType}
                    onChange={(e) => setEditingItem({ ...editingItem, fileType: e.target.value })}
                    placeholder="PDF"
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs uppercase"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setEditingItem(null)}
                  className="px-4 py-2 rounded-xl border border-slate-700 text-slate-300 text-xs font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs uppercase tracking-wider"
                >
                  {saving ? "Saving..." : "Save Download"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
