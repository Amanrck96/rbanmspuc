import Link from "next/link";
import Image from "next/image";
import { MapPin, Phone, Mail, Clock, ShieldCheck, Heart } from "lucide-react";

interface FooterProps {
  settings?: any;
}

export default function Footer({ settings }: FooterProps) {
  return (
    <footer className="bg-slate-950 text-slate-300 pt-16 pb-8 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-slate-800">
          {/* Column 1: College Heritage */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="relative w-10 h-10 shrink-0">
                <Image
                  src={settings?.logoUrl || "/images/rbanms-logo.svg"}
                  alt="RBANMS Logo"
                  fill
                  className="object-contain"
                />
              </div>
              <div>
                <h3 className="font-extrabold text-white text-base font-serif leading-none">
                  RBANM&apos;S
                </h3>
                <p className="text-xs text-slate-300 font-semibold uppercase">Pre-University College</p>
                <p className="text-[10px] text-amber-500 font-semibold">ESTD. 1883 • BENGALURU</p>
              </div>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Founded in 1883 by Dharmarathnakara Rai Bahadur Arcot Narrainswamy Mudaliar.
              Nurturing generations of scholars through value-based, high-quality pre-university education in Science, Commerce, and Arts.
            </p>
            <div className="flex items-center gap-2 pt-2">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-slate-900 border border-slate-800 text-[11px] text-emerald-400 font-medium">
                <ShieldCheck className="w-3.5 h-3.5" /> Affiliated to Karnataka PU Board
              </span>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4 border-b border-amber-600/60 pb-2 inline-block">
              Quick Navigation
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/about/history" className="hover:text-amber-400 transition">
                  Heritage & Founder History
                </Link>
              </li>
              <li>
                <Link href="/about/principals-message" className="hover:text-amber-400 transition">
                  Principal&apos;s Message
                </Link>
              </li>
              <li>
                <Link href="/admissions/courses-offered" className="hover:text-amber-400 transition">
                  Courses & Combinations
                </Link>
              </li>
              <li>
                <Link href="/admissions/fee-structure" className="hover:text-amber-400 transition">
                  Fee Structure (2025-26)
                </Link>
              </li>
              <li>
                <Link href="/admissions/scholarships" className="hover:text-amber-400 transition">
                  Scholarships & Concessions
                </Link>
              </li>
              <li>
                <Link href="/academics/faculty" className="hover:text-amber-400 transition">
                  Faculty Directory
                </Link>
              </li>
              <li>
                <Link href="/academics/academic-calendar" className="hover:text-amber-400 transition">
                  Academic Calendar
                </Link>
              </li>
              <li>
                <Link href="/media/notice-board" className="hover:text-amber-400 transition">
                  Notice Board & Circulars
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Student Life & Facilities */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4 border-b border-amber-600/60 pb-2 inline-block">
              Campus & Student Life
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/academics/science-laboratories" className="hover:text-amber-400 transition">
                  Science Laboratories
                </Link>
              </li>
              <li>
                <Link href="/academics/computer-lab" className="hover:text-amber-400 transition">
                  Computer Centers
                </Link>
              </li>
              <li>
                <Link href="/academics/library" className="hover:text-amber-400 transition">
                  Central College Library
                </Link>
              </li>
              <li>
                <Link href="/student-life/sports" className="hover:text-amber-400 transition">
                  Sports & Athletics
                </Link>
              </li>
              <li>
                <Link href="/student-life/ncc" className="hover:text-amber-400 transition">
                  National Cadet Corps (NCC)
                </Link>
              </li>
              <li>
                <Link href="/student-life/clubs-societies" className="hover:text-amber-400 transition">
                  Clubs & Student Societies
                </Link>
              </li>
              <li>
                <Link href="/media/photo-gallery" className="hover:text-amber-400 transition">
                  Photo & Video Galleries
                </Link>
              </li>
              <li>
                <Link href="/alumni/alumni" className="hover:text-amber-400 transition">
                  Alumni Association
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact & Office */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4 border-b border-amber-600/60 pb-2 inline-block">
              Get in Touch
            </h4>
            <div className="flex items-start gap-3 text-xs text-slate-300">
              <MapPin className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
              <span>
                {settings?.address || "12, Annaswamy Mudaliar Road, Near Ulsoor Lake, Sivanchetti Gardens, Bengaluru, Karnataka 560042"}
              </span>
            </div>
            <div className="flex items-center gap-3 text-xs text-slate-300">
              <Phone className="w-4 h-4 text-amber-500 shrink-0" />
              <a href="tel:+918025512911" className="hover:text-white transition">
                {settings?.phone || "+91 80 2551 2911 / +91 80 2554 4452"}
              </a>
            </div>
            <div className="flex items-center gap-3 text-xs text-slate-300">
              <Mail className="w-4 h-4 text-amber-500 shrink-0" />
              <a href="mailto:admissions@rbanmspuc.edu.in" className="hover:text-white transition">
                {settings?.admissionsEmail || "admissions@rbanmspuc.edu.in"}
              </a>
            </div>
            <div className="flex items-center gap-3 text-xs text-slate-300">
              <Clock className="w-4 h-4 text-amber-500 shrink-0" />
              <span>Mon - Fri: 8:45 AM - 3:30 PM | Sat: 8:45 AM - 1:00 PM</span>
            </div>

            <div className="pt-2">
              <Link
                href="/admissions/apply"
                className="inline-flex items-center justify-center w-full px-4 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs uppercase tracking-wider transition shadow-sm"
              >
                Apply Online 2025-26
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-slate-500">
          <div>
            © 1883 - {new Date().getFullYear()} RBANM&apos;s Pre-University College, Bengaluru. All rights reserved.
          </div>
          <div className="flex items-center gap-4">
            <Link href="/about/policies-documents" className="hover:text-slate-400">
              Privacy Policy & Disclosures
            </Link>
            <span>•</span>
            <Link href="/about/statements" className="hover:text-slate-400">
              Anti-Ragging Rules
            </Link>
            <span>•</span>
            <Link href="/admin" className="text-amber-500 hover:text-amber-400 font-semibold">
              Admin CRM Login
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
