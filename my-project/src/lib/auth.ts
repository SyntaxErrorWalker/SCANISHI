import { buildApiUrl, DEBUG } from "./config";
import { isTokenExpired, parseJwt } from "./jwt";
import type { UserData } from "./user";

const ACCESS_TOKEN_KEY = "access_token";
const AUTH_INIT_PATH = "api/v1/auth/init";
const AUTH_REFRESH_PATH = "api/v1/auth/refresh";
const ZAGLUSHKA =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0Z19pZCI6Mzk3Mjg2NjA2LCJpZCI6MSwibm90aWZpY2F0aW9uc19lbmFibGVkIjp0cnVlLCJzZWNvbmRfbmFtZSI6IiIsInBob3RvX3VybCI6Imh0dHBzOi8vdC5tZS9pL3VzZXJwaWMvMzIwL2twT0xydzdid3k1VFMtN3gySjBtZld6LUlZYTY4Y3o1S0ZCZ3F1SFEtVTQuc3ZnIiwidXNlcm5hbWUiOiJNaWNrZXlTaGlkZSIsImlzX3ByaXZhdGUiOmZhbHNlLCJmaXJzdF9uYW1lIjoie25pY2tuYW1lfSIsImlzX3ByZW1pdW0iOmZhbHNlLCJyb2xlIjoiQURNSU4iLCJleHAiOjE3ODIwMzE2ODN9.CuQnxs0IxbxlWwVGtiLB86J5bYIwO_lP7jo9NiIA0RI";
let accessTokenCache: string | null = null;
let userDataCache: UserData | null = null;
type AuthResponse = {
  access_token?: string;
};

type TelegramWebApp = {
  showScanQrPopup(
    arg0: { text: string },
    arg1: (text: any) => boolean,
  ): unknown;
  initData?: string;
  ready?: () => void;
  expand?: () => void;
};

declare global {
  interface Window {
    Telegram?: {
      WebApp?: TelegramWebApp;
    };
  }
}

async function readAuthResponse(response: Response) {
  if (!response.ok) return null;

  const data = (await response.json().catch(() => null)) as AuthResponse | null;
  const accessToken = data?.access_token;
  if (!accessToken) return null;

  accessTokenCache = accessToken;
  userDataCache = parseJwt(accessToken) as UserData | null;
  localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
  return accessToken;
}

function syncTokenCache(token: string | null) {
  accessTokenCache = token;
  userDataCache = token ? (parseJwt(token) as UserData | null) : null;
}

function getTelegramInitData() {
  const webApp = window.Telegram?.WebApp;
  webApp?.ready?.();
  webApp?.expand?.();

  return webApp?.initData?.trim() || "";
}

export async function tryRefreshToken(): Promise<string | null> {
  try {
    const response = await fetch(buildApiUrl(AUTH_REFRESH_PATH), {
      method: "POST",
      credentials: "include",
    });

    return readAuthResponse(response);
  } catch (error) {
    console.error("Token refresh failed:", error);
    return null;
  }
}

export async function initTelegramAuth(): Promise<string | null> {
  if (DEBUG === true) {
    syncTokenCache(ZAGLUSHKA);
    localStorage.setItem(ACCESS_TOKEN_KEY, ZAGLUSHKA);
    return ZAGLUSHKA;
  }

  const initData = getTelegramInitData();
  if (!initData) {
    console.warn(
      "Telegram initData is empty. Open the app inside Telegram WebApp.",
    );
    return null;
  }

  try {
    const response = await fetch(buildApiUrl(AUTH_INIT_PATH), {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({ tg_web_app_data: initData }),
      credentials: "include",
    });

    return readAuthResponse(response);
  } catch (error) {
    console.error("Telegram auth init failed:", error);
    return null;
  }
}

export async function getValidAccessToken(): Promise<string | null> {
  if (DEBUG === true) {
    syncTokenCache(ZAGLUSHKA);
    localStorage.setItem(ACCESS_TOKEN_KEY, ZAGLUSHKA);
    return ZAGLUSHKA;
  }

  const token = accessTokenCache ?? localStorage.getItem(ACCESS_TOKEN_KEY);

  if (token && !parseJwt(token)) {
    syncTokenCache(null);
    localStorage.removeItem(ACCESS_TOKEN_KEY);
  }

  if (token && !isTokenExpired(token)) {
    syncTokenCache(token);
    return token;
  }

  return (await tryRefreshToken()) || initTelegramAuth();
}

export function getCachedUserData() {
  return userDataCache;
}

export function getCachedAccessToken() {
  return accessTokenCache;
}

export function clearAccessToken() {
  syncTokenCache(null);
  localStorage.removeItem(ACCESS_TOKEN_KEY);
}
