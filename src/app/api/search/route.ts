import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";

function highlightMatches(text: string, queryWords: string[], maxLength = 160): string {
  if (!text) return "";
  // Strip HTML
  const plainText = text.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
  if (!queryWords.length) return plainText.slice(0, maxLength);

  // Find earliest index of any query word
  let firstIdx = -1;
  const lower = plainText.toLowerCase();
  for (const word of queryWords) {
    const idx = lower.indexOf(word.toLowerCase());
    if (idx !== -1 && (firstIdx === -1 || idx < firstIdx)) {
      firstIdx = idx;
    }
  }

  let start = 0;
  if (firstIdx > 40) {
    start = firstIdx - 40;
  }
  let snippet = plainText.slice(start, start + maxLength);
  if (start > 0) snippet = "..." + snippet;
  if (start + maxLength < plainText.length) snippet = snippet + "...";

  // Wrap query words in <mark>
  for (const word of queryWords) {
    if (!word || word.length < 2) continue;
    const regex = new RegExp(`(${word.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`, "gi");
    snippet = snippet.replace(regex, `<mark class="bg-amber-200 dark:bg-amber-900/60 dark:text-amber-200 text-amber-900 font-semibold px-0.5 rounded">$1</mark>`);
  }

  return snippet;
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const query = (searchParams.get("q") || "").trim();
    const scope = searchParams.get("scope") || "public";

    if (!query || query.length < 2) {
      return NextResponse.json({ success: true, results: {}, total: 0 });
    }

    const queryWords = query.toLowerCase().split(/\s+/).filter(Boolean);
    const currentUser = await getCurrentUser();
    const isAdmin = scope === "admin" && !!currentUser;

    // Fetch candidate records
    const [
      pages,
      notices,
      news,
      events,
      courses,
      faculty,
      departments,
      downloads,
      faqs,
      gallery,
      enquiries,
      users,
      mediaFiles
    ] = await Promise.all([
      prisma.page.findMany({ where: { isPublished: true } }),
      prisma.notice.findMany({ where: { isPublished: true } }),
      prisma.news.findMany({ where: { isPublished: true } }),
      prisma.event.findMany({ where: { isPublished: true } }),
      prisma.course.findMany({ where: { isPublished: true } }),
      prisma.faculty.findMany({
        where: { isPublished: true },
        include: { department: true }
      }),
      prisma.department.findMany({ where: { isPublished: true } }),
      prisma.downloadItem.findMany({ where: { isPublished: true } }),
      prisma.faq.findMany({ where: { isPublished: true } }),
      prisma.galleryItem.findMany({}),
      isAdmin ? prisma.enquiry.findMany({ take: 100 }) : Promise.resolve([]),
      isAdmin ? prisma.user.findMany({ take: 50 }) : Promise.resolve([]),
      isAdmin ? prisma.mediaFile.findMany({ take: 100 }) : Promise.resolve([]),
    ]);

    // Scoring and filtering function
    const matchesQuery = (texts: (string | null | undefined)[]) => {
      const combined = texts.filter(Boolean).join(" ").toLowerCase();
      // Partial matching: check if any query word is substring
      return queryWords.some((word) => combined.includes(word));
    };

    const groupedResults: Record<string, any[]> = {};
    let totalCount = 0;

    // 1. Pages
    const matchedPages = pages
      .filter((p) => matchesQuery([p.title, p.subtitle, p.content, p.slug]))
      .map((p) => {
        let url = `/${p.section}/${p.slug}`;
        if (p.slug === "history" || p.section === "about") url = `/about/${p.slug}`;
        if (p.slug === "contact-us") url = "/contact";
        return {
          id: p.id,
          title: p.title,
          subtitle: p.subtitle,
          url,
          category: "Pages & Information",
          snippet: highlightMatches(p.content || p.subtitle || "", queryWords),
        };
      });
    if (matchedPages.length) {
      groupedResults["Pages & Information"] = matchedPages;
      totalCount += matchedPages.length;
    }

    // 2. Notices & Circulars
    const matchedNotices = notices
      .filter((n) => matchesQuery([n.title, n.description, n.category]))
      .map((n) => ({
        id: n.id,
        title: n.title,
        subtitle: n.category,
        url: n.fileUrl || `/media/notice-board`,
        category: "Notices & Circulars",
        snippet: highlightMatches(n.description, queryWords),
      }));
    if (matchedNotices.length) {
      groupedResults["Notices & Circulars"] = matchedNotices;
      totalCount += matchedNotices.length;
    }

    // 3. Courses
    const matchedCourses = courses
      .filter((c) => matchesQuery([c.code, c.name, c.stream, c.subjects, c.careerProspects]))
      .map((c) => ({
        id: c.id,
        title: `${c.code}: ${c.name}`,
        subtitle: `${c.stream} Stream • Intake: ${c.intake}`,
        url: `/admissions/courses-offered#${c.code.toLowerCase()}`,
        category: "Courses & Academics",
        snippet: highlightMatches(`${c.subjects} - Career: ${c.careerProspects}`, queryWords),
      }));
    if (matchedCourses.length) {
      groupedResults["Courses & Academics"] = matchedCourses;
      totalCount += matchedCourses.length;
    }

    // 4. Faculty & Departments
    const matchedFaculty = faculty
      .filter((f) => matchesQuery([f.name, f.designation, f.qualification, f.bio, f.department?.name]))
      .map((f) => ({
        id: f.id,
        title: f.name,
        subtitle: `${f.designation} (${f.department?.name || ""})`,
        url: `/academics/faculty`,
        category: "Faculty & Staff",
        snippet: highlightMatches(`${f.qualification} - ${f.experience} - ${f.bio || ""}`, queryWords),
      }));
    if (matchedFaculty.length) {
      groupedResults["Faculty & Staff"] = matchedFaculty;
      totalCount += matchedFaculty.length;
    }

    // 5. News & Events
    const matchedNews = news
      .filter((n) => matchesQuery([n.title, n.summary, n.content]))
      .map((n) => ({
        id: n.id,
        title: n.title,
        subtitle: `News • ${n.category}`,
        url: `/media/news`,
        category: "News & Events",
        snippet: highlightMatches(n.summary || n.content, queryWords),
      }));
    const matchedEvents = events
      .filter((e) => matchesQuery([e.title, e.description, e.venue]))
      .map((e) => ({
        id: e.id,
        title: e.title,
        subtitle: `Event • Venue: ${e.venue}`,
        url: `/media/events`,
        category: "News & Events",
        snippet: highlightMatches(e.description, queryWords),
      }));
    const combinedNewsEvents = [...matchedNews, ...matchedEvents];
    if (combinedNewsEvents.length) {
      groupedResults["News & Events"] = combinedNewsEvents;
      totalCount += combinedNewsEvents.length;
    }

    // 6. Downloads & Forms
    const matchedDownloads = downloads
      .filter((d) => matchesQuery([d.title, d.category]))
      .map((d) => ({
        id: d.id,
        title: d.title,
        subtitle: `${d.category} • ${d.fileSize}`,
        url: d.fileUrl || "/admissions/downloads-forms",
        category: "Downloads & Forms",
        snippet: highlightMatches(d.title, queryWords),
      }));
    if (matchedDownloads.length) {
      groupedResults["Downloads & Forms"] = matchedDownloads;
      totalCount += matchedDownloads.length;
    }

    // 7. FAQs
    const matchedFaqs = faqs
      .filter((f) => matchesQuery([f.question, f.answer]))
      .map((f) => ({
        id: f.id,
        title: f.question,
        subtitle: `FAQ • ${f.category}`,
        url: `/admissions/faqs`,
        category: "FAQs & Help",
        snippet: highlightMatches(f.answer, queryWords),
      }));
    if (matchedFaqs.length) {
      groupedResults["FAQs & Help"] = matchedFaqs;
      totalCount += matchedFaqs.length;
    }

    // 8. Gallery
    const matchedGallery = gallery
      .filter((g) => matchesQuery([g.title, g.caption, g.category]))
      .map((g) => ({
        id: g.id,
        title: g.title,
        subtitle: `Gallery • ${g.category}`,
        url: `/media/photo-gallery`,
        category: "Gallery Captions",
        snippet: highlightMatches(g.caption || g.title, queryWords),
      }));
    if (matchedGallery.length) {
      groupedResults["Gallery Captions"] = matchedGallery;
      totalCount += matchedGallery.length;
    }

    // Admin-specific results
    if (isAdmin) {
      const matchedEnquiries = enquiries
        .filter((enq) =>
          matchesQuery([
            enq.applicationNumber,
            enq.fullName,
            enq.email,
            enq.phone,
            enq.courseInterested,
            enq.notes,
            enq.city,
          ])
        )
        .map((enq) => ({
          id: enq.id,
          title: `${enq.fullName} (${enq.applicationNumber})`,
          subtitle: `Status: ${enq.status} • Course: ${enq.courseInterested} • Phone: ${enq.phone}`,
          url: `/admin/enquiries?id=${enq.id}`,
          category: "CRM Student Enquiries",
          snippet: highlightMatches(`Email: ${enq.email} - Notes: ${enq.notes || ""} - School: ${enq.schoolName || ""}`, queryWords),
        }));
      if (matchedEnquiries.length) {
        groupedResults["CRM Student Enquiries"] = matchedEnquiries;
        totalCount += matchedEnquiries.length;
      }

      const matchedUsers = users
        .filter((u) => matchesQuery([u.name, u.email, u.role]))
        .map((u) => ({
          id: u.id,
          title: u.name,
          subtitle: `Role: ${u.role} • ${u.email}`,
          url: `/admin/users`,
          category: "System Users",
          snippet: highlightMatches(`${u.email} (${u.role})`, queryWords),
        }));
      if (matchedUsers.length) {
        groupedResults["System Users"] = matchedUsers;
        totalCount += matchedUsers.length;
      }
    }

    return NextResponse.json({
      success: true,
      query,
      total: totalCount,
      results: groupedResults,
      flatResults: Object.values(groupedResults).flat(),
    });
  } catch (err: any) {
    console.error("Search error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
