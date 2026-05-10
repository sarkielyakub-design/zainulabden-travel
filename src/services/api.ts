import axios from "axios";

export const API_URL =
  "http://172.20.10.3:8000/api/v1";

export const api = axios.create({
  baseURL: API_URL,
});