/**
 * Institutional Portal & Admissions CRM - Central Configuration
 * 
 * To re-skin this portal for a new client/institution (e.g., CMR National PU College,
 * St. Joseph's, or any other school/college), customize the values below.
 * Database settings (SiteSetting table) can also override these defaults at runtime.
 */

export interface CampusConfig {
  id: string;
  name: string;
  shortCode: string;
  isMain?: boolean;
  address: string;
  phone: string;
  email: string;
}

export interface CourseConfig {
  code: string;
  name: string;
  stream: "SCIENCE" | "COMMERCE" | "ARTS";
  subjects: string[];
  description: string;
  careerProspects?: string;
}

export interface InstitutionConfig {
  name: string;
  shortName: string;
  tagline: string;
  founderName?: string;
  establishedYear: string;
  affiliationCode?: string;
  logoUrl: string;
  crestUrl?: string;
  theme: {
    primaryColor: string;       // Main brand color (e.g. Maroon #800000, Navy #1E3A8A, Forest #1B4D3E)
    secondaryColor: string;     // Hover states, dark header/footer, sidebar (#5A0F1B)
    primaryLight: string;       // Borders, badges, light highlights (#A33B48)
    primaryTint: string;        // Soft tinted container backgrounds (#F7E9EB)
    accentColor: string;        // Accent highlights, badges, callout buttons (#C9A227)
    headingColor: string;       // Primary heading color (#1E3A8A)
    lightBg: string;            // Default page background (#FFFFFF)
  };
  contact: {
    generalEmail: string;
    admissionsEmail: string;
    phone: string;
    whatsappNumber: string;     // Without '+' for wa.me links, e.g. 918025512911
    address: string;
    city: string;
    postalCode: string;
    mapEmbedUrl: string;
  };
  social: {
    facebook?: string;
    instagram?: string;
    twitter?: string;
    youtube?: string;
    linkedin?: string;
  };
  campuses: CampusConfig[];
  courses: CourseConfig[];
}

export const defaultInstitutionConfig: InstitutionConfig = {
  name: "RBANM's Pre-University College",
  shortName: "RBANMS PUC",
  tagline: "Empowering Minds, Enriching Character Since 1883",
  founderName: "Dharmarathnakara Rai Bahadur Arcot Narrainswamy Mudaliar",
  establishedYear: "1883",
  affiliationCode: "AS0042",
  logoUrl: "/images/rbanms-logo.svg",
  crestUrl: "/uploads/rbanms-crest.png",
  theme: {
    primaryColor: "#000000",
    secondaryColor: "#000000",
    primaryLight: "#333333",
    primaryTint: "#F9FAFB",
    accentColor: "#000000",
    headingColor: "#000000",
    lightBg: "#FFFFFF",
  },
  contact: {
    generalEmail: "principal@rbanmspuc.edu.in",
    admissionsEmail: "admissions@rbanmspuc.edu.in",
    phone: "+91 80 2551 2911 / +91 80 2554 4452",
    whatsappNumber: "918025512911",
    address: "12, Annaswamy Mudaliar Road, Near Ulsoor Lake, Bengaluru, Karnataka 560042",
    city: "Bengaluru",
    postalCode: "560042",
    mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3887.8926946633633!2d77.6163339748414!3d12.978712987337326!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae1684c47f5bc7%3A0xbcf239b6b7123aa1!2sRBANM's%20Pre%20University%20College!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin",
  },
  social: {
    facebook: "https://facebook.com/rbanmspuc",
    instagram: "https://instagram.com/rbanmspuc",
    twitter: "https://twitter.com/rbanmspuc",
    youtube: "https://youtube.com/@rbanmspuc",
    linkedin: "https://linkedin.com/school/rbanmspuc",
  },
  campuses: [
    {
      id: "main-campus",
      name: "Main Campus (Ulsoor)",
      shortCode: "ULSOOR",
      isMain: true,
      address: "12, Annaswamy Mudaliar Road, Near Ulsoor Lake, Bengaluru 560042",
      phone: "+91 80 2551 2911",
      email: "admissions@rbanmspuc.edu.in",
    },
  ],
  courses: [
    {
      code: "PCMB",
      name: "Physics, Chemistry, Mathematics, Biology",
      stream: "SCIENCE",
      subjects: ["Physics", "Chemistry", "Mathematics", "Biology"],
      description: "Ideal for aspiring medical, biotechnology, bioinformatics, and pure science researchers.",
      careerProspects: "MBBS, BDS, B.Pharm, Biotechnology, Pure Sciences (B.Sc / M.Sc), Agricultural Sciences.",
    },
    {
      code: "PCMC",
      name: "Physics, Chemistry, Mathematics, Computer Science",
      stream: "SCIENCE",
      subjects: ["Physics", "Chemistry", "Mathematics", "Computer Science"],
      description: "Designed for future engineers, software architects, and computational data scientists.",
      careerProspects: "B.E./B.Tech, B.S. in Computer Science, BCA, Data Science, AI & Robotics.",
    },
    {
      code: "CEBA",
      name: "Computer Science, Economics, Business Studies, Accountancy",
      stream: "COMMERCE",
      subjects: ["Computer Science", "Economics", "Business Studies", "Accountancy"],
      description: "High-demand tech-commerce fusion combining business accounting with software fundamentals.",
      careerProspects: "Fintech, B.Com, BBA, Data Analytics in Finance, Banking.",
    },
    {
      code: "SEBA",
      name: "Statistics, Economics, Business Studies, Accountancy",
      stream: "COMMERCE",
      subjects: ["Statistics", "Economics", "Business Studies", "Accountancy"],
      description: "Quantitative commerce stream emphasizing business modeling, statistical analytics, and auditing.",
      careerProspects: "CA, CS, CMA, Actuarial Sciences, Econometrics, Investment Banking.",
    },
    {
      code: "HEGP",
      name: "History, Economics, Geography, Political Science",
      stream: "ARTS",
      subjects: ["History", "Economics", "Geography", "Political Science"],
      description: "Foundational humanities stream preparing students for public administration, law, and diplomacy.",
      careerProspects: "UPSC / Civil Services, Law (BA LLB), Journalism, Public Policy, International Relations.",
    },
  ],
};

