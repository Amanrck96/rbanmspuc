import Link from "next/link";
import { notFound } from "next/navigation";
import {
  Building2,
  GraduationCap,
  Users,
  Compass,
  FileCheck,
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  BookOpen,
  Trophy,
  Award,
  Calendar,
  Sparkles,
} from "lucide-react";

interface CampusData {
  id: string;
  name: string;
  location: string;
  address: string;
  phone: string;
  email: string;
  combinations: string[];
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
    headOfCampus: "Prof. Priya Nandakumar, M.Sc., B.Ed.",
  },
};

const subpageMeta: Record<
  string,
  {
    title: string;
    subtitle: string;
    icon: typeof Building2;
    getContent: (campus: CampusData) => {
      highlights: string[];
      paragraphs: string[];
      sections: { heading: string; details: string[] }[];
    };
  }
> = {
  about: {
    title: "About the Campus",
    subtitle: "Campus vision, modern facilities, leadership and learning culture",
    icon: Building2,
    getContent: (campus) => ({
      highlights: [
        `Campus led by ${campus.headOfCampus}`,
        "Eco-friendly, technologically integrated smart learning environment",
        "Dedicated student mentoring and pastoral care infrastructure",
        "Fully equipped emergency medical desk and round-the-clock campus security",
      ],
      paragraphs: [
        `The ${campus.name} is engineered to deliver holistic pre-university education in a disciplined, forward-looking academic environment. With contemporary classrooms, digital libraries, and specialized laboratories, students thrive in an atmosphere designed for intellectual curiosity.`,
        "Our academic leadership team prioritizes personalized student attention, maintaining an optimal faculty-to-student ratio of 1:18 to ensure continuous mentorship across both years of pre-university study.",
      ],
      sections: [
        {
          heading: "Campus Infrastructure",
          details: [
            "Smart digital lecture theaters with acoustic dampening and high-lumen projectors",
            "Advanced research and experiment suites for Physics, Chemistry, Biology, and Computer Science",
            "Central library holding over 15,000 reference books, competitive test guides, and national journals",
            "Modern hygienic cafeteria serving balanced meals and light refreshments",
          ],
        },
        {
          heading: "Institutional Values & Safety",
          details: [
            "Zero-tolerance anti-ragging policy with student grievance committee",
            "Continuous CCTV surveillance across all public corridors and entrances",
            "Dedicated counselor on-campus for student mental wellness and exam resilience",
          ],
        },
      ],
    }),
  },
  academics: {
    title: "Academics & Curriculum",
    subtitle: "Departmental breakdown, board curriculum, and competitive coaching tracks",
    icon: GraduationCap,
    getContent: (campus) => ({
      highlights: [
        `Offered Streams: ${campus.combinations.join(", ")}`,
        "Karnataka Department of Pre-University Education (DPUE) affiliated curriculum",
        "Integrated coaching for KCET, JEE Main, NEET, and CA-Foundation",
        "Weekly unit assessments, monthly performance reviews, and doubt-clearing clinics",
      ],
      paragraphs: [
        `Academic delivery at ${campus.name} follows a rigorous, outcome-driven pedagogical framework. Faculty members combine textbook mastery with problem-solving heuristics essential for national entrance examinations.`,
        "In addition to regular syllabus completion by November each year, students undergo intensive revision cycles, previous 10-year question paper drills, and full-length simulated board examinations.",
      ],
      sections: [
        {
          heading: "Available Combinations at this Campus",
          details: campus.combinations.map(
            (c) =>
              `${c}: Comprehensive theoretical and practical laboratory coursework with integrated entrance prep.`
          ),
        },
        {
          heading: "Laboratory & Applied Learning",
          details: [
            "Optics, mechanics, and electronics stations with calibrated measuring instruments",
            "Titration and organic synthesis fume hoods with rigorous safety protocols",
            "Microscopy and specimen observation tables for botanical and zoological dissection",
            "Modern computing lab with high-speed internet and development environments for C++ and Python",
          ],
        },
      ],
    }),
  },
  admissions: {
    title: "Admissions & Eligibility",
    subtitle: "Admission guidelines, eligibility criteria, documentation, and fee structure",
    icon: FileCheck,
    getContent: (campus) => ({
      highlights: [
        "Open for 1st Year Pre-University (PUC 1 / Class 11)",
        "Minimum eligibility: Pass in Karnataka SSLC, CBSE 10th, ICSE 10th, or equivalent",
        "Direct merit-based seat allocation & early-bird scholarship evaluations",
        "Dedicated admission counselors available Monday through Saturday (9:00 AM - 4:30 PM)",
      ],
      paragraphs: [
        `Admissions to ${campus.name} are granted strictly on merit and subject to seat availability in the chosen combination. We welcome aspirants from all national and state examination boards.`,
        "Prospective students and parents are encouraged to visit the campus, meet the department heads, and inspect our academic infrastructure prior to confirming admission.",
      ],
      sections: [
        {
          heading: "Mandatory Documents for Admission",
          details: [
            "Original and 3 attested photocopies of Class 10th / SSLC Marks Card",
            "Transfer Certificate (TC) issued by the last attended school",
            "Conduct Certificate issued by the Head of Institution",
            "Caste & Income Certificate (if applying under reservation categories)",
            "4 recent passport-size and 2 stamp-size color photographs",
            "Aadhaar Card copy of the student and parent/guardian",
          ],
        },
        {
          heading: "Admission Procedure",
          details: [
            "Step 1: Submit the online enquiry or application form on our portal.",
            "Step 2: Attend a campus counseling session with our academic advisor.",
            "Step 3: Document verification and provisional seat reservation.",
            "Step 4: Fee payment confirmation and orientation welcome kit issuance.",
          ],
        },
      ],
    }),
  },
  "student-experience": {
    title: "Student Experience & Campus Life",
    subtitle: "Clubs, athletics, cultural fests, leadership councils, and community outreach",
    icon: Sparkles,
    getContent: (campus) => ({
      highlights: [
        "Active Student Council fostering governance and event leadership",
        "Over 12 active student clubs spanning robotics, literature, theatre, and eco-initiatives",
        "Annual inter-collegiate cultural and commerce fest with 1,500+ participants",
        "Comprehensive sports facilities including basketball, badminton, chess, and athletics",
      ],
      paragraphs: [
        `Life at ${campus.name} balances academic rigor with vibrant co-curricular experiences. Students discover lifelong passions, develop collaborative leadership abilities, and build lasting friendships.`,
        "Our dedicated student development coordinators ensure that every student actively participates in at least one club and sports discipline during their pre-university tenure.",
      ],
      sections: [
        {
          heading: "Clubs & Societies",
          details: [
            "STEM & Robotics Club: Hands-on micro-controller projects, science exhibits, and coding challenges",
            "Debating & Model United Nations (MUN): Rhetorical sparring, parliamentary debate, and current affairs analysis",
            "Commerce Guild: Virtual stock trading, entrepreneurship workshops, and business plan competitions",
            "Cultural & Performing Arts: Classical music, Western dance, drama, and fine arts exhibitions",
          ],
        },
        {
          heading: "Sports & Fitness Infrastructure",
          details: [
            "Floodlit outdoor multi-sport courts for volleyball and basketball",
            "Indoor games room equipped for table tennis, carrom, and competitive chess",
            "Annual Inter-Campus Sports Meet bringing together all 5 branch locations",
          ],
        },
      ],
    }),
  },
  guidance: {
    title: "College & Career Guidance Cell",
    subtitle: "Strategic pathway planning, university entrance coaching, and professional mentoring",
    icon: Compass,
    getContent: (campus) => ({
      highlights: [
        "One-on-one career counseling and psychometric stream assessment",
        "Specialist guidance for KCET, NEET, JEE, NDA, UCEED, NID, and CLAT",
        "University application mentorship for top Indian and overseas institutions",
        "Seminars with prominent industry professionals, doctors, engineers, and alumni",
      ],
      paragraphs: [
        `The Guidance Cell at ${campus.name} acts as a compass for young adults navigating crucial post-school career decisions. We demystify college entrance requirements, entrance timelines, and professional career avenues.`,
        "Through structured workshops starting in Term 1 of PUC 1, students develop clear roadmaps tailored to their individual aptitudes, whether targeting engineering, medicine, chartered accountancy, design, law, or civil services.",
      ],
      sections: [
        {
          heading: "Entrance Examination Preparation",
          details: [
            "Engineering Track: Rigorous problem solving for KCET and JEE Main with timed mock assessments",
            "Medical Track: Comprehensive NCERT-aligned coaching and biology diagram drill sessions for NEET",
            "Commerce Track: Conceptual foundation in mercantile law, auditing, and quantitative techniques for CA-Foundation & CSEET",
            "Liberal Arts & Law: Critical reasoning, legal aptitude, and general awareness workshops for CLAT and IPMAT",
          ],
        },
        {
          heading: "Alumni Mentorship Network",
          details: [
            "Quarterly interaction sessions with alumni enrolled in premier institutions (IITs, NITs, AIIMS, NLSIU, IIMs)",
            "Resume building and interview etiquette workshops for emerging internships",
          ],
        },
      ],
    }),
  },
};

