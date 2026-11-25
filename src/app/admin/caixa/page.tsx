import { PageHeader } from "@/components/admin/PageHeader";
import { formatBRL } from "@/lib/format";
import {
  PAYMENT_CHANNEL_LABEL,
  PAYMENT_KIND_LABEL,
  PAYMENT_STATUS_LABEL,
} from "@/lib/labels";
import { listLedgerEntries } from "@/lib/store";

export default function CaixaPage() {
  const entries = listLedgerEntries();

  return (
    <div>
      <PageHeader
        title="Caixa"
        description="Movimentação Itaú: sinal (PIX) e restante (maquininha), conciliados por reserva."
      />
      <div className="mt-6 overflow-x-auto rounded-2xl border border-ink/10 bg-foam">
        <table className="min-w-full text-left text-sm">
          <thead className="border-b border-ink/10 text-ink/50">
            <tr>
              <th className="px-4 py-3 font-medium">Tipo</th>
              <th className="px-4 py-3 font-medium">Canal</th>
              <th className="px-4 py-3 font-medium">Valor</th>
              <th className="px-4 py-3 font-medium">Status</th>
              <th className="px-4 py-3 font-medium">Referência</th>
            </tr>
          </thead>
          <tbody>
            {entries.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-4 py-6 text-ink/50">
                  Sem lançamentos ainda. Reservas geram o sinal; a máquina alimenta o restante via
                  webhook Itaú.
                </td>
              </tr>
            ) : (
              entries.map((entry) => (
                <tr key={entry.id} className="border-t border-ink/5">
                  <td className="px-4 py-3">{PAYMENT_KIND_LABEL[entry.kind]}</td>
                  <td className="px-4 py-3">{PAYMENT_CHANNEL_LABEL[entry.channel]}</td>
                  <td className="px-4 py-3">{formatBRL(entry.amountCents)}</td>
                  <td className="px-4 py-3">{PAYMENT_STATUS_LABEL[entry.status]}</td>
                  <td className="px-4 py-3 font-mono text-xs text-ink/60">
                    {entry.externalReference}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