/**
 * Example template for multi-campus institution deployment (e.g. CMR National PU College)
 */
export const cmrNpucConfigTemplate: Partial<InstitutionConfig> = {
  name: "CMR National PU College",
  shortName: "CMR NPUC",
  tagline: "Nurturing Thinkers and Leaders",
  establishedYear: "2004",
  logoUrl: "/images/cmr-logo.svg",
  theme: {
    primaryColor: "#0D3B66",       // CMR Deep Blue
    secondaryColor: "#082440",     // Dark Navy
    primaryLight: "#1D5F9E",
    primaryTint: "#EEF4F8",
    accentColor: "#F4D35E",        // Warm Academic Gold
    headingColor: "#0D3B66",
    lightBg: "#FFFFFF",
  },
  contact: {
    generalEmail: "info.npuc@cmr.ac.in",
    admissionsEmail: "admissions.npuc@cmr.ac.in",
    phone: "080-47095123",
    whatsappNumber: "918047095123",
    address: "Bengaluru, Karnataka",
    city: "Bengaluru",
    postalCode: "560084",
    mapEmbedUrl: "https://maps.google.com",
  },
  campuses: [
    {
      id: "itpl",
      name: "ITPL Campus (Whitefield)",
      shortCode: "ITPL",
      isMain: false,
      address: "ITPL Main Road, Whitefield, Bengaluru",
      phone: "080-47095123",
      email: "admissions.npuc@cmr.ac.in",
    },
    {
      id: "hrbr",
      name: "HRBR Layout Campus (Kalyan Nagar)",
      shortCode: "HRBR",
      isMain: true,
      address: "No. 2079, 2nd Main Road, HRBR Layout 3rd Block, Bengaluru 560084",
      phone: "080-47095123",
      email: "admissions.npuc@cmr.ac.in",
    },
    {
      id: "btm",
      name: "BTM Layout Campus",
      shortCode: "BTM",
      isMain: false,
      address: "BTM Layout 2nd Stage, Bengaluru",
      phone: "080-47095123",
      email: "admissions.npuc@cmr.ac.in",
    },
    {
      id: "byrathi",
      name: "Byrathi Campus (Hennur Bagalur Rd)",
      shortCode: "BYRATHI",
      isMain: false,
      address: "Byrathi, Off Hennur Main Road, Bengaluru",
      phone: "080-47095123",
      email: "admissions.npuc@cmr.ac.in",
    },
    {
      id: "nice-road",
      name: "NICE Road Campus",
      shortCode: "NICE",
      isMain: false,
      address: "NICE Road Junction, Bengaluru",
      phone: "080-47095123",
      email: "admissions.npuc@cmr.ac.in",
    },
  ],
};
