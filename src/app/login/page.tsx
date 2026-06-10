"use client";

import Link from "next/link";

import {
  useState,
} from "react";

import {
  useRouter,
} from "next/navigation";

import {
  Mail,
  Lock,
  ArrowRight,
  Eye,
  EyeOff,
  ShieldCheck,
} from "lucide-react";

export default function LoginPage() {

  const router = useRouter();

  const [loading, setLoading] =
    useState(false);

  const [showPassword,
    setShowPassword] =
    useState(false);

  const [formData, setFormData] =
    useState({
      email: "",
      password: "",
    });

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
     LOGIN
  ========================= */
  async function handleLogin(
    e: React.FormEvent
  ) {

    e.preventDefault();

    try {

      setLoading(true);

      // IMPORTANT:
      // Use CURRENT IP
      const res = await fetch(
        "https://zainulabden-backend-production.up.railway.app/api/v1/auth/login",
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
            "Login failed"
        );

        return;
      }

      // SAVE TOKEN
      localStorage.setItem(
        "token",
        data.access_token
      );

      localStorage.setItem(
        "user",
        JSON.stringify(
          data.user
        )
      );

      // ADMIN CHECK
      if (
        data.user.role ===
        "admin"
      ) {

        router.push("/admin");

      } else {

        router.push("/");
      }

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
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-green-50 via-white to-green-100 px-6">

      {/* BACKGROUND */}
      <div className="absolute inset-0">

        <div className="absolute left-[-120px] top-[-120px] h-[350px] w-[350px] rounded-full bg-green-300/20 blur-3xl" />

        <div className="absolute bottom-[-120px] right-[-120px] h-[420px] w-[420px] rounded-full bg-emerald-300/20 blur-3xl" />

      </div>

      {/* CARD */}
      <div className="relative z-10 w-full max-w-md overflow-hidden rounded-[40px] border border-white bg-white shadow-[0_20px_80px_rgba(15,23,42,0.12)]">

        {/* TOP */}
        <div className="bg-gradient-to-r from-green-600 to-emerald-700 px-10 py-12 text-white">

          <div className="mb-5 flex h-20 w-20 items-center justify-center rounded-3xl bg-white/10 backdrop-blur">

            <ShieldCheck size={40} />

          </div>

          <h1 className="text-5xl font-black">
            Welcome Back
          </h1>

          <p className="mt-4 text-lg text-green-100">

            Login to continue your luxury travel experience.

          </p>

        </div>

        {/* FORM */}
        <div className="p-10">

          <form
            onSubmit={handleLogin}
            className="space-y-6"
          >

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
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 py-5 pl-14 pr-5 outline-none transition focus:border-green-600 focus:bg-white"
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
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 py-5 pl-14 pr-14 outline-none transition focus:border-green-600 focus:bg-white"
                />

                {/* SHOW PASSWORD */}
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

            {/* LOGIN BUTTON */}
            <button
              type="submit"
              disabled={loading}
              className="flex h-16 w-full items-center justify-center gap-3 rounded-2xl bg-green-600 text-lg font-bold text-white shadow-lg shadow-green-500/20 transition hover:bg-green-700 disabled:opacity-50"
            >

              {loading ? (
                "Signing In..."
              ) : (
                <>
                  Login

                  <ArrowRight
                    size={22}
                  />
                </>
              )}

            </button>

          </form>

          {/* FOOTER */}
          <div className="mt-8 text-center text-slate-500">

            Don’t have an account?

            <Link
              href="/register"
              className="ml-2 font-bold text-green-600"
            >

              Create Account

            </Link>

          </div>

        </div>

      </div>

    </main>
  );
}