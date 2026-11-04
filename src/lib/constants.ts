export const BRAND = {
  name: "Rom Carneiros",
  shortName: "ROM",
  domain: "romcarneiros.com.br",
  tagline: "Beleza na Praia dos Carneiros",
  whatsappE164: "5581999999999",
  whatsappDisplay: "(81) 99999-9999",
} as const;

export const OPERATION = {
  unitSlug: "carneiros",
  unitName: "Rom Carneiros",
  city: "Tamandaré — PE",
  startDate: "2026-12-26",
  endDate: "2027-01-03",
  openHour: 10,
  closeHour: 22,
  depositPercent: 30,
  cancelPolicy: "Em caso de atraso, no-show ou cancelamento, o sinal não é reembolsável.",
} as const;

export const DEPOSIT_PERCENT = OPERATION.depositPercent;
