export type ServiceCategory = "cabelo" | "rosto" | "unhas";

export type Service = {
  id: string;
  slug: string;
  name: string;
  category: ServiceCategory;
  description: string;
  priceCents: number | null;
  durationMinutes: number | null;
  active: boolean;
};

export type ReservationStatus =
  | "pending_deposit"
  | "confirmed"
  | "cancelled"
  | "completed"
  | "no_show";

export type Reservation = {
  id: string;
  customerName: string;
  customerPhone: string;
  customerEmail?: string;
  serviceIds: string[];
  date: string;
  startTime: string;
  status: ReservationStatus;
  depositCents: number;
  totalCents: number | null;
  notes?: string;
  createdAt: string;
};
