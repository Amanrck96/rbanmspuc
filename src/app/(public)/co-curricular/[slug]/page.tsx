import Link from "next/link";
import { notFound } from "next/navigation";
import {
  Compass,
  HeartPulse,
  Mountain,
  Briefcase,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Award,
  Users,
} from "lucide-react";

interface CoCurricularItem {
  slug: string;
  title: string;
  subtitle: string;
  icon: typeof Compass;
  intro: string;
  objectives: string[];
  keyInitiatives: { title: string; desc: string }[];
  impactStats: { value: string; label: string }[];
}

const coCurricularData: Record<string, CoCurricularItem> = {
  "career-guidance": {
    slug: "career-guidance",
    title: "Career Guidance & Pathways",
    subtitle: "Structured roadmap planning, competitive entrance coaching, and university placement mentorship",
    icon: Compass,
    intro:
      "Navigating post-PUC pathways requires informed, data-driven career guidance. Our Career Guidance Cell equips students with self-knowledge, entrance exam readiness, and early awareness of emerging professional avenues spanning engineering, health sciences, fintech, corporate law, design, and civil administration.",
    objectives: [
      "Psychometric aptitude profiling to match student strengths with suitable degree programs",
      "Integrated foundation modules for KCET, JEE Main, NEET, CA-Foundation, and CLAT",
      "Advisory sessions on international university applications, SAT, and IELTS/TOEFL requirements",
      "Regular guest lectures by distinguished industry leaders, civil servants, and university researchers",
    ],
    keyInitiatives: [
      {
        title: "Aptitude & Stream Matching",
        desc: "Administered at the start of PUC 1 to identify quantitative, spatial, and linguistic aptitudes for personalized career targeting.",
      },
      {
        title: "Entrance Exam Drills & Mock Series",
        desc: "Over 40 full-length simulated computer-based tests matching national testing formats and timed pressure.",
      },
      {
        title: "One-on-One Counseling Clinics",
        desc: "Dedicated personal sessions with certified educational counselors to resolve course selection dilemmas with parents.",
      },
      {
        title: "Alumni College Insights Panel",
        desc: "Direct roundtables with alumni studying at premier institutes (IITs, IIMs, AIIMS, NLSIU, BITS Pilani).",
      },
    ],
    impactStats: [
      { value: "94%", label: "First-Attempt Entrance Clearance" },
      { value: "40+", label: "Annual University Seminars" },
      { value: "1:1", label: "Personalized Career Mentoring" },
      { value: "500+", label: "Alumni in Premier Colleges" },
    ],
  },
  wellbeing: {
    slug: "wellbeing",
    title: "Student Wellbeing & Life Skills",
    subtitle: "Mental resilience, emotional health, mindfulness, and physical wellness programs",
    icon: HeartPulse,
    intro:
      "Academic excellence can only flourish when emotional and psychological wellbeing are prioritized. Our holistic wellness curriculum helps students manage adolescence, conquer examination stress, cultivate emotional regulation, and maintain healthy peer relationships throughout their pre-university journey.",
    objectives: [
      "Foster emotional intelligence, stress resilience, and self-regulation techniques",
      "Provide confidential, non-judgmental professional psychological counseling",
      "Conduct regular workshops on digital detox, sleep hygiene, and nutritional wellness",
      "Encourage active peer support networks and empathetic conflict resolution",
    ],
    keyInitiatives: [
      {
        title: "Confidential Student Counseling",
        desc: "Qualified, resident psychologists available every weekday across all campuses for individual counseling and pastoral support.",
      },
      {
        title: "Mindfulness & Stress Buster Sessions",
        desc: "Weekly breathing, progressive relaxation, and focusing exercises conducted prior to exams to mitigate test anxiety.",
      },
      {
        title: "Digital Wellness & Screen Balance",
        desc: "Empowering students to overcome social media addiction, manage screen time, and maintain productive study routines.",
      },
      {
        title: "Nutrition & Physical Vitality Seminars",
        desc: "Practical advice on brain nutrition, hydration, and regular exercise during demanding academic phases.",
      },
    ],
    impactStats: [
      { value: "100%", label: "Confidential Support Access" },
      { value: "5", label: "Full-Time Campus Counselors" },
      { value: "24", label: "Annual Wellness Workshops" },
      { value: "0", label: "Tolerance for Bullying & Harassment" },
    ],
  },
  "outbound-learning": {
    slug: "outbound-learning",
    title: "Outbound Learning & Field Expeditions",
    subtitle: "Experiential outdoor education, ecological expeditions, and industrial site tours",
    icon: Mountain,
    intro:
      "Learning extends far beyond lecture halls and laboratory benches. Our outbound learning expeditions immerse students in real-world environmental reserves, high-tech manufacturing plants, scientific observatories, and historical landmarks to build teamwork, adaptability, and observational acumen.",
    objectives: [
      "Bridge classroom theory with tangible industrial and environmental realities",
      "Cultivate outdoor leadership, collaborative teamwork, and situational resilience",
      "Expose students to ecological conservation, biodiversity reserves, and sustainability challenges",
      "Stimulate creative problem-solving outside conventional structured academic environments",
    ],
    keyInitiatives: [
      {
        title: "Western Ghats Biodiversity Study",
        desc: "Annual 3-day field biology expedition for science students exploring endemic flora, fauna, and riparian ecosystems.",
      },
      {
        title: "Advanced Manufacturing & Tech Tours",
        desc: "Guided industrial visits to aerospace, semiconductor, and robotics engineering hubs in Bengaluru.",
      },
      {
        title: "Historical & Heritage Documentaries",
        desc: "Architectural and socio-economic field trips to heritage sites including Hampi, Belur-Halebid, and Srirangapatna.",
      },
      {
        title: "Community Service & Village Immersion",
        desc: "Hands-on rural literacy and public health awareness camps instilling civic responsibility and grassroots empathy.",
      },
    ],
    impactStats: [
      { value: "15+", label: "Field Expeditions Annually" },
      { value: "100%", label: "Student Safety Compliance" },
      { value: "3,000+", label: "Hours in Real-World Settings" },
      { value: "12", label: "Industry & Nature Partners" },
    ],
  },
  "work-exposure": {
    slug: "work-exposure",
    title: "Work Exposure & Industry Shadowing",
    subtitle: "Mini-internships, corporate mentorship, and early professional work exposure",
    icon: Briefcase,
    intro:
      "Early professional exposure gives pre-university students a tremendous competitive edge. Through structured vacation shadowing, fintech simulations, startup incubators, and research laboratory attachments, our students glimpse the everyday reality of modern professions before making university commitments.",
    objectives: [
      "Provide early firsthand exposure to commercial workplaces and startup culture",
      "Develop foundational workplace competencies: business etiquette, presentation, and data analysis",
      "Connect students with accomplished working mentors in science, finance, and legal fields",
      "Foster an entrepreneurial mindset capable of identifying market needs and building solutions",
    ],
    keyInitiatives: [
      {
        title: "Summer Corporate Shadowing (1-2 Weeks)",
        desc: "Curated vacation attachments pairing students with executives in IT, banking, architecture, and healthcare.",
      },
      {
        title: "Commerce & Fintech Business Lab",
        desc: "Simulation workshops where students manage mock portfolios, analyze financial balance sheets, and pitch venture models.",
      },
      {
        title: "Maker-Spaces & App Development Sprints",
        desc: "Collaborative weekend hackathons focusing on solving civic issues in Bengaluru using open-source tools and IoT devices.",
      },
      {
        title: "Legal & Public Policy Mock Moot Court",
        desc: "Case analysis and oral advocacy practice guided by practicing advocates and judicial fellows.",
      },
    ],
    impactStats: [
      { value: "250+", label: "Corporate Shadowing Seats" },
      { value: "35+", label: "Partner Companies & Startups" },
      { value: "100%", label: "Practical Skill Focused" },
      { value: "12", label: "Student Startup Pitches Mentored" },
    ],
  },
};

