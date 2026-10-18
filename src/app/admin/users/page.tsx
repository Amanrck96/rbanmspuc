"use client";

import { useState, useEffect } from "react";
import {
  Shield,
  UserPlus,
  Users,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Save,
  X,
  Lock,
} from "lucide-react";

interface UserItem {
  id: string;
  name: string;
  email: string;
  role: string;
  isActive: boolean;
  createdAt: string;
}

export default function UsersManagerPage() {
  const [users, setUsers] = useState<UserItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    password: "",
    role: "EDITOR",
  });
  const [creating, setCreating] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/users");
      const data = await res.json();
      if (data.success) setUsers(data.users || []);
    } catch (err) {
      console.error("Failed to load users:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setCreating(true);
    setMessage(null);

    try {
      const res = await fetch("/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newUser),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Failed to create user");
      }

      setMessage(`Created user ${newUser.name} successfully!`);
      setNewUser({ name: "", email: "", password: "", role: "EDITOR" });
      fetchUsers();
      setTimeout(() => setShowCreateModal(false), 1500);
    } catch (err: any) {
      setMessage(`Error: ${err.message}`);
    } finally {
      setCreating(false);
    }
  };

  return (
    <div className="space-y-8 animate-fade-in max-w-5xl text-[var(--text)]">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[var(--maroon-light)]/20">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-[var(--maroon)] dark:text-[var(--gold)]">
            Roles & Permissions
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[var(--maroon)] dark:text-white font-serif">
            Staff & User Management
          </h1>
          <p className="text-xs text-[var(--text)]/70 mt-1">
            Assign role-based access for Super Admin, Editor, and Receptionist counselors.
          </p>
        </div>

        <button
          onClick={() => {
            setShowCreateModal(true);
            setMessage(null);
          }}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[var(--maroon)] hover:bg-[var(--maroon-dark)] text-white font-bold text-xs uppercase tracking-wider transition shadow-sm cursor-pointer"
        >
          <UserPlus className="w-4 h-4 text-[var(--gold)]" /> Add Staff Member
        </button>
      </div>

      {/* Users Table */}
      <div className="p-6 rounded-3xl bg-white dark:bg-[var(--card)] border border-[var(--maroon-light)]/20 shadow-xs overflow-hidden">
        {loading ? (
          <div className="py-20 flex flex-col items-center justify-center space-y-3">
            <Loader2 className="w-8 h-8 text-[var(--gold)] animate-spin" />
            <p className="text-xs text-[var(--text)]/60">Loading user accounts...</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-[var(--maroon-light)]/20 text-[var(--text)]/60 uppercase tracking-wider text-[10px]">
                  <th className="py-3 px-3">Name</th>
                  <th className="py-3 px-3">Email Address</th>
                  <th className="py-3 px-3">Role</th>
                  <th className="py-3 px-3">Status</th>
                  <th className="py-3 px-3">Created</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--maroon-light)]/10">
                {users.map((u) => (
                  <tr key={u.id} className="hover:bg-[var(--maroon-tint)]/40 transition">
                    <td className="py-3.5 px-3 font-bold text-[var(--text)] text-sm">{u.name}</td>
                    <td className="py-3.5 px-3 font-mono text-[var(--text)]/80">{u.email}</td>
                    <td className="py-3.5 px-3">
                      <span
                        className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                          u.role === "SUPER_ADMIN"
                            ? "bg-[var(--maroon-tint)] text-[var(--maroon)] dark:text-[var(--gold)] border border-[var(--maroon-light)]/30"
                            : u.role === "EDITOR"
                            ? "bg-blue-100 text-blue-800 dark:bg-blue-950/60 dark:text-blue-300 border border-blue-500/30"
                            : "bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300 border border-emerald-500/30"
                        }`}
                      >
                        {u.role.replace(/_/g, " ")}
                      </span>
                    </td>
                    <td className="py-3.5 px-3">
                      <span className="text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1 text-[11px]">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> Active
                      </span>
                    </td>
                    <td className="py-3.5 px-3 text-[var(--text)]/50 text-[11px]">
                      {new Date(u.createdAt).toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Create User Modal */}
      {showCreateModal && (
        <div
          className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto animate-fade-in"
          onClick={() => setShowCreateModal(false)}
        >
          <div
            className="w-full max-w-md bg-white dark:bg-[var(--card)] border border-[var(--maroon-light)]/30 rounded-3xl p-6 sm:p-8 space-y-6 text-left shadow-2xl text-[var(--text)]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b border-[var(--maroon-light)]/20">
              <h2 className="text-lg font-bold text-[var(--text)] font-serif">Add Staff Member</h2>
              <button
                onClick={() => setShowCreateModal(false)}
                className="p-1 rounded-full text-[var(--text)]/60 hover:text-[var(--text)] hover:bg-[var(--maroon-tint)] cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {message && (
              <div
                className={`p-3 rounded-2xl text-xs flex items-center gap-2 ${
                  message.startsWith("Error")
                    ? "bg-red-100 dark:bg-red-950/60 border border-red-500/40 text-red-800 dark:text-red-300"
                    : "bg-emerald-100 dark:bg-emerald-950/60 border border-emerald-500/40 text-emerald-800 dark:text-emerald-300"
                }`}
              >
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>{message}</span>
              </div>
            )}

            <form onSubmit={handleCreate} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[var(--text)] mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  value={newUser.name}
                  onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                  placeholder="e.g. Smt. Kavitha S."
                  className="w-full px-3.5 py-2 rounded-xl bg-white dark:bg-[var(--card)] border border-[var(--maroon-light)]/30 text-[var(--text)] text-xs focus:ring-2 focus:ring-[var(--maroon)] focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[var(--text)] mb-1">
                  Staff Email
                </label>
                <input
                  type="email"
                  required
                  value={newUser.email}
                  onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                  placeholder="kavitha@rbanmspuc.edu.in"
                  className="w-full px-3.5 py-2 rounded-xl bg-white dark:bg-[var(--card)] border border-[var(--maroon-light)]/30 text-[var(--text)] text-xs focus:ring-2 focus:ring-[var(--maroon)] focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[var(--text)] mb-1">
                  Initial Password
                </label>
                <input
                  type="password"
                  required
                  value={newUser.password}
                  onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                  placeholder="••••••••••••"
                  className="w-full px-3.5 py-2 rounded-xl bg-white dark:bg-[var(--card)] border border-[var(--maroon-light)]/30 text-[var(--text)] text-xs focus:ring-2 focus:ring-[var(--maroon)] focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[var(--text)] mb-1">
                  Access Role
                </label>
                <select
                  value={newUser.role}
                  onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl bg-white dark:bg-[var(--card)] border border-[var(--maroon-light)]/30 text-[var(--text)] text-xs focus:ring-2 focus:ring-[var(--maroon)] focus:outline-hidden"
                >
                  <option value="SUPER_ADMIN">SUPER ADMIN (Full system control)</option>
                  <option value="EDITOR">EDITOR (Manage content, notices, pages)</option>
                  <option value="RECEPTIONIST">RECEPTIONIST (Admissions CRM and inquiries)</option>
                </select>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-[var(--maroon-light)]/20">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="px-4 py-2 rounded-xl border border-[var(--maroon-light)]/30 text-[var(--text)]/80 text-xs font-bold hover:bg-[var(--maroon-tint)] transition cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={creating}
                  className="px-5 py-2 rounded-xl bg-[var(--maroon)] hover:bg-[var(--maroon-dark)] text-white font-bold text-xs uppercase tracking-wider transition cursor-pointer disabled:opacity-50 shadow-xs"
                >
                  {creating ? "Creating..." : "Create Account"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
