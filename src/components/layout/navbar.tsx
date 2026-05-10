"use client";

import Image from "next/image";
import Link from "next/link";

import {
  Menu,
  X,
  User,
  LogOut,
  LayoutDashboard,
  Plane,
} from "lucide-react";

import {
  useEffect,
  useState,
} from "react";

import {
  useRouter,
  usePathname,
} from "next/navigation";

import { Button } from "@/src/components/ui/button";

const navLinks = [
  {
    name: "Home",
    href: "/",
  },

  {
    name: "Packages",
    href: "/packages",
  },

  {
    name: "Tickets",
    href: "/tickets",
  },

  {
    name: "Visa Services",
    href: "/visa-services",
  },

  {
    name: "About",
    href: "/about",
  },

  {
    name: "Contact",
    href: "/contact",
  },
];

export default function Navbar() {

  const router = useRouter();

  const pathname = usePathname();

  const [open, setOpen] =
    useState(false);

  const [user, setUser] =
    useState<any>(null);

  /* =========================
     LOAD USER
  ========================= */
  useEffect(() => {

    const storedUser =
      localStorage.getItem(
        "user"
      );

    if (storedUser) {

      setUser(
        JSON.parse(storedUser)
      );
    }

  }, []);

  /* =========================
     LOGOUT
  ========================= */
  function logout() {

    localStorage.removeItem(
      "token"
    );

    localStorage.removeItem(
      "user"
    );

    setUser(null);

    router.push("/login");
  }

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/90 backdrop-blur-xl">

      <div className="container-custom flex h-20 items-center justify-between">

        {/* =========================
           LOGO
        ========================= */}
        <Link
          href="/"
          className="flex items-center gap-4"
        >

          {/* LOGO IMAGE */}
          <div className="flex h-14 w-14 items-center justify-center overflow-hidden rounded-2xl border border-green-100 bg-green-50 shadow-sm">

            <Image
              src="/logo.png"
              alt="Zain Logo"
              width={44}
              height={44}
              priority
              className="object-contain"
            />

          </div>

          {/* TEXT */}
          <div className="hidden sm:block">

            <h2 className="text-xl font-black tracking-tight text-slate-900">

              ZAINULABIDEEN

            </h2>

            <p className="text-sm font-medium text-green-600">

              Travel & Tours

            </p>

          </div>

        </Link>

        {/* =========================
           DESKTOP NAV
        ========================= */}
        <nav className="hidden items-center gap-2 lg:flex">

          {navLinks.map((link) => (

            <Link
              key={link.name}
              href={link.href}
              className={`rounded-2xl px-5 py-3 text-sm font-semibold transition ${
                pathname ===
                link.href
                  ? "bg-green-600 text-white shadow-lg shadow-green-500/20"
                  : "text-slate-700 hover:bg-slate-100"
              }`}
            >

              {link.name}

            </Link>
          ))}

        </nav>

        {/* =========================
           RIGHT SIDE
        ========================= */}
        <div className="hidden items-center gap-3 lg:flex">

          {!user ? (
            <>
              {/* LOGIN */}
              <Link href="/login">

                <Button
                  variant="outline"
                  className="h-12 rounded-2xl border-green-600 px-6 font-bold text-green-700 hover:bg-green-50"
                >

                  Login

                </Button>

              </Link>

              {/* REGISTER */}
              <Link href="/register">

                <Button className="h-12 rounded-2xl bg-green-600 px-6 font-bold shadow-lg shadow-green-500/20 hover:bg-green-700">

                  Register

                </Button>

              </Link>
            </>
          ) : (
            <>
              {/* USER */}
              <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm">

                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100 text-green-600">

                  <User size={18} />

                </div>

                <div>

                  <p className="text-xs text-slate-500">
                    Logged In
                  </p>

                  <h3 className="max-w-[180px] truncate text-sm font-bold text-slate-900">

                    {user.email}

                  </h3>

                </div>

              </div>

              {/* ADMIN */}
              {user.is_admin && (

                <Link href="/admin">

                  <Button className="flex h-12 items-center gap-2 rounded-2xl bg-black px-6 font-bold text-white hover:bg-slate-800">

                    <LayoutDashboard
                      size={18}
                    />

                    Dashboard

                  </Button>

                </Link>
              )}

              {/* LOGOUT */}
              <Button
                onClick={logout}
                variant="outline"
                className="flex h-12 items-center gap-2 rounded-2xl border-red-500 px-6 font-bold text-red-600 hover:bg-red-50"
              >

                <LogOut size={18} />

                Logout

              </Button>
            </>
          )}

        </div>

        {/* =========================
           MOBILE MENU BUTTON
        ========================= */}
        <button
          onClick={() =>
            setOpen(!open)
          }
          className="rounded-2xl border border-slate-200 p-3 transition hover:bg-slate-50 lg:hidden"
        >

          {open ? (
            <X size={24} />
          ) : (
            <Menu size={24} />
          )}

        </button>

      </div>

      {/* =========================
         MOBILE MENU
      ========================= */}
      {open && (

        <div className="border-t bg-white lg:hidden">

          <div className="container-custom flex flex-col gap-4 py-6">

            {/* LINKS */}
            {navLinks.map((link) => (

              <Link
                key={link.name}
                href={link.href}
                onClick={() =>
                  setOpen(false)
                }
                className={`rounded-2xl px-5 py-4 font-semibold transition ${
                  pathname ===
                  link.href
                    ? "bg-green-600 text-white"
                    : "text-slate-700 hover:bg-slate-100"
                }`}
              >

                {link.name}

              </Link>
            ))}

            {/* AUTH */}
            <div className="mt-4 flex flex-col gap-4">

              {!user ? (
                <>
                  <Link
                    href="/login"
                    onClick={() =>
                      setOpen(false)
                    }
                  >

                    <Button
                      variant="outline"
                      className="h-14 w-full rounded-2xl border-green-600 font-bold text-green-700"
                    >

                      Login

                    </Button>

                  </Link>

                  <Link
                    href="/register"
                    onClick={() =>
                      setOpen(false)
                    }
                  >

                    <Button className="h-14 w-full rounded-2xl bg-green-600 font-bold hover:bg-green-700">

                      Register

                    </Button>

                  </Link>
                </>
              ) : (
                <>
                  {/* USER CARD */}
                  <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">

                    <div className="flex items-center gap-4">

                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-100 text-green-600">

                        <User size={20} />

                      </div>

                      <div>

                        <p className="text-sm text-slate-500">
                          Logged In
                        </p>

                        <h3 className="font-bold text-slate-900">

                          {user.email}

                        </h3>

                      </div>

                    </div>

                  </div>

                  {/* ADMIN */}
                  {user.is_admin && (

                    <Link
                      href="/admin"
                      onClick={() =>
                        setOpen(false)
                      }
                    >

                      <Button className="flex h-14 w-full items-center gap-2 rounded-2xl bg-black font-bold text-white">

                        <LayoutDashboard
                          size={18}
                        />

                        Admin Dashboard

                      </Button>

                    </Link>
                  )}

                  {/* LOGOUT */}
                  <Button
                    onClick={logout}
                    variant="outline"
                    className="flex h-14 w-full items-center gap-2 rounded-2xl border-red-500 font-bold text-red-600"
                  >

                    <LogOut size={18} />

                    Logout

                  </Button>
                </>
              )}

            </div>

          </div>

        </div>
      )}

    </header>
  );
}