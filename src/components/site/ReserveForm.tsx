"use client";

import { useMemo, useState } from "react";
import { SERVICE_CATEGORIES, SERVICES } from "@/lib/catalog";
import { BRAND, OPERATION } from "@/lib/constants";

export function ReserveForm() {
  const [selected, setSelected] = useState<string[]>([]);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("10:00");
  const [sent, setSent] = useState(false);

  const selectedServices = useMemo(
    () => SERVICES.filter((s) => selected.includes(s.id)),
    [selected],
  );

  function toggle(id: string) {
    setSelected((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name || !phone || !date || selected.length === 0) return;

    const payload = {
      customerName: name,
      customerPhone: phone,
      serviceIds: selected,
      date,
      startTime: time,
    };

    try {
      await fetch("/api/reservations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
    } catch {
      // fallback WhatsApp abaixo
    }

    const serviceNames = selectedServices.map((s) => s.name).join(", ");
    const text = `Olá! Quero reservar no Rom Carneiros.\nNome: ${name}\nTelefone: ${phone}\nData: ${date} ${time}\nServiços: ${serviceNames}`;
    window.open(`https://wa.me/${BRAND.whatsappE164}?text=${encodeURIComponent(text)}`, "_blank");
    setSent(true);
  }

  return (
    <form onSubmit={onSubmit} className="space-y-8 rounded-2xl bg-foam p-6 shadow-sm md:p-8">
      <div>
        <h2 className="font-sans text-xl font-semibold text-ink">1. Escolha os serviços</h2>
        <div className="mt-4 space-y-6">
          {SERVICE_CATEGORIES.map((category) => (
            <div key={category.id}>
              <p className="text-sm font-medium uppercase tracking-[0.14em] text-olive">
                {category.label}
              </p>
              <ul className="mt-3 grid gap-2 sm:grid-cols-2">
                {SERVICES.filter((s) => s.category === category.id).map((service) => {
                  const active = selected.includes(service.id);
                  return (
                    <li key={service.id}>
                      <button
                        type="button"
                        onClick={() => toggle(service.id)}
                        className={`flex w-full items-center gap-3 rounded-xl border px-3 py-3 text-left text-sm transition ${
                          active
                            ? "border-olive bg-olive/10 text-ink"
                            : "border-ink/10 bg-mist text-ink/80 hover:border-olive/40"
                        }`}
                      >
                        <span
                          className={`h-2.5 w-2.5 shrink-0 rounded-full ${
                            active ? "bg-olive" : "bg-ink/20"
                          }`}
                        />
                        {service.name}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block text-sm">
          <span className="text-ink/60">Nome</span>
          <input
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 w-full rounded-xl border border-ink/10 bg-mist px-3 py-2.5 outline-none ring-olive focus:ring-2"
          />
        </label>
        <label className="block text-sm">
          <span className="text-ink/60">WhatsApp</span>
          <input
            required
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="mt-1 w-full rounded-xl border border-ink/10 bg-mist px-3 py-2.5 outline-none ring-olive focus:ring-2"
          />
        </label>
        <label className="block text-sm">
          <span className="text-ink/60">Data</span>
          <input
            required
            type="date"
            min={OPERATION.startDate}
            max={OPERATION.endDate}
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="mt-1 w-full rounded-xl border border-ink/10 bg-mist px-3 py-2.5 outline-none ring-olive focus:ring-2"
          />
        </label>
        <label className="block text-sm">
          <span className="text-ink/60">Horário</span>
          <input
            required
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className="mt-1 w-full rounded-xl border border-ink/10 bg-mist px-3 py-2.5 outline-none ring-olive focus:ring-2"
          />
        </label>
      </div>

      <button
        type="submit"
        disabled={selected.length === 0}
        className="cta-green w-full rounded-full px-5 py-3 text-sm font-semibold transition disabled:cursor-not-allowed disabled:opacity-40"
      >
        Continuar com sinal de {OPERATION.depositPercent}%
      </button>

      {sent ? (
        <p className="text-center text-sm text-olive-deep">
          Pedido registrado. Se o WhatsApp não abriu, fale conosco pelo número do site.
        </p>
      ) : null}
    </form>
  );
}
