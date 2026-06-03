"use client";

import {
  useState,
  useEffect,
} from "react";

import Link from "next/link";

import {
  usePathname,
} from "next/navigation";

import {

  LayoutGrid,
  FileText,
  Users,
  Menu,
  Bell,
  Sun,
  Moon,
  LogOut,
  ChevronDown,
  Contact,

} from "lucide-react";

export default function AdminLayout({
  children,
}) {

  const pathname =
    usePathname();

  const isLoginPage =
    pathname ===
    "/admin/login";

  const [collapsed, setCollapsed] =
    useState(false);

  const [mobileOpen, setMobileOpen] =
    useState(false);

  const [dark, setDark] =
    useState(false);

  const [profileOpen, setProfileOpen] =
    useState(false);

  // ✅ USER
  const [user, setUser] = useState({ email: "", role: "" });

  useEffect(() => {
    fetch("/api/admin/me")
      .then((r) => r.json())
      .then((d) => {
        if (d.success) setUser(d.user);
      })
      .catch(() => {});
  }, []);

  // ✅ LOGOUT
  async function handleLogout() {

    await fetch(
      "/api/admin/logout",
      {
        method: "POST",
      }
    );

    window.location.href =
      "/admin/login";
  }

  // ✅ DARK MODE
  useEffect(() => {

    document.documentElement.classList.toggle(
      "dark",
      dark
    );

  }, [dark]);

  // ✅ NAVIGATION — writers only see Blogs
  const allNavItems = [
    {
      href: "/admin/dashboard",
      label: "Dashboard",
      icon: LayoutGrid,
      adminOnly: true,
    },
    {
      href: "/admin/blogs",
      label: "Blogs",
      icon: FileText,
      adminOnly: false,
    },
    {
      href: "/admin/contact",
      label: "Contacts",
      icon: Contact,
      adminOnly: true,
    },
    {
      href: "/admin/users",
      label: "Users",
      icon: Users,
      adminOnly: true,
    },
  ];

  const navItems =
    user.role === "writer"
      ? allNavItems.filter((i) => !i.adminOnly)
      : allNavItems;

  const avatarLetter =
    user.email ? user.email[0].toUpperCase() : "?";

  return (

    <div className="flex min-h-screen bg-[#f4f7fb] dark:bg-[#09090b]">

      {/* MOBILE OVERLAY */}
      {mobileOpen && (

        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden"
          onClick={() =>
            setMobileOpen(false)
          }
        />
      )}

      {/* SIDEBAR */}
      {!isLoginPage && (

        <aside
          className={`
          fixed z-50 top-0 left-0 h-screen overflow-y-auto
          transition-all duration-300
          ${collapsed ? "w-20" : "w-72"}
          ${mobileOpen
              ? "translate-x-0"
              : "-translate-x-full md:translate-x-0"
            }

          bg-white/70 dark:bg-[#111114]/90
          backdrop-blur-2xl
          border-r border-white/20 dark:border-white/10
          shadow-2xl
        `}
        >

          {/* LOGO */}
          <div className="h-20 px-5 border-b border-black/5 dark:border-white/10 flex items-center justify-between">

            {!collapsed && (

              <div>

                <h1 className="text-2xl font-black bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">

                  AutoPunditz

                </h1>

                <p className="text-xs tracking-[0.25em] text-gray-400 uppercase mt-1">

                  Admin Panel

                </p>

              </div>
            )}

            <button
              onClick={() =>
                setCollapsed(
                  !collapsed
                )
              }
              className="w-9 h-9 rounded-xl bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 flex items-center justify-center transition"
            >

              <Menu size={18} />

            </button>

          </div>

          {/* NAVIGATION */}
          <nav className="p-4 space-y-2">

            {navItems.map(
              (item) => {

                const active =
                  pathname ===
                  item.href;

                return (

                  <Link
                    key={
                      item.href
                    }
                    href={
                      item.href
                    }
                    className={`
                    group relative flex items-center gap-4 px-4 py-3 rounded-2xl transition-all duration-300 overflow-hidden

                    ${active
                        ? `
                          bg-gradient-to-r from-red-500 to-orange-500
                          text-white
                          shadow-lg shadow-red-500/20
                        `
                        : `
                          text-gray-600 dark:text-gray-300
                          hover:bg-black/5
                          dark:hover:bg-white/5
                        `
                      }
                  `}
                  >

                    {/* ICON */}
                    <item.icon
                      size={20}
                    />

                    {/* LABEL */}
                    {!collapsed && (
                      <span className="font-medium">
                        {item.label}
                      </span>
                    )}

                    {/* ACTIVE GLOW */}
                    {active && (

                      <div className="absolute inset-0 bg-white/10 rounded-2xl" />
                    )}

                  </Link>
                );
              }
            )}

          </nav>

          {/* BOTTOM USER */}
          {!collapsed && (

            <div className="absolute bottom-0 left-0 right-0 p-5 border-t border-black/5 dark:border-white/10">

              <div className="flex items-center gap-3">

                <div className="w-12 h-12 rounded-2xl bg-gradient-to-r from-[#2D2D2D] to-[#555] text-white flex items-center justify-center font-bold text-lg">

                  {avatarLetter}

                </div>

                <div>

                  <h3 className="font-semibold truncate max-w-35">
                    {user.email}
                  </h3>

                  <p className="text-xs text-gray-500 capitalize">
                    {user.role}
                  </p>

                </div>

              </div>

            </div>
          )}

        </aside>
      )}

      {/* MAIN */}
      <div className={`flex-1 flex flex-col transition-all duration-300 ${!isLoginPage ? (collapsed ? "md:ml-20" : "md:ml-72") : ""}`}>

        {/* TOPBAR */}
        {!isLoginPage && (

          <header className="sticky top-0 z-30 h-20 px-6 bg-white/70 dark:bg-[#111114]/70 backdrop-blur-xl border-b border-black/5 dark:border-white/10 flex items-center justify-between">

            {/* LEFT */}
            <div className="flex items-center gap-4">

              <button
                onClick={() =>
                  setMobileOpen(true)
                }
                className="md:hidden w-10 h-10 rounded-xl bg-black/5 dark:bg-white/5 flex items-center justify-center"
              >

                <Menu size={20} />

              </button>

              <div>

                <h1 className="text-2xl font-bold capitalize">

                  {pathname
                    .split("/")
                    .pop()}

                </h1>

                <p className="text-sm text-gray-500">

                  Welcome back 👋

                </p>

              </div>

            </div>

            {/* RIGHT */}
            <div className="flex items-center gap-4">

              {/* DARK MODE */}
              <button
                onClick={() =>
                  setDark(!dark)
                }
                className="w-11 h-11 rounded-2xl bg-black/5 dark:bg-white/5 hover:scale-105 transition flex items-center justify-center"
              >

                {dark ? (
                  <Sun size={18} />
                ) : (
                  <Moon size={18} />
                )}

              </button>

              {/* NOTIFICATIONS */}
              <div className="relative w-11 h-11 rounded-2xl bg-black/5 dark:bg-white/5 flex items-center justify-center">

                <Bell size={18} />

                <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full" />

              </div>

              {/* PROFILE */}
              <div className="relative">

                <button
                  onClick={() =>
                    setProfileOpen(
                      !profileOpen
                    )
                  }
                  className="flex items-center gap-3 bg-black/5 dark:bg-white/5 px-3 py-2 rounded-2xl"
                >

                  <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-[#2D2D2D] to-[#555] text-white flex items-center justify-center font-bold">

                    {avatarLetter}

                  </div>

                  <div className="hidden md:block text-left">

                    <p className="text-sm font-semibold truncate max-w-32">
                      {user.email}
                    </p>

                    <p className="text-xs text-gray-500 capitalize">
                      {user.role}
                    </p>

                  </div>

                  <ChevronDown size={16} />

                </button>

                {/* DROPDOWN */}
                {profileOpen && (

                  <div className="absolute right-0 mt-3 w-56 bg-white dark:bg-[#18181b] border border-black/5 dark:border-white/10 rounded-2xl shadow-2xl overflow-hidden">

                    <div className="p-4 border-b border-black/5 dark:border-white/10">

                      <h3 className="font-semibold truncate">
                        {user.email}
                      </h3>

                      <p className="text-sm text-gray-500 capitalize">
                        {user.role}
                      </p>

                    </div>

                    <button
                      onClick={
                        handleLogout
                      }
                      className="w-full flex items-center gap-3 px-4 py-3 hover:bg-black/5 dark:hover:bg-white/5 transition text-red-500"
                    >

                      <LogOut size={18} />

                      Logout

                    </button>

                  </div>
                )}

              </div>

            </div>

          </header>
        )}

        {/* CONTENT */}
        <main className="flex-1 p-6 md:p-8 overflow-x-auto">

          {children}

        </main>

      </div>

    </div>
  );
}