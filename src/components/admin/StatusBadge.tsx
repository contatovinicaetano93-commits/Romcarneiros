import type { ReservationStatus } from "@/lib/types";
import { RESERVATION_STATUS_LABEL } from "@/lib/labels";

const RESERVATION_TONE: Record<ReservationStatus, string> = {
  pending_deposit: "bg-amber-100 text-amber-900",
  confirmed: "bg-emerald-100 text-emerald-900",
  cancelled: "bg-stone-100 text-stone-500",
  completed: "bg-ink/10 text-ink",
  no_show: "bg-coral/15 text-coral",
};

export function ReservationStatusBadge({ status }: { status: ReservationStatus }) {
  return (
    <span
      className={`inline-flex rounded-full px-2.5 py-0.5 text-[11px] font-semibold tracking-wide ${RESERVATION_TONE[status]}`}
    >
      {RESERVATION_STATUS_LABEL[status]}
    </span>
  );
}

export function StatusBadge({ status }: { status: ReservationStatus }) {
  return <ReservationStatusBadge status={status} />;
}
