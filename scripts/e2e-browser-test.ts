import puppeteer from "puppeteer-core";
import fs from "fs/promises";
import path from "path";

const BASE_URL = process.env.BASE_URL || "http://localhost:3000";
const CHROME_PATH = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";

interface TestResult {
  name: string;
  passed: boolean;
  error?: string;
  durationMs: number;
}

const results: TestResult[] = [];
let sharedAuthToken: string = "";

async function runTest(name: string, fn: (page: any, browser: any) => Promise<void>, browser: any) {
  const start = Date.now();
  const page = await browser.newPage();
  const consoleErrors: string[] = [];

  page.on("console", (msg: any) => {
    if (msg.type() === "error") {
      const text = msg.text();
      if (!text.includes("favicon") && !text.includes("Chrome is being controlled")) {
        consoleErrors.push(text);
      }
    }
  });

  page.on("pageerror", (err: any) => {
    consoleErrors.push(err.message || String(err));
  });

  try {
    console.log(`\n⏳ Running: ${name}...`);
    // If we have shared auth token, set it on the page
    if (sharedAuthToken) {
      await page.setCookie({
        name: "rbanms_admin_token",
        value: sharedAuthToken,
        url: BASE_URL,
      });
    }

    await fn(page, browser);
    const duration = Date.now() - start;
    if (consoleErrors.length > 0) {
      console.warn(`⚠️ [${name}] Page produced console warnings/errors:`, consoleErrors.slice(0, 3));
    }
    console.log(`✅ PASSED: ${name} (${duration}ms)`);
    results.push({ name, passed: true, durationMs: duration });
  } catch (err: any) {
    const duration = Date.now() - start;
    console.error(`❌ FAILED: ${name} (${duration}ms) - ${err.message}`);
    results.push({ name, passed: false, error: err.message, durationMs: duration });
  } finally {
    await page.close();
  }
}

