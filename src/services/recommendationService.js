const API_URL = "http://localhost:8000/api";

export async function getRecommendations(userId) {
  try {
    const res = await fetch(`${API_URL}/recommend?user_id=${userId}`);
    return await res.json();
  } catch (err) {
    console.error("API Error:", err);
    return null;
  }
}
