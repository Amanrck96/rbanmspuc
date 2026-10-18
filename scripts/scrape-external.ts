import puppeteer from "puppeteer-core";
import fs from "fs/promises";
import path from "path";
import https from "https";
import http from "http";

const CHROME_PATH = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const BASE_URL = "https://rbanmspuc.ac.in";
const IMPORT_DIR = path.join(process.cwd(), "import");

const TARGET_PAGES = [
  { slug: "home", url: `${BASE_URL}/index.php`, section: "home", title: "Home" },
  { slug: "aboutus-main", url: `${BASE_URL}/aboutus.php`, section: "about", title: "About Us Main" },
  { slug: "founder", url: `${BASE_URL}/aboutus.php?open_type=founder_link`, section: "about", title: "Founder Arcot Narrainswamy Mudaliar" },
  { slug: "history", url: `${BASE_URL}/aboutus.php?open_type=history_link`, section: "about", title: "History" },
  { slug: "management", url: `${BASE_URL}/aboutus.php?open_type=management_link`, section: "about", title: "Management & Trustees" },
  { slug: "principal", url: `${BASE_URL}/aboutus.php?open_type=principal_link`, section: "about", title: "Principal's Message" },
  { slug: "vision", url: `${BASE_URL}/aboutus.php?open_type=vision_link`, section: "about", title: "Legacy, Vision & Mission" },
  { slug: "aims", url: `${BASE_URL}/aboutus.php?open_type=aims_link`, section: "about", title: "Aims & Objectives" },
  { slug: "admissions", url: `${BASE_URL}/admissions.php`, section: "admissions", title: "Admission Process" },
  { slug: "guidelines", url: `${BASE_URL}/guidelines.php`, section: "admissions", title: "Admission Guidelines & Eligibility" },
  { slug: "academics", url: `${BASE_URL}/academics.php`, section: "academics", title: "Courses Offered & Academics" },
  { slug: "faculty", url: `${BASE_URL}/faculty.php`, section: "academics", title: "Faculty Directory" },
  { slug: "facilities", url: `${BASE_URL}/facilities.php`, section: "student-life", title: "Campus Facilities & Laboratories" },
  { slug: "art", url: `${BASE_URL}/academy.php?open_type=art_link`, section: "student-life", title: "Cultural & Art Academy" },
  { slug: "cricket", url: `${BASE_URL}/academy.php?open_type=cricket_link`, section: "student-life", title: "Cricket Academy & Sports" },
  { slug: "football", url: `${BASE_URL}/academy.php?open_type=football_link`, section: "student-life", title: "Football Academy & Athletics" },
  { slug: "events", url: `${BASE_URL}/events.php`, section: "media", title: "Events Calendar" },
  { slug: "news", url: `${BASE_URL}/news.php`, section: "media", title: "News & Press Releases" },
  { slug: "media", url: `${BASE_URL}/media.php`, section: "media", title: "Media & Photo Gallery" },
  { slug: "blog", url: `${BASE_URL}/blog.php`, section: "media", title: "Blog & Articles" },
  { slug: "contact", url: `${BASE_URL}/contactus.php`, section: "contact", title: "Contact Us" },
];

async function downloadFile(fileUrl: string, destPath: string): Promise<boolean> {
  return new Promise((resolve) => {
    try {
      const fullUrl = fileUrl.startsWith("http") ? fileUrl : `${BASE_URL}/${fileUrl.replace(/^\//, "")}`;
      const client = fullUrl.startsWith("https") ? https : http;
      const req = client.get(
        fullUrl,
        { rejectUnauthorized: false, timeout: 10000 },
        (res) => {
          if (res.statusCode !== 200) {
            resolve(false);
            return;
          }
          const chunks: any[] = [];
          res.on("data", (chunk) => chunks.push(chunk));
          res.on("end", async () => {
            const buffer = Buffer.concat(chunks);
            await fs.mkdir(path.dirname(destPath), { recursive: true });
            await fs.writeFile(destPath, buffer);
            resolve(true);
          });
        }
      );
      req.on("error", () => resolve(false));
      req.on("timeout", () => {
        req.destroy();
        resolve(false);
      });
    } catch {
      resolve(false);
    }
  });
}

