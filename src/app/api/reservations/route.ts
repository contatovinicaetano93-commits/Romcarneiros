import { NextResponse } from "next/server";
import { addReservation, listReservations } from "@/lib/store";
import type { Reservation } from "@/lib/types";

export async function GET() {
  return NextResponse.json({ reservations: listReservations() });
}

export async function POST(request: Request) {
  const body = (await request.json()) as Partial<Reservation> & {
    customerName?: string;
    customerPhone?: string;
    serviceIds?: string[];
    date?: string;
    startTime?: string;
  };

  if (!body.customerName || !body.customerPhone || !body.serviceIds?.length || !body.date) {
    return NextResponse.json({ error: "Dados incompletos" }, { status: 400 });
  }

  const reservation: Reservation = {
    id: `res_${Date.now()}`,
    customerName: body.customerName,
    customerPhone: body.customerPhone,
    customerEmail: body.customerEmail,
    serviceIds: body.serviceIds,
    date: body.date,
    startTime: body.startTime ?? "10:00",
    status: "pending_deposit",
    depositCents: 0,
    totalCents: null,
    notes: body.notes,
    createdAt: new Date().toISOString(),
  };

  addReservation(reservation);
  return NextResponse.json({ reservation }, { status: 201 });
}
