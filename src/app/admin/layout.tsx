"use client";

import Link from "next/link";

import {
  LayoutDashboard,
  Package,
  BookOpen,
  Users,
  CreditCard,
  LogOut,
  Plane,
  Menu,
  X,
  Bell,
  Search,
  ChevronRight,
} from "lucide-react";

import {
  useRouter,
  usePathname,
} from "next/navigation";

import {
  useState,
} from "react";

const links = [
  {
    name: "Dashboard",
    href: "/admin/dashboard",
    icon: LayoutDashboard,
  },

  {
    name: "Packages",
    href: "/admin/packages",
    icon: Package,
  },

  {
    name: "Tickets",
    href: "/admin/tickets",
    icon: Plane,
  },

  {
    name: "Bookings",
    href: "/admin/bookings",
    icon: BookOpen,
  },

  {
    name: "Users",
    href: "/admin/users",
    icon: Users,
  },

  {
    name: "Payments",
    href: "/admin/payments",
    icon: CreditCard,
  },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  const router = useRouter();

  const pathname =
    usePathname();

  const [open, setOpen] =
    useState(false);

  /* =========================
     LOGOUT
  ========================= */
  function handleLogout() {

    localStorage.removeItem(
      "token"
    );

    localStorage.removeItem(
      "user"
    );

    router.push("/login");
  }

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-slate-100 via-white to-slate-100">

      {/* MOBILE OVERLAY */}
      {open && (

        <div
          onClick={() =>
            setOpen(false)
          }
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden"
        />

      )}

      {/* SIDEBAR */}
      <aside
        className={`fixed left-0 top-0 z-50 flex h-full w-[290px] flex-col border-r border-white/10 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white shadow-[0_20px_80px_rgba(0,0,0,0.5)] transition-transform duration-300 lg:static lg:translate-x-0 ${
          open
            ? "translate-x-0"
            : "-translate-x-full"
        }`}
      >

        {/* TOP */}
        <div className="border-b border-white/10 p-6">

          {/* MOBILE CLOSE */}
          <div className="mb-4 flex justify-end lg:hidden">

            <button
              onClick={() =>
                setOpen(false)
              }
              className="rounded-xl border border-white/10 p-2"
            >

              <X size={22} />

            </button>

          </div>

          {/* LOGO */}
          <div className="flex items-center gap-4">

            <div className="flex h-16 w-16 items-center justify-center overflow-hidden rounded-3xl bg-white/10 backdrop-blur">

              <img
                src="/logo.png"
                className="h-12"
              />

            </div>

            <div>

              <h1 className="text-2xl font-black tracking-tight">
                ZAIN
              </h1>

              <p className="text-sm text-green-400">
                Admin Dashboard
              </p>

            </div>

          </div>

        </div>

        {/* PROFILE */}
        <div className="border-b border-white/10 p-6">

          <div className="rounded-3xl bg-white/5 p-5">

            <p className="text-sm text-slate-400">
              Logged in as
            </p>

            <h3 className="mt-2 text-lg font-black">
              Administrator
            </h3>

            <div className="mt-3 inline-flex rounded-full bg-green-500/20 px-4 py-2 text-xs font-bold text-green-400">

              Super Admin

            </div>

          </div>

        </div>

        {/* NAVIGATION */}
        <nav className="flex flex-1 flex-col gap-3 overflow-y-auto p-6">

          {links.map((item) => {

            const Icon =
              item.icon;

            const active =
              pathname ===
              item.href;

            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={() =>
                  setOpen(false)
                }
                className={`group flex items-center justify-between rounded-2xl px-5 py-4 transition ${
                  active
                    ? "bg-green-600 text-white shadow-lg shadow-green-500/20"
                    : "text-slate-300 hover:bg-white/5 hover:text-white"
                }`}
              >

                <div className="flex items-center gap-4">

                  <Icon size={22} />

                  <span className="font-semibold">
                    {item.name}
                  </span>

                </div>

                <ChevronRight
                  size={18}
                  className={`transition ${
                    active
                      ? "translate-x-1"
                      : "opacity-0 group-hover:opacity-100"
                  }`}
                />

              </Link>
            );
          })}

        </nav>

        {/* FOOTER */}
        <div className="border-t border-white/10 p-6">

          <button
            onClick={handleLogout}
            className="flex w-full items-center justify-center gap-3 rounded-2xl bg-red-500 px-5 py-4 font-bold text-white transition hover:bg-red-600"
          >

            <LogOut size={20} />

            Logout

          </button>

        </div>

      </aside>

      {/* MAIN */}
      <main className="flex-1">

        {/* TOPBAR */}
        <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/90 backdrop-blur">

          <div className="flex h-20 items-center justify-between px-4 lg:px-8">

            {/* LEFT */}
            <div className="flex items-center gap-4">

              {/* MOBILE MENU */}
              <button
                onClick={() =>
                  setOpen(true)
                }
                className="rounded-2xl border border-slate-200 p-3 transition hover:bg-slate-50 lg:hidden"
              >

                <Menu size={24} />

              </button>

              {/* TITLE */}
              <div>

                <h2 className="text-xl font-black text-slate-900 lg:text-2xl">
                  Admin Panel
                </h2>

                <p className="hidden text-sm text-slate-500 lg:block">
                  Manage your travel platform
                </p>

              </div>

            </div>

            {/* RIGHT */}
            <div className="flex items-center gap-4">

              {/* SEARCH */}
              <div className="hidden items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 lg:flex">

                <Search
                  size={18}
                  className="text-slate-400"
                />

                <input
                  placeholder="Search..."
                  className="bg-transparent outline-none"
                />

              </div>

              {/* NOTIFICATION */}
              <button className="relative rounded-2xl border border-slate-200 bg-white p-3 transition hover:bg-slate-50">

                <Bell
                  size={22}
                  className="text-slate-700"
                />

                <span className="absolute right-2 top-2 h-2.5 w-2.5 rounded-full bg-green-500" />

              </button>

              {/* AVATAR */}
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-600 text-lg font-black text-white shadow-lg shadow-green-500/20">

                Z

              </div>

            </div>

          </div>

        </header>

        {/* PAGE CONTENT */}
        <div className="p-4 lg:p-8">

          {children}

        </div>

      </main>

    </div>
  );
}