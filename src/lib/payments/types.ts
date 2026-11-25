import type { PaymentChannel, PaymentKind } from "@/lib/types";

export type CreateChargeInput = {
  reservationId: string;
  kind: PaymentKind;
  channel: PaymentChannel;
  amountCents: number;
  customerName: string;
  customerPhone: string;
  externalReference: string;
};

export type CreateChargeResult = {
  providerPaymentId: string;
  /** URL/QR PIX quando a API Itaú estiver ligada; null no stub. */
  paymentUrl: string | null;
  externalReference: string;
};

export type PaymentProvider = {
  id: "itau";
  isConfigured: () => boolean;
  createCharge: (input: CreateChargeInput) => Promise<CreateChargeResult>;
};

export function depositExternalReference(reservationId: string): string {
  return `${reservationId}_sinal`;
}

export function balanceExternalReference(reservationId: string): string {
  return `${reservationId}_restante`;
}
