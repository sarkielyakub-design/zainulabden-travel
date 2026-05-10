"use client";

import {
  useState,
} from "react";

import {
  useRouter,
} from "next/navigation";

import {
  Plane,
  Hotel,
  CalendarDays,
  Globe2,
  Loader2,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";

import {
  createPackage,
} from "@/src/services/admin-package-service";

export default function CreatePackage() {

  const router = useRouter();

  const [loading, setLoading] =
    useState(false);

  /* =========================
     SUBMIT
  ========================= */
  async function handleSubmit(
    e: any
  ) {

    e.preventDefault();

    try {

      setLoading(true);

      const token =
        localStorage.getItem(
          "token"
        );

      const formData =
        new FormData(e.target);

      await createPackage(
        formData,
        token!
      );

      alert(
        "Package created successfully"
      );

      router.push(
        "/admin/packages"
      );

    } catch (err) {

      console.log(err);

      alert(
        "Package creation failed"
      );

    } finally {

      setLoading(false);
    }
  }

  return (
    <div className="mx-auto max-w-6xl rounded-[40px] bg-white p-10 shadow-xl">

      {/* HEADER */}
      <div className="mb-12">

        <div className="mb-5 flex h-20 w-20 items-center justify-center rounded-3xl bg-green-100 text-green-600">

          <Globe2 size={40} />

        </div>

        <h1 className="text-5xl font-black text-slate-900">
          Create Travel Package
        </h1>

        <p className="mt-4 text-lg text-slate-500">
          Create premium Umrah, Hajj and luxury travel packages
        </p>

      </div>

      {/* FORM */}
      <form
        onSubmit={handleSubmit}
        className="grid gap-6 md:grid-cols-2"
      >

        {/* TITLE */}
        <input
          name="title"
          placeholder="Package Title"
          className="rounded-2xl border p-5"
          required
        />

        {/* CATEGORY */}
        <select
          name="category"
          className="rounded-2xl border p-5"
          required
        >

          <option value="">
            Select Category
          </option>

          <option value="Umrah">
            Umrah
          </option>

          <option value="Hajj">
            Hajj
          </option>

          <option value="Dubai">
            Dubai
          </option>

          <option value="Turkey">
            Turkey
          </option>

          <option value="VIP">
            VIP
          </option>

        </select>

        {/* AIRLINE */}
        <select
          name="flight_name"
          className="rounded-2xl border p-5"
          required
        >

          <option value="">
            Select Airline
          </option>

          <option value="Air Peace">
            Air Peace
          </option>

          <option value="Max Air">
            Max Air
          </option>

          <option value="Saudi Airlines">
            Saudi Airlines
          </option>

          <option value="Qatar Airways">
            Qatar Airways
          </option>

          <option value="Turkish Airlines">
            Turkish Airlines
          </option>

          <option value="Emirates">
            Emirates
          </option>

        </select>

        {/* HOTEL */}
        <select
          name="hotel_name"
          className="rounded-2xl border p-5"
          required
        >

          <option value="">
            Select Hotel
          </option>

          <option value="Swissotel Makkah">
            Swissotel Makkah
          </option>

          <option value="Pullman Zamzam">
            Pullman Zamzam
          </option>

          <option value="Hilton Makkah">
            Hilton Makkah
          </option>

          <option value="Burj Al Arab">
            Burj Al Arab
          </option>

          <option value="Hilton Istanbul">
            Hilton Istanbul
          </option>

        </select>

        {/* FROM */}
        <select
          name="flight_from"
          className="rounded-2xl border p-5"
          required
        >

          <option value="">
            Departure Airport
          </option>

          <option value="Lagos (LOS)">
            Lagos (LOS)
          </option>

          <option value="Abuja (ABV)">
            Abuja (ABV)
          </option>

          <option value="Kano (KAN)">
            Kano (KAN)
          </option>

          <option value="Kaduna (KAD)">
            Kaduna (KAD)
          </option>

        </select>

        {/* TO */}
        <select
          name="flight_to"
          className="rounded-2xl border p-5"
          required
        >

          <option value="">
            Destination Airport
          </option>

          <option value="Jeddah (JED)">
            Jeddah (JED)
          </option>

          <option value="Madinah (MED)">
            Madinah (MED)
          </option>

          <option value="Dubai (DXB)">
            Dubai (DXB)
          </option>

          <option value="Istanbul (IST)">
            Istanbul (IST)
          </option>

          <option value="London Heathrow (LHR)">
            London Heathrow (LHR)
          </option>

        </select>

        {/* HOTEL RATING */}
        <select
          name="hotel_rating"
          className="rounded-2xl border p-5"
        >

          <option value="">
            Hotel Rating
          </option>

          <option value="3">
            3 Star
          </option>

          <option value="4">
            4 Star
          </option>

          <option value="5">
            5 Star
          </option>

        </select>

        {/* DEPARTURE */}
        <div className="flex items-center gap-3 rounded-2xl border p-5">

          <CalendarDays className="text-green-600" />

          <input
            name="departure_date"
            type="date"
            className="w-full outline-none"
            required
          />

        </div>

        {/* RETURN */}
        <div className="flex items-center gap-3 rounded-2xl border p-5">

          <CalendarDays className="text-green-600" />

          <input
            name="return_date"
            type="date"
            className="w-full outline-none"
          />

        </div>

        {/* DURATION */}
        <input
          name="duration_days"
          type="number"
          placeholder="Duration (Days)"
          className="rounded-2xl border p-5"
          required
        />

        {/* TOTAL SLOTS */}
        <input
          name="total_slots"
          type="number"
          placeholder="Total Slots"
          className="rounded-2xl border p-5"
          required
        />

        {/* PRICE */}
        <input
          name="price"
          type="number"
          placeholder="Package Price"
          className="rounded-2xl border p-5"
          required
        />

        {/* IMAGE */}
        <input
          name="image"
          placeholder="Image URL or upload path"
          className="rounded-2xl border p-5"
        />

        {/* DESCRIPTION */}
        <textarea
          name="description"
          placeholder="Package Description"
          className="min-h-[180px] rounded-2xl border p-5 md:col-span-2"
        />

        {/* BUTTON */}
        <button
          disabled={loading}
          className="flex items-center justify-center gap-3 rounded-2xl bg-green-600 py-5 text-lg font-bold text-white transition hover:bg-green-700 md:col-span-2"
        >

          {loading ? (
            <>
              <Loader2
                size={22}
                className="animate-spin"
              />

              Creating Package...
            </>
          ) : (
            <>
              Create Package

              <ArrowRight size={22} />
            </>
          )}

        </button>

      </form>

    </div>
  );
}