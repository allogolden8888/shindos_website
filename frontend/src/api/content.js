import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:3000",
  timeout: 10000,
});

export async function fetchContent() {
  const { data } = await api.get("/api/content");
  return data;
}
