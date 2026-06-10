"use client";

import Link from "next/link";

import { useEffect, useState } from "react";

import {
  CheckCircle2,
  Loader2,
  ArrowRight,
  Receipt,
} from "lucide-react";

export default function PaymentSuccessPage() {

  const [loading, setLoading] =
    useState(true);

  const [success, setSuccess] =
    useState(false);

  const [reference, setReference] =
    useState("");

  useEffect(() => {

    async function verifyPayment() {

      try {

        const params =
          new URLSearchParams(
            window.location.search
          );

        const ref =
          params.get("reference");

        if (!ref) {
          throw new Error(
            "Missing payment reference"
          );
        }

        setReference(ref);

        const token =
          localStorage.getItem(
            "token"
          );

        const response =
          await fetch(
            `https://zainulabden-backend-production.up.railway.app/api/v1/bookings/verify/${ref}`,
            {
              headers: {
                Authorization:
                  `Bearer ${token}`,
              },
            }
          );

        const data =
          await response.json();

        console.log(data);

        if (!response.ok) {
          throw new Error(
            data.detail ||
              "Verification failed"
          );
        }

        setSuccess(true);

      } catch (error) {

        console.log(error);

      } finally {

        setLoading(false);
      }
    }

    verifyPayment();

  }, []);

  /* =========================
     LOADING
  ========================= */
  if (loading) {

    return (
      <div className="flex min-h-screen items-center justify-center bg-black text-white">

        <div className="text-center">

          <Loader2
            size={50}
            className="mx-auto animate-spin text-green-400"
          />

          <h2 className="mt-6 text-3xl font-black">
            Verifying Payment...
          </h2>

          <p className="mt-3 text-slate-400">
            Please wait while we confirm
            your payment.
          </p>

        </div>

      </div>
    );
  }

  /* =========================
     FAILED
  ========================= */
  if (!success) {

    return (
      <div className="flex min-h-screen items-center justify-center bg-black px-6 text-white">

        <div className="w-full max-w-xl rounded-[32px] border border-red-500/20 bg-red-500/10 p-10 text-center backdrop-blur">

          <h1 className="text-5xl font-black text-red-400">
            Payment Failed
          </h1>

          <p className="mt-5 text-lg text-slate-300">
            We could not verify your
            payment.
          </p>

          <Link
            href="/packages"
            className="mt-10 inline-flex items-center gap-2 rounded-2xl bg-red-500 px-6 py-4 font-bold text-white transition hover:bg-red-600"
          >

            Back To Packages

          </Link>

        </div>

      </div>
    );
  }

  /* =========================
     SUCCESS
  ========================= */
  return (
    <main className="flex min-h-screen items-center justify-center bg-gradient-to-br from-black via-slate-950 to-green-950 px-6 text-white">

      <div className="w-full max-w-2xl overflow-hidden rounded-[40px] border border-green-500/20 bg-white/5 p-12 shadow-[0_20px_80px_rgba(0,0,0,0.4)] backdrop-blur">

        {/* ICON */}
        <div className="mx-auto flex h-28 w-28 items-center justify-center rounded-full bg-green-500/20 text-green-400">

          <CheckCircle2 size={60} />

        </div>

        {/* TITLE */}
        <h1 className="mt-10 text-center text-5xl font-black">
          Payment Successful
        </h1>

        <p className="mt-5 text-center text-lg leading-8 text-slate-300">

          Your booking has been confirmed
          successfully.

          Our travel team will contact you
          shortly with complete package
          details and travel information.

        </p>

        {/* REFERENCE */}
        <div className="mt-10 rounded-3xl border border-white/10 bg-white/5 p-6">

          <div className="flex items-center gap-3">

            <Receipt
              size={24}
              className="text-green-400"
            />

            <div>

              <p className="text-sm text-slate-400">
                Payment Reference
              </p>

              <h3 className="mt-2 text-xl font-black text-green-400">
                {reference}
              </h3>

            </div>

          </div>

        </div>

        {/* BUTTONS */}
        <div className="mt-10 flex flex-col gap-4 sm:flex-row">

          <Link
            href="/dashboard"
            className="flex flex-1 items-center justify-center gap-2 rounded-2xl bg-green-500 px-6 py-5 text-lg font-bold text-black transition hover:bg-green-400"
          >

            Go To Dashboard

            <ArrowRight size={20} />

          </Link>

          <Link
            href="/"
            className="flex flex-1 items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-6 py-5 text-lg font-bold text-white transition hover:bg-white/10"
          >

            Back Home

          </Link>

        </div>

      </div>

    </main>
  );
}