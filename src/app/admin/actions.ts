"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { ADMIN_COOKIE, passwordMatches, sessionToken } from "@/lib/admin-auth";

export async function signInAdmin(formData: FormData) {
  const given = String(formData.get("password") ?? "");
  const token = sessionToken();

  if (!token || !passwordMatches(given)) {
    redirect(token ? "/admin/reservas?erro=1" : "/admin/reservas?erro=config");
  }

  const jar = await cookies();
  jar.set(ADMIN_COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 12,
  });

  redirect("/admin/reservas");
}
