import { prisma } from "@/lib/prisma";
import UtilityBar from "@/components/UtilityBar";
import AdmissionAlertBanner from "@/components/AdmissionAlertBanner";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default async function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  let settings: any = null;
  let latestNotices: any[] = [];

  try {
    [settings, latestNotices] = await Promise.all([
      prisma.siteSetting.findUnique({ where: { id: "default" } }),
      prisma.notice.findMany({
        where: { isPublished: true },
        orderBy: { date: "desc" },
        take: 5,
      }),
    ]);
  } catch (err) {
    console.error("Error loading public layout data:", err);
  }

  return (
    <>
      <UtilityBar settings={settings} latestNotices={latestNotices} />
      <AdmissionAlertBanner
        bannerText={settings?.bannerText}
        bannerLink={settings?.bannerLink}
        bannerActive={settings?.bannerActive}
      />
      <Navbar settings={settings} />
      <main className="flex-1">{children}</main>
      <Footer settings={settings} />
    </>
  );
}
