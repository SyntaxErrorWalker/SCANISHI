import type { JwtPayload } from "./jwt";

export type UserData = JwtPayload & {
  first_name?: string;
  username?: string;
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
