"use client";


import "@/src/i18n";
import Image from "next/image";
import Link from "next/link";

import {
  Menu,
  X,
  User,
  LogOut,
  LayoutDashboard,
  Globe,
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

import {
  useTranslation,
} from "react-i18next";

const navLinks = [
  {
    key: "home",
    href: "/",
  },

  {
    key: "packages",
    href: "/packages",
  },

  {
    key: "tickets",
    href: "/tickets",
  },

  {
    key: "contact",
    href: "/contact",
  },
];

export default function Navbar() {

  const router = useRouter();

  const pathname =
    usePathname();

  const { t, i18n } =
    useTranslation();

  const [open, setOpen] =
    useState(false);

  const [user, setUser] =
    useState<any>(null);

  /* =========================
     LOAD USER + LANGUAGE
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

    const savedLang =
      localStorage.getItem(
        "lang"
      );

    if (savedLang) {

      i18n.changeLanguage(
        savedLang
      );
    }

  }, []);

  /* =========================
     CHANGE LANGUAGE
  ========================= */
  function changeLanguage(
    lang: string
  ) {

    i18n.changeLanguage(lang);

    localStorage.setItem(
      "lang",
      lang
    );
  }

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

        {/* LOGO */}
        <Link
          href="/"
          className="flex items-center gap-4"
        >

          <div className="flex h-14 w-14 items-center justify-center overflow-hidden rounded-2xl border border-green-100 bg-green-50 shadow-sm">

            <Image
              src="/logo.png"
              alt="Logo"
              width={44}
              height={44}
              className="object-contain"
            />

          </div>

          <div className="hidden sm:block">

            <h2 className="text-xl font-black tracking-tight text-slate-900">

              ZAINULABIDEEN

            </h2>

            <p className="text-sm font-medium text-green-600">

              Travel & Tours

            </p>

          </div>

        </Link>

        {/* DESKTOP NAV */}
        <nav className="hidden items-center gap-2 lg:flex">

          {navLinks.map((link) => (

            <Link
              key={link.key}
              href={link.href}
              className={`rounded-2xl px-5 py-3 text-sm font-semibold transition ${
                pathname ===
                link.href
                  ? "bg-green-600 text-white"
                  : "text-slate-700 hover:bg-slate-100"
              }`}
            >

              {t(link.key)}

            </Link>
          ))}

        </nav>

        {/* RIGHT */}
        <div className="hidden items-center gap-3 lg:flex">

          {/* LANGUAGE */}
          <div className="flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-3">

            <Globe
              size={18}
              className="text-green-600"
            />

            <select
              onChange={(e) =>
                changeLanguage(
                  e.target.value
                )
              }
              defaultValue={
                i18n.language
              }
              className="bg-transparent text-sm font-semibold outline-none"
            >

              <option value="en">
                EN
              </option>

              <option value="ar">
                AR
              </option>

              <option value="ha">
                HA
              </option>

            </select>

          </div>

          {!user ? (
            <>
              <Link href="/login">

                <Button
                  variant="outline"
                  className="h-12 rounded-2xl border-green-600 px-6 font-bold text-green-700"
                >

                  Login

                </Button>

              </Link>

              <Link href="/register">

                <Button className="h-12 rounded-2xl bg-green-600 px-6 font-bold hover:bg-green-700">

                  Register

                </Button>

              </Link>
            </>
          ) : (
            <>
              {/* USER */}
              <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3">

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

                    {t("dashboard")}

                  </Button>

                </Link>
              )}

              {/* LOGOUT */}
              <Button
                onClick={logout}
                variant="outline"
                className="flex h-12 items-center gap-2 rounded-2xl border-red-500 px-6 font-bold text-red-600"
              >

                <LogOut size={18} />

                Logout

              </Button>
            </>
          )}

        </div>

        {/* MOBILE BUTTON */}
        <button
          onClick={() =>
            setOpen(!open)
          }
          className="rounded-2xl border border-slate-200 p-3 lg:hidden"
        >

          {open ? (
            <X size={24} />
          ) : (
            <Menu size={24} />
          )}

        </button>

      </div>

      {/* MOBILE MENU */}
      {open && (

        <div className="border-t bg-white lg:hidden">

          <div className="container-custom flex flex-col gap-4 py-6">

            {/* LANGUAGE */}
            <div className="mb-4 flex items-center gap-3 rounded-2xl border border-slate-200 p-4">

              <Globe
                size={18}
                className="text-green-600"
              />

              <select
                onChange={(e) =>
                  changeLanguage(
                    e.target.value
                  )
                }
                defaultValue={
                  i18n.language
                }
                className="bg-transparent font-semibold outline-none"
              >

                <option value="en">
                  English
                </option>

                <option value="ar">
                  العربية
                </option>

                <option value="ha">
                  Hausa
                </option>

              </select>

            </div>

            {/* LINKS */}
            {navLinks.map((link) => (

              <Link
                key={link.key}
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

                {t(link.key)}

              </Link>
            ))}

          </div>

        </div>
      )}

    </header>
  );
}