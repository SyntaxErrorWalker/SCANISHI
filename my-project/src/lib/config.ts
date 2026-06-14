const API_URL = import.meta.env.VITE_BACKEND_URL?.trim() || "";
const BOT_USERNAME = import.meta.env.VITE_BOT_USERNAME?.trim() || "";

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
