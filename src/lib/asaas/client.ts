/** Stub Asaas — conectar chaves em produção. */

export function isAsaasConfigured(): boolean {
  return Boolean(process.env.ASAAS_API_KEY);
}

export async function createDepositPayment(_input: {
  customerName: string;
  customerPhone: string;
  value: number;
  externalReference: string;
}): Promise<{ id: string; invoiceUrl: string | null }> {
  return {
    id: `pay_stub_${Date.now()}`,
    invoiceUrl: null,
  };
}
