const STEPS = [
  { title: "Reserva", detail: "Site / WhatsApp" },
  { title: "Sinal 30%", detail: "PIX Conta Digital Itaú" },
  { title: "Atendimento", detail: "Tolerância 10 min" },
  { title: "Caixa", detail: "Restante na maquininha" },
] as const;

export function OperationFlow() {
  return (
    <ol className="grid gap-3 md:grid-cols-4">
      {STEPS.map((step, i) => (
        <li key={step.title} className="rounded-2xl border border-ink/10 bg-foam p-4">
          <p className="text-xs uppercase tracking-[0.14em] text-olive">0{i + 1}</p>
          <p className="mt-2 font-medium text-ink">{step.title}</p>
          <p className="mt-1 text-xs text-ink/50">{step.detail}</p>
        </li>
      ))}
    </ol>
  );
}
