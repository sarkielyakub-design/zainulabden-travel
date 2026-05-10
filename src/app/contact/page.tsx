"use client";

import Link from "next/link";

import {
  Menu,
  X,
  Phone,
  Mail,
  MapPin,
} from "lucide-react";

import {
  useState,
} from "react";

import {
  FaWhatsapp,
  FaFacebookF,
  FaInstagram,
  FaTiktok,
  FaXTwitter,
} from "react-icons/fa6";

export default function ContactPage() {

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
              className="font-medium text-slate-700 hover:text-green-600"
            >
              Home
            </Link>

            <Link
              href="/packages"
              className="font-medium text-slate-700 hover:text-green-600"
            >
              Packages
            </Link>

            <Link
              href="/visa-services"
              className="font-medium text-slate-700 hover:text-green-600"
            >
              Visa Services
            </Link>

            <Link
              href="/tickets"
              className="font-medium text-slate-700 hover:text-green-600"
            >
              Tickets
            </Link>

            <Link
              href="/about"
              className="font-medium text-slate-700 hover:text-green-600"
            >
              About
            </Link>

            <Link
              href="/contact"
              className="font-bold text-green-600"
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

      {/* HERO */}
      <section className="bg-gradient-to-br from-slate-900 via-black to-slate-950 py-28 text-white">

        <div className="container-custom">

          <h1 className="text-6xl font-black">
            Contact Us
          </h1>

          <p className="mt-6 max-w-3xl text-xl leading-9 text-slate-300">

            Our travel consultants are available
            24/7 to help you plan your next
            international journey.

          </p>

        </div>

      </section>

      {/* CONTENT */}
      <section className="py-24">

        <div className="container-custom grid gap-16 lg:grid-cols-2">

          {/* LEFT */}
          <div className="space-y-8">

            {/* ADDRESS */}
            <div className="rounded-[32px] bg-slate-50 p-8 shadow-sm">

              <div className="flex items-center gap-3">

                <MapPin
                  size={24}
                  className="text-green-600"
                />

                <h3 className="text-3xl font-black text-slate-900">
                  Office Address
                </h3>

              </div>

              <p className="mt-6 text-lg leading-9 text-slate-600">

                No. 3D Karaye Plaza,
                Opposite Ado Bayero Mall,
                Zoo Road, Kano.

              </p>

            </div>

            {/* CONTACT */}
            <div className="rounded-[32px] bg-slate-50 p-8 shadow-sm">

              <div className="flex items-center gap-3">

                <Phone
                  size={24}
                  className="text-green-600"
                />

                <h3 className="text-3xl font-black text-slate-900">
                  Contact Details
                </h3>

              </div>

              <div className="mt-8 space-y-5 text-lg">

                <div className="flex items-center gap-4">

                  <Phone
                    size={20}
                    className="text-green-600"
                  />

                  +2348155558069

                </div>

                <div className="flex items-center gap-4">

                  <Mail
                    size={20}
                    className="text-green-600"
                  />

                  zain.travelsng@gmail.com

                </div>

              </div>

            </div>

            {/* SOCIALS */}
            <div className="rounded-[32px] bg-slate-50 p-8 shadow-sm">

              <h3 className="text-3xl font-black text-slate-900">
                Follow Us
              </h3>

              <div className="mt-8 flex flex-wrap gap-4">

                {/* WHATSAPP */}
                <a
                  href="https://wa.me/2348155558069"
                  target="_blank"
                  className="flex h-16 w-16 items-center justify-center rounded-2xl bg-green-500 text-white shadow-lg transition hover:scale-110"
                >

                  <FaWhatsapp size={28} />

                </a>

                {/* FACEBOOK */}
                <a
                  href="#"
                  className="flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-600 text-white shadow-lg transition hover:scale-110"
                >

                  <FaFacebookF size={24} />

                </a>

                {/* INSTAGRAM */}
                <a
                  href="#"
                  className="flex h-16 w-16 items-center justify-center rounded-2xl bg-pink-500 text-white shadow-lg transition hover:scale-110"
                >

                  <FaInstagram size={26} />

                </a>

                {/* TIKTOK */}
                <a
                  href="#"
                  className="flex h-16 w-16 items-center justify-center rounded-2xl bg-black text-white shadow-lg transition hover:scale-110"
                >

                  <FaTiktok size={24} />

                </a>

                {/* TWITTER/X */}
                <a
                  href="#"
                  className="flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-900 text-white shadow-lg transition hover:scale-110"
                >

                  <FaXTwitter size={24} />

                </a>

              </div>

            </div>

          </div>

          {/* FORM */}
          <div className="rounded-[40px] bg-white p-10 shadow-[0_20px_80px_rgba(0,0,0,0.08)]">

            <h3 className="text-5xl font-black text-slate-900">
              Send Message
            </h3>

            <p className="mt-4 text-lg text-slate-500">
              We usually respond within 24 hours.
            </p>

            <div className="mt-10 space-y-5">

              <input
                placeholder="Full Name"
                className="w-full rounded-2xl border border-slate-200 p-5 outline-none focus:border-green-600"
              />

              <input
                placeholder="Email Address"
                className="w-full rounded-2xl border border-slate-200 p-5 outline-none focus:border-green-600"
              />

              <input
                placeholder="Phone Number"
                className="w-full rounded-2xl border border-slate-200 p-5 outline-none focus:border-green-600"
              />

              <textarea
                placeholder="Your Message"
                className="min-h-[180px] w-full rounded-2xl border border-slate-200 p-5 outline-none focus:border-green-600"
              />

              <button className="w-full rounded-2xl bg-green-600 py-5 text-lg font-bold text-white transition hover:bg-green-700">

                Send Message

              </button>

            </div>

          </div>

        </div>

      </section>

      {/* FLOATING WHATSAPP */}
      <a
        href="https://wa.me/2348155558069"
        target="_blank"
        className="fixed bottom-6 right-6 z-50 flex h-16 w-16 items-center justify-center rounded-full bg-green-500 text-white shadow-[0_20px_50px_rgba(34,197,94,0.5)] transition hover:scale-110"
      >

        <FaWhatsapp size={32} />

      </a>

    </main>
  );
}