# Project Assumptions & Design Decisions

This document tracks all defaults and architectural decisions made autonomously for the RBANMS Pre-University College web application and Admin CRM portal.

1. **Database & Storage Architecture**:
   - Single unified SQLite database stored locally at `prisma/dev.db`.
   - Shared static asset folder at `public/uploads/` serving all media uploaded by the Admin CRM directly on `/uploads/{filename}`.
   - Any database update triggers Next.js cache revalidation (`revalidatePath`) to guarantee zero stale cache on the public website.

2. **Skin & Theming**:
   - Dynamic theme colors (Primary: `#1e3a8a` Deep Royal Navy; Secondary: `#b45309` Amber/Gold; Accent: `#0284c7` Sky Blue) stored in the `SiteSetting` database table and injected via CSS variables into the `:root` element.
   - Admin CRM features live color pickers to instantly alter the college branding and theme across the entire site.
   - Dark mode toggle supported using localStorage and `dark` class on `<html>`.

3. **Authentication & Authorization**:
   - JWT sessions stored in HTTP-only, secure, `SameSite=Lax` cookies named `rbanms_admin_token`.
   - Passwords securely hashed with `bcryptjs` (salt rounds: 10).
   - Pre-seeded Super Admin:
     - Email: `admin@rbanmspuc.edu.in`
     - Password: `Admin@RBANMS2025!`
     - Role: `SUPER_ADMIN`
   - Pre-seeded Staff / Receptionist:
     - Email: `staff@rbanmspuc.edu.in`
     - Password: `Staff@RBANMS2025!`
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
