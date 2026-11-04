import type { ReservationStatus } from "./types";

export const RESERVATION_STATUS_LABEL: Record<ReservationStatus, string> = {
  pending_deposit: "Aguardando sinal",
  confirmed: "Confirmada",
  cancelled: "Cancelada",
  completed: "Concluída",
  no_show: "No-show",
};
