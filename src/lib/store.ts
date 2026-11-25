import type { LedgerEntry, PaymentStatus, Reservation, ReservationStatus } from "./types";

/** Store em memória — substituir por Postgres na próxima fase. */
const reservations: Reservation[] = [];
const ledger: LedgerEntry[] = [];

export function listReservations(): Reservation[] {
  return [...reservations].sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

export function getReservation(id: string): Reservation | undefined {
  return reservations.find((r) => r.id === id);
}

export function addReservation(reservation: Reservation): Reservation {
  reservations.unshift(reservation);
  return reservation;
}

export function updateReservation(
  id: string,
  patch: Partial<Pick<Reservation, "status" | "depositCents" | "totalCents" | "depositExternalReference">>,
): Reservation | undefined {
  const current = reservations.find((r) => r.id === id);
  if (!current) return undefined;
  Object.assign(current, patch);
  return current;
}

export function listLedgerEntries(): LedgerEntry[] {
  return [...ledger].sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

export function addLedgerEntry(entry: LedgerEntry): LedgerEntry {
  ledger.unshift(entry);
  return entry;
}

export function findLedgerByExternalReference(externalReference: string): LedgerEntry | undefined {
  return ledger.find((e) => e.externalReference === externalReference);
}

export function updateLedgerStatus(
  id: string,
  status: PaymentStatus,
  extras?: { paidAt?: string | null; nsu?: string | null; providerPaymentId?: string | null },
): LedgerEntry | undefined {
  const entry = ledger.find((e) => e.id === id);
  if (!entry) return undefined;
  entry.status = status;
  if (extras?.paidAt !== undefined) entry.paidAt = extras.paidAt;
  if (extras?.nsu !== undefined) entry.nsu = extras.nsu;
  if (extras?.providerPaymentId !== undefined) {
    entry.providerPaymentId = extras.providerPaymentId;
  }
  return entry;
}

export function sumPaidDepositCents(): number {
  return ledger
    .filter((e) => e.kind === "sinal" && e.status === "paid")
    .reduce((sum, e) => sum + e.amountCents, 0);
}

export function countReservationsByStatus(status: ReservationStatus): number {
  return reservations.filter((r) => r.status === status).length;
}
