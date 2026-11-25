import { NextResponse } from "next/server";
import { isPaymentsConfigured } from "@/lib/payments";

export function GET() {
  return NextResponse.json({
    ok: true,
    service: "rom-carneiros",
    paymentProvider: "itau",
    itauConfigured: isPaymentsConfigured(),
    timestamp: new Date().toISOString(),
  });
}
