"use client";

import Link from "next/link";

import axios from "axios";

import {
  useState,
} from "react";

import {
  Menu,
  X,
  Phone,
  Mail,
  MapPin,
  Send,
  Loader2,
  CheckCircle2,
} from "lucide-react";

import {
  FaWhatsapp,
  FaFacebookF,
  FaInstagram,
  FaTiktok,
  FaXTwitter,
} from "react-icons/fa6";

/* =========================
   API
========================= */
const API =
  "http://172.20.10.3:8000/api/v1";

export default function ContactPage() {

  /* =========================
     STATES
  ========================= */
  const [mobileMenu, setMobileMenu] =
    useState(false);

  const [loading, setLoading] =
    useState(false);

  const [success, setSuccess] =
    useState("");

  const [error, setError] =
    useState("");

  const [formData, setFormData] =
    useState({
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
    });

  /* =========================
     HANDLE CHANGE
  ========================= */
  function handleChange(
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) {

    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    });
  }

  /* =========================
     HANDLE SUBMIT
  ========================= */
  async function handleSubmit(
    e: React.FormEvent
  ) {

    e.preventDefault();

    try {

      setLoading(true);

      setSuccess("");

      setError("");

     await axios.post(
  `${API}/contact/send-message`,
  formData
);
      setSuccess(
        "Message sent successfully. Our support team will contact you shortly."
      );

      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      });

    } catch (err) {

      console.log(err);

      setError(
        "Failed to send message. Please try again."
      );

    } finally {

      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-slate-50">

      {/* =========================
         NAVBAR
      ========================= */}
      <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/90 backdrop-blur-xl">

        <div className="container-custom flex h-20 items-center justify-between">

          {/* LOGO */}
          <Link
            href="/"
            className="flex items-center gap-3"
          >

            <img
              src="/logo.png"
              alt="Logo"
              className="h-14 w-auto"
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

            {[
              {
                label: "Home",
                href: "/",
              },
              {
                label: "Packages",
                href: "/packages",
              },
              {
                label: "Visa Services",
                href: "/visa-services",
              },
              {
                label: "Tickets",
                href: "/tickets",
              },
              {
                label: "About",
                href: "/about",
              },
            ].map((item) => (

              <Link
                key={item.href}
                href={item.href}
                className="font-medium text-slate-700 transition hover:text-green-600"
              >

                {item.label}

              </Link>
            ))}

            <Link
              href="/contact"
              className="rounded-full bg-green-600 px-6 py-3 font-bold text-white shadow-lg shadow-green-500/20"
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
            className="rounded-xl border border-slate-200 p-2 lg:hidden"
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

          <div className="border-t border-slate-200 bg-white lg:hidden">

            <div className="container-custom flex flex-col gap-5 py-6 text-lg font-medium">

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

              <Link
                href="/contact"
                className="text-green-600"
              >
                Contact
              </Link>

            </div>

          </div>
        )}

      </header>

      {/* =========================
         HERO
      ========================= */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-black to-slate-950 py-32 text-white">

        <div className="absolute inset-0 opacity-20">

          <div className="absolute -left-20 top-0 h-72 w-72 rounded-full bg-green-500 blur-3xl" />

          <div className="absolute bottom-0 right-0 h-72 w-72 rounded-full bg-emerald-500 blur-3xl" />

        </div>

        <div className="container-custom relative">

          <div className="max-w-4xl">

            <div className="mb-6 inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/10 px-5 py-3 backdrop-blur">

              <Mail size={18} />

              <span className="font-semibold">
                24/7 Customer Support
              </span>

            </div>

            <h1 className="text-5xl font-black leading-tight md:text-7xl">

              Let’s Plan Your
              <span className="block text-green-400">
                Next Journey
              </span>

            </h1>

            <p className="mt-8 max-w-3xl text-xl leading-10 text-slate-300">

              Our experienced travel consultants are always available to assist you with Umrah packages, visa processing, international tickets and premium travel solutions.

            </p>

          </div>

        </div>

      </section>

      {/* =========================
         CONTENT
      ========================= */}
      <section className="py-24">

        <div className="container-custom grid gap-12 lg:grid-cols-2">

          {/* LEFT SIDE */}
          <div className="space-y-8">

            {/* ADDRESS */}
            <div className="rounded-[32px] border border-slate-100 bg-white p-8 shadow-sm">

              <div className="flex items-center gap-4">

                <div className="rounded-2xl bg-green-100 p-4 text-green-600">

                  <MapPin size={28} />

                </div>

                <div>

                  <h3 className="text-3xl font-black text-slate-900">
                    Office Address
                  </h3>

                  <p className="mt-2 text-slate-500">
                    Visit our office anytime
                  </p>

                </div>

              </div>

              <p className="mt-8 text-lg leading-9 text-slate-600">

                No. 3D Karaye Plaza,
                Opposite Ado Bayero Mall,
                Zoo Road, Kano State,
                Nigeria.

              </p>

            </div>

            {/* CONTACT */}
            <div className="rounded-[32px] border border-slate-100 bg-white p-8 shadow-sm">

              <div className="flex items-center gap-4">

                <div className="rounded-2xl bg-green-100 p-4 text-green-600">

                  <Phone size={28} />

                </div>

                <div>

                  <h3 className="text-3xl font-black text-slate-900">
                    Contact Details
                  </h3>

                  <p className="mt-2 text-slate-500">
                    Reach us directly
                  </p>

                </div>

              </div>

              <div className="mt-8 space-y-6">

                <div className="flex items-center gap-4 text-lg font-semibold text-slate-700">

                  <Phone
                    size={20}
                    className="text-green-600"
                  />

                  +2348155558069

                </div>

                <div className="flex items-center gap-4 text-lg font-semibold text-slate-700">

                  <Mail
                    size={20}
                    className="text-green-600"
                  />

                  zain.travelsng@gmail.com

                </div>

              </div>

            </div>

            {/* SOCIALS */}
            <div className="rounded-[32px] border border-slate-100 bg-white p-8 shadow-sm">

              <h3 className="text-3xl font-black text-slate-900">
                Follow Us
              </h3>

              <p className="mt-3 text-slate-500">
                Stay connected on social media
              </p>

              <div className="mt-8 flex flex-wrap gap-4">

                <a
                  href="https://wa.me/2348155558069"
                  target="_blank"
                  className="flex h-16 w-16 items-center justify-center rounded-2xl bg-green-500 text-white shadow-lg transition hover:-translate-y-1"
                >

                  <FaWhatsapp size={28} />

                </a>

                <a
                  href="#"
                  className="flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-600 text-white shadow-lg transition hover:-translate-y-1"
                >

                  <FaFacebookF size={24} />

                </a>

                <a
                  href="#"
                  className="flex h-16 w-16 items-center justify-center rounded-2xl bg-pink-500 text-white shadow-lg transition hover:-translate-y-1"
                >

                  <FaInstagram size={24} />

                </a>

                <a
                  href="#"
                  className="flex h-16 w-16 items-center justify-center rounded-2xl bg-black text-white shadow-lg transition hover:-translate-y-1"
                >

                  <FaTiktok size={24} />

                </a>

                <a
                  href="#"
                  className="flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-900 text-white shadow-lg transition hover:-translate-y-1"
                >

                  <FaXTwitter size={24} />

                </a>

              </div>

            </div>

          </div>

          {/* RIGHT SIDE */}
          <div className="rounded-[40px] border border-slate-100 bg-white p-10 shadow-[0_20px_80px_rgba(0,0,0,0.08)]">

            <div>

              <h3 className="text-5xl font-black text-slate-900">
                Send Message
              </h3>

              <p className="mt-4 text-lg leading-8 text-slate-500">

                Fill the form below and our support team will respond as soon as possible.

              </p>

            </div>

            {/* SUCCESS */}
            {success && (

              <div className="mt-8 flex items-center gap-3 rounded-2xl border border-green-200 bg-green-50 px-5 py-4 text-green-700">

                <CheckCircle2 size={22} />

                {success}

              </div>
            )}

            {/* ERROR */}
            {error && (

              <div className="mt-8 rounded-2xl border border-red-200 bg-red-50 px-5 py-4 text-red-700">

                {error}

              </div>
            )}

            {/* FORM */}
            <form
              onSubmit={handleSubmit}
              className="mt-10 space-y-6"
            >

              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Full Name"
                required
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-6 py-5 outline-none transition focus:border-green-600 focus:bg-white"
              />

              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email Address"
                required
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-6 py-5 outline-none transition focus:border-green-600 focus:bg-white"
              />

              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Phone Number"
                required
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-6 py-5 outline-none transition focus:border-green-600 focus:bg-white"
              />

              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                placeholder="Subject"
                required
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-6 py-5 outline-none transition focus:border-green-600 focus:bg-white"
              />

              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Write your message..."
                required
                className="min-h-[200px] w-full rounded-2xl border border-slate-200 bg-slate-50 px-6 py-5 outline-none transition focus:border-green-600 focus:bg-white"
              />

              <button
                type="submit"
                disabled={loading}
                className="flex w-full items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-green-600 to-emerald-700 py-5 text-lg font-bold text-white shadow-xl shadow-green-500/20 transition hover:scale-[1.01] disabled:opacity-50"
              >

                {loading ? (

                  <>
                    <Loader2
                      size={22}
                      className="animate-spin"
                    />

                    Sending Message...
                  </>

                ) : (

                  <>
                    <Send size={22} />

                    Send Message
                  </>
                )}

              </button>

            </form>

          </div>

        </div>

      </section>

      {/* FLOATING WHATSAPP */}
      <a
        href="https://wa.me/2348155558069"
        target="_blank"
        className="fixed bottom-6 right-6 z-50 flex h-16 w-16 items-center justify-center rounded-full bg-green-500 text-white shadow-[0_20px_50px_rgba(34,197,94,0.45)] transition hover:scale-110"
      >

        <FaWhatsapp size={32} />

      </a>

    </main>
  );
}