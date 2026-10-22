"use client";

import { useState } from "react";
import Link from "next/link";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Building2,
  Briefcase,
  HelpCircle,
  GraduationCap,
} from "lucide-react";

const campuses = [
  {
    name: "Central Administrative Office",
    address: "Off Outer Ring Road, Kalyan Nagar, Bengaluru 560043",
    phone: "080-47095100",
    email: "info@concept-puc.edu.in",
  },
  {
    name: "ITPL Campus (Whitefield)",
    address: "ITPL Main Road, Near Hope Farm Junction, Whitefield, Bengaluru 560066",
    phone: "080-47095123",
    email: "admissions.itpl@concept-puc.edu.in",
  },
  {
    name: "HRBR Layout Campus (Kalyan Nagar)",
    address: "No. 2079, 2nd Main Road, HRBR Layout 3rd Block, Bengaluru 560084",
    phone: "080-47095124",
    email: "admissions.hrbr@concept-puc.edu.in",
  },
  {
    name: "BTM Layout Campus (South)",
    address: "Outer Ring Road, 2nd Stage, BTM Layout, Bengaluru 560076",
    phone: "080-47095125",
    email: "admissions.btm@concept-puc.edu.in",
  },
  {
    name: "Byrathi Campus (Hennur)",
    address: "Byrathi Village, Off Hennur Bagalur Main Road, Bengaluru 560077",
    phone: "080-47095126",
    email: "admissions.byrathi@concept-puc.edu.in",
  },
  {
    name: "NICE Road Campus (West)",
    address: "Near NICE Road Junction, Outer Ring Road, Bengaluru 560085",
    phone: "080-47095127",
    email: "admissions.niceroad@concept-puc.edu.in",
  },
];

