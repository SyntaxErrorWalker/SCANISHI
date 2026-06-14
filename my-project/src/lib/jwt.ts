export type JwtPayload = {
  exp?: number;
  [key: string]: unknown;
};

export function parseJwt(token: string): JwtPayload | null {
  try {
    const [, payload] = token.split(".");
    if (!payload) return null;

    const normalized = payload.replace(/-/g, "+").replace(/_/g, "/");
    const json = decodeURIComponent(
      atob(normalized)
        .split("")
        .map((char) => `%${char.charCodeAt(0).toString(16).padStart(2, "0")}`)
        .join(""),
    );

    return JSON.parse(json) as JwtPayload;
  } catch {
    return null;
  }
}

export function isTokenExpired(token: string, skewSeconds = 30) {
  const payload = parseJwt(token);
  if (!payload?.exp) return true;

  return payload.exp <= Math.floor(Date.now() / 1000) + skewSeconds;
}
