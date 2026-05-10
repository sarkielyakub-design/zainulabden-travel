"use client";

import {
  useState,
} from "react";

import {
  useRouter,
} from "next/navigation";

import {
  Plane,
  CalendarDays,
  Loader2,
  ArrowRight,
} from "lucide-react";

import {
  createTicket,
} from "@/src/services/ticket-service";

export default function CreateTicketPage() {

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

      const payload = {

        airline:
          e.target.airline.value,

        from_airport:
          e.target.from_airport.value,

        to_airport:
          e.target.to_airport.value,

        departure_date:
          e.target.departure_date.value,

        return_date:
          e.target.return_date.value,

        price: Number(
          e.target.price.value
        ),

        seat_class:
          e.target.seat_class.value,

        description:
          e.target.description.value,

        image:
          e.target.image.value,
      };

      console.log(payload);

      await createTicket(
        payload,
        token!
      );

      alert(
        "Ticket created successfully"
      );

      router.push(
        "/admin/tickets"
      );

    } catch (error) {

      console.log(error);

      alert(
        "Failed to create ticket"
      );

    } finally {

      setLoading(false);
    }
  }

  return (
    <div className="mx-auto max-w-6xl rounded-[40px] bg-white p-10 shadow-xl">

      {/* HEADER */}
      <div className="mb-10">

        <div className="mb-5 flex h-20 w-20 items-center justify-center rounded-3xl bg-green-100 text-green-600">

          <Plane size={40} />

        </div>

        <h1 className="text-5xl font-black text-slate-900">
          Create Flight Ticket
        </h1>

        <p className="mt-4 text-lg text-slate-500">
          Create international and local flight tickets
        </p>

      </div>

      {/* FORM */}
      <form
        onSubmit={handleSubmit}
        className="grid gap-6 md:grid-cols-2"
      >

        {/* AIRLINE */}
        <select
          name="airline"
          className="rounded-2xl border p-5"
          required
        >

          <option value="">
            Select Airline
          </option>

          {/* NIGERIA */}
          <option value="Air Peace">
            Air Peace
          </option>

          <option value="Max Air">
            Max Air
          </option>

          <option value="Arik Air">
            Arik Air
          </option>

          <option value="Ibom Air">
            Ibom Air
          </option>

          {/* INTERNATIONAL */}
          <option value="Qatar Airways">
            Qatar Airways
          </option>

          <option value="Saudi Airlines">
            Saudi Airlines
          </option>

          <option value="Turkish Airlines">
            Turkish Airlines
          </option>

          <option value="Emirates">
            Emirates
          </option>

          <option value="British Airways">
            British Airways
          </option>

          <option value="EgyptAir">
            EgyptAir
          </option>

          <option value="Ethiopian Airlines">
            Ethiopian Airlines
          </option>

        </select>

        {/* SEAT CLASS */}
        <select
          name="seat_class"
          className="rounded-2xl border p-5"
          required
        >

          <option value="">
            Select Seat Class
          </option>

          <option value="Economy">
            Economy
          </option>

          <option value="Business">
            Business
          </option>

          <option value="First Class">
            First Class
          </option>

        </select>

        {/* FROM AIRPORT */}
        <select
          name="from_airport"
          className="rounded-2xl border p-5"
          required
        >

          <option value="">
            Departure Airport
          </option>

          {/* NIGERIA */}
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

          <option value="Port Harcourt (PHC)">
            Port Harcourt (PHC)
          </option>

          <option value="Maiduguri (MIU)">
            Maiduguri (MIU)
          </option>

          {/* INTERNATIONAL */}
          <option value="Dubai (DXB)">
            Dubai (DXB)
          </option>

          <option value="London Heathrow (LHR)">
            London Heathrow (LHR)
          </option>

          <option value="Istanbul (IST)">
            Istanbul (IST)
          </option>

          <option value="Doha (DOH)">
            Doha (DOH)
          </option>

        </select>

        {/* TO AIRPORT */}
        <select
          name="to_airport"
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

          <option value="London Heathrow (LHR)">
            London Heathrow (LHR)
          </option>

          <option value="Istanbul (IST)">
            Istanbul (IST)
          </option>

          <option value="Doha (DOH)">
            Doha (DOH)
          </option>

          <option value="Cairo (CAI)">
            Cairo (CAI)
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

        {/* PRICE */}
        <input
          name="price"
          type="number"
          placeholder="Ticket Price"
          className="rounded-2xl border p-5"
          required
        />

        {/* IMAGE */}
        <input
          name="image"
          placeholder="Image URL"
          className="rounded-2xl border p-5"
        />

        {/* DESCRIPTION */}
        <textarea
          name="description"
          placeholder="Flight Description"
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

              Creating Ticket...
            </>
          ) : (
            <>
              Create Ticket

              <ArrowRight size={22} />
            </>
          )}

        </button>

      </form>

    </div>
  );
}