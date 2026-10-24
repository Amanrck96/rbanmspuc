import Link from "next/link";
import {
  Briefcase,
  GraduationCap,
  Sparkles,
  Users,
  Award,
  HeartHandshake,
  CheckCircle2,
  Mail,
  MapPin,
  Clock,
  ArrowRight,
} from "lucide-react";

export default function CareersPage() {
  const openings = [
    {
      title: "Senior Lecturer in Physics (PUC I & II)",
      department: "Science",
      campuses: "ITPL & HRBR Layout",
      experience: "5+ Years",
      qualification: "M.Sc. Physics (B.Ed. preferred), KCET/JEE coaching experience required.",
      type: "Full-Time",
    },
    {
      title: "Lecturer in Accountancy & Business Studies",
      department: "Commerce",
      campuses: "BTM Layout & Byrathi",
      experience: "3+ Years",
      qualification: "M.Com / MBA / CA-Inter, passion for active business case studies.",
      type: "Full-Time",
    },
    {
      title: "Lecturer in Mathematics & Statistics",
      department: "Mathematics",
      campuses: "NICE Road Campus",
      experience: "4+ Years",
      qualification: "M.Sc. Mathematics / Statistics, strong command of calculus and analytical geometry.",
      type: "Full-Time",
    },
    {
      title: "Student Wellness Counselor & Psychologist",
      department: "Student Affairs",
      campuses: "HRBR & ITPL Campuses",
      experience: "3+ Years",
      qualification: "M.Sc. / M.A. Applied Psychology or Clinical Counseling.",
      type: "Full-Time",
    },
    {
      title: "Physical Education Director & Sports Coach",
      department: "Physical Education",
      campuses: "Byrathi Campus",
      experience: "3+ Years",
      qualification: "M.P.Ed. with expertise in basketball, track athletics, and tournament management.",
      type: "Full-Time",
    },
  ];

  const benefits = [
    {
      icon: Award,
      title: "Competitive Compensation",
      desc: "UGC / State board aligned pay scales with annual merit-based performance bonuses and PF.",
    },
    {
      icon: GraduationCap,
      title: "Academic Research Support",
      desc: "Financial assistance for faculty pursuing Ph.D. degrees, publishing papers, or attending national symposiums.",
    },
    {
      icon: HeartHandshake,
      title: "Medical & Health Coverage",
      desc: "Comprehensive group health insurance coverage for faculty members and immediate dependents.",
    },
    {
      icon: Sparkles,
      title: "Staff Child Fee Concessions",
      desc: "Generous tuition fee waivers for children of permanent faculty across all group institutions.",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs text-gray-500">
        <Link href="/" className="hover:text-black transition">
          Home
        </Link>
        <span>/</span>
        <span className="text-black font-bold">Careers</span>
      </div>

      {/* Hero Header */}
      <div className="p-8 sm:p-12 rounded-3xl bg-white text-black border border-gray-200 shadow-sm space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gray-100 text-black text-xs font-bold uppercase tracking-wider border border-gray-300">
          <Briefcase className="w-3.5 h-3.5 text-black" /> Join Our Academic Community
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold font-serif text-black">
          Shape the Leaders of Tomorrow
        </h1>
        <p className="text-sm sm:text-base text-gray-700 max-w-2xl leading-relaxed">
          We invite passionate educators, subject mentors, and administrative professionals who are committed to mentoring students during their formative pre-university years.
        </p>
      </div>

      {/* Why Teach With Us */}
      <div className="space-y-6">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <h2 className="text-2xl sm:text-3xl font-bold text-black font-serif">
            Why Build Your Career With Us?
          </h2>
          <p className="text-xs sm:text-sm text-gray-600">
            A collaborative, research-oriented environment designed to nurture your professional and pedagogical growth.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((b, i) => {
            const Icon = b.icon;
            return (
              <div
                key={i}
                className="p-6 rounded-2xl bg-white border border-gray-200 shadow-xs space-y-3"
              >
                <div className="p-3 w-fit rounded-xl bg-gray-100 text-black border border-gray-300">
                  <Icon className="w-5 h-5 text-black" />
                </div>
                <h3 className="font-bold text-sm text-black">{b.title}</h3>
                <p className="text-xs text-gray-600 leading-relaxed">{b.desc}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Current Openings */}
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-200 pb-4">
          <div>
            <h2 className="text-2xl font-bold text-black font-serif">
              Current Faculty &amp; Staff Openings
            </h2>
            <p className="text-xs text-gray-600">Academic Year 2025-26 recruitment cycle</p>
          </div>
          <span className="text-xs font-bold text-black bg-gray-100 border border-gray-300 px-3 py-1 rounded-full w-fit">
            {openings.length} Positions Available
          </span>
        </div>

        <div className="space-y-4">
          {openings.map((job, i) => (
            <div
              key={i}
              className="p-6 rounded-2xl bg-white border border-gray-200 shadow-xs hover:border-black transition flex flex-col md:flex-row md:items-center justify-between gap-6"
            >
              <div className="space-y-2 max-w-2xl">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-md text-[10px] font-extrabold uppercase tracking-wider bg-gray-100 text-black border border-gray-300">
                    {job.department}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-md text-[10px] font-semibold bg-gray-100 text-black border border-gray-300">
                    {job.type}
                  </span>
                </div>
                <h3 className="text-base sm:text-lg font-bold text-black font-serif">
                  {job.title}
                </h3>
                <p className="text-xs text-gray-600">{job.qualification}</p>
                <div className="flex flex-wrap gap-4 text-xs text-gray-500 pt-1">
                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-black" /> {job.campuses}
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-black" /> {job.experience}
                  </div>
                </div>
              </div>

              <div className="shrink-0">
                <Link
                  href={`/contact?subject=${encodeURIComponent("Careers: " + job.title)}`}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white hover:bg-gray-100 text-black border border-black text-xs font-bold transition shadow-xs"
                >
                  Apply for Position <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Direct Application CTA */}
      <div className="p-8 sm:p-10 rounded-3xl bg-white border border-gray-200 flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm">
        <div className="space-y-2 text-center md:text-left">
          <h3 className="text-xl font-bold text-black font-serif">
            Don&apos;t see your subject area listed?
          </h3>
          <p className="text-xs sm:text-sm text-gray-600 max-w-xl">
            We are always eager to meet exceptional educators. Send your CV and a statement of teaching philosophy directly to our talent acquisition team.
          </p>
        </div>
        <div className="shrink-0 flex flex-col sm:flex-row gap-3">
          <Link
            href="/contact?subject=General+Faculty+Application"
            className="px-6 py-3 rounded-xl bg-white hover:bg-gray-100 text-black border-2 border-black font-extrabold text-xs uppercase tracking-wider text-center shadow-xs transition"
          >
            Submit General Resume
          </Link>
        </div>
      </div>
    </div>
  );
}
