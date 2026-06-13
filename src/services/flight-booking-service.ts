import axios from "axios";

const API =
  "https://zainulabden-backend-production.up.railway.app/api/v1";

export const getFlightBookings = async () => {
  const res = await axios.get(
    `${API}/flight-bookings/`
  );

  return res.data;
};

export const confirmBooking = async (id: number) => {
  const res = await axios.put(
    `${API}/flight-bookings/${id}/confirm`
  );

  return res.data;
};

export const ticketBooking = async (id: number) => {
  const res = await axios.put(
    `${API}/flight-bookings/${id}/ticketed`
  );

  return res.data;
};