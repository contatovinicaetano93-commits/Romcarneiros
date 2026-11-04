import Link from "next/link";
import { BRAND, OPERATION } from "@/lib/constants";

export function ReserveCta() {
  return (
    <section id="reservar" className="relative overflow-hidden bg-olive-deep px-5 py-20 text-foam md:px-8 md:py-28">
      <div className="ocean-dots pointer-events-none absolute inset-0 opacity-20" />
      <div className="relative mx-auto max-w-3xl text-center">
        <span className="accent-line mx-auto mb-5 bg-olive-soft" />
        <h2 className="font-sans text-3xl font-bold tracking-tight md:text-5xl">
          Reserve com sinal de {OPERATION.depositPercent}%
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-foam/75">
          Escolha os serviços em sequência e garanta o horário pelo site ou WhatsApp.{" "}
          {OPERATION.cancelPolicy}
        </p>
        <div className="mt-9 flex flex-wrap justify-center gap-3">
          <Link
            href="/reservar"
            className="cta-green inline-flex items-center gap-3 rounded-full px-5 py-3 text-sm font-semibold shadow-lg shadow-black/20 transition"
          >
            Quero reservar
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-foam text-base font-bold text-olive">
              +
            </span>
          </Link>
          <a
            href={`https://wa.me/${BRAND.whatsappE164}?text=${encodeURIComponent(
              "Olá! Quero reservar um horário no Rom Carneiros.",
            )}`}
            target="_blank"
            rel="noreferrer"
            className="rounded-full border border-foam/35 px-6 py-3 text-sm font-medium text-foam transition hover:border-foam"
          >
            Falar no WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}
