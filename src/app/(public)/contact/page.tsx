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
  ArrowRight,
  Train,
} from "lucide-react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    courseInterested: "PCMB",
    natureOfEnquiry: "ADMISSIONS",
    campus: "Main Campus (Ulsoor Lake)",
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
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text)] py-12 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header (Rbanms website.docx) */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-[var(--secondary)]">
            Reach Out to Us
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-[var(--primary)] font-serif">
            Contact &amp; Campus Location
          </h1>
          <p className="text-sm sm:text-base text-[var(--muted)]">
            Centrally situated near Ulsoor Lake in the heart of Bengaluru. Accessible by Namma Metro (MG Road &amp; Trinity stations) and all major BMTC bus routes.
          </p>
        </div>

        {/* Contact Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-3xl bg-[var(--surface)] border border-[var(--border)] shadow-xs space-y-3">
            <div className="p-3 rounded-2xl bg-[var(--tint)] text-[var(--secondary)] w-fit">
              <MapPin className="w-6 h-6 text-[var(--secondary)]" />
            </div>
            <h3 className="font-bold text-base text-[var(--primary)] font-serif">Campus Address</h3>
            <p className="text-xs text-[var(--muted)] leading-relaxed">
              12, Annaswamy Mudaliar Road, Near Ulsoor Lake, Sivanchetti Gardens, Bengaluru, Karnataka 560042
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-[var(--surface)] border border-[var(--border)] shadow-xs space-y-3">
            <div className="p-3 rounded-2xl bg-[var(--tint)] text-[var(--secondary)] w-fit">
              <Phone className="w-6 h-6 text-[var(--secondary)]" />
            </div>
            <h3 className="font-bold text-base text-[var(--primary)] font-serif">Telephone Lines</h3>
            <div className="text-xs text-[var(--muted)] space-y-1">
              <div>Admissions: +91 80 2551 2911</div>
              <div>Principal&apos;s Office: +91 80 2554 4452</div>
            </div>
          </div>

          <div className="p-6 rounded-3xl bg-[var(--surface)] border border-[var(--border)] shadow-xs space-y-3">
            <div className="p-3 rounded-2xl bg-[var(--tint)] text-[var(--secondary)] w-fit">
              <Mail className="w-6 h-6 text-[var(--secondary)]" />
            </div>
            <h3 className="font-bold text-base text-[var(--primary)] font-serif">Email Correspondence</h3>
            <div className="text-xs text-[var(--muted)] space-y-1">
              <div>Admissions: admissions@rbanmspuc.edu.in</div>
              <div>Principal: principal@rbanmspuc.edu.in</div>
            </div>
          </div>
        </div>

        {/* Map and Office Schedule */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Embedded Google Map */}
          <div className="lg:col-span-8 bg-[var(--surface)] rounded-3xl p-4 shadow-sm border border-[var(--border)] overflow-hidden space-y-4">
            <div className="flex items-center justify-between px-2 pt-2">
              <h3 className="font-bold text-base text-[var(--primary)] font-serif">
                Campus Location on Google Maps
              </h3>
              <a
                href="https://maps.google.com/?q=RBANM's+Pre+University+College+Bangalore"
                target="_blank"
                rel="noreferrer"
                className="text-xs font-bold text-[var(--secondary)] hover:underline inline-flex items-center gap-1"
              >
                Open in Google Maps <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
            <div className="relative w-full h-[400px] rounded-2xl overflow-hidden border border-[var(--border)]">
              <iframe
                title="RBANMS PU College Campus Map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3887.8926946633633!2d77.6163339748414!3d12.978712987337326!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae1684c47f5bc7%3A0xbcf239b6b7123aa1!2sRBANM's%20Pre%20University%20College!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>

          {/* Office Hours & Connectivity */}
          <div className="lg:col-span-4 space-y-6">
            <div className="p-6 rounded-3xl bg-[var(--surface)] border border-[var(--border)] shadow-xs space-y-4">
              <h4 className="font-bold text-base text-[var(--primary)] font-serif flex items-center gap-2">
                <Clock className="w-5 h-5 text-[var(--secondary)]" /> Administrative Hours
              </h4>
              <ul className="space-y-3 text-xs text-[var(--muted)]">
                <li className="flex justify-between pb-2 border-b border-[var(--border)]">
                  <span className="font-semibold text-[var(--text)]">Monday - Friday:</span>
                  <span>8:45 AM - 3:30 PM</span>
                </li>
                <li className="flex justify-between pb-2 border-b border-[var(--border)]">
                  <span className="font-semibold text-[var(--text)]">Saturday:</span>
                  <span>8:45 AM - 1:00 PM</span>
                </li>
                <li className="flex justify-between pb-2 border-b border-[var(--border)]">
                  <span className="font-semibold text-[var(--text)]">Sunday &amp; Holidays:</span>
                  <span className="text-red-500 font-semibold">Closed</span>
                </li>
              </ul>
              <div className="pt-2">
                <Link
                  href="/admissions/apply"
                  className="w-full py-3 rounded-xl bg-[var(--primary)] hover:bg-[var(--primary-dark)] text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition shadow-md"
                >
                  Apply Online Today
                </Link>
              </div>
            </div>

            <div className="p-6 rounded-3xl bg-gradient-to-br from-[var(--primary-dark)] to-[var(--primary)] text-white border border-white/10 space-y-3">
              <h4 className="font-bold text-sm text-[var(--accent)] flex items-center gap-1.5">
                <Train className="w-4 h-4" /> Nearest Metro &amp; Bus Stations
              </h4>
              <p className="text-xs text-white/90 leading-relaxed space-y-1">
                • <strong>Trinity Metro Station (Purple Line):</strong> 900 meters<br />
                • <strong>MG Road Metro Station:</strong> 1.2 km<br />
                • <strong>Ulsoor Bus Stand:</strong> 300 meters
              </p>
            </div>
          </div>
        </div>

        {/* Online Enquiry Form Section */}
        <div className="p-8 sm:p-10 rounded-3xl bg-[var(--surface)] border border-[var(--border)] shadow-xs space-y-6">
          <div className="space-y-1 border-b border-[var(--border)] pb-4">
            <h2 className="text-2xl font-bold text-[var(--primary)] font-serif">
              Send an Online Enquiry
            </h2>
            <p className="text-xs text-[var(--muted)]">
              Have questions regarding admissions, fee structure, scholarships, or certificates? Submit your enquiry below.
            </p>
          </div>

          {submittedRef ? (
            <div className="p-8 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 space-y-4 text-center">
              <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
              <div className="space-y-1">
                <h3 className="text-lg font-bold">Enquiry Received!</h3>
                <p className="text-xs text-emerald-800">
                  Your reference ID is <strong className="font-mono text-sm">{submittedRef}</strong>. Our admissions counselor will contact you shortly.
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
                    courseInterested: "PCMB",
                    natureOfEnquiry: "ADMISSIONS",
                    campus: "Main Campus (Ulsoor Lake)",
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
            <form onSubmit={handleSubmit} className="space-y-4 max-w-3xl">
              {error && (
                <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                  <span>{error}</span>
                </div>
              )}

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

                <div>
                  <label className="block text-xs font-bold text-[var(--primary)] mb-1">
                    Course / Stream Interested
                  </label>
                  <select
                    value={formData.courseInterested}
                    onChange={(e) => setFormData({ ...formData, courseInterested: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[var(--border)] bg-[var(--surface)] text-xs text-[var(--text)] focus:outline-none focus:border-[var(--secondary)]"
                  >
                    <option value="PCMB">Science: PCMB (Physics, Chemistry, Maths, Biology)</option>
                    <option value="PCMC">Science: PCMC (Physics, Chemistry, Maths, Comp Science)</option>
                    <option value="CEBA">Commerce: CEBA (Comp Science, Economics, Business, Accounts)</option>
                    <option value="SEBA">Commerce: SEBA (Stats, Economics, Business, Accounts)</option>
                    <option value="HEGP">Arts: HEGP (History, Economics, Geography, Pol Science)</option>
                    <option value="General">General / Other Enquiry</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[var(--primary)] mb-1">
                  Message / Details *
                </label>
                <textarea
                  required
                  rows={3}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="How can our admissions counselor or office assist you?"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[var(--border)] bg-[var(--surface)] text-xs text-[var(--text)] focus:outline-none focus:border-[var(--secondary)]"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="px-8 py-3 rounded-xl bg-[var(--primary)] hover:bg-[var(--primary-dark)] text-white font-extrabold text-xs uppercase tracking-wider flex items-center gap-2 transition shadow-md disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" /> Sending...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4 text-[var(--accent)]" /> Send Enquiry
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
