"use client";

import Link from "next/link";
import Image from "next/image";
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
    <footer className="relative overflow-hidden bg-gradient-to-br from-[#fef7e8] via-[#fffbf2] to-[#f5ede0] border-t border-[#e2d5bd]">
      {/* Vintage background texture */}
      <div
        className="absolute inset-0 opacity-5 pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 80 80' width='80' height='80'%3E%3Cpath fill='%23b8860b' d='M40 0L50 12L40 24L30 12L40 0zM0 40L12 30L24 40L12 50L0 40zM80 40L68 30L56 40L68 50L80 40zM40 80L50 68L40 56L30 68L40 80z'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
        }}
      />
      
      {/* Subtle radial glow */}
      <div className="absolute left-1/3 top-0 h-80 w-80 rounded-full bg-[#d9a13b]/5 blur-3xl" />
      <div className="absolute bottom-0 right-1/4 h-96 w-96 rounded-full bg-[#b8860b]/5 blur-3xl" />

      <div className="container-custom relative py-20">
        {/* TOP GRID */}
        <div className="grid gap-12 lg:grid-cols-4">
          {/* COMPANY INFO */}
          <div>
            <div className="flex items-center gap-4">
              <div className="relative h-14 w-14 overflow-hidden rounded-full border border-[#d9a13b]/30 bg-[#fffbf2] shadow-md">
                <img
                  src="/logo.png"
                  alt="Zainulabiden Travel Logo"
                  className="h-full w-full object-cover"
                />
              </div>
              <div>
                <h2 className="font-serif text-3xl font-black italic tracking-tight text-[#2e241f]">
                  ZAIN
                </h2>
                <p className="font-serif text-sm font-bold tracking-wide text-[#b8860b]">
                  Travel & Tours
                </p>
              </div>
            </div>

            <p className="mt-6 font-sans leading-relaxed text-[#5a4a3a]">
              Premium Umrah, Hajj, visa processing, flights and global luxury
              travel experiences – crafted with heritage and care.
            </p>

            {/* Socials – Vintage style */}
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="https://wa.me/2348155558069"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-11 w-11 items-center justify-center rounded-full bg-[#b8860b] text-[#fef7e8] transition-all hover:scale-110 hover:bg-[#d9a13b] shadow-md"
                aria-label="WhatsApp"
              >
                <FaWhatsapp size={20} />
              </a>
              <a
                href="#"
                className="flex h-11 w-11 items-center justify-center rounded-full bg-[#3b5998] text-white transition-all hover:scale-110 shadow-md"
                aria-label="Facebook"
              >
                <FaFacebookF size={18} />
              </a>
              <a
                href="#"
                className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-tr from-[#833ab4] via-[#e1306c] to-[#fd1d1d] text-white transition-all hover:scale-110 shadow-md"
                aria-label="Instagram"
              >
                <FaInstagram size={20} />
              </a>
              <a
                href="#"
                className="flex h-11 w-11 items-center justify-center rounded-full bg-[#010101] text-white transition-all hover:scale-110 shadow-md"
                aria-label="TikTok"
              >
                <FaTiktok size={18} />
              </a>
              <a
                href="#"
                className="flex h-11 w-11 items-center justify-center rounded-full bg-[#1da1f2] text-white transition-all hover:scale-110 shadow-md"
                aria-label="Twitter"
              >
                <FaXTwitter size={16} />
              </a>
            </div>
          </div>

          {/* QUICK LINKS */}
          <div>
            <h3 className="font-serif text-2xl font-black italic tracking-tight text-[#2e241f] border-l-4 border-[#d9a13b] pl-4">
              Quick Links
            </h3>
            <ul className="mt-6 space-y-3">
              {[
                ["Home", "/"],
                ["Packages", "/packages"],
                ["Tickets", "/tickets"],
                ["Visa Services", "/visa-services"],
                ["About Us", "/about"],
                ["Contact", "/contact"],
              ].map(([label, href]) => (
                <li key={label}>
                  <Link
                    href={href}
                    className="font-sans text-[#5a4a3a] transition-all hover:pl-2 hover:text-[#b8860b] inline-block"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* CONTACT DETAILS */}
          <div>
            <h3 className="font-serif text-2xl font-black italic tracking-tight text-[#2e241f] border-l-4 border-[#d9a13b] pl-4">
              Contact
            </h3>
            <div className="mt-6 space-y-5">
              <div className="flex items-start gap-4">
                <Phone size={20} className="mt-0.5 text-[#b8860b]" />
                <div>
                  <p className="font-serif font-semibold text-[#2e241f]">Phone</p>
                  <p className="font-sans text-[#5a4a3a]">+2348155558069</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Mail size={20} className="mt-0.5 text-[#b8860b]" />
                <div>
                  <p className="font-serif font-semibold text-[#2e241f]">Email</p>
                  <p className="font-sans text-[#5a4a3a] break-all">zain.travelsng@gmail.com</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <MapPin size={20} className="mt-0.5 text-[#b8860b]" />
                <div>
                  <p className="font-serif font-semibold text-[#2e241f]">Address</p>
                  <p className="font-sans text-[#5a4a3a]">Zoo Road, Kano, Nigeria</p>
                </div>
              </div>
            </div>
          </div>

          {/* LANGUAGES */}
          <div>
            <h3 className="font-serif text-2xl font-black italic tracking-tight text-[#2e241f] border-l-4 border-[#d9a13b] pl-4">
              Multi Language
            </h3>
            <p className="mt-4 font-sans text-[#5a4a3a]">
              Our platform supports multiple languages for global travelers.
            </p>
            <div className="mt-6 space-y-3">
              {["English", "Arabic", "Hausa", "French"].map((lang) => (
                <div
                  key={lang}
                  className="flex items-center gap-3 rounded-xl border border-[#e2d5bd] bg-[#fffbf2] px-4 py-2 shadow-sm"
                >
                  <Globe2 size={18} className="text-[#b8860b]" />
                  <span className="font-serif font-medium text-[#2e241f]">{lang}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* BOTTOM COPYRIGHT */}
        <div className="mt-16 border-t border-[#e2d5bd] pt-8 text-center">
          <p className="font-sans text-sm text-[#8b7355]">
            © {new Date().getFullYear()} ZAINULABIDEEN TRAVEL AGENCY NIGERIA LIMITED.
            All rights reserved. Timeless journeys, trusted since 2020.
          </p>
        </div>
      </div>

      {/* FLOATING WHATSAPP – Vintage gold accent */}
      <a
        href="https://wa.me/2348155558069"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#b8860b] text-[#fef7e8] shadow-[0_8px_25px_rgba(184,134,11,0.4)] transition-all hover:scale-110 hover:bg-[#d9a13b]"
        aria-label="Chat on WhatsApp"
      >
        <FaWhatsapp size={28} />
      </a>

      {/* AI TRAVEL ASSISTANT – Vintage style */}
      <button
        className="fixed bottom-6 left-6 z-50 flex items-center gap-3 rounded-full border border-[#d9a13b]/30 bg-[#fffbf2] px-5 py-3 font-serif font-bold text-[#2e241f] shadow-lg backdrop-blur-sm transition-all hover:border-[#d9a13b] hover:bg-[#fef7e8]"
      >
        <MessageCircle size={20} className="text-[#b8860b]" />
        AI Travel Assistant
      </button>
    </footer>
  );
}