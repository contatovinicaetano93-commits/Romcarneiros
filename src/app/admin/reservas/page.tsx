import { PageHeader } from "@/components/admin/PageHeader";
import { listReservations } from "@/lib/store";
import { RESERVATION_STATUS_LABEL } from "@/lib/labels";

export default function ReservasPage() {
  const reservations = listReservations();
  return (
    <div>
      <PageHeader title="Reservas" description="Pedidos recebidos pelo site." />
      <div className="mt-6 overflow-x-auto rounded-2xl border border-ink/10 bg-foam">
        <table className="min-w-full text-left text-sm">
          <thead className="border-b border-ink/10 text-ink/50">
            <tr>
              <th className="px-4 py-3 font-medium">Cliente</th>
              <th className="px-4 py-3 font-medium">Data</th>
              <th className="px-4 py-3 font-medium">Status</th>
            </tr>
          </thead>
          <tbody>
            {reservations.length === 0 ? (
              <tr>
                <td colSpan={3} className="px-4 py-6 text-ink/50">
                  Nenhuma reserva ainda.
                </td>
              </tr>
            ) : (
              reservations.map((r) => (
                <tr key={r.id} className="border-t border-ink/5">
                  <td className="px-4 py-3">{r.customerName}</td>
                  <td className="px-4 py-3">
                    {r.date} {r.startTime}
                  </td>
                  <td className="px-4 py-3">{RESERVATION_STATUS_LABEL[r.status]}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