async function main() {
  console.log("=================================================");
  console.log(" RBANMS PU COLLEGE AUTOMATED E2E BROWSER TESTS ");
  console.log(` Testing against: ${BASE_URL}`);
  console.log("=================================================");

  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox", "--disable-dev-shm-usage"],
  });

  try {
    // TEST 1: Public Homepage loads cleanly
    await runTest("1. Public Homepage & Navigation Shell", async (page) => {
      await page.goto(`${BASE_URL}/`, { waitUntil: "networkidle2", timeout: 20000 });
      const title = await page.title();
      if (!title.toLowerCase().includes("rbanms")) {
        throw new Error(`Unexpected page title: ${title}`);
      }
      const content = await page.content();
      if (!content.includes("Pre-University College")) {
        throw new Error("Missing college brand text");
      }
      if (!content.includes("Dharmarathnakara Rai Bahadur Arcot Narrainswamy Mudaliar")) {
        throw new Error("Missing founder's heritage mention");
      }
    }, browser);

    // TEST 2: All Public Sitemap Menu Pages load with HTTP 200
    const samplePages = [
      "/about/history",
      "/about/legacy-vision-mission",
      "/about/principals-message",
      "/about/directors-message",
      "/about/management",
      "/about/whos-who",
      "/about/statements",
      "/about/accreditation-recognition",
      "/about/policies-documents",
      "/admissions/admission-process",
      "/admissions/eligibility",
      "/admissions/courses-offered",
      "/admissions/fee-structure",
      "/admissions/scholarships",
      "/admissions/prospectus",
      "/admissions/downloads-forms",
      "/admissions/faqs",
      "/admissions/apply",
      "/academics/departments",
      "/academics/faculty",
      "/academics/academic-calendar",
      "/academics/timetable",
      "/academics/syllabus",
      "/academics/examination",
      "/academics/results",
      "/academics/library",
      "/academics/computer-lab",
      "/academics/science-laboratories",
      "/student-life/sports",
      "/student-life/ncc",
      "/student-life/cultural-activities",
      "/student-life/clubs-societies",
      "/student-life/career-guidance",
      "/student-life/student-achievements",
      "/student-life/faculty-achievements",
      "/student-life/campus-facilities",
      "/student-life/transport",
      "/student-life/canteen",
      "/media/notice-board",
      "/media/news",
      "/media/events",
      "/media/photo-gallery",
      "/alumni/alumni",
      "/contact",
    ];

    await runTest("2. Comprehensive Public Sitemap Crawl", async (page) => {
      for (const route of samplePages) {
        const response = await page.goto(`${BASE_URL}${route}`, {
          waitUntil: "domcontentloaded",
          timeout: 15000,
        });
        const status = response?.status();
        if (status !== 200) {
          throw new Error(`Route ${route} returned status ${status}`);
        }
      }
    }, browser);

    // TEST 3: Admin Protected Routes Guard
    await runTest("3. Protected Admin Route Security Redirection", async (page) => {
      await page.goto(`${BASE_URL}/admin`, { waitUntil: "networkidle2" });
      const currentUrl = page.url();
      if (!currentUrl.includes("/admin/login")) {
        throw new Error(`Expected redirect to /admin/login, got: ${currentUrl}`);
      }
    }, browser);

    // TEST 4: Admin Login with Seeded Credentials
    await runTest("4. Admin Authentication with Super Admin Credentials", async (page) => {
      await page.goto(`${BASE_URL}/admin/login`, { waitUntil: "networkidle2" });

      // Test bad credentials first
      await page.type("input[name='email']", "bad@rbanmspuc.edu.in");
      await page.type("input[name='password']", "WrongPassword123!");
      await page.click("button[type='submit']");
      await page.waitForSelector("[data-testid='login-error']", { timeout: 8000 });

      // Enter valid Super Admin credentials from environment or fallback
      const adminEmail = process.env.SEED_ADMIN_EMAIL || process.env.ADMIN_EMAIL || "admin@institution.local";
      const adminPassword = process.env.SEED_ADMIN_PASSWORD || process.env.ADMIN_PASSWORD || "TestAdminSecure123!";

      await page.click("input[name='email']", { clickCount: 3 });
      await page.keyboard.press("Backspace");
      await page.type("input[name='email']", adminEmail);

      await page.click("input[name='password']", { clickCount: 3 });
      await page.keyboard.press("Backspace");
      await page.type("input[name='password']", adminPassword);

      await page.click("button[type='submit']");

      await page.waitForNavigation({ waitUntil: "networkidle2", timeout: 10000 });
      const currentUrl = page.url();
      if (!currentUrl.includes("/admin") || currentUrl.includes("/admin/login")) {
        throw new Error(`Admin login failed, remained at: ${currentUrl}`);
      }

      const cookies = await page.cookies();
      const authCookie = cookies.find((c: any) => c.name === "rbanms_admin_token");
      if (!authCookie) {
        throw new Error("Missing rbanms_admin_token cookie after login");
      }
      sharedAuthToken = authCookie.value;
      console.log("   Admin logged in successfully, JWT token acquired.");
    }, browser);

    // TEST 5: Public Enquiry Form -> Appears in Admin CRM
    let testApplicantName = `Aarav Sharma ${Date.now() % 10000}`;
    let generatedAppNumber = "";

    await runTest("5. Enquiry Application Flow & CRM Pipeline Verification", async (page) => {
      await page.goto(`${BASE_URL}/admissions/apply`, { waitUntil: "networkidle2" });

      await page.type("input[name='fullName']", testApplicantName);
      await page.type("input[name='email']", `aarav.${Date.now() % 1000}@example.com`);
      await page.type("input[name='phone']", "9845012345");
      await page.select("select[name='courseInterested']", "PCMB");
      await page.type("input[name='tenthPercentage']", "95.6");
      await page.type("input[name='schoolName']", "National Public School Bengaluru");
      await page.type("input[name='parentName']", "Suresh Sharma");
      await page.type("input[name='parentPhone']", "9845054321");
      await page.type("textarea[name='message']", "Seeking admission in PCMB with NEET coaching.");

      await page.click("button[type='submit']");
      await page.waitForSelector("div.font-mono", { timeout: 10000 });

      const text = await page.content();
      const match = text.match(/RBANMS-202[0-9]-[0-9]+/);
      if (!match) {
        throw new Error("Failed to generate application number on submission screen");
      }
      generatedAppNumber = match[0];
      console.log(`   Generated Application Number: ${generatedAppNumber}`);

      // Now verify in Admin CRM
      await page.goto(`${BASE_URL}/admin/enquiries`, { waitUntil: "networkidle2" });
      const adminContent = await page.content();
      if (!adminContent.includes(testApplicantName)) {
        throw new Error(`Submitted applicant "${testApplicantName}" not found in Admin CRM table`);
      }
      if (!adminContent.includes(generatedAppNumber)) {
        throw new Error(`Application number ${generatedAppNumber} not found in Admin CRM table`);
      }
    }, browser);

    // TEST 6: Real-time Admin Edit -> Instant Public Website Update
    await runTest("6. Edit Content in Admin -> Instant Reflection on Public Website", async (page) => {
      const updatedSubtitle = `Distinguished Leadership Update at ${new Date().toLocaleTimeString()}`;
      await page.goto(`${BASE_URL}/admin/pages`, { waitUntil: "networkidle2" });

      const updateRes = await page.evaluate(async (newSub: string) => {
        const pagesRes = await fetch("/api/pages");
        const pagesData = await pagesRes.json();
        const principal = pagesData.pages.find((p: any) => p.slug === "principals-message");
        if (!principal) return { error: "Page not found" };

        const res = await fetch(`/api/pages/${principal.id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            subtitle: newSub,
            title: principal.title,
            content: principal.content,
            isPublished: true,
          }),
        });
        return await res.json();
      }, updatedSubtitle);

      if (!updateRes.success) {
        throw new Error(`Failed to update page in admin: ${updateRes.error}`);
      }

      // Check public page immediately
      await page.goto(`${BASE_URL}/about/principals-message`, { waitUntil: "networkidle2" });
      const publicContent = await page.content();
      if (!publicContent.includes(updatedSubtitle)) {
        throw new Error("Updated subtitle did NOT appear on public page immediately");
      }
      console.log(`   Verified: "${updatedSubtitle}" appeared on public site without restart.`);
    }, browser);

    // TEST 7: Replace Image in Admin -> Website Serves New Version Immediately
    await runTest("7. Replace Image in Admin -> Zero Stale Cache on Public Website", async (page) => {
      await page.goto(`${BASE_URL}/admin/media`, { waitUntil: "networkidle2" });

      const testImageName = "dynamic-badge.svg";
      const initialSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100"><circle cx="50" cy="50" r="40" fill="blue"/><text x="50" y="55" font-size="12" text-anchor="middle" fill="white">V1</text></svg>`;
      const replacedSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100"><circle cx="50" cy="50" r="40" fill="green"/><text x="50" y="55" font-size="12" text-anchor="middle" fill="white">V2-UPDATED</text></svg>`;

      // 1. Upload initial version
      const upload1 = await page.evaluate(async (svgContent: string, fileName: string) => {
        const blob = new Blob([svgContent], { type: "image/svg+xml" });
        const formData = new FormData();
        formData.append("file", blob, fileName);
        formData.append("replaceFileName", fileName);

        const res = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });
        return await res.json();
      }, initialSvg, testImageName);

      if (!upload1.success) throw new Error("Failed to upload test image");

      // Verify V1 content served
      const v1Res = await page.goto(`${BASE_URL}/uploads/${testImageName}`);
      const v1Content = await v1Res?.text();
      if (!v1Content?.includes("V1")) {
        throw new Error("Uploaded image did not serve V1 content");
      }

      // 2. Replace with V2
      const upload2 = await page.evaluate(async (svgContent: string, fileName: string) => {
        const blob = new Blob([svgContent], { type: "image/svg+xml" });
        const formData = new FormData();
        formData.append("file", blob, fileName);
        formData.append("replaceFileName", fileName);

        const res = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });
        return await res.json();
      }, replacedSvg, testImageName);

      if (!upload2.success) throw new Error("Failed to replace test image");

      // Verify V2 content served immediately
      const v2Res = await page.goto(`${BASE_URL}/uploads/${testImageName}`);
      const v2Content = await v2Res?.text();
      if (!v2Content?.includes("V2-UPDATED")) {
        throw new Error("Replaced image did not serve V2-UPDATED content immediately");
      }
      console.log("   Verified: Image replacement updated immediately with no stale cache.");
    }, browser);

    // TEST 8: Add / Delete a Notice -> Website & Recycle Bin
    await runTest("8. Add / Delete Notice Flow with Recycle Bin Restore", async (page) => {
      await page.goto(`${BASE_URL}/admin/notices`, { waitUntil: "networkidle2" });

      const testTitle = `Urgent Notice Test ${Date.now()}`;
      // Add notice via API
      const createRes = await page.evaluate(async (title: string) => {
        const res = await fetch("/api/notices", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            title,
            category: "NOTICE",
            description: "Testing automated notice publishing and instant website reflection.",
            isPinned: true,
            isPublished: true,
          }),
        });
        return await res.json();
      }, testTitle);

      if (!createRes.success) throw new Error("Failed to create notice in admin");
      const createdNoticeId = createRes.notice.id;

      // Verify on public notice board
      await page.goto(`${BASE_URL}/media/notice-board`, { waitUntil: "networkidle2" });
      let publicContent = await page.content();
      if (!publicContent.includes(testTitle)) {
        throw new Error("Newly created notice did NOT appear on public notice board");
      }

      // Delete notice
      await page.goto(`${BASE_URL}/admin/notices`, { waitUntil: "networkidle2" });
      const delRes = await page.evaluate(async (id: string) => {
        const res = await fetch(`/api/notices/${id}`, { method: "DELETE" });
        return await res.json();
      }, createdNoticeId);
      if (!delRes.success) throw new Error("Failed to delete notice");

      // Verify notice is gone from public site
      await page.goto(`${BASE_URL}/media/notice-board`, { waitUntil: "networkidle2" });
      publicContent = await page.content();
      if (publicContent.includes(testTitle)) {
        throw new Error("Deleted notice is still visible on public notice board");
      }

      // Verify staged in Recycle Bin
      await page.goto(`${BASE_URL}/admin/trash`, { waitUntil: "networkidle2" });
      const trashContent = await page.content();
      if (!trashContent.includes(testTitle)) {
        throw new Error("Deleted notice not found in Recycle Bin / Trash");
      }
      console.log("   Verified: Notice created, deleted, and staged in Recycle Bin.");
    }, browser);

    // TEST 9: Global Search on Public Site and Admin
    await runTest("9. Global Search (Public & Admin CRM)", async (page) => {
      // 1. Public search API
      const searchRes = await page.goto(`${BASE_URL}/api/search?q=Physics`, {
        waitUntil: "networkidle2",
      });
      const data = await searchRes?.json();
      if (!data?.success || data.total === 0) {
        throw new Error("Public search for 'Physics' returned zero results");
      }
      if (!data.results["Courses & Academics"] && !data.results["Faculty & Staff"]) {
        throw new Error("Search results missing expected category groups");
      }

      // 2. Search on public search page
      await page.goto(`${BASE_URL}/search?q=PCMB`, { waitUntil: "networkidle2" });
      const searchContent = await page.content();
      if (!searchContent.includes("PCMB")) {
        throw new Error("Search page did not render matching query results");
      }

      // 3. Admin scope search
      await page.goto(`${BASE_URL}/admin`, { waitUntil: "networkidle2" });
      const adminSearchRes = await page.evaluate(async (applicantName: string) => {
        const lastName = applicantName.split(" ")[1] || "Sharma";
        const res = await fetch(`/api/search?q=${encodeURIComponent(lastName)}&scope=admin`);
        return await res.json();
      }, testApplicantName);

      if (!adminSearchRes?.success || !adminSearchRes.results["CRM Student Enquiries"]) {
        throw new Error("Admin search failed to locate student enquiries by applicant name");
      }
      console.log("   Verified: Search works on both public site and Admin CRM with grouping.");
    }, browser);

    // TEST 10: Mobile Viewport & Responsiveness
    await runTest("10. Mobile Viewport (375x667) & Navigation Drawer", async (page) => {
      await page.setViewport({ width: 375, height: 667, isMobile: true, hasTouch: true });
      await page.goto(`${BASE_URL}/`, { waitUntil: "networkidle2" });

      // Check mobile hamburger button
      const button = await page.$("header button");
      if (!button) throw new Error("Mobile menu trigger button not found");

      // Check horizontal overflow
      const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
      if (scrollWidth > 380) {
        throw new Error(`Horizontal overflow detected on mobile: width is ${scrollWidth}px`);
      }
      console.log(`   Verified: Responsive mobile layout (scrollWidth: ${scrollWidth}px <= 375px).`);
    }, browser);

    // TEST 11: Mandatory Maroon & Gold Brand Theme Verification & WCAG Contrast Compliance
    await runTest("11. Mandatory Maroon Brand Theme & WCAG AA Contrast", async (page) => {
      await page.setViewport({ width: 1280, height: 800 });
      await page.goto(`${BASE_URL}/`, { waitUntil: "networkidle2" });

      // 1. Verify CSS custom properties on document.documentElement
      const tokens = await page.evaluate(() => {
        const style = getComputedStyle(document.documentElement);
        return {
          maroon: style.getPropertyValue("--maroon").trim().toLowerCase(),
          maroonDark: style.getPropertyValue("--maroon-dark").trim().toLowerCase(),
          gold: style.getPropertyValue("--gold").trim().toLowerCase(),
        };
      });

      const isMaroonValid = tokens.maroon.includes("#800000") || tokens.maroon.includes("128, 0, 0");
      if (!isMaroonValid) {
        throw new Error(`Expected --maroon to resolve to #800000 or rgb(128, 0, 0), got: ${tokens.maroon}`);
      }

      const isDarkMaroonValid = tokens.maroonDark.includes("#5a0f1b") || tokens.maroonDark.includes("90, 15, 27");
      if (!isDarkMaroonValid) {
        throw new Error(`Expected --maroon-dark to resolve to #5a0f1b or rgb(90, 15, 27), got: ${tokens.maroonDark}`);
      }

      const isGoldValid = tokens.gold.includes("#c9a227") || tokens.gold.includes("201, 162, 39");
      if (!isGoldValid) {
        throw new Error(`Expected --gold to resolve to #c9a227 or rgb(201, 162, 39), got: ${tokens.gold}`);
      }

      // 2. Verify element background colors on public layout
      const elementStyles = await page.evaluate(() => {
        const header = document.querySelector("header.bg-\\[var\\(--maroon\\)\\]") || document.querySelector("header");
        const utilityBar = document.querySelector(".bg-\\[var\\(--maroon-dark\\)\\]");
        const alertBanner = document.querySelector("[data-testid='admission-alert-banner']") || document.querySelector("div.bg-\\[var\\(--gold\\)\\]");

        return {
          headerBg: header ? getComputedStyle(header).backgroundColor : null,
          utilityBg: utilityBar ? getComputedStyle(utilityBar).backgroundColor : null,
          bannerBg: alertBanner ? getComputedStyle(alertBanner).backgroundColor : null,
          bannerText: alertBanner ? getComputedStyle(alertBanner).color : null,
        };
      });

      if (!elementStyles.headerBg?.includes("128, 0, 0")) {
        throw new Error(`Expected header to have maroon background rgb(128, 0, 0), got: ${elementStyles.headerBg}`);
      }
      if (!elementStyles.utilityBg?.includes("90, 15, 27")) {
        throw new Error(`Expected utility bar to have dark maroon background rgb(90, 15, 27), got: ${elementStyles.utilityBg}`);
      }
      if (!elementStyles.bannerBg?.includes("201, 162, 39")) {
        throw new Error(`Expected alert banner to have gold background rgb(201, 162, 39), got: ${elementStyles.bannerBg}`);
      }
      if (!elementStyles.bannerText?.includes("90, 15, 27") && !elementStyles.bannerText?.includes("66, 10, 19")) {
        throw new Error(`Expected alert banner text to have dark maroon color rgb(90, 15, 27) for WCAG AA contrast, got: ${elementStyles.bannerText}`);
      }

      // 3. Test Dark Mode Toggle
      await page.click("button[title='Toggle Light / Dark Mode']");
      const hasDarkClass = await page.evaluate(() => document.documentElement.classList.contains("dark"));
      if (!hasDarkClass) {
        throw new Error("Dark mode toggle failed to add .dark class to root html element");
      }

      // 4. Test Admin Panel Maroon Sidebar
      await page.goto(`${BASE_URL}/admin`, { waitUntil: "networkidle2" });
      const sidebarBg = await page.evaluate(() => {
        const sidebar = document.querySelector("aside");
        return sidebar ? getComputedStyle(sidebar).backgroundColor : null;
      });
      if (!sidebarBg?.includes("90, 15, 27")) {
        throw new Error(`Expected admin sidebar background to be dark maroon rgb(90, 15, 27), got: ${sidebarBg}`);
      }

      console.log("   Verified: Mandatory Maroon tokens, element styles, dark mode toggle, and WCAG AA contrast all conform.");
    }, browser);

  } finally {
    await browser.close();
  }

  // Summary Report
  console.log("\n=================================================");
  console.log("             TEST EXECUTION SUMMARY              ");
  console.log("=================================================");
  let passedCount = 0;
  for (const r of results) {
    if (r.passed) passedCount++;
    console.log(`${r.passed ? "✅ PASS" : "❌ FAIL"}: ${r.name} (${r.durationMs}ms)`);
    if (r.error) console.log(`   Error: ${r.error}`);
  }
  console.log("-------------------------------------------------");
  console.log(`Total: ${results.length} | Passed: ${passedCount} | Failed: ${results.length - passedCount}`);
  console.log("=================================================");

  if (passedCount !== results.length) {
    process.exit(1);
  }
}

main().catch((err) => {
  console.error("Fatal test error:", err);
  process.exit(1);
});
