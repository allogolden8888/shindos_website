import crypto from "crypto";
import { cookies } from "next/headers";

const sessionCookieName = "admin_session";
const cookieMaxAge = 60 * 60 * 8;

export function hashPassword(value) {
  return crypto.createHash("sha256").update(value).digest("hex");
}

export async function setAdminSession(username) {
  const token = crypto
    .createHash("sha256")
    .update(`${username}:${Date.now()}:${process.env.ADMIN_SESSION_SECRET || "dev-secret"}`)
    .digest("hex");

  const cookieStore = await cookies();
  cookieStore.set(sessionCookieName, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: false,
    path: "/",
    maxAge: cookieMaxAge,
  });
}

export async function clearAdminSession() {
  const cookieStore = await cookies();
  cookieStore.delete(sessionCookieName);
}

export async function hasAdminSession() {
  const cookieStore = await cookies();
  const token = cookieStore.get(sessionCookieName)?.value;
  return Boolean(token);
}