export default function ContactPage() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    natureOfEnquiry: "ADMISSIONS",
    campus: "ITPL Campus (Whitefield)",
    courseInterested: "Science / Commerce",
    tenthPercentage: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submittedRef, setSubmittedRef] = useState<string | null>(null);

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
        throw new Error(data.error || "Failed to submit enquiry");
      }

      setSubmittedRef(data.applicationNumber || "ENQ-RECVD");
    } catch (err: any) {
      setError(err.message || "Failed to submit enquiry. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs text-[var(--muted)]">
        <Link href="/" className="hover:text-[var(--primary)] transition">
          Home
        </Link>
        <span>/</span>
        <span className="text-[var(--primary)] font-bold">Contact Us</span>
      </div>

      {/* Hero Header */}
      <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-[var(--primary)] via-[var(--primary-dark)] to-[var(--primary)] text-white shadow-xl space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-[var(--accent)] text-xs font-bold uppercase tracking-wider">
          <Building2 className="w-4 h-4" /> Get in Touch
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold font-serif">Contact Our Campuses</h1>
        <p className="text-sm sm:text-base text-white/80 max-w-2xl leading-relaxed">
          Have questions regarding admissions, academic combinations, faculty openings, or vendor partnerships? Reach out to our specialized desks or leave a message below.
        </p>
      </div>

      {/* 3 Department Direct Desks */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 rounded-2xl bg-[var(--surface)] border border-[var(--border)] shadow-sm space-y-3">
          <div className="p-3 w-fit rounded-xl bg-[var(--tint)] text-[var(--secondary)]">
            <GraduationCap className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-base text-[var(--primary)] font-serif">Admissions Desk</h3>
          <p className="text-xs text-[var(--muted)]">
            For course eligibility, fees, merit scholarships, and campus tour bookings.
          </p>
          <div className="text-xs font-semibold text-[var(--primary)] space-y-1 pt-1">
            <div>admissions@concept-puc.edu.in</div>
            <div>080-47095123</div>
          </div>
        </div>

        <div className="p-6 rounded-2xl bg-[var(--surface)] border border-[var(--border)] shadow-sm space-y-3">
          <div className="p-3 w-fit rounded-xl bg-[var(--tint)] text-[var(--secondary)]">
            <Briefcase className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-base text-[var(--primary)] font-serif">HR &amp; Careers</h3>
          <p className="text-xs text-[var(--muted)]">
            For teaching faculty positions, lab instructor roles, and staff recruitment.
          </p>
          <div className="text-xs font-semibold text-[var(--primary)] space-y-1 pt-1">
            <div>careers@concept-puc.edu.in</div>
            <div>080-47095140</div>
          </div>
        </div>

        <div className="p-6 rounded-2xl bg-[var(--surface)] border border-[var(--border)] shadow-sm space-y-3">
          <div className="p-3 w-fit rounded-xl bg-[var(--tint)] text-[var(--secondary)]">
            <Clock className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-base text-[var(--primary)] font-serif">General Enquiries</h3>
          <p className="text-xs text-[var(--muted)]">
            Vendor proposals, administrative verifications, and student records.
          </p>
          <div className="text-xs font-semibold text-[var(--primary)] space-y-1 pt-1">
            <div>info@concept-puc.edu.in</div>
            <div>Hours: Mon–Sat 8:30 AM – 4:30 PM</div>
          </div>
        </div>
      </div>

      {/* Main Form & Campus Details */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Enquiry Form */}
        <div className="lg:col-span-7 bg-[var(--surface)] rounded-3xl p-6 sm:p-10 border border-[var(--border)] shadow-sm space-y-6">
          <div className="space-y-1 border-b border-[var(--border)] pb-4">
            <h2 className="text-2xl font-bold text-[var(--primary)] font-serif">
              Submit an Enquiry
            </h2>
            <p className="text-xs text-[var(--muted)]">
              Select the nature of enquiry to route your message to the appropriate department.
            </p>
          </div>

          {submittedRef ? (
            <div className="p-8 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 space-y-4 text-center">
              <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
              <div className="space-y-1">
                <h3 className="text-lg font-bold">Enquiry Received Successfully!</h3>
                <p className="text-xs text-emerald-800">
                  Your reference ID is <strong className="font-mono text-sm">{submittedRef}</strong>. Our institutional team will get back to you within 1 business day.
                </p>
              </div>
              <button
                type="button"
                onClick={() => {
                  setSubmittedRef(null);
                  setFormData({
                    fullName: "",
                    email: "",
                    phone: "",
                    natureOfEnquiry: "ADMISSIONS",
                    campus: "ITPL Campus (Whitefield)",
                    courseInterested: "Science / Commerce",
                    tenthPercentage: "",
                    message: "",
                  });
                }}
                className="px-6 py-2.5 rounded-xl bg-emerald-700 text-white text-xs font-bold hover:bg-emerald-800 transition"
              >
                Submit Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                  <span>{error}</span>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[var(--primary)] mb-1">
                    Nature of Enquiry *
                  </label>
                  <select
                    value={formData.natureOfEnquiry}
                    onChange={(e) => setFormData({ ...formData, natureOfEnquiry: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[var(--border)] bg-[var(--surface)] text-xs text-[var(--text)] focus:outline-none focus:border-[var(--secondary)]"
                    required
                  >
                    <option value="ADMISSIONS">Admissions Enquiry</option>
                    <option value="CAREERS">Career Opportunities / Faculty Positions</option>
                    <option value="VENDOR">Vendor / Partnerships / Collaborations</option>
                    <option value="GENERAL">General Administrative Enquiry</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[var(--primary)] mb-1">
                    Target Campus *
                  </label>
                  <select
                    value={formData.campus}
                    onChange={(e) => setFormData({ ...formData, campus: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[var(--border)] bg-[var(--surface)] text-xs text-[var(--text)] focus:outline-none focus:border-[var(--secondary)]"
                    required
                  >
                    <option value="Central / All Campuses">Central / All Campuses</option>
                    <option value="ITPL Campus (Whitefield)">ITPL Campus (Whitefield)</option>
                    <option value="HRBR Layout Campus (Kalyan Nagar)">HRBR Layout Campus (Kalyan Nagar)</option>
                    <option value="BTM Layout Campus (South)">BTM Layout Campus (South)</option>
                    <option value="Byrathi Campus (Hennur)">Byrathi Campus (Hennur)</option>
                    <option value="NICE Road Campus (West)">NICE Road Campus (West)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[var(--primary)] mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    placeholder="Enter full name"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[var(--border)] bg-[var(--surface)] text-xs text-[var(--text)] focus:outline-none focus:border-[var(--secondary)]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[var(--primary)] mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="name@example.com"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[var(--border)] bg-[var(--surface)] text-xs text-[var(--text)] focus:outline-none focus:border-[var(--secondary)]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[var(--primary)] mb-1">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+91 98765 43210"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[var(--border)] bg-[var(--surface)] text-xs text-[var(--text)] focus:outline-none focus:border-[var(--secondary)]"
                  />
                </div>

                {formData.natureOfEnquiry === "ADMISSIONS" && (
                  <div>
                    <label className="block text-xs font-bold text-[var(--primary)] mb-1">
                      Class 10th Marks / Score (%)
                    </label>
                    <input
                      type="number"
                      step="0.1"
                      min="0"
                      max="100"
                      value={formData.tenthPercentage}
                      onChange={(e) => setFormData({ ...formData, tenthPercentage: e.target.value })}
                      placeholder="e.g. 88.5"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[var(--border)] bg-[var(--surface)] text-xs text-[var(--text)] focus:outline-none focus:border-[var(--secondary)]"
                    />
                  </div>
                )}
              </div>

              <div>
                <label className="block text-xs font-bold text-[var(--primary)] mb-1">
                  Message / Details *
                </label>
                <textarea
                  required
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="How can our admissions or administrative team assist you?"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[var(--border)] bg-[var(--surface)] text-xs text-[var(--text)] focus:outline-none focus:border-[var(--secondary)]"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 rounded-xl bg-[var(--accent)] hover:brightness-110 text-[var(--primary-dark)] font-extrabold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition shadow-md disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" /> Submitting Enquiry...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" /> Send Message
                  </>
                )}
              </button>
            </form>
          )}
        </div>

        {/* Campus Address Directory */}
        <div className="lg:col-span-5 space-y-4">
          <div className="p-6 rounded-3xl bg-[var(--tint)] border border-[var(--border)] space-y-2">
            <h3 className="text-base font-bold text-[var(--primary)] font-serif">
              Our 5 Bengaluru Campuses
            </h3>
            <p className="text-xs text-[var(--muted)]">
              Visitors are welcome during campus office hours.
            </p>
          </div>

          <div className="space-y-3 max-h-[600px] overflow-y-auto pr-1">
            {campuses.map((c, i) => (
              <div
                key={i}
                className="p-5 rounded-2xl bg-[var(--surface)] border border-[var(--border)] shadow-xs space-y-2"
              >
                <h4 className="font-bold text-xs text-[var(--primary)] font-serif">{c.name}</h4>
                <div className="flex items-start gap-2 text-xs text-[var(--muted)]">
                  <MapPin className="w-3.5 h-3.5 text-[var(--secondary)] shrink-0 mt-0.5" />
                  <span>{c.address}</span>
                </div>
                <div className="flex items-center gap-4 text-[11px] text-[var(--text)]/80 pt-1">
                  <div className="flex items-center gap-1 font-medium">
                    <Phone className="w-3 h-3 text-[var(--secondary)]" /> {c.phone}
                  </div>
                  <div className="flex items-center gap-1 font-medium">
                    <Mail className="w-3 h-3 text-[var(--secondary)]" /> {c.email}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
