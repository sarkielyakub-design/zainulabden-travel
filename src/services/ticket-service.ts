import axios from "axios";

/* =========================
   API
========================= */
export const API =
  "https://zainulabden-backend-production.up.railway.app/api/v1";

/* =========================
   AXIOS
========================= */
export const api =
  axios.create({
    baseURL: API,
  });

/* =========================
   TOKEN HEADER
========================= */
function authHeader(
  token: string
) {
  return {
    headers: {
      Authorization:
        `Bearer ${token}`,
    },
  };
}

/* =========================
   GET PUBLIC TICKETS
========================= */
export async function getTickets() {

  const response =
    await api.get(
      "/tickets"
    );

  return Array.isArray(
    response.data
  )
    ? response.data
    : response.data.tickets || [];
}

/* =========================
   GET ADMIN TICKETS
========================= */
export async function getAdminTickets(
  token: string
) {

  const response =
    await api.get(
      "/tickets",
      authHeader(token)
    );

  return Array.isArray(
    response.data
  )
    ? response.data
    : response.data.tickets || [];
}

/* =========================
   GET SINGLE TICKET
========================= */
export async function getSingleTicket(
  id: string
) {

  const response =
    await api.get(
      `/tickets/${id}`
    );

  return response.data;
}

/* =========================
   SEARCH TICKETS
========================= */
export async function searchTickets(
  query: string
) {

  const response =
    await api.get(
      `/tickets/search?q=${query}`
    );

  return Array.isArray(
    response.data
  )
    ? response.data
    : response.data.tickets || [];
}

/* =========================
   CREATE TICKET
========================= */
export async function createTicket(
  data: any,
  token: string
) {

  const response =
    await api.post(
      "/tickets/admin",
      data,
      authHeader(token)
    );

  return response.data;
}

/* =========================
   UPDATE TICKET
========================= */
export async function updateTicket(
  id: number,
  data: any,
  token: string
) {

  const response =
    await api.put(
      `/tickets/admin/${id}`,
      data,
      authHeader(token)
    );

  return response.data;
}

/* =========================
   DELETE TICKET
========================= */
export async function deleteTicket(
  id: number,
  token: string
) {

  const response =
    await api.delete(
      `/tickets/admin/${id}`,
      authHeader(token)
    );

  return response.data;
}