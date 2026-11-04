export function OperationFlow() {
  return (
    <ol className="grid gap-3 md:grid-cols-4">
      {["Reserva", "Sinal 30%", "Atendimento", "Caixa"].map((step, i) => (
        <li key={step} className="rounded-2xl border border-ink/10 bg-foam p-4">
          <p className="text-xs uppercase tracking-[0.14em] text-olive">0{i + 1}</p>
          <p className="mt-2 font-medium text-ink">{step}</p>
        </li>
      ))}
    </ol>
  );
}
