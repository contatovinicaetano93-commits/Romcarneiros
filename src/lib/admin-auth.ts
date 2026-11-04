import { createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";

export const ADMIN_COOKIE = "rom_admin";

const SESSION_CONTEXT = "rom-carneiros-admin-session";

function adminPassword(): string | undefined {
  const value = process.env.ADMIN_PASSWORD;
  return value ? value : undefined;
}

export function passwordMatches(given: string): boolean {
  const secret = adminPassword();
  if (!secret) return false;

  const left = createHmac("sha256", "rom-admin-login").update(given).digest();
  const right = createHmac("sha256", "rom-admin-login").update(secret).digest();
  return timingSafeEqual(left, right);
}

export function sessionToken(): string | null {
  const secret = adminPassword();
  if (!secret) return null;
  return createHmac("sha256", secret).update(SESSION_CONTEXT).digest("hex");
}

export function sessionMatches(value: string | undefined): boolean {
  const expected = sessionToken();
  if (!expected || !value) return false;

  const left = Buffer.from(value);
  const right = Buffer.from(expected);
  if (left.length !== right.length) return false;
  return timingSafeEqual(left, right);
}

export async function hasAdminSession(): Promise<boolean> {
  const jar = await cookies();
  return sessionMatches(jar.get(ADMIN_COOKIE)?.value);
}
