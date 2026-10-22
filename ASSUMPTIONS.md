# Project Assumptions & Design Decisions

This document tracks all defaults and architectural decisions made autonomously for the RBANMS Pre-University College web application and Admin CRM portal.

1. **Database & Storage Architecture**:
   - Single unified SQLite database stored locally at `prisma/dev.db`.
   - Shared static asset folder at `public/uploads/` serving all media uploaded by the Admin CRM directly on `/uploads/{filename}`.
   - Any database update triggers Next.js cache revalidation (`revalidatePath`) to guarantee zero stale cache on the public website.

2. **Mandatory Brand Theme (Maroon & Gold Skin)**:
   - Maroon (`#800000`) is the mandatory primary brand color across every public page and every admin page (headers, buttons, links, footer, section headings, and sidebar).
   - Theme Tokens:
     - `--maroon: #800000` (primary)
     - `--maroon-dark: #5A0F1B` (hover, top bar, footer, admin sidebar)
     - `--maroon-light: #A33B48` (icons, borders, badges)
     - `--maroon-tint: #F7E9EB` (section backgrounds, card highlights)
     - `--gold: #C9A227` (accent, alert banner, highlights)
     - `--cream: #FFF9F2` (page background in light mode)
     - `--text: #2B2B2B`
     - `--white: #FFFFFF`
   - Dark Mode:
     - `--bg: #1A0B0E`, `--card: #2A1216`, `--text: #F5E9EA`, `--maroon: #B03A48`, `--gold: #E0B93A`.
   - WCAG AA Contrast Compliance:
     - Text on gold backgrounds (e.g. Admission Alert Banner) is dark maroon (`#5A0F1B` / `rgb(90, 15, 27)`), maintaining high contrast (> 5.5:1).
     - Buttons use maroon background with crisp white text (`#FFFFFF`), dark-maroon on hover.
     - Secondary buttons use gold outline with dark maroon text on light / gold text on dark.
   - Admin CRM locks the primary brand color to maroon; administrators may only customize accent gold, fonts, and logo URL.

3. **Authentication & Authorization**:
   - JWT sessions stored in HTTP-only, secure, `SameSite=Lax` cookies named `rbanms_admin_token`.
   - Passwords securely hashed with `bcryptjs` (salt rounds: 10).
   - Pre-seeded Super Admin:
     - Configurable via `SEED_ADMIN_EMAIL` and `SEED_ADMIN_PASSWORD`
     - Role: `SUPER_ADMIN`
   - Pre-seeded Staff / Receptionist:
     - Configurable via `SEED_STAFF_EMAIL` and `SEED_STAFF_PASSWORD`
     - Role: `RECEPTIONIST`

4. **Public Sitemap & Content Hierarchy**:
   - Every page listed in the official requirements and docx is pre-seeded into the `Page` database table with rich, historically accurate content reflecting RBANMS's 1883 heritage in Bengaluru, courses (PCMB, PCMC, CEBA, SEBA, HEGP), fees, rules, faculty, and facilities.
   - Dynamic page routing `/about/[slug]`, `/admissions/[slug]`, `/academics/[slug]`, `/student-life/[slug]`, `/media/[slug]`, `/alumni/[slug]`, `/contact` fetches real-time page content from the database.
   - If an admin edits any page content, banner, or publication status, changes take effect immediately on the public website.

5. **Search Engine Implementation**:
   - Unified search endpoint (`/api/search` and public `/search?q=...`) performing case-insensitive partial substring and multi-token matching across:
     - Dynamic Pages
     - Notices & Circulars
     - News & Upcoming Events
     - Academic Courses & Combinations
     - Departments & Faculty Members
     - Downloads & Forms
     - Frequently Asked Questions (FAQs)
     - Media Gallery Items
   - Results are organized by category with highlighted keyword matches and deep links.
   - Admin panel includes a global quick-search bar scanning enquiries, pages, notices, and activity logs.

6. **CRM & Admission Enquiries**:
   - Public online application / enquiry form generates a unique application number (`RBANMS-YYYY-XXXX`).
   - Appears immediately in the `/admin/enquiries` CRM dashboard.
   - Status transitions: `NEW` -> `CONTACTED` -> `APPLIED` -> `ADMITTED` -> `REJECTED`.
   - Includes counselor follow-up dates, internal notes, 1-click WhatsApp (`https://wa.me/`) & Email (`mailto:`) response buttons, and full CSV export.

7. **Recycle Bin & Activity Audit Log**:
   - Activity log captures every CRUD and login action with actor, timestamp, and details.
   - Soft-delete / Deleted items repository allows 1-click undo and restoration of deleted notices, pages, and courses.
