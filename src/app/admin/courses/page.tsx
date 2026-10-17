"use client";

import { useState, useEffect } from "react";
import {
  GraduationCap,
  Plus,
  Trash2,
  Edit,
  Save,
  X,
  CheckCircle2,
  Loader2,
  BookOpen,
} from "lucide-react";

interface CourseItem {
  id: string;
  code: string;
  name: string;
  stream: string;
  duration: string;
  eligibility: string;
  intake: number;
  subjects: string;
  careerProspects: string;
  isPublished: boolean;
  order: number;
}

export default function CoursesManagerPage() {
  const [courses, setCourses] = useState<CourseItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingCourse, setEditingCourse] = useState<CourseItem | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const fetchCourses = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/courses");
      const data = await res.json();
      if (data.success) setCourses(data.courses || []);
    } catch (err) {
      console.error("Failed to load courses:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const openCreateModal = () => {
    setEditingCourse({
      id: "",
      code: "",
      name: "",
      stream: "SCIENCE",
      duration: "2 Years",
      eligibility: "Pass in SSLC or equivalent Class 10",
      intake: 80,
      subjects: "",
      careerProspects: "",
      isPublished: true,
      order: courses.length + 1,
    });
    setIsCreating(true);
    setMessage(null);
  };

  const openEditModal = (c: CourseItem) => {
    setEditingCourse({ ...c });
    setIsCreating(false);
    setMessage(null);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingCourse) return;
    setSaving(true);
    setMessage(null);

    try {
      const url = isCreating ? "/api/courses" : `/api/courses/${editingCourse.id}`;
      const method = isCreating ? "POST" : "PATCH";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editingCourse),
      });

      const data = await res.json();
      if (!res.ok || !data.success) throw new Error(data.error || "Failed to save course");

      setMessage("Course updated and revalidated on public website!");
      fetchCourses();
      setTimeout(() => setEditingCourse(null), 1500);
    } catch (err: any) {
      setMessage(`Error: ${err.message}`);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string, code: string) => {
    if (!confirm(`Delete course ${code}? (Can be restored from Recycle Bin)`)) return;
    try {
      const res = await fetch(`/api/courses/${id}`, { method: "DELETE" });
      if (res.ok) fetchCourses();
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
            Curriculum Management
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white font-serif">
            Courses & Combinations
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Manage academic combinations (PCMB, PCMC, CEBA, SEBA, HEGP), seats, and syllabus.
          </p>
        </div>

        <button
          onClick={openCreateModal}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs uppercase tracking-wider transition shadow-sm cursor-pointer"
        >
          <Plus className="w-4 h-4" /> Add New Course
        </button>
      </div>

      {loading ? (
        <div className="py-20 flex flex-col items-center justify-center space-y-3">
          <Loader2 className="w-8 h-8 text-amber-500 animate-spin" />
          <p className="text-xs text-slate-400">Loading courses...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((c) => (
            <div
              key={c.id}
              className="p-6 rounded-3xl bg-slate-900 border border-slate-800 shadow-sm space-y-4 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-slate-800 text-amber-400 uppercase">
                    {c.stream} Stream
                  </span>
                  <span className="text-xs text-slate-400">Intake: {c.intake}</span>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-white font-mono">{c.code}</h3>
                  <div className="text-xs font-semibold text-slate-300 mt-0.5">{c.name}</div>
                </div>

                <div className="text-xs text-slate-400 space-y-1">
                  <div>
                    <span className="text-slate-500 font-semibold">Subjects:</span> {c.subjects}
                  </div>
                  <div>
                    <span className="text-slate-500 font-semibold">Career:</span> {c.careerProspects}
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
                <span
                  className={`text-[10px] font-bold uppercase ${
                    c.isPublished ? "text-emerald-400" : "text-slate-500"
                  }`}
                >
                  {c.isPublished ? "Active on site" : "Draft"}
                </span>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => openEditModal(c)}
                    className="px-3 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(c.id, c.code)}
                    className="p-1 rounded-lg text-red-400 hover:bg-red-950/60"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Editor Modal */}
      {editingCourse && (
        <div
          className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto animate-fade-in"
          onClick={() => setEditingCourse(null)}
        >
          <div
            className="w-full max-w-xl bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 text-left shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h2 className="text-lg font-bold text-white font-serif">
                {isCreating ? "Add New Course Combination" : `Edit Course: ${editingCourse.code}`}
              </h2>
              <button
                onClick={() => setEditingCourse(null)}
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
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Course Code (e.g. PCMC)
                  </label>
                  <input
                    type="text"
                    required
                    value={editingCourse.code}
                    onChange={(e) => setEditingCourse({ ...editingCourse, code: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white font-mono text-xs uppercase"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Stream</label>
                  <select
                    value={editingCourse.stream}
                    onChange={(e) => setEditingCourse({ ...editingCourse, stream: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs"
                  >
                    <option value="SCIENCE">SCIENCE</option>
                    <option value="COMMERCE">COMMERCE</option>
                    <option value="ARTS">ARTS</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  value={editingCourse.name}
                  onChange={(e) => setEditingCourse({ ...editingCourse, name: e.target.value })}
                  placeholder="e.g. Physics, Chemistry, Mathematics, Computer Science"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Intake (Seats)
                  </label>
                  <input
                    type="number"
                    value={editingCourse.intake}
                    onChange={(e) =>
                      setEditingCourse({ ...editingCourse, intake: parseInt(e.target.value) || 80 })
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Duration</label>
                  <input
                    type="text"
                    value={editingCourse.duration}
                    onChange={(e) => setEditingCourse({ ...editingCourse, duration: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Subjects</label>
                <input
                  type="text"
                  required
                  value={editingCourse.subjects}
                  onChange={(e) => setEditingCourse({ ...editingCourse, subjects: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Eligibility Criteria
                </label>
                <textarea
                  rows={2}
                  value={editingCourse.eligibility}
                  onChange={(e) => setEditingCourse({ ...editingCourse, eligibility: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Career Prospects
                </label>
                <textarea
                  rows={2}
                  value={editingCourse.careerProspects}
                  onChange={(e) =>
                    setEditingCourse({ ...editingCourse, careerProspects: e.target.value })
                  }
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs"
                />
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setEditingCourse(null)}
                  className="px-4 py-2 rounded-xl border border-slate-700 text-slate-300 text-xs font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs uppercase tracking-wider"
                >
                  {saving ? "Saving..." : "Save Course"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
