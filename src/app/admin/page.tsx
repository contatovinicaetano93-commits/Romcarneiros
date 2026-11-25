import { OperationFlow } from "@/components/admin/OperationFlow";
import { PageHeader } from "@/components/admin/PageHeader";
import { KpiCard } from "@/components/admin/KpiCard";
import { formatBRL } from "@/lib/format";
import {
  countReservationsByStatus,
  listReservations,
  sumPaidDepositCents,
} from "@/lib/store";

export default function AdminHomePage() {
  const reservations = listReservations();
  const confirmed = countReservationsByStatus("confirmed");
  const noShows = countReservationsByStatus("no_show");
  const depositPaid = sumPaidDepositCents();

  return (
    <div className="space-y-8">
      <PageHeader title="Visão geral" description="Painel da operação Rom Carneiros." />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <KpiCard label="Reservas" value={String(reservations.length)} />
        <KpiCard label="Confirmadas" value={String(confirmed)} />
        <KpiCard label="Sinal recebido" value={formatBRL(depositPaid)} />
        <KpiCard label="No-shows" value={String(noShows)} />
      </div>
      <OperationFlow />
    </div>
  );
}
