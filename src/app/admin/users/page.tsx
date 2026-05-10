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
} from "lucide-react";

/* =========================
   API
========================= */
const API =
  "http://172.20.10.3:8000/api/v1";

/* =========================
   TYPES
========================= */
type UserType = {
  id: number;

  name?: string;

  full_name?: string;

  email: string;

  phone?: string;

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
          `${API}/users/`,
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

      // HANDLE DIFFERENT RESPONSE SHAPES
      const usersData =
        Array.isArray(
          response.data
        )
          ? response.data
          : response.data.data ||
            response.data.users ||
            response.data.results ||
            [];

      console.log(
        "PARSED USERS:",
        usersData
      );

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

      {/* HEADER */}
      <div>

        <h1 className="text-5xl font-black text-slate-900">
          Users
        </h1>

        <p className="mt-3 text-lg text-slate-500">
          Manage platform users
        </p>

      </div>

      {/* EMPTY */}
      {users.length === 0 && (

        <div className="rounded-[32px] bg-white p-20 text-center shadow-sm">

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

      {/* GRID */}
      {users.length > 0 && (

        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">

          {users.map((user) => (

            <div
              key={user.id}
              className="overflow-hidden rounded-[36px] bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
            >

              {/* HEADER */}
              <div className="bg-gradient-to-r from-green-600 to-emerald-700 p-8 text-white">

                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-white/10 backdrop-blur">

                  <User size={36} />

                </div>

                <h2 className="mt-6 text-3xl font-black">

                  {user.full_name ||
                    user.name ||
                    "Unknown User"}

                </h2>

              </div>

              {/* BODY */}
              <div className="space-y-5 p-8">

                {/* EMAIL */}
                <div className="flex items-center gap-3 text-slate-700">

                  <Mail
                    size={18}
                    className="text-green-600"
                  />

                  <span className="font-medium">

                    {user.email}

                  </span>

                </div>

                {/* PHONE */}
                <div className="flex items-center gap-3 text-slate-700">

                  <Phone
                    size={18}
                    className="text-green-600"
                  />

                  <span className="font-medium">

                    {user.phone ||
                      "No phone"}

                  </span>

                </div>

                {/* ROLE */}
                <div>

                  <span
                    className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-bold ${
                      user.role ===
                        "admin" ||
                      user.is_admin
                        ? "bg-purple-100 text-purple-700"
                        : "bg-blue-100 text-blue-700"
                    }`}
                  >

                    <ShieldCheck
                      size={16}
                    />

                    {user.role ===
                      "admin" ||
                    user.is_admin
                      ? "Administrator"
                      : "User"}

                  </span>

                </div>

                {/* DATE */}
                <p className="pt-4 text-sm text-slate-400">

                  Joined:
                  {" "}

                  {user.created_at ||
                  user.createdAt
                    ? new Date(
                        user.created_at ||
                          user.createdAt!
                      ).toLocaleDateString()
                    : "N/A"}

                </p>

              </div>

            </div>
          ))}

        </div>
      )}

    </div>
  );
}