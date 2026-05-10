"use client";

import { useState } from "react";

import { useParams } from "next/navigation";

import {
  ArrowRight,
  Plane,
} from "lucide-react";

import axios from "axios";

export default function TicketBookingPage() {

  const params = useParams();

  const [loading, setLoading] =
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

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement>
  ) {

    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    });
  }

  async function handleBooking() {

    try {

      setLoading(true);

      const token =
        localStorage.getItem(
          "token"
        );

      const response =
        await axios.post(
          `http://172.20.10.3:8000/api/v1/bookings/create-and-pay-ticket?ticket_id=${params.id}`,
          formData,
          {
            headers: {
              Authorization:
                `Bearer ${token}`,
            },
          }
        );

      console.log(response.data);

      // PAYSTACK REDIRECT
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

      <div className="container-custom max-w-5xl">

        <div className="overflow-hidden rounded-[40px] bg-white shadow-[0_20px_80px_rgba(0,0,0,0.08)]">

          {/* HEADER */}
          <div className="border-b bg-gradient-to-r from-green-600 to-emerald-700 px-10 py-10 text-white">

            <div className="flex items-center gap-4">

              <div className="rounded-2xl bg-white/10 p-4 backdrop-blur">

                <Plane size={32} />

              </div>

              <div>

                <h1 className="text-5xl font-black">
                  Ticket Booking
                </h1>

                <p className="mt-3 text-lg text-green-100">
                  Complete traveler information
                </p>

              </div>

            </div>

          </div>

          {/* FORM */}
          <div className="grid gap-6 p-10 md:grid-cols-2">

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

              <label className="mb-2 block text-sm font-semibold text-slate-600">
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

              <label className="mb-2 block text-sm font-semibold text-slate-600">
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

              <label className="mb-2 block text-sm font-semibold text-slate-600">
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

          {/* BUTTON */}
          <div className="border-t p-10">

            <button
              onClick={handleBooking}
              disabled={loading}
              className="flex w-full items-center justify-center gap-3 rounded-2xl bg-green-600 py-6 text-xl font-black text-white transition hover:bg-green-700"
            >

              {loading
                ? "Redirecting..."
                : "Continue To Payment"}

              <ArrowRight size={22} />

            </button>

          </div>

        </div>

      </div>

    </section>
  );
}