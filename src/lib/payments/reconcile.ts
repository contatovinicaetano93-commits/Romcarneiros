import { balanceExternalReference } from "@/lib/payments/types";
import {
  addLedgerEntry,
  findLedgerByExternalReference,
  getReservation,
  updateLedgerStatus,
  updateReservation,
} from "@/lib/store";
import type { LedgerEntry, PaymentKind } from "@/lib/types";

export type ItauPaymentEvent = {
  /** paid | failed | refunded | cancelled */
  status: "paid" | "failed" | "refunded" | "cancelled";
  externalReference: string;
  providerPaymentId?: string;
  nsu?: string;
  amountCents?: number;
  paidAt?: string;
};

function ensureRestanteEntry(reservationId: string, totalCents: number, depositCents: number) {
  const externalReference = balanceExternalReference(reservationId);
  if (findLedgerByExternalReference(externalReference)) return;

  const amountCents = Math.max(totalCents - depositCents, 0);
  if (amountCents <= 0) return;

  addLedgerEntry({
    id: `led_${Date.now()}_rest`,
    reservationId,
    kind: "restante",
    channel: "card_machine",
    status: "pending",
    amountCents,
    externalReference,
    providerPaymentId: null,
    nsu: null,
    paidAt: null,
    createdAt: new Date().toISOString(),
  });
}

/**
 * Aplica evento Itaú (webhook ou extrato) ao ledger e à reserva.
 * `externalReference` no formato res_xxx_sinal | res_xxx_restante.
 */
export function applyItauPaymentEvent(event: ItauPaymentEvent): {
  ok: boolean;
  entry?: LedgerEntry;
  error?: string;
} {
  const entry = findLedgerByExternalReference(event.externalReference);
  if (!entry) {
    return { ok: false, error: "Lançamento não encontrado para a referência" };
  }

  const paidAt = event.status === "paid" ? (event.paidAt ?? new Date().toISOString()) : null;

  const updated = updateLedgerStatus(entry.id, event.status, {
    paidAt,
    nsu: event.nsu ?? entry.nsu,
    providerPaymentId: event.providerPaymentId ?? entry.providerPaymentId,
  });

  if (!updated) {
    return { ok: false, error: "Falha ao atualizar lançamento" };
  }

  if (event.status === "paid" && updated.kind === "sinal") {
    updateReservation(updated.reservationId, {
      status: "confirmed",
      depositCents: updated.amountCents,
    });
    const reservation = getReservation(updated.reservationId);
    if (reservation?.totalCents != null) {
      ensureRestanteEntry(
        updated.reservationId,
        reservation.totalCents,
        updated.amountCents,
      );
    }
  }

  if (event.status === "paid" && updated.kind === "restante") {
    const reservation = getReservation(updated.reservationId);
    if (reservation && (reservation.status === "confirmed" || reservation.status === "pending_deposit")) {
      updateReservation(updated.reservationId, { status: "completed" });
    }
  }

  if (event.status === "refunded" && updated.kind === "sinal") {
    updateReservation(updated.reservationId, {
      status: "cancelled",
      depositCents: 0,
    });
  }

  return { ok: true, entry: updated };
}

export function assertPaymentKind(value: string): PaymentKind {
  if (value === "sinal" || value === "restante") return value;
  throw new Error(`PaymentKind inválido: ${value}`);
}
