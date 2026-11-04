import { OPERATION } from "@/lib/constants";

const PLACE_IMAGE =
  "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1800&q=80";

export function Location() {
  return (
    <section id="carneiros" className="relative overflow-hidden bg-palm text-foam">
      <div
        className="absolute inset-0 opacity-40 bg-cover bg-center"
        style={{ backgroundImage: `url(${PLACE_IMAGE})` }}
        aria-hidden
      />
      <div className="absolute inset-0 bg-gradient-to-r from-palm via-palm/85 to-palm/55" />
      <div className="relative mx-auto max-w-6xl px-5 py-20 md:px-8 md:py-28">
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-lagoon">Local</p>
        <h2 className="mt-3 max-w-lg font-display text-4xl md:text-5xl">Praia dos Carneiros</h2>
        <p className="mt-4 max-w-md text-foam/80">
          {OPERATION.city}. Operação de {OPERATION.startDate.slice(8)}/
          {OPERATION.startDate.slice(5, 7)} a {OPERATION.endDate.slice(8)}/
          {OPERATION.endDate.slice(5, 7)}/2027, das {OPERATION.openHour}h às {OPERATION.closeHour}h.
        </p>
      </div>
    </section>
  );
}
