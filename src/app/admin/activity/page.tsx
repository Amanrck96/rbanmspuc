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
        return "bg-emerald-500/20 text-emerald-300 border-emerald-500/30";
      case "UPDATE":
        return "bg-blue-500/20 text-blue-300 border-blue-500/30";
      case "DELETE":
        return "bg-red-500/20 text-red-300 border-red-500/30";
      case "RESTORE":
        return "bg-purple-500/20 text-purple-300 border-purple-500/30";
      case "LOGIN":
        return "bg-amber-500/20 text-amber-300 border-amber-500/30";
      case "EXPORT":
        return "bg-cyan-500/20 text-cyan-300 border-cyan-500/30";
      default:
        return "bg-slate-700 text-slate-300";
    }
  };

  return (
    <div className="space-y-8 animate-fade-in max-w-5xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
            Audit Trail & Compliance
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white font-serif">
            Administrative Activity Logs
          </h1>
          <p className="text-xs text-slate-400 mt-1">
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
                  ? "bg-amber-500 text-slate-950 shadow-md"
                  : "bg-slate-900 border border-slate-800 text-slate-300 hover:bg-slate-800"
              }`}
            >
              {act}
            </button>
          ))}
        </div>

        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search details, actor, entity..."
            className="w-full pl-9 pr-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-hidden focus:ring-2 focus:ring-amber-500"
          />
        </div>
      </div>

      {/* Logs Table */}
      <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 shadow-sm overflow-hidden">
        {loading ? (
          <div className="py-20 flex flex-col items-center justify-center space-y-3">
            <Loader2 className="w-8 h-8 text-amber-500 animate-spin" />
            <p className="text-xs text-slate-400">Loading audit log...</p>
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20 space-y-2">
            <p className="text-base font-bold text-white">No activity records match</p>
            <p className="text-xs text-slate-400">Try adjusting your filters or search term.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 uppercase tracking-wider text-[10px]">
                  <th className="py-3 px-3">Timestamp</th>
                  <th className="py-3 px-3">Action</th>
                  <th className="py-3 px-3">Entity</th>
                  <th className="py-3 px-3">Actor / Role</th>
                  <th className="py-3 px-3">Audit Details</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {filtered.map((log) => (
                  <tr key={log.id} className="hover:bg-slate-800/40 transition">
                    <td className="py-3 px-3 text-slate-400 font-mono whitespace-nowrap text-[11px]">
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
                    <td className="py-3 px-3 font-semibold text-slate-300">{log.entityType}</td>
                    <td className="py-3 px-3 whitespace-nowrap">
                      <span className="font-bold text-white">{log.userName}</span>
                      <span className="text-[10px] text-amber-400 block">{log.userRole}</span>
                    </td>
                    <td className="py-3 px-3 text-slate-200">{log.details}</td>
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
