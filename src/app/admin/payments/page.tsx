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

  customer_name: string;

  email: string;

  booking_type: string;

  package_title?: string;

  ticket_airline?: string;

  amount: number;

  payment_status: string;

  reference: string;

  created_at: string;
};

/* =========================
   PAGE
========================= */
export default function AdminPayments() {

  const [payments, setPayments] =
    useState<Payment[]>([]);

  const [loading, setLoading] =
    useState(true);

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
          `${API}/admin/payments`,
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
          : response.data.payments ||
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
     TOTAL
  ========================= */
  const totalRevenue =
    payments
      .filter(
        (item) =>
          item.payment_status ===
          "paid"
      )
      .reduce(
        (acc, curr) =>
          acc + Number(curr.amount),
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
      <div className="flex flex-col items-start justify-between gap-5 lg:flex-row lg:items-center">

        <div>

          <h1 className="text-5xl font-black text-slate-900">
            Payments
          </h1>

          <p className="mt-3 text-lg text-slate-500">
            Monitor all payment transactions
          </p>

        </div>

        {/* TOTAL */}
        <div className="rounded-[32px] bg-gradient-to-br from-green-600 to-emerald-700 px-8 py-6 text-white shadow-xl">

          <p className="text-sm font-medium text-green-100">
            Total Revenue
          </p>

          <h2 className="mt-3 text-4xl font-black">

            ₦
            {totalRevenue.toLocaleString()}

          </h2>

        </div>

      </div>

      {/* EMPTY */}
      {payments.length === 0 && (

        <div className="rounded-[32px] bg-white p-20 text-center shadow-sm">

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

      {/* TABLE */}
      {payments.length > 0 && (

        <div className="overflow-x-auto rounded-[32px] bg-white p-8 shadow-sm">

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

              {payments.map(
                (payment) => (

                <tr
                  key={payment.id}
                  className="border-b last:border-none"
                >

                  {/* CUSTOMER */}
                  <td className="py-6">

                    <div>

                      <h3 className="font-bold text-slate-900">

                        {payment.customer_name}

                      </h3>

                      <p className="mt-1 text-sm text-slate-500">

                        {payment.email}

                      </p>

                    </div>

                  </td>

                  {/* TYPE */}
                  <td className="py-6">

                    <span
                      className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-bold ${
                        payment.booking_type ===
                        "ticket"
                          ? "bg-green-100 text-green-700"
                          : "bg-blue-100 text-blue-700"
                      }`}
                    >

                      {payment.booking_type}

                    </span>

                  </td>

                  {/* INFO */}
                  <td className="py-6">

                    {payment.package_title ? (

                      <p className="font-semibold text-slate-900">

                        {payment.package_title}

                      </p>

                    ) : (

                      <p className="font-semibold text-slate-900">

                        {payment.ticket_airline}

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
                        payment.payment_status ===
                        "paid"
                          ? "bg-green-100 text-green-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >

                      {payment.payment_status ===
                      "paid" ? (

                        <CheckCircle2
                          size={14}
                        />

                      ) : (

                        <Clock3
                          size={14}
                        />
                      )}

                      {
                        payment.payment_status
                      }

                    </span>

                  </td>

                  {/* REFERENCE */}
                  <td className="py-6 text-sm font-medium text-slate-600">

                    {payment.reference}

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
              ))}

            </tbody>

          </table>

        </div>
      )}

    </div>
  );
}