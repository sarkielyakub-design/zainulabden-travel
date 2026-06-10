import axios from "axios";

export const API_URL =
  "https://zainulabden-backend-production.up.railway.app/api/v1";

export const api = axios.create({
  baseURL: API_URL,
});