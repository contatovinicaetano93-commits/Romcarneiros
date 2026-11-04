import { NextResponse } from "next/server";

/**
 * Webhook Asaas — confirmar pagamento do sinal / quitação.
 * Eventos alvo: PAYMENT_RECEIVED, PAYMENT_CONFIRMED, PAYMENT_REFUNDED…
 */
export async function POST(request: Request) {
  const payload = await request.json().catch(() => null);

  if (!payload) {
    return NextResponse.json({ error: "Payload inválido" }, { status: 400 });
  }

  // TODO: validar token do webhook Asaas e atualizar reservation/payment no banco
  console.info("[asaas webhook]", JSON.stringify(payload));

  return NextResponse.json({ received: true });
}
