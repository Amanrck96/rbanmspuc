"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { ImageIcon, Plus, Trash2, Edit, Save, X, Loader2 } from "lucide-react";

interface GalleryItem {
  id: string;
  title: string;
  category: string;
  type: string;
  url: string;
  caption: string | null;
  isFeatured: boolean;
  order: number;
}

export default function GalleryManagerPage() {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingItem, setEditingItem] = useState<GalleryItem | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [saving, setSaving] = useState(false);

  const fetchItems = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/gallery");
      const data = await res.json();
      if (data.success) setItems(data.items || []);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const openCreateModal = () => {
    setEditingItem({
      id: "",
      title: "",
      category: "CAMPUS",
      type: "IMAGE",
      url: "/uploads/campus-hero.svg",
      caption: "",
      isFeatured: false,
      order: items.length + 1,
    });
    setIsCreating(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingItem) return;
    setSaving(true);
    try {
      const url = isCreating ? "/api/gallery" : `/api/gallery/${editingItem.id}`;
      const method = isCreating ? "POST" : "PATCH";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editingItem),
      });
      if (res.ok) {
        fetchItems();
        setEditingItem(null);
      }
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete gallery photo?")) return;
    const res = await fetch(`/api/gallery/${id}`, { method: "DELETE" });
    if (res.ok) fetchItems();
  };

  return (
    <div className="space-y-8 animate-fade-in max-w-5xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[var(--maroon-light)]/20">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-[var(--maroon-light)] dark:text-[var(--gold)]">
            Media Archive
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[var(--text)] font-serif">
            Photo Gallery Manager
          </h1>
          <p className="text-xs text-muted-foreground mt-1">
            Manage photos, categories, and captions appearing on the public website.
          </p>
        </div>
        <button
          onClick={openCreateModal}
          className="btn-maroon inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-white font-bold text-xs uppercase tracking-wider transition shadow-sm cursor-pointer"
        >
          <Plus className="w-4 h-4" /> Add Photo
        </button>
      </div>

      {loading ? (
        <div className="py-20 flex justify-center">
          <Loader2 className="w-8 h-8 text-[var(--maroon)] animate-spin" />
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {items.map((item) => (
            <div
              key={item.id}
              className="bg-white dark:bg-[var(--card)] rounded-3xl overflow-hidden border border-[var(--maroon-light)]/20 shadow-sm flex flex-col justify-between group"
            >
              <div className="relative w-full h-44 bg-[var(--maroon-tint)]">
                <Image src={item.url} alt={item.title} fill className="object-cover" />
                <div className="absolute top-3 left-3">
                  <span className="px-2 py-0.5 rounded-full bg-[var(--maroon-dark)]/90 text-[var(--gold)] text-[10px] font-bold uppercase backdrop-blur-xs">
                    {item.category}
                  </span>
                </div>
              </div>

              <div className="p-4 space-y-2">
                <h3 className="font-bold text-sm text-[var(--maroon)] dark:text-white">{item.title}</h3>
                {item.caption && <p className="text-xs text-muted-foreground line-clamp-1">{item.caption}</p>}
                <div className="pt-2 border-t border-[var(--maroon-light)]/15 flex justify-end gap-2">
                  <button
                    onClick={() => {
                      setEditingItem({ ...item });
                      setIsCreating(false);
                    }}
                    className="px-2.5 py-1 rounded-lg bg-[var(--maroon-tint)] hover:bg-[var(--maroon)] hover:text-white text-[var(--maroon-dark)] text-xs font-semibold transition"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="p-1 rounded-lg text-red-500 hover:bg-red-50 dark:hover:bg-red-950/40 transition"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
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
            className="w-full max-w-md bg-white dark:bg-[var(--card)] border border-[var(--maroon-light)]/20 rounded-3xl p-6 sm:p-8 space-y-4 text-left shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center pb-2 border-b border-[var(--maroon-light)]/20">
              <h2 className="text-lg font-bold text-[var(--maroon)] dark:text-white font-serif">
                {isCreating ? "Add Photo" : "Edit Photo Details"}
              </h2>
              <button onClick={() => setEditingItem(null)} className="text-muted-foreground hover:text-[var(--text)] transition">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[var(--text)] mb-1">Title</label>
                <input
                  type="text"
                  required
                  value={editingItem.title}
                  onChange={(e) => setEditingItem({ ...editingItem, title: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-black/30 text-[var(--text)] text-xs focus:border-[var(--maroon)] focus:ring-1 focus:ring-[var(--maroon)] outline-hidden"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[var(--text)] mb-1">Image URL</label>
                <input
                  type="text"
                  required
                  value={editingItem.url}
                  onChange={(e) => setEditingItem({ ...editingItem, url: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-black/30 font-mono text-[var(--text)] text-xs focus:border-[var(--maroon)] focus:ring-1 focus:ring-[var(--maroon)] outline-hidden"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[var(--text)] mb-1">Category</label>
                <select
                  value={editingItem.category}
                  onChange={(e) => setEditingItem({ ...editingItem, category: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-black/30 text-[var(--text)] text-xs focus:border-[var(--maroon)] focus:ring-1 focus:ring-[var(--maroon)] outline-hidden"
                >
                  <option value="CAMPUS">CAMPUS & HERITAGE</option>
                  <option value="LABS">LABORATORIES</option>
                  <option value="SPORTS">SPORTS & ATHLETICS</option>
                  <option value="CULTURAL">CULTURAL FESTIVALS</option>
                  <option value="EVENTS">EVENTS & CELEBRATIONS</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[var(--text)] mb-1">Caption</label>
                <input
                  type="text"
                  value={editingItem.caption || ""}
                  onChange={(e) => setEditingItem({ ...editingItem, caption: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-black/30 text-[var(--text)] text-xs focus:border-[var(--maroon)] focus:ring-1 focus:ring-[var(--maroon)] outline-hidden"
                />
              </div>

              <div className="flex justify-end gap-3 pt-3 border-t border-[var(--maroon-light)]/20">
                <button
                  type="button"
                  onClick={() => setEditingItem(null)}
                  className="px-4 py-2 rounded-xl border border-gray-300 dark:border-gray-700 text-[var(--text)] text-xs font-bold hover:bg-gray-100 dark:hover:bg-gray-800 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="btn-maroon px-5 py-2 rounded-xl text-white font-bold text-xs uppercase tracking-wider transition"
                >
                  {saving ? "Saving..." : "Save Photo"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
