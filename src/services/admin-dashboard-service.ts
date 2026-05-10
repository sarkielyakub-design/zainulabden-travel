import axios from "axios";

const API =
  "http://172.20.10.3:8000/api/v1";

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