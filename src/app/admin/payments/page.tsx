"use client";

import {
  useEffect,
  useState,
} from "react";

import axios from "axios";

import {
  CreditCard,
  Wallet,
  CheckCircle2,
  Clock3,
  CalendarDays,
  Loader2,
  Plane,
  Package,
  TrendingUp,
  Search,
} from "lucide-react";

/* =========================
   API
========================= */
const API =
  "http://172.20.10.3:8000/api/v1";

/* =========================
   TYPES
========================= */
type Payment = {
  id: number;

  surname: string;

  first_name: string;

  email: string;

  amount: number;

  status: string;

  payment_reference: string;

  created_at: string;

  package_title?: string;

  ticket_airline?: string;

  from_airport?: string;

  to_airport?: string;

  package_id?: number;

  ticket_id?: number;
};

/* =========================
   PAGE
========================= */
export default function AdminPayments() {

  const [payments, setPayments] =
    useState<Payment[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [search, setSearch] =
    useState("");

  /* =========================
     FETCH PAYMENTS
  ========================= */
  async function fetchPayments() {

    try {

      setLoading(true);

      const token =
        localStorage.getItem(
          "token"
        );

      const response =
        await axios.get(
          `${API}/admin/bookings`,
          {
            headers: {
              Authorization:
                `Bearer ${token}`,
            },
          }
        );

      console.log(
        "PAYMENTS:",
        response.data
      );

      const paymentData =
        Array.isArray(
          response.data
        )
          ? response.data
          : response.data.bookings ||
            response.data.data ||
            [];

      setPayments(paymentData);

    } catch (err) {

      console.log(
        "PAYMENT ERROR:",
        err
      );

      setPayments([]);

    } finally {

      setLoading(false);
    }
  }

  useEffect(() => {
    fetchPayments();
  }, []);

  /* =========================
     FILTER
  ========================= */
  const filteredPayments =
    payments.filter((item) => {

      const value = `
        ${item.surname}
        ${item.first_name}
        ${item.email}
        ${item.package_title}
        ${item.ticket_airline}
      `.toLowerCase();

      return value.includes(
        search.toLowerCase()
      );
    });

  /* =========================
     TOTAL
  ========================= */
  const totalRevenue =
    filteredPayments
      .filter(
        (item) =>
          item.status ===
          "paid"
      )
      .reduce(
        (acc, curr) =>
          acc +
          Number(
            curr.amount || 0
          ),
        0
      );

  /* =========================
     LOADING
  ========================= */
  if (loading) {

    return (
      <div className="flex min-h-[50vh] items-center justify-center">

        <Loader2
          size={40}
          className="animate-spin text-green-600"
        />

      </div>
    );
  }

  return (
    <div className="space-y-10">

      {/* HEADER */}
      <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">

        <div>

          <h1 className="text-5xl font-black text-slate-900">
            Payments
          </h1>

          <p className="mt-3 text-lg text-slate-500">
            Monitor all travel payments and transactions
          </p>

        </div>

        {/* REVENUE */}
        <div className="rounded-[32px] bg-gradient-to-br from-green-600 to-emerald-700 px-8 py-6 text-white shadow-xl">

          <p className="text-sm font-medium text-green-100">
            Total Revenue
          </p>

          <h2 className="mt-3 text-4xl font-black">

            ₦
            {totalRevenue.toLocaleString()}

          </h2>

          <div className="mt-3 flex items-center gap-2 text-sm text-green-100">

            <TrendingUp size={16} />

            Live Revenue Data

          </div>

        </div>

      </div>

      {/* SEARCH */}
      <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-5 py-5 shadow-sm">

        <Search className="text-green-600" />

        <input
          type="text"
          value={search}
          onChange={(e) =>
            setSearch(
              e.target.value
            )
          }
          placeholder="Search payments..."
          className="w-full bg-transparent text-lg outline-none"
        />

      </div>

      {/* EMPTY */}
      {filteredPayments.length === 0 && (

        <div className="rounded-[36px] bg-white p-20 text-center shadow-sm">

          <Wallet
            size={60}
            className="mx-auto text-slate-300"
          />

          <h2 className="mt-6 text-4xl font-black text-slate-900">
            No Payments Found
          </h2>

          <p className="mt-3 text-slate-500">
            Customer payments will appear here
          </p>

        </div>
      )}

      {/* MOBILE CARDS */}
      <div className="grid gap-6 lg:hidden">

        {filteredPayments.map(
          (payment) => {

          const isTicket =
            !!payment.ticket_id;

          return (

            <div
              key={payment.id}
              className="rounded-[32px] bg-white p-6 shadow-sm"
            >

              {/* TOP */}
              <div className="flex items-start justify-between gap-4">

                <div>

                  <h3 className="font-black text-slate-900">

                    {payment.surname}
                    {" "}
                    {payment.first_name}

                  </h3>

                  <p className="mt-1 text-sm text-slate-500">

                    {payment.email}

                  </p>

                </div>

                {/* STATUS */}
                <span
                  className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-bold ${
                    payment.status ===
                    "paid"
                      ? "bg-green-100 text-green-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}
                >

                  {payment.status ===
                  "paid" ? (

                    <CheckCircle2
                      size={12}
                    />

                  ) : (

                    <Clock3
                      size={12}
                    />
                  )}

                  {payment.status}

                </span>

              </div>

              {/* TYPE */}
              <div className="mt-6">

                {isTicket ? (

                  <div className="flex items-center gap-3">

                    <Plane className="text-green-600" />

                    <div>

                      <p className="font-semibold text-slate-900">

                        {payment.ticket_airline}

                      </p>

                      <p className="text-sm text-slate-500">

                        {payment.from_airport}
                        {" → "}
                        {payment.to_airport}

                      </p>

                    </div>

                  </div>

                ) : (

                  <div className="flex items-center gap-3">

                    <Package className="text-blue-600" />

                    <p className="font-semibold text-slate-900">

                      {payment.package_title}

                    </p>

                  </div>
                )}

              </div>

              {/* AMOUNT */}
              <div className="mt-6 flex items-center gap-3 text-green-600">

                <CreditCard size={18} />

                <span className="text-3xl font-black">

                  ₦
                  {Number(
                    payment.amount || 0
                  ).toLocaleString()}

                </span>

              </div>

              {/* REFERENCE */}
              <div className="mt-6 rounded-2xl bg-slate-50 p-4">

                <p className="text-sm text-slate-500">
                  Reference
                </p>

                <p className="mt-2 font-bold text-slate-900">

                  {payment.payment_reference}

                </p>

              </div>

              {/* DATE */}
              <div className="mt-6 flex items-center gap-3 text-slate-500">

                <CalendarDays size={16} />

                {payment.created_at
                  ? new Date(
                      payment.created_at
                    ).toLocaleDateString()
                  : "N/A"}

              </div>

            </div>
          );
        })}

      </div>

      {/* DESKTOP TABLE */}
      <div className="hidden overflow-x-auto rounded-[36px] bg-white p-8 shadow-sm lg:block">

        <table className="w-full min-w-[1200px]">

          <thead>

            <tr className="border-b">

              <th className="pb-5 text-left text-sm font-bold text-slate-500">
                Customer
              </th>

              <th className="pb-5 text-left text-sm font-bold text-slate-500">
                Type
              </th>

              <th className="pb-5 text-left text-sm font-bold text-slate-500">
                Travel Info
              </th>

              <th className="pb-5 text-left text-sm font-bold text-slate-500">
                Amount
              </th>

              <th className="pb-5 text-left text-sm font-bold text-slate-500">
                Status
              </th>

              <th className="pb-5 text-left text-sm font-bold text-slate-500">
                Reference
              </th>

              <th className="pb-5 text-left text-sm font-bold text-slate-500">
                Date
              </th>

            </tr>

          </thead>

          <tbody>

            {filteredPayments.map(
              (payment) => {

              const isTicket =
                !!payment.ticket_id;

              return (

                <tr
                  key={payment.id}
                  className="border-b last:border-none"
                >

                  {/* CUSTOMER */}
                  <td className="py-6">

                    <div>

                      <h3 className="font-bold text-slate-900">

                        {payment.surname}
                        {" "}
                        {payment.first_name}

                      </h3>

                      <p className="mt-1 text-sm text-slate-500">

                        {payment.email}

                      </p>

                    </div>

                  </td>

                  {/* TYPE */}
                  <td className="py-6">

                    {isTicket ? (

                      <span className="rounded-full bg-green-100 px-4 py-2 text-xs font-bold text-green-700">

                        Ticket

                      </span>

                    ) : (

                      <span className="rounded-full bg-blue-100 px-4 py-2 text-xs font-bold text-blue-700">

                        Package

                      </span>
                    )}

                  </td>

                  {/* INFO */}
                  <td className="py-6">

                    {isTicket ? (

                      <div>

                        <p className="font-semibold text-slate-900">

                          {payment.ticket_airline}

                        </p>

                        <p className="mt-1 text-sm text-slate-500">

                          {payment.from_airport}
                          {" → "}
                          {payment.to_airport}

                        </p>

                      </div>

                    ) : (

                      <p className="font-semibold text-slate-900">

                        {payment.package_title}

                      </p>
                    )}

                  </td>

                  {/* AMOUNT */}
                  <td className="py-6">

                    <div className="flex items-center gap-2 font-black text-green-600">

                      <CreditCard
                        size={18}
                      />

                      ₦
                      {Number(
                        payment.amount || 0
                      ).toLocaleString()}

                    </div>

                  </td>

                  {/* STATUS */}
                  <td className="py-6">

                    <span
                      className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-bold ${
                        payment.status ===
                        "paid"
                          ? "bg-green-100 text-green-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >

                      {payment.status ===
                      "paid" ? (

                        <CheckCircle2
                          size={12}
                        />

                      ) : (

                        <Clock3
                          size={12}
                        />
                      )}

                      {payment.status}

                    </span>

                  </td>

                  {/* REFERENCE */}
                  <td className="py-6 text-sm font-medium text-slate-600">

                    {payment.payment_reference}

                  </td>

                  {/* DATE */}
                  <td className="py-6">

                    <div className="flex items-center gap-2 text-slate-600">

                      <CalendarDays
                        size={16}
                      />

                      {payment.created_at
                        ? new Date(
                            payment.created_at
                          ).toLocaleDateString()
                        : "N/A"}

                    </div>

                  </td>

                </tr>
              );
            })}

          </tbody>

        </table>

      </div>

    </div>
  );
}