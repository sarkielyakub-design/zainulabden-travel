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
  MessageSquare,
  Settings,
  BarChart3,
  PlaneTakeoff,
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
  name: "Flight Bookings",
  href: "/admin/flight-bookings",
  icon: PlaneTakeoff,
},
  {
    name: "Payments",
    href: "/admin/payments",
    icon: CreditCard,
  },

  {
    name: "Messages",
    href: "/admin/messages",
    icon: MessageSquare,
  },

  {
    name: "Users",
    href: "/admin/users",
    icon: Users,
  },

  {
    name: "Analytics",
    href: "/admin/analytics",
    icon: BarChart3,
  },

  {
    name: "Settings",
    href: "/admin/settings",
    icon: Settings,
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
    <div className="flex min-h-screen bg-slate-100">

      {/* MOBILE OVERLAY */}
      {open && (

        <div
          onClick={() =>
            setOpen(false)
          }
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
        />

      )}

      {/* =========================
         SIDEBAR
      ========================= */}
      <aside
        className={`fixed left-0 top-0 z-50 flex h-full w-[300px] flex-col overflow-hidden border-r border-white/10 bg-gradient-to-b from-slate-950 via-slate-900 to-black text-white shadow-[0_20px_100px_rgba(0,0,0,0.5)] transition-transform duration-300 lg:static lg:translate-x-0 ${
          open
            ? "translate-x-0"
            : "-translate-x-full"
        }`}
      >

        {/* TOP */}
        <div className="border-b border-white/10 p-7">

          {/* MOBILE CLOSE */}
          <div className="mb-4 flex justify-end lg:hidden">

            <button
              onClick={() =>
                setOpen(false)
              }
              className="rounded-2xl border border-white/10 bg-white/5 p-2"
            >

              <X size={22} />

            </button>

          </div>

          {/* BRAND */}
          <div className="flex items-center gap-4">

            <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-white/10 backdrop-blur">

              <img
                src="/logo.png"
                alt="logo"
                className="h-12"
              />

            </div>

            <div>

              <h1 className="text-3xl font-black tracking-tight">
                ZAIN
              </h1>

              <p className="mt-1 text-sm text-green-400">
                Travel Agency ERP
              </p>

            </div>

          </div>

        </div>

        {/* PROFILE */}
        <div className="border-b border-white/10 p-6">

          <div className="rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur">

            <div className="flex items-center gap-4">

              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-green-600 text-xl font-black">

                Z

              </div>

              <div>

                <p className="text-sm text-slate-400">
                  Logged in as
                </p>

                <h3 className="text-lg font-black">
                  Administrator
                </h3>

              </div>

            </div>

            <div className="mt-5 inline-flex rounded-full bg-green-500/20 px-4 py-2 text-xs font-bold text-green-400">

              Super Admin

            </div>

          </div>

        </div>

        {/* NAVIGATION */}
        <nav className="flex flex-1 flex-col gap-2 overflow-y-auto p-6">

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
                className={`group flex items-center justify-between rounded-2xl px-5 py-4 transition-all duration-200 ${
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

      {/* =========================
         MAIN CONTENT
      ========================= */}
      <main className="flex-1 overflow-hidden">

        {/* TOPBAR */}
        <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/80 backdrop-blur-xl">

          <div className="flex h-20 items-center justify-between px-4 lg:px-8">

            {/* LEFT */}
            <div className="flex items-center gap-4">

              {/* MOBILE MENU */}
              <button
                onClick={() =>
                  setOpen(true)
                }
                className="rounded-2xl border border-slate-200 bg-white p-3 transition hover:bg-slate-50 lg:hidden"
              >

                <Menu size={24} />

              </button>

              {/* PAGE TITLE */}
              <div>

                <h2 className="text-2xl font-black text-slate-900">
                  Admin Dashboard
                </h2>

                <p className="hidden text-sm text-slate-500 lg:block">
                  Manage your travel business professionally
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
                  className="bg-transparent text-sm outline-none"
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

              {/* USER */}
              <div className="hidden items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-2 lg:flex">

                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-green-600 font-black text-white">

                  Z

                </div>

                <div>

                  <h4 className="text-sm font-bold text-slate-900">
                    Admin
                  </h4>

                  <p className="text-xs text-slate-500">
                    Super Administrator
                  </p>

                </div>

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