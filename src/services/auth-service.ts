import axios from "axios";

const API =
  "http://172.20.10.3:8000/api/v1";


// =========================
// LOGIN
// =========================
export async function loginUser(
  email: string,
  password: string
) {

  const formData =
    new URLSearchParams();

  // FastAPI OAuth2 uses username
  formData.append(
    "username",
    email
  );

  formData.append(
    "password",
    password
  );

  const response = await axios.post(
    `${API}/auth/login`,
    formData,
    {
      headers: {
        "Content-Type":
          "application/x-www-form-urlencoded",
      },
    }
  );

  localStorage.setItem(
    "token",
    response.data.access_token
  );

  return response.data;
}


// =========================
// REGISTER
// =========================
export async function registerUser(
  data: {
    full_name: string;
    email: string;
    password: string;
  }
) {

  const response = await axios.post(
    `${API}/auth/register`,
    data,
    {
      headers: {
        "Content-Type":
          "application/json",
      },
    }
  );

  return response.data;
}


// =========================
// LOGOUT
// =========================
export function logoutUser() {

  localStorage.removeItem(
    "token"
  );

  localStorage.removeItem(
    "user"
  );

  window.location.href =
    "/login";
}