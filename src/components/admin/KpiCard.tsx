type KpiTone = "default" | "sea" | "warn" | "ok";

function toneSurface(tone: KpiTone): string {
  switch (tone) {
    case "default":
      return "border-ink/10 bg-foam";
    case "sea":
      return "border-sea/20 bg-sea text-foam";
    case "warn":
      return "border-amber-200 bg-amber-50";
    case "ok":
      return "border-emerald-200 bg-emerald-50";
    default: {
      const _never: never = tone;
      return _never;
    }
  }
}

export function KpiCard({
  label,
  value,
  hint,
  tone = "default",
}: {
  label: string;
  value: string;
  hint?: string;
  tone?: KpiTone;
}) {
  const labelClass = tone === "sea" ? "text-foam/70" : "text-ink/45";
  const valueClass = tone === "sea" ? "text-foam" : "text-ink";
  const hintClass = tone === "sea" ? "text-foam/70" : "text-ink/50";

  return (
    <div className={`rounded-2xl border p-5 shadow-sm ${toneSurface(tone)}`}>
      <p className={`text-[11px] font-semibold uppercase tracking-[0.16em] ${labelClass}`}>{label}</p>
      <p className={`mt-2 font-sans text-3xl font-bold tracking-tight ${valueClass}`}>{value}</p>
      {hint ? <p className={`mt-2 text-xs leading-relaxed ${hintClass}`}>{hint}</p> : null}
    </div>
  );
}
