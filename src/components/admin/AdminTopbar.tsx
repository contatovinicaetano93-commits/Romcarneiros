import Link from "next/link";
import { BRAND, OPERATION } from "@/lib/constants";
import { formatDate } from "@/lib/format";

export function AdminTopbar() {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3 border-b border-ink/10 bg-foam/80 px-4 py-3 backdrop-blur md:px-10">
      <div>
        <p className="text-sm font-semibold text-ink">{OPERATION.unitName}</p>
        <p className="text-xs text-ink/50">
          {OPERATION.city} · {formatDate(OPERATION.startDate)} – {formatDate(OPERATION.endDate)} ·{" "}
          {OPERATION.openHour}h–{OPERATION.closeHour}h
        </p>
      </div>
      <div className="flex items-center gap-2">
        <span className="rounded-full bg-lagoon/15 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-sea">
          Apresentação
        </span>
        <Link
          href="/reservar"
          className="rounded-full bg-sea px-3 py-1.5 text-xs font-semibold text-foam hover:bg-lagoon"
        >
          Simular reserva
        </Link>
        <a
          href={`https://wa.me/${BRAND.whatsappE164}`}
          className="hidden rounded-full border border-ink/15 px-3 py-1.5 text-xs font-medium text-ink/70 hover:border-ink/40 sm:inline"
          target="_blank"
          rel="noreferrer"
        >
          WhatsApp
        </a>
      </div>
    </div>
  );
}
