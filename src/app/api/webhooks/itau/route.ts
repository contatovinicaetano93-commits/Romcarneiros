import { NextResponse } from "next/server";
import { applyItauPaymentEvent } from "@/lib/payments/reconcile";

/**
 * Webhook Conta Digital Itaú — sinal (PIX) e restante (máquina).
 * Validar assinatura/token quando a doc da API estiver disponível.
 *
 * Payload esperado (normalizado):
 * {
 *   status: "paid" | "failed" | "refunded" | "cancelled",
 *   externalReference: "res_xxx_sinal" | "res_xxx_restante",
 *   providerPaymentId?, nsu?, amountCents?, paidAt?
 * }
 */
export async function POST(request: Request) {
  const token = process.env.ITAU_WEBHOOK_TOKEN;
  if (token) {
    const header = request.headers.get("x-itau-webhook-token");
    if (header !== token) {
      return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
    }
  }

  const payload = (await request.json().catch(() => null)) as {
    status?: string;
    externalReference?: string;
    providerPaymentId?: string;
    nsu?: string;
    amountCents?: number;
    paidAt?: string;
  } | null;

  if (!payload?.externalReference || !payload.status) {
    return NextResponse.json({ error: "Payload inválido" }, { status: 400 });
  }

  const status = payload.status;
  if (
    status !== "paid" &&
    status !== "failed" &&
    status !== "refunded" &&
    status !== "cancelled"
  ) {
    return NextResponse.json({ error: "Status inválido" }, { status: 400 });
  }

  const result = applyItauPaymentEvent({
    status,
    externalReference: payload.externalReference,
    providerPaymentId: payload.providerPaymentId,
    nsu: payload.nsu,
    amountCents: payload.amountCents,
    paidAt: payload.paidAt,
  });

  if (!result.ok) {
    return NextResponse.json({ error: result.error }, { status: 404 });
  }

  return NextResponse.json({ received: true, entry: result.entry });
}
