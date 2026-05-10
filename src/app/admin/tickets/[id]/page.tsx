"use client";

import {
  useEffect,
  useState,
} from "react";

import {
  useParams,
} from "next/navigation";

import {
  getSingleTicket,
  updateTicket,
} from "@/src/services/ticket-service";

export default function EditTicketPage() {

  const params = useParams();

  const [ticket, setTicket] =
    useState<any>(null);

  const [loading, setLoading] =
    useState(false);

  async function fetchTicket() {

    const data =
      await getSingleTicket(
        params.id as string
      );

    setTicket(data);
  }

  useEffect(() => {
    fetchTicket();
  }, []);

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

      const payload = {
        airline:
          formData.get("airline"),

        from_airport:
          formData.get(
            "from_airport"
          ),

        to_airport:
          formData.get(
            "to_airport"
          ),

        departure_date:
          formData.get(
            "departure_date"
          ),

        return_date:
          formData.get(
            "return_date"
          ),

        seat_class:
          formData.get(
            "seat_class"
          ),

        price: Number(
          formData.get("price")
        ),

        image:
          formData.get("image"),

        description:
          formData.get(
            "description"
          ),
      };

      await updateTicket(
        Number(params.id),
        payload,
        token!
      );

      alert(
        "Ticket updated"
      );

    } catch (error) {

      console.log(error);

    } finally {

      setLoading(false);
    }
  }

  if (!ticket)
    return <p>Loading...</p>;

  return (
    <div className="mx-auto max-w-4xl rounded-[32px] bg-white p-10 shadow-sm">

      <h1 className="mb-10 text-4xl font-black">
        Edit Ticket
      </h1>

      <form
        onSubmit={handleSubmit}
        className="grid gap-6 md:grid-cols-2"
      >

        <input
          name="airline"
          defaultValue={
            ticket.airline
          }
          className="rounded-2xl border p-5"
        />

        <input
          name="seat_class"
          defaultValue={
            ticket.seat_class
          }
          className="rounded-2xl border p-5"
        />

        <input
          name="from_airport"
          defaultValue={
            ticket.from_airport
          }
          className="rounded-2xl border p-5"
        />

        <input
          name="to_airport"
          defaultValue={
            ticket.to_airport
          }
          className="rounded-2xl border p-5"
        />

        <input
          name="departure_date"
          defaultValue={
            ticket.departure_date
          }
          className="rounded-2xl border p-5"
        />

        <input
          name="return_date"
          defaultValue={
            ticket.return_date
          }
          className="rounded-2xl border p-5"
        />

        <input
          name="price"
          defaultValue={
            ticket.price
          }
          className="rounded-2xl border p-5"
        />

        <input
          name="image"
          defaultValue={
            ticket.image
          }
          className="rounded-2xl border p-5"
        />

        <textarea
          name="description"
          defaultValue={
            ticket.description
          }
          className="min-h-[150px] rounded-2xl border p-5 md:col-span-2"
        />

        <button
          disabled={loading}
          className="rounded-2xl bg-green-600 py-5 font-bold text-white md:col-span-2"
        >

          {loading
            ? "Updating..."
            : "Update Ticket"}

        </button>

      </form>

    </div>
  );
}