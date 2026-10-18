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
} from "lucide-react";

interface Enquiry {
  id: string;
  applicationNumber: string;
  fullName: string;
  email: string;
  phone: string;
  courseInterested: string;
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

function EnquiriesManagerContent() {
  const searchParams = useSearchParams();
  const initialId = searchParams.get("id");

  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [stats, setStats] = useState<any>({});
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState("ALL");
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
      if (searchTerm) url.searchParams.set("search", searchTerm);

      const res = await fetch(url.toString());
      const data = await res.json();
      if (data.success) {
        setEnquiries(data.enquiries);
        setStats(data.stats || {});

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
  }, [statusFilter, searchTerm]);

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
        // Refresh table list
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

  return (
    <div className="space-y-8 animate-fade-in text-[var(--text)]">
      {/* Header & Export Action */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[var(--maroon-light)]/20">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-[var(--maroon)] dark:text-[var(--gold)]">
            Admissions Pipeline
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[var(--maroon)] dark:text-white font-serif">
            Student Enquiries & Applications CRM
          </h1>
          <p className="text-xs text-[var(--text)]/70 mt-1">
            Track student leads, schedule follow-ups, reply via WhatsApp/Email, and export data.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <a
            href="/api/enquiries/export"
            download
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[var(--maroon)] hover:bg-[var(--maroon-dark)] text-white font-bold text-xs uppercase tracking-wider transition shadow-sm cursor-pointer"
          >
            <Download className="w-4 h-4 text-[var(--gold)]" /> Export CSV / Excel
          </a>
        </div>
      </div>

      {/* Filter Tabs & Search Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
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
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
                statusFilter === tab.id
                  ? "bg-[var(--maroon)] text-white shadow-md font-extrabold"
                  : "bg-white dark:bg-[var(--card)] border border-[var(--maroon-light)]/20 text-[var(--text)]/80 hover:bg-[var(--maroon-tint)]"
              }`}
            >
              <span>{tab.label}</span>
              <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-[var(--maroon-tint)] text-[var(--maroon)] dark:text-[var(--gold)]">
                {tab.count}
              </span>
            </button>
          ))}
        </div>

        {/* Search Bar */}
        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 text-[var(--maroon-light)] absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search name, phone, app no..."
            className="w-full pl-9 pr-4 py-2 rounded-xl bg-white dark:bg-[var(--card)] border border-[var(--maroon-light)]/20 text-xs text-[var(--text)] placeholder-gray-400 focus:outline-hidden focus:ring-2 focus:ring-[var(--maroon)]"
          />
        </div>
      </div>

      {/* Main Table View */}
      <div className="p-6 rounded-3xl bg-white dark:bg-[var(--card)] border border-[var(--maroon-light)]/20 shadow-xs overflow-hidden space-y-4">
        {loading ? (
          <div className="py-20 flex flex-col items-center justify-center space-y-3">
            <Loader2 className="w-8 h-8 text-[var(--gold)] animate-spin" />
            <p className="text-xs text-[var(--text)]/60">Loading student records...</p>
          </div>
        ) : enquiries.length === 0 ? (
          <div className="text-center py-20 space-y-2">
            <p className="text-base font-bold text-[var(--text)]">No enquiry records found</p>
            <p className="text-xs text-[var(--text)]/60">No applicants match this filter or search query.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-[var(--maroon-light)]/20 text-[var(--text)]/60 uppercase tracking-wider text-[10px]">
                  <th className="py-3 px-3">Application No</th>
                  <th className="py-3 px-3">Applicant Name</th>
                  <th className="py-3 px-3">Stream / Course</th>
                  <th className="py-3 px-3">10th Marks</th>
                  <th className="py-3 px-3">Phone</th>
                  <th className="py-3 px-3">City</th>
                  <th className="py-3 px-3">Status</th>
                  <th className="py-3 px-3">Submitted</th>
                  <th className="py-3 px-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--maroon-light)]/10">
                {enquiries.map((enq) => (
                  <tr
                    key={enq.id}
                    className="hover:bg-[var(--maroon-tint)]/40 transition cursor-pointer"
                    onClick={() => openDossier(enq)}
                  >
                    <td className="py-3.5 px-3 font-mono font-bold text-[var(--maroon)] dark:text-[var(--gold)]">
                      {enq.applicationNumber}
                    </td>
                    <td className="py-3.5 px-3 font-bold text-[var(--text)]">{enq.fullName}</td>
                    <td className="py-3.5 px-3 font-mono text-[var(--maroon)] dark:text-[var(--gold)] font-semibold">
                      {enq.courseInterested}
                    </td>
                    <td className="py-3.5 px-3 text-[var(--text)]/80">
                      {enq.tenthPercentage ? `${enq.tenthPercentage}%` : "—"}
                    </td>
                    <td className="py-3.5 px-3 text-[var(--text)]/80">{enq.phone}</td>
                    <td className="py-3.5 px-3 text-[var(--text)]/60">{enq.city || "Bengaluru"}</td>
                    <td className="py-3.5 px-3">
                      <span
                        className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                          enq.status === "NEW"
                            ? "bg-[var(--maroon-tint)] text-[var(--maroon)] dark:text-[var(--gold)] border border-[var(--maroon-light)]/30"
                            : enq.status === "ADMITTED"
                            ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300"
                            : enq.status === "CONTACTED"
                            ? "bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300"
                            : enq.status === "APPLIED"
                            ? "bg-purple-100 text-purple-800 dark:bg-purple-950/60 dark:text-purple-300"
                            : "bg-red-100 text-red-800 dark:bg-red-950/60 dark:text-red-300"
                        }`}
                      >
                        {enq.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-3 text-[var(--text)]/50 text-[11px]">
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
                        className="px-3 py-1 rounded-lg bg-[var(--maroon-tint)] hover:bg-[var(--maroon)] hover:text-white text-[var(--maroon)] dark:text-[var(--gold)] text-xs font-semibold transition"
                      >
                        Open Dossier
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
            className="w-full max-w-2xl bg-white dark:bg-[var(--card)] border-l border-[var(--maroon-light)]/30 p-6 sm:p-8 space-y-6 overflow-y-auto text-left shadow-2xl text-[var(--text)]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Dossier Header */}
            <div className="flex items-center justify-between pb-4 border-b border-[var(--maroon-light)]/20">
              <div>
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[var(--maroon)] dark:text-[var(--gold)]">
                  Application Dossier: {selectedEnquiry.applicationNumber}
                </span>
                <h2 className="text-xl sm:text-2xl font-extrabold text-[var(--text)] font-serif">
                  {selectedEnquiry.fullName}
                </h2>
              </div>
              <button
                onClick={() => setSelectedEnquiry(null)}
                className="p-2 rounded-full text-[var(--text)]/60 hover:text-[var(--text)] hover:bg-[var(--maroon-tint)] cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {saveSuccess && (
              <div className="p-3.5 rounded-2xl bg-emerald-100 dark:bg-emerald-950/60 border border-emerald-500/40 text-emerald-800 dark:text-emerald-300 text-xs flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>Counselor dossier updated successfully!</span>
              </div>
            )}

            {/* Quick Contact Buttons (WhatsApp & Email) */}
            <div className="grid grid-cols-2 gap-3">
              <a
                href={`https://wa.me/${cleanPhoneForWhatsApp(selectedEnquiry.phone)}?text=Hello%20${encodeURIComponent(
                  selectedEnquiry.fullName
                )},%20greetings%20from%20RBANMS%20Pre-University%20College.%20Regarding%20your%20admission%20application%20(${
                  selectedEnquiry.applicationNumber
                })%20for%20${selectedEnquiry.courseInterested}:`}
                target="_blank"
                rel="noreferrer"
                className="p-3 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 hover:bg-emerald-100 border border-emerald-500/30 text-emerald-700 dark:text-emerald-300 text-xs font-bold flex items-center justify-center gap-2 transition"
              >
                <MessageSquare className="w-4 h-4" /> Reply on WhatsApp
              </a>

              <a
                href={`mailto:${selectedEnquiry.email}?subject=RBANMS%20PU%20College%20Admissions%20-%20Application%20${
                  selectedEnquiry.applicationNumber
                }&body=Dear%20${encodeURIComponent(
                  selectedEnquiry.fullName
                )},%0D%0A%0D%0AGreetings%20from%20RBANM's%20Pre-University%20College.%20We%20have%20reviewed%20your%20application%20for%20the%20${
                  selectedEnquiry.courseInterested
                }%20stream...`}
                className="p-3 rounded-2xl bg-[var(--maroon-tint)] hover:bg-[var(--maroon-light)]/20 border border-[var(--maroon-light)]/30 text-[var(--maroon)] dark:text-[var(--gold)] text-xs font-bold flex items-center justify-center gap-2 transition"
              >
                <Mail className="w-4 h-4" /> Send Email
              </a>
            </div>

            {/* Academic Information */}
            <div className="p-4 rounded-2xl bg-[var(--maroon-tint)]/40 border border-[var(--maroon-light)]/20 space-y-3">
              <h3 className="font-bold text-xs uppercase tracking-wider text-[var(--maroon)] dark:text-[var(--gold)]">
                Academic Profile
              </h3>
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div>
                  <span className="text-[var(--text)]/60 block">Course Choice:</span>
                  <span className="font-bold font-mono text-[var(--maroon)] dark:text-[var(--gold)] text-sm">
                    {selectedEnquiry.courseInterested}
                  </span>
                </div>
                <div>
                  <span className="text-[var(--text)]/60 block">10th / SSLC Marks:</span>
                  <span className="font-bold text-[var(--text)] text-sm">
                    {selectedEnquiry.tenthPercentage ? `${selectedEnquiry.tenthPercentage}%` : "Not provided"}
                  </span>
                </div>
                <div className="col-span-2">
                  <span className="text-[var(--text)]/60 block">School Last Attended:</span>
                  <span className="font-semibold text-[var(--text)]">
                    {selectedEnquiry.schoolName || "Not specified"}
                  </span>
                </div>
              </div>
            </div>

            {/* Contact & Parent Details */}
            <div className="p-4 rounded-2xl bg-[var(--maroon-tint)]/40 border border-[var(--maroon-light)]/20 space-y-3">
              <h3 className="font-bold text-xs uppercase tracking-wider text-[var(--maroon)] dark:text-[var(--gold)]">
                Contact & Guardian Information
              </h3>
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div>
                  <span className="text-[var(--text)]/60 block">Student Phone:</span>
                  <a href={`tel:${selectedEnquiry.phone}`} className="font-semibold text-[var(--text)] hover:underline link-maroon">
                    {selectedEnquiry.phone}
                  </a>
                </div>
                <div>
                  <span className="text-[var(--text)]/60 block">Student Email:</span>
                  <a href={`mailto:${selectedEnquiry.email}`} className="font-semibold text-[var(--text)] hover:underline link-maroon truncate block">
                    {selectedEnquiry.email}
                  </a>
                </div>
                <div>
                  <span className="text-[var(--text)]/60 block">Parent / Guardian:</span>
                  <span className="font-semibold text-[var(--text)]">
                    {selectedEnquiry.parentName || "Not provided"}
                  </span>
                </div>
                <div>
                  <span className="text-[var(--text)]/60 block">Parent Phone:</span>
                  <span className="font-semibold text-[var(--text)]">
                    {selectedEnquiry.parentPhone || "Not provided"}
                  </span>
                </div>
                <div className="col-span-2">
                  <span className="text-[var(--text)]/60 block">Address & City:</span>
                  <span className="font-semibold text-[var(--text)]">
                    {selectedEnquiry.address ? `${selectedEnquiry.address}, ` : ""}
                    {selectedEnquiry.city || "Bengaluru"}
                  </span>
                </div>
                {selectedEnquiry.message && (
                  <div className="col-span-2 pt-2 border-t border-[var(--maroon-light)]/15">
                    <span className="text-[var(--text)]/60 block">Applicant&apos;s Message:</span>
                    <p className="text-[var(--text)]/90 italic mt-0.5">&ldquo;{selectedEnquiry.message}&rdquo;</p>
                  </div>
                )}
              </div>
            </div>

            {/* CRM Status & Counselor Controls */}
            <div className="p-4 rounded-2xl bg-[var(--maroon-tint)]/50 border border-[var(--maroon-light)]/30 space-y-4">
              <h3 className="font-bold text-xs uppercase tracking-wider text-[var(--maroon)] dark:text-[var(--gold)]">
                Counselor Workflow & Status
              </h3>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div>
                  <label className="block text-[var(--text)]/80 font-semibold mb-1">
                    Application Status
                  </label>
                  <select
                    value={statusInput}
                    onChange={(e) => setStatusInput(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-white dark:bg-[var(--card)] border border-[var(--maroon-light)]/30 text-[var(--text)] text-xs font-bold focus:outline-hidden focus:ring-2 focus:ring-[var(--maroon)]"
                  >
                    <option value="NEW">NEW - Pending Review</option>
                    <option value="CONTACTED">CONTACTED - Call Made</option>
                    <option value="APPLIED">APPLIED - Documents Submitted</option>
                    <option value="ADMITTED">ADMITTED - Fees Paid</option>
                    <option value="REJECTED">REJECTED - Not Eligible</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[var(--text)]/80 font-semibold mb-1">
                    Next Follow-up Date
                  </label>
                  <input
                    type="date"
                    value={followUpInput}
                    onChange={(e) => setFollowUpInput(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-white dark:bg-[var(--card)] border border-[var(--maroon-light)]/30 text-[var(--text)] text-xs focus:outline-hidden focus:ring-2 focus:ring-[var(--maroon)]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[var(--text)]/80 font-semibold mb-1 text-xs">
                  Counselor Internal Notes & Call Log
                </label>
                <textarea
                  rows={4}
                  value={notesInput}
                  onChange={(e) => setNotesInput(e.target.value)}
                  placeholder="Record conversation summary, document verification notes, fee concession approval..."
                  className="w-full px-3 py-2 rounded-xl bg-white dark:bg-[var(--card)] border border-[var(--maroon-light)]/30 text-[var(--text)] text-xs focus:outline-hidden focus:ring-2 focus:ring-[var(--maroon)]"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={handleUpdateDossier}
                  disabled={savingNotes}
                  className="px-5 py-2.5 rounded-xl bg-[var(--maroon)] hover:bg-[var(--maroon-dark)] text-white font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 transition cursor-pointer disabled:opacity-50 shadow-xs"
                >
                  {savingNotes ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin" /> Saving Changes...
                    </>
                  ) : (
                    <>
                      <Save className="w-3.5 h-3.5 text-[var(--gold)]" /> Save Counselor Notes & Status
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function EnquiriesManagerPage() {
  return (
    <Suspense
      fallback={
        <div className="py-20 flex justify-center items-center">
          <Loader2 className="w-8 h-8 text-[var(--gold)] animate-spin" />
        </div>
      }
    >
      <EnquiriesManagerContent />
    </Suspense>
  );
}
