import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { MapPin, Phone, Mail, Clock, Send, ShieldCheck, ArrowRight } from "lucide-react";

export default async function ContactPage() {
  const settings = await prisma.siteSetting.findUnique({ where: { id: "default" } });

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text)] py-12 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-[var(--maroon)] dark:text-[var(--gold)]">
            Reach Out to Us
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-[var(--maroon)] dark:text-white font-serif">
            Contact & Campus Location
          </h1>
          <p className="text-sm sm:text-base text-[var(--text)]/80">
            Centrally situated near Ulsoor Lake in the heart of Bengaluru. Accessible by Namma Metro (MG Road & Trinity stations) and all major BMTC bus routes.
          </p>
        </div>

        {/* Contact Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-3xl bg-white dark:bg-[var(--card)] border border-[var(--maroon-light)]/20 shadow-xs space-y-3">
            <div className="p-3 rounded-2xl bg-[var(--maroon-tint)] text-[var(--maroon)] dark:text-[var(--gold)] w-fit">
              <MapPin className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-base text-[var(--text)] font-serif">Campus Address</h3>
            <p className="text-xs text-[var(--text)]/80 leading-relaxed">
              {settings?.address || "12, Annaswamy Mudaliar Road, Near Ulsoor Lake, Sivanchetti Gardens, Bengaluru, Karnataka 560042"}
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-white dark:bg-[var(--card)] border border-[var(--maroon-light)]/20 shadow-xs space-y-3">
            <div className="p-3 rounded-2xl bg-[var(--maroon-tint)] text-[var(--gold)] w-fit">
              <Phone className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-base text-[var(--text)] font-serif">Telephone Lines</h3>
            <div className="text-xs text-[var(--text)]/80 space-y-1">
              <div>Admissions: +91 80 2551 2911</div>
              <div>Principal&apos;s Office: +91 80 2554 4452</div>
            </div>
          </div>

          <div className="p-6 rounded-3xl bg-white dark:bg-[var(--card)] border border-[var(--maroon-light)]/20 shadow-xs space-y-3">
            <div className="p-3 rounded-2xl bg-[var(--maroon-tint)] text-[var(--maroon-light)] dark:text-[var(--gold)] w-fit">
              <Mail className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-base text-[var(--text)] font-serif">Email Correspondence</h3>
            <div className="text-xs text-[var(--text)]/80 space-y-1">
              <div>Admissions: admissions@rbanmspuc.edu.in</div>
              <div>Principal: principal@rbanmspuc.edu.in</div>
            </div>
          </div>
        </div>

        {/* Map and Office Schedule */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Embedded Google Map */}
          <div className="lg:col-span-8 bg-white dark:bg-[var(--card)] rounded-3xl p-4 shadow-sm border border-[var(--maroon-light)]/20 overflow-hidden space-y-4">
            <div className="flex items-center justify-between px-2 pt-2">
              <h3 className="font-bold text-base text-[var(--maroon)] dark:text-[var(--gold)] font-serif">
                Campus Location on Google Maps
              </h3>
              <a
                href="https://maps.google.com/?q=RBANM's+Pre+University+College+Bangalore"
                target="_blank"
                rel="noreferrer"
                className="text-xs font-bold text-[var(--maroon)] dark:text-[var(--gold)] hover:underline inline-flex items-center gap-1 link-maroon"
              >
                Open in Google Maps <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
            <div className="relative w-full h-[450px] rounded-2xl overflow-hidden border border-[var(--maroon-light)]/20">
              <iframe
                title="RBANMS PU College Campus Map"
                src={
                  settings?.mapEmbedUrl ||
                  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3887.8926946633633!2d77.6163339748414!3d12.978712987337326!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae1684c47f5bc7%3A0xbcf239b6b7123aa1!2sRBANM's%20Pre%20University%20College!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                }
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>

          {/* Office Hours & Quick Action */}
          <div className="lg:col-span-4 space-y-6">
            <div className="p-6 rounded-3xl bg-white dark:bg-[var(--card)] border border-[var(--maroon-light)]/20 shadow-xs space-y-4">
              <h4 className="font-bold text-base text-[var(--maroon)] dark:text-[var(--gold)] font-serif flex items-center gap-2">
                <Clock className="w-5 h-5 text-[var(--gold)]" /> Administrative Hours
              </h4>
              <ul className="space-y-3 text-xs text-[var(--text)]/80">
                <li className="flex justify-between pb-2 border-b border-[var(--maroon-light)]/15">
                  <span className="font-semibold">Monday - Friday:</span>
                  <span>8:45 AM - 3:30 PM</span>
                </li>
                <li className="flex justify-between pb-2 border-b border-[var(--maroon-light)]/15">
                  <span className="font-semibold">Saturday:</span>
                  <span>8:45 AM - 1:00 PM</span>
                </li>
                <li className="flex justify-between pb-2 border-b border-[var(--maroon-light)]/15">
                  <span className="font-semibold">Sunday & Public Holidays:</span>
                  <span className="text-red-500 font-semibold">Closed</span>
                </li>
              </ul>
              <div className="pt-2">
                <Link
                  href="/admissions/apply"
                  className="w-full py-3 rounded-xl bg-[var(--maroon)] hover:bg-[var(--maroon-dark)] text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition shadow-md"
                >
                  Apply Online Today
                </Link>
              </div>
            </div>

            <div className="p-6 rounded-3xl bg-gradient-to-br from-[var(--maroon-dark)] to-[var(--maroon)] text-white border border-[var(--gold)]/30 space-y-3">
              <h4 className="font-bold text-sm text-[var(--gold)]">Nearest Metro & Bus Stations</h4>
              <p className="text-xs text-white/90 leading-relaxed">
                • <strong>Trinity Metro Station (Purple Line):</strong> 900 meters<br />
                • <strong>MG Road Metro Station:</strong> 1.2 km<br />
                • <strong>Ulsoor Bus Stand:</strong> 300 meters
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
