"use client";

import Link from "next/link";

import {
  Mail,
  Phone,
  MapPin,
  Globe2,
  MessageCircle,
} from "lucide-react";

import {
  FaWhatsapp,
  FaFacebookF,
  FaInstagram,
  FaTiktok,
  FaXTwitter,
} from "react-icons/fa6";

export default function Footer() {

  return (
    <footer className="relative overflow-hidden bg-gradient-to-br from-slate-950 via-black to-slate-900 text-white">

      {/* BACKGROUND */}
      <div className="absolute inset-0">

        <div className="absolute left-0 top-0 h-72 w-72 rounded-full bg-green-500/10 blur-3xl" />

        <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-emerald-500/10 blur-3xl" />

      </div>

      <div className="container-custom relative py-24">

        {/* TOP */}
        <div className="grid gap-16 lg:grid-cols-4">

          {/* COMPANY */}
          <div>

            <div className="flex items-center gap-4">

              <img
                src="/logo.png"
                alt="Logo"
                className="h-16"
              />

              <div>

                <h2 className="text-2xl font-black">
                  ZAIN
                </h2>

                <p className="text-sm text-green-400">
                  Travel & Tours
                </p>

              </div>

            </div>

            <p className="mt-8 leading-8 text-slate-400">

              Premium Umrah, Hajj,
              visa processing, flights
              and global luxury travel
              experiences.

            </p>

            {/* SOCIALS */}
            <div className="mt-8 flex flex-wrap gap-4">

              <a
                href="https://wa.me/2348155558069"
                target="_blank"
                className="flex h-12 w-12 items-center justify-center rounded-2xl bg-green-500 text-white transition hover:scale-110"
              >

                <FaWhatsapp size={22} />

              </a>

              <a
                href="#"
                className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-600 text-white transition hover:scale-110"
              >

                <FaFacebookF size={18} />

              </a>

              <a
                href="#"
                className="flex h-12 w-12 items-center justify-center rounded-2xl bg-pink-500 text-white transition hover:scale-110"
              >

                <FaInstagram size={20} />

              </a>

              <a
                href="#"
                className="flex h-12 w-12 items-center justify-center rounded-2xl bg-black text-white transition hover:scale-110"
              >

                <FaTiktok size={18} />

              </a>

              <a
                href="#"
                className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-700 text-white transition hover:scale-110"
              >

                <FaXTwitter size={18} />

              </a>

            </div>

          </div>

          {/* LINKS */}
          <div>

            <h3 className="text-2xl font-black">
              Quick Links
            </h3>

            <div className="mt-8 space-y-4">

              <Link
                href="/"
                className="block text-slate-400 transition hover:text-green-400"
              >
                Home
              </Link>

              <Link
                href="/packages"
                className="block text-slate-400 transition hover:text-green-400"
              >
                Packages
              </Link>

              <Link
                href="/tickets"
                className="block text-slate-400 transition hover:text-green-400"
              >
                Tickets
              </Link>

              <Link
                href="/visa-services"
                className="block text-slate-400 transition hover:text-green-400"
              >
                Visa Services
              </Link>

              <Link
                href="/about"
                className="block text-slate-400 transition hover:text-green-400"
              >
                About Us
              </Link>

              <Link
                href="/contact"
                className="block text-slate-400 transition hover:text-green-400"
              >
                Contact
              </Link>

            </div>

          </div>

          {/* CONTACT */}
          <div>

            <h3 className="text-2xl font-black">
              Contact
            </h3>

            <div className="mt-8 space-y-6">

              <div className="flex items-start gap-4">

                <Phone className="mt-1 text-green-400" />

                <div>

                  <p className="font-semibold">
                    Phone
                  </p>

                  <p className="mt-1 text-slate-400">
                    +2348155558069
                  </p>

                </div>

              </div>

              <div className="flex items-start gap-4">

                <Mail className="mt-1 text-green-400" />

                <div>

                  <p className="font-semibold">
                    Email
                  </p>

                  <p className="mt-1 text-slate-400">
                    zain.travelsng@gmail.com
                  </p>

                </div>

              </div>

              <div className="flex items-start gap-4">

                <MapPin className="mt-1 text-green-400" />

                <div>

                  <p className="font-semibold">
                    Address
                  </p>

                  <p className="mt-1 text-slate-400">
                    Zoo Road, Kano,
                    Nigeria
                  </p>

                </div>

              </div>

            </div>

          </div>

          {/* MULTI LANGUAGE */}
          <div>

            <h3 className="text-2xl font-black">
              Multi Language
            </h3>

            <p className="mt-6 leading-8 text-slate-400">

              Our platform supports
              multiple languages for
              global travelers.

            </p>

            <div className="mt-8 space-y-4">

              {[
                "English",
                "Arabic",
                "Hausa",
                "French",
              ].map((lang) => (

                <div
                  key={lang}
                  className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3"
                >

                  <Globe2
                    size={18}
                    className="text-green-400"
                  />

                  <span>
                    {lang}
                  </span>

                </div>
              ))}

            </div>

          </div>

        </div>

        {/* BOTTOM */}
        <div className="mt-20 border-t border-white/10 pt-8 text-center">

          <p className="text-slate-500">

            ©️ {new Date().getFullYear()}
            {" "}
            ZAINULABIDEEN TRAVEL AGENCY
            NIGERIA LIMITED.
            All rights reserved.

          </p>

        </div>

      </div>

      {/* FLOATING WHATSAPP */}
      <a
        href="https://wa.me/2348155558069"
        target="_blank"
        className="fixed bottom-6 right-6 z-50 flex h-16 w-16 items-center justify-center rounded-full bg-green-500 text-white shadow-[0_20px_50px_rgba(34,197,94,0.5)] transition hover:scale-110"
      >

        <FaWhatsapp size={32} />

      </a>

      {/* CHATBOT */}
      <button
        className="fixed bottom-6 left-6 z-50 flex items-center gap-3 rounded-full bg-black px-6 py-4 text-sm font-bold text-white shadow-xl transition hover:bg-slate-800"
      >

        <MessageCircle size={20} />

        AI Travel Assistant

      </button>

    </footer>
  );
}