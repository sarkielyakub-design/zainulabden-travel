import axios from "axios";

const API =
  "https://zainulabden-backend-production.up.railway.app/api/v1";

export async function getDashboardStats(
  token: string
) {

  const response =
    await axios.get(
      `${API}/admin/stats`,
      {
        headers: {
          Authorization:
            `Bearer ${token}`,
        },
      }
    );

  return response.data;
}