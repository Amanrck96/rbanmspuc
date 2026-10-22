import Link from "next/link";
import { notFound } from "next/navigation";
import {
  MapPin,
  Phone,
  Mail,
  GraduationCap,
  Building2,
  Users,
  Compass,
  ArrowRight,
  CheckCircle2,
  Calendar,
} from "lucide-react";

interface CampusData {
  id: string;
  name: string;
  location: string;
  address: string;
  phone: string;
  email: string;
  combinations: string[];
  description: string;
  features: string[];
  headOfCampus: string;
}

const campusDatabase: Record<string, CampusData> = {
  itpl: {
    id: "itpl",
    name: "ITPL Campus (Whitefield)",
    location: "ITPL Main Road, Whitefield, Bengaluru",
    address: "ITPL Main Road, Near Hope Farm Junction, Whitefield, Bengaluru 560066",
    phone: "080-47095123",
    email: "admissions.itpl@concept-puc.edu.in",
    combinations: ["PCMB", "PCMC", "CEBA"],
    description:
      "Strategically situated in Bengaluru's tech capital, the ITPL campus is renowned for its advanced computational labs, engineering incubation programs, and dedicated KCET/JEE preparatory tracks.",
    features: [
      "High-speed computational lab with 120 AI-ready workstations",
      "Specialized Physics mechanics and optics research stations",
      "Integrated competitive coaching with daily doubt-clearing sessions",
      "Air-conditioned multi-media seminar auditoriums",
    ],
    headOfCampus: "Prof. S. R. Venkatesh, M.Sc., M.Phil.",
  },
  hrbr: {
    id: "hrbr",
    name: "HRBR Layout Campus (Kalyan Nagar)",
    location: "Kalyan Nagar, North Bengaluru",
    address: "No. 2079, 2nd Main Road, HRBR Layout 3rd Block, Bengaluru 560084",
    phone: "080-47095123",
    email: "admissions.hrbr@concept-puc.edu.in",
    combinations: ["PCMB", "PCMC", "CEBA", "SEBA"],
    description:
      "Our premier academic and cultural flagship campus in North Bengaluru. Boasts an unbroken 99%+ board pass record, distinguished faculty in science and commerce, and active student literary clubs.",
    features: [
      "Comprehensive natural sciences and biotechnology suites",
      "Spacious business debate and mock-stock exchange rooms",
      "Library holding over 18,000 academic titles and journals",
      "Pastoral student counseling and wellness center",
    ],
    headOfCampus: "Dr. Malini Sharma, Ph.D.",
  },
  btm: {
    id: "btm",
    name: "BTM Layout Campus (South)",
    location: "2nd Stage, Outer Ring Road, Bengaluru",
    address: "Outer Ring Road, 2nd Stage, BTM Layout, Bengaluru 560076",
    phone: "080-47095123",
    email: "admissions.btm@concept-puc.edu.in",
    combinations: ["PCMC", "CEBA", "SEBA"],
    description:
      "A dynamic commerce and computational hub in South Bengaluru. Focused on finance, business analytics, software applications, and chartered accountancy preparatory incubation.",
    features: [
      "Dedicated CA-CPT and CMA foundation mentoring cell",
      "Collaborative project pods for fintech and business modeling",
      "State-of-the-art interactive smart classrooms",
      "High-speed campus-wide secure Wi-Fi infrastructure",
    ],
    headOfCampus: "Prof. Ananth Murthy, M.Com, FCA",
  },
  byrathi: {
    id: "byrathi",
    name: "Byrathi Campus (Hennur)",
    location: "Off Hennur Main Road, Bengaluru",
    address: "Byrathi Village, Off Hennur Bagalur Main Road, Bengaluru 560077",
    phone: "080-47095123",
    email: "admissions.byrathi@concept-puc.edu.in",
    combinations: ["PCMB", "PCMC", "CEBA"],
    description:
      "An expansive, serene green campus offering an optimal learning sanctuary. Features extensive athletics grounds, botany conservatories, and pristine science research laboratories.",
    features: [
      "Full-sized athletics track, cricket nets, and basketball courts",
      "Environmental science research grove and botanical garden",
      "Spacious, naturally-lit lecture theaters",
      "Dedicated transport fleet connecting North and East Bengaluru",
    ],
    headOfCampus: "Dr. K. Raghavendra, M.Sc., Ph.D.",
  },
  "nice-road": {
    id: "nice-road",
    name: "NICE Road Campus (West)",
    location: "NICE Road Junction, Bengaluru",
    address: "Near NICE Road Junction, Outer Ring Road, Bengaluru 560085",
    phone: "080-47095123",
    email: "admissions.niceroad@concept-puc.edu.in",
    combinations: ["PCMB", "PCMC", "SEBA"],
    description:
      "Our newest contemporary facility engineered for experiential learning. Integrates modern architectural design, digital makerspaces, and interdisciplinary seminar halls.",
    features: [
      "Modern design labs and robotics prototyping workstations",
      "Collaborative group-learning commons and cafeteria",
      "Dedicated audio-visual studio for digital media projects",
      "Expansive indoor badminton and table tennis complex",
    ],
    headOfCampus: "Prof. Priya Nandakumar, M.Sc., B.Ed.",
  },
};

export async function generateStaticParams() {
  return [
    { campus: "itpl" },
    { campus: "hrbr" },
    { campus: "btm" },
    { campus: "byrathi" },
    { campus: "nice-road" },
  ];
}

export default async function CampusPage({
  params,
}: {
  params: Promise<{ campus: string }>;
}) {
  const { campus } = await params;
  const data = campusDatabase[campus];

  if (!data) {
    notFound();
  }

  const subPages = [
    { label: "About Us", slug: "about", desc: "Leadership, infrastructure & culture" },
    { label: "Academics", slug: "academics", desc: "Streams, syllabus & lab facilities" },
    { label: "Admissions", slug: "admissions", desc: "Eligibility, seats & fees" },
    { label: "Student Experience", slug: "student-experience", desc: "Clubs, sports & student life" },
    { label: "College & Career Guidance", slug: "guidance", desc: "Career mentoring & entrance coaching" },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* Campus Hero Header */}
      <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-[var(--primary)] via-[var(--primary-dark)] to-[var(--primary)] text-white shadow-xl space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-[var(--accent)] text-xs font-bold uppercase tracking-wider">
          <Building2 className="w-3.5 h-3.5" /> Campus Profile
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold font-serif">{data.name}</h1>
        <p className="text-sm sm:text-base text-white/80 max-w-3xl leading-relaxed">
          {data.description}
        </p>
        <div className="pt-2 flex flex-wrap gap-4 text-xs text-white/80">
          <div className="flex items-center gap-1.5">
            <MapPin className="w-4 h-4 text-[var(--accent)]" /> {data.address}
          </div>
          <div className="flex items-center gap-1.5">
            <Phone className="w-4 h-4 text-[var(--accent)]" /> {data.phone}
          </div>
        </div>
      </div>

      {/* 5 Campus Sub-Sections (Section 7B) */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-[var(--primary)] font-serif">
          Campus Sub-Sections &amp; Portals
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {subPages.map((sub) => (
            <Link
              key={sub.slug}
              href={`/campuses/${data.id}/${sub.slug}`}
              className="p-5 rounded-2xl bg-[var(--surface)] border border-[var(--border)] shadow-sm hover:shadow-md hover:border-[var(--secondary)] transition group"
            >
              <div className="flex items-center justify-between">
                <span className="font-bold text-sm text-[var(--primary)] group-hover:text-[var(--secondary)]">
                  {sub.label}
                </span>
                <ArrowRight className="w-4 h-4 text-[var(--secondary)] group-hover:translate-x-1 transition-transform" />
              </div>
              <p className="text-xs text-[var(--muted)] mt-1.5">{sub.desc}</p>
            </Link>
          ))}
        </div>
      </div>

      {/* Key Campus Highlights */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4 p-8 rounded-3xl bg-[var(--tint)] border border-[var(--border)]">
          <h3 className="text-xl font-bold text-[var(--primary)] font-serif">
            Campus Infrastructure &amp; Features
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            {data.features.map((feature, i) => (
              <div key={i} className="flex items-start gap-2.5 text-xs text-[var(--text)]/90">
                <CheckCircle2 className="w-4 h-4 text-[var(--secondary)] shrink-0 mt-0.5" />
                <span>{feature}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="p-8 rounded-3xl bg-[var(--surface)] border border-[var(--border)] shadow-sm space-y-4">
          <h3 className="text-base font-bold text-[var(--primary)] font-serif border-b border-[var(--border)] pb-2">
            Branch Leadership
          </h3>
          <div className="text-xs space-y-1">
            <span className="text-[var(--muted)] block">Head of Campus</span>
            <span className="font-bold text-sm text-[var(--primary)]">{data.headOfCampus}</span>
          </div>
          <div className="pt-4 border-t border-[var(--border)] space-y-2">
            <Link
              href={`/admissions/apply?campus=${encodeURIComponent(data.name)}`}
              className="w-full py-3 rounded-xl bg-[var(--accent)] hover:brightness-110 text-[var(--primary-dark)] font-extrabold text-xs uppercase tracking-wider block text-center shadow-md transition"
            >
              Apply to {data.name.split("(")[0]}
            </Link>
            <Link
              href="/contact"
              className="w-full py-2.5 rounded-xl border border-[var(--secondary)] text-[var(--secondary)] hover:bg-[var(--secondary)]/10 text-xs font-bold block text-center transition"
            >
              Contact Branch Office
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
