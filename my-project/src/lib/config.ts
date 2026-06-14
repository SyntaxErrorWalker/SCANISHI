const API_URL = import.meta.env.VITE_BACKEND_URL?.trim() || "";

export function buildApiUrl(path: string) {
  if (!API_URL) {
    throw new Error("VITE_BACKEND_URL is not configured");
  }

  const baseUrl = API_URL.endsWith("/") ? API_URL : `${API_URL}/`;
  const cleanPath = path.startsWith("/") ? path.slice(1) : path;

  return new URL(cleanPath, baseUrl).toString();
}
