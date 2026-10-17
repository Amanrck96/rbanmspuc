# RBANMS Pre-University College — Official Portal & Admin CRM

A full-stack institutional web portal and administrative CRM system built for **RBANMS Pre-University College**, Bengaluru (Estd. 1883 by Dharmarathnakara Rai Bahadur Arcot Narrainswamy Mudaliar).

Both the public portal and the administrative console share **ONE unified SQLite database** (`prisma/dev.db`) and **ONE shared uploads directory** (`public/uploads`), ensuring zero stale cache and instantaneous reflection of all changes.

---

## 🌟 Key Architecture & Capabilities

1. **Shared Unified Database**:
   - Single Prisma SQLite database (`prisma/dev.db`) used simultaneously by public visitors and administrators.
   - Easily switchable to PostgreSQL by updating `datasource db` in `prisma/schema.prisma`.

2. **Zero Stale Cache Image & Asset Storage**:
   - Shared asset directory at `/uploads/{filename}` serving all images, brochures, and documents.
   - Dynamic route handler (`src/app/uploads/[...filename]/route.ts`) enforces `Cache-Control: no-cache, no-store, must-revalidate` alongside Next.js on-demand revalidation (`revalidatePath`).
   - In-place image replacements reflect instantaneously across the entire website without server restarts or browser cache delays.

3. **Complete Dynamic Sitemap (48+ Pages Seeded)**:
   - **Home**: Live alert banner, quick action tiles, latest notices, upcoming events, academic achievements, gallery preview, Principal's message preview, quick links, dynamic footer.
   - **About Us**: History & Founder Arcot Narrainswamy Mudaliar, Legacy / Vision & Mission, Principal's Message, Director's Message, Management & Trustees, Who's Who Leadership Directory, Statements & Declarations, Accreditation & Recognition (Code AS0042), Policies & Mandatory Documents.
   - **Admissions**: Admission Process & Step-by-Step Guidelines, Eligibility Criteria, Courses Offered (PCMB, PCMC, CEBA, SEBA, HEGP), Fee Structure, Scholarships & Endowments, Prospectus & Brochure, Downloads & Forms, FAQs, Online Application / Enquiry Form.
   - **Academics**: 9 Academic Departments, Faculty Directory with credentials, Academic Calendar, Timetables, Syllabus & Blueprints, Examination Schedule, Board Results (98.4% pass record), Library & Resource Center, Computer Laboratories, Science Laboratories.
   - **Student Life**: Sports & Athletics, NCC (Army Wing), Cultural Activities, Clubs & Societies, Career Guidance, Student Achievements, Faculty Achievements, Campus Facilities, Transport & Connectivity, College Canteen.
   - **Media**: News & Press Releases, Official Announcements, Circulars, Digital Notice Board, Events Calendar, Photo Gallery, Video Gallery.
   - **Alumni**: Alumni Recognition & Success Stories.
   - **Contact**: Contact Us, Embedded Campus Google Map, Official Phone, Admissions Email, Interactive Enquiry Form.

4. **Multi-Domain Fuzzy Search Engine**:
   - Global search modal (accessible via `Cmd+K` or search button in Utility Bar) searches across:
     - Dynamic Pages
     - Notices & Circulars
     - News & Upcoming Events
     - Academic Combinations & Syllabi
     - Faculty & Departments
     - Downloads & Application Forms
     - Frequently Asked Questions
     - Gallery Captions
   - Categorized results with highlighted keyword matches (`<mark>`).
   - Admin CRM search extends across all student enquiries, applications, and system users.

5. **Executive Admin CRM Console (`/admin`)**:
   - **Admissions Pipeline CRM**: Track applicant leads (`NEW` → `CONTACTED` → `APPLIED` → `ADMITTED` → `REJECTED`), counselor notes, follow-up dates, 1-click WhatsApp (`https://wa.me/`) & Email (`mailto:`) reply buttons, and 1-click CSV/Excel export.
   - **Pages CMS**: Create, edit, publish/unpublish every page with a formatting rich text editor (headings, bold, italic, lists, blockquotes, tables, images).
   - **Content Managers**: Dedicated CRUD panels for Notices, Events, News, Courses, Faculty, Downloads, FAQs, Gallery items, and Achievements.
   - **Media Library**: Upload, preview, download, and in-place replace images and PDFs with instant cache invalidation.
   - **Brand & Theme Customizer (Skin)**: Edit college name, logo, banner announcement, and brand colors (Primary, Secondary, Accent) via live color pickers—propagating immediately to the public site via CSS variable injection.
   - **Activity Audit Trail**: Logs every create, update, delete, restore, and login event with actor, role, and timestamp.
   - **Recycle Bin & 1-Click Restore (Undo)**: Any deleted page, notice, or course is staged in the recycle bin and can be restored back to live status with one click.
   - **Staff & User Management**: Role-based access control supporting `SUPER_ADMIN`, `EDITOR`, and `RECEPTIONIST` roles.

---

## 🔐 Admin Login Credentials

| Role | Email | Password | Access Level |
| :--- | :--- | :--- | :--- |
| **Super Admin** | `admin@rbanmspuc.edu.in` | `Admin@RBANMS2025!` | Full System & Data Access |
| **Admissions Counselor** | `staff@rbanmspuc.edu.in` | `Staff@RBANMS2025!` | CRM Enquiries & Student Follow-ups |

*A 1-click **"Fill Super Admin"** button is also available directly on the login screen (`/admin/login`) for convenience.*

---

## 🚀 Running the Project

### Prerequisites
- Node.js 18+ (tested on Node v20/v22)
- npm or yarn

### 1. Installation
```bash
npm install
```

### 2. Database Setup & Seeding
The project comes with a pre-seeded SQLite database containing all 48+ pages, faculty, courses, and sample notices. If you wish to re-seed:
```bash
npx prisma db seed
```

### 3. Running Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 4. Running Production Server
```bash
npm run build
npm run start
```

### 5. Automated E2E Browser Test Suite
Run the 10-step automated browser validation suite using Puppeteer & Google Chrome:
```bash
npx tsx scripts/e2e-browser-test.ts
```

---

## 🧪 Verification & Checklist Status

- [x] **Public site runs with no errors, all menu pages open** (Verified across 40+ sitemap endpoints)
- [x] **Admin login works; protected routes cannot be opened without login** (Verified with JWT authentication and middleware redirection)
- [x] **Edit text in admin -> website updates immediately** (Verified with on-demand cache revalidation)
- [x] **Replace an image in admin -> website image updates immediately** (Verified with dynamic `/uploads` route handler and `no-cache` headers)
- [x] **Add / delete a notice, event, news -> reflected on the website** (Verified with live database CRUD and Recycle Bin staging)
- [x] **Enquiry form on website -> appears in the admin CRM** (Verified with application ID generation `RBANMS-2025-XXXX` and counselor CRM view)
- [x] **Search finds content on both website and admin** (Verified with multi-token keyword search and categorized match highlights)
- [x] **Responsive on mobile; no console errors** (Verified at 375x667 viewport with mobile navigation drawer)
- [x] **README.md with run instructions + seed data with sample content**