export async function generateStaticParams() {
  return [
    { slug: "career-guidance" },
    { slug: "wellbeing" },
    { slug: "outbound-learning" },
    { slug: "work-exposure" },
  ];
}

export default async function CoCurricularPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const item = coCurricularData[slug];

  if (!item) {
    notFound();
  }

  const PageIcon = item.icon;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs text-gray-500">
        <Link href="/" className="hover:text-black transition">
          Home
        </Link>
        <span>/</span>
        <span className="text-gray-500">Co-Curricular</span>
        <span>/</span>
        <span className="text-black font-bold">{item.title}</span>
      </div>

      {/* Hero Banner */}
      <div className="p-8 sm:p-12 rounded-3xl bg-white text-black border border-gray-200 shadow-sm space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gray-100 text-black text-xs font-bold uppercase tracking-wider border border-gray-300">
          <PageIcon className="w-4 h-4 text-black" /> Holistic Education Pillar
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold font-serif text-black">{item.title}</h1>
        <p className="text-sm sm:text-base text-gray-700 max-w-2xl leading-relaxed">
          {item.subtitle}
        </p>
      </div>

      {/* Impact Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {item.impactStats.map((st, i) => (
          <div
            key={i}
            className="p-6 rounded-2xl bg-white border border-gray-200 shadow-xs text-center space-y-1"
          >
            <div className="text-2xl sm:text-3xl font-extrabold text-black">
              {st.value}
            </div>
            <div className="text-xs text-gray-500 font-medium">{st.label}</div>
          </div>
        ))}
      </div>

      {/* Overview & Objectives */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <div className="p-8 rounded-3xl bg-white border border-gray-200 shadow-xs space-y-4 text-sm leading-relaxed text-black">
            <h2 className="text-xl font-bold text-black font-serif">Pillar Overview</h2>
            <p>{item.intro}</p>
          </div>

          <div className="p-8 rounded-3xl bg-gray-50 border border-gray-200 space-y-4">
            <h3 className="text-lg font-bold text-black font-serif">
              Core Strategic Objectives
            </h3>
            <div className="space-y-3 pt-2">
              {item.objectives.map((obj, i) => (
                <div key={i} className="flex items-start gap-3 text-xs text-black">
                  <CheckCircle2 className="w-4 h-4 text-black shrink-0 mt-0.5" />
                  <span>{obj}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Key Initiatives */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-black font-serif">
              Featured Initiatives &amp; Activities
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {item.keyInitiatives.map((init, i) => (
                <div
                  key={i}
                  className="p-6 rounded-2xl bg-white border border-gray-200 shadow-xs space-y-2 hover:border-black transition"
                >
                  <h4 className="font-bold text-sm text-black">{init.title}</h4>
                  <p className="text-xs text-gray-600 leading-relaxed">{init.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar Nav for other Co-Curricular */}
        <div className="space-y-6">
          <div className="p-6 rounded-3xl bg-white border border-gray-200 shadow-xs space-y-4">
            <h4 className="text-xs font-bold text-black uppercase tracking-wider">
              Co-Curricular Pillars
            </h4>
            <div className="space-y-2 text-xs">
              {Object.values(coCurricularData).map((cc) => {
                const active = cc.slug === slug;
                return (
                  <Link
                    key={cc.slug}
                    href={`/co-curricular/${cc.slug}`}
                    className={`block px-3.5 py-2.5 rounded-xl font-medium transition ${
                      active
                        ? "bg-black text-white shadow-xs font-bold"
                        : "hover:bg-gray-100 text-black"
                    }`}
                  >
                    {cc.title}
                  </Link>
                );
              })}
            </div>
          </div>

          <div className="p-6 rounded-3xl bg-white text-black border border-gray-200 shadow-sm space-y-4">
            <div className="text-xs uppercase tracking-wider font-bold text-black">
              Admissions 2025-26
            </div>
            <h4 className="text-base font-bold font-serif text-black">Experience Holistic Growth</h4>
            <p className="text-xs text-gray-700">
              Join an institution that prioritizes academic depth, emotional resilience, and authentic leadership.
            </p>
            <Link
              href="/admissions/apply"
              className="w-full py-2.5 rounded-xl bg-white hover:bg-gray-100 text-black border-2 border-black font-extrabold text-xs uppercase tracking-wider block text-center shadow-xs transition"
            >
              Apply Online
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
