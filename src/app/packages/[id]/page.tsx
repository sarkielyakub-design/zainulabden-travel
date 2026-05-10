"use client";

import Image from "next/image";

import {
  useEffect,
  useState,
} from "react";

import {
  useParams,
  useRouter,
} from "next/navigation";

import {
  Plane,
  Hotel,
  CalendarDays,
  Users,
  ArrowRight,
  Clock3,
  ShieldCheck,
  CheckCircle2,
} from "lucide-react";

interface PackageType {
  id: number;

  title: string;

  description: string;

  price: number;

  flight_name: string;

  flight_from: string;

  flight_to: string;

  departure_date: string;

  return_date: string;

  hotel_name: string;

  hotel_rating: string;

  category: string;

  duration_days: number;

  total_slots: number;

  booked_slots: number;

  image_url: string;
}

export default function PackageDetailsPage() {

  const params = useParams();

  const router = useRouter();

  const [pkg, setPkg] =
    useState<PackageType | null>(
      null
    );

  const [loading, setLoading] =
    useState(true);

  const [bookingLoading,
    setBookingLoading] =
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
     FETCH PACKAGE
  ========================= */
  useEffect(() => {

    async function fetchPackage() {

      try {

        const res = await fetch(
          `http://172.20.10.3:8000/api/v1/packages/${params.id}`
        );

        const data =
          await res.json();

        setPkg(data);

      } catch (error) {

        console.log(error);

      } finally {

        setLoading(false);
      }
    }

    fetchPackage();

  }, [params.id]);

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

    try {

      setBookingLoading(true);

      const token =
        localStorage.getItem(
          "token"
        );

      if (!token) {

        alert(
          "Please login first"
        );

        router.push("/login");

        return;
      }

      const res = await fetch(
        `http://172.20.10.3:8000/api/v1/bookings/create-and-pay?package_id=${pkg?.id}`,
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",

            Authorization:
              `Bearer ${token}`,
          },

          body: JSON.stringify(
            formData
          ),
        }
      );

      const data =
        await res.json();

      if (!res.ok) {

        alert(
          data.detail ||
            "Booking failed"
        );

        return;
      }

      // PAYSTACK
      window.location.href =
        data.authorization_url;

    } catch (error) {

      console.log(error);

      alert(
        "Something went wrong"
      );

    } finally {

      setBookingLoading(false);
    }
  }

  /* =========================
     LOADING
  ========================= */
  if (loading) {

    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">

        <h2 className="text-3xl font-black">
          Loading Package...
        </h2>

      </div>
    );
  }

  /* =========================
     NOT FOUND
  ========================= */
  if (!pkg) {

    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">

        <h2 className="text-4xl font-black text-red-500">
          Package not found
        </h2>

      </div>
    );
  }

  const spotsLeft =
    pkg.total_slots -
    pkg.booked_slots;

  const progress =
    (pkg.booked_slots /
      pkg.total_slots) *
    100;

  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-slate-50">

      {/* HERO */}
      <section className="relative h-[500px] overflow-hidden">

        <Image
          src={
            pkg.image_url ||
            "https://images.unsplash.com/photo-1564769625905-50e93615e769?q=80&w=1600&auto=format&fit=crop"
          }
          alt={pkg.title}
          fill
          priority
          unoptimized
          className="object-cover"
        />

        {/* OVERLAY */}
        <div className="absolute inset-0 bg-black/60" />

        {/* CONTENT */}
        <div className="absolute bottom-10 left-0 right-0 mx-auto max-w-7xl px-6">

          <div className="mb-5 inline-flex rounded-full bg-green-600 px-5 py-2 text-sm font-bold uppercase tracking-wider text-white">

            {pkg.category}

          </div>

          <h1 className="max-w-4xl text-5xl font-black leading-tight text-white md:text-7xl">

            {pkg.title}

          </h1>

          <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-200">

            {pkg.description}

          </p>

        </div>

      </section>

      {/* CONTENT */}
      <section className="container-custom grid gap-10 py-20 lg:grid-cols-3">

        {/* LEFT */}
        <div className="space-y-8 lg:col-span-2">

          {/* FLIGHT */}
          <div className="rounded-[32px] bg-white p-8 shadow-sm">

            <div className="flex items-start gap-5">

              <div className="rounded-2xl bg-green-100 p-4 text-green-600">

                <Plane size={30} />

              </div>

              <div>

                <p className="text-sm font-bold uppercase tracking-widest text-slate-500">

                  Flight Information

                </p>

                <h2 className="mt-2 text-3xl font-black text-slate-900">

                  {pkg.flight_name}

                </h2>

                <p className="mt-3 text-lg text-slate-600">

                  {pkg.flight_from}
                  {" → "}
                  {pkg.flight_to}

                </p>

              </div>

            </div>

          </div>

          {/* HOTEL */}
          <div className="rounded-[32px] bg-white p-8 shadow-sm">

            <div className="flex items-start gap-5">

              <div className="rounded-2xl bg-green-100 p-4 text-green-600">

                <Hotel size={30} />

              </div>

              <div>

                <p className="text-sm font-bold uppercase tracking-widest text-slate-500">

                  Hotel Information

                </p>

                <h2 className="mt-2 text-3xl font-black text-slate-900">

                  {pkg.hotel_name}

                </h2>

                <p className="mt-3 text-lg text-slate-600">

                  ⭐ {pkg.hotel_rating} Star Hotel

                </p>

              </div>

            </div>

          </div>

          {/* DATES */}
          <div className="grid gap-6 md:grid-cols-2">

            <div className="rounded-[32px] bg-white p-8 shadow-sm">

              <div className="flex items-center gap-3 text-green-600">

                <CalendarDays size={22} />

                <span className="font-bold uppercase tracking-widest">

                  Departure

                </span>

              </div>

              <h3 className="mt-5 text-3xl font-black text-slate-900">

                {pkg.departure_date}

              </h3>

            </div>

            <div className="rounded-[32px] bg-white p-8 shadow-sm">

              <div className="flex items-center gap-3 text-green-600">

                <CalendarDays size={22} />

                <span className="font-bold uppercase tracking-widest">

                  Return

                </span>

              </div>

              <h3 className="mt-5 text-3xl font-black text-slate-900">

                {pkg.return_date}

              </h3>

            </div>

          </div>

        </div>

        {/* RIGHT */}
        <div>

          <div className="sticky top-10 rounded-[40px] border border-green-100 bg-white p-8 shadow-[0_20px_80px_rgba(15,23,42,0.08)]">

            {/* PRICE */}
            <div>

              <p className="text-sm font-bold uppercase tracking-widest text-slate-500">

                Starting From

              </p>

              <h2 className="mt-4 text-5xl font-black text-green-600">

                ₦
                {pkg.price.toLocaleString()}

              </h2>

            </div>

            {/* STATS */}
            <div className="mt-10 space-y-5">

              {/* DURATION */}
              <div className="flex items-center justify-between rounded-2xl bg-slate-50 p-5">

                <div className="flex items-center gap-3">

                  <Clock3 className="text-green-600" />

                  <span className="font-semibold">
                    Duration
                  </span>

                </div>

                <h3 className="text-2xl font-black text-slate-900">

                  {pkg.duration_days}
                  {" "}
                  Days

                </h3>

              </div>

              {/* SLOTS */}
              <div className="rounded-2xl border border-green-200 bg-green-50 p-5">

                <div className="mb-4 flex items-center justify-between">

                  <div className="flex items-center gap-3">

                    <Users className="text-green-600" />

                    <span className="font-bold text-green-700">

                      {spotsLeft}
                      {" "}
                      spots left

                    </span>

                  </div>

                  <span className="text-sm text-slate-500">

                    {pkg.booked_slots}
                    {" "}
                    booked

                  </span>

                </div>

                {/* PROGRESS */}
                <div className="h-3 overflow-hidden rounded-full bg-slate-200">

                  <div
                    className="h-full rounded-full bg-green-600 transition-all duration-700"
                    style={{
                      width:
                        `${progress}%`,
                    }}
                  />

                </div>

              </div>

            </div>

            {/* FORM */}
            <div className="mt-10 space-y-5">

              {/* PERSONAL */}
              <input
                type="text"
                name="surname"
                placeholder="Surname"
                onChange={handleChange}
                className="w-full rounded-2xl border border-slate-200 p-5 outline-none focus:border-green-600"
              />

              <input
                type="text"
                name="first_name"
                placeholder="First Name"
                onChange={handleChange}
                className="w-full rounded-2xl border border-slate-200 p-5 outline-none focus:border-green-600"
              />

              <input
                type="text"
                name="given_names"
                placeholder="Given Names"
                onChange={handleChange}
                className="w-full rounded-2xl border border-slate-200 p-5 outline-none focus:border-green-600"
              />

              {/* CONTACT */}
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                onChange={handleChange}
                className="w-full rounded-2xl border border-slate-200 p-5 outline-none focus:border-green-600"
              />

              <input
                type="text"
                name="phone"
                placeholder="Phone Number"
                onChange={handleChange}
                className="w-full rounded-2xl border border-slate-200 p-5 outline-none focus:border-green-600"
              />

              {/* PASSPORT */}
              <input
                type="text"
                name="passport_number"
                placeholder="Passport Number"
                onChange={handleChange}
                className="w-full rounded-2xl border border-slate-200 p-5 outline-none focus:border-green-600"
              />

              <input
                type="text"
                name="nationality"
                placeholder="Nationality"
                onChange={handleChange}
                className="w-full rounded-2xl border border-slate-200 p-5 outline-none focus:border-green-600"
              />

              <input
                type="text"
                name="place_of_birth"
                placeholder="Place Of Birth"
                onChange={handleChange}
                className="w-full rounded-2xl border border-slate-200 p-5 outline-none focus:border-green-600"
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
                  className="w-full rounded-2xl border border-slate-200 p-5 outline-none focus:border-green-600"
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
                  className="w-full rounded-2xl border border-slate-200 p-5 outline-none focus:border-green-600"
                />

              </div>

              <div>

                <label className="mb-2 block text-sm font-bold text-slate-600">

                  Passport Expiry Date

                </label>

                <input
                  type="date"
                  name="passport_expiry"
                  onChange={handleChange}
                  className="w-full rounded-2xl border border-slate-200 p-5 outline-none focus:border-green-600"
                />

              </div>

              {/* BUTTON */}
              <button
                onClick={handleBooking}
                disabled={bookingLoading}
                className="mt-6 flex w-full items-center justify-center gap-3 rounded-2xl bg-green-600 px-6 py-5 text-lg font-bold text-white shadow-lg shadow-green-500/20 transition hover:bg-green-700 disabled:opacity-50"
              >

                {bookingLoading ? (
                  "Redirecting..."
                ) : (
                  <>
                    Continue To Payment

                    <ArrowRight
                      size={20}
                    />
                  </>
                )}

              </button>

              {/* TRUST */}
              <div className="flex items-center justify-center gap-2 text-sm text-slate-500">

                <CheckCircle2
                  size={16}
                  className="text-green-600"
                />

                Secure Payment Protected

              </div>

            </div>

          </div>

        </div>

      </section>

    </main>
  );
}