import type { PaymentChannel, PaymentKind, PaymentStatus, ReservationStatus } from "./types";

export const RESERVATION_STATUS_LABEL: Record<ReservationStatus, string> = {
  pending_deposit: "Aguardando sinal",
  confirmed: "Confirmada",
  cancelled: "Cancelada",
  completed: "Concluída",
  no_show: "No-show",
};

export const PAYMENT_KIND_LABEL: Record<PaymentKind, string> = {
  sinal: "Sinal 30%",
  restante: "Restante (local)",
};

export const PAYMENT_CHANNEL_LABEL: Record<PaymentChannel, string> = {
  pix: "PIX Conta Digital",
  card_machine: "Maquininha",
  manual: "Manual",
};

export const PAYMENT_STATUS_LABEL: Record<PaymentStatus, string> = {
  pending: "Pendente",
  paid: "Pago",
  failed: "Falhou",
  refunded: "Estornado",
  cancelled: "Cancelado",
};
