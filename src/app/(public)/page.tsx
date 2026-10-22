import Link from "next/link";
import NewsletterForm from "@/components/NewsletterForm";
import {
  GraduationCap,
  Building2,
  BookOpen,
  ArrowRight,
  Sparkles,
  MapPin,
  CheckCircle2,
  Users,
  Compass,
  Trophy,
  Briefcase,
  Quote,
  Send,
  Calendar,
  ExternalLink,
} from "lucide-react";

export default function HomePage() {
  const campuses = [
    {
      id: "itpl",
      name: "ITPL Campus",
      area: "Whitefield, East Bengaluru",
      tagline: "STEM Innovation & Tech Corridor Hub",
      combinations: "PCMB, PCMC, CEBA",
      highlight: "Advanced Physics & AI Computing Center",
      link: "/campuses/itpl",
    },
    {
      id: "hrbr",
      name: "HRBR Layout Campus",
      area: "Kalyan Nagar, North Bengaluru",
      tagline: "Premier Academic & Cultural Campus",
      combinations: "PCMB, PCMC, CEBA, SEBA",
      highlight: "High Distinction Record & Active Debate Guild",
      link: "/campuses/hrbr",
    },
    {
      id: "btm",
      name: "BTM Layout Campus",
      area: "2nd Stage, South Bengaluru",
      tagline: "Commerce Leadership & Analytical Hub",
      combinations: "PCMC, CEBA, SEBA",
      highlight: "Fintech Lab & CA-Foundation Incubation",
      link: "/campuses/btm",
    },
    {
      id: "byrathi",
      name: "Byrathi Campus",
      area: "Off Hennur Main Road",
      tagline: "Expansive Green Campus & Athletics",
      combinations: "PCMB, PCMC, CEBA",
      highlight: "International-standard Athletics & Natural Science Lab",
      link: "/campuses/byrathi",
    },
    {
      id: "nice-road",
      name: "NICE Road Campus",
      area: "South-West Junction",
      tagline: "Modern Integrated Learning Center",
      combinations: "PCMB, PCMC, SEBA",
      highlight: "Digital Smart Classrooms & Robotics Workshops",
      link: "/campuses/nice-road",
    },
  ];

  return (
    <div className="space-y-16 sm:space-y-24 pb-16">
      {/* 1. HERO SLIDER / BANNER WITH ADMISSIONS CTA (Section 7B) */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[var(--primary)] via-[var(--primary-dark)] to-[var(--primary)] text-white py-20 lg:py-28 px-4 sm:px-6 lg:px-8 border-b border-white/10">
        {/* Subtle decorative glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[var(--secondary-soft)]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-10 w-96 h-96 bg-[var(--accent)]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-5xl mx-auto text-center space-y-6 relative z-10">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-[var(--accent)] text-xs font-extrabold uppercase tracking-widest backdrop-blur-md shadow-xs animate-fade-in">
            <Sparkles className="w-3.5 h-3.5 text-[var(--accent)]" />
            <span>Admissions Open for Academic Year 2025–2026</span>
          </div>

          {/* 2. HERO HEADLINE & INTRO (Section 7B) */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight font-serif leading-[1.15] text-white">
            Nurturing Thinkers, Innovators &amp; <span className="text-[var(--accent)]">Future Leaders</span>
          </h1>

          <p className="text-base sm:text-lg text-white/80 max-w-2xl mx-auto font-sans leading-relaxed">
            A premier pre-university learning community spanning 5 state-of-the-art campuses across Bengaluru. Integrating rigorous Karnataka PU Board curriculum with targeted competitive exam mastery.
          </p>

          {/* 2 CTA Buttons */}
          <div className="pt-4 flex flex-wrap justify-center gap-4">
            <Link
              href="/admissions/apply"
              className="px-7 py-3.5 rounded-2xl bg-[var(--accent)] hover:brightness-110 text-[var(--primary-dark)] font-extrabold text-sm uppercase tracking-wider shadow-xl transition transform hover:-translate-y-0.5"
            >
              Begin Your Application →
            </Link>
            <Link
              href="/contact"
              className="px-7 py-3.5 rounded-2xl border-2 border-[var(--secondary)] hover:bg-[var(--secondary)]/20 text-white font-bold text-sm tracking-wider transition"
            >
              Schedule Campus Visit
            </Link>
          </div>

          {/* Quick Stat Strip */}
          <div className="pt-10 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto border-t border-white/15">
            <div>
              <div className="text-2xl sm:text-3xl font-extrabold text-[var(--accent)] font-serif">99.2%</div>
              <div className="text-xs text-white/70 font-medium">Board Pass Record</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-extrabold text-[var(--accent)] font-serif">5</div>
              <div className="text-xs text-white/70 font-medium">Bengaluru Campuses</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-extrabold text-[var(--accent)] font-serif">120+</div>
              <div className="text-xs text-white/70 font-medium">Experienced Faculty</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-extrabold text-[var(--accent)] font-serif">15,000+</div>
              <div className="text-xs text-white/70 font-medium">Global Alumni Network</div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. "OUR LEGACY" SECTION (Section 7B) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-12 rounded-3xl bg-[var(--tint)] border border-[var(--border)] shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-8 space-y-4">
            <span className="text-xs font-extrabold text-[var(--secondary)] uppercase tracking-widest">
              Institutional Heritage &amp; Ethos
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[var(--primary)] font-serif">
              Our Legacy: Decades of Academic Distinction
            </h2>
            <p className="text-sm text-[var(--text)]/85 leading-relaxed">
              Established with an enduring commitment to accessible, world-class education, our institutions have empowered generations of students in Bengaluru. Our dual-focus philosophy pairs uncompromising intellectual curiosity with ethical leadership, equipping students to secure premier admissions into IITs, NITs, AIIMS, and top commerce universities across the globe.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
              <div className="p-3 rounded-2xl bg-[var(--surface)] border border-[var(--border)]">
                <div className="font-bold text-xs text-[var(--primary)]">Holistic Pedagogy</div>
                <div className="text-[11px] text-[var(--muted)]">Concept mastery over rote memorization</div>
              </div>
              <div className="p-3 rounded-2xl bg-[var(--surface)] border border-[var(--border)]">
                <div className="font-bold text-xs text-[var(--primary)]">Micro-Mentorship</div>
                <div className="text-[11px] text-[var(--muted)]">1:15 counselor-to-student pastoral care</div>
              </div>
              <div className="p-3 rounded-2xl bg-[var(--surface)] border border-[var(--border)]">
                <div className="font-bold text-xs text-[var(--primary)]">Modern Infrastructure</div>
                <div className="text-[11px] text-[var(--muted)]">Smart labs &amp; digital research centers</div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-4 flex flex-col items-center justify-center p-6 rounded-2xl bg-[var(--surface)] border border-[var(--border)] text-center space-y-3">
            <div className="w-16 h-16 rounded-3xl bg-[var(--tint)] flex items-center justify-center text-[var(--primary)]">
              <Building2 className="w-8 h-8" />
            </div>
            <div className="font-extrabold text-sm text-[var(--primary)] font-serif">Recognized &amp; Accredited</div>
            <p className="text-xs text-[var(--muted)]">
              Fully approved by the Department of Pre-University Education, Government of Karnataka.
            </p>
            <Link
              href="/about"
              className="text-xs font-bold text-[var(--secondary)] hover:text-[var(--primary)] flex items-center gap-1 pt-1"
            >
              Learn More About Our Journey →
            </Link>
          </div>
        </div>
      </section>

      {/* 4. "OUR CAMPUSES": 5 CAMPUS CARDS LINKING TO CAMPUS PAGES (Section 7B) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center space-y-2 max-w-2xl mx-auto">
          <span className="text-xs font-extrabold text-[var(--secondary)] uppercase tracking-widest">
            Five Premier Locations Across Bengaluru
          </span>
          <h2 className="text-3xl font-extrabold text-[var(--primary)] font-serif">
            Explore Our Campuses
          </h2>
          <p className="text-xs sm:text-sm text-[var(--muted)]">
            Each branch offers modern laboratories, expert faculty, and seamless transport connectivity.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {campuses.map((c, idx) => (
            <div
              key={c.id}
              className={`rounded-2xl bg-[var(--surface)] border border-[var(--border)] shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden flex flex-col justify-between ${
                idx === 4 ? "md:col-span-2 lg:col-span-1" : ""
              }`}
            >
              {/* Gradient Top Strip (Section 7C) */}
              <div className="h-2.5 bg-gradient-to-r from-[var(--secondary)] via-[var(--secondary-soft)] to-[var(--accent)]" />

              <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-[var(--tint)] text-[var(--primary)]">
                      Branch #{idx + 1}
                    </span>
                    <span className="text-xs text-[var(--muted)] flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-[var(--secondary)]" /> {c.area.split(",")[0]}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-[var(--primary)] font-serif">
                    {c.name}
                  </h3>
                  <p className="text-xs text-[var(--secondary)] font-semibold">
                    {c.tagline}
                  </p>
                  <p className="text-xs text-[var(--text)]/80 leading-relaxed">
                    {c.highlight}
                  </p>
                </div>

                <div className="pt-4 border-t border-[var(--border)] space-y-3">
                  <div className="text-[11px] text-[var(--muted)]">
                    <strong className="text-[var(--text)]">Combinations:</strong> {c.combinations}
                  </div>
                  <Link
                    href={c.link}
                    className="w-full py-2.5 rounded-xl bg-[var(--tint)] hover:bg-[var(--primary)] hover:text-white text-[var(--primary)] text-xs font-bold text-center transition flex items-center justify-center gap-1.5"
                  >
                    <span>View Campus Details</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. "PRE UNIVERSITY EDUCATION" SECTION (Section 7B) */}
      <section className="bg-[var(--tint)] py-16 px-4 sm:px-6 lg:px-8 border-y border-[var(--border)]">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div className="space-y-5">
            <span className="text-xs font-extrabold text-[var(--secondary)] uppercase tracking-widest">
              2-Year Integrated Program
            </span>
            <h2 className="text-3xl font-extrabold text-[var(--primary)] font-serif leading-tight">
              A Bridge to University Excellence &amp; Professional Careers
            </h2>
            <p className="text-sm text-[var(--text)]/85 leading-relaxed">
              The Pre-University stage (Classes XI and XII) defines a student’s future trajectory. Our integrated model delivers comprehensive preparation for Karnataka State PU Board exams alongside targeted coaching for national competitive examinations.
            </p>
            <ul className="space-y-3 text-xs sm:text-sm text-[var(--text)]/90">
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[var(--secondary)] shrink-0 mt-0.5" />
                <span><strong>Rigorous NCERT Mapping:</strong> Every concept deconstructed from foundational principles to advanced applications.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[var(--secondary)] shrink-0 mt-0.5" />
                <span><strong>Weekly Simulated Testing:</strong> Unit tests, chapter milestones, and full board preparatory simulations.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[var(--secondary)] shrink-0 mt-0.5" />
                <span><strong>Doubt-Resolution Clinics:</strong> Daily dedicated post-class hours with senior subject matter experts.</span>
              </li>
            </ul>
          </div>

          <div className="p-8 rounded-3xl bg-[var(--surface)] border border-[var(--border)] shadow-md space-y-6">
            <h3 className="text-lg font-bold text-[var(--primary)] font-serif border-b border-[var(--border)] pb-3">
              Program Highlights
            </h3>
            <div className="grid grid-cols-2 gap-4 text-xs">
              <div className="p-3 rounded-xl bg-[var(--tint)]/50">
                <span className="text-[var(--muted)] block">Duration</span>
                <span className="font-bold text-[var(--primary)] text-sm">2 Academic Years</span>
              </div>
              <div className="p-3 rounded-xl bg-[var(--tint)]/50">
                <span className="text-[var(--muted)] block">Curriculum</span>
                <span className="font-bold text-[var(--primary)] text-sm">Karnataka PU Board</span>
              </div>
              <div className="p-3 rounded-xl bg-[var(--tint)]/50">
                <span className="text-[var(--muted)] block">Language Options</span>
                <span className="font-bold text-[var(--primary)] text-sm">English, Kannada, Hindi</span>
              </div>
              <div className="p-3 rounded-xl bg-[var(--tint)]/50">
                <span className="text-[var(--muted)] block">Admissions Status</span>
                <span className="font-bold text-emerald-600 dark:text-emerald-400 text-sm">Now Enrolling</span>
              </div>
            </div>
            <Link
              href="/admissions"
              className="w-full py-3 rounded-xl bg-[var(--primary)] hover:bg-[var(--primary-dark)] text-white text-xs font-bold uppercase tracking-wider block text-center shadow-md transition"
            >
              Explore Admission Guidelines
            </Link>
          </div>
        </div>
      </section>

      {/* 6. "PURPOSE" STATEMENT BLOCK (Section 7B) */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
        <span className="text-xs font-extrabold text-[var(--secondary)] uppercase tracking-widest">
          Our Guiding Philosophy
        </span>
        <blockquote className="text-2xl sm:text-3xl font-extrabold text-[var(--primary)] font-serif leading-snug">
          &ldquo;To empower inquiring minds with intellectual rigor, moral purpose, and the resilience to lead in a rapidly changing world.&rdquo;
        </blockquote>
        <p className="text-xs sm:text-sm text-[var(--muted)] max-w-xl mx-auto">
          We believe education extends beyond scorecards. Our community champions empathy, collaborative problem solving, and civic awareness.
        </p>
      </section>

      {/* 7. "ACADEMICS": SCIENCE & COMMERCE STREAM CARDS (Section 7B) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center space-y-2">
          <span className="text-xs font-extrabold text-[var(--secondary)] uppercase tracking-widest">
            Academic Combinations
          </span>
          <h2 className="text-3xl font-extrabold text-[var(--primary)] font-serif">
            Science &amp; Commerce Streams
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Science Stream Card */}
          <div className="p-8 rounded-3xl bg-[var(--surface)] border border-[var(--border)] shadow-md space-y-5 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-950/60 text-blue-800 dark:text-blue-300 text-xs font-bold">
                <BookOpen className="w-3.5 h-3.5" /> Department of Science
              </div>
              <h3 className="text-2xl font-bold text-[var(--primary)] font-serif">
                Science Stream (PCMB / PCMC)
              </h3>
              <p className="text-xs text-[var(--text)]/80 leading-relaxed">
                A rigorous foundation in mathematical thinking, computational logic, and experimental science, preparing learners for careers in medicine, engineering, robotics, and pure research.
              </p>
              <div className="space-y-2 pt-2">
                <div className="p-3 rounded-xl bg-[var(--tint)] text-xs">
                  <strong>PCMB:</strong> Physics, Chemistry, Mathematics, Biology (Medical &amp; Pure Sciences)
                </div>
                <div className="p-3 rounded-xl bg-[var(--tint)] text-xs">
                  <strong>PCMC:</strong> Physics, Chemistry, Mathematics, Computer Science (Engineering &amp; AI)
                </div>
              </div>
            </div>
            <Link
              href="/academics"
              className="py-2.5 text-xs font-bold text-[var(--secondary)] hover:text-[var(--primary)] flex items-center gap-1"
            >
              View Full Science Syllabus &amp; Lab Specs →
            </Link>
          </div>

          {/* Commerce Stream Card */}
          <div className="p-8 rounded-3xl bg-[var(--surface)] border border-[var(--border)] shadow-md space-y-5 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 text-xs font-bold">
                <Trophy className="w-3.5 h-3.5" /> Department of Commerce
              </div>
              <h3 className="text-2xl font-bold text-[var(--primary)] font-serif">
                Commerce Stream (CEBA / SEBA)
              </h3>
              <p className="text-xs text-[var(--text)]/80 leading-relaxed">
                Empowering future entrepreneurs, chartered accountants, and finance leaders with quantitative analytics, corporate law, and applied economics.
              </p>
              <div className="space-y-2 pt-2">
                <div className="p-3 rounded-xl bg-[var(--tint)] text-xs">
                  <strong>CEBA:</strong> Computer Science, Economics, Business Studies, Accountancy
                </div>
                <div className="p-3 rounded-xl bg-[var(--tint)] text-xs">
                  <strong>SEBA:</strong> Statistics, Economics, Business Studies, Accountancy
                </div>
              </div>
            </div>
            <Link
              href="/academics"
              className="py-2.5 text-xs font-bold text-[var(--secondary)] hover:text-[var(--primary)] flex items-center gap-1"
            >
              View Full Commerce Pathways &amp; Career Hub →
            </Link>
          </div>
        </div>
      </section>

      {/* 8. "JOIN OUR TEAM" CAREERS CTA (Section 7B) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-r from-[var(--primary)] to-[var(--primary-dark)] text-white shadow-xl flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center sm:text-left">
            <span className="text-xs font-extrabold text-[var(--accent)] uppercase tracking-widest">
              Careers at Bengaluru PU College
            </span>
            <h3 className="text-2xl font-extrabold font-serif">
              Join Our World-Class Faculty &amp; Staff Team
            </h3>
            <p className="text-xs sm:text-sm text-white/80 max-w-xl">
              We are actively looking for passionate educators, research mentors, and admissions counselors who believe in inspiring the next generation.
            </p>
          </div>
          <Link
            href="/careers"
            className="px-6 py-3 rounded-2xl bg-[var(--accent)] hover:brightness-110 text-[var(--primary-dark)] font-extrabold text-xs uppercase tracking-wider shrink-0 shadow-md transition"
          >
            Explore Openings &amp; Apply
          </Link>
        </div>
      </section>

      {/* 9. TESTIMONIALS CAROUSEL (2 PLACEHOLDER SLIDES - Section 7B) */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center space-y-2">
          <span className="text-xs font-extrabold text-[var(--secondary)] uppercase tracking-widest">
            Community Reflections
          </span>
          <h2 className="text-3xl font-extrabold text-[var(--primary)] font-serif">
            Student &amp; Parent Experiences
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Slide 1 */}
          <div className="p-6 sm:p-8 rounded-3xl bg-[var(--surface)] border border-[var(--border)] shadow-sm space-y-4 relative">
            <Quote className="w-8 h-8 text-[var(--accent)]/40 absolute top-6 right-6" />
            <p className="text-xs sm:text-sm text-[var(--text)]/85 leading-relaxed italic">
              &ldquo;The personalized mentorship from faculty and weekly problem-solving clinics gave me the exact foundation I needed. The counselors monitored my stress levels and helped me balance PU board revisions with KCET prep effortlessly.&rdquo;
            </p>
            <div className="pt-2 border-t border-[var(--border)]">
              <div className="font-bold text-xs text-[var(--primary)]">Ananya R.</div>
              <div className="text-[11px] text-[var(--muted)]">Science Stream (PCMB) • Class of 2024 (98.6% Distinction)</div>
            </div>
          </div>

          {/* Slide 2 */}
          <div className="p-6 sm:p-8 rounded-3xl bg-[var(--surface)] border border-[var(--border)] shadow-sm space-y-4 relative">
            <Quote className="w-8 h-8 text-[var(--accent)]/40 absolute top-6 right-6" />
            <p className="text-xs sm:text-sm text-[var(--text)]/85 leading-relaxed italic">
              &ldquo;The transparency in communication, weekly performance tracking, and warm guidance from counselors made our transition to PU education completely stress-free. Our daughter flourished in both commerce and the college debate guild.&rdquo;
            </p>
            <div className="pt-2 border-t border-[var(--border)]">
              <div className="font-bold text-xs text-[var(--primary)]">Rajesh &amp; Sunita K.</div>
              <div className="text-[11px] text-[var(--muted)]">Parents of Commerce Student • HRBR Layout Campus</div>
            </div>
          </div>
        </div>
      </section>

      {/* 10. NEWSLETTER SIGNUP (Section 7B) */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-5">
        <div className="p-8 sm:p-10 rounded-3xl bg-[var(--tint)] border border-[var(--border)] shadow-sm space-y-4">
          <h3 className="text-2xl font-bold text-[var(--primary)] font-serif">
            Stay Connected with Academic Notices &amp; Newsletters
          </h3>
          <p className="text-xs sm:text-sm text-[var(--muted)] max-w-md mx-auto">
            Receive monthly circulars, scholarship updates, and university admissions guidance directly in your inbox.
          </p>
          <NewsletterForm />
          <div className="text-[10px] text-[var(--muted)]">
            We value your privacy. Unsubscribe at any time with one click.
          </div>
        </div>
      </section>
    </div>
  );
}
