import { itauProvider } from "@/lib/payments/itau/client";
import type { CreateChargeInput, CreateChargeResult, PaymentProvider } from "@/lib/payments/types";

/** Provedor único de liquidação: Conta Digital Itaú. */
export const paymentProvider: PaymentProvider = itauProvider;

export function isPaymentsConfigured(): boolean {
  return paymentProvider.isConfigured();
}

export async function createCharge(input: CreateChargeInput): Promise<CreateChargeResult> {
  return paymentProvider.createCharge(input);
}

export {
  balanceExternalReference,
  depositExternalReference,
} from "@/lib/payments/types";
