export type ServiceCategory = "cabelo" | "rosto" | "unhas";

export type Service = {
  id: string;
  slug: string;
  name: string;
  category: ServiceCategory;
  description: string;
  priceCents: number | null;
  durationMinutes: number | null;
  active: boolean;
};

export type ReservationStatus =
  | "pending_deposit"
  | "confirmed"
  | "cancelled"
  | "completed"
  | "no_show";

export type Reservation = {
  id: string;
  customerName: string;
  customerPhone: string;
  customerEmail?: string;
  serviceIds: string[];
  date: string;
  startTime: string;
  status: ReservationStatus;
  depositCents: number;
  totalCents: number | null;
  /** Referência externa Itaú do sinal (ex.: res_xxx_sinal). */
  depositExternalReference?: string;
  notes?: string;
  createdAt: string;
};

/** Tipo do lançamento no Caixa — sinal online ou restante no local. */
export type PaymentKind = "sinal" | "restante";

/** Canal de liquidação na Conta Digital Itaú. */
export type PaymentChannel = "pix" | "card_machine" | "manual";

export type PaymentStatus = "pending" | "paid" | "failed" | "refunded" | "cancelled";

/**
 * Lançamento de caixa (ledger).
 * Sinal e restante liquidam na mesma Conta Digital Itaú;
 * `externalReference` separa os dois na conciliação.
 */
export type LedgerEntry = {
  id: string;
  reservationId: string;
  kind: PaymentKind;
  channel: PaymentChannel;
  status: PaymentStatus;
  amountCents: number;
  externalReference: string;
  providerPaymentId: string | null;
  nsu: string | null;
  paidAt: string | null;
  createdAt: string;
};
