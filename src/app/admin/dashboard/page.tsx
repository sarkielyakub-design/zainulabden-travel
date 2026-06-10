"use client";

import {
  useEffect,
  useState,
} from "react";

import axios from "axios";

import {
  Package,
  Users,
  BookOpen,
  CreditCard,
  TrendingUp,
  ArrowUpRight,
  Loader2,
  Plane,
  CheckCircle2,
  Clock3,
  Download,
} from "lucide-react";

import * as XLSX from "xlsx";

import { saveAs } from "file-saver";

/* =========================
   API
========================= */
const API =
  "https://zainulabden-backend-production.up.railway.app/api/v1";

/* =========================
   PAGE
========================= */
export default function AdminDashboard() {

  const [loading, setLoading] =
    useState(true);

  const [stats, setStats] =
    useState<any>(null);

  const [recentBookings,
    setRecentBookings] =
    useState<any[]>([]);

  const [activities,
    setActivities] =
    useState<any[]>([]);

  /* =========================
     FETCH DASHBOARD
  ========================= */
  async function fetchDashboard() {

    try {

      setLoading(true);

      const token =
        localStorage.getItem(
          "token"
        );

      // STATS
      const statsResponse =
        await axios.get(
          `${API}/admin/stats`,
          {
            headers: {
              Authorization:
                `Bearer ${token}`,
            },
          }
        );

      setStats(
        statsResponse.data
      );

      setRecentBookings(
        statsResponse.data
          .recent_bookings || []
      );

      // ACTIVITY
      const activityResponse =
        await axios.get(
          `${API}/admin/activity`,
          {
            headers: {
              Authorization:
                `Bearer ${token}`,
            },
          }
        );

      setActivities(
        activityResponse.data
          .activities || []
      );

    } catch (error) {

      console.log(error);

    } finally {

      setLoading(false);
    }
  }

  useEffect(() => {
    fetchDashboard();
  }, []);

  /* =========================
     GENERATE REPORT
  ========================= */
  function generateReport() {

    // SUMMARY
    const summary = [
      {
        Metric: "Packages",
        Value:
          stats?.packages || 0,
      },

      {
        Metric: "Tickets",
        Value:
          stats?.tickets || 0,
      },

      {
        Metric: "Bookings",
        Value:
          stats?.bookings || 0,
      },

      {
        Metric: "Users",
        Value:
          stats?.users || 0,
      },

      {
        Metric: "Revenue",
        Value:
          stats?.revenue || 0,
      },
    ];

    // BOOKINGS
    const bookings =
      recentBookings.map(
        (booking) => ({

          Customer:
            `${booking.surname} ${booking.first_name}`,

          Booking:
            booking.package_title ||
            booking.ticket_airline,

          Amount:
            booking.amount,

          Status:
            booking.status,

          Date:
            booking.created_at,
        })
      );

    // WORKBOOK
    const workbook =
      XLSX.utils.book_new();

    // SUMMARY SHEET
    const summarySheet =
      XLSX.utils.json_to_sheet(
        summary
      );

    XLSX.utils.book_append_sheet(
      workbook,
      summarySheet,
      "Summary"
    );

    // BOOKINGS SHEET
    const bookingSheet =
      XLSX.utils.json_to_sheet(
        bookings
      );

    XLSX.utils.book_append_sheet(
      workbook,
      bookingSheet,
      "Bookings"
    );

    // EXPORT
    const excelBuffer =
      XLSX.write(workbook, {
        bookType: "xlsx",
        type: "array",
      });

    const blob = new Blob(
      [excelBuffer],
      {
        type:
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8",
      }
    );

    saveAs(
      blob,
      `zain-dashboard-report.xlsx`
    );
  }

  /* =========================
     LOADING
  ========================= */
  if (loading) {

    return (
      <div className="flex min-h-[60vh] items-center justify-center">

        <Loader2
          size={50}
          className="animate-spin text-green-600"
        />

      </div>
    );
  }

  /* =========================
     STATS
  ========================= */
  const statsCards = [
    {
      title: "Packages",

      value:
        stats?.packages || 0,

      icon: Package,

      color: "bg-blue-500",
    },

    {
      title: "Tickets",

      value:
        stats?.tickets || 0,

      icon: Plane,

      color: "bg-indigo-500",
    },

    {
      title: "Bookings",

      value:
        stats?.bookings || 0,

      icon: BookOpen,

      color: "bg-green-500",
    },

    {
      title: "Users",

      value:
        stats?.users || 0,

      icon: Users,

      color: "bg-purple-500",
    },

    {
      title: "Revenue",

      value:
        `₦${Number(
          stats?.revenue || 0
        ).toLocaleString()}`,

      icon: CreditCard,

      color: "bg-orange-500",
    },
  ];

  return (
    <div className="space-y-10">

      {/* HEADER */}
      <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">

        <div>

          <h1 className="text-4xl font-black text-slate-900 lg:text-5xl">
            Dashboard Overview
          </h1>

          <p className="mt-3 text-lg text-slate-600">
            Monitor bookings, revenue and platform performance.
          </p>

        </div>

        {/* REPORT BUTTON */}
        <button
          onClick={generateReport}
          className="flex items-center justify-center gap-3 rounded-2xl bg-green-600 px-6 py-4 font-semibold text-white shadow-lg shadow-green-500/20 transition hover:bg-green-700"
        >

          <Download size={20} />

          Generate Report

        </button>

      </div>

      {/* STATS */}
      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-5">

        {statsCards.map((item) => {

          const Icon =
            item.icon;

          return (
            <div
              key={item.title}
              className="rounded-[32px] bg-white p-7 shadow-sm"
            >

              <div className="flex items-start justify-between">

                <div>

                  <p className="text-sm font-medium text-slate-500">
                    {item.title}
                  </p>

                  <h2 className="mt-4 text-4xl font-black text-slate-900">
                    {item.value}
                  </h2>

                </div>

                <div
                  className={`rounded-2xl p-4 text-white ${item.color}`}
                >

                  <Icon size={26} />

                </div>

              </div>

              <div className="mt-6 flex items-center gap-2 text-sm font-medium text-green-600">

                <ArrowUpRight size={16} />

                Live Data

              </div>

            </div>
          );
        })}

      </div>

      {/* CONTENT */}
      <div className="grid gap-8 xl:grid-cols-3">

        {/* BOOKINGS */}
        <div className="rounded-[32px] bg-white p-8 shadow-sm xl:col-span-2">

          <div className="mb-8">

            <h3 className="text-2xl font-black text-slate-900">
              Recent Bookings
            </h3>

            <p className="mt-1 text-slate-500">
              Latest customer reservations
            </p>

          </div>

          {/* TABLE */}
          <div className="overflow-x-auto">

            <table className="w-full min-w-[700px]">

              <thead>

                <tr className="border-b">

                  <th className="pb-4 text-left text-sm font-semibold text-slate-500">
                    Customer
                  </th>

                  <th className="pb-4 text-left text-sm font-semibold text-slate-500">
                    Booking
                  </th>

                  <th className="pb-4 text-left text-sm font-semibold text-slate-500">
                    Amount
                  </th>

                  <th className="pb-4 text-left text-sm font-semibold text-slate-500">
                    Status
                  </th>

                </tr>

              </thead>

              <tbody>

                {recentBookings.map(
                  (booking) => (

                  <tr
                    key={booking.id}
                    className="border-b last:border-none"
                  >

                    <td className="py-5 font-semibold text-slate-900">

                      {booking.surname}
                      {" "}
                      {booking.first_name}

                    </td>

                    <td className="py-5 text-slate-600">

                      {booking.package_title ||
                        booking.ticket_airline ||
                        "Booking"}

                    </td>

                    <td className="py-5 font-bold text-green-600">

                      ₦
                      {Number(
                        booking.amount || 0
                      ).toLocaleString()}

                    </td>

                    <td className="py-5">

                      <span
                        className={`rounded-full px-4 py-2 text-xs font-bold ${
                          booking.status ===
                          "paid"
                            ? "bg-green-100 text-green-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                      >

                        {booking.status}

                      </span>

                    </td>

                  </tr>
                ))}

              </tbody>

            </table>

          </div>

        </div>

        {/* RIGHT PANEL */}
        <div className="space-y-8">

          {/* REVENUE */}
          <div className="rounded-[32px] bg-gradient-to-br from-green-600 to-emerald-700 p-8 text-white shadow-xl">

            <p className="text-sm font-medium text-green-100">
              Monthly Revenue
            </p>

            <h2 className="mt-4 text-5xl font-black">

              ₦
              {Number(
                stats?.revenue || 0
              ).toLocaleString()}

            </h2>

            <div className="mt-6 flex items-center gap-2 text-green-100">

              <TrendingUp size={18} />

              Live Revenue Data

            </div>

          </div>

          {/* ACTIVITY */}
          <div className="rounded-[32px] bg-white p-8 shadow-sm">

            <h3 className="text-2xl font-black text-slate-900">
              Activity
            </h3>

            <div className="mt-8 space-y-6">

              {activities.length === 0 && (

                <p className="text-slate-500">
                  No recent activity
                </p>
              )}

              {activities.map(
                (activity) => (

                <div
                  key={activity.id}
                  className="flex items-start gap-4"
                >

                  <div
                    className={`mt-1 h-3 w-3 rounded-full ${
                      activity.type ===
                      "ticket"
                        ? "bg-green-500"
                        : "bg-blue-500"
                    }`}
                  />

                  <div>

                    <p className="font-semibold text-slate-900">

                      {activity.type ===
                      "ticket" ? (
                        <>
                          <Plane
                            size={16}
                            className="mr-2 inline"
                          />

                          Ticket booking
                        </>
                      ) : (
                        <>
                          <Package
                            size={16}
                            className="mr-2 inline"
                          />

                          Package booking
                        </>
                      )}

                    </p>

                    <p className="mt-1 text-sm text-slate-500">

                      {activity.customer}

                    </p>

                    <div className="mt-2">

                      <span
                        className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-bold ${
                          activity.status ===
                          "paid"
                            ? "bg-green-100 text-green-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                      >

                        {activity.status ===
                        "paid" ? (

                          <CheckCircle2
                            size={12}
                          />

                        ) : (

                          <Clock3
                            size={12}
                          />
                        )}

                        {activity.status}

                      </span>

                    </div>

                  </div>

                </div>
              ))}

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}