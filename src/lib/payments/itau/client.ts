import type { CreateChargeInput, CreateChargeResult, PaymentProvider } from "@/lib/payments/types";

/**
 * Cliente Itaú Conta Digital — stub até credenciais/API da reunião técnica.
 * Sinal (PIX) e restante (máquina) liquidam na mesma conta.
 */
export function isItauConfigured(): boolean {
  return Boolean(
    process.env.ITAU_CLIENT_ID &&
      process.env.ITAU_CLIENT_SECRET &&
      process.env.ITAU_ACCOUNT_ID,
  );
}

export async function createItauCharge(input: CreateChargeInput): Promise<CreateChargeResult> {
  // Quando a API estiver disponível: criar PIX dinâmico (sinal) ou registrar expectativa de TEF/máquina (restante).
  return {
    providerPaymentId: `itau_stub_${input.kind}_${Date.now()}`,
    paymentUrl: null,
    externalReference: input.externalReference,
  };
}

export const itauProvider: PaymentProvider = {
  id: "itau",
  isConfigured: isItauConfigured,
  createCharge: createItauCharge,
};
