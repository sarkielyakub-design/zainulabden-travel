"use client";

import { useState } from "react";
import axios from "axios";
import {
  User,
  Mail,
  Phone,
  Globe,
  CreditCard,
  Plane,
  Shield,
  Loader2,
  CheckCircle,
} from "lucide-react";

const API = process.env.NEXT_PUBLIC_API_URL;

export default function FlightBookingPage() {
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    first_name: "",
    middle_name: "",
    last_name: "",

    email: "",
    phone: "",

    nationality: "",

    passport_number: "",
    passport_issue_date: "",
    passport_expiry_date: "",

    emergency_contact: "",

    adults: 1,

    travel_class: "ECONOMY",

    special_request: "",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const createBooking = async () => {
    try {
      setLoading(true);

      const response = await axios.post(
        `${API}/flight-bookings`,
        form
      );

      const booking = response.data;

      window.location.href =
        `/flights/payment`;
    } catch (error) {
      console.log(error);
      alert("Booking failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">

      {/* HEADER */}

      <div className="bg-gradient-to-r from-slate-900 via-blue-900 to-slate-900">

        <div className="mx-auto max-w-7xl px-6 py-10">

          <h1 className="text-4xl font-black text-white">
            Complete Your Booking
          </h1>

          <p className="mt-2 text-white/80">
            Passenger information and travel documents
          </p>

        </div>

      </div>

      <div className="mx-auto max-w-7xl p-6">

        <div className="grid gap-8 lg:grid-cols-3">

          {/* LEFT SIDE */}

          <div className="lg:col-span-2">

            {/* PROGRESS */}

            <div className="mb-8 flex items-center gap-4 rounded-3xl bg-white p-6 shadow-sm">

              <CheckCircle className="text-green-600" />

              <div className="h-1 flex-1 rounded bg-green-600" />

              <div className="h-1 flex-1 rounded bg-slate-200" />

              <div className="h-1 flex-1 rounded bg-slate-200" />

            </div>

            {/* PASSENGER DETAILS */}

            <div className="rounded-3xl bg-white p-8 shadow-sm">

              <div className="mb-8 flex items-center gap-3">

                <User className="text-green-600" />

                <h2 className="text-2xl font-black">
                  Passenger Information
                </h2>

              </div>

              <div className="grid gap-5 md:grid-cols-3">

                <input
                  name="first_name"
                  placeholder="First Name"
                  onChange={handleChange}
                  className="rounded-2xl border p-4"
                />

                <input
                  name="middle_name"
                  placeholder="Middle Name"
                  onChange={handleChange}
                  className="rounded-2xl border p-4"
                />

                <input
                  name="last_name"
                  placeholder="Surname"
                  onChange={handleChange}
                  className="rounded-2xl border p-4"
                />

              </div>

              <div className="mt-8 flex items-center gap-3">

                <Mail className="text-green-600" />

                <h2 className="text-2xl font-black">
                  Contact Details
                </h2>

              </div>

              <div className="mt-5 grid gap-5 md:grid-cols-2">

                <input
                  name="email"
                  placeholder="Email Address"
                  onChange={handleChange}
                  className="rounded-2xl border p-4"
                />

                <input
                  name="phone"
                  placeholder="Phone Number"
                  onChange={handleChange}
                  className="rounded-2xl border p-4"
                />

              </div>

              <div className="mt-8 flex items-center gap-3">

                <Globe className="text-green-600" />

                <h2 className="text-2xl font-black">
                  Nationality
                </h2>

              </div>

              <input
                name="nationality"
                placeholder="Nationality"
                onChange={handleChange}
                className="mt-5 w-full rounded-2xl border p-4"
              />

            </div>

            {/* PASSPORT */}

            <div className="mt-8 rounded-3xl bg-white p-8 shadow-sm">

              <div className="mb-8 flex items-center gap-3">

                <CreditCard className="text-green-600" />

                <h2 className="text-2xl font-black">
                  Passport Information
                </h2>

              </div>

              <div className="grid gap-5 md:grid-cols-3">

                <input
                  name="passport_number"
                  placeholder="Passport Number"
                  onChange={handleChange}
                  className="rounded-2xl border p-4"
                />

                <input
                  type="date"
                  name="passport_issue_date"
                  onChange={handleChange}
                  className="rounded-2xl border p-4"
                />

                <input
                  type="date"
                  name="passport_expiry_date"
                  onChange={handleChange}
                  className="rounded-2xl border p-4"
                />

              </div>

            </div>

            {/* EXTRA */}

            <div className="mt-8 rounded-3xl bg-white p-8 shadow-sm">

              <div className="mb-8 flex items-center gap-3">

                <Shield className="text-green-600" />

                <h2 className="text-2xl font-black">
                  Additional Information
                </h2>

              </div>

              <input
                name="emergency_contact"
                placeholder="Emergency Contact"
                onChange={handleChange}
                className="mb-5 w-full rounded-2xl border p-4"
              />

              <textarea
                name="special_request"
                placeholder="Special requests, meal preference, wheelchair assistance..."
                rows={4}
                onChange={handleChange}
                className="w-full rounded-2xl border p-4"
              />

            </div>

          </div>

          {/* RIGHT SIDE */}

          <div>

            <div className="sticky top-6 rounded-3xl bg-white p-8 shadow-sm">

              <div className="mb-6 flex items-center gap-3">

                <Plane className="text-green-600" />

                <h2 className="text-2xl font-black">
                  Flight Summary
                </h2>

              </div>

              <div className="space-y-5">

                <div>
                  <p className="text-sm text-slate-500">
                    Route
                  </p>

                  <p className="font-bold">
                    Kano (KAN) → Jeddah (JED)
                  </p>
                </div>

                <div>
                  <p className="text-sm text-slate-500">
                    Airline
                  </p>

                  <p className="font-bold">
                    Qatar Airways
                  </p>
                </div>

                <div>
                  <p className="text-sm text-slate-500">
                    Cabin Class
                  </p>

                  <p className="font-bold">
                    Economy
                  </p>
                </div>

                <div>
                  <p className="text-sm text-slate-500">
                    Passenger
                  </p>

                  <p className="font-bold">
                    1 Adult
                  </p>
                </div>

              </div>

              <div className="my-8 border-t" />

              <div>

                <p className="text-sm text-slate-500">
                  Total Amount
                </p>

                <h2 className="text-5xl font-black text-green-600">
                  $350
                </h2>

              </div>

              <button
                onClick={createBooking}
                disabled={loading}
                className="mt-8 flex h-16 w-full items-center justify-center rounded-2xl bg-gradient-to-r from-green-600 to-emerald-500 text-lg font-bold text-white shadow-lg"
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Creating Booking...
                  </>
                ) : (
                  "Continue To Payment"
                )}
              </button>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}