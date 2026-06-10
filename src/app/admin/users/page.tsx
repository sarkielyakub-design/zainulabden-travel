"use client";

import {
  useEffect,
  useState,
} from "react";

import axios from "axios";

import {
  User,
  Mail,
  Phone,
  ShieldCheck,
  Loader2,
  MapPin,
  Globe,
  CalendarDays,
} from "lucide-react";

/* =========================
   API
========================= */
const API =
  "https://zainulabden-backend-production.up.railway.app/api/v1";

/* =========================
   TYPES
========================= */
type UserType = {
  id: number;

  name?: string;

  full_name?: string;

  email: string;

  phone?: string;

  address?: string;

  nationality?: string;

  role?: string;

  is_admin?: boolean;

  created_at?: string;

  createdAt?: string;
};

/* =========================
   PAGE
========================= */
export default function AdminUsers() {

  const [users, setUsers] =
    useState<UserType[]>([]);

  const [loading, setLoading] =
    useState(true);

  /* =========================
     FETCH USERS
  ========================= */
  async function fetchUsers() {

    try {

      setLoading(true);

      const token =
        localStorage.getItem(
          "token"
        );

      const response =
        await axios.get(
          `${API}/admin/users`,
          {
            headers: {
              Authorization:
                `Bearer ${token}`,
            },
          }
        );

      console.log(
        "USERS RESPONSE:",
        response.data
      );

      const usersData =
        Array.isArray(
          response.data
        )
          ? response.data
          : response.data.data ||
            response.data.users ||
            [];

      setUsers(usersData);

    } catch (err) {

      console.log(
        "USER ERROR:",
        err
      );

      setUsers([]);

    } finally {

      setLoading(false);
    }
  }

  useEffect(() => {
    fetchUsers();
  }, []);

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

      {/* =========================
         HEADER
      ========================= */}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

        <div>

          <h1 className="text-5xl font-black text-slate-900">
            Users
          </h1>

          <p className="mt-3 text-lg text-slate-500">
            Manage registered platform users
          </p>

        </div>

        {/* TOTAL */}
        <div className="rounded-[30px] bg-gradient-to-r from-green-600 to-emerald-700 px-8 py-6 text-white shadow-xl">

          <p className="text-sm font-medium text-green-100">
            Total Users
          </p>

          <h2 className="mt-2 text-4xl font-black">

            {users.length}

          </h2>

        </div>

      </div>

      {/* =========================
         EMPTY
      ========================= */}
      {users.length === 0 && (

        <div className="rounded-[36px] bg-white p-20 text-center shadow-sm">

          <User
            size={60}
            className="mx-auto text-slate-300"
          />

          <h2 className="mt-6 text-4xl font-black text-slate-900">
            No Users Found
          </h2>

          <p className="mt-3 text-slate-500">
            No registered users available
          </p>

        </div>
      )}

      {/* =========================
         USERS GRID
      ========================= */}
      {users.length > 0 && (

        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">

          {users.map((user) => (

            <div
              key={user.id}
              className="group overflow-hidden rounded-[36px] border border-slate-100 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-2xl"
            >

              {/* TOP */}
              <div className="relative overflow-hidden bg-gradient-to-r from-slate-900 via-slate-800 to-green-700 p-8 text-white">

                <div className="absolute right-[-40px] top-[-40px] h-40 w-40 rounded-full bg-white/10 blur-3xl" />

                <div className="relative z-10">

                  {/* AVATAR */}
                  <div className="flex h-20 w-20 items-center justify-center rounded-full bg-white/10 backdrop-blur">

                    <User size={38} />

                  </div>

                  {/* NAME */}
                  <h2 className="mt-6 text-3xl font-black leading-tight">

                    {user.full_name ||
                      user.name ||
                      "Unknown User"}

                  </h2>

                  {/* ROLE */}
                  <div className="mt-5 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-bold backdrop-blur">

                    <ShieldCheck size={16} />

                    {user.role === "admin" ||
                    user.is_admin
                      ? "Administrator"
                      : "Customer"}

                  </div>

                </div>

              </div>

              {/* BODY */}
              <div className="space-y-5 p-8">

                {/* EMAIL */}
                <div className="flex items-start gap-4 rounded-2xl bg-slate-50 p-4">

                  <Mail
                    size={20}
                    className="mt-1 text-green-600"
                  />

                  <div>

                    <p className="text-xs font-bold uppercase tracking-wide text-slate-400">
                      Email
                    </p>

                    <p className="mt-1 font-semibold text-slate-700 break-all">

                      {user.email}

                    </p>

                  </div>

                </div>

                {/* PHONE */}
                <div className="flex items-start gap-4 rounded-2xl bg-slate-50 p-4">

                  <Phone
                    size={20}
                    className="mt-1 text-green-600"
                  />

                  <div>

                    <p className="text-xs font-bold uppercase tracking-wide text-slate-400">
                      Phone Number
                    </p>

                    <p className="mt-1 font-semibold text-slate-700">

                      {user.phone ||
                        "No phone number"}

                    </p>

                  </div>

                </div>

                {/* ADDRESS */}
                <div className="flex items-start gap-4 rounded-2xl bg-slate-50 p-4">

                  <MapPin
                    size={20}
                    className="mt-1 text-green-600"
                  />

                  <div>

                    <p className="text-xs font-bold uppercase tracking-wide text-slate-400">
                      Address
                    </p>

                    <p className="mt-1 font-semibold text-slate-700">

                      {user.address ||
                        "No address"}

                    </p>

                  </div>

                </div>

                {/* NATIONALITY */}
                <div className="flex items-start gap-4 rounded-2xl bg-slate-50 p-4">

                  <Globe
                    size={20}
                    className="mt-1 text-green-600"
                  />

                  <div>

                    <p className="text-xs font-bold uppercase tracking-wide text-slate-400">
                      Nationality
                    </p>

                    <p className="mt-1 font-semibold text-slate-700">

                      {user.nationality ||
                        "Not specified"}

                    </p>

                  </div>

                </div>

                {/* JOIN DATE */}
                <div className="flex items-center gap-3 border-t pt-5 text-sm text-slate-500">

                  <CalendarDays
                    size={16}
                    className="text-green-600"
                  />

                  Joined:

                  {user.created_at ||
                  user.createdAt
                    ? new Date(
                        user.created_at ||
                          user.createdAt!
                      ).toLocaleDateString()
                    : "N/A"}

                </div>

              </div>

            </div>
          ))}

        </div>
      )}

    </div>
  );
}