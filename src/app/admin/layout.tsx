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
} from "lucide-react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [checkingAuth, setCheckingAuth] = useState(true);

  const isLoginPage = pathname === "/admin/login";

  useEffect(() => {
    if (isLoginPage) {
      setCheckingAuth(false);
      return;
    }

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
      <div className="min-h-screen flex items-center justify-center bg-slate-950 text-white">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="w-8 h-8 animate-spin text-amber-500" />
          <p className="text-xs text-slate-400">Verifying administrative credentials...</p>
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
    { label: "Theme & Settings", href: "/admin/settings", icon: Settings },
    { label: "Activity Audit Log", href: "/admin/activity", icon: History },
    { label: "Recycle Bin / Undo", href: "/admin/trash", icon: Trash2 },
    { label: "Staff Users", href: "/admin/users", icon: Shield },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col lg:flex-row">
      {/* Mobile Top Header */}
      <header className="lg:hidden flex items-center justify-between p-4 bg-slate-900 border-b border-slate-800 sticky top-0 z-50">
        <div className="flex items-center gap-2">
          <div className="relative w-8 h-8">
            <Image src="/images/rbanms-logo.svg" alt="RBANMS Logo" fill className="object-contain" />
          </div>
          <div>
            <div className="font-bold text-xs text-white">RBANMS PU College</div>
            <div className="text-[10px] text-amber-400">Admin CRM Console</div>
          </div>
        </div>
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2 rounded-lg bg-slate-800 text-slate-300"
        >
          {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </header>

      {/* Admin Sidebar Navigation */}
      <aside
        className={`fixed lg:sticky top-0 left-0 z-40 h-screen w-64 bg-slate-900 border-r border-slate-800 flex flex-col justify-between transition-transform duration-200 overflow-y-auto ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        <div className="p-4 space-y-6">
          {/* Logo & College Title */}
          <Link href="/admin" className="flex items-center gap-3 px-2 py-2 group">
            <div className="relative w-10 h-10 shrink-0">
              <Image src="/images/rbanms-logo.svg" alt="RBANMS Logo" fill className="object-contain" />
            </div>
            <div>
              <div className="font-extrabold text-sm text-white font-serif leading-none">RBANM&apos;S</div>
              <div className="text-[10px] text-amber-400 font-bold uppercase tracking-wider">Admin CRM Panel</div>
              <div className="text-[9px] text-slate-500">Shared DB & Media Storage</div>
            </div>
          </Link>

          {/* Current User Pill */}
          {currentUser && (
            <div className="p-3 rounded-2xl bg-slate-800/60 border border-slate-700/60 flex items-center justify-between">
              <div className="overflow-hidden">
                <div className="text-xs font-bold text-slate-200 truncate">{currentUser.name}</div>
                <div className="text-[10px] text-amber-400 font-semibold">{currentUser.role}</div>
              </div>
              <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" title="Online" />
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
                      ? "bg-amber-500 text-slate-950 font-bold shadow-md shadow-amber-500/10"
                      : "text-slate-400 hover:text-white hover:bg-slate-800/80"
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className="w-4 h-4 shrink-0" />
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span className="text-[9px] px-1.5 py-0.5 rounded bg-amber-400/20 text-amber-300 font-bold">
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-slate-800 space-y-2">
          <Link
            href="/"
            target="_blank"
            className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold transition"
          >
            <ExternalLink className="w-3.5 h-3.5" /> View Public Site
          </Link>
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-xl bg-red-950/40 hover:bg-red-900/60 text-red-300 border border-red-900/40 text-xs font-semibold transition cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" /> Sign Out
          </button>
        </div>
      </aside>

      {/* Main Admin Workspace */}
      <div className="flex-1 flex flex-col min-w-0">
        <main className="flex-1 p-4 sm:p-8 lg:p-10 max-w-7xl mx-auto w-full">{children}</main>
      </div>
    </div>
  );
}
