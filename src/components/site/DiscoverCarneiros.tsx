import { OPERATION } from "@/lib/constants";

const COAST_STOPS = [
  { name: "Recife", highlight: false },
  { name: "Porto de Galinhas", highlight: false },
  { name: "Carneiros", highlight: true },
  { name: "Tamandaré", highlight: false },
] as const;

function formatDayMonth(isoDate: string) {
  return `${isoDate.slice(8)}/${isoDate.slice(5, 7)}`;
}

export function DiscoverCarneiros() {
  const seasonRange = `${formatDayMonth(OPERATION.startDate)} → ${formatDayMonth(OPERATION.endDate)}`;

  return (
    <section id="descobrir" className="bg-beige">
      <div className="mx-auto flex max-w-6xl justify-center px-5 py-16 md:px-10 md:py-24 lg:px-14">
        <div className="flex w-full max-w-xl flex-col justify-center">
          <span className="accent-line mb-5" />
          <h2 className="font-sans text-3xl font-bold tracking-tight text-ink md:text-4xl lg:text-5xl">
            Descubra
            <br />
            Carneiros
          </h2>
          <p className="mt-5 text-base leading-relaxed text-ink-soft md:text-lg">
            No litoral sul de Pernambuco, entre Recife e Tamandaré — a operação Rom chega à praia
            mais icônica do Nordeste.
          </p>
          <p className="mt-4 text-sm leading-relaxed text-ink/60 md:text-base">
            {OPERATION.city}. De {formatDayMonth(OPERATION.startDate)} a{" "}
            {formatDayMonth(OPERATION.endDate)}, das {OPERATION.openHour}h às {OPERATION.closeHour}h.
          </p>

          <dl className="mt-8 grid grid-cols-2 gap-6 text-sm">
            <div>
              <dt className="text-ink/40">Destino</dt>
              <dd className="mt-1 font-semibold text-ink">Praia dos Carneiros</dd>
            </div>
            <div>
              <dt className="text-ink/40">Temporada</dt>
              <dd className="mt-1 font-semibold text-ink">Fim de ano</dd>
            </div>
          </dl>

          <ol className="relative mt-10 space-y-0 border-t border-ink/10 pt-8">
            {COAST_STOPS.map((stop, index) => {
              const isLast = index === COAST_STOPS.length - 1;
              return (
                <li key={stop.name} className="relative flex gap-3 pb-4 last:pb-0">
                  <div className="relative flex w-2.5 shrink-0 flex-col items-center">
                    <span
                      className={`z-10 mt-1.5 h-2.5 w-2.5 rounded-full ${
                        stop.highlight ? "bg-olive ring-4 ring-olive/20" : "bg-ink/25"
                      }`}
                      aria-hidden
                    />
                    {!isLast ? (
                      <span className="absolute top-4 bottom-0 w-px bg-ink/15" aria-hidden />
                    ) : null}
                  </div>
                  <span
                    className={`pt-0.5 text-sm ${
                      stop.highlight
                        ? "font-semibold text-olive-deep"
                        : "font-medium text-ink/70"
                    }`}
                  >
                    {stop.name}
                  </span>
                </li>
              );
            })}
          </ol>
          <p className="mt-4 text-xs tracking-wide text-ink/45">
            Operação Rom · {seasonRange} · {OPERATION.openHour}h–{OPERATION.closeHour}h
          </p>
        </div>
      </div>
    </section>
  );
}
