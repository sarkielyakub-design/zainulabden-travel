"use client";

import Link from "next/link";

import {
  Menu,
  X,
  Globe2,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Plane,
} from "lucide-react";

import {
  useState,
} from "react";

const visaServices = [
  {
    title: "Saudi Umrah Visa",

    desc:
      "Fast Umrah visa processing with complete travel package support.",

    packageType: "umrah",

    image:
      "https://images.unsplash.com/photo-1564769625905-50e93615e769?q=80&w=1600&auto=format&fit=crop",

    button: "Apply For Umrah Visa",
  },

  {
    title: "Hajj Visa",

    desc:
      "Official Hajj visa support and premium pilgrimage packages.",

    packageType: "hajj",

    image:
      "https://images.unsplash.com/photo-1524492514790-831f5b6d1d52?q=80&w=1600&auto=format&fit=crop",

    button: "Apply For Hajj Visa",
  },

  {
    title: "Dubai Tourist Visa",

    desc:
      "Professional UAE tourist visa assistance with Dubai travel deals.",

    packageType: "dubai",

    image:
      "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=1600&auto=format&fit=crop",

    button: "Apply For Dubai Visa",
  },

  {
    title: "UK Visa",

    desc:
      "Travel, business and family visa support for the United Kingdom.",

    packageType: "london",

    image:
      "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?q=80&w=1600&auto=format&fit=crop",

    button: "Apply For UK Visa",
  },

  {
    title: "Student Visa",

    desc:
      "Study abroad visa processing and educational travel support.",

    packageType: "study",

    image:
      "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=1600&auto=format&fit=crop",

    button: "Apply For Student Visa",
  },

  {
    title: "Work Visa",

    desc:
      "International work permit and employment visa assistance.",

    packageType: "work",

    image:
      "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=1600&auto=format&fit=crop",

    button: "Apply For Work Visa",
  },
];

export default function VisaServicesPage() {

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
              href="/tickets"
              className="font-medium text-slate-700 transition hover:text-green-600"
            >
              Tickets
            </Link>

            <Link
              href="/visa-services"
              className="font-bold text-green-600"
            >
              Visa Services
            </Link>

            <Link
              href="/about"
              className="font-medium text-slate-700 transition hover:text-green-600"
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

              <Link href="/tickets">
                Tickets
              </Link>

              <Link href="/visa-services">
                Visa Services
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
      <section className="relative overflow-hidden bg-gradient-to-br from-green-600 to-emerald-700 py-28 text-white">

        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1521295121783-8a321d551ad2?q=80&w=1600&auto=format&fit=crop')] bg-cover bg-center opacity-10" />

        <div className="container-custom relative">

          <div className="max-w-5xl">

            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-white/10 px-5 py-2 backdrop-blur">

              <ShieldCheck size={18} />

              <span className="font-semibold">
                Trusted International Visa Services
              </span>

            </div>

            <h1 className="text-6xl font-black leading-tight lg:text-7xl">

              Visa Processing
              <span className="block text-green-100">
                Made Simple
              </span>

            </h1>

            <p className="mt-8 max-w-3xl text-xl leading-9 text-green-100">

              Professional visa assistance for
              Umrah, Hajj, Dubai, UK, Study,
              Work and international travel.

            </p>

          </div>

        </div>

      </section>

      {/* =========================
         SERVICES
      ========================= */}
      <section className="py-24">

        <div className="container-custom">

          <div className="mb-16 text-center">

            <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-green-100 px-5 py-2 text-sm font-bold text-green-700">

              <Globe2 size={18} />

              Visa Services

            </div>

            <h2 className="text-5xl font-black text-slate-900">

              Professional Visa Solutions

            </h2>

            <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-slate-600">

              Choose your preferred visa service
              and continue directly to matching
              travel packages.

            </p>

          </div>

          {/* GRID */}
          <div className="grid gap-10 md:grid-cols-2 xl:grid-cols-3">

            {visaServices.map((service) => (

              <div
                key={service.title}
                className="group overflow-hidden rounded-[40px] bg-white shadow-[0_20px_80px_rgba(15,23,42,0.08)] transition duration-500 hover:-translate-y-2 hover:shadow-[0_30px_100px_rgba(15,23,42,0.16)]"
              >

                {/* IMAGE */}
                <div className="relative h-[280px] overflow-hidden">

                  <img
                    src={service.image}
                    alt={service.title}
                    className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
                  />

                  {/* OVERLAY */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

                  {/* BADGE */}
                  <div className="absolute left-5 top-5 rounded-full bg-white/90 px-4 py-2 backdrop-blur">

                    <div className="flex items-center gap-2">

                      <Globe2
                        size={16}
                        className="text-green-600"
                      />

                      <span className="text-sm font-bold text-slate-900">

                        Visa Service

                      </span>

                    </div>

                  </div>

                </div>

                {/* CONTENT */}
                <div className="p-8">

                  <h3 className="text-4xl font-black text-slate-900">

                    {service.title}

                  </h3>

                  <p className="mt-6 text-lg leading-8 text-slate-600">

                    {service.desc}

                  </p>

                  {/* FEATURES */}
                  <div className="mt-8 space-y-4">

                    {[
                      "Fast Processing",
                      "Professional Guidance",
                      "Travel Support",
                    ].map((feature) => (

                      <div
                        key={feature}
                        className="flex items-center gap-3 text-slate-700"
                      >

                        <CheckCircle2
                          size={18}
                          className="text-green-600"
                        />

                        <span className="font-medium">

                          {feature}

                        </span>

                      </div>
                    ))}

                  </div>

                  {/* BUTTON */}
                  <Link
                    href={`/packages?search=${service.packageType}`}
                    className="mt-10 flex items-center justify-center gap-3 rounded-2xl bg-green-600 py-5 text-lg font-bold text-white transition hover:bg-green-700"
                  >

                    {service.button}

                    <ArrowRight size={22} />

                  </Link>

                </div>

              </div>
            ))}

          </div>

        </div>

      </section>

      {/* =========================
         REQUIREMENTS
      ========================= */}
      <section className="bg-slate-50 py-24">

        <div className="container-custom">

          <div className="text-center">

            <h2 className="text-5xl font-black text-slate-900">
              Basic Requirements
            </h2>

            <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-slate-600">

              Prepare these essential documents
              before starting your visa application.

            </p>

          </div>

          {/* LIST */}
          <div className="mx-auto mt-16 grid max-w-5xl gap-6 md:grid-cols-2">

            {[
              "International Passport",
              "Passport Photograph",
              "Bank Statement",
              "Valid Identification",
              "Flight Reservation",
              "Hotel Reservation",
              "Proof Of Funds",
              "Visa Application Form",
            ].map((item) => (

              <div
                key={item}
                className="flex items-center gap-4 rounded-3xl bg-white p-6 shadow-sm"
              >

                <div className="rounded-full bg-green-100 p-3 text-green-600">

                  <Plane size={18} />

                </div>

                <span className="text-lg font-semibold text-slate-900">

                  {item}

                </span>

              </div>
            ))}

          </div>

        </div>

      </section>

    </main>
  );
}