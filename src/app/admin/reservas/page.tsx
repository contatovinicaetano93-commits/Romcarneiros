import { settleRestanteAction, signInAdmin } from "@/app/admin/actions";
import { PageHeader } from "@/components/admin/PageHeader";
import { hasAdminSession } from "@/lib/admin-auth";
import { formatBRL } from "@/lib/format";
import { RESERVATION_STATUS_LABEL } from "@/lib/labels";
import { OPERATION } from "@/lib/constants";
import { findPendingRestante, listReservations } from "@/lib/store";

function loginErrorMessage(erro: string | string[] | undefined): string | null {
  const value = Array.isArray(erro) ? erro[0] : erro;
  if (value === "config") return "O acesso administrativo ainda não foi configurado.";
  if (value === "1") return "Senha incorreta.";
  return null;
}

function suggestedRestanteCents(totalCents: number | null, depositCents: number): number | null {
  if (totalCents == null) return null;
  return Math.max(totalCents - depositCents, 0);
}

export default async function ReservasPage({
  searchParams,
}: {
  searchParams: Promise<{ erro?: string | string[] }>;
}) {
  const allowed = await hasAdminSession();
  const params = await searchParams;
  const loginError = allowed ? null : loginErrorMessage(params.erro);
  const reservations = allowed ? listReservations() : [];

  return (
    <div>
      <PageHeader
        title="Reservas"
        description={`Pedidos do site. Sinal ${OPERATION.depositPercent}% via PIX Itaú; restante (débito/crédito) com baixa manual na chegada.`}
      />
      {allowed ? (
        <div className="mt-6 overflow-x-auto rounded-2xl border border-ink/10 bg-foam">
          <table className="min-w-full text-left text-sm">
            <thead className="border-b border-ink/10 text-ink/50">
              <tr>
                <th className="px-4 py-3 font-medium">Cliente</th>
                <th className="px-4 py-3 font-medium">Data</th>
                <th className="px-4 py-3 font-medium">Status</th>
                <th className="px-4 py-3 font-medium">Restante</th>
              </tr>
            </thead>
            <tbody>
              {reservations.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-4 py-6 text-ink/50">
                    Nenhuma reserva ainda.
                  </td>
                </tr>
              ) : (
                reservations.map((r) => {
                  const pending = findPendingRestante(r.id);
                  const suggested = suggestedRestanteCents(r.totalCents, r.depositCents);
                  const canSettle =
                    r.status === "confirmed" ||
                    (r.status === "pending_deposit" && Boolean(pending));

                  return (
                    <tr key={r.id} className="border-t border-ink/5 align-top">
                      <td className="px-4 py-3">
                        <p className="font-medium text-ink">{r.customerName}</p>
                        <p className="font-mono text-xs text-ink/45">{r.id}</p>
                      </td>
                      <td className="px-4 py-3">
                        {r.date} {r.startTime}
                      </td>
                      <td className="px-4 py-3">{RESERVATION_STATUS_LABEL[r.status]}</td>
                      <td className="px-4 py-3">
                        {r.status === "completed" ? (
                          <span className="text-ink/50">Quitado</span>
                        ) : canSettle ? (
                          <form action={settleRestanteAction} className="flex flex-col gap-2 sm:max-w-xs">
                            <input type="hidden" name="reservationId" value={r.id} />
                            <input
                              name="amountBrl"
                              inputMode="decimal"
                              placeholder={
                                pending
                                  ? (pending.amountCents / 100).toFixed(2).replace(".", ",")
                                  : suggested != null
                                    ? (suggested / 100).toFixed(2).replace(".", ",")
                                    : "Valor R$"
                              }
                              defaultValue={
                                pending
                                  ? (pending.amountCents / 100).toFixed(2).replace(".", ",")
                                  : suggested != null
                                    ? (suggested / 100).toFixed(2).replace(".", ",")
                                    : ""
                              }
                              className="rounded-lg border border-ink/10 bg-mist px-2 py-1.5 text-sm outline-none ring-olive focus:ring-2"
                            />
                            <input
                              name="nsu"
                              placeholder="NSU (opcional)"
                              className="rounded-lg border border-ink/10 bg-mist px-2 py-1.5 text-sm outline-none ring-olive focus:ring-2"
                            />
                            <button
                              type="submit"
                              className="cta-green rounded-full px-3 py-1.5 text-xs font-semibold"
                            >
                              Dar baixa no restante
                            </button>
                            {pending ? (
                              <span className="text-xs text-ink/45">
                                Pendente: {formatBRL(pending.amountCents)}
                              </span>
                            ) : null}
                          </form>
                        ) : (
                          <span className="text-ink/40">—</span>
                        )}
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      ) : (
        <form
          action={signInAdmin}
          className="mt-6 max-w-md rounded-2xl border border-ink/10 bg-foam p-6"
        >
          <p className="text-sm text-ink/70">A lista de reservas é restrita à operação.</p>
          <input type="text" name="username" autoComplete="username" value="admin" hidden readOnly />
          <label className="mt-4 block text-sm">
            <span className="text-ink/60">Senha</span>
            <input
              required
              type="password"
              name="password"
              autoComplete="current-password"
              className="mt-1 w-full rounded-xl border border-ink/10 bg-mist px-3 py-2.5 outline-none ring-olive focus:ring-2"
            />
          </label>
          {loginError ? <p className="mt-3 text-sm text-coral">{loginError}</p> : null}
          <button type="submit" className="cta-green mt-4 rounded-full px-5 py-2.5 text-sm font-semibold">
            Entrar
          </button>
        </form>
      )}
    </div>
  );
}
