import { buildApiUrl } from "./config";
import { isTokenExpired, parseJwt } from "./jwt";

const ACCESS_TOKEN_KEY = "access_token";

type AuthResponse = {
  access_token?: string;
};

type TelegramWebApp = {
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

  localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
  return accessToken;
}

function getTelegramInitData() {
  const webApp = window.Telegram?.WebApp;
  webApp?.ready?.();
  webApp?.expand?.();

  return webApp?.initData?.trim() || "";
}

export async function tryRefreshToken(): Promise<string | null> {
  try {
    const response = await fetch(buildApiUrl("auth/refresh"), {
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
  const initData = getTelegramInitData();
  if (!initData) {
    console.warn(
      "Telegram initData is empty. Open the app inside Telegram WebApp.",
    );
    return null;
  }

  try {
    const response = await fetch(buildApiUrl("auth/init"), {
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
  const token = localStorage.getItem(ACCESS_TOKEN_KEY);

  if (token && !parseJwt(token)) {
    localStorage.removeItem(ACCESS_TOKEN_KEY);
  }

  if (token && !isTokenExpired(token)) {
    return token;
  }

  return (await tryRefreshToken()) || initTelegramAuth();
}

export function clearAccessToken() {
  localStorage.removeItem(ACCESS_TOKEN_KEY);
}
