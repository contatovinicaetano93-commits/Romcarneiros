import type { Reservation } from "./types";

/** Store em memória — substituir por Postgres na próxima fase. */
const reservations: Reservation[] = [];

export function listReservations(): Reservation[] {
  return [...reservations].sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

export function addReservation(reservation: Reservation): Reservation {
  reservations.unshift(reservation);
  return reservation;
}
