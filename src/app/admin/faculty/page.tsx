"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Users, Plus, Trash2, Edit, Save, X, Loader2, GraduationCap } from "lucide-react";

interface FacultyItem {
  id: string;
  name: string;
  designation: string;
  departmentId: string;
  department?: { name: string };
  qualification: string;
  experience: string;
  email: string | null;
  photoUrl: string | null;
  bio: string | null;
  isPublished: boolean;
}

interface DeptItem {
  id: string;
  name: string;
  code: string;
}

export default function FacultyManagerPage() {
  const [faculty, setFaculty] = useState<FacultyItem[]>([]);
  const [departments, setDepartments] = useState<DeptItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingFaculty, setEditingFaculty] = useState<FacultyItem | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [saving, setSaving] = useState(false);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [facRes, deptRes] = await Promise.all([
        fetch("/api/faculty"),
        fetch("/api/departments"),
      ]);
      const facData = await facRes.json();
      const deptData = await deptRes.json();
      if (facData.success) setFaculty(facData.faculty || []);
      if (deptData.success) setDepartments(deptData.departments || []);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const openCreateModal = () => {
    setEditingFaculty({
      id: "",
      name: "",
      designation: "Lecturer",
      departmentId: departments[0]?.id || "",
      qualification: "M.Sc. / M.A., B.Ed.",
      experience: "5+ Years",
      email: "",
      photoUrl: "/uploads/principal.svg",
      bio: "",
      isPublished: true,
    });
    setIsCreating(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingFaculty) return;
    setSaving(true);
    try {
      const url = isCreating ? "/api/faculty" : `/api/faculty/${editingFaculty.id}`;
      const method = isCreating ? "POST" : "PATCH";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editingFaculty),
      });
      if (res.ok) {
        fetchData();
        setEditingFaculty(null);
      }
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete faculty member?")) return;
    const res = await fetch(`/api/faculty/${id}`, { method: "DELETE" });
    if (res.ok) fetchData();
  };

  return (
    <div className="space-y-8 animate-fade-in max-w-5xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[var(--maroon-light)]/20">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-[var(--maroon-light)] dark:text-[var(--gold)]">
            Academic Staff
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[var(--text)] font-serif">
            Faculty Directory Manager
          </h1>
          <p className="text-xs text-muted-foreground mt-1">
            Manage lecturers, heads of department, qualifications, and profile photos.
          </p>
        </div>
        <button
          onClick={openCreateModal}
          className="btn-maroon inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-white font-bold text-xs uppercase tracking-wider transition shadow-sm cursor-pointer"
        >
          <Plus className="w-4 h-4" /> Add Faculty Member
        </button>
      </div>

      {loading ? (
        <div className="py-20 flex justify-center">
          <Loader2 className="w-8 h-8 text-[var(--maroon)] animate-spin" />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {faculty.map((f) => (
            <div
              key={f.id}
              className="p-5 rounded-3xl bg-white dark:bg-[var(--card)] border border-[var(--maroon-light)]/20 shadow-sm space-y-4 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-[var(--maroon-tint)] shrink-0 border border-[var(--maroon-light)]/20">
                    <Image
                      src={f.photoUrl || "/uploads/principal.svg"}
                      alt={f.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-[var(--maroon)] dark:text-white">{f.name}</h3>
                    <div className="text-[11px] text-[var(--maroon-light)] dark:text-[var(--gold)] font-semibold">{f.designation}</div>
                    <div className="text-[10px] text-muted-foreground">{f.department?.name}</div>
                  </div>
                </div>

                <div className="text-xs text-muted-foreground space-y-1 pt-1">
                  <div>Qualification: {f.qualification}</div>
                  <div>Experience: {f.experience}</div>
                  {f.email && <div>Email: {f.email}</div>}
                </div>
              </div>

              <div className="pt-3 border-t border-[var(--maroon-light)]/15 flex justify-end gap-2">
                <button
                  onClick={() => {
                    setEditingFaculty({ ...f });
                    setIsCreating(false);
                  }}
                  className="px-3 py-1 rounded-lg bg-[var(--maroon-tint)] hover:bg-[var(--maroon)] hover:text-white text-[var(--maroon-dark)] text-xs font-semibold transition"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(f.id)}
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
      {editingFaculty && (
        <div
          className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto animate-fade-in"
          onClick={() => setEditingFaculty(null)}
        >
          <div
            className="w-full max-w-lg bg-white dark:bg-[var(--card)] border border-[var(--maroon-light)]/20 rounded-3xl p-6 sm:p-8 space-y-4 text-left shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center pb-2 border-b border-[var(--maroon-light)]/20">
              <h2 className="text-lg font-bold text-[var(--maroon)] dark:text-white font-serif">
                {isCreating ? "Add Faculty" : "Edit Faculty"}
              </h2>
              <button onClick={() => setEditingFaculty(null)} className="text-muted-foreground hover:text-[var(--text)] transition">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[var(--text)] mb-1">Name</label>
                <input
                  type="text"
                  required
                  value={editingFaculty.name}
                  onChange={(e) => setEditingFaculty({ ...editingFaculty, name: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-black/30 text-[var(--text)] text-xs focus:border-[var(--maroon)] focus:ring-1 focus:ring-[var(--maroon)] outline-hidden"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[var(--text)] mb-1">Designation</label>
                  <input
                    type="text"
                    required
                    value={editingFaculty.designation}
                    onChange={(e) =>
                      setEditingFaculty({ ...editingFaculty, designation: e.target.value })
                    }
                    className="w-full px-3.5 py-2 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-black/30 text-[var(--text)] text-xs focus:border-[var(--maroon)] focus:ring-1 focus:ring-[var(--maroon)] outline-hidden"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[var(--text)] mb-1">Department</label>
                  <select
                    value={editingFaculty.departmentId}
                    onChange={(e) =>
                      setEditingFaculty({ ...editingFaculty, departmentId: e.target.value })
                    }
                    className="w-full px-3 py-2 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-black/30 text-[var(--text)] text-xs focus:border-[var(--maroon)] focus:ring-1 focus:ring-[var(--maroon)] outline-hidden"
                  >
                    {departments.map((d) => (
                      <option key={d.id} value={d.id}>
                        {d.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[var(--text)] mb-1">Qualification</label>
                  <input
                    type="text"
                    required
                    value={editingFaculty.qualification}
                    onChange={(e) =>
                      setEditingFaculty({ ...editingFaculty, qualification: e.target.value })
                    }
                    className="w-full px-3.5 py-2 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-black/30 text-[var(--text)] text-xs focus:border-[var(--maroon)] focus:ring-1 focus:ring-[var(--maroon)] outline-hidden"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[var(--text)] mb-1">Experience</label>
                  <input
                    type="text"
                    required
                    value={editingFaculty.experience}
                    onChange={(e) =>
                      setEditingFaculty({ ...editingFaculty, experience: e.target.value })
                    }
                    className="w-full px-3.5 py-2 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-black/30 text-[var(--text)] text-xs focus:border-[var(--maroon)] focus:ring-1 focus:ring-[var(--maroon)] outline-hidden"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[var(--text)] mb-1">Email</label>
                <input
                  type="email"
                  value={editingFaculty.email || ""}
                  onChange={(e) => setEditingFaculty({ ...editingFaculty, email: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-black/30 text-[var(--text)] text-xs focus:border-[var(--maroon)] focus:ring-1 focus:ring-[var(--maroon)] outline-hidden"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[var(--text)] mb-1">Photo URL</label>
                <input
                  type="text"
                  value={editingFaculty.photoUrl || ""}
                  onChange={(e) => setEditingFaculty({ ...editingFaculty, photoUrl: e.target.value })}
                  placeholder="/uploads/principal.svg"
                  className="w-full px-3.5 py-2 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-black/30 font-mono text-[var(--text)] text-xs focus:border-[var(--maroon)] focus:ring-1 focus:ring-[var(--maroon)] outline-hidden"
                />
              </div>

              <div className="flex justify-end gap-3 pt-3 border-t border-[var(--maroon-light)]/20">
                <button
                  type="button"
                  onClick={() => setEditingFaculty(null)}
                  className="px-4 py-2 rounded-xl border border-gray-300 dark:border-gray-700 text-[var(--text)] text-xs font-bold hover:bg-gray-100 dark:hover:bg-gray-800 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="btn-maroon px-5 py-2 rounded-xl text-white font-bold text-xs uppercase tracking-wider transition"
                >
                  {saving ? "Saving..." : "Save Faculty"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
