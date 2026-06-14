import { buildApiUrl, getTelegramBotUrl } from "./config";
import { isTokenExpired, parseJwt } from "./jwt";

const ACCESS_TOKEN_KEY = "access_token";
const AUTH_INIT_PATH = "api/v1/auth/init";
const AUTH_REFRESH_PATH = "api/v1/auth/refresh";

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

  return webApp?.initData?.trim() || getTelegramInitDataFromUrl();
}

function getTelegramInitDataFromUrl() {
  const sources = [window.location.hash, window.location.search];

  for (const source of sources) {
    const params = new URLSearchParams(source.replace(/^[#?]/, ""));
    const initData = params.get("tgWebAppData");
    if (initData) return initData;
  }

  return "";
}

function redirectToTelegramBot() {
  const botUrl = getTelegramBotUrl();
  if (botUrl) {
    window.location.href = botUrl;
  }
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
  const initData = getTelegramInitData();
  if (!initData) {
    console.warn(
      "Telegram initData is empty. Open the app inside Telegram WebApp.",
    );
    redirectToTelegramBot();
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
