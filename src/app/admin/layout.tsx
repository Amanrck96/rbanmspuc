"use client";

import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
  LayoutDashboard,
  Users,
  FileText,
  Bell,
  Calendar,
  Newspaper,
  GraduationCap,
  FolderOpen,
  Download,
  HelpCircle,
  Image as ImageIcon,
  Award,
  Settings,
  History,
  Trash2,
  UserCheck,
  LogOut,
  ExternalLink,
  Menu,
  X,
  Search,
  Shield,
  Loader2,
  Sun,
  Moon,
} from "lucide-react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [isDark, setIsDark] = useState(false);

  const isLoginPage = pathname === "/admin/login";

  useEffect(() => {
    if (isLoginPage) {
      setCheckingAuth(false);
      return;
    }

    // Check dark mode state
    setIsDark(document.documentElement.classList.contains("dark"));

    // Verify authentication
    fetch("/api/auth/me")
      .then((res) => {
        if (!res.ok) {
          router.push(`/admin/login?from=${pathname}`);
          return null;
        }
        return res.json();
      })
      .then((data) => {
        if (data?.authenticated) {
          setCurrentUser(data.user);
        }
      })
      .catch(() => {
        router.push("/admin/login");
      })
      .finally(() => {
        setCheckingAuth(false);
      });
  }, [pathname, isLoginPage, router]);

  const toggleDarkMode = () => {
    const isNowDark = !isDark;
    setIsDark(isNowDark);
    if (isNowDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      router.push("/admin/login");
      router.refresh();
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  if (isLoginPage) {
    return <>{children}</>;
  }

  if (checkingAuth) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white text-black">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="w-8 h-8 animate-spin text-black" />
          <p className="text-xs text-gray-700 font-medium">Verifying administrative credentials...</p>
        </div>
      </div>
    );
  }

  const menuItems = [
    { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
    { label: "CRM Enquiries", href: "/admin/enquiries", icon: Users, badge: "CRM" },
    { label: "Pages CMS", href: "/admin/pages", icon: FileText },
    { label: "Notices & Circulars", href: "/admin/notices", icon: Bell },
    { label: "Events Calendar", href: "/admin/events", icon: Calendar },
    { label: "News & Press", href: "/admin/news", icon: Newspaper },
    { label: "Courses & Streams", href: "/admin/courses", icon: GraduationCap },
    { label: "Faculty Directory", href: "/admin/faculty", icon: UserCheck },
    { label: "Media Library", href: "/admin/media", icon: FolderOpen },
    { label: "Downloads & Forms", href: "/admin/downloads", icon: Download },
    { label: "FAQs Manager", href: "/admin/faqs", icon: HelpCircle },
    { label: "Photo Gallery", href: "/admin/gallery", icon: ImageIcon },
    { label: "Achievements", href: "/admin/achievements", icon: Award },
    { label: "Site Settings", href: "/admin/settings", icon: Settings },
    { label: "Activity Audit Log", href: "/admin/activity", icon: History },
    { label: "Recycle Bin / Undo", href: "/admin/trash", icon: Trash2 },
    { label: "Staff Users", href: "/admin/users", icon: Shield },
  ];

  return (
    <div className="min-h-screen bg-white text-black flex flex-col lg:flex-row transition-colors">
      {/* Mobile Top Header */}
      <header className="lg:hidden flex items-center justify-between p-4 bg-white border-b border-gray-200 sticky top-0 z-50 text-black">
        <div className="flex items-center gap-2">
          <div className="relative w-12 h-8 bg-white rounded-lg p-0.5 border border-gray-200 shadow-xs shrink-0 overflow-hidden">
            <Image src="/images/rbanms-logo.png" alt="RBANMS Logo" fill className="object-contain grayscale" priority />
          </div>
          <div>
            <div className="font-bold text-xs text-black">RBANMS PU College</div>
            <div className="text-[10px] text-gray-600 font-bold">Admin CRM Console</div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={toggleDarkMode}
            className="p-1.5 rounded-lg text-black hover:bg-gray-100 transition"
          >
            {isDark ? <Sun className="w-4 h-4 text-black" /> : <Moon className="w-4 h-4 text-black" />}
          </button>
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 rounded-lg bg-gray-100 text-black border border-gray-300 hover:bg-gray-200"
          >
            {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </header>

      {/* Admin Sidebar Navigation */}
      <aside
        className={`fixed lg:sticky top-0 left-0 z-40 h-screen w-64 bg-white border-r border-gray-200 text-black flex flex-col justify-between transition-transform duration-200 overflow-y-auto ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        <div className="p-4 space-y-5">
          {/* Logo & College Title */}
          <Link href="/admin" className="flex items-center gap-3 px-2 py-2 group">
            <div className="relative w-14 h-9 shrink-0 bg-white rounded-xl p-1 border border-gray-200 shadow-xs overflow-hidden">
              <Image src="/images/rbanms-logo.png" alt="RBANMS Logo" fill className="object-contain grayscale" priority />
            </div>
            <div>
              <div className="font-extrabold text-sm text-black font-serif leading-none">RBANM&apos;S</div>
              <div className="text-[10px] text-gray-600 font-bold uppercase tracking-wider">Admin CRM Panel</div>
              <div className="text-[9px] text-gray-500">Shared DB & Media Storage</div>
            </div>
          </Link>

          {/* Current User Pill */}
          {currentUser && (
            <div className="p-3 rounded-2xl bg-gray-50 border border-gray-200 flex items-center justify-between">
              <div className="overflow-hidden">
                <div className="text-xs font-bold text-black truncate">{currentUser.name}</div>
                <div className="text-[10px] text-gray-600 font-bold">{currentUser.role}</div>
              </div>
              <span className="w-2 h-2 rounded-full bg-black shrink-0" title="Online" />
            </div>
          )}

          {/* Nav Links */}
          <nav className="space-y-1">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition ${
                    isActive
                      ? "bg-black text-white font-extrabold shadow-xs"
                      : "text-black hover:bg-gray-100"
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className="w-4 h-4 shrink-0" />
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span className={`text-[9px] px-1.5 py-0.5 rounded font-bold ${
                      isActive ? "bg-white text-black" : "bg-gray-100 text-black border border-gray-300"
                    }`}>
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-gray-200 space-y-2">
          <div className="flex items-center justify-between px-2 py-1 text-xs text-gray-600">
            <span>Appearance</span>
            <button
              onClick={toggleDarkMode}
              className="flex items-center gap-1.5 px-2 py-1 rounded bg-gray-100 hover:bg-gray-200 text-black font-medium text-[11px] transition cursor-pointer border border-gray-300"
            >
              {isDark ? <Sun className="w-3.5 h-3.5 text-black" /> : <Moon className="w-3.5 h-3.5 text-black" />}
              <span>{isDark ? "Dark" : "Light"}</span>
            </button>
          </div>
          <Link
            href="/"
            target="_blank"
            className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-xl bg-white hover:bg-gray-100 text-black text-xs font-semibold border border-gray-300 transition"
          >
            <ExternalLink className="w-3.5 h-3.5 text-black" /> View Public Site
          </Link>
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-xl bg-gray-100 hover:bg-gray-200 text-black border border-gray-300 text-xs font-semibold transition cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5 text-black" /> Sign Out
          </button>
        </div>
      </aside>

      {/* Main Admin Content Area */}
      <div className="flex-1 flex flex-col min-w-0 bg-white">
        <main className="flex-1 p-4 sm:p-8 lg:p-10 max-w-7xl mx-auto w-full text-black">
          {children}
        </main>
      </div>
    </div>
  );
}
