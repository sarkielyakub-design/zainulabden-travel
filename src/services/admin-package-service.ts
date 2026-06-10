import axios from "axios";

/* =========================
   MAIN API URL
========================= */
export const API =
  "https://zainulabden-backend-production.up.railway.app/api/v1";

/* =========================
   AXIOS INSTANCE
========================= */
export const api = axios.create({
  baseURL: API,

  headers: {
    "Content-Type":
      "application/json",
  },
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
   GET ADMIN PACKAGES
========================= */
export const getAdminPackages =
  async () => {

    const token =
      localStorage.getItem(
        "token"
      );

    return api.get(
      "/admin/packages",
      {
        headers: {
          Authorization:
            `Bearer ${token}`,
        },
      }
    );
  };
/* =========================
   GET PUBLIC PACKAGES
========================= */
export const getPackages =
  async () => {

    return api.get(
      "/packages"
    );
  };

/* =========================
   GET SINGLE PACKAGE
========================= */
export const getSinglePackage =
  async (id: string) => {

    return api.get(
      `/packages/${id}`
    );
  };

/* =========================
   CREATE PACKAGE
========================= */
export const createPackage =
  async (
    data: FormData,
    token: string
  ) => {

    return api.post(
      "/admin/packages",
      data,
      {
        headers: {
          Authorization:
            `Bearer ${token}`,
          "Content-Type":
            "multipart/form-data",
        },
      }
    );
  };

/* =========================
   UPDATE PACKAGE
========================= */
export const updatePackage =
  async (
    id: string,
    data: FormData,
    token: string
  ) => {

    return api.put(
      `/admin/packages/${id}`,
      data,
      {
        headers: {
          Authorization:
            `Bearer ${token}`,
          "Content-Type":
            "multipart/form-data",
        },
      }
    );
  };

/* =========================
   DELETE PACKAGE
========================= */
export const deletePackage =
  async (
    id: number,
    token: string
  ) => {

    return api.delete(
      `/admin/packages/${id}`,
      authHeader(token)
    );
  };

/* =========================
   UPLOAD PACKAGE IMAGE
========================= */
export const uploadPackageImage =
  async (
    id: number,
    image: FormData,
    token: string
  ) => {

    return api.post(
      `/admin/packages/${id}/upload`,
      image,
      {
        headers: {
          Authorization:
            `Bearer ${token}`,
          "Content-Type":
            "multipart/form-data",
        },
      }
    );
  };

/* =========================
   LOGIN
========================= */
export const loginUser =
  async (data: {
    email: string;
    password: string;
  }) => {

    return api.post(
      "/auth/login",
      data
    );
  };

/* =========================
   REGISTER
========================= */
export const registerUser =
  async (data: {
    full_name: string;
    email: string;
    password: string;
  }) => {

    return api.post(
      "/auth/register",
      data
    );
  };

/* =========================
   LOGOUT
========================= */
export const logoutUser =
  async (token: string) => {

    return api.post(
      "/auth/logout",
      {},
      authHeader(token)
    );
  };