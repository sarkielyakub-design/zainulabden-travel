const API_URL = "https://zainulabden-backend-production.up.railway.app/api/v1";

export async function getPackages() {
  try {
    const response = await fetch(
      `${API_URL}/packages`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    console.log("STATUS:", response.status);

    const data = await response.json();

    console.log("API JSON:", data);

    return data;

  } catch (error) {
    console.error("SERVICE ERROR:", error);

    throw error;
  }
}