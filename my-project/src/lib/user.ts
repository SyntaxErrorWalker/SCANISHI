import type { JwtPayload } from "./jwt";

export type UserData = JwtPayload & {
  first_name?: string;
  username?: string;
  photo_url?: string;
};

export function getUserDisplayName(userData: UserData | null) {
  return typeof userData?.first_name === "string" && userData.first_name.trim()
    ? userData.first_name
    : "Нэйт";
}

export function getUserUsername(userData: UserData | null) {
  return typeof userData?.username === "string" && userData.username.trim()
    ? `@${userData.username}`
    : "@nate_void";
}
export function getPhotoUrl(userData: UserData | null) {
  return typeof userData?.photo_url === "string" && userData.photo_url.trim()
    ? userData.photo_url
    : "";
}
