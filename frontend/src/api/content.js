import axios from "axios";

const useStaticJson =
  import.meta.env.VITE_CONTENT_SOURCE === "static";

export async function fetchContent() {
  if (useStaticJson) {
    const base = import.meta.env.BASE_URL || "/";
    const prefix = base.endsWith("/") ? base : `${base}/`;
    const url = `${prefix}content.json`;
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to load ${url}`);
    }
    return response.json();
  }

  const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:3000",
    timeout: 10000,
  });
  const { data } = await api.get("/api/content");
  return data;
}
