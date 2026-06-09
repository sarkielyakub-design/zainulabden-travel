"use client";

import { useEffect, useState } from "react";

import axios from "axios";

import {
  Mail,
  Phone,
  User,
  CalendarDays,
  Loader2,
  MessageSquare,
} from "lucide-react";

/* =========================
   API
========================= */
const API =
  "http://172.20.10.3:8000/api/v1";

/* =========================
   TYPES
========================= */
type Message = {
  id: number;

  name: string;

  email: string;

  phone: string;

  message: string;

  created_at: string;
};

/* =========================
   PAGE
========================= */
export default function AdminMessages() {

  const [messages, setMessages] =
    useState<Message[]>([]);

  const [loading, setLoading] =
    useState(true);

  /* =========================
     FETCH MESSAGES
  ========================= */
  async function fetchMessages() {

    try {

      setLoading(true);

      const token =
        localStorage.getItem("token");

      const response =
        await axios.get(
          `${API}/contact/admin/messages`,
          {
            headers: {
              Authorization:
                `Bearer ${token}`,
            },
          }
        );

      console.log(
        "MESSAGES:",
        response.data
      );

      const data =
        response.data.data || [];

      setMessages(data);

    } catch (error) {

      console.log(
        "MESSAGE ERROR:",
        error
      );

      setMessages([]);

    } finally {

      setLoading(false);
    }
  }

  useEffect(() => {
    fetchMessages();
  }, []);

  /* =========================
     LOADING
  ========================= */
  if (loading) {

    return (
      <div className="flex min-h-[60vh] items-center justify-center">

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
          Customer Messages
        </h1>

        <p className="mt-3 text-lg text-slate-500">
          View messages sent from your website contact form
        </p>

      </div>

      {/* EMPTY */}
      {messages.length === 0 && (

        <div className="rounded-[32px] bg-white p-20 text-center shadow-sm">

          <MessageSquare
            size={60}
            className="mx-auto text-slate-300"
          />

          <h2 className="mt-6 text-4xl font-black text-slate-900">
            No Messages Yet
          </h2>

          <p className="mt-3 text-slate-500">
            Customer contact messages will appear here
          </p>

        </div>
      )}

      {/* MESSAGE LIST */}
      <div className="grid gap-6">

        {messages.map((item) => (

          <div
            key={item.id}
            className="rounded-[32px] bg-white p-8 shadow-sm"
          >

            {/* TOP */}
            <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">

              {/* USER */}
              <div className="space-y-4">

                <div className="flex items-center gap-3">

                  <div className="rounded-full bg-green-100 p-3 text-green-600">

                    <User size={18} />

                  </div>

                  <div>

                    <h2 className="text-2xl font-black text-slate-900">

                      {item.name}

                    </h2>

                    <p className="text-slate-500">
                      Customer Message
                    </p>

                  </div>

                </div>

                {/* EMAIL */}
                <div className="flex items-center gap-3 text-slate-700">

                  <Mail
                    size={18}
                    className="text-green-600"
                  />

                  {item.email}

                </div>

                {/* PHONE */}
                <div className="flex items-center gap-3 text-slate-700">

                  <Phone
                    size={18}
                    className="text-green-600"
                  />

                  {item.phone}

                </div>

              </div>

              {/* DATE */}
              <div className="flex items-center gap-2 text-slate-500">

                <CalendarDays size={18} />

                {item.created_at
                  ? new Date(
                      item.created_at
                    ).toLocaleString()
                  : "N/A"}

              </div>

            </div>

            {/* MESSAGE */}
            <div className="mt-8 rounded-3xl bg-slate-50 p-6">

              <p className="whitespace-pre-line text-lg leading-9 text-slate-700">

                {item.message}

              </p>

            </div>

            {/* ACTIONS */}
            <div className="mt-6 flex flex-wrap gap-4">

              {/* EMAIL */}
              <a
                href={`mailto:${item.email}`}
                className="rounded-2xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
              >
                Reply Email
              </a>

              {/* WHATSAPP */}
              <a
                href={`https://wa.me/${item.phone}`}
                target="_blank"
                className="rounded-2xl bg-green-600 px-6 py-3 font-semibold text-white transition hover:bg-green-700"
              >
                WhatsApp
              </a>

            </div>

          </div>
        ))}

      </div>

    </div>
  );
}