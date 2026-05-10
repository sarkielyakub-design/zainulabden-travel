"use client";

import Link from "next/link";

import {
  Menu,
  X,
  Globe2,
  Plane,
  ShieldCheck,
  Building2,
} from "lucide-react";

import {
  useState,
} from "react";

export default function AboutPage() {

  const [mobileMenu, setMobileMenu] =
    useState(false);

  return (
    <main className="min-h-screen bg-white">

      {/* =========================
         NAVBAR
      ========================= */}
      <header className="sticky top-0 z-50 border-b bg-white/90 backdrop-blur">

        <div className="container-custom flex h-20 items-center justify-between">

          {/* LOGO */}
          <Link
            href="/"
            className="flex items-center gap-3"
          >

            <img
              src="/logo.png"
              alt="Logo"
              className="h-14"
            />

            <div>

              <h2 className="text-xl font-black text-slate-900">
                ZAIN
              </h2>

              <p className="text-sm text-slate-500">
                Travel & Tours
              </p>

            </div>

          </Link>

          {/* DESKTOP NAV */}
          <nav className="hidden items-center gap-8 lg:flex">

            <Link
              href="/"
              className="font-medium text-slate-700 transition hover:text-green-600"
            >
              Home
            </Link>

            <Link
              href="/packages"
              className="font-medium text-slate-700 transition hover:text-green-600"
            >
              Packages
            </Link>

            <Link
              href="/visa-services"
              className="font-medium text-slate-700 transition hover:text-green-600"
            >
              Visa Services
            </Link>

            <Link
              href="/tickets"
              className="font-medium text-slate-700 transition hover:text-green-600"
            >
              Tickets
            </Link>

            <Link
              href="/about"
              className="font-bold text-green-600"
            >
              About
            </Link>

            <Link
              href="/contact"
              className="font-medium text-slate-700 transition hover:text-green-600"
            >
              Contact
            </Link>

          </nav>

          {/* MOBILE BUTTON */}
          <button
            onClick={() =>
              setMobileMenu(
                !mobileMenu
              )
            }
            className="rounded-xl border p-2 lg:hidden"
          >

            {mobileMenu ? (
              <X size={24} />
            ) : (
              <Menu size={24} />
            )}

          </button>

        </div>

        {/* MOBILE NAV */}
        {mobileMenu && (

          <div className="border-t bg-white lg:hidden">

            <div className="container-custom flex flex-col gap-5 py-6">

              <Link href="/">
                Home
              </Link>

              <Link href="/packages">
                Packages
              </Link>

              <Link href="/visa-services">
                Visa Services
              </Link>

              <Link href="/tickets">
                Tickets
              </Link>

              <Link href="/about">
                About
              </Link>

              <Link href="/contact">
                Contact
              </Link>

            </div>

          </div>
        )}

      </header>

      {/* =========================
         HERO
      ========================= */}
      <section className="relative overflow-hidden bg-gradient-to-br from-green-600 via-emerald-700 to-green-900 py-32 text-white">

        {/* BACKGROUND */}
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1503220317375-aaad61436b1b?q=80&w=1600&auto=format&fit=crop')] bg-cover bg-center opacity-20" />

        <div className="container-custom relative">

          <div className="max-w-5xl">

            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-white/10 px-5 py-2 backdrop-blur">

              <ShieldCheck size={18} />

              <span className="font-semibold">
                30+ Years Travel Experience
              </span>

            </div>

            <h1 className="text-6xl font-black leading-tight lg:text-7xl">

              Building Trusted
              <span className="block text-green-200">
                Travel Experiences
              </span>

              Across Africa

            </h1>

            <p className="mt-10 max-w-4xl text-xl leading-10 text-green-100">

              ZAINULABDEEN TRAVEL AGENCY
              NIGERIA LIMITED has over
              30 years of experience in
              Umrah, Hajj, Visa Processing,
              International Flights and
              Luxury Travel Services.

            </p>

          </div>

        </div>

      </section>

      {/* =========================
         ABOUT CONTENT
      ========================= */}
      <section className="py-24">

        <div className="container-custom grid gap-16 lg:grid-cols-2">

          {/* LEFT */}
          <div>

            <div className="mb-5 inline-flex rounded-full bg-green-100 px-5 py-2 text-sm font-bold text-green-700">

              About Our Company

            </div>

            <h2 className="text-5xl font-black leading-tight text-slate-900">

              Trusted Travel Experts
              Across Multiple Countries

            </h2>

            <p className="mt-8 text-lg leading-9 text-slate-600">

              We are one of Nigeria’s trusted
              travel companies specializing in
              international flights, Umrah,
              Hajj, visa processing, luxury
              tourism and hotel reservations.

            </p>

            {/* SERVICES */}
            <div className="mt-12 space-y-5">

              {[
                "International Flight Booking",
                "Umrah & Hajj Packages",
                "Visa Processing Services",
                "Luxury Hotel Reservations",
                "Tourism & Travel Solutions",
              ].map((item) => (

                <div
                  key={item}
                  className="flex items-center gap-4 rounded-2xl bg-slate-50 p-5"
                >

                  <Plane className="text-green-600" />

                  <span className="text-lg font-semibold text-slate-800">

                    {item}

                  </span>

                </div>
              ))}

            </div>

          </div>

          {/* RIGHT */}
          <div className="rounded-[40px] bg-slate-50 p-10 shadow-sm">

            <div className="mb-8 flex items-center gap-3">

              <Building2
                size={26}
                className="text-green-600"
              />

              <h3 className="text-3xl font-black text-slate-900">

                Company Information

              </h3>

            </div>

            <div className="space-y-6 text-lg">

              <div>

                <span className="font-black text-slate-900">
                  Company:
                </span>

                <p className="mt-2 text-slate-600">

                  ZAINULABDEEN TRAVEL AGENCY
                  NIGERIA LIMITED

                </p>

              </div>

              <div>

                <span className="font-black text-slate-900">
                  Address:
                </span>

                <p className="mt-2 text-slate-600">

                  No. 3D Karaye Plaza,
                  Opposite Ado Bayero Mall,
                  Zoo Road, Kano.

                </p>

              </div>

              <div>

                <span className="font-black text-slate-900">
                  Phone:
                </span>

                <p className="mt-2 text-slate-600">
                  +2348155558069
                </p>

              </div>

              <div>

                <span className="font-black text-slate-900">
                  Email:
                </span>

                <p className="mt-2 text-slate-600">
                  zain.travelsng@gmail.com
                </p>

              </div>

              <div>

                <span className="font-black text-slate-900">
                  RC Number:
                </span>

                <p className="mt-2 text-slate-600">
                  7647189
                </p>

              </div>

              <div>

                <span className="font-black text-slate-900">
                  Founded:
                </span>

                <p className="mt-2 text-slate-600">
                  2024-07-03
                </p>

              </div>

            </div>

          </div>

        </div>

      </section>

      {/* =========================
         BRANCHES
      ========================= */}
      <section className="bg-slate-50 py-24">

        <div className="container-custom">

          <div className="text-center">

            <div className="mb-5 inline-flex rounded-full bg-green-100 px-5 py-2 text-sm font-bold text-green-700">

              African Presence

            </div>

            <h2 className="text-5xl font-black text-slate-900">
              Our Branches Across Africa
            </h2>

            <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-slate-600">

              We continue expanding our
              operations across Africa
              through strategic travel
              partnerships and regional offices.

            </p>

          </div>

          {/* GRID */}
          <div className="mt-16 grid gap-8 md:grid-cols-2 xl:grid-cols-4">

            {[
              "Nigeria",
              "Ghana",
              "Niger",
              "Saudi Arabia",
            ].map((country) => (

              <div
                key={country}
                className="rounded-[36px] bg-white p-10 text-center shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
              >

                <Globe2
                  size={40}
                  className="mx-auto text-green-600"
                />

                <h3 className="mt-6 text-3xl font-black text-slate-900">

                  {country}

                </h3>

                <p className="mt-3 text-slate-500">
                  Regional Branch
                </p>

              </div>
            ))}

          </div>

        </div>

      </section>

    </main>
  );
}