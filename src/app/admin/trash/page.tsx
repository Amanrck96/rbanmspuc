"use client";

import { useState, useEffect } from "react";
import {
  Trash2,
  RotateCcw,
  CheckCircle2,
  Loader2,
  Calendar,
  User,
  AlertCircle,
  FileText,
} from "lucide-react";

interface DeletedItem {
  id: string;
  entityType: string;
  entityId: string;
  entityName: string;
  originalData: string;
  deletedBy: string;
  deletedAt: string;
}

export default function TrashManagerPage() {
  const [items, setItems] = useState<DeletedItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [restoringId, setRestoringId] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  const fetchTrash = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/trash");
      const data = await res.json();
      if (data.success) {
        setItems(data.items || []);
      }
    } catch (err) {
      console.error("Failed to load trash:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTrash();
  }, []);

  const handleRestore = async (id: string, name: string) => {
    setRestoringId(id);
    setMessage(null);
    try {
      const res = await fetch("/api/trash", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Failed to restore");
      }

      setMessage(`Successfully restored "${name}" back to the live database!`);
      fetchTrash();
    } catch (err: any) {
      setMessage(`Error: ${err.message}`);
    } finally {
      setRestoringId(null);
    }
  };

  return (
    <div className="space-y-8 animate-fade-in max-w-5xl text-[var(--text)]">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[var(--maroon-light)]/20">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-[var(--maroon)] dark:text-[var(--gold)]">
            Data Safety & Governance
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[var(--maroon)] dark:text-white font-serif">
            Recycle Bin & 1-Click Restore (Undo)
          </h1>
          <p className="text-xs text-[var(--text)]/70 mt-1">
            Any deleted page, notice, course, or FAQ is automatically staged here. Restore them instantly with no data loss.
          </p>
        </div>
      </div>

      {message && (
        <div
          className={`p-4 rounded-2xl text-xs flex items-center gap-2 ${
            message.startsWith("Error")
              ? "bg-red-100 dark:bg-red-950/60 border border-red-500/40 text-red-800 dark:text-red-300"
              : "bg-emerald-100 dark:bg-emerald-950/60 border border-emerald-500/40 text-emerald-800 dark:text-emerald-300"
          }`}
        >
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          <span>{message}</span>
        </div>
      )}

      {loading ? (
        <div className="py-20 flex flex-col items-center justify-center space-y-3">
          <Loader2 className="w-8 h-8 text-[var(--gold)] animate-spin" />
          <p className="text-xs text-[var(--text)]/60">Loading trash repository...</p>
        </div>
      ) : items.length === 0 ? (
        <div className="p-16 text-center rounded-3xl bg-white dark:bg-[var(--card)] border border-[var(--maroon-light)]/20 space-y-3">
          <Trash2 className="w-12 h-12 text-[var(--maroon-light)]/40 mx-auto" />
          <p className="text-base font-bold text-[var(--text)]">The Recycle Bin is empty</p>
          <p className="text-xs text-[var(--text)]/60">No items have been recently deleted.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {items.map((item) => (
            <div
              key={item.id}
              className="p-5 rounded-3xl bg-white dark:bg-[var(--card)] border border-[var(--maroon-light)]/20 shadow-xs hover:border-[var(--maroon)] flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[var(--maroon-tint)] text-[var(--maroon)] dark:text-[var(--gold)] uppercase border border-[var(--maroon-light)]/30">
                    {item.entityType}
                  </span>
                  <span className="text-xs text-[var(--text)]/70 flex items-center gap-1">
                    <User className="w-3 h-3 text-[var(--gold)]" /> Deleted by: {item.deletedBy}
                  </span>
                  <span className="text-xs text-[var(--text)]/50">
                    • {new Date(item.deletedAt).toLocaleString("en-IN")}
                  </span>
                </div>
                <h3 className="font-bold text-base text-[var(--text)] font-serif">{item.entityName}</h3>
                <div className="text-[11px] font-mono text-[var(--text)]/60">
                  ID: {item.entityId}
                </div>
              </div>

              <button
                onClick={() => handleRestore(item.id, item.entityName)}
                disabled={restoringId === item.id}
                className="px-5 py-2.5 rounded-xl bg-[var(--maroon)] hover:bg-[var(--maroon-dark)] text-white font-bold text-xs uppercase tracking-wider flex items-center gap-2 transition cursor-pointer disabled:opacity-50 shrink-0 shadow-xs"
              >
                {restoringId === item.id ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin text-[var(--gold)]" /> Restoring...
                  </>
                ) : (
                  <>
                    <RotateCcw className="w-4 h-4 text-[var(--gold)]" /> Undo / Restore Item
                  </>
                )}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
