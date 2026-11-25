import { balanceExternalReference } from "@/lib/payments/types";
import {
  addLedgerEntry,
  findPendingRestante,
  getReservation,
  updateLedgerStatus,
  updateReservation,
} from "@/lib/store";
import type { LedgerEntry, PaymentChannel } from "@/lib/types";

export type SettleRestanteInput = {
  reservationId: string;
  /** Em centavos. Se omitido, usa o valor do lançamento pendente ou total − sinal. */
  amountCents?: number;
  nsu?: string;
  channel?: Extract<PaymentChannel, "card_machine" | "manual" | "pix">;
};

/**
 * Baixa manual do restante (70%) — Amanda na chegada do cliente.
 * Débito/crédito na maquininha não entram por webhook; a gestora confirma aqui.
 */
export function settleRestanteManually(input: SettleRestanteInput): {
  ok: boolean;
  entry?: LedgerEntry;
  error?: string;
} {
  const reservation = getReservation(input.reservationId);
  if (!reservation) {
    return { ok: false, error: "Reserva não encontrada" };
  }

  if (reservation.status === "cancelled" || reservation.status === "no_show") {
    return { ok: false, error: "Reserva cancelada ou no-show" };
  }

  let entry = findPendingRestante(input.reservationId);
  const channel = input.channel ?? "card_machine";

  if (!entry) {
    const fallbackAmount =
      input.amountCents ??
      (reservation.totalCents != null
        ? Math.max(reservation.totalCents - reservation.depositCents, 0)
        : 0);

    if (fallbackAmount <= 0) {
      return {
        ok: false,
        error: "Informe o valor do restante (total ainda sem preço ou já quitado)",
      };
    }

    entry = addLedgerEntry({
      id: `led_${Date.now()}_rest`,
      reservationId: input.reservationId,
      kind: "restante",
      channel,
      status: "pending",
      amountCents: fallbackAmount,
      externalReference: balanceExternalReference(input.reservationId),
      providerPaymentId: null,
      nsu: null,
      paidAt: null,
      reconciledAt: null,
      createdAt: new Date().toISOString(),
    });
  }

  const amountCents = input.amountCents ?? entry.amountCents;
  const updated = updateLedgerStatus(entry.id, "paid", {
    paidAt: new Date().toISOString(),
    nsu: input.nsu?.trim() || entry.nsu,
    channel,
    amountCents,
  });

  if (!updated) {
    return { ok: false, error: "Falha ao baixar o restante" };
  }

  updateReservation(input.reservationId, { status: "completed" });
  return { ok: true, entry: updated };
}
