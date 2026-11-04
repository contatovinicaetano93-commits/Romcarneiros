import { OperationFlow } from "@/components/admin/OperationFlow";
import { PageHeader } from "@/components/admin/PageHeader";
import { KpiCard } from "@/components/admin/KpiCard";
import { listReservations } from "@/lib/store";

export default function AdminHomePage() {
  const reservations = listReservations();
  return (
    <div className="space-y-8">
      <PageHeader title="Visão geral" description="Painel da operação Rom Carneiros." />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <KpiCard label="Reservas" value={String(reservations.length)} />
        <KpiCard label="Confirmadas" value="0" />
        <KpiCard label="Sinal recebido" value="R$ 0" />
        <KpiCard label="No-shows" value="0" />
      </div>
      <OperationFlow />
    </div>
  );
}
