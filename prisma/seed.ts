import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("Starting RBANMS PU College database seed...");

  // 1. Users (Configured via environment variables for security)
  const seedAdminEmail = process.env.SEED_ADMIN_EMAIL || "admin@institution.local";
  const seedAdminPassword = process.env.SEED_ADMIN_PASSWORD || "AdminInitialPass2025!";
  const seedStaffEmail = process.env.SEED_STAFF_EMAIL || "staff@institution.local";
  const seedStaffPassword = process.env.SEED_STAFF_PASSWORD || "StaffInitialPass2025!";

  const adminPasswordHash = await bcrypt.hash(seedAdminPassword, 10);
  const staffPasswordHash = await bcrypt.hash(seedStaffPassword, 10);

  const superAdmin = await prisma.user.upsert({
    where: { email: seedAdminEmail },
    update: { passwordHash: adminPasswordHash },
    create: {
      name: "Super Administrator",
      email: seedAdminEmail,
      passwordHash: adminPasswordHash,
      role: "SUPER_ADMIN",
    },
  });

  const staffUser = await prisma.user.upsert({
    where: { email: seedStaffEmail },
    update: { passwordHash: staffPasswordHash },
    create: {
      name: "Admissions Counselor",
      email: seedStaffEmail,
      passwordHash: staffPasswordHash,
      role: "RECEPTIONIST",
    },
  });

  const seedCampusAdminEmail = process.env.SEED_CAMPUS_ADMIN_EMAIL || "campusadmin@institution.local";
  const seedCampusAdminPassword = process.env.SEED_CAMPUS_ADMIN_PASSWORD || "CampusPass2025!";
  const campusAdminPasswordHash = await bcrypt.hash(seedCampusAdminPassword, 10);

  await prisma.user.upsert({
    where: { email: seedCampusAdminEmail },
    update: {
      passwordHash: campusAdminPasswordHash,
      role: "CAMPUS_ADMIN",
      assignedCampus: "ITPL Campus (Whitefield)",
    },
    create: {
      name: "ITPL Campus Administrator",
      email: seedCampusAdminEmail,
      passwordHash: campusAdminPasswordHash,
      role: "CAMPUS_ADMIN",
      assignedCampus: "ITPL Campus (Whitefield)",
    },
  });

  console.log(`Seeded Users: ${seedAdminEmail}, ${seedStaffEmail}, & ${seedCampusAdminEmail}`);

  // 2. Site Settings
  await prisma.siteSetting.upsert({
    where: { id: "default" },
    update: {},
    create: {
      id: "default",
      collegeName: "RBANM's Pre-University College",
      tagline: "Empowering Minds, Enriching Character Since 1883",
      founderName: "Dharmarathnakara Rai Bahadur Arcot Narrainswamy Mudaliar",
      establishedYear: "1883",
      address: "12, Annaswamy Mudaliar Road, Near Ulsoor Lake, Bengaluru, Karnataka 560042",
      phone: "+91 80 2551 2911 / +91 80 2554 4452",
      email: "principal@rbanmspuc.edu.in",
      admissionsEmail: "admissions@rbanmspuc.edu.in",
      primaryColor: "#1e3a8a",
      secondaryColor: "#b45309",
      accentColor: "#0284c7",
      logoUrl: "/images/rbanms-logo.svg",
      bannerActive: true,
      bannerText: "Admissions Open for 2025-2026 Academic Year | Science (PCMB/PCMC), Commerce (SEBA/CEBA) & Arts (HEGP) | Apply Online Today!",
      bannerLink: "/admissions/apply",
      mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3887.8926946633633!2d77.6163339748414!3d12.978712987337326!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae1684c47f5bc7%3A0xbcf239b6b7123aa1!2sRBANM's%20Pre%20University%20College!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin",
      facebookUrl: "https://facebook.com/rbanmspuc",
      twitterUrl: "https://twitter.com/rbanmspuc",
      instagramUrl: "https://instagram.com/rbanmspuc",
      youtubeUrl: "https://youtube.com/@rbanmspuc",
      linkedinUrl: "https://linkedin.com/school/rbanmspuc",
      metaTitle: "RBANMS PU College Bengaluru | Leading Pre-University Education",
      metaDescription: "Welcome to RBANM's Pre-University College Bengaluru. Established in 1883, providing quality education in Science, Commerce, and Arts with outstanding faculty and modern facilities.",
    },
  });

  // 3. Departments
  const departmentsData = [
    {
      name: "Department of Physics",
      code: "PHYS",
      stream: "SCIENCE",
      description: "Advanced conceptual and experimental learning with modern mechanics, optics, electricity, and electronics laboratories.",
      hodName: "Dr. Ramesh Kumar S, M.Sc., Ph.D.",
      labs: "General Physics Lab, Advanced Optics Darkroom",
      order: 1,
    },
    {
      name: "Department of Chemistry",
      code: "CHEM",
      stream: "SCIENCE",
      description: "Hands-on chemical experimentation in organic, inorganic, and physical chemistry with state-of-the-art safety fume hoods.",
      hodName: "Prof. Anitha Rao, M.Sc., M.Phil.",
      labs: "Analytical Chemistry Lab, Organic Synthesis Lab",
      order: 2,
    },
    {
      name: "Department of Mathematics & Statistics",
      code: "MATH",
      stream: "SCIENCE",
      description: "Rigorous analytical training fostering logical problem solving, calculus, probability, and board/competitive exam preparation.",
      hodName: "Prof. Suresh B. V., M.Sc., B.Ed.",
      labs: "Math Modeling Lab",
      order: 3,
    },
    {
      name: "Department of Biology",
      code: "BIOL",
      stream: "SCIENCE",
      description: "Comprehensive study of botany and zoology with specimen museums, binocular microscopes, and botanical herbarium.",
      hodName: "Dr. Priya Nandini, M.Sc., Ph.D.",
      labs: "Biology & Botanical Museum, Genetics Workstation",
      order: 4,
    },
    {
      name: "Department of Computer Science",
      code: "CS",
      stream: "SCIENCE",
      description: "Modern computer labs equipped with high-speed internet, Python, C++, Web Development, and AI exploratory workstations.",
      hodName: "Prof. Deepak Hegde, M.C.A., M.Tech.",
      labs: "Lab 1 (60 High-end Desktops), Lab 2 (Networking & Multimedia)",
      order: 5,
    },
    {
      name: "Department of Commerce & Accountancy",
      code: "COMM",
      stream: "COMMERCE",
      description: "Premier commerce education integrating Accountancy, Business Studies, Tally ERP, and Stock Market simulations.",
      hodName: "Prof. K. Venkatesh, M.Com., M.B.A., M.Phil.",
      labs: "Business Simulation & Accounting Software Lab",
      order: 6,
    },
    {
      name: "Department of Economics",
      code: "ECON",
      stream: "COMMERCE",
      description: "In-depth economic theory, macro analysis, budgetary principles, and development economics.",
      hodName: "Dr. Geetha Mohan, M.A., Ph.D.",
      labs: "Economic Research Reading Room",
      order: 7,
    },
    {
      name: "Department of History & Humanities",
      code: "HIST",
      stream: "ARTS",
      description: "In-depth explorations of Indian and world civilizations, archaeological heritage, governance, and political systems.",
      hodName: "Prof. Manjunath Swamy, M.A., B.Ed.",
      labs: "Heritage Archive & Map Room",
      order: 8,
    },
    {
      name: "Department of Languages",
      code: "LANG",
      stream: "LANGUAGES",
      description: "Fostering linguistic mastery and literary appreciation in English, Kannada, Hindi, and Tamil.",
      hodName: "Prof. Vijayalakshmi N., M.A. (Kannada), M.Phil.",
      labs: "Digital Language Lab with Audio-Visual pods",
      order: 9,
    },
  ];

  for (const dept of departmentsData) {
    const createdDept = await prisma.department.upsert({
      where: { code: dept.code },
      update: dept,
      create: dept,
    });

    // Seed sample faculty for this department
    await prisma.faculty.deleteMany({ where: { departmentId: createdDept.id } });
    await prisma.faculty.createMany({
      data: [
        {
          name: dept.hodName,
          designation: "Head of Department & Senior Lecturer",
          departmentId: createdDept.id,
          qualification: dept.stream === "SCIENCE" ? "M.Sc., Ph.D." : "M.A. / M.Com., M.Phil.",
          experience: "18+ Years",
          email: `${dept.code.toLowerCase()}.hod@rbanmspuc.edu.in`,
          photoUrl: "/uploads/avatar-placeholder.svg",
          bio: `Dedicated academic leader committed to student mentorship and conceptual excellence in ${dept.name}.`,
          order: 1,
        },
        {
          name: `Asst. Prof. ${dept.name.split(" ").pop()} Mentor`,
          designation: "Lecturer",
          departmentId: createdDept.id,
          qualification: "M.Sc. / M.A., B.Ed.",
          experience: "8+ Years",
          email: `${dept.code.toLowerCase()}.faculty@rbanmspuc.edu.in`,
          photoUrl: "/uploads/avatar-placeholder.svg",
          bio: `Passionate educator specializing in interactive classroom instruction and practical laboratory supervision.`,
          order: 2,
        },
      ],
    });
  }
  console.log("Seeded Departments and Faculty.");

  // 4. Courses Offered
  const coursesData = [
    {
      code: "PCMB",
      name: "Physics, Chemistry, Mathematics, Biology",
      stream: "SCIENCE",
      duration: "2 Years (Karnataka Pre-University Board)",
      eligibility: "Karnataka SSLC or CBSE/ICSE Class 10 with minimum 55% aggregate marks in Science and Mathematics.",
      intake: 80,
      subjects: "Physics, Chemistry, Mathematics, Biology, English, Kannada/Hindi/Tamil",
      careerProspects: "Medicine (MBBS/BDS), Engineering (B.E./B.Tech), Biotechnology, Pharmacy (B.Pharm), Pure Science Research, Bioinformatics.",
      order: 1,
    },
    {
      code: "PCMC",
      name: "Physics, Chemistry, Mathematics, Computer Science",
      stream: "SCIENCE",
      duration: "2 Years (Karnataka Pre-University Board)",
      eligibility: "Karnataka SSLC or CBSE/ICSE Class 10 with strong quantitative and analytical aptitude.",
      intake: 80,
      subjects: "Physics, Chemistry, Mathematics, Computer Science, English, Kannada/Hindi/Tamil",
      careerProspects: "Computer Science Engineering, Artificial Intelligence & Data Science, Robotics, Software Architecture, Information Technology.",
      order: 2,
    },
    {
      code: "CEBA",
      name: "Computer Science, Economics, Business Studies, Accountancy",
      stream: "COMMERCE",
      duration: "2 Years (Karnataka Pre-University Board)",
      eligibility: "Pass in Class 10 / SSLC with interest in commerce, business technology, and computational accounting.",
      intake: 100,
      subjects: "Computer Science, Economics, Business Studies, Accountancy, English, Kannada/Hindi/Tamil",
      careerProspects: "Chartered Accountancy (CA), Company Secretary (CS), Fintech, B.Com, BBA, Data Analytics in Finance, Banking.",
      order: 3,
    },
    {
      code: "SEBA",
      name: "Statistics, Economics, Business Studies, Accountancy",
      stream: "COMMERCE",
      duration: "2 Years (Karnataka Pre-University Board)",
      eligibility: "Pass in Class 10 / SSLC from recognized State or National Boards.",
      intake: 100,
      subjects: "Statistics, Economics, Business Studies, Accountancy, English, Kannada/Hindi/Tamil",
      careerProspects: "Actuarial Science, Econometrics, Chartered Accountancy (CA), Investment Banking, Corporate Finance, Business Management.",
      order: 4,
    },
    {
      code: "HEGP",
      name: "History, Economics, Geography, Political Science",
      stream: "ARTS",
      duration: "2 Years (Karnataka Pre-University Board)",
      eligibility: "Pass in Karnataka SSLC or equivalent Class 10 Board exam.",
      intake: 60,
      subjects: "History, Economics, Geography, Political Science, English, Kannada/Hindi/Tamil",
      careerProspects: "Civil Services (UPSC / KPSC IAS/IPS), Law (LLB / Judiciary), Journalism, Public Policy, Urban Planning, Teaching.",
      order: 5,
    },
  ];

  for (const c of coursesData) {
    await prisma.course.upsert({
      where: { code: c.code },
      update: c,
      create: c,
    });
  }
  console.log("Seeded Courses.");

  // 5. Notices & Circulars
  const noticesData = [
    {
      title: "Admissions Open for I PUC (Science, Commerce, Arts) - 2025-26",
      category: "ADMISSION",
      description: "Applications are invited from eligible Class 10 pass-outs for admission to I PUC for the academic year 2025-26. Apply online or visit the admissions desk.",
      isPinned: true,
      fileUrl: "/uploads/campus-hero.svg",
    },
    {
      title: "Annual Board Examination Practical Time Table Released",
      category: "NOTICE",
      description: "The timetable for II PUC Karnataka State Board practical examinations has been published on the official notice board and student portal.",
      isPinned: true,
      fileUrl: "/uploads/campus-hero.svg",
    },
    {
      title: "RBANMS Merit & Means Scholarships Applications 2025",
      category: "CIRCULAR",
      description: "Deserving students from economically challenged backgrounds and academic toppers can submit scholarship application forms before the end of the month.",
      isPinned: false,
      fileUrl: "/uploads/campus-hero.svg",
    },
    {
      title: "Parents-Teachers Meeting (PTM) for I & II Year PU Students",
      category: "NOTICE",
      description: "All parents and guardians are requested to attend the upcoming interactive performance review meeting in the Main Auditorium.",
      isPinned: false,
    },
    {
      title: "Annual Sports Meet & Inter-Class Tournament Schedule",
      category: "ANNOUNCEMENT",
      description: "Track and field events, cricket, volleyball, and shuttle badminton trials commence from next Monday at the campus sports pavilion.",
      isPinned: false,
    },
  ];

  await prisma.notice.deleteMany({});
  for (const n of noticesData) {
    await prisma.notice.create({ data: n });
  }
  console.log("Seeded Notices.");

  // 6. Upcoming Events
  const eventsData = [
    {
      title: "Founder's Day Memorial Celebrations 2025",
      category: "CELEBRATION",
      eventDate: new Date("2025-11-15T09:30:00Z"),
      venue: "RBANMS Central Heritage Auditorium",
      description: "Honoring the noble philanthropic vision of Dharmarathnakara Rai Bahadur Arcot Narrainswamy Mudaliar with special guest lectures and student felicitations.",
      imageUrl: "/uploads/founder-arcot.svg",
    },
    {
      title: "PRATIBHA: Inter-Collegiate Science & Tech Fest",
      category: "ACADEMIC",
      eventDate: new Date("2025-12-05T10:00:00Z"),
      venue: "Science Laboratory Complex & Quadrangle",
      description: "Working robotics models, chemistry magic shows, biology exhibitions, and competitive coding hackathons across Bangalore PU colleges.",
      imageUrl: "/uploads/campus-hero.svg",
    },
    {
      title: "VANIIJYA: Annual Commerce Summit & Startup Fair",
      category: "ACADEMIC",
      eventDate: new Date("2025-12-18T09:00:00Z"),
      venue: "Commerce Wing Seminar Hall",
      description: "Budget debates, stock simulation tournaments, product pitch challenges, and interactions with leading Chartered Accountants.",
      imageUrl: "/uploads/campus-hero.svg",
    },
    {
      title: "Annual Cultural Extravaganza: TARANG 2025",
      category: "CULTURAL",
      eventDate: new Date("2026-01-20T16:00:00Z"),
      venue: "Open Air Amphitheatre",
      description: "Classical and western dance competitions, music band battles, theatrical dramas, and fashion showcase highlighting India's rich cultural heritage.",
      imageUrl: "/uploads/campus-hero.svg",
    },
  ];

  await prisma.event.deleteMany({});
  for (const ev of eventsData) {
    await prisma.event.create({ data: ev });
  }
  console.log("Seeded Events.");

  // 7. News Items
  const newsData = [
    {
      title: "Outstanding 98.4% Pass Rate in Karnataka PU Board Examinations",
      category: "ACADEMICS",
      summary: "RBANMS PU College students continue the legacy of academic distinction with 120+ distinctions and multiple state top 100 ranks.",
      content: "<p>The management and faculty of RBANMS Pre-University College proudly congratulate our students for achieving an extraordinary 98.4% overall pass percentage in the recently concluded II PUC Karnataka State Board examinations.</p><p>Over 120 students secured distinctions, with special accolades for top scorers in Mathematics, Physics, Accountancy, and Computer Science.</p>",
      imageUrl: "/uploads/campus-hero.svg",
    },
    {
      title: "RBANMS NCC Cadets Win Governor's Banner at Annual Training Camp",
      category: "ACHIEVEMENT",
      summary: "Our Army and Naval wing cadets demonstrated exceptional discipline, marksmanship, and drill routines to lift the prestigious trophy.",
      content: "<p>The NCC contingents of RBANMS PU College emerged victorious at the All-Karnataka Inter-Unit Training Camp. Cadet Sergeant Vikram S. was judged the Best Cadet for exemplary leadership and obstacle navigation.</p>",
      imageUrl: "/uploads/campus-hero.svg",
    },
    {
      title: "State-of-the-Art Artificial Intelligence & Robotics Lab Inaugurated",
      category: "CAMPUS",
      summary: "Expanding our technology infrastructure with 60 high-performance workstations, IoT sensors, and high-speed gigabit fiber connectivity.",
      content: "<p>In keeping with our vision to prepare students for future careers in technology, RBANMS has unveiled an upgraded Computer Science laboratory with AI modeling kits and cloud-based development environments.</p>",
      imageUrl: "/uploads/campus-hero.svg",
    },
  ];

  await prisma.news.deleteMany({});
  for (const n of newsData) {
    await prisma.news.create({ data: n });
  }
  console.log("Seeded News.");

  // 8. Achievements
  const achievementsData = [
    {
      title: "State 4th Rank in Commerce Stream",
      category: "STUDENT",
      recipient: "Ananya Sharma (II PUC SEBA)",
      year: "2024",
      description: "Secured 594/600 with 100 in Accountancy, 100 in Business Studies, and 99 in Statistics.",
      imageUrl: "/uploads/principal.svg",
    },
    {
      title: "National Gold Medal in 400m Athletics",
      category: "SPORTS",
      recipient: "Rohan Gowda (I PUC PCMC)",
      year: "2024",
      description: "Represented Karnataka at the National Junior Athletics Championship and clinched the Gold Medal.",
      imageUrl: "/uploads/campus-hero.svg",
    },
    {
      title: "Distinguished Teacher of Excellence Award",
      category: "FACULTY",
      recipient: "Prof. K. Venkatesh (Commerce HOD)",
      year: "2023",
      description: "Conferred by the Karnataka State Pre-University Board for remarkable 25-year service in educational pedagogy.",
      imageUrl: "/uploads/director.svg",
    },
  ];

  await prisma.achievement.deleteMany({});
  for (const a of achievementsData) {
    await prisma.achievement.create({ data: a });
  }
  console.log("Seeded Achievements.");

  // 9. Downloads & Forms
  const downloadsData = [
    {
      title: "RBANMS PU College Official Prospectus 2025-2026",
      category: "BROCHURE",
      fileUrl: "/uploads/campus-hero.svg",
      fileSize: "2.4 MB",
      fileType: "PDF",
    },
    {
      title: "Application Form for Admission to I Year PUC (Offline)",
      category: "ADMISSION_FORM",
      fileUrl: "/uploads/campus-hero.svg",
      fileSize: "450 KB",
      fileType: "PDF",
    },
    {
      title: "Complete Karnataka PU Board Syllabus & Blueprint",
      category: "SYLLABUS",
      fileUrl: "/uploads/campus-hero.svg",
      fileSize: "3.1 MB",
      fileType: "PDF",
    },
    {
      title: "RBANMS Merit & Means Scholarship Application Form",
      category: "ADMISSION_FORM",
      fileUrl: "/uploads/campus-hero.svg",
      fileSize: "380 KB",
      fileType: "PDF",
    },
    {
      title: "Annual College Academic Calendar & Exam Schedule 2025-26",
      category: "TIMETABLE",
      fileUrl: "/uploads/campus-hero.svg",
      fileSize: "720 KB",
      fileType: "PDF",
    },
  ];

  await prisma.downloadItem.deleteMany({});
  for (const d of downloadsData) {
    await prisma.downloadItem.create({ data: d });
  }
  console.log("Seeded Downloads.");

  // 10. FAQs
  const faqsData = [
    {
      question: "What streams and combinations are offered at RBANMS PU College?",
      answer: "We offer Science (PCMB: Physics, Chemistry, Math, Biology; PCMC: Physics, Chemistry, Math, Computer Science), Commerce (CEBA: Comp Science, Econ, Business, Accounts; SEBA: Stats, Econ, Business, Accounts), and Arts (HEGP: History, Economics, Geography, Political Science).",
      category: "ACADEMIC",
      order: 1,
    },
    {
      question: "What is the admission procedure for I Year PUC?",
      answer: "Admissions begin immediately following the announcement of Class 10 (SSLC/CBSE/ICSE) results. You can submit the online enquiry/application form through this portal or obtain the physical application from the campus administrative office.",
      category: "ADMISSION",
      order: 2,
    },
    {
      question: "Are scholarships available for meritorious and needy students?",
      answer: "Yes! RBANM's Charities was established on the very foundation of philanthropic education. We offer multiple endowment scholarships, fee concessions for merit rankers, sports achievers, and financial assistance for underprivileged students.",
      category: "SCHOLARSHIP",
      order: 3,
    },
    {
      question: "What is the fee structure at RBANMS PU College?",
      answer: "Being a charitable trust institution, our fee structure is highly affordable and regulated as per Karnataka Government guidelines. Detailed course-wise fee structures can be viewed on our Admissions > Fee Structure page or downloaded from the portal.",
      category: "FEE",
      order: 4,
    },
    {
      question: "What co-curricular opportunities exist on campus?",
      answer: "RBANMS boasts active National Cadet Corps (NCC) units, extensive sports facilities (cricket, football, kabaddi, volleyball, athletics), cultural associations, eco clubs, science forum, and debate societies.",
      category: "GENERAL",
      order: 5,
    },
  ];

  await prisma.faq.deleteMany({});
  for (const f of faqsData) {
    await prisma.faq.create({ data: f });
  }
  console.log("Seeded FAQs.");

  // 11. Gallery Items
  const galleryData = [
    {
      title: "Historic Main Campus Heritage Block",
      category: "CAMPUS",
      type: "IMAGE",
      url: "/uploads/campus-hero.svg",
      caption: "The iconic colonial architecture of RBANMS Educational Charities near Ulsoor Lake.",
      isFeatured: true,
      order: 1,
    },
    {
      title: "Dharmarathnakara Rai Bahadur Founder Memorial",
      category: "CAMPUS",
      type: "IMAGE",
      url: "/uploads/founder-arcot.svg",
      caption: "Statue of founder Arcot Narrainswamy Mudaliar erected to honor his 1883 philanthropic charter.",
      isFeatured: true,
      order: 2,
    },
    {
      title: "Advanced Chemistry & Physics Laboratories",
      category: "LABS",
      type: "IMAGE",
      url: "/uploads/campus-hero.svg",
      caption: "Students conducting experiments under faculty guidance.",
      isFeatured: true,
      order: 3,
    },
    {
      title: "Annual Sports Day Track & Field Events",
      category: "SPORTS",
      type: "IMAGE",
      url: "/uploads/campus-hero.svg",
      caption: "Student athletes competing in sprint relays on the college grounds.",
      isFeatured: false,
      order: 4,
    },
    {
      title: "Cultural Festival & Dance Performances",
      category: "CULTURAL",
      type: "IMAGE",
      url: "/uploads/campus-hero.svg",
      caption: "Vibrant performances showcasing classical and contemporary arts.",
      isFeatured: false,
      order: 5,
    },
  ];

  await prisma.galleryItem.deleteMany({});
  for (const g of galleryData) {
    await prisma.galleryItem.create({ data: g });
  }
  console.log("Seeded Gallery.");

  // 12. Pre-seeded Pages for All Sitemap Items
  const pagesData = [
    // About Us section
    {
      slug: "history",
      section: "about",
      title: "History & Heritage of RBANMS",
      subtitle: "Founded in 1883 by Dharmarathnakara Rai Bahadur Arcot Narrainswamy Mudaliar",
      bannerImage: "/uploads/founder-arcot.svg",
      content: `
        <h2>A Noble Visionary Who Shaped Education in Bengaluru</h2>
        <p>In the late nineteenth century, <strong>Dharmarathnakara Rai Bahadur Arcot Narrainswamy Mudaliar (1827–1910)</strong>, a leading philanthropist, merchant, and statesman in the Mysore State, recognized that true social emancipation and national progress could only be achieved through free, quality education accessible to every stratum of society regardless of caste, creed, or economic means.</p>
        <p>In 1883, he founded the <em>Rai Bahadur Arcot Narrainswamy Mudaliar Educational Charities</em> and dedicated his personal wealth and vast lands along Annaswamy Mudaliar Road (overlooking Ulsoor Lake) to create enduring institutions of learning.</p>
        <blockquote>
          "Knowledge is the supreme charity that enriches both the giver and the receiver across generations."
          <footer>— Rai Bahadur Arcot Narrainswamy Mudaliar</footer>
        </blockquote>
        <h3>The Pre-University College Legacy</h3>
        <p>For more than 140 years, the RBANMS campus has served as a lighthouse of learning in central Bengaluru. Over one hundred thousand alumni have walked these corridors to become distinguished civil servants, scientists, corporate leaders, doctors, engineers, and teachers who have served Karnataka and the nation with distinction.</p>
      `,
    },
    {
      slug: "legacy-vision-mission",
      section: "about",
      title: "Legacy, Vision & Mission",
      subtitle: "Guiding principles that drive our pursuit of holistic education",
      bannerImage: "/uploads/campus-hero.svg",
      content: `
        <h2>Our Vision</h2>
        <p>To be a premier institution of pre-university education in Karnataka, providing holistic, value-based, and scientifically grounded learning that empowers young minds with intellectual rigor, ethical integrity, and social responsibility.</p>
        <h2>Our Mission</h2>
        <ul>
          <li><strong>Academic Excellence:</strong> Deliver rigorous curriculum instruction across Science, Commerce, and Arts while preparing students for competitive national entrance tests and board examinations.</li>
          <li><strong>Inclusive Opportunity:</strong> Preserve our founding trust's charter by extending generous scholarships and concessions to meritorious and economically challenged students.</li>
          <li><strong>Character & Citizenship:</strong> Foster patriotic pride, discipline, civic awareness, and leadership through active participation in NCC, Sports, and Cultural societies.</li>
          <li><strong>Holistic Infrastructure:</strong> Provide state-of-the-art laboratories, modern computer facilities, and an expansive library environment.</li>
        </ul>
      `,
    },
    {
      slug: "principals-message",
      section: "about",
      title: "Principal's Message",
      subtitle: "Message from Dr. K. S. Rajendra, M.Sc., Ph.D.",
      bannerImage: "/uploads/principal-img.jpg",
      content: `
        <h2>Welcome to RBANM's Pre-University College</h2>
        <p>Dear Students, Parents, and Well-Wishers,</p>
        <p>It is my distinct privilege to welcome you to RBANM's Pre-University College—an institution steeped in a 140-year legacy of academic distinction, moral virtue, and student empowerment.</p>
        <p>The pre-university years represent the most pivotal bridge in a young scholar's intellectual and emotional journey. It is during these two intensive years that foundational concepts in Sciences, Commerce, and Humanities take firm root, shaping future professional trajectories and personal character.</p>
        <p>At RBANMS, we blend traditional mentorship with contemporary pedagogical methods. Our faculty members bring decades of dedicated teaching experience and personalized care to each student. I invite every aspirational student to become a part of our vibrant community and write their chapter in this illustrious heritage.</p>
        <p>Warm regards,<br/><strong>Dr. K. S. Rajendra, M.Sc., Ph.D.</strong><br/>Principal, RBANMS PU College</p>
      `,
    },
    {
      slug: "directors-message",
      section: "about",
      title: "Director's Message",
      subtitle: "Message from Prof. M. B. Vasantha Kumar, Director of Institutions",
      bannerImage: "/uploads/director.svg",
      content: `
        <h2>Nurturing Leaders for the 21st Century</h2>
        <p>The RBANMS Educational Charities was instituted with a sacred trust: to illuminate young lives through the torch of education. As we embrace the challenges and opportunities of the 21st century, our commitment remains steadfast—to offer an education that is affordable, comprehensive, and intellectually inspiring.</p>
        <p>We take pride in our serene heritage campus located in the heart of Bengaluru, complemented by modern sports grounds, advanced science laboratories, and high-speed computer centers. We continuously invest in faculty development and student wellness programs to ensure our students excel in competitive examinations while growing into compassionate human beings.</p>
      `,
    },
    {
      slug: "management",
      section: "about",
      title: "Management & Board of Trustees",
      subtitle: "Distinguished guardians carrying forward our founder's philanthropic mission",
      bannerImage: "/uploads/campus-hero.svg",
      content: `
        <h2>RBANMS Educational Charities Board of Trustees</h2>
        <p>The institution is governed by an eminent Board of Trustees comprising respected industrialists, legal luminaries, former civil servants, and educationists who oversee the strategic direction and fiduciary integrity of all RBANMS institutions.</p>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
          <div class="p-4 border rounded-lg bg-gray-50 dark:bg-gray-800">
            <h4 class="font-bold text-lg">Sri. S. V. Balasubramanian</h4>
            <p class="text-sm text-gray-600 dark:text-gray-300">President, Board of Trustees</p>
          </div>
          <div class="p-4 border rounded-lg bg-gray-50 dark:bg-gray-800">
            <h4 class="font-bold text-lg">Sri. C. N. Govindaraju</h4>
            <p class="text-sm text-gray-600 dark:text-gray-300">Honorary Secretary & Managing Trustee</p>
          </div>
          <div class="p-4 border rounded-lg bg-gray-50 dark:bg-gray-800">
            <h4 class="font-bold text-lg">Dr. V. Lakshmanan</h4>
            <p class="text-sm text-gray-600 dark:text-gray-300">Trustee & Educational Advisor</p>
          </div>
          <div class="p-4 border rounded-lg bg-gray-50 dark:bg-gray-800">
            <h4 class="font-bold text-lg">Sri. M. R. Narain</h4>
            <p class="text-sm text-gray-600 dark:text-gray-300">Trustee & Finance Convener</p>
          </div>
        </div>
      `,
    },
    {
      slug: "whos-who",
      section: "about",
      title: "Who's Who at RBANMS PU College",
      subtitle: "Key administrative and academic leadership",
      bannerImage: "/uploads/campus-hero.svg",
      content: `
        <h2>Administrative & Academic Directory</h2>
        <table class="w-full text-left border-collapse my-4">
          <thead>
            <tr class="border-b">
              <th class="py-2 font-bold">Role / Office</th>
              <th class="py-2 font-bold">Name</th>
              <th class="py-2 font-bold">Contact</th>
            </tr>
          </thead>
          <tbody>
            <tr class="border-b"><td class="py-2">Principal</td><td>Dr. K. S. Rajendra</td><td>principal@rbanmspuc.edu.in</td></tr>
            <tr class="border-b"><td class="py-2">Vice Principal & Academics Convener</td><td>Prof. Suresh B. V.</td><td>academics@rbanmspuc.edu.in</td></tr>
            <tr class="border-b"><td class="py-2">Admissions Coordinator</td><td>Prof. K. Venkatesh</td><td>admissions@rbanmspuc.edu.in</td></tr>
            <tr class="border-b"><td class="py-2">NCC Officer (Army Wing)</td><td>Capt. Manjunath Swamy</td><td>ncc@rbanmspuc.edu.in</td></tr>
            <tr class="border-b"><td class="py-2">Director of Physical Education</td><td>Sri. N. Ramesh</td><td>sports@rbanmspuc.edu.in</td></tr>
            <tr class="border-b"><td class="py-2">Chief Librarian</td><td>Smt. Savitha K.</td><td>library@rbanmspuc.edu.in</td></tr>
          </tbody>
        </table>
      `,
    },
    {
      slug: "statements",
      section: "about",
      title: "Institutional Statements & Declarations",
      subtitle: "Commitment to equity, student safety, and integrity",
      bannerImage: "/uploads/campus-hero.svg",
      content: `
        <h2>Statement of Non-Discrimination</h2>
        <p>RBANMS Pre-University College strictly enforces an egalitarian admission and learning policy. We do not discriminate on the basis of caste, community, religion, gender, mother tongue, or socioeconomic status.</p>
        <h2>Anti-Ragging Zero Tolerance Policy</h2>
        <p>In accordance with the Supreme Court of India directives and Karnataka Pre-University Board regulations, our campus maintains absolute ZERO tolerance toward any form of ragging, harassment, or intimidation.</p>
        <h2>Green Campus & Environmental Responsibility</h2>
        <p>We actively practice rainwater harvesting, solar auxiliary lighting, plastic-free zones, and compost systems on our tree-lined campus near Ulsoor Lake.</p>
      `,
    },
    {
      slug: "accreditation-recognition",
      section: "about",
      title: "Accreditation & Recognition",
      subtitle: "Official recognition and government approvals",
      bannerImage: "/uploads/campus-hero.svg",
      content: `
        <h2>Government Recognitions</h2>
        <ul>
          <li><strong>Department of Pre-University Education, Karnataka:</strong> Fully recognized and affiliated institution offering approved two-year pre-university courses in Science, Commerce, and Arts.</li>
          <li><strong>College Code:</strong> AS0042 (Bangalore North District).</li>
          <li><strong>Centenary Heritage Status:</strong> Recognized as one of the oldest continuing educational establishments in the state of Karnataka.</li>
        </ul>
      `,
    },
    {
      slug: "policies-documents",
      section: "about",
      title: "Policies & Mandatory Documents",
      subtitle: "Code of conduct, examination rules, and transparency disclosures",
      bannerImage: "/uploads/campus-hero.svg",
      content: `
        <h2>Student Code of Conduct</h2>
        <p>Students must maintain at least 75% attendance in both theory and practical classes to be eligible for the annual board examination. Uniform and identity badges are mandatory on campus.</p>
        <h2>Examination and Assessment Policies</h2>
        <p>Continuous evaluation includes two unit tests, one mid-term examination, and two preparatory examinations before the final Karnataka State Pre-University Board exams.</p>
      `,
    },

    // Admissions section
    {
      slug: "admission-process",
      section: "admissions",
      title: "Admission Process & Guidelines",
      subtitle: "Step-by-step procedure for securing admission to I Year PUC",
      bannerImage: "/uploads/campus-hero.svg",
      content: `
        <h2>Step-by-Step Admission Procedure</h2>
        <ol class="list-decimal pl-6 space-y-3">
          <li><strong>Step 1 - Application Submission:</strong> Complete the online application/enquiry form on this portal, or purchase the physical prospectus from the college administrative office.</li>
          <li><strong>Step 2 - Document Verification:</strong> Bring original and attested copies of Class 10 marks card, Transfer Certificate (TC), Aadhaar card, and Caste/Income certificate (if applicable).</li>
          <li><strong>Step 3 - Counseling & Combination Selection:</strong> Meet with our academic counseling team along with parents to finalize stream choice (Science: PCMB/PCMC; Commerce: CEBA/SEBA; Arts: HEGP).</li>
          <li><strong>Step 4 - Merit List & Fee Payment:</strong> Provisionally selected candidates must pay the prescribed nominal fee at the college fee counter to confirm admission.</li>
        </ol>
      `,
    },
    {
      slug: "eligibility",
      section: "admissions",
      title: "Eligibility Criteria",
      subtitle: "Academic prerequisites for Science, Commerce, and Arts streams",
      bannerImage: "/uploads/campus-hero.svg",
      content: `
        <h2>Qualifying Examinations</h2>
        <p>Candidates who have passed any of the following examinations are eligible to apply:</p>
        <ul>
          <li>Karnataka Secondary Education Examination Board (SSLC / Class 10).</li>
          <li>Central Board of Secondary Education (CBSE Class 10).</li>
          <li>Indian Certificate of Secondary Education (ICSE Class 10).</li>
          <li>Other State Secondary School Boards or equivalent examinations recognized by the Karnataka Pre-University Board.</li>
        </ul>
        <h2>Stream-wise Minimum Percentage Guidelines</h2>
        <ul>
          <li><strong>Science (PCMB / PCMC):</strong> Minimum 55% aggregate marks with passing grades in Science and Mathematics.</li>
          <li><strong>Commerce (CEBA / SEBA):</strong> Minimum 45% aggregate marks.</li>
          <li><strong>Arts (HEGP):</strong> Pass in Class 10.</li>
        </ul>
      `,
    },
    {
      slug: "courses-offered",
      section: "admissions",
      title: "Courses & Combinations Offered",
      subtitle: "Comprehensive curriculum aligned with Karnataka PU Board & competitive entrance exams",
      bannerImage: "/uploads/campus-hero.svg",
      content: `
        <h2>Explore Our Dynamic Academic Streams</h2>
        <p>RBANMS PU College offers three well-established streams with state-of-the-art laboratory infrastructure, specialized coaching for KCET, NEET, and JEE, and comprehensive career counseling.</p>
        <h3>1. Science Stream</h3>
        <ul>
          <li><strong>PCMB:</strong> Physics, Chemistry, Mathematics, Biology</li>
          <li><strong>PCMC:</strong> Physics, Chemistry, Mathematics, Computer Science</li>
        </ul>
        <h3>2. Commerce Stream</h3>
        <ul>
          <li><strong>CEBA:</strong> Computer Science, Economics, Business Studies, Accountancy</li>
          <li><strong>SEBA:</strong> Statistics, Economics, Business Studies, Accountancy</li>
        </ul>
        <h3>3. Arts / Humanities Stream</h3>
        <ul>
          <li><strong>HEGP:</strong> History, Economics, Geography, Political Science</li>
        </ul>
        <h3>Compulsory Language Options</h3>
        <p><strong>Part I:</strong> English (Compulsory)<br/><strong>Part II:</strong> Kannada, Hindi, or Tamil</p>
      `,
    },
    {
      slug: "fee-structure",
      section: "admissions",
      title: "Fee Structure (2025-2026)",
      subtitle: "Affordable, transparent, and charitable trust-governed fee framework",
      bannerImage: "/uploads/campus-hero.svg",
      content: `
        <h2>Transparent & Affordable Education</h2>
        <p>As a charitable institution governed by RBANM's Charities Trust, our tuition fees are kept affordable while ensuring premier facilities and high-caliber faculty.</p>
        <table class="w-full text-left border-collapse my-4">
          <thead>
            <tr class="border-b bg-gray-100 dark:bg-gray-800">
              <th class="p-3 font-bold">Stream / Combination</th>
              <th class="p-3 font-bold">Annual Tuition Fee</th>
              <th class="p-3 font-bold">Lab / Tech Fee</th>
              <th class="p-3 font-bold">Total Annual Fee</th>
            </tr>
          </thead>
          <tbody>
            <tr class="border-b"><td class="p-3">Science (PCMB)</td><td class="p-3">₹ 22,000</td><td class="p-3">₹ 6,000</td><td class="p-3 font-bold">₹ 28,000</td></tr>
            <tr class="border-b"><td class="p-3">Science (PCMC)</td><td class="p-3">₹ 24,000</td><td class="p-3">₹ 8,000</td><td class="p-3 font-bold">₹ 32,000</td></tr>
            <tr class="border-b"><td class="p-3">Commerce (CEBA)</td><td class="p-3">₹ 20,000</td><td class="p-3">₹ 5,000</td><td class="p-3 font-bold">₹ 25,000</td></tr>
            <tr class="border-b"><td class="p-3">Commerce (SEBA)</td><td class="p-3">₹ 18,000</td><td class="p-3">₹ 3,000</td><td class="p-3 font-bold">₹ 21,000</td></tr>
            <tr class="border-b"><td class="p-3">Arts (HEGP)</td><td class="p-3">₹ 14,000</td><td class="p-3">₹ 2,000</td><td class="p-3 font-bold">₹ 16,000</td></tr>
          </tbody>
        </table>
        <p class="text-sm text-gray-600 dark:text-gray-400">* Installment payment facilities are available upon request to the Principal.</p>
      `,
    },
    {
      slug: "scholarships",
      section: "admissions",
      title: "Scholarships & Financial Aid",
      subtitle: "Empowering deserving scholars through endowment funds and government schemes",
      bannerImage: "/uploads/founder-arcot.svg",
      content: `
        <h2>Trust Endowment Scholarships</h2>
        <p>In accordance with the founding trust deed of Rai Bahadur Arcot Narrainswamy Mudaliar, multiple full and partial scholarships are awarded every year:</p>
        <ul>
          <li><strong>Founder's Merit Award:</strong> 100% tuition waiver for students securing 95%+ marks in Class 10.</li>
          <li><strong>Need-Cum-Merit Scholarship:</strong> Financial assistance for students whose parental annual income is below ₹ 2.5 Lakhs.</li>
          <li><strong>Sports Excellence Concession:</strong> 50% waiver for students who represented District or State in recognized sporting events.</li>
        </ul>
        <h2>Government Scholarships</h2>
        <p>We facilitate application to Karnataka State SSP (State Scholarship Portal), Post-Matric Scholarships for SC/ST/OBC/Minority students, and Central Sector Scholarship Schemes.</p>
      `,
    },
    {
      slug: "prospectus",
      section: "admissions",
      title: "College Prospectus & Brochure",
      subtitle: "Download and view the official 2025-2026 admissions guide",
      bannerImage: "/uploads/campus-hero.svg",
      content: `
        <h2>Download the Comprehensive Prospectus</h2>
        <p>The RBANMS Pre-University College Prospectus provides an in-depth view of campus facilities, faculty credentials, syllabus details, laboratory infrastructure, alumni milestones, and rules of conduct.</p>
        <p><a href="/uploads/campus-hero.svg" class="inline-flex items-center px-4 py-2 bg-blue-700 text-white rounded font-medium hover:bg-blue-800">Download Prospectus PDF</a></p>
      `,
    },
    {
      slug: "downloads-forms",
      section: "admissions",
      title: "Downloads & Admission Forms",
      subtitle: "Essential forms, syllabi, and application documents",
      bannerImage: "/uploads/campus-hero.svg",
      content: `
        <h2>Official Document Center</h2>
        <p>Download printable application forms, academic checklists, medical fitness forms, and scholarship declaration sheets.</p>
      `,
    },
    {
      slug: "faqs",
      section: "admissions",
      title: "Frequently Asked Questions (FAQs)",
      subtitle: "Clear answers to common queries regarding admissions, courses, and facilities",
      bannerImage: "/uploads/campus-hero.svg",
      content: `
        <h2>Got Questions? We Have Answers.</h2>
        <p>Browse our curated FAQ section covering admissions timelines, documents required, practical classes, college timings, and extracurricular opportunities.</p>
      `,
    },
    {
      slug: "apply",
      section: "admissions",
      title: "Online Admission Application & Enquiry",
      subtitle: "Submit your details online to reserve your seat and receive guidance",
      bannerImage: "/uploads/campus-hero.svg",
      content: `
        <h2>Apply Online for I PUC (2025-2026)</h2>
        <p>Fill in the application enquiry form below. Our admissions counselor will review your application, verify your Class 10 marks, and contact you via phone, WhatsApp, and email within 24 hours.</p>
      `,
    },

    // Academics section
    {
      slug: "departments",
      section: "academics",
      title: "Academic Departments",
      subtitle: "Centers of academic excellence staffed by experienced educators",
      bannerImage: "/uploads/campus-hero.svg",
      content: `
        <h2>Departments at RBANMS PU College</h2>
        <p>Our dedicated faculty lead 9 specialized academic departments across Science, Commerce, Arts, and Languages.</p>
      `,
    },
    {
      slug: "faculty",
      section: "academics",
      title: "Faculty Directory",
      subtitle: "Meet our dedicated educators and subject-matter mentors",
      bannerImage: "/uploads/principal.svg",
      content: `
        <h2>Distinguished Faculty Members</h2>
        <p>With an average teaching tenure exceeding 12 years, our faculty members are passionate educators who mentor students both for board excellence and competitive success.</p>
      `,
    },
    {
      slug: "academic-calendar",
      section: "academics",
      title: "Academic Calendar (2025-2026)",
      subtitle: "Term dates, test schedules, holidays, and extracurricular activities",
      bannerImage: "/uploads/campus-hero.svg",
      content: `
        <h2>Term Dates & Important Schedules</h2>
        <table class="w-full text-left border-collapse my-4">
          <thead><tr class="border-b font-bold"><th class="py-2">Month</th><th class="py-2">Academic Milestone</th></tr></thead>
          <tbody>
            <tr class="border-b"><td class="py-2">June 2025</td><td>Commencement of I & II Year PU Classes & Orientation</td></tr>
            <tr class="border-b"><td class="py-2">August 2025</td><td>First Unit Test & Independence Day Flag Hoisting</td></tr>
            <tr class="border-b"><td class="py-2">October 2025</td><td>Mid-Term Examination & Dussehra Vacation</td></tr>
            <tr class="border-b"><td class="py-2">November 2025</td><td>Kannada Rajyotsava & Founder's Memorial Celebrations</td></tr>
            <tr class="border-b"><td class="py-2">December 2025</td><td>Second Unit Test & Science/Commerce Fests</td></tr>
            <tr class="border-b"><td class="py-2">January 2026</td><td>Preparatory Board Examination & Practical Exam Hall Tickets</td></tr>
            <tr class="border-b"><td class="py-2">March 2026</td><td>Karnataka State Pre-University Final Board Examinations</td></tr>
          </tbody>
        </table>
      `,
    },
    {
      slug: "timetable",
      section: "academics",
      title: "Class & Examination Timetables",
      subtitle: "Regular lecture schedules and test rotas",
      bannerImage: "/uploads/campus-hero.svg",
      content: `
        <h2>College Operating Hours</h2>
        <p><strong>Regular Classes:</strong> Monday to Friday: 8:45 AM to 3:30 PM | Saturday: 8:45 AM to 1:00 PM.</p>
        <p>Laboratory practical sessions are scheduled in batches of 25 students during afternoon blocks.</p>
      `,
    },
    {
      slug: "syllabus",
      section: "academics",
      title: "Curriculum & Syllabus",
      subtitle: "Prescribed Karnataka Pre-University Board NCERT aligned curriculum",
      bannerImage: "/uploads/campus-hero.svg",
      content: `
        <h2>NCERT & Karnataka PU Board Curriculum</h2>
        <p>All science and commerce syllabi are seamlessly synchronized with the NCERT curriculum, enabling students to concurrently prepare for KCET, JEE Main, and NEET examinations.</p>
      `,
    },
    {
      slug: "examination",
      section: "academics",
      title: "Examinations & Grading System",
      subtitle: "Assessment methodology, blueprint, and evaluation protocols",
      bannerImage: "/uploads/campus-hero.svg",
      content: `
        <h2>Continuous Comprehensive Assessment</h2>
        <p>Our internal assessment framework prepares students systematically for final board exams through periodic diagnostic tests, remedial coaching for struggling learners, and specialized booster series for high achievers.</p>
      `,
    },
    {
      slug: "results",
      section: "academics",
      title: "Board Examination Results",
      subtitle: "Track record of outstanding performance and distinctions",
      bannerImage: "/uploads/campus-hero.svg",
      content: `
        <h2>Consistently Outperforming State Averages</h2>
        <p>RBANMS PU College has maintained an enviable record of high pass percentages, consistently exceeding 95% in both Science and Commerce streams over the last decade.</p>
      `,
    },
    {
      slug: "library",
      section: "academics",
      title: "Library & Learning Resource Center",
      subtitle: "A treasure trove of 25,000+ volumes, journals, and digital repositories",
      bannerImage: "/uploads/campus-hero.svg",
      content: `
        <h2>The Central College Library</h2>
        <p>Our spacious, airy library houses over 25,000 textbooks, reference volumes, competitive examination manuals, and national journals. A dedicated digital browsing corner provides access to online academic repositories.</p>
      `,
    },
    {
      slug: "computer-lab",
      section: "academics",
      title: "Computer Laboratories",
      subtitle: "High-tech computing facilities with gigabit fiber connectivity",
      bannerImage: "/uploads/campus-hero.svg",
      content: `
        <h2>Modern Computational Facilities</h2>
        <p>With 120 modern workstations connected via high-speed LAN, students master programming in Python, C++, SQL databases, HTML/CSS web design, and office productivity suites.</p>
      `,
    },
    {
      slug: "science-laboratories",
      section: "academics",
      title: "Science Laboratories",
      subtitle: "Spacious, well-ventilated Physics, Chemistry, and Biology labs",
      bannerImage: "/uploads/campus-hero.svg",
      content: `
        <h2>Hands-on Scientific Inquiry</h2>
        <p>Separate laboratories for Physics, Chemistry, and Biology adhere to high safety standards. Each laboratory can comfortably host 40 students per batch with individual workstation apparatus.</p>
      `,
    },

    // Student Life section
    {
      slug: "sports",
      section: "student-life",
      title: "Sports & Athletics",
      subtitle: "Cultivating physical fitness, endurance, and sportsman spirit",
      bannerImage: "/uploads/campus-hero.svg",
      content: `
        <h2>Excellence on the Field</h2>
        <p>Our sprawling campus grounds offer facilities for Cricket, Football, Volleyball, Kabaddi, Shuttle Badminton, Table Tennis, and Chess. RBANMS teams regularly represent Bangalore North District in state tournaments.</p>
      `,
    },
    {
      slug: "ncc",
      section: "student-life",
      title: "National Cadet Corps (NCC)",
      subtitle: "Character building, comradeship, and selfless service",
      bannerImage: "/uploads/campus-hero.svg",
      content: `
        <h2>Army & Naval Wing Contingents</h2>
        <p>RBANMS PU College has one of the oldest active NCC units in Bangalore. Cadets participate in annual training camps, Republic Day parade contingents, firing practices, and disaster relief drills.</p>
      `,
    },
    {
      slug: "cultural-activities",
      section: "student-life",
      title: "Cultural Activities & Arts",
      subtitle: "Fostering creativity, theatre, classical arts, and music",
      bannerImage: "/uploads/campus-hero.svg",
      content: `
        <h2>A Vibrant Cultural Canvas</h2>
        <p>From inter-class debates and quiz bowls to annual drama fests and talent searches, every student is encouraged to discover and refine their creative potential.</p>
      `,
    },
    {
      slug: "clubs-societies",
      section: "student-life",
      title: "Clubs & Student Societies",
      subtitle: "Specialized forums for leadership and peer collaboration",
      bannerImage: "/uploads/campus-hero.svg",
      content: `
        <h2>Engaging Student Clubs</h2>
        <ul>
          <li><strong>Science & Eco Club:</strong> Botanical research, energy conservation, science fairs.</li>
          <li><strong>Commerce Club (Vaniijya):</strong> Stock simulations, business plan competitions.</li>
          <li><strong>Literary & Debating Society:</strong> Elocution, mock parliament, creative writing.</li>
          <li><strong>Rotaract Youth Club:</strong> Community health drives, blood donation, charity visits.</li>
        </ul>
      `,
    },
    {
      slug: "career-guidance",
      section: "student-life",
      title: "Career Guidance & Counseling Cell",
      subtitle: "Mentoring students toward rewarding higher education paths",
      bannerImage: "/uploads/principal.svg",
      content: `
        <h2>Shaping Future Horizons</h2>
        <p>Our career cell conducts regular interactive workshops with university professors, corporate executives, civil servants, and alumni mentors to guide students through career choices post-PUC.</p>
      `,
    },
    {
      slug: "student-achievements",
      section: "student-life",
      title: "Student Achievements",
      subtitle: "Celebrating our young achievers across academics, sports, and arts",
      bannerImage: "/uploads/campus-hero.svg",
      content: `
        <h2>Pride of RBANMS</h2>
        <p>Explore the honors, state board ranks, national athletic medals, and hackathon victories achieved by our bright students.</p>
      `,
    },
    {
      slug: "faculty-achievements",
      section: "student-life",
      title: "Faculty Achievements",
      subtitle: "Honoring our educators' research, publications, and state awards",
      bannerImage: "/uploads/director.svg",
      content: `
        <h2>Excellence in Pedagogy</h2>
        <p>Our lecturers actively publish educational articles, author board preparatory guides, and receive state honors for exemplary classroom pedagogy.</p>
      `,
    },
    {
      slug: "campus-facilities",
      section: "student-life",
      title: "Campus Infrastructure & Facilities",
      subtitle: "A serene, heritage-rich learning environment near Ulsoor Lake",
      bannerImage: "/uploads/campus-hero.svg",
      content: `
        <h2>World-Class Amenities in Central Bengaluru</h2>
        <p>Located on Annaswamy Mudaliar Road, the RBANMS campus provides lush greenery, ventilated heritage classrooms, smart projectors, clean RO drinking water plants, and separate common rooms.</p>
      `,
    },
    {
      slug: "transport",
      section: "student-life",
      title: "Transport & Connectivity",
      subtitle: "Centrally connected via BMTC buses and Namma Metro",
      bannerImage: "/uploads/campus-hero.svg",
      content: `
        <h2>Unmatched Central Location</h2>
        <p>Situated in Sivanchetti Gardens near Ulsoor Lake, our campus is within 1 km of Trinity Metro Station and MG Road Metro Station, and directly connected by dozens of BMTC bus routes from all parts of Bengaluru.</p>
      `,
    },
    {
      slug: "canteen",
      section: "student-life",
      title: "College Canteen & Cafeteria",
      subtitle: "Hygienic, nutritious, and subsidized meals and snacks",
      bannerImage: "/uploads/campus-hero.svg",
      content: `
        <h2>Nutritious Dining on Campus</h2>
        <p>The student canteen serves wholesome South Indian breakfast, nutritious vegetarian lunches, fruit juices, and snacks at highly subsidized rates under stringent food safety hygiene supervision.</p>
      `,
    },

    // Media section
    {
      slug: "news",
      section: "media",
      title: "Campus News & Press Releases",
      subtitle: "Latest happenings and milestones across RBANMS institutions",
      bannerImage: "/uploads/campus-hero.svg",
      content: `<h2>Latest News & Media Bulletins</h2><p>Stay informed with the latest updates from our campus.</p>`,
    },
    {
      slug: "announcements",
      section: "media",
      title: "Official Announcements",
      subtitle: "Important institutional advisories and public notices",
      bannerImage: "/uploads/campus-hero.svg",
      content: `<h2>Official College Announcements</h2><p>Official notices and academic communications.</p>`,
    },
    {
      slug: "circulars",
      section: "media",
      title: "Board Circulars & Orders",
      subtitle: "Karnataka Pre-University Department circulars and guidelines",
      bannerImage: "/uploads/campus-hero.svg",
      content: `<h2>Department of PU Education Circulars</h2><p>Direct updates regarding board rules and exam schedules.</p>`,
    },
    {
      slug: "notice-board",
      section: "media",
      title: "Digital Notice Board",
      subtitle: "Live feed of academic, examination, and extracurricular notifications",
      bannerImage: "/uploads/campus-hero.svg",
      content: `<h2>Live Campus Notice Board</h2><p>All active notices, timetables, and circulars.</p>`,
    },
    {
      slug: "events",
      section: "media",
      title: "Upcoming & Past Events",
      subtitle: "Conferences, festivals, tournaments, and celebrations",
      bannerImage: "/uploads/campus-hero.svg",
      content: `<h2>College Events & Highlights</h2><p>Calendar of fests, athletic meets, and memorial days.</p>`,
    },
    {
      slug: "photo-gallery",
      section: "media",
      title: "Photo Gallery",
      subtitle: "Visual snapshots of campus life, labs, sports, and celebrations",
      bannerImage: "/uploads/campus-hero.svg",
      content: `<h2>Moments at RBANMS</h2><p>Explore high-resolution photographs from campus life.</p>`,
    },
    {
      slug: "video-gallery",
      section: "media",
      title: "Video Gallery",
      subtitle: "Campus walkthroughs, guest lectures, and student performances",
      bannerImage: "/uploads/campus-hero.svg",
      content: `<h2>Campus Video Archive</h2><p>Watch recordings of founder's day, annual day, and laboratory demonstrations.</p>`,
    },

    // Alumni section
    {
      slug: "alumni",
      section: "alumni",
      title: "Alumni Association & Recognition",
      subtitle: "A global network of leaders and proud RBANMS graduates",
      bannerImage: "/uploads/founder-arcot.svg",
      content: `
        <h2>RBANMS Alumni Network: Over A Century of Pride</h2>
        <p>Our alumni community encompasses distinguished judges, civil servants, doctors, engineers, military commanders, artists, and entrepreneurs who trace their formative years to RBANMS.</p>
        <p>The Alumni Association hosts annual reunions, provides student mentorship, sponsors endowment scholarships, and guides graduating students toward university and professional careers.</p>
      `,
    },
    {
      slug: "success-stories",
      section: "alumni",
      title: "Distinguished Alumni Success Stories",
      subtitle: "Inspirational journeys of graduates who made their mark",
      bannerImage: "/uploads/campus-hero.svg",
      content: `
        <h2>Inspiring Success Stories</h2>
        <div class="space-y-6 my-6">
          <div class="p-4 border rounded-lg bg-gray-50 dark:bg-gray-800">
            <h4 class="font-bold text-lg">Dr. V. Mohan Rao (Batch of 1978 - Science)</h4>
            <p class="text-sm text-blue-700 dark:text-blue-400 font-medium">Chief Cardiac Surgeon, Manipal Hospitals</p>
            <p class="text-gray-600 dark:text-gray-300 mt-2">"The solid grounding in biology and physics provided by RBANMS laid the bedrock of my medical career."</p>
          </div>
          <div class="p-4 border rounded-lg bg-gray-50 dark:bg-gray-800">
            <h4 class="font-bold text-lg">Smt. Meenakshi Sundaram (Batch of 1992 - Commerce)</h4>
            <p class="text-sm text-blue-700 dark:text-blue-400 font-medium">Partner, Deloitte India</p>
            <p class="text-gray-600 dark:text-gray-300 mt-2">"The dedication of our commerce teachers gave me the analytical confidence to clear CA on my very first attempt."</p>
          </div>
        </div>
      `,
    },

    // Contact section
    {
      slug: "contact-us",
      section: "contact",
      title: "Contact Us & Campus Location",
      subtitle: "Get in touch with our administrative and admissions desk",
      bannerImage: "/uploads/campus-hero.svg",
      content: `
        <h2>Visit RBANM's Pre-University College</h2>
        <p>We are centrally located next to Ulsoor Lake, easily accessible by Metro and BMTC.</p>
        <p><strong>Campus Address:</strong><br/>12, Annaswamy Mudaliar Road, Near Ulsoor Lake,<br/>Sivanchetti Gardens, Bengaluru, Karnataka 560042</p>
        <p><strong>Phone Numbers:</strong><br/>+91 80 2551 2911<br/>+91 80 2554 4452</p>
        <p><strong>Official Emails:</strong><br/>Admissions: admissions@rbanmspuc.edu.in<br/>Principal: principal@rbanmspuc.edu.in</p>
      `,
    },
  ];

  for (const p of pagesData) {
    await prisma.page.upsert({
      where: { slug: p.slug },
      update: p,
      create: p,
    });
  }
  console.log(`Seeded ${pagesData.length} Pages.`);

  // 13. Sample Enquiries (15 Multi-Campus Synthetic Leads across 5 Campuses)
  const sampleEnquiries = [
    // ITPL Campus (Whitefield)
    {
      applicationNumber: "ENQ-2025-0101",
      fullName: "Karthik Venkatesh",
      email: "karthik.v@concept-demo.test",
      phone: "+91 98450 12345",
      courseInterested: "PCMC",
      campus: "ITPL Campus (Whitefield)",
      natureOfEnquiry: "ADMISSIONS",
      tenthPercentage: 92.4,
      schoolName: "St. Germain High School",
      parentName: "Venkatesh Murthy",
      parentPhone: "+91 98450 67890",
      address: "No. 45, Whitefield Main Road",
      city: "Bengaluru",
      message: "Interested in PCMC combination. Want to join integrated coaching for KCET and JEE Main.",
      status: "NEW",
      notes: "Scored 98/100 in Mathematics. Potential merit scholarship candidate.",
    },
    {
      applicationNumber: "ENQ-2025-0102",
      fullName: "Pooja Hegde",
      email: "pooja.hegde@concept-demo.test",
      phone: "+91 98451 23456",
      courseInterested: "PCMB",
      campus: "ITPL Campus (Whitefield)",
      natureOfEnquiry: "ADMISSIONS",
      tenthPercentage: 89.0,
      schoolName: "Delhi Public School Whitefield",
      parentName: "S. Hegde",
      parentPhone: "+91 98451 78901",
      address: "Near Hope Farm Junction",
      city: "Bengaluru",
      message: "Looking for medical entrance preparation track alongside state board syllabus.",
      status: "CONTACTED",
      notes: "Attended counseling call on Oct 14. Scheduled in-person lab tour.",
    },
    {
      applicationNumber: "ENQ-2025-0103",
      fullName: "Innovate EdTech Labs",
      email: "partnerships@innovate-edtech.test",
      phone: "+91 98452 34567",
      courseInterested: "General / Multiple",
      campus: "ITPL Campus (Whitefield)",
      natureOfEnquiry: "VENDOR",
      tenthPercentage: null,
      schoolName: null,
      parentName: null,
      parentPhone: null,
      address: "Brigade Tech Gardens, Whitefield",
      city: "Bengaluru",
      message: "Proposal for AI and Robotics incubation lab setup for senior secondary science students.",
      status: "APPLIED",
      notes: "Forwarded proposal deck to Principal and IT department for evaluation.",
    },

    // HRBR Layout Campus (Kalyan Nagar)
    {
      applicationNumber: "ENQ-2025-0104",
      fullName: "Mohammed Farhan",
      email: "farhan.m@concept-demo.test",
      phone: "+91 98864 77301",
      courseInterested: "PCMB",
      campus: "HRBR Layout Campus (Kalyan Nagar)",
      natureOfEnquiry: "ADMISSIONS",
      tenthPercentage: 94.0,
      schoolName: "National Public School, Indiranagar",
      parentName: "Farooq Ahmed",
      parentPhone: "+91 98864 55410",
      address: "88, CMH Road, Indiranagar",
      city: "Bengaluru",
      message: "Aiming for NEET medical entrance. Need confirmation on Biology laboratory facilities.",
      status: "ADMITTED",
      notes: "Admission confirmed. Paid semester 1 fees. Issued roll number S-2025-042.",
    },
    {
      applicationNumber: "ENQ-2025-0105",
      fullName: "Ananya Deshmukh",
      email: "ananya.d@concept-demo.test",
      phone: "+91 98865 88412",
      courseInterested: "CEBA",
      campus: "HRBR Layout Campus (Kalyan Nagar)",
      natureOfEnquiry: "ADMISSIONS",
      tenthPercentage: 86.5,
      schoolName: "Clarence High School",
      parentName: "S. Deshmukh",
      parentPhone: "+91 98865 11223",
      address: "Kammanahalli Main Road",
      city: "Bengaluru",
      message: "Interested in commerce with computational analytics.",
      status: "CONTACTED",
      notes: "Called on Monday. Parent enquired about transport bus stops.",
    },
    {
      applicationNumber: "ENQ-2025-0106",
      fullName: "Dr. Arvind Swaminathan",
      email: "arvind.phd@concept-demo.test",
      phone: "+91 98866 99523",
      courseInterested: "General / Multiple",
      campus: "HRBR Layout Campus (Kalyan Nagar)",
      natureOfEnquiry: "CAREERS",
      tenthPercentage: null,
      schoolName: null,
      parentName: null,
      parentPhone: null,
      address: "HRBR Layout 2nd Block",
      city: "Bengaluru",
      message: "Application for Senior Physics Lecturer post. 9 years experience with JEE coaching.",
      status: "NEW",
      notes: "Resume received. Candidate shortlisted for teaching demo round.",
    },

    // BTM Layout Campus (South)
    {
      applicationNumber: "ENQ-2025-0107",
      fullName: "Sneha Reddy",
      email: "sneha.reddy@concept-demo.test",
      phone: "+91 97312 88492",
      courseInterested: "CEBA",
      campus: "BTM Layout Campus (South)",
      natureOfEnquiry: "ADMISSIONS",
      tenthPercentage: 88.5,
      schoolName: "Kendriya Vidyalaya ASC Centre",
      parentName: "Rajasekhar Reddy",
      parentPhone: "+91 97312 11029",
      address: "12/A, Victoria Layout",
      city: "Bengaluru",
      message: "Aspiring Chartered Accountant looking for Commerce with Computer Science.",
      status: "CONTACTED",
      notes: "Parents visited BTM campus. Highly satisfied with CA-Foundation cell.",
    },
    {
      applicationNumber: "ENQ-2025-0108",
      fullName: "Rohan Kulkarni",
      email: "rohan.k@concept-demo.test",
      phone: "+91 97313 77501",
      courseInterested: "SEBA",
      campus: "BTM Layout Campus (South)",
      natureOfEnquiry: "ADMISSIONS",
      tenthPercentage: 91.2,
      schoolName: "St. Joseph's Boys' High School",
      parentName: "M. Kulkarni",
      parentPhone: "+91 97313 22334",
      address: "Bannerghatta Main Road",
      city: "Bengaluru",
      message: "Interested in Statistics and Economics for future finance and econometrics degrees.",
      status: "ADMITTED",
      notes: "Direct merit allocation approved by campus head.",
    },
    {
      applicationNumber: "ENQ-2025-0109",
      fullName: "Fintech Minds Academy",
      email: "director@fintechminds.test",
      phone: "+91 97314 66612",
      courseInterested: "General / Multiple",
      campus: "BTM Layout Campus (South)",
      natureOfEnquiry: "VENDOR",
      tenthPercentage: null,
      schoolName: null,
      parentName: null,
      parentPhone: null,
      address: "Koramangala 5th Block",
      city: "Bengaluru",
      message: "Proposal to conduct certified financial modeling and stock simulator workshops.",
      status: "NEW",
      notes: "Proposal under review by Commerce HOD.",
    },

    // Byrathi Campus (Hennur)
    {
      applicationNumber: "ENQ-2025-0110",
      fullName: "Gautam Shenoy",
      email: "gautam.s@concept-demo.test",
      phone: "+91 99001 11223",
      courseInterested: "PCMB",
      campus: "Byrathi Campus (Hennur)",
      natureOfEnquiry: "ADMISSIONS",
      tenthPercentage: 82.0,
      schoolName: "Ryan International School",
      parentName: "D. Shenoy",
      parentPhone: "+91 99001 55667",
      address: "Hennur Bagalur Road",
      city: "Bengaluru",
      message: "Enquiring about science seats and sports track facilities at Byrathi green campus.",
      status: "NEW",
      notes: "Invited for weekend sports trial and campus counseling session.",
    },
    {
      applicationNumber: "ENQ-2025-0111",
      fullName: "Meghana Iyer",
      email: "meghana.i@concept-demo.test",
      phone: "+91 99002 22334",
      courseInterested: "PCMC",
      campus: "Byrathi Campus (Hennur)",
      natureOfEnquiry: "ADMISSIONS",
      tenthPercentage: 93.6,
      schoolName: "Vidyashilp Academy",
      parentName: "V. Iyer",
      parentPhone: "+91 99002 66778",
      address: "Thanisandra Main Road",
      city: "Bengaluru",
      message: "Seeking admission for PCMC. Requesting information regarding bus routes.",
      status: "APPLIED",
      notes: "Documents verified. Seat provisional reservation in Progress.",
    },
    {
      applicationNumber: "ENQ-2025-0112",
      fullName: "Rajeshwari S.",
      email: "rajeshwari.chem@concept-demo.test",
      phone: "+91 99003 33445",
      courseInterested: "General / Multiple",
      campus: "Byrathi Campus (Hennur)",
      natureOfEnquiry: "CAREERS",
      tenthPercentage: null,
      schoolName: null,
      parentName: null,
      parentPhone: null,
      address: "Kogilu Cross, Yelahanka",
      city: "Bengaluru",
      message: "Application for Chemistry Laboratory Instructor position. 4 years college lab experience.",
      status: "CONTACTED",
      notes: "Screening interview completed. Practical lab demo scheduled.",
    },

    // NICE Road Campus (West)
    {
      applicationNumber: "ENQ-2025-0113",
      fullName: "Divya Prakash",
      email: "divya.p@concept-demo.test",
      phone: "+91 94480 33921",
      courseInterested: "SEBA",
      campus: "NICE Road Campus (West)",
      natureOfEnquiry: "ADMISSIONS",
      tenthPercentage: 81.2,
      schoolName: "Bhartiya Vidya Bhavan",
      parentName: "Prakash Rao",
      parentPhone: "+91 94480 88201",
      address: "105, Outer Ring Road, Nayandahalli",
      city: "Bengaluru",
      message: "Interested in Commerce SEBA combination with foundation civil services preparation.",
      status: "APPLIED",
      notes: "Application form submitted with attested certificates.",
    },
    {
      applicationNumber: "ENQ-2025-0114",
      fullName: "Varun Teja",
      email: "varun.t@concept-demo.test",
      phone: "+91 94481 44032",
      courseInterested: "PCMC",
      campus: "NICE Road Campus (West)",
      natureOfEnquiry: "ADMISSIONS",
      tenthPercentage: 87.8,
      schoolName: "BGS National Public School",
      parentName: "Teja Murthy",
      parentPhone: "+91 94481 99120",
      address: "Kengeri Satellite Town",
      city: "Bengaluru",
      message: "Admitted into PCMC stream. Enquiring about robotics club activities.",
      status: "ADMITTED",
      notes: "Enrolled and fee cleared. Interested in extracurricular robotics team.",
    },
    {
      applicationNumber: "ENQ-2025-0115",
      fullName: "Sanjay Kumar (Parent)",
      email: "sanjay.k@concept-demo.test",
      phone: "+91 94482 55143",
      courseInterested: "General / Multiple",
      campus: "NICE Road Campus (West)",
      natureOfEnquiry: "GENERAL",
      tenthPercentage: null,
      schoolName: null,
      parentName: "Sanjay Kumar",
      parentPhone: "+91 94482 55143",
      address: "Rajarajeshwari Nagar",
      city: "Bengaluru",
      message: "Enquiry regarding pickup and drop timings for bus route #14 connecting RR Nagar to campus.",
      status: "NEW",
      notes: "Assigned to transport coordinator for prompt schedule response.",
    },
  ];

  await prisma.enquiry.deleteMany({});
  for (const enq of sampleEnquiries) {
    await prisma.enquiry.create({ data: enq });
  }
  console.log("Seeded Sample Enquiries.");

  console.log("Database seed completed successfully!");
}

main()
  .catch((e) => {
    console.error("Error seeding database:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
