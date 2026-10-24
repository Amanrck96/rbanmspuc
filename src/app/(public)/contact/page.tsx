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
          <span className="text-xs font-bold uppercase tracking-widest text-black">
            Reach Out to Us
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-black font-serif">
            Contact &amp; Campus Location
          </h1>
          <p className="text-sm sm:text-base text-gray-700">
            Centrally situated near Ulsoor Lake in the heart of Bengaluru. Accessible by Namma Metro (MG Road &amp; Trinity stations) and all major BMTC bus routes.
          </p>
        </div>

        {/* Contact Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-3xl bg-white border border-gray-200 shadow-xs space-y-3">
            <div className="p-3 rounded-2xl bg-gray-100 text-black w-fit border border-gray-300">
              <MapPin className="w-6 h-6 text-black" />
            </div>
            <h3 className="font-bold text-base text-black font-serif">Campus Address</h3>
            <p className="text-xs text-gray-700 leading-relaxed">
              12, Annaswamy Mudaliar Road, Near Ulsoor Lake, Sivanchetti Gardens, Bengaluru, Karnataka 560042
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-white border border-gray-200 shadow-xs space-y-3">
            <div className="p-3 rounded-2xl bg-gray-100 text-black w-fit border border-gray-300">
              <Phone className="w-6 h-6 text-black" />
            </div>
            <h3 className="font-bold text-base text-black font-serif">Telephone Lines</h3>
            <div className="text-xs text-gray-700 space-y-1">
              <div>Admissions: +91 80 2551 2911</div>
              <div>Principal&apos;s Office: +91 80 2554 4452</div>
            </div>
          </div>

          <div className="p-6 rounded-3xl bg-white border border-gray-200 shadow-xs space-y-3">
            <div className="p-3 rounded-2xl bg-gray-100 text-black w-fit border border-gray-300">
              <Mail className="w-6 h-6 text-black" />
            </div>
            <h3 className="font-bold text-base text-black font-serif">Email Correspondence</h3>
            <div className="text-xs text-gray-700 space-y-1">
              <div>Admissions: admissions@rbanmspuc.edu.in</div>
              <div>Principal: principal@rbanmspuc.edu.in</div>
            </div>
          </div>
        </div>

        {/* Map and Office Schedule */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Embedded Google Map */}
          <div className="lg:col-span-8 bg-white rounded-3xl p-4 shadow-sm border border-gray-200 overflow-hidden space-y-4">
            <div className="flex items-center justify-between px-2 pt-2">
              <h3 className="font-bold text-base text-black font-serif">
                Campus Location on Google Maps
              </h3>
              <a
                href="https://maps.google.com/?q=RBANM's+Pre+University+College+Bangalore"
                target="_blank"
                rel="noreferrer"
                className="text-xs font-bold text-black hover:underline inline-flex items-center gap-1"
              >
                Open in Google Maps <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
            <div className="relative w-full h-[400px] rounded-2xl overflow-hidden border border-gray-200">
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
            <div className="p-6 rounded-3xl bg-white border border-gray-200 shadow-xs space-y-4">
              <h4 className="font-bold text-base text-black font-serif flex items-center gap-2">
                <Clock className="w-5 h-5 text-black" /> Administrative Hours
              </h4>
              <ul className="space-y-3 text-xs text-gray-700">
                <li className="flex justify-between pb-2 border-b border-gray-200">
                  <span className="font-semibold text-black">Monday - Friday:</span>
                  <span>8:45 AM - 3:30 PM</span>
                </li>
                <li className="flex justify-between pb-2 border-b border-gray-200">
                  <span className="font-semibold text-black">Saturday:</span>
                  <span>8:45 AM - 1:00 PM</span>
                </li>
                <li className="flex justify-between pb-2 border-b border-gray-200">
                  <span className="font-semibold text-black">Sunday &amp; Holidays:</span>
                  <span className="text-black font-bold">Closed</span>
                </li>
              </ul>
              <div className="pt-2">
                <Link
                  href="/admissions/apply"
                  className="w-full py-3 rounded-xl bg-white hover:bg-gray-100 text-black border-2 border-black font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition shadow-xs"
                >
                  Apply Online Today
                </Link>
              </div>
            </div>

            <div className="p-6 rounded-3xl bg-white text-black border border-gray-200 shadow-xs space-y-3">
              <h4 className="font-bold text-sm text-black flex items-center gap-1.5">
                <Train className="w-4 h-4 text-black" /> Nearest Metro &amp; Bus Stations
              </h4>
              <p className="text-xs text-gray-700 leading-relaxed space-y-1">
                • <strong>Trinity Metro Station (Purple Line):</strong> 900 meters<br />
                • <strong>MG Road Metro Station:</strong> 1.2 km<br />
                • <strong>Ulsoor Bus Stand:</strong> 300 meters
              </p>
            </div>
          </div>
        </div>

        {/* Online Enquiry Form Section */}
        <div className="p-8 sm:p-10 rounded-3xl bg-white border border-gray-200 shadow-xs space-y-6">
          <div className="space-y-1 border-b border-gray-200 pb-4">
            <h2 className="text-2xl font-bold text-black font-serif">
              Send an Online Enquiry
            </h2>
            <p className="text-xs text-gray-700">
              Have questions regarding admissions, fee structure, scholarships, or certificates? Submit your enquiry below.
            </p>
          </div>

          {submittedRef ? (
            <div className="p-8 rounded-2xl bg-gray-50 border border-gray-200 text-black space-y-4 text-center">
              <CheckCircle2 className="w-12 h-12 text-black mx-auto" />
              <div className="space-y-1">
                <h3 className="text-lg font-bold">Enquiry Received!</h3>
                <p className="text-xs text-gray-700">
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
                className="px-6 py-2.5 rounded-xl bg-white hover:bg-gray-100 text-black border border-black text-xs font-bold transition"
              >
                Submit Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 max-w-3xl">
              {error && (
                <div className="p-4 rounded-xl bg-gray-100 border border-black text-black text-xs flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                  <span>{error}</span>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-black mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    placeholder="Enter full name"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 bg-white text-xs text-black focus:outline-none focus:ring-2 focus:ring-black"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-black mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="name@example.com"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 bg-white text-xs text-black focus:outline-none focus:ring-2 focus:ring-black"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-black mb-1">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+91 98765 43210"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 bg-white text-xs text-black focus:outline-none focus:ring-2 focus:ring-black"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-black mb-1">
                    Course / Stream Interested
                  </label>
                  <select
                    value={formData.courseInterested}
                    onChange={(e) => setFormData({ ...formData, courseInterested: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 bg-white text-xs text-black focus:outline-none focus:ring-2 focus:ring-black"
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
                <label className="block text-xs font-bold text-black mb-1">
                  Message / Details *
                </label>
                <textarea
                  required
                  rows={3}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="How can our admissions counselor or office assist you?"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 bg-white text-xs text-black focus:outline-none focus:ring-2 focus:ring-black"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="px-8 py-3 rounded-xl bg-white hover:bg-gray-100 text-black border-2 border-black font-extrabold text-xs uppercase tracking-wider flex items-center gap-2 transition shadow-xs disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" /> Sending...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4 text-black" /> Send Enquiry
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
