import { OPERATION } from "@/lib/constants";
import { DISCOVER_BACKGROUND } from "@/lib/images";
import { CarneirosMap } from "./CarneirosMap";

export function DiscoverCarneiros() {
  return (
    <section id="descobrir" className="relative overflow-hidden px-5 py-16 md:px-8 md:py-24">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${DISCOVER_BACKGROUND})` }}
        aria-hidden
      />
      <div className="absolute inset-0 bg-gradient-to-r from-mist/95 via-beige/90 to-mist/70" />
      <div className="absolute inset-0 bg-gradient-to-t from-mist via-transparent to-mist/40" />

      <div className="relative mx-auto grid max-w-6xl items-center gap-12 md:grid-cols-2 md:gap-8 lg:gap-16">
        <div className="max-w-md">
          <span className="accent-line mb-5" />
          <h2 className="font-sans text-3xl font-bold tracking-tight text-olive-deep md:text-4xl lg:text-5xl">
            Descubra
            <br />
            Carneiros
          </h2>
          <p className="mt-5 text-base leading-relaxed text-ink-soft md:text-lg">
            No litoral sul de Pernambuco, entre Recife e Tamandaré — a operação Rom chega à
            praia mais icônica do Nordeste.
          </p>
          <p className="mt-4 text-sm leading-relaxed text-ink/55 md:text-base">
            {OPERATION.city}. De {OPERATION.startDate.slice(8)}/{OPERATION.startDate.slice(5, 7)} a{" "}
            {OPERATION.endDate.slice(8)}/{OPERATION.endDate.slice(5, 7)}, das {OPERATION.openHour}h
            às {OPERATION.closeHour}h. Beleza com luz de verão, à beira-mar.
          </p>
          <dl className="mt-8 grid grid-cols-2 gap-4 text-sm">
            <div>
              <dt className="text-ink/40">Destino</dt>
              <dd className="mt-1 font-semibold text-ink">Praia dos Carneiros</dd>
            </div>
            <div>
              <dt className="text-ink/40">Temporada</dt>
              <dd className="mt-1 font-semibold text-ink">Fim de ano</dd>
            </div>
          </dl>
        </div>
        <div className="flex justify-center md:justify-end">
          <CarneirosMap />
        </div>
      </div>
    </section>
  );
}
