"use client";

import Link from "next/link";

import { useState } from "react";

import { useRouter } from "next/navigation";

import {
  User,
  Mail,
  Lock,
  ArrowRight,
  Phone,
  ShieldCheck,
  Eye,
  EyeOff,
  MapPin,
  Globe,
  Loader2,
  CheckCircle2,
} from "lucide-react";

export default function RegisterPage() {

  const router = useRouter();

  const [loading, setLoading] =
    useState(false);

  const [showPassword,
    setShowPassword] =
    useState(false);

  const [formData, setFormData] =
    useState({
      name: "",
      email: "",
      phone: "",
      address: "",
      nationality: "",
      password: "",
    });

  /* =========================
     HANDLE CHANGE
  ========================= */
  function handleChange(
    e: React.ChangeEvent<HTMLInputElement>
  ) {

    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    });
  }

  /* =========================
     REGISTER
  ========================= */
  async function handleRegister(
    e: React.FormEvent
  ) {

    e.preventDefault();

    try {

      setLoading(true);

      const res = await fetch(
        "https://zainulabden-backend-production.up.railway.app/api/v1/auth/register",
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify(
            formData
          ),
        }
      );

      const data =
        await res.json();

      console.log(data);

      if (!res.ok) {

        alert(
          data.detail ||
            "Registration failed"
        );

        return;
      }

      alert(
        "Account created successfully"
      );

      router.push("/login");

    } catch (error) {

      console.log(error);

      alert(
        "Something went wrong"
      );

    } finally {

      setLoading(false);
    }
  }

  return (
    <main className="relative flex min-h-screen overflow-hidden bg-[#020617]">

      {/* =========================
         LEFT SIDE
      ========================= */}
      <section className="relative hidden w-1/2 overflow-hidden lg:flex">

        {/* BG */}
        <div className="absolute inset-0 bg-gradient-to-br from-green-600 via-emerald-700 to-teal-900" />

        {/* EFFECT */}
        <div className="absolute left-[-120px] top-[-120px] h-[420px] w-[420px] rounded-full bg-white/10 blur-3xl" />

        <div className="absolute bottom-[-120px] right-[-120px] h-[420px] w-[420px] rounded-full bg-black/20 blur-3xl" />

        {/* CONTENT */}
        <div className="relative z-10 flex flex-col justify-between p-16 text-white">

          {/* LOGO */}
          <div className="flex items-center gap-4">

            <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-white/10 backdrop-blur">

              <img
                src="/logo.png"
                alt="logo"
                className="h-14"
              />

            </div>

            <div>

              <h1 className="text-3xl font-black">
                ZAIN
              </h1>

              <p className="text-green-100">
                Travel & Tours
              </p>

            </div>

          </div>

          {/* HERO */}
          <div>

            <div className="mb-8 inline-flex items-center gap-3 rounded-full bg-white/10 px-5 py-3 backdrop-blur">

              <ShieldCheck size={22} />

              <span className="font-semibold">
                Trusted Travel Platform
              </span>

            </div>

            <h2 className="max-w-xl text-6xl font-black leading-tight">

              Your Premium
              Travel Experience
              Starts Here.

            </h2>

            <p className="mt-8 max-w-xl text-xl leading-9 text-green-100">

              Book flights, Umrah packages,
              visa services and international
              travel with confidence.

            </p>

            {/* FEATURES */}
            <div className="mt-12 grid gap-5">

              <div className="flex items-center gap-4">

                <CheckCircle2
                  size={24}
                  className="text-green-200"
                />

                <span className="text-lg">
                  Secure Online Booking
                </span>

              </div>

              <div className="flex items-center gap-4">

                <CheckCircle2
                  size={24}
                  className="text-green-200"
                />

                <span className="text-lg">
                  Instant Ticket Processing
                </span>

              </div>

              <div className="flex items-center gap-4">

                <CheckCircle2
                  size={24}
                  className="text-green-200"
                />

                <span className="text-lg">
                  24/7 Customer Support
                </span>

              </div>

            </div>

          </div>

          {/* FOOTER */}
          <div className="text-sm text-green-100">

            ©️ 2026 ZAIN Travel & Tours

          </div>

        </div>

      </section>

      {/* =========================
         RIGHT SIDE
      ========================= */}
      <section className="relative flex w-full items-center justify-center px-6 py-16 lg:w-1/2">

        {/* BG EFFECT */}
        <div className="absolute left-10 top-10 h-72 w-72 rounded-full bg-green-500/10 blur-3xl" />

        <div className="absolute bottom-10 right-10 h-72 w-72 rounded-full bg-emerald-500/10 blur-3xl" />

        {/* CARD */}
        <div className="relative z-10 w-full max-w-2xl rounded-[40px] border border-white/10 bg-white p-10 shadow-[0_20px_80px_rgba(0,0,0,0.2)]">

          {/* MOBILE LOGO */}
          <div className="mb-10 flex items-center gap-4 lg:hidden">

            <img
              src="/logo.png"
              alt="logo"
              className="h-14"
            />

            <div>

              <h1 className="text-2xl font-black text-slate-900">
                ZAIN
              </h1>

              <p className="text-sm text-slate-500">
                Travel & Tours
              </p>

            </div>

          </div>

          {/* TITLE */}
          <div>

            <h2 className="text-5xl font-black text-slate-900">
              Create Account
            </h2>

            <p className="mt-4 text-lg text-slate-500">

              Register and access our
              premium travel services.

            </p>

          </div>

          {/* FORM */}
          <form
            onSubmit={handleRegister}
            className="mt-10 space-y-6"
          >

            {/* NAME */}
            <div>

              <label className="mb-3 block text-sm font-bold text-slate-700">

                Full Name

              </label>

              <div className="relative">

                <User className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400" />

                <input
                  type="text"
                  name="name"
                  placeholder="Enter full name"
                  onChange={handleChange}
                  required
                  className="h-16 w-full rounded-2xl border border-slate-200 bg-slate-50 pl-14 pr-5 outline-none transition focus:border-green-600 focus:bg-white"
                />

              </div>

            </div>

            {/* EMAIL */}
            <div>

              <label className="mb-3 block text-sm font-bold text-slate-700">

                Email Address

              </label>

              <div className="relative">

                <Mail className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400" />

                <input
                  type="email"
                  name="email"
                  placeholder="you@example.com"
                  onChange={handleChange}
                  required
                  className="h-16 w-full rounded-2xl border border-slate-200 bg-slate-50 pl-14 pr-5 outline-none transition focus:border-green-600 focus:bg-white"
                />

              </div>

            </div>

            {/* GRID */}
            <div className="grid gap-6 md:grid-cols-2">

              {/* PHONE */}
              <div>

                <label className="mb-3 block text-sm font-bold text-slate-700">

                  Phone Number

                </label>

                <div className="relative">

                  <Phone className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400" />

                  <input
                    type="text"
                    name="phone"
                    placeholder="+234..."
                    onChange={handleChange}
                    required
                    className="h-16 w-full rounded-2xl border border-slate-200 bg-slate-50 pl-14 pr-5 outline-none transition focus:border-green-600 focus:bg-white"
                  />

                </div>

              </div>

              {/* NATIONALITY */}
              <div>

                <label className="mb-3 block text-sm font-bold text-slate-700">

                  Nationality

                </label>

                <div className="relative">

                  <Globe className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400" />

                  <input
                    type="text"
                    name="nationality"
                    placeholder="Nigeria"
                    onChange={handleChange}
                    required
                    className="h-16 w-full rounded-2xl border border-slate-200 bg-slate-50 pl-14 pr-5 outline-none transition focus:border-green-600 focus:bg-white"
                  />

                </div>

              </div>

            </div>

            {/* ADDRESS */}
            <div>

              <label className="mb-3 block text-sm font-bold text-slate-700">

                Home Address

              </label>

              <div className="relative">

                <MapPin className="absolute left-5 top-6 text-slate-400" />

                <textarea
                  name="address"
                  placeholder="Enter full address"
                  onChange={(e: any) =>
                    setFormData({
                      ...formData,
                      address:
                        e.target.value,
                    })
                  }
                  required
                  className="min-h-[130px] w-full rounded-2xl border border-slate-200 bg-slate-50 pl-14 pr-5 pt-5 outline-none transition focus:border-green-600 focus:bg-white"
                />

              </div>

            </div>

            {/* PASSWORD */}
            <div>

              <label className="mb-3 block text-sm font-bold text-slate-700">

                Password

              </label>

              <div className="relative">

                <Lock className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400" />

                <input
                  type={
                    showPassword
                      ? "text"
                      : "password"
                  }
                  name="password"
                  placeholder="••••••••"
                  onChange={handleChange}
                  required
                  className="h-16 w-full rounded-2xl border border-slate-200 bg-slate-50 pl-14 pr-14 outline-none transition focus:border-green-600 focus:bg-white"
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowPassword(
                      !showPassword
                    )
                  }
                  className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-500"
                >

                  {showPassword ? (
                    <EyeOff size={20} />
                  ) : (
                    <Eye size={20} />
                  )}

                </button>

              </div>

            </div>

            {/* BUTTON */}
            <button
              type="submit"
              disabled={loading}
              className="flex h-16 w-full items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-green-600 to-emerald-700 text-lg font-bold text-white shadow-[0_20px_50px_rgba(34,197,94,0.3)] transition hover:scale-[1.01] hover:from-green-700 hover:to-emerald-800 disabled:opacity-50"
            >

              {loading ? (
                <>
                  <Loader2
                    size={22}
                    className="animate-spin"
                  />

                  Creating Account...
                </>
              ) : (
                <>
                  Create Account

                  <ArrowRight
                    size={22}
                  />
                </>
              )}

            </button>

          </form>

          {/* FOOTER */}
          <div className="mt-8 text-center text-slate-500">

            Already have an account?

            <Link
              href="/login"
              className="ml-2 font-bold text-green-600 hover:text-green-700"
            >

              Login

            </Link>

          </div>

        </div>

      </section>

    </main>
  );
}