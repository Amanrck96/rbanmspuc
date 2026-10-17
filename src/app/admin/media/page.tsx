"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import {
  FolderOpen,
  Upload,
  Copy,
  Trash2,
  RefreshCw,
  FileText,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Search,
  ExternalLink,
} from "lucide-react";

interface MediaItem {
  id: string;
  originalName: string;
  fileName: string;
  fileUrl: string;
  mimeType: string;
  size: number;
  uploadedBy: string | null;
  createdAt: string;
}

export default function MediaLibraryPage() {
  const [files, setFiles] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [replacingFile, setReplacingFile] = useState<MediaItem | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const replaceInputRef = useRef<HTMLInputElement>(null);

  const fetchFiles = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/media");
      const data = await res.json();
      if (data.success) {
        setFiles(data.files || []);
      }
    } catch (err) {
      console.error("Failed to load media:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFiles();
  }, []);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, replaceName?: string) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setMessage(null);

    const formData = new FormData();
    formData.append("file", file);
    if (replaceName) {
      formData.append("replaceFileName", replaceName);
    }

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Upload failed");
      }

      setMessage(
        replaceName
          ? `File "${replaceName}" replaced successfully and public website revalidated!`
          : `Uploaded "${data.originalName}" successfully!`
      );
      fetchFiles();
    } catch (err: any) {
      setMessage(`Error: ${err.message}`);
    } finally {
      setUploading(false);
      setReplacingFile(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
      if (replaceInputRef.current) replaceInputRef.current.value = "";
    }
  };

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Delete media file "${name}"?`)) return;

    try {
      const res = await fetch("/api/media", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      if (res.ok) {
        fetchFiles();
      }
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  const copyToClipboard = (url: string, id: string) => {
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const formatSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  const filtered = files.filter(
    (f) =>
      f.originalName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      f.fileName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
            Shared Media & Document Storage
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white font-serif">
            Media Library (/uploads)
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Files uploaded here are saved directly to public/uploads and served immediately across the website with zero stale cache.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <input
            type="file"
            ref={fileInputRef}
            onChange={(e) => handleFileUpload(e)}
            className="hidden"
          />
          <button
            onClick={() => fileInputRef.current?.click()}
            disabled={uploading}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs uppercase tracking-wider transition shadow-sm cursor-pointer disabled:opacity-50"
          >
            {uploading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" /> Uploading...
              </>
            ) : (
              <>
                <Upload className="w-4 h-4" /> Upload New File
              </>
            )}
          </button>
        </div>
      </div>

      {message && (
        <div
          className={`p-3.5 rounded-2xl text-xs flex items-center gap-2 ${
            message.startsWith("Error")
              ? "bg-red-950/60 border border-red-800/80 text-red-300"
              : "bg-emerald-950/60 border border-emerald-800/80 text-emerald-300"
          }`}
        >
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          <span>{message}</span>
        </div>
      )}

      {/* Hidden input for replace */}
      <input
        type="file"
        ref={replaceInputRef}
        onChange={(e) => replacingFile && handleFileUpload(e, replacingFile.fileName)}
        className="hidden"
      />

      {/* Search Bar */}
      <div className="flex items-center justify-between gap-4">
        <div className="relative w-full max-w-sm">
          <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search files by name..."
            className="w-full pl-9 pr-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-hidden focus:ring-2 focus:ring-amber-500"
          />
        </div>
        <div className="text-xs text-slate-400 font-mono">
          {filtered.length} {filtered.length === 1 ? "file" : "files"} available
        </div>
      </div>

      {/* Media Grid */}
      {loading ? (
        <div className="py-20 flex flex-col items-center justify-center space-y-3">
          <Loader2 className="w-8 h-8 text-amber-500 animate-spin" />
          <p className="text-xs text-slate-400">Loading media library...</p>
        </div>
      ) : filtered.length === 0 ? (
        <div className="p-12 text-center rounded-3xl bg-slate-900 border border-slate-800 space-y-3">
          <FolderOpen className="w-12 h-12 text-slate-600 mx-auto" />
          <p className="text-sm font-bold text-white">No files in media library</p>
          <p className="text-xs text-slate-400">Click &ldquo;Upload New File&rdquo; to add images or documents.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filtered.map((item) => {
            const isImage =
              item.mimeType.startsWith("image/") ||
              item.fileName.endsWith(".svg") ||
              item.fileName.endsWith(".jpg") ||
              item.fileName.endsWith(".png");

            return (
              <div
                key={item.id}
                className="bg-slate-900 rounded-3xl overflow-hidden border border-slate-800 shadow-sm hover:border-slate-700 transition flex flex-col justify-between group"
              >
                {/* Preview Thumbnail */}
                <div className="relative w-full h-44 bg-slate-950 flex items-center justify-center p-2 border-b border-slate-800/80">
                  {isImage ? (
                    <Image
                      src={item.fileUrl}
                      alt={item.originalName}
                      fill
                      className="object-contain p-2"
                    />
                  ) : (
                    <div className="flex flex-col items-center text-slate-500 gap-1">
                      <FileText className="w-12 h-12 text-blue-400" />
                      <span className="text-[10px] font-mono uppercase">{item.fileName.split(".").pop()}</span>
                    </div>
                  )}
                </div>

                {/* Details */}
                <div className="p-4 space-y-2 text-xs">
                  <div className="font-bold text-slate-200 truncate" title={item.originalName}>
                    {item.originalName}
                  </div>
                  <div className="flex justify-between text-[11px] text-slate-500 font-mono">
                    <span>{formatSize(item.size)}</span>
                    <span>{new Date(item.createdAt).toLocaleDateString("en-IN", { month: "short", day: "numeric" })}</span>
                  </div>

                  {/* Actions */}
                  <div className="pt-2 flex items-center justify-between border-t border-slate-800">
                    <button
                      onClick={() => copyToClipboard(item.fileUrl, item.id)}
                      className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-[11px] font-semibold flex items-center gap-1 transition"
                      title="Copy URL for public website"
                    >
                      <Copy className="w-3 h-3" />
                      <span>{copiedId === item.id ? "Copied!" : "Copy URL"}</span>
                    </button>

                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => {
                          setReplacingFile(item);
                          replaceInputRef.current?.click();
                        }}
                        className="p-1.5 rounded-lg bg-blue-950/60 text-blue-400 hover:bg-blue-900 transition"
                        title="Replace this image with updated file"
                      >
                        <RefreshCw className="w-3.5 h-3.5" />
                      </button>

                      <button
                        onClick={() => handleDelete(item.id, item.originalName)}
                        className="p-1.5 rounded-lg bg-red-950/60 text-red-400 hover:bg-red-900 transition"
                        title="Delete file"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