const validCampuses = ["itpl", "hrbr", "btm", "byrathi", "nice-road"];
const validSubpages = ["about", "academics", "admissions", "student-experience", "guidance"];

export async function generateStaticParams() {
  const params: { campus: string; subpage: string }[] = [];
  for (const c of validCampuses) {
    for (const s of validSubpages) {
      params.push({ campus: c, subpage: s });
    }
  }
  return params;
}

export default async function CampusSubpage({
  params,
}: {
  params: Promise<{ campus: string; subpage: string }>;
}) {
  const { campus, subpage } = await params;
  const campusData = campusDatabase[campus];
  const meta = subpageMeta[subpage];

  if (!campusData || !meta) {
    notFound();
  }

  const PageIcon = meta.icon;
  const content = meta.getContent(campusData);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      {/* Breadcrumb Navigation */}
      <div className="flex items-center gap-2 text-xs text-[var(--muted)]">
        <Link href="/" className="hover:text-[var(--primary)] transition">
          Home
        </Link>
        <span>/</span>
        <Link href={`/campuses/${campus}`} className="hover:text-[var(--primary)] transition">
          {campusData.name.split("(")[0]}
        </Link>
        <span>/</span>
        <span className="text-[var(--primary)] font-bold">{meta.title}</span>
      </div>

      {/* Hero Header */}
      <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-[var(--primary)] via-[var(--primary-dark)] to-[var(--primary)] text-white shadow-xl space-y-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-white/10 text-[var(--accent)]">
            <PageIcon className="w-5 h-5" />
          </div>
          <span className="text-xs uppercase tracking-wider font-extrabold text-[var(--accent)]">
            {campusData.name}
          </span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold font-serif">{meta.title}</h1>
        <p className="text-sm sm:text-base text-white/80 max-w-2xl">{meta.subtitle}</p>
      </div>

      {/* Highlights Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {content.highlights.map((h, i) => (
          <div
            key={i}
            className="p-5 rounded-2xl bg-[var(--surface)] border border-[var(--border)] shadow-sm flex items-start gap-3"
          >
            <CheckCircle2 className="w-5 h-5 text-[var(--secondary)] shrink-0 mt-0.5" />
            <span className="text-xs font-medium text-[var(--text)]">{h}</span>
          </div>
        ))}
      </div>

      {/* Main Content & Sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Body */}
        <div className="lg:col-span-2 space-y-8">
          <div className="p-8 rounded-3xl bg-[var(--surface)] border border-[var(--border)] shadow-sm space-y-4 text-sm leading-relaxed text-[var(--text)]/90">
            {content.paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>

          {content.sections.map((sec, i) => (
            <div
              key={i}
              className="p-8 rounded-3xl bg-[var(--surface)] border border-[var(--border)] shadow-sm space-y-4"
            >
              <h3 className="text-lg font-bold text-[var(--primary)] font-serif border-b border-[var(--border)] pb-3">
                {sec.heading}
              </h3>
              <ul className="space-y-3">
                {sec.details.map((detail, di) => (
                  <li key={di} className="flex items-start gap-2.5 text-xs text-[var(--text)]/90">
                    <span className="w-1.5 h-1.5 rounded-full bg-[var(--secondary)] mt-1.5 shrink-0" />
                    <span>{detail}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Sidebar Navigation & Quick CTA */}
        <div className="space-y-6">
          <div className="p-6 rounded-3xl bg-[var(--tint)] border border-[var(--border)] space-y-4">
            <h4 className="text-xs font-bold text-[var(--primary)] uppercase tracking-wider">
              Explore {campusData.name.split("(")[0]}
            </h4>
            <div className="space-y-1.5 text-xs">
              {validSubpages.map((spKey) => {
                const isActive = spKey === subpage;
                const spMeta = subpageMeta[spKey];
                return (
                  <Link
                    key={spKey}
                    href={`/campuses/${campus}/${spKey}`}
                    className={`block px-3 py-2.5 rounded-xl font-medium transition ${
                      isActive
                        ? "bg-[var(--primary)] text-white shadow-sm"
                        : "hover:bg-[var(--surface)] text-[var(--text)]"
                    }`}
                  >
                    {spMeta.title}
                  </Link>
                );
              })}
            </div>
          </div>

          <div className="p-6 rounded-3xl bg-[var(--surface)] border border-[var(--border)] shadow-sm space-y-4">
            <h4 className="text-sm font-bold text-[var(--primary)] font-serif">Ready to Join Us?</h4>
            <p className="text-xs text-[var(--muted)]">
              Applications are currently open for the upcoming academic year across all science and commerce combinations.
            </p>
            <Link
              href={`/admissions/apply?campus=${encodeURIComponent(campusData.name)}`}
              className="w-full py-3 rounded-xl bg-[var(--accent)] hover:brightness-110 text-[var(--primary-dark)] font-extrabold text-xs uppercase tracking-wider block text-center shadow-md transition"
            >
              Apply Online Now
            </Link>
            <Link
              href="/contact"
              className="w-full py-2.5 rounded-xl border border-[var(--border)] hover:border-[var(--secondary)] text-[var(--text)] text-xs font-semibold block text-center transition"
            >
              Enquire About Admissions
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
