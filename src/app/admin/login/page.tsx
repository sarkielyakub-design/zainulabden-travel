"use client";

import { useState } from "react";

import { useRouter } from "next/navigation";

import {
  ShieldCheck,
  Mail,
  Lock,
  Loader2,
} from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  async function handleLogin(
    e: React.FormEvent
  ) {
    e.preventDefault();

    try {
      setLoading(true);
      setError("");

      const response = await fetch(
        "http://127.0.0.1:8000/api/v1/auth/login",
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify({
            email,
            password,
          }),
        }
      );

      const data =
        await response.json();

      if (!response.ok) {
        throw new Error(
          data.detail ||
            "Login failed"
        );
      }

      // SAVE TOKEN
      localStorage.setItem(
        "token",
        data.access_token
      );

      localStorage.setItem(
        "user",
        JSON.stringify(data.user)
      );

      // ADMIN CHECK
      if (!data.user.is_admin) {
        throw new Error(
          "Access denied"
        );
      }

      router.push(
        "/admin/dashboard"
      );

    } catch (err: any) {
      setError(err.message);

    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-100 via-white to-green-50 p-6">

      <div className="w-full max-w-md rounded-[32px] bg-white p-10 shadow-[0_20px_80px_rgba(0,0,0,0.08)]">

        {/* HEADER */}
        <div className="mb-10 text-center">

          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-green-100 text-green-700">

            <ShieldCheck size={40} />

          </div>

          <h1 className="mt-6 text-4xl font-black text-slate-900">
            Admin Login
          </h1>

          <p className="mt-3 text-slate-500">
            Secure access to dashboard
          </p>

        </div>

        {/* ERROR */}
        {error && (
          <div className="mb-6 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm font-medium text-red-600">

            {error}

          </div>
        )}

        {/* FORM */}
        <form
          onSubmit={handleLogin}
          className="space-y-6"
        >

          {/* EMAIL */}
          <div>

            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Email Address
            </label>

            <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4 focus-within:border-green-500">

              <Mail
                size={20}
                className="text-slate-400"
              />

              <input
                type="email"
                placeholder="admin@example.com"
                value={email}
                onChange={(e) =>
                  setEmail(
                    e.target.value
                  )
                }
                required
                className="w-full bg-transparent outline-none"
              />

            </div>

          </div>

          {/* PASSWORD */}
          <div>

            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Password
            </label>

            <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4 focus-within:border-green-500">

              <Lock
                size={20}
                className="text-slate-400"
              />

              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) =>
                  setPassword(
                    e.target.value
                  )
                }
                required
                className="w-full bg-transparent outline-none"
              />

            </div>

          </div>

          {/* BUTTON */}
          <button
            type="submit"
            disabled={loading}
            className="flex h-14 w-full items-center justify-center gap-3 rounded-2xl bg-green-600 text-lg font-bold text-white transition hover:bg-green-700 disabled:opacity-50"
          >

            {loading ? (
              <>
                <Loader2 className="animate-spin" />

                Signing In...
              </>
            ) : (
              "Login To Dashboard"
            )}

          </button>

        </form>

      </div>

    </div>
  );
}