"use client";

import { useState } from "react";
import Link from "next/link";
import {
  GraduationCap,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Sparkles,
  Phone,
  Mail,
  User,
  School,
  MapPin,
  Send,
  ArrowRight,
} from "lucide-react";

import { defaultInstitutionConfig } from "@/config/institution";

export default function AdmissionApplyPage() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    courseInterested: "PCMB",
    campus: defaultInstitutionConfig.campuses[0]?.name || "Main Campus",
    tenthPercentage: "",
    schoolName: "",
    parentName: "",
    parentPhone: "",
    address: "",
    city: "Bengaluru",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submittedData, setSubmittedData] = useState<{
    applicationNumber: string;
    message: string;
  } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/enquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Failed to submit application");
      }

      setSubmittedData({
        applicationNumber: data.applicationNumber,
        message: data.message,
      });
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text)] py-12 transition-colors">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Header */}
        <div className="text-center space-y-3">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[var(--maroon-tint)] border border-[var(--maroon-light)]/30 text-[var(--maroon)] dark:text-[var(--gold)] text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-[var(--gold)]" /> Admissions 2025-2026
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#1E3A8A] dark:text-blue-300 font-serif">
            Online Admission Application & Enquiry
          </h1>
          <p className="text-sm text-[var(--text)]/80 max-w-xl mx-auto">
            Reserve your seat at RBANMS Pre-University College. Fill in your details below and our counseling department will review your application within 24 hours.
          </p>
        </div>

        {submittedData ? (
          /* Success Screen */
          <div className="bg-white dark:bg-[var(--card)] rounded-3xl p-8 sm:p-12 shadow-xl border border-emerald-500/30 text-center space-y-6 animate-fade-in">
            <div className="w-20 h-20 rounded-full bg-[var(--maroon-tint)] text-[var(--maroon)] dark:text-[var(--gold)] flex items-center justify-center mx-auto shadow-inner">
              <CheckCircle2 className="w-10 h-10 text-emerald-600 dark:text-emerald-400" />
            </div>

            <div className="space-y-2">
              <h2 className="text-2xl font-bold text-[#1E3A8A] dark:text-blue-300 font-serif">
                Application Received Successfully!
              </h2>
              <p className="text-sm text-[var(--text)]/80">
                Thank you for applying to RBANM&apos;s Pre-University College. Your provisional application number is:
              </p>
              <div className="inline-block px-5 py-2.5 rounded-xl bg-[var(--maroon-tint)] border border-[var(--maroon-light)]/40 text-[#800000] dark:text-[var(--gold)] font-mono text-xl font-bold my-2 shadow-xs">
                {submittedData.applicationNumber}
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-[var(--maroon-tint)]/50 max-w-md mx-auto text-xs text-[var(--text)]/80 space-y-2 text-left border border-[var(--maroon-light)]/20">
              <p className="font-semibold text-[var(--text)]">Next Steps:</p>
              <ul className="list-disc pl-4 space-y-1">
                <li>Keep this application number handy for future reference.</li>
                <li>Our admissions officer will contact you via phone or WhatsApp.</li>
                <li>You can visit the college desk with original Class 10 marks card for interview.</li>
              </ul>
            </div>

            <div className="pt-4 flex flex-wrap justify-center gap-4">
              <button
                onClick={() => {
                  setSubmittedData(null);
                  setFormData({
                    fullName: "",
                    email: "",
                    phone: "",
                    courseInterested: "PCMB",
                    campus: defaultInstitutionConfig.campuses[0]?.name || "Main Campus",
                    tenthPercentage: "",
                    schoolName: "",
                    parentName: "",
                    parentPhone: "",
                    address: "",
                    city: "Bengaluru",
                    message: "",
                  });
                }}
                className="px-5 py-2.5 rounded-xl border border-slate-300 text-xs font-bold hover:bg-[var(--maroon-tint)] text-[var(--text)] transition"
              >
                Submit Another Application
              </button>
              <Link
                href="/"
                className="px-5 py-2.5 rounded-xl bg-[#800000] text-white text-xs font-bold hover:bg-[#5A0F1B] transition shadow-xs"
              >
                Return to Homepage
              </Link>
            </div>
          </div>
        ) : (
          /* Application Form */
          <form
            onSubmit={handleSubmit}
            className="bg-white dark:bg-[var(--card)] rounded-3xl p-6 sm:p-10 shadow-sm border border-slate-200 dark:border-slate-800 space-y-8"
          >
            {error && (
              <div className="p-4 rounded-2xl bg-red-950/40 border border-red-800 text-red-200 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {/* Step 1: Student Information */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 pb-2 border-b border-slate-200 dark:border-slate-800">
                <User className="w-4 h-4 text-[#800000] dark:text-[var(--gold)]" />
                <h3 className="font-bold text-sm text-[#1E3A8A] dark:text-blue-300 uppercase tracking-wider">
                  1. Student Details
                </h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[var(--text)] mb-1">
                    Student Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    required
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    placeholder="As per SSLC / Class 10 Record"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[var(--maroon-light)]/30 bg-transparent text-sm focus:ring-2 focus:ring-[var(--maroon)] focus:outline-hidden"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[var(--text)] mb-1">
                    Student Email Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="student@example.com"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[var(--maroon-light)]/30 bg-transparent text-sm focus:ring-2 focus:ring-[var(--maroon)] focus:outline-hidden"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[var(--text)] mb-1">
                    Student Mobile / WhatsApp <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+91 98765 43210"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[var(--maroon-light)]/30 bg-transparent text-sm focus:ring-2 focus:ring-[var(--maroon)] focus:outline-hidden"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[var(--text)] mb-1">
                    City / Town <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="city"
                    required
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    placeholder="Bengaluru"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[var(--maroon-light)]/30 bg-transparent text-sm focus:ring-2 focus:ring-[var(--maroon)] focus:outline-hidden"
                  />
                </div>
              </div>
            </div>

            {/* Step 2: Course & Academic History */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 pb-2 border-b border-slate-200 dark:border-slate-800">
                <GraduationCap className="w-4 h-4 text-[#800000] dark:text-[var(--gold)]" />
                <h3 className="font-bold text-sm text-[#1E3A8A] dark:text-blue-300 uppercase tracking-wider">
                  2. Academic Stream Selection
                </h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[var(--text)] mb-1">
                    Desired Combination <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="courseInterested"
                    value={formData.courseInterested}
                    onChange={(e) => setFormData({ ...formData, courseInterested: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white dark:bg-[var(--card)] text-sm focus:ring-2 focus:ring-[#800000] focus:outline-hidden"
                  >
                    {defaultInstitutionConfig.courses.map((course) => (
                      <option key={course.code} value={course.code}>
                        {course.stream} — {course.code} ({course.subjects.join(", ")})
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[var(--text)] mb-1">
                    Preferred Campus <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="campus"
                    value={formData.campus}
                    onChange={(e) => setFormData({ ...formData, campus: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white dark:bg-[var(--card)] text-sm focus:ring-2 focus:ring-[#800000] focus:outline-hidden"
                  >
                    {defaultInstitutionConfig.campuses.map((c) => (
                      <option key={c.id} value={c.name}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[var(--text)] mb-1">
                    Class 10 / SSLC Aggregate % (or CGPA)
                  </label>
                  <input
                    type="number"
                    name="tenthPercentage"
                    step="0.1"
                    min="35"
                    max="100"
                    value={formData.tenthPercentage}
                    onChange={(e) => setFormData({ ...formData, tenthPercentage: e.target.value })}
                    placeholder="e.g. 85.5"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-transparent text-sm focus:ring-2 focus:ring-[#800000] focus:outline-hidden"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-[var(--text)] mb-1">
                    School Last Attended
                  </label>
                  <input
                    type="text"
                    name="schoolName"
                    value={formData.schoolName}
                    onChange={(e) => setFormData({ ...formData, schoolName: e.target.value })}
                    placeholder="e.g. St. Germain High School, Kendriya Vidyalaya, etc."
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-transparent text-sm focus:ring-2 focus:ring-[#800000] focus:outline-hidden"
                  />
                </div>
              </div>
            </div>

            {/* Step 3: Parent / Guardian Details */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 pb-2 border-b border-slate-200 dark:border-slate-800">
                <School className="w-4 h-4 text-[#800000] dark:text-[var(--gold)]" />
                <h3 className="font-bold text-sm text-[#1E3A8A] dark:text-blue-300 uppercase tracking-wider">
                  3. Parent / Guardian Details
                </h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[var(--text)] mb-1">
                    Parent / Guardian Name
                  </label>
                  <input
                    type="text"
                    name="parentName"
                    value={formData.parentName}
                    onChange={(e) => setFormData({ ...formData, parentName: e.target.value })}
                    placeholder="Parent or Guardian Name"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[var(--maroon-light)]/30 bg-transparent text-sm focus:ring-2 focus:ring-[var(--maroon)] focus:outline-hidden"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[var(--text)] mb-1">
                    Parent Phone Number
                  </label>
                  <input
                    type="tel"
                    name="parentPhone"
                    value={formData.parentPhone}
                    onChange={(e) => setFormData({ ...formData, parentPhone: e.target.value })}
                    placeholder="+91 98765 43210"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[var(--maroon-light)]/30 bg-transparent text-sm focus:ring-2 focus:ring-[var(--maroon)] focus:outline-hidden"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-[var(--text)] mb-1">
                    Residential Address
                  </label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    placeholder="Street, Area, Pin Code"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[var(--maroon-light)]/30 bg-transparent text-sm focus:ring-2 focus:ring-[var(--maroon)] focus:outline-hidden"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-[var(--text)] mb-1">
                    Special Queries or Message for Counselor
                  </label>
                  <textarea
                    rows={3}
                    name="message"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Ask about scholarships, laboratory facilities, installment payments, or timings..."
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[var(--maroon-light)]/30 bg-transparent text-sm focus:ring-2 focus:ring-[var(--maroon)] focus:outline-hidden"
                  />
                </div>
              </div>
            </div>

            {/* Submission Button */}
            <div className="pt-4">
              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 rounded-2xl bg-[var(--maroon)] hover:bg-[var(--maroon-dark)] text-white font-extrabold text-sm uppercase tracking-wider shadow-lg hover:shadow-xl transition flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" /> Submitting Application...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4 text-[var(--gold)]" /> Submit Application Enquiry
                  </>
                )}
              </button>
              <p className="text-[11px] text-[var(--text)]/60 text-center mt-2">
                🔒 Your personal information is securely handled in accordance with RBANMS Educational Charities privacy guidelines.
              </p>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
