"use client";

import Image from "next/image";
import Link from "next/link";

import {
  Menu,
  X,
} from "lucide-react";

import { useState } from "react";

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
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-white/20 bg-white/80 backdrop-blur-xl">
      
      <div className="container-custom flex h-20 items-center justify-between">

        {/* LEFT */}
        <Link
          href="/"
          className="flex items-center gap-3"
        >
          <Image
            src="/logo.png"
            alt="Zain Travel"
            width={52}
            height={52}
            className="object-contain"
          />

          <div>
            
            <p className="text-xs text-gray-500">
              Travel & Tours
            </p>
          </div>
        </Link>

        {/* DESKTOP NAV */}
        <nav className="hidden items-center gap-8 lg:flex">

          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-sm font-medium text-gray-700 transition hover:text-green-600"
            >
              {link.name}
            </Link>
          ))}

        </nav>

        {/* DESKTOP ACTIONS */}
        <div className="hidden items-center gap-3 lg:flex">

          <Button
            variant="outline"
            className="border-green-600 text-green-700 hover:bg-green-50"
          >
            Login
          </Button>

          <Button className="bg-green-600 hover:bg-green-700">
            Book Now
          </Button>

        </div>

        {/* MOBILE BUTTON */}
        <button
          onClick={() => setOpen(!open)}
          className="rounded-xl border p-2 lg:hidden"
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

          <div className="container-custom flex flex-col gap-5 py-6">

            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-base font-medium text-gray-700"
                onClick={() => setOpen(false)}
              >
                {link.name}
              </Link>
            ))}

            <div className="mt-4 flex flex-col gap-3">

              <Button
                variant="outline"
                className="border-green-600 text-green-700"
              >
                Login
              </Button>

              <Button className="bg-green-600 hover:bg-green-700">
                Book Now
              </Button>

            </div>

          </div>

        </div>
      )}
    </header>
  );
}