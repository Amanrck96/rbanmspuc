import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { prisma } from "@/lib/prisma";
import ThemeInjector from "@/components/ThemeInjector";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export async function generateMetadata(): Promise<Metadata> {
  try {
    const settings = await prisma.siteSetting.findUnique({ where: { id: "default" } });
    return {
      title: settings?.metaTitle || "RBANMS PU College Bengaluru | Estd 1883",
      description:
        settings?.metaDescription ||
        "Official website of RBANM's Pre-University College Bengaluru. Established 1883. Science, Commerce & Arts.",
    };
  } catch {
    return {
      title: "RBANMS PU College Bengaluru | Estd 1883",
      description: "Official portal of RBANM's Pre-University College",
    };
  }
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  let settings: any = null;
  try {
    settings = await prisma.siteSetting.findUnique({ where: { id: "default" } });
  } catch (err) {
    console.error("Failed to fetch settings in layout:", err);
  }

  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col bg-[var(--bg)] text-[var(--text)] transition-colors`}>
        <ThemeInjector
          primaryColor={settings?.primaryColor || "#800000"}
          secondaryColor={settings?.secondaryColor || "#5A0F1B"}
          accentColor={settings?.accentColor || "#C9A227"}
        />
        {children}
      </body>
    </html>
  );
}
