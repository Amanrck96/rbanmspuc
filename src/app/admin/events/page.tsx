"use client";

import { useState, useEffect } from "react";
import { Calendar, Plus, Trash2, Edit, Save, X, Loader2, MapPin } from "lucide-react";

interface EventItem {
  id: string;
  title: string;
  category: string;
  eventDate: string;
  venue: string;
  description: string;
  imageUrl: string | null;
  isPublished: boolean;
}

export default function EventsManagerPage() {
  const [events, setEvents] = useState<EventItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingEvent, setEditingEvent] = useState<EventItem | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [saving, setSaving] = useState(false);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/events");
      const data = await res.json();
      if (data.success) setEvents(data.events || []);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const openCreateModal = () => {
    setEditingEvent({
      id: "",
      title: "",
      category: "ACADEMIC",
      eventDate: new Date().toISOString().split("T")[0],
      venue: "Central Auditorium",
      description: "",
      imageUrl: "/uploads/campus-hero.svg",
      isPublished: true,
    });
    setIsCreating(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingEvent) return;
    setSaving(true);
    try {
      const url = isCreating ? "/api/events" : `/api/events/${editingEvent.id}`;
      const method = isCreating ? "POST" : "PATCH";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editingEvent),
      });
      if (res.ok) {
        fetchEvents();
        setEditingEvent(null);
      }
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this event?")) return;
    const res = await fetch(`/api/events/${id}`, { method: "DELETE" });
    if (res.ok) fetchEvents();
  };

  return (
    <div className="space-y-8 animate-fade-in max-w-5xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[var(--maroon-light)]/20">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-[var(--maroon-light)] dark:text-[var(--gold)]">
            Calendar Management
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[var(--text)] font-serif">
            Upcoming & Past Events
          </h1>
          <p className="text-xs text-muted-foreground mt-1">
            Manage college fests, athletic meets, Founder&apos;s Day celebrations, and academic summits.
          </p>
        </div>
        <button
          onClick={openCreateModal}
          className="btn-maroon inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-white font-bold text-xs uppercase tracking-wider transition shadow-sm cursor-pointer"
        >
          <Plus className="w-4 h-4" /> Add Event
        </button>
      </div>

      {loading ? (
        <div className="py-20 flex justify-center">
          <Loader2 className="w-8 h-8 text-[var(--maroon)] animate-spin" />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {events.map((ev) => (
            <div
              key={ev.id}
              className="p-6 rounded-3xl bg-white dark:bg-[var(--card)] border border-[var(--maroon-light)]/20 shadow-sm space-y-3 flex flex-col justify-between"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-[var(--maroon-tint)] text-[var(--maroon-dark)] dark:bg-[var(--maroon-dark)] dark:text-[var(--gold)] uppercase">
                    {ev.category}
                  </span>
                  <span className="text-xs text-muted-foreground font-mono">
                    {new Date(ev.eventDate).toLocaleDateString("en-IN", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </span>
                </div>
                <h3 className="font-bold text-base text-[var(--maroon)] dark:text-white">{ev.title}</h3>
                <p className="text-xs text-muted-foreground line-clamp-2">{ev.description}</p>
                <div className="text-xs text-[var(--maroon-light)] dark:text-[var(--gold)] flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5" /> {ev.venue}
                </div>
              </div>

              <div className="pt-3 border-t border-[var(--maroon-light)]/15 flex justify-end gap-2">
                <button
                  onClick={() => {
                    setEditingEvent({ ...ev });
                    setIsCreating(false);
                  }}
                  className="px-3 py-1 rounded-lg bg-[var(--maroon-tint)] hover:bg-[var(--maroon)] hover:text-white text-[var(--maroon-dark)] text-xs font-semibold transition"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(ev.id)}
                  className="p-1.5 rounded-lg text-red-500 hover:bg-red-50 dark:hover:bg-red-950/40 transition"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Event Modal */}
      {editingEvent && (
        <div
          className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto animate-fade-in"
          onClick={() => setEditingEvent(null)}
        >
          <div
            className="w-full max-w-lg bg-white dark:bg-[var(--card)] border border-[var(--maroon-light)]/20 rounded-3xl p-6 sm:p-8 space-y-4 text-left shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center pb-2 border-b border-[var(--maroon-light)]/20">
              <h2 className="text-lg font-bold text-[var(--maroon)] dark:text-white font-serif">
                {isCreating ? "Add Event" : "Edit Event"}
              </h2>
              <button
                onClick={() => setEditingEvent(null)}
                className="text-muted-foreground hover:text-[var(--text)] transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[var(--text)] mb-1">Title</label>
                <input
                  type="text"
                  required
                  value={editingEvent.title}
                  onChange={(e) => setEditingEvent({ ...editingEvent, title: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-black/30 text-[var(--text)] text-xs focus:border-[var(--maroon)] focus:ring-1 focus:ring-[var(--maroon)] outline-hidden"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[var(--text)] mb-1">Category</label>
                  <input
                    type="text"
                    value={editingEvent.category}
                    onChange={(e) => setEditingEvent({ ...editingEvent, category: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-black/30 text-[var(--text)] text-xs uppercase focus:border-[var(--maroon)] focus:ring-1 focus:ring-[var(--maroon)] outline-hidden"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[var(--text)] mb-1">Date</label>
                  <input
                    type="date"
                    required
                    value={
                      editingEvent.eventDate
                        ? new Date(editingEvent.eventDate).toISOString().split("T")[0]
                        : ""
                    }
                    onChange={(e) => setEditingEvent({ ...editingEvent, eventDate: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-black/30 text-[var(--text)] text-xs focus:border-[var(--maroon)] focus:ring-1 focus:ring-[var(--maroon)] outline-hidden"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[var(--text)] mb-1">Venue</label>
                <input
                  type="text"
                  required
                  value={editingEvent.venue}
                  onChange={(e) => setEditingEvent({ ...editingEvent, venue: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-black/30 text-[var(--text)] text-xs focus:border-[var(--maroon)] focus:ring-1 focus:ring-[var(--maroon)] outline-hidden"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[var(--text)] mb-1">Description</label>
                <textarea
                  rows={3}
                  required
                  value={editingEvent.description}
                  onChange={(e) => setEditingEvent({ ...editingEvent, description: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-black/30 text-[var(--text)] text-xs focus:border-[var(--maroon)] focus:ring-1 focus:ring-[var(--maroon)] outline-hidden"
                />
              </div>

              <div className="flex justify-end gap-3 pt-3 border-t border-[var(--maroon-light)]/20">
                <button
                  type="button"
                  onClick={() => setEditingEvent(null)}
                  className="px-4 py-2 rounded-xl border border-gray-300 dark:border-gray-700 text-[var(--text)] text-xs font-bold hover:bg-gray-100 dark:hover:bg-gray-800 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="btn-maroon px-5 py-2 rounded-xl text-white font-bold text-xs uppercase tracking-wider transition"
                >
                  {saving ? "Saving..." : "Save Event"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
