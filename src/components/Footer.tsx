import Link from "next/link";
import { GraduationCap, MapPin, Phone, Mail, ShieldCheck } from "lucide-react";
import ConceptDemoBanner from "./ConceptDemoBanner";

interface FooterProps {
  settings?: any;
}

export default function Footer({ settings }: FooterProps) {
  const campuses = [
    { name: "ITPL Campus (Whitefield)", href: "/campuses/itpl" },
    { name: "HRBR Layout Campus (Kalyan Nagar)", href: "/campuses/hrbr" },
    { name: "BTM Layout Campus (South)", href: "/campuses/btm" },
    { name: "Byrathi Campus (Hennur)", href: "/campuses/byrathi" },
    { name: "NICE Road Campus (West)", href: "/campuses/nice-road" },
  ];

  return (
    <>
      <footer className="bg-[var(--primary-dark)] text-white pt-16 pb-8 border-t border-white/10 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          {/* Top Section: Institution Bio & Our Schools Campuses (Section 7B) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 pb-10 border-b border-white/10">
            {/* Brand Bio */}
            <div className="lg:col-span-2 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center text-[var(--accent)]">
                  <GraduationCap className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-extrabold text-white text-base font-serif leading-none">
                    Bengaluru PU College
                  </h3>
                  <p className="text-xs text-[var(--accent)] font-semibold uppercase mt-0.5">
                    Pre-University Education System
                  </p>
                </div>
              </div>
              <p className="text-xs text-white/80 leading-relaxed max-w-sm">
                Empowering students across Bengaluru with rigorous board academics (Science & Commerce), integrated entrance preparation (KCET, JEE, NEET, CA-CPT), and experiential co-curricular leadership.
              </p>
              <div className="flex items-center gap-2 pt-1">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 border border-white/15 text-[11px] text-[var(--secondary-soft)] font-medium">
                  <ShieldCheck className="w-3.5 h-3.5 text-[var(--accent)]" /> Recognized by Pre-University Education Board
                </span>
              </div>
            </div>

            {/* Our Schools / Campuses Links (Section 7B) */}
            <div className="lg:col-span-3 space-y-3">
              <h4 className="text-xs font-bold text-[var(--accent)] uppercase tracking-wider border-b border-white/15 pb-2 inline-block">
                Our Campuses Across Bengaluru
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 pt-1">
                {campuses.map((c) => (
                  <Link
                    key={c.name}
                    href={c.href}
                    className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-medium text-white/90 hover:text-[var(--accent)] transition block"
                  >
                    📍 {c.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* 7 Link Columns (Section 7B) */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-6 text-xs">
            {/* 1. About Us */}
            <div className="space-y-2">
              <h5 className="font-bold text-white uppercase tracking-wider text-[11px] text-[var(--accent)]">About Us</h5>
              <ul className="space-y-1.5 text-white/70">
                <li><Link href="/about" className="hover:text-white transition">Our Legacy</Link></li>
                <li><Link href="/about" className="hover:text-white transition">Leadership</Link></li>
                <li><Link href="/about" className="hover:text-white transition">Values & Purpose</Link></li>
              </ul>
            </div>

            {/* 2. Admission */}
            <div className="space-y-2">
              <h5 className="font-bold text-white uppercase tracking-wider text-[11px] text-[var(--accent)]">Admissions</h5>
              <ul className="space-y-1.5 text-white/70">
                <li><Link href="/admissions/apply" className="hover:text-white transition">Apply Online</Link></li>
                <li><Link href="/admissions" className="hover:text-white transition">Eligibility Criteria</Link></li>
                <li><Link href="/admissions" className="hover:text-white transition">Fee Structure</Link></li>
              </ul>
            </div>

            {/* 3. Academics */}
            <div className="space-y-2">
              <h5 className="font-bold text-white uppercase tracking-wider text-[11px] text-[var(--accent)]">Academics</h5>
              <ul className="space-y-1.5 text-white/70">
                <li><Link href="/academics" className="hover:text-white transition">Science (PCMB/PCMC)</Link></li>
                <li><Link href="/academics" className="hover:text-white transition">Commerce (CEBA/SEBA)</Link></li>
                <li><Link href="/academics" className="hover:text-white transition">Integrated Coaching</Link></li>
              </ul>
            </div>

            {/* 4. Careers */}
            <div className="space-y-2">
              <h5 className="font-bold text-white uppercase tracking-wider text-[11px] text-[var(--accent)]">Careers</h5>
              <ul className="space-y-1.5 text-white/70">
                <li><Link href="/careers" className="hover:text-white transition">Faculty Positions</Link></li>
                <li><Link href="/careers" className="hover:text-white transition">Staff Openings</Link></li>
                <li><Link href="/careers" className="hover:text-white transition">Apply to Teach</Link></li>
              </ul>
            </div>

            {/* 5. Blog & Media */}
            <div className="space-y-2">
              <h5 className="font-bold text-white uppercase tracking-wider text-[11px] text-[var(--accent)]">Blog & Media</h5>
              <ul className="space-y-1.5 text-white/70">
                <li><Link href="/media/news" className="hover:text-white transition">Campus News</Link></li>
                <li><Link href="/media/events" className="hover:text-white transition">Events Calendar</Link></li>
                <li><Link href="/media/notice-board" className="hover:text-white transition">Circulars & Notices</Link></li>
              </ul>
            </div>

            {/* 6. Alumni */}
            <div className="space-y-2">
              <h5 className="font-bold text-white uppercase tracking-wider text-[11px] text-[var(--accent)]">Alumni</h5>
              <ul className="space-y-1.5 text-white/70">
                <li><Link href="/alumni" className="hover:text-white transition">Alumni Network</Link></li>
                <li><Link href="/alumni" className="hover:text-white transition">Mentorship Guild</Link></li>
                <li><Link href="/alumni" className="hover:text-white transition">Success Stories</Link></li>
              </ul>
            </div>

            {/* 7. Newsletters & Contact */}
            <div className="space-y-2">
              <h5 className="font-bold text-white uppercase tracking-wider text-[11px] text-[var(--accent)]">Contact</h5>
              <ul className="space-y-1.5 text-white/70">
                <li><Link href="/contact" className="hover:text-white transition">Campus Addresses</Link></li>
                <li><Link href="/contact" className="hover:text-white transition">Enquiry Form</Link></li>
                <li><Link href="/admin/login" className="text-[var(--accent)] hover:underline font-bold">Admin CRM</Link></li>
              </ul>
            </div>
          </div>

          {/* Bottom Copyright & Disclaimer */}
          <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-white/60">
            <div>
              © {new Date().getFullYear()} Pre-University College Concept Portal. Built for demonstration & evaluation.
            </div>
            <div className="flex items-center gap-4">
              <Link href="/contact" className="hover:text-[var(--accent)] transition">
                Vendor & Partnership Channel
              </Link>
              <span>•</span>
              <Link href="/admin/login" className="text-[var(--accent)] hover:underline font-bold">
                Educator CRM Login
              </Link>
            </div>
          </div>
        </div>
      </footer>

      {/* Persistent Bottom Disclaimer Banner (Section 7B) */}
      <ConceptDemoBanner position="bottom" />
    </>
  );
}
