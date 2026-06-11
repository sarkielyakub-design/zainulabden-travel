"use client";

import { useState } from "react";

import axios from "axios";

import {
  User,
  Globe,
  CreditCard,
  Plane,
} from "lucide-react";

const API =
  process.env.NEXT_PUBLIC_API_URL;

export default function FlightBookingPage() {
  const [loading, setLoading] =
    useState(false);

  const [form, setForm] =
    useState({
      first_name: "",
      middle_name: "",
      last_name: "",

      email: "",
      phone: "",

      nationality: "",

      passport_number: "",
      passport_issue_date: "",
      passport_expiry_date: "",

      adults: 1,

      travel_class:
        "ECONOMY",
    });

  const handleChange = (
    e: any
  ) => {
    setForm({
      ...form,
      [e.target.name]:
        e.target.value,
    });
  };

  const createBooking =
    async () => {
      try {
        setLoading(true);

        const response =
          await axios.post(
            `${API}/flight-bookings`,
            form
          );

        const booking =
          response.data;

        window.location.href =
          `/flights/payment/${booking.id}`;
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

  return (
    <div className="mx-auto max-w-5xl p-6">

      <div className="mb-8">

        <h1 className="text-4xl font-black">
          Passenger Details
        </h1>

        <p className="mt-2 text-slate-500">
          Enter traveler information
        </p>

      </div>

      <div className="rounded-3xl bg-white p-8 shadow-lg">

        <div className="grid gap-5 md:grid-cols-3">

          <input
            name="first_name"
            placeholder="First Name"
            onChange={
              handleChange
            }
            className="rounded-xl border p-4"
          />

          <input
            name="middle_name"
            placeholder="Middle Name"
            onChange={
              handleChange
            }
            className="rounded-xl border p-4"
          />

          <input
            name="last_name"
            placeholder="Surname"
            onChange={
              handleChange
            }
            className="rounded-xl border p-4"
          />

        </div>

        <div className="mt-5 grid gap-5 md:grid-cols-2">

          <input
            name="email"
            placeholder="Email"
            onChange={
              handleChange
            }
            className="rounded-xl border p-4"
          />

          <input
            name="phone"
            placeholder="Phone Number"
            onChange={
              handleChange
            }
            className="rounded-xl border p-4"
          />

        </div>

        <div className="mt-5">

          <input
            name="nationality"
            placeholder="Nationality"
            onChange={
              handleChange
            }
            className="w-full rounded-xl border p-4"
          />

        </div>

        <h3 className="mt-10 mb-4 text-xl font-bold">
          Passport Details
        </h3>

        <div className="grid gap-5 md:grid-cols-3">

          <input
            name="passport_number"
            placeholder="Passport Number"
            onChange={
              handleChange
            }
            className="rounded-xl border p-4"
          />

          <input
            type="date"
            name="passport_issue_date"
            onChange={
              handleChange
            }
            className="rounded-xl border p-4"
          />

          <input
            type="date"
            name="passport_expiry_date"
            onChange={
              handleChange
            }
            className="rounded-xl border p-4"
          />

        </div>

        <button
          onClick={
            createBooking
          }
          disabled={loading}
          className="mt-8 w-full rounded-xl bg-green-600 py-4 font-bold text-white"
        >
          {loading
            ? "Creating Booking..."
            : "Continue To Payment"}
        </button>

      </div>

    </div>
  );
}