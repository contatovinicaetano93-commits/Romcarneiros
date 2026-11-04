import { NextResponse } from "next/server";
import { isAsaasConfigured } from "@/lib/asaas/client";

export function GET() {
  return NextResponse.json({
    ok: true,
    service: "rom-carneiros",
    asaasConfigured: isAsaasConfigured(),
    timestamp: new Date().toISOString(),
  });
}