async function scrapeAll() {
  console.log("=== Starting Scrape of https://rbanmspuc.ac.in ===");

  await fs.mkdir(path.join(IMPORT_DIR, "images"), { recursive: true });
  await fs.mkdir(path.join(IMPORT_DIR, "documents"), { recursive: true });
  await fs.mkdir(path.join(IMPORT_DIR, "about"), { recursive: true });
  await fs.mkdir(path.join(IMPORT_DIR, "admissions"), { recursive: true });
  await fs.mkdir(path.join(IMPORT_DIR, "academics"), { recursive: true });
  await fs.mkdir(path.join(IMPORT_DIR, "student-life"), { recursive: true });
  await fs.mkdir(path.join(IMPORT_DIR, "media"), { recursive: true });
  await fs.mkdir(path.join(IMPORT_DIR, "contact"), { recursive: true });

  const browser = await (puppeteer.launch as any)({
    executablePath: CHROME_PATH,
    headless: true,
    ignoreHTTPSErrors: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox", "--ignore-certificate-errors"],
  });

  const page = await browser.newPage();
  await page.setUserAgent("Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)");

  const scrapedPagesData: any[] = [];
  const discoveredImages: Set<string> = new Set();
  const discoveredPdfs: Set<string> = new Set();

  for (const item of TARGET_PAGES) {
    console.log(`\n📄 Scraping [${item.title}] (${item.url})...`);
    try {
      await page.goto(item.url, { waitUntil: "domcontentloaded", timeout: 20000 });
      // Allow dynamic JS tabs to settle
      await new Promise((r) => setTimeout(r, 1500));

      const pageDetails = await page.evaluate(() => {
        // Collect images
        const imgs = Array.from(document.querySelectorAll("img"))
          .map((i) => i.getAttribute("src") || "")
          .filter(Boolean);

        // Collect PDFs
        const pdfs = Array.from(document.querySelectorAll("a[href]"))
          .map((a) => a.getAttribute("href") || "")
          .filter((h) => h.toLowerCase().includes(".pdf"));

        // Collect main content
        const headings: string[] = [];
        document.querySelectorAll("h1, h2, h3, h4").forEach((h) => {
          const t = h.textContent?.trim();
          if (t && t.length > 2) headings.push(t);
        });

        // Collect paragraphs
        const paragraphs: string[] = [];
        document.querySelectorAll("p, div.content, div.about, div.description, article").forEach((p) => {
          const t = p.textContent?.trim();
          if (t && t.length > 25 && !t.includes("function()") && !t.includes("var ")) {
            paragraphs.push(t);
          }
        });

        // Faculty table items if on faculty page
        const facultyList: any[] = [];
        document.querySelectorAll("table tr, div.team-member, div.faculty-box, div.col-md-4").forEach((el) => {
          const txt = el.textContent?.trim() || "";
          if (txt.includes("Lecturer") || txt.includes("Dept") || txt.includes("M.Sc") || txt.includes("M.A") || txt.includes("HOD")) {
            facultyList.push(txt.replace(/\s+/g, " "));
          }
        });

        const bodyText = document.body.innerText;

        return {
          title: document.title,
          headings,
          paragraphs: Array.from(new Set(paragraphs)),
          facultyList: Array.from(new Set(facultyList)),
          imgs: Array.from(new Set(imgs)),
          pdfs: Array.from(new Set(pdfs)),
          bodyText,
        };
      });

      // Track images and pdfs
      pageDetails.imgs.forEach((img) => discoveredImages.add(img));
      pageDetails.pdfs.forEach((pdf) => discoveredPdfs.add(pdf));

      // Save markdown file in import
      const mdContent = `# ${item.title}
*Source URL: ${item.url}*

## Key Headings
${pageDetails.headings.map((h) => `- ${h}`).join("\n")}

## Extracted Content
${pageDetails.paragraphs.join("\n\n")}

${pageDetails.facultyList.length > 0 ? `## Faculty Data\n${pageDetails.facultyList.map((f) => `- ${f}`).join("\n")}` : ""}

## Images Discovered
${pageDetails.imgs.map((i) => `- ${i}`).join("\n")}
`;

      const targetFilePath = path.join(IMPORT_DIR, item.section, `${item.slug}.md`);
      await fs.writeFile(targetFilePath, mdContent);
      console.log(`   Saved extracted content to: import/${item.section}/${item.slug}.md`);

      scrapedPagesData.push({
        slug: item.slug,
        title: item.title,
        section: item.section,
        url: item.url,
        data: pageDetails,
      });
    } catch (err: any) {
      console.error(`   ❌ Failed to scrape ${item.url}:`, err.message);
    }
  }

  await browser.close();

  // Save raw data JSON
  await fs.writeFile(
    path.join(IMPORT_DIR, "raw_scraped_data.json"),
    JSON.stringify(scrapedPagesData, null, 2)
  );

  console.log(`\n🖼️ Downloading ${discoveredImages.size} discovered images...`);
  let imgCount = 0;
  for (const imgUrl of Array.from(discoveredImages)) {
    if (imgUrl.includes("favicon") || imgUrl.startsWith("data:") || imgUrl.length < 5) continue;
    const cleanName = path.basename(imgUrl.split("?")[0]).replace(/[^a-zA-Z0-9._-]/g, "_");
    if (!cleanName || cleanName === "." || cleanName.length < 3) continue;

    const dest = path.join(IMPORT_DIR, "images", cleanName);
    const success = await downloadFile(imgUrl, dest);
    if (success) {
      imgCount++;
      if (imgCount % 5 === 0) console.log(`   Downloaded ${imgCount} images...`);
    }
  }
  console.log(`✅ Successfully downloaded ${imgCount} images to import/images/`);

  console.log(`\n📑 Downloading ${discoveredPdfs.size} discovered documents...`);
  let pdfCount = 0;
  for (const pdfUrl of Array.from(discoveredPdfs)) {
    const cleanName = path.basename(pdfUrl.split("?")[0]).replace(/[^a-zA-Z0-9._-]/g, "_");
    const dest = path.join(IMPORT_DIR, "documents", cleanName);
    const success = await downloadFile(pdfUrl, dest);
    if (success) {
      pdfCount++;
      console.log(`   Downloaded: ${cleanName}`);
    }
  }

  console.log("\n=================================================");
  console.log(`🎉 SCRAPING COMPLETE:`);
  console.log(`   - Text Pages Scraped: ${scrapedPagesData.length}`);
  console.log(`   - Images Downloaded: ${imgCount}`);
  console.log(`   - Documents Downloaded: ${pdfCount}`);
  console.log("=================================================");
}

scrapeAll().catch(console.error);
