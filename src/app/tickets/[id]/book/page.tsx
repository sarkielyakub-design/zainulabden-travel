"use client";

import {
  useState,
} from "react";

import { useParams } from "next/navigation";

import {
  ArrowRight,
  Plane,
  ShieldCheck,
  CheckCircle2,
} from "lucide-react";

import axios from "axios";

export default function TicketBookingPage() {

  const params = useParams();

  const [loading, setLoading] =
    useState(false);

  const [acceptedTerms,
    setAcceptedTerms] =
    useState(false);

  const [formData, setFormData] =
    useState({
      surname: "",
      first_name: "",
      given_names: "",

      nationality: "",

      email: "",
      phone: "",

      passport_number: "",

      place_of_birth: "",

      date_of_birth: "",

      passport_issue: "",

      passport_expiry: "",
    });

  /* =========================
     FORM CHANGE
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
     BOOKING
  ========================= */
  async function handleBooking() {

    if (!acceptedTerms) {

      alert(
        "Please accept terms and conditions"
      );

      return;
    }

    try {

      setLoading(true);

      const token =
        localStorage.getItem(
          "token"
        );

      const response =
        await axios.post(
          `https://zainulabden-backend-production.up.railway.app/api/v1/bookings/create-and-pay-ticket?ticket_id=${params.id}`,
          formData,
          {
            headers: {
              Authorization:
                `Bearer ${token}`,
            },
          }
        );

      console.log(response.data);

      // PAYSTACK
      window.location.href =
        response.data.authorization_url;

    } catch (error) {

      console.log(error);

      alert(
        "Booking failed"
      );

    } finally {

      setLoading(false);
    }
  }

  return (
    <section className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-green-50 py-20">

      <div className="container-custom max-w-6xl">

        <div className="overflow-hidden rounded-[40px] bg-white shadow-[0_20px_80px_rgba(0,0,0,0.08)]">

          {/* HEADER */}
          <div className="relative overflow-hidden bg-gradient-to-r from-green-600 to-emerald-700 px-10 py-12 text-white">

            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=1600&auto=format&fit=crop')] bg-cover bg-center opacity-10" />

            <div className="relative flex items-center gap-5">

              <div className="rounded-3xl bg-white/10 p-5 backdrop-blur">

                <Plane size={40} />

              </div>

              <div>

                <h1 className="text-5xl font-black">
                  Ticket Booking
                </h1>

                <p className="mt-3 text-lg text-green-100">

                  Complete traveler information for your flight reservation.

                </p>

              </div>

            </div>

          </div>

          {/* FORM */}
          <div className="grid gap-10 p-10 lg:grid-cols-3">

            {/* LEFT FORM */}
            <div className="space-y-6 lg:col-span-2">

              {/* TITLE */}
              <div>

                <h2 className="text-3xl font-black text-slate-900">
                  Traveler Information
                </h2>

                <p className="mt-2 text-slate-500">
                  Please provide accurate passport details.
                </p>

              </div>

              {/* FORM GRID */}
              <div className="grid gap-6 md:grid-cols-2">

                {/* NAMES */}
                <input
                  name="surname"
                  placeholder="Surname"
                  onChange={handleChange}
                  className="rounded-2xl border border-slate-200 p-5 outline-none focus:border-green-500"
                />

                <input
                  name="first_name"
                  placeholder="First Name"
                  onChange={handleChange}
                  className="rounded-2xl border border-slate-200 p-5 outline-none focus:border-green-500"
                />

                <input
                  name="given_names"
                  placeholder="Given Names"
                  onChange={handleChange}
                  className="rounded-2xl border border-slate-200 p-5 outline-none focus:border-green-500 md:col-span-2"
                />

                {/* CONTACT */}
                <input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  onChange={handleChange}
                  className="rounded-2xl border border-slate-200 p-5 outline-none focus:border-green-500"
                />

                <input
                  name="phone"
                  placeholder="Phone Number"
                  onChange={handleChange}
                  className="rounded-2xl border border-slate-200 p-5 outline-none focus:border-green-500"
                />

                {/* PASSPORT */}
                <input
                  name="passport_number"
                  placeholder="Passport Number"
                  onChange={handleChange}
                  className="rounded-2xl border border-slate-200 p-5 outline-none focus:border-green-500"
                />

                <input
                  name="nationality"
                  placeholder="Nationality"
                  onChange={handleChange}
                  className="rounded-2xl border border-slate-200 p-5 outline-none focus:border-green-500"
                />

                <input
                  name="place_of_birth"
                  placeholder="Place Of Birth"
                  onChange={handleChange}
                  className="rounded-2xl border border-slate-200 p-5 outline-none focus:border-green-500 md:col-span-2"
                />

                {/* DATES */}
                <div>

                  <label className="mb-2 block text-sm font-bold text-slate-600">

                    Date Of Birth

                  </label>

                  <input
                    type="date"
                    name="date_of_birth"
                    onChange={handleChange}
                    className="w-full rounded-2xl border border-slate-200 p-5 outline-none focus:border-green-500"
                  />

                </div>

                <div>

                  <label className="mb-2 block text-sm font-bold text-slate-600">

                    Passport Issue Date

                  </label>

                  <input
                    type="date"
                    name="passport_issue"
                    onChange={handleChange}
                    className="w-full rounded-2xl border border-slate-200 p-5 outline-none focus:border-green-500"
                  />

                </div>

                <div className="md:col-span-2">

                  <label className="mb-2 block text-sm font-bold text-slate-600">

                    Passport Expiry Date

                  </label>

                  <input
                    type="date"
                    name="passport_expiry"
                    onChange={handleChange}
                    className="w-full rounded-2xl border border-slate-200 p-5 outline-none focus:border-green-500"
                  />

                </div>

              </div>

            </div>

            {/* RIGHT PANEL */}
            <div>

              <div className="sticky top-10 rounded-[32px] border border-green-100 bg-gradient-to-br from-green-50 to-white p-8 shadow-sm">

                <h3 className="text-3xl font-black text-slate-900">
                  Booking Protection
                </h3>

                <div className="mt-8 space-y-5">

                  {[
                    "Secure Payment",
                    "Verified Booking",
                    "Premium Support",
                    "Instant Confirmation",
                  ].map((item) => (

                    <div
                      key={item}
                      className="flex items-center gap-3"
                    >

                      <CheckCircle2
                        size={18}
                        className="text-green-600"
                      />

                      <span className="font-medium text-slate-700">

                        {item}

                      </span>

                    </div>
                  ))}

                </div>

                {/* TERMS */}
                <div className="mt-10 rounded-2xl border border-green-200 bg-white p-5">

                  <label className="flex items-start gap-3">

                    <input
                      type="checkbox"
                      checked={acceptedTerms}
                      onChange={(e) =>
                        setAcceptedTerms(
                          e.target.checked
                        )
                      }
                      className="mt-1 h-5 w-5 accent-green-600"
                    />

                    <span className="text-sm leading-7 text-slate-600">

                      I agree to the terms and conditions,
                      privacy policy and travel booking
                      agreement.

                    </span>

                  </label>

                </div>

                {/* SECURITY */}
                <div className="mt-6 flex items-center gap-3 rounded-2xl bg-green-100 px-5 py-4 text-green-700">

                  <ShieldCheck size={20} />

                  <span className="font-bold">
                    Secure & Encrypted Payment
                  </span>

                </div>

                {/* BUTTON */}
                <button
                  onClick={handleBooking}
                  disabled={
                    loading
                  }
                  className="mt-8 flex w-full items-center justify-center gap-3 rounded-2xl bg-green-600 py-5 text-lg font-black text-white shadow-lg shadow-green-500/20 transition hover:bg-green-700 disabled:opacity-50"
                >

                  {loading ? (
                    "Redirecting..."
                  ) : (
                    <>
                      Continue To Payment

                      <ArrowRight
                        size={22}
                      />
                    </>
                  )}

                </button>

              </div>

            </div>

          </div>

        </div>

      </div>

    </section>
  );
}