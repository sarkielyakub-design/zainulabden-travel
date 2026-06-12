import axios from "axios";

const API_URL = "https://zainulabden-backend-production.up.railway.app/api/v1"

export async function getPackages() {
  const response = await axios.get(
    `${API_URL}/packages`
  );

  return response.data;
}