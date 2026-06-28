const API_URL =
  import.meta.env.VITE_BACKEND_URL?.trim() ||
  "https://test.backend.skanishi.shide.world/";
const BOT_USERNAME = import.meta.env.VITE_BOT_USERNAME?.trim() || "";
const DEBUG_FLAG = import.meta.env.VITE_DEBUG || "true";

export const DEBUG =
  typeof DEBUG_FLAG === "string" &&
  ["1", "true", "yes", "on"].includes(DEBUG_FLAG.trim().toLowerCase());

export function buildApiUrl(path: string) {
  if (!API_URL) {
    throw new Error("VITE_BACKEND_URL is not configured");
  }

  const baseUrl = API_URL.endsWith("/") ? API_URL : `${API_URL}/`;
  const cleanPath = path.startsWith("/") ? path.slice(1) : path;

  return new URL(cleanPath, baseUrl).toString();
}

export function getTelegramBotUrl() {
  if (!BOT_USERNAME) return null;

  const username = BOT_USERNAME.replace(/^@/, "");
  return `https://t.me/${username}?startapp=auth`;
}
