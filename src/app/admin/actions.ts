"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { ADMIN_COOKIE, hasAdminSession, passwordMatches, sessionToken } from "@/lib/admin-auth";
import { reconcileDailyExtract } from "@/lib/payments/extract";
import { settleRestanteManually } from "@/lib/payments/settle";

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

export async function settleRestanteAction(formData: FormData) {
  if (!(await hasAdminSession())) {
    redirect("/admin/reservas?erro=1");
  }

  const reservationId = String(formData.get("reservationId") ?? "");
  const amountRaw = String(formData.get("amountBrl") ?? "").trim();
  const nsu = String(formData.get("nsu") ?? "").trim();

  let amountCents: number | undefined;
  if (amountRaw) {
    const normalized = amountRaw.replace(/\./g, "").replace(",", ".");
    const value = Number(normalized);
    if (!Number.isFinite(value) || value <= 0) {
      redirect(`/admin/caixa?baixa=erro&msg=${encodeURIComponent("Valor inválido")}`);
    }
    amountCents = Math.round(value * 100);
  }

  const result = settleRestanteManually({
    reservationId,
    amountCents,
    nsu: nsu || undefined,
    channel: "card_machine",
  });

  if (!result.ok) {
    redirect(
      `/admin/caixa?baixa=erro&msg=${encodeURIComponent(result.error ?? "Falha na baixa")}`,
    );
  }

  redirect("/admin/caixa?baixa=ok");
}

export async function importExtractAction(formData: FormData) {
  if (!(await hasAdminSession())) {
    redirect("/admin/caixa?erro=1");
  }

  const file = formData.get("extract");
  let csvText = String(formData.get("extractText") ?? "").trim();

  if (file && typeof file === "object" && "text" in file && typeof file.text === "function") {
    const uploaded = await file.text();
    if (uploaded.trim()) csvText = uploaded.trim();
  }

  if (!csvText) {
    redirect(`/admin/caixa?extrato=erro&msg=${encodeURIComponent("Cole ou envie o CSV do dia")}`);
  }

  const result = reconcileDailyExtract(csvText);
  if (!result.ok) {
    redirect(
      `/admin/caixa?extrato=erro&msg=${encodeURIComponent(result.error ?? "Falha na conciliação")}`,
    );
  }

  redirect(
    `/admin/caixa?extrato=ok&matched=${result.matched}&unmatched=${result.unmatched}`,
  );
}
