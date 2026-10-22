"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import {
  Users,
  Search,
  Filter,
  Download,
  Phone,
  Mail,
  Calendar,
  MessageSquare,
  CheckCircle2,
  AlertCircle,
  Clock,
  X,
  ExternalLink,
  Save,
  Trash2,
  Send,
  Loader2,
  Building2,
  TrendingUp,
  Briefcase,
  HelpCircle,
  GraduationCap,
} from "lucide-react";

import { defaultInstitutionConfig } from "@/config/institution";

interface Enquiry {
  id: string;
  applicationNumber: string;
  fullName: string;
  email: string;
  phone: string;
  courseInterested: string;
  campus?: string | null;
  natureOfEnquiry?: string;
  tenthPercentage: number | null;
  schoolName: string | null;
  parentName: string | null;
  parentPhone: string | null;
  address: string | null;
  city: string | null;
  message: string | null;
  status: "NEW" | "CONTACTED" | "APPLIED" | "ADMITTED" | "REJECTED";
  notes: string | null;
  followUpDate: string | null;
  createdAt: string;
}

const targetCampuses = [
  "ITPL Campus (Whitefield)",
  "HRBR Layout Campus (Kalyan Nagar)",
  "BTM Layout Campus (South)",
  "Byrathi Campus (Hennur)",
  "NICE Road Campus (West)",
];

