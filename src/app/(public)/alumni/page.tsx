import Link from "next/link";
import {
  GraduationCap,
  Users,
  Award,
  Globe2,
  HeartHandshake,
  MessageSquare,
  Sparkles,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";

export default function AlumniPage() {
  const alumniSpotlights = [
    {
      name: "Aditya Hegde",
      batch: "Class of 2018 (PCMC)",
      campus: "ITPL Campus",
      current: "Senior Software Engineer, Google Cloud",
      education: "B.Tech in Computer Science, NIT Surathkal",
      quote:
        "The competitive coding sessions and rigorous math foundations laid down during my PU years gave me the exact analytical stamina needed for engineering school.",
    },
    {
      name: "Dr. Ananya Rao",
      batch: "Class of 2017 (PCMB)",
      campus: "HRBR Layout Campus",
      current: "Resident Physician, AIIMS New Delhi",
      education: "MBBS, Bangalore Medical College (BMCRI)",
      quote:
        "Our biology lecturers didn't just teach for the boards—they trained us to dissect complex medical concepts from first principles. That mindset made all the difference in NEET.",
    },
    {
      name: "Kavya Subramaniam",
      batch: "Class of 2019 (CEBA)",
      campus: "BTM Layout Campus",
      current: "Associate, Bain & Company",
      education: "B.Com (Hons), SRCC & MBA, IIM Bangalore",
      quote:
        "The commerce faculty fostered real-world business acumen through case discussions and mock trading, sparking my lifelong passion for corporate finance.",
    },
  ];

  const initiatives = [
    {
      icon: Users,
      title: "Alumni-Student Mentorship",
      desc: "Connect one-on-one with current PU students to guide them on entrance exams, college selection, and career pathways.",
    },
    {
      icon: MessageSquare,
      title: "Guest Masterclasses",
      desc: "Deliver interactive weekend lectures sharing insights from your professional domain in tech, medicine, finance, or law.",
    },
    {
      icon: Award,
      title: "Alumni Merit Scholarships",
      desc: "Sponsor tuition grants for deserving, high-achieving students from economically challenged backgrounds.",
    },
    {
      icon: Globe2,
      title: "Global Chapter Meetups",
      desc: "Connect with fellow graduates across chapters in Bengaluru, Mumbai, London, Singapore, and San Francisco.",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs text-[var(--muted)]">
        <Link href="/" className="hover:text-[var(--primary)] transition">
          Home
        </Link>
        <span>/</span>
        <span className="text-[var(--primary)] font-bold">Alumni Network</span>
      </div>

      {/* Hero Header */}
      <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-[var(--primary)] via-[var(--primary-dark)] to-[var(--primary)] text-white shadow-xl space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-[var(--accent)] text-xs font-bold uppercase tracking-wider">
          <GraduationCap className="w-4 h-4" /> Global Alumni Association
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold font-serif">
          Connected for Life, Inspiring the Future
        </h1>
        <p className="text-sm sm:text-base text-white/80 max-w-2xl leading-relaxed">
          Our alumni community spans continents and disciplines—from visionary tech innovators and healthcare pioneers to corporate leaders and legal scholars.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { value: "12,000+", label: "Alumni Worldwide" },
          { value: "5", label: "Campus Alumni Chapters" },
          { value: "45+", label: "Annual Mentorship Sessions" },
          { value: "₹25L+", label: "Alumni Scholarship Endowments" },
        ].map((st, i) => (
          <div
            key={i}
            className="p-6 rounded-2xl bg-[var(--surface)] border border-[var(--border)] shadow-sm text-center space-y-1"
          >
            <div className="text-2xl sm:text-3xl font-extrabold text-[var(--primary)]">
              {st.value}
            </div>
            <div className="text-xs text-[var(--muted)] font-medium">{st.label}</div>
          </div>
        ))}
      </div>

      {/* Alumni Spotlights */}
      <div className="space-y-6">
        <div className="space-y-1">
          <h2 className="text-2xl sm:text-3xl font-bold text-[var(--primary)] font-serif">
            Distinguished Alumni Spotlights
          </h2>
          <p className="text-xs sm:text-sm text-[var(--muted)]">
            Stories of purpose, perseverance, and leadership from our graduates.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {alumniSpotlights.map((alumnus, i) => (
            <div
              key={i}
              className="p-6 rounded-2xl bg-[var(--surface)] border border-[var(--border)] shadow-sm flex flex-col justify-between space-y-4 hover:border-[var(--secondary)] transition"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-extrabold uppercase tracking-wider bg-[var(--tint)] text-[var(--primary)] px-2.5 py-1 rounded-md">
                    {alumnus.batch}
                  </span>
                  <span className="text-[10px] text-[var(--muted)] font-semibold">
                    {alumnus.campus}
                  </span>
                </div>
                <div>
                  <h3 className="font-bold text-base text-[var(--primary)] font-serif">
                    {alumnus.name}
                  </h3>
                  <p className="text-xs font-semibold text-[var(--secondary)]">{alumnus.current}</p>
                  <p className="text-[11px] text-[var(--muted)] mt-0.5">{alumnus.education}</p>
                </div>
                <p className="text-xs text-[var(--text)]/80 italic leading-relaxed border-l-2 border-[var(--accent)] pl-3">
                  &ldquo;{alumnus.quote}&rdquo;
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Ways to Give Back & Engage */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-[var(--primary)] font-serif">
          Ways to Engage &amp; Give Back
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {initiatives.map((item, i) => {
            const Icon = item.icon;
            return (
              <div
                key={i}
                className="p-6 rounded-2xl bg-[var(--surface)] border border-[var(--border)] shadow-sm space-y-3"
              >
                <div className="p-3 w-fit rounded-xl bg-[var(--tint)] text-[var(--secondary)]">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-sm text-[var(--primary)]">{item.title}</h3>
                <p className="text-xs text-[var(--muted)] leading-relaxed">{item.desc}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Alumni Registration Form CTA */}
      <div className="p-8 sm:p-12 rounded-3xl bg-[var(--tint)] border border-[var(--border)] text-center space-y-4 max-w-3xl mx-auto">
        <h3 className="text-2xl font-bold text-[var(--primary)] font-serif">
          Are you a Graduate? Stay in Touch!
        </h3>
        <p className="text-xs sm:text-sm text-[var(--muted)] max-w-xl mx-auto">
          Register with our alumni portal to receive reunion invitations, quarterly institutional updates, and opportunities to mentor young aspirants.
        </p>
        <div className="pt-2 flex flex-col sm:flex-row justify-center gap-3">
          <Link
            href="/contact?subject=Alumni+Network+Registration"
            className="px-8 py-3 rounded-xl bg-[var(--primary)] hover:bg-[var(--primary-dark)] text-white text-xs font-bold uppercase tracking-wider transition shadow-md"
          >
            Register With Alumni Portal
          </Link>
        </div>
      </div>
    </div>
  );
}
