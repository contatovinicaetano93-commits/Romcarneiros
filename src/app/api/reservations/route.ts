import { NextResponse } from "next/server";
import { hasAdminSession } from "@/lib/admin-auth";
import { OPERATION } from "@/lib/constants";
import { createCharge, depositExternalReference } from "@/lib/payments";
import { addLedgerEntry, addReservation, listReservations } from "@/lib/store";
import type { LedgerEntry, Reservation } from "@/lib/types";

export async function GET() {
  if (!(await hasAdminSession())) {
    return NextResponse.json(
      { error: "Não autorizado" },
      { status: 401, headers: { "Cache-Control": "no-store" } },
    );
  }

  return NextResponse.json(
    { reservations: listReservations() },
    { headers: { "Cache-Control": "no-store" } },
  );
}

export async function POST(request: Request) {
  const body = (await request.json()) as Partial<Reservation> & {
    customerName?: string;
    customerPhone?: string;
    serviceIds?: string[];
    date?: string;
    startTime?: string;
    totalCents?: number | null;
  };

  if (!body.customerName || !body.customerPhone || !body.serviceIds?.length || !body.date) {
    return NextResponse.json({ error: "Dados incompletos" }, { status: 400 });
  }

  const reservationId = `res_${Date.now()}`;
  const totalCents = body.totalCents ?? null;
  const depositCents =
    totalCents != null ? Math.round((totalCents * OPERATION.depositPercent) / 100) : 0;
  const externalReference = depositExternalReference(reservationId);

  const charge = await createCharge({
    reservationId,
    kind: "sinal",
    channel: "pix",
    amountCents: depositCents,
    customerName: body.customerName,
    customerPhone: body.customerPhone,
    externalReference,
  });

  const reservation: Reservation = {
    id: reservationId,
    customerName: body.customerName,
    customerPhone: body.customerPhone,
    customerEmail: body.customerEmail,
    serviceIds: body.serviceIds,
    date: body.date,
    startTime: body.startTime ?? "10:00",
    status: "pending_deposit",
    depositCents,
    totalCents,
    depositExternalReference: externalReference,
    notes: body.notes,
    createdAt: new Date().toISOString(),
  };

  addReservation(reservation);

  const ledgerEntry: LedgerEntry = {
    id: `led_${Date.now()}`,
    reservationId,
    kind: "sinal",
    channel: "pix",
    status: "pending",
    amountCents: depositCents,
    externalReference,
    providerPaymentId: charge.providerPaymentId,
    nsu: null,
    paidAt: null,
    reconciledAt: null,
    createdAt: new Date().toISOString(),
  };
  addLedgerEntry(ledgerEntry);

  return NextResponse.json(
    {
      reservation,
      deposit: {
        externalReference,
        providerPaymentId: charge.providerPaymentId,
        paymentUrl: charge.paymentUrl,
        amountCents: depositCents,
      },
    },
    { status: 201 },
  );
}
