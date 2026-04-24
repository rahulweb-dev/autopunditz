"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutGrid, FileText, Users, Menu, Bell, Sun, Moon, LogOut, ChevronDown
} from "lucide-react";

export default function AdminLayout({ children }) {
  const pathname = usePathname();

  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dark, setDark] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const user = {
    name: "Rahul",
    role: "admin",
  };

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  const navItems = [
    { href: "/admin/dashboard", label: "Dashboard", icon: LayoutGrid },
    { href: "/admin/blogs", label: "Blogs", icon: FileText },
    ...(user.role === "admin"
      ? [{ href: "/admin/users", label: "Users", icon: Users }]
      : []),
  ];

  return (
    <div className="flex min-h-screen bg-gray-100 dark:bg-[#0c0c0e]">

      {/* MOBILE OVERLAY */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* SIDEBAR */}
      <aside
        className={`
          ${collapsed ? "w-16 " : "w-64"}
          bg-[#0f0f12] text-white
          flex flex-col min-h-screen
          transition-all duration-300 shadow-xl

          fixed md:relative top-0 left-0 h-full z-50
          ${mobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
        `}
      >

        {/* LOGO */}
        <div className="px-4 py-5 border-b border-white/10 flex items-center justify-between">
          {!collapsed && (
            <div>
              <h2 className="font-semibold text-lg">AutoPunditz</h2>
              <p className="text-xs text-red-400 tracking-widest">ADMIN</p>
            </div>
          )}
          <button onClick={() => setCollapsed(!collapsed)}>
            <Menu size={18} />
          </button>
        </div>

        {/* NAV */}
        <nav className="flex-1 px-3 py-5 space-y-2">
          {navItems.map((item) => {
            const active = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`
                  flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all
                  ${active
                    ? "bg-red-500 text-white shadow"
                    : "text-white/60 hover:bg-white/5 hover:text-white"}
                `}
              >
                <item.icon size={18} />
                {!collapsed && item.label}
              </Link>
            );
          })}
        </nav>



      </aside>

      {/* MAIN */}
      <div className="flex-1 flex flex-col">

        {/* TOPBAR */}
        <header className="h-14 sticky top-0 z-30 bg-white dark:bg-[#141417] border-b flex items-center justify-between px-5">

          {/* LEFT */}
          <div className="flex items-center gap-3">
            <button onClick={() => setMobileOpen(true)} className="md:hidden">
              <Menu size={20} />
            </button>

            <h1 className="text-lg font-semibold capitalize">
              {pathname.split("/").pop()}
            </h1>
          </div>

          {/* RIGHT */}
          <div className="flex items-center gap-4">

            {/* THEME */}
            <button
              onClick={() => setDark(!dark)}
              className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-white/10"
            >
              {dark ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            {/* NOTIFICATION */}
            <div className="relative">
              <Bell size={18} />
              <span className="absolute -top-1 -right-1 text-[10px] bg-red-500 text-white rounded-full px-1">
                3
              </span>
            </div>

            {/* PROFILE DROPDOWN */}
            <div className="relative">
              <button
                onClick={() => setProfileOpen(!profileOpen)}
                className="flex items-center gap-2"
              >
                <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center text-sm">
                  R
                </div>
                <ChevronDown size={14} />
              </button>

              {profileOpen && (
                <div className="absolute right-0 mt-2 w-44 bg-white dark:bg-[#1c1c1f] rounded-lg shadow-lg border">

                  <div className="p-3 border-b">
                    <p className="text-sm font-medium">{user.name}</p>
                    <p className="text-xs text-gray-500">{user.role}</p>
                  </div>

                  <button className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-white/10 w-full">
                    <LogOut size={14} /> Logout
                  </button>

                </div>
              )}
            </div>

          </div>

        </header>

        {/* CONTENT */}
        <main className="p-6 overflow-x-auto">
          {children}
        </main>

      </div>
    </div>
  );
}