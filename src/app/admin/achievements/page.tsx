"use client";

import { useState, useEffect } from "react";
import { Award, Plus, Trash2, Edit, Save, X, Loader2 } from "lucide-react";

interface AchievementItem {
  id: string;
  title: string;
  category: string;
  recipient: string;
  year: string;
  description: string;
}

export default function AchievementsManagerPage() {
  const [items, setItems] = useState<AchievementItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingItem, setEditingItem] = useState<AchievementItem | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [saving, setSaving] = useState(false);

  const fetchItems = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/achievements");
      const data = await res.json();
      if (data.success) setItems(data.achievements || []);
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
      category: "STUDENT",
      recipient: "",
      year: new Date().getFullYear().toString(),
      description: "",
    });
    setIsCreating(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingItem) return;
    setSaving(true);
    try {
      const url = isCreating ? "/api/achievements" : `/api/achievements/${editingItem.id}`;
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
    if (!confirm("Delete achievement?")) return;
    const res = await fetch(`/api/achievements/${id}`, { method: "DELETE" });
    if (res.ok) fetchItems();
  };

  return (
    <div className="space-y-8 animate-fade-in max-w-5xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[var(--maroon-light)]/20">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-[var(--maroon-light)] dark:text-[var(--gold)]">
            Hall of Distinction
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[var(--text)] font-serif">
            Achievements Manager
          </h1>
          <p className="text-xs text-muted-foreground mt-1">
            Manage student board ranks, faculty state awards, and athletic championship milestones.
          </p>
        </div>
        <button
          onClick={openCreateModal}
          className="btn-maroon inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-white font-bold text-xs uppercase tracking-wider transition shadow-sm cursor-pointer"
        >
          <Plus className="w-4 h-4" /> Add Achievement
        </button>
      </div>

      {loading ? (
        <div className="py-20 flex justify-center">
          <Loader2 className="w-8 h-8 text-[var(--maroon)] animate-spin" />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item) => (
            <div
              key={item.id}
              className="p-6 rounded-3xl bg-white dark:bg-[var(--card)] border border-[var(--maroon-light)]/20 shadow-sm space-y-3 flex flex-col justify-between"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-[var(--maroon-tint)] text-[var(--maroon-dark)] dark:bg-[var(--maroon-dark)] dark:text-[var(--gold)] uppercase">
                    {item.category} • {item.year}
                  </span>
                </div>
                <h3 className="font-bold text-base text-[var(--maroon)] dark:text-white">{item.title}</h3>
                <div className="text-xs text-[var(--maroon-light)] dark:text-[var(--gold)] font-semibold">{item.recipient}</div>
                <p className="text-xs text-muted-foreground leading-relaxed">{item.description}</p>
              </div>

              <div className="pt-3 border-t border-[var(--maroon-light)]/15 flex justify-end gap-2">
                <button
                  onClick={() => {
                    setEditingItem({ ...item });
                    setIsCreating(false);
                  }}
                  className="px-3 py-1 rounded-lg bg-[var(--maroon-tint)] hover:bg-[var(--maroon)] hover:text-white text-[var(--maroon-dark)] text-xs font-semibold transition"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(item.id)}
                  className="p-1.5 rounded-lg text-red-500 hover:bg-red-50 dark:hover:bg-red-950/40 transition"
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
            className="w-full max-w-md bg-white dark:bg-[var(--card)] border border-[var(--maroon-light)]/20 rounded-3xl p-6 sm:p-8 space-y-4 text-left shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center pb-2 border-b border-[var(--maroon-light)]/20">
              <h2 className="text-lg font-bold text-[var(--maroon)] dark:text-white font-serif">
                {isCreating ? "Add Achievement" : "Edit Achievement"}
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
                  placeholder="e.g. State 4th Rank in Commerce"
                  className="w-full px-3.5 py-2 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-black/30 text-[var(--text)] text-xs focus:border-[var(--maroon)] focus:ring-1 focus:ring-[var(--maroon)] outline-hidden"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[var(--text)] mb-1">Category</label>
                  <select
                    value={editingItem.category}
                    onChange={(e) => setEditingItem({ ...editingItem, category: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-black/30 text-[var(--text)] text-xs focus:border-[var(--maroon)] focus:ring-1 focus:ring-[var(--maroon)] outline-hidden"
                  >
                    <option value="STUDENT">STUDENT</option>
                    <option value="FACULTY">FACULTY</option>
                    <option value="SPORTS">SPORTS</option>
                    <option value="CULTURAL">CULTURAL</option>
                    <option value="INSTITUTION">INSTITUTION</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[var(--text)] mb-1">Year</label>
                  <input
                    type="text"
                    value={editingItem.year}
                    onChange={(e) => setEditingItem({ ...editingItem, year: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-black/30 text-[var(--text)] text-xs focus:border-[var(--maroon)] focus:ring-1 focus:ring-[var(--maroon)] outline-hidden"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[var(--text)] mb-1">
                  Recipient Name
                </label>
                <input
                  type="text"
                  required
                  value={editingItem.recipient}
                  onChange={(e) => setEditingItem({ ...editingItem, recipient: e.target.value })}
                  placeholder="e.g. Ananya Sharma (II PUC SEBA)"
                  className="w-full px-3.5 py-2 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-black/30 text-[var(--text)] text-xs focus:border-[var(--maroon)] focus:ring-1 focus:ring-[var(--maroon)] outline-hidden"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[var(--text)] mb-1">Description</label>
                <textarea
                  rows={3}
                  required
                  value={editingItem.description}
                  onChange={(e) => setEditingItem({ ...editingItem, description: e.target.value })}
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
                  {saving ? "Saving..." : "Save Achievement"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