function EnquiriesManagerContent() {
  const searchParams = useSearchParams();
  const initialId = searchParams.get("id");

  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [stats, setStats] = useState<any>({});
  const [campusBreakdown, setCampusBreakdown] = useState<Record<string, any>>({});
  const [userRole, setUserRole] = useState<string>("SUPER_ADMIN");
  const [assignedCampus, setAssignedCampus] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [campusFilter, setCampusFilter] = useState("ALL");
  const [natureFilter, setNatureFilter] = useState("ALL");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedEnquiry, setSelectedEnquiry] = useState<Enquiry | null>(null);
  const [savingNotes, setSavingNotes] = useState(false);
  const [notesInput, setNotesInput] = useState("");
  const [statusInput, setStatusInput] = useState("");
  const [followUpInput, setFollowUpInput] = useState("");
  const [saveSuccess, setSaveSuccess] = useState(false);

  const fetchEnquiries = async () => {
    try {
      setLoading(true);
      const url = new URL("/api/enquiries", window.location.origin);
      if (statusFilter !== "ALL") url.searchParams.set("status", statusFilter);
      if (campusFilter !== "ALL") url.searchParams.set("campus", campusFilter);
      if (natureFilter !== "ALL") url.searchParams.set("nature", natureFilter);
      if (searchTerm) url.searchParams.set("search", searchTerm);

      const res = await fetch(url.toString());
      const data = await res.json();
      if (data.success) {
        setEnquiries(data.enquiries);
        setStats(data.stats || {});
        setCampusBreakdown(data.campusBreakdown || {});
        setUserRole(data.userRole || "SUPER_ADMIN");
        setAssignedCampus(data.assignedCampus || null);

        if (initialId && !selectedEnquiry) {
          const matched = data.enquiries.find((e: Enquiry) => e.id === initialId);
          if (matched) {
            openDossier(matched);
          }
        }
      }
    } catch (err) {
      console.error("Failed to load enquiries:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEnquiries();
  }, [statusFilter, campusFilter, natureFilter, searchTerm]);

  const openDossier = (enq: Enquiry) => {
    setSelectedEnquiry(enq);
    setNotesInput(enq.notes || "");
    setStatusInput(enq.status);
    setFollowUpInput(
      enq.followUpDate ? new Date(enq.followUpDate).toISOString().split("T")[0] : ""
    );
    setSaveSuccess(false);
  };

  const handleUpdateDossier = async () => {
    if (!selectedEnquiry) return;
    setSavingNotes(true);
    setSaveSuccess(false);

    try {
      const res = await fetch(`/api/enquiries/${selectedEnquiry.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          status: statusInput,
          notes: notesInput,
          followUpDate: followUpInput || null,
        }),
      });

      const data = await res.json();
      if (data.success) {
        setSelectedEnquiry(data.enquiry);
        setSaveSuccess(true);
        setTimeout(() => setSaveSuccess(false), 3000);
        fetchEnquiries();
      }
    } catch (err) {
      console.error("Update failed:", err);
    } finally {
      setSavingNotes(false);
    }
  };

  const cleanPhoneForWhatsApp = (phoneStr: string) => {
    return phoneStr.replace(/[^0-9]/g, "");
  };

  const getNatureBadge = (nature?: string) => {
    switch (nature) {
      case "CAREERS":
        return <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-purple-100 text-purple-800">Careers</span>;
      case "VENDOR":
        return <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800">Vendor</span>;
      case "GENERAL":
        return <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 text-slate-800">General</span>;
      default:
        return <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-100 text-blue-800">Admissions</span>;
    }
  };

  return (
    <div className="space-y-8 animate-fade-in text-[var(--text)]">
      {/* Header & Export Action */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[var(--border)]">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[var(--secondary)]">
              Multi-Campus Admissions Pipeline
            </span>
            {userRole === "CAMPUS_ADMIN" && assignedCampus && (
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[var(--tint)] text-[var(--primary)] border border-[var(--border)]">
                Scoped to: {assignedCampus}
              </span>
            )}
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[var(--primary)] font-serif">
            Student Enquiries &amp; Admissions CRM
          </h1>
          <p className="text-xs text-[var(--muted)] mt-1">
            Track student leads, schedule follow-ups, reply via WhatsApp/Email, and monitor multi-campus conversion.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <a
            href="/api/enquiries/export"
            download
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[var(--primary)] hover:bg-[var(--primary-dark)] text-white font-bold text-xs uppercase tracking-wider transition shadow-sm cursor-pointer"
          >
            <Download className="w-4 h-4 text-[var(--accent)]" /> Export CSV / Excel
          </a>
        </div>
      </div>

      {/* Multi-Campus Performance Tiles */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs font-bold text-[var(--primary)]">
          <span className="flex items-center gap-1.5 uppercase tracking-wider">
            <Building2 className="w-3.5 h-3.5 text-[var(--secondary)]" /> Campus Lead Distribution
          </span>
          <span className="text-[var(--muted)]">Overall Conversion: {stats.conversionRate || "0%"}</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {targetCampuses.map((campName) => {
            const campData = campusBreakdown[campName] || { total: 0, admitted: 0, contacted: 0, new: 0 };
            const isSelected = campusFilter === campName;
            return (
              <button
                key={campName}
                onClick={() => setCampusFilter(isSelected ? "ALL" : campName)}
                className={`p-4 rounded-2xl border text-left transition ${
                  isSelected
                    ? "bg-[var(--tint)] border-[var(--primary)] shadow-sm ring-1 ring-[var(--primary)]"
                    : "bg-[var(--surface)] border-[var(--border)] hover:border-[var(--secondary)]"
                }`}
              >
                <div className="text-[11px] font-bold text-[var(--primary)] truncate font-serif">
                  {campName.split("(")[0]}
                </div>
                <div className="text-2xl font-extrabold text-[var(--primary)] mt-1">
                  {campData.total}
                  <span className="text-xs font-normal text-[var(--muted)] ml-1">leads</span>
                </div>
                <div className="flex items-center justify-between text-[10px] text-[var(--muted)] pt-2 border-t border-[var(--border)] mt-2">
                  <span>Contacted: {campData.contacted}</span>
                  <span className="text-emerald-600 font-bold">Admitted: {campData.admitted}</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Filter Tabs & Search Bar */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        {/* Status Pills */}
        <div className="flex flex-wrap items-center gap-2">
          {[
            { id: "ALL", label: "All Leads", count: stats.total || 0 },
            { id: "NEW", label: "New", count: stats.new || 0 },
            { id: "CONTACTED", label: "Contacted", count: stats.contacted || 0 },
            { id: "APPLIED", label: "Applied", count: stats.applied || 0 },
            { id: "ADMITTED", label: "Admitted", count: stats.admitted || 0 },
            { id: "REJECTED", label: "Rejected", count: stats.rejected || 0 },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setStatusFilter(tab.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
                statusFilter === tab.id
                  ? "bg-[var(--primary)] text-white shadow-md font-extrabold"
                  : "bg-[var(--surface)] border border-[var(--border)] text-[var(--muted)] hover:bg-[var(--tint)]"
              }`}
            >
              <span>{tab.label}</span>
              <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-white/20 text-current">
                {tab.count}
              </span>
            </button>
          ))}
        </div>

        {/* Nature & Search Filter */}
        <div className="flex flex-col sm:flex-row items-center gap-3 w-full lg:w-auto">
          {/* Nature of Enquiry Filter */}
          <select
            value={natureFilter}
            onChange={(e) => setNatureFilter(e.target.value)}
            className="w-full sm:w-auto px-3.5 py-2 rounded-xl bg-[var(--surface)] border border-[var(--border)] text-xs font-semibold text-[var(--text)] focus:outline-none focus:border-[var(--secondary)]"
          >
            <option value="ALL">All Categories</option>
            <option value="ADMISSIONS">Admissions</option>
            <option value="CAREERS">Careers</option>
            <option value="VENDOR">Vendor / Partner</option>
            <option value="GENERAL">General</option>
          </select>

          {/* Campus Filter (Disabled if CAMPUS_ADMIN) */}
          {userRole !== "CAMPUS_ADMIN" && (
            <select
              value={campusFilter}
              onChange={(e) => setCampusFilter(e.target.value)}
              className="w-full sm:w-auto px-3.5 py-2 rounded-xl bg-[var(--surface)] border border-[var(--border)] text-xs font-semibold text-[var(--text)] focus:outline-none focus:border-[var(--secondary)]"
            >
              <option value="ALL">All Campuses</option>
              {targetCampuses.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          )}

          {/* Search Bar */}
          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 text-[var(--muted)] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search name, phone, app no..."
              className="w-full pl-9 pr-4 py-2 rounded-xl bg-[var(--surface)] border border-[var(--border)] text-xs text-[var(--text)] placeholder-gray-400 focus:outline-none focus:border-[var(--secondary)]"
            />
          </div>
        </div>
      </div>

      {/* Main Table View */}
      <div className="p-6 rounded-3xl bg-[var(--surface)] border border-[var(--border)] shadow-xs overflow-hidden space-y-4">
        {loading ? (
          <div className="py-20 flex flex-col items-center justify-center space-y-3">
            <Loader2 className="w-8 h-8 text-[var(--secondary)] animate-spin" />
            <p className="text-xs text-[var(--muted)]">Loading student records...</p>
          </div>
        ) : enquiries.length === 0 ? (
          <div className="text-center py-20 space-y-2">
            <p className="text-base font-bold text-[var(--text)]">No enquiry records found</p>
            <p className="text-xs text-[var(--muted)]">No applicants match this filter or search query.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-[var(--border)] text-[var(--muted)] uppercase tracking-wider text-[10px]">
                  <th className="py-3 px-3">App No</th>
                  <th className="py-3 px-3">Category</th>
                  <th className="py-3 px-3">Applicant Name</th>
                  <th className="py-3 px-3">Stream / Course</th>
                  <th className="py-3 px-3">Campus</th>
                  <th className="py-3 px-3">10th %</th>
                  <th className="py-3 px-3">Phone</th>
                  <th className="py-3 px-3">Status</th>
                  <th className="py-3 px-3">Date</th>
                  <th className="py-3 px-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--border)]">
                {enquiries.map((enq) => (
                  <tr
                    key={enq.id}
                    className="hover:bg-[var(--tint)]/50 transition cursor-pointer"
                    onClick={() => openDossier(enq)}
                  >
                    <td className="py-3.5 px-3 font-mono font-bold text-[var(--primary)]">
                      {enq.applicationNumber}
                    </td>
                    <td className="py-3.5 px-3">{getNatureBadge(enq.natureOfEnquiry)}</td>
                    <td className="py-3.5 px-3 font-bold text-[var(--text)]">{enq.fullName}</td>
                    <td className="py-3.5 px-3 font-mono text-[var(--secondary)] font-semibold">
                      {enq.courseInterested}
                    </td>
                    <td className="py-3.5 px-3">
                      <span className="px-2 py-0.5 rounded-full text-[10px] bg-[var(--tint)] text-[var(--primary)] font-medium whitespace-nowrap">
                        {enq.campus?.split("(")[0] || "Main"}
                      </span>
                    </td>
                    <td className="py-3.5 px-3 text-[var(--muted)]">
                      {enq.tenthPercentage ? `${enq.tenthPercentage}%` : "—"}
                    </td>
                    <td className="py-3.5 px-3 text-[var(--muted)]">{enq.phone}</td>
                    <td className="py-3.5 px-3">
                      <span
                        className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                          enq.status === "NEW"
                            ? "bg-blue-100 text-blue-800"
                            : enq.status === "ADMITTED"
                            ? "bg-emerald-100 text-emerald-800"
                            : enq.status === "CONTACTED"
                            ? "bg-amber-100 text-amber-800"
                            : enq.status === "APPLIED"
                            ? "bg-purple-100 text-purple-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {enq.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-3 text-[var(--muted)] text-[11px]">
                      {new Date(enq.createdAt).toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "short",
                      })}
                    </td>
                    <td className="py-3.5 px-3 text-right">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          openDossier(enq);
                        }}
                        className="px-3 py-1 rounded-lg bg-[var(--tint)] hover:bg-[var(--primary)] hover:text-white text-[var(--primary)] text-xs font-semibold transition"
                      >
                        Dossier
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Student Dossier Drawer / Modal */}
      {selectedEnquiry && (
        <div
          className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex justify-end p-0 sm:p-4 overflow-y-auto animate-fade-in"
          onClick={() => setSelectedEnquiry(null)}
        >
          <div
            className="w-full max-w-2xl bg-[var(--surface)] border-l border-[var(--border)] p-6 sm:p-8 space-y-6 overflow-y-auto text-left shadow-2xl text-[var(--text)]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Dossier Header */}
            <div className="flex items-center justify-between pb-4 border-b border-[var(--border)]">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[var(--secondary)]">
                    Application Dossier: {selectedEnquiry.applicationNumber}
                  </span>
                  {getNatureBadge(selectedEnquiry.natureOfEnquiry)}
                </div>
                <h2 className="text-xl sm:text-2xl font-extrabold text-[var(--primary)] font-serif mt-1">
                  {selectedEnquiry.fullName}
                </h2>
                <div className="text-xs text-[var(--muted)] mt-0.5">
                  Target: {selectedEnquiry.campus || "Central Campus"}
                </div>
              </div>
              <button
                onClick={() => setSelectedEnquiry(null)}
                className="p-2 rounded-full text-[var(--muted)] hover:text-[var(--text)] hover:bg-[var(--tint)] cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {saveSuccess && (
              <div className="p-3.5 rounded-2xl bg-emerald-100 text-emerald-800 text-xs flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>Counselor dossier updated successfully!</span>
              </div>
            )}

            {/* Quick Contact Buttons (WhatsApp & Email with Campus Text) */}
            <div className="grid grid-cols-2 gap-3">
              <a
                href={`https://wa.me/${cleanPhoneForWhatsApp(selectedEnquiry.phone)}?text=Hello%20${encodeURIComponent(
                  selectedEnquiry.fullName
                )},%20greetings%20from%20${encodeURIComponent(
                  selectedEnquiry.campus || defaultInstitutionConfig.name
                )}.%20Regarding%20your%20enquiry%20(${
                  selectedEnquiry.applicationNumber
                })%20for%20${encodeURIComponent(selectedEnquiry.courseInterested)}:`}
                target="_blank"
                rel="noreferrer"
                className="p-3 rounded-2xl bg-emerald-50 hover:bg-emerald-100 border border-emerald-300 text-emerald-800 text-xs font-bold flex items-center justify-center gap-2 transition"
              >
                <MessageSquare className="w-4 h-4" /> Reply on WhatsApp
              </a>

              <a
                href={`mailto:${selectedEnquiry.email}?subject=${encodeURIComponent(
                  (selectedEnquiry.campus || defaultInstitutionConfig.name) + " - Reference " + selectedEnquiry.applicationNumber
                )}&body=Dear%20${encodeURIComponent(
                  selectedEnquiry.fullName
                )},%0D%0A%0D%0AGreetings%20from%20${encodeURIComponent(
                  selectedEnquiry.campus || defaultInstitutionConfig.name
                )}.%20We%20have%20reviewed%20your%20enquiry%20(${
                  selectedEnquiry.applicationNumber
                })%20regarding%20${encodeURIComponent(selectedEnquiry.courseInterested)}...`}
                className="p-3 rounded-2xl bg-[var(--tint)] hover:bg-[var(--tint)]/80 border border-[var(--border)] text-[var(--primary)] text-xs font-bold flex items-center justify-center gap-2 transition"
              >
                <Mail className="w-4 h-4" /> Send Email
              </a>
            </div>

            {/* Academic & Enquiry Information */}
            <div className="p-4 rounded-2xl bg-[var(--tint)] border border-[var(--border)] space-y-3">
              <h3 className="font-bold text-xs uppercase tracking-wider text-[var(--primary)]">
                Enquiry Details
              </h3>
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div>
                  <span className="text-[var(--muted)] block">Stream / Interest:</span>
                  <span className="font-bold font-mono text-[var(--primary)] text-sm">
                    {selectedEnquiry.courseInterested}
                  </span>
                </div>
                <div>
                  <span className="text-[var(--muted)] block">Class 10th Marks:</span>
                  <span className="font-bold text-[var(--primary)] text-sm">
                    {selectedEnquiry.tenthPercentage ? `${selectedEnquiry.tenthPercentage}%` : "Not provided"}
                  </span>
                </div>
                <div>
                  <span className="text-[var(--muted)] block">Previous School:</span>
                  <span className="font-medium text-[var(--text)]">
                    {selectedEnquiry.schoolName || "Not provided"}
                  </span>
                </div>
                <div>
                  <span className="text-[var(--muted)] block">Parent / Guardian:</span>
                  <span className="font-medium text-[var(--text)]">
                    {selectedEnquiry.parentName || "—"} ({selectedEnquiry.parentPhone || "—"})
                  </span>
                </div>
              </div>

              {selectedEnquiry.message && (
                <div className="pt-2 border-t border-[var(--border)]">
                  <span className="text-[var(--muted)] block text-xs">Applicant Message:</span>
                  <p className="text-xs text-[var(--text)] italic mt-1 bg-[var(--surface)] p-3 rounded-xl border border-[var(--border)]">
                    &ldquo;{selectedEnquiry.message}&rdquo;
                  </p>
                </div>
              )}
            </div>

            {/* Counselor Pipeline Actions */}
            <div className="p-4 rounded-2xl bg-[var(--surface)] border border-[var(--border)] space-y-4">
              <h3 className="font-bold text-xs uppercase tracking-wider text-[var(--primary)]">
                Counselor Workflow &amp; Notes
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[var(--muted)] mb-1">
                    Pipeline Stage:
                  </label>
                  <select
                    value={statusInput}
                    onChange={(e) => setStatusInput(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-[var(--surface)] border border-[var(--border)] text-xs font-semibold text-[var(--text)] focus:outline-none focus:border-[var(--secondary)]"
                  >
                    <option value="NEW">NEW</option>
                    <option value="CONTACTED">CONTACTED</option>
                    <option value="APPLIED">APPLIED</option>
                    <option value="ADMITTED">ADMITTED</option>
                    <option value="REJECTED">REJECTED</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[var(--muted)] mb-1">
                    Follow-Up Date:
                  </label>
                  <input
                    type="date"
                    value={followUpInput}
                    onChange={(e) => setFollowUpInput(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-[var(--surface)] border border-[var(--border)] text-xs text-[var(--text)] focus:outline-none focus:border-[var(--secondary)]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[var(--muted)] mb-1">
                  Counselor Notes:
                </label>
                <textarea
                  rows={3}
                  value={notesInput}
                  onChange={(e) => setNotesInput(e.target.value)}
                  placeholder="Record call summary, scholarship discussions, or follow-up notes..."
                  className="w-full px-3 py-2 rounded-xl bg-[var(--surface)] border border-[var(--border)] text-xs text-[var(--text)] focus:outline-none focus:border-[var(--secondary)]"
                />
              </div>

              <button
                type="button"
                onClick={handleUpdateDossier}
                disabled={savingNotes}
                className="w-full py-2.5 rounded-xl bg-[var(--primary)] hover:bg-[var(--primary-dark)] text-white text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition disabled:opacity-50"
              >
                {savingNotes ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" /> Saving...
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4" /> Save Dossier Changes
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function AdminEnquiriesPage() {
  return (
    <Suspense
      fallback={
        <div className="py-20 flex justify-center">
          <Loader2 className="w-8 h-8 text-[var(--secondary)] animate-spin" />
        </div>
      }
    >
      <EnquiriesManagerContent />
    </Suspense>
  );
}
