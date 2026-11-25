import { importExtractAction, settleRestanteAction } from "@/app/admin/actions";
import { PageHeader } from "@/components/admin/PageHeader";
import { formatBRL } from "@/lib/format";
import {
  PAYMENT_CHANNEL_LABEL,
  PAYMENT_KIND_LABEL,
  PAYMENT_STATUS_LABEL,
} from "@/lib/labels";
import { getReservation, listLedgerEntries, listPendingRestante } from "@/lib/store";

function firstParam(value: string | string[] | undefined): string | undefined {
  return Array.isArray(value) ? value[0] : value;
}

export default async function CaixaPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;
  const entries = listLedgerEntries();
  const pendingRestante = listPendingRestante();

  const baixa = firstParam(params.baixa);
  const extrato = firstParam(params.extrato);
  const msg = firstParam(params.msg);
  const matched = firstParam(params.matched);
  const unmatched = firstParam(params.unmatched);

  return (
    <div className="space-y-8">
      <PageHeader
        title="Caixa"
        description="Sinal PIX automático · restante com baixa manual · conciliação pelo extrato diário Itaú."
      />

      {baixa === "ok" ? (
        <p className="rounded-xl border border-olive/20 bg-olive/10 px-4 py-3 text-sm text-olive-deep">
          Restante baixado. A reserva foi marcada como concluída.
        </p>
      ) : null}
      {baixa === "erro" ? (
        <p className="rounded-xl border border-coral/30 bg-coral/10 px-4 py-3 text-sm text-coral">
          {msg ?? "Não foi possível baixar o restante."}
        </p>
      ) : null}
      {extrato === "ok" ? (
        <p className="rounded-xl border border-olive/20 bg-olive/10 px-4 py-3 text-sm text-olive-deep">
          Extrato importado: {matched ?? "0"} conciliado(s)
          {unmatched && unmatched !== "0" ? ` · ${unmatched} sem correspondente` : ""}.
        </p>
      ) : null}
      {extrato === "erro" ? (
        <p className="rounded-xl border border-coral/30 bg-coral/10 px-4 py-3 text-sm text-coral">
          {msg ?? "Falha ao importar o extrato."}
        </p>
      ) : null}

      <section className="rounded-2xl border border-ink/10 bg-foam p-5">
        <h2 className="font-sans text-lg font-semibold text-ink">Pendências de restante</h2>
        <p className="mt-1 text-sm text-ink/55">
          Amanda: quando o cliente pagar débito/crédito na máquina, dê a baixa aqui (ou em
          Reservas).
        </p>
        {pendingRestante.length === 0 ? (
          <p className="mt-4 text-sm text-ink/45">Nenhuma pendência de restante agora.</p>
        ) : (
          <ul className="mt-4 space-y-3">
            {pendingRestante.map((entry) => {
              const reservation = getReservation(entry.reservationId);
              return (
                <li
                  key={entry.id}
                  className="flex flex-col gap-3 rounded-xl border border-ink/10 bg-mist/60 p-4 sm:flex-row sm:items-end sm:justify-between"
                >
                  <div>
                    <p className="font-medium text-ink">
                      {reservation?.customerName ?? entry.reservationId}
                    </p>
                    <p className="text-sm text-ink/55">
                      {formatBRL(entry.amountCents)} · {entry.externalReference}
                    </p>
                  </div>
                  <form action={settleRestanteAction} className="flex flex-wrap items-end gap-2">
                    <input type="hidden" name="reservationId" value={entry.reservationId} />
                    <input type="hidden" name="amountBrl" value={(entry.amountCents / 100).toFixed(2)} />
                    <label className="text-xs text-ink/55">
                      NSU
                      <input
                        name="nsu"
                        className="mt-1 block rounded-lg border border-ink/10 bg-foam px-2 py-1.5 text-sm outline-none ring-olive focus:ring-2"
                        placeholder="opcional"
                      />
                    </label>
                    <button type="submit" className="cta-green rounded-full px-4 py-2 text-xs font-semibold">
                      Dar baixa
                    </button>
                  </form>
                </li>
              );
            })}
          </ul>
        )}
      </section>

      <section className="rounded-2xl border border-ink/10 bg-foam p-5">
        <h2 className="font-sans text-lg font-semibold text-ink">Importar extrato do dia</h2>
        <p className="mt-1 text-sm text-ink/55">
          CSV com colunas: <code className="text-xs">data,valor,nsu,referencia</code> (vírgula ou
          ponto-e-vírgula). Bate por referência, NSU ou valor com baixas manuais.
        </p>
        <form action={importExtractAction} className="mt-4 space-y-3">
          <label className="block text-sm text-ink/60">
            Arquivo CSV
            <input
              type="file"
              name="extract"
              accept=".csv,text/csv,text/plain"
              className="mt-1 block w-full text-sm"
            />
          </label>
          <label className="block text-sm text-ink/60">
            Ou cole o conteúdo
            <textarea
              name="extractText"
              rows={5}
              placeholder={"data;valor;nsu;referencia\n25/11/2026;150,00;NSU123;"}
              className="mt-1 w-full rounded-xl border border-ink/10 bg-mist px-3 py-2 font-mono text-xs outline-none ring-olive focus:ring-2"
            />
          </label>
          <button type="submit" className="cta-green rounded-full px-5 py-2.5 text-sm font-semibold">
            Conciliar extrato
          </button>
        </form>
      </section>

      <section>
        <h2 className="mb-3 font-sans text-lg font-semibold text-ink">Lançamentos</h2>
        <div className="overflow-x-auto rounded-2xl border border-ink/10 bg-foam">
          <table className="min-w-full text-left text-sm">
            <thead className="border-b border-ink/10 text-ink/50">
              <tr>
                <th className="px-4 py-3 font-medium">Tipo</th>
                <th className="px-4 py-3 font-medium">Canal</th>
                <th className="px-4 py-3 font-medium">Valor</th>
                <th className="px-4 py-3 font-medium">Status</th>
                <th className="px-4 py-3 font-medium">Extrato</th>
                <th className="px-4 py-3 font-medium">Referência</th>
              </tr>
            </thead>
            <tbody>
              {entries.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-4 py-6 text-ink/50">
                    Sem lançamentos ainda. Reservas geram o sinal; o restante entra na baixa manual
                    e no extrato do dia.
                  </td>
                </tr>
              ) : (
                entries.map((entry) => (
                  <tr key={entry.id} className="border-t border-ink/5">
                    <td className="px-4 py-3">{PAYMENT_KIND_LABEL[entry.kind]}</td>
                    <td className="px-4 py-3">{PAYMENT_CHANNEL_LABEL[entry.channel]}</td>
                    <td className="px-4 py-3">{formatBRL(entry.amountCents)}</td>
                    <td className="px-4 py-3">{PAYMENT_STATUS_LABEL[entry.status]}</td>
                    <td className="px-4 py-3 text-xs text-ink/55">
                      {entry.reconciledAt ? "Conciliado" : "—"}
                    </td>
                    <td className="px-4 py-3 font-mono text-xs text-ink/60">
                      {entry.externalReference}
                      {entry.nsu ? ` · NSU ${entry.nsu}` : ""}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
