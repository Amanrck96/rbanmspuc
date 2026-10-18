"use client";

import { useState, useEffect } from "react";
import { History, Search, Filter, Clock, User, Shield, Loader2 } from "lucide-react";

interface LogItem {
  id: string;
  userName: string;
  userRole: string;
  action: string;
  entityType: string;
  entityId: string | null;
  details: string;
  createdAt: string;
}

export default function ActivityLogPage() {
  const [logs, setLogs] = useState<LogItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionFilter, setActionFilter] = useState("ALL");
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch("/api/activity-logs")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) setLogs(data.logs || []);
      })
      .catch((err) => console.error("Failed to load logs:", err))
      .finally(() => setLoading(false));
  }, []);

  const filtered = logs.filter((log) => {
    const matchesAction = actionFilter === "ALL" || log.action === actionFilter;
    const matchesSearch =
      !search ||
      log.details.toLowerCase().includes(search.toLowerCase()) ||
      log.userName.toLowerCase().includes(search.toLowerCase()) ||
      log.entityType.toLowerCase().includes(search.toLowerCase());
    return matchesAction && matchesSearch;
  });

  const getActionBadge = (action: string) => {
    switch (action) {
      case "CREATE":
        return "bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border-emerald-300 dark:border-emerald-800";
      case "UPDATE":
        return "bg-blue-50 dark:bg-blue-950/60 text-blue-800 dark:text-blue-300 border-blue-300 dark:border-blue-800";
      case "DELETE":
        return "bg-red-50 dark:bg-red-950/60 text-red-800 dark:text-red-300 border-red-300 dark:border-red-800";
      case "RESTORE":
        return "bg-purple-50 dark:bg-purple-950/60 text-purple-800 dark:text-purple-300 border-purple-300 dark:border-purple-800";
      case "LOGIN":
        return "bg-[var(--maroon-tint)] text-[var(--maroon-dark)] dark:bg-[var(--maroon-dark)] dark:text-[var(--gold)] border-[var(--maroon-light)]/30";
      case "EXPORT":
        return "bg-amber-50 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 border-amber-300 dark:border-amber-800";
      default:
        return "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-700";
    }
  };

  return (
    <div className="space-y-8 animate-fade-in max-w-5xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[var(--maroon-light)]/20">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-[var(--maroon-light)] dark:text-[var(--gold)]">
            Audit Trail & Compliance
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[var(--text)] font-serif">
            Administrative Activity Logs
          </h1>
          <p className="text-xs text-muted-foreground mt-1">
            Complete chronological record of all administrative logins, page modifications, CRM updates, and file replacements.
          </p>
        </div>
      </div>

      {/* Filter and Search */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-2">
          {["ALL", "CREATE", "UPDATE", "DELETE", "RESTORE", "LOGIN", "EXPORT"].map((act) => (
            <button
              key={act}
              onClick={() => setActionFilter(act)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
                actionFilter === act
                  ? "btn-maroon text-white shadow-xs"
                  : "bg-white dark:bg-[var(--card)] border border-[var(--maroon-light)]/20 text-[var(--text)] hover:bg-[var(--maroon-tint)] dark:hover:bg-[var(--maroon-dark)]"
              }`}
            >
              {act}
            </button>
          ))}
        </div>

        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 text-muted-foreground absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search details, actor, entity..."
            className="w-full pl-9 pr-4 py-2 rounded-xl bg-white dark:bg-[var(--card)] border border-[var(--maroon-light)]/20 text-xs text-[var(--text)] placeholder:text-muted-foreground focus:outline-hidden focus:ring-1 focus:ring-[var(--maroon)]"
          />
        </div>
      </div>

      {/* Logs Table */}
      <div className="p-6 rounded-3xl bg-white dark:bg-[var(--card)] border border-[var(--maroon-light)]/20 shadow-sm overflow-hidden">
        {loading ? (
          <div className="py-20 flex flex-col items-center justify-center space-y-3">
            <Loader2 className="w-8 h-8 text-[var(--maroon)] animate-spin" />
            <p className="text-xs text-muted-foreground">Loading audit log...</p>
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20 space-y-2">
            <p className="text-base font-bold text-[var(--text)]">No activity records match</p>
            <p className="text-xs text-muted-foreground">Try adjusting your filters or search term.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-[var(--maroon-light)]/20 text-muted-foreground uppercase tracking-wider text-[10px]">
                  <th className="py-3 px-3">Timestamp</th>
                  <th className="py-3 px-3">Action</th>
                  <th className="py-3 px-3">Entity</th>
                  <th className="py-3 px-3">Actor / Role</th>
                  <th className="py-3 px-3">Audit Details</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--maroon-light)]/10">
                {filtered.map((log) => (
                  <tr key={log.id} className="hover:bg-[var(--maroon-tint)]/40 dark:hover:bg-[var(--maroon-dark)]/20 transition">
                    <td className="py-3 px-3 text-muted-foreground font-mono whitespace-nowrap text-[11px]">
                      {new Date(log.createdAt).toLocaleString("en-IN", {
                        day: "numeric",
                        month: "short",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </td>
                    <td className="py-3 px-3">
                      <span
                        className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase border ${getActionBadge(
                          log.action
                        )}`}
                      >
                        {log.action}
                      </span>
                    </td>
                    <td className="py-3 px-3 font-semibold text-[var(--maroon)] dark:text-slate-200">{log.entityType}</td>
                    <td className="py-3 px-3 whitespace-nowrap">
                      <span className="font-bold text-[var(--text)]">{log.userName}</span>
                      <span className="text-[10px] text-[var(--maroon-light)] dark:text-[var(--gold)] block">{log.userRole}</span>
                    </td>
                    <td className="py-3 px-3 text-[var(--text)] dark:text-slate-200">{log.details}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
