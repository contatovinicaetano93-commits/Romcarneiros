import type { Service, ServiceCategory } from "./types";

const base = (
  slug: string,
  name: string,
  category: ServiceCategory,
  description: string,
): Service => ({
  id: `svc_${slug}`,
  slug,
  name,
  category,
  description,
  priceCents: null,
  durationMinutes: null,
  active: true,
});

export const SERVICES: Service[] = [
  base("escova", "Escova", "cabelo", "Finalização com movimento e brilho de verão."),
  base("corte", "Corte", "cabelo", "Corte sob medida para o clima da praia."),
  base("lavagem", "Lavagem de cabelo", "cabelo", "Higienização e cuidado antes dos serviços."),
  base("hidratacao", "Hidratação", "cabelo", "Reposição profunda pós-sol e sal."),
  base("tintura", "Tintura / cor", "cabelo", "Cor vibrante com protocolo de proteção."),
  base("mega", "Mega hair", "cabelo", "Volume e comprimento com aplicação cuidadosa."),
  base("barba", "Barba", "rosto", "Design e acabamento masculino."),
  base("maquiagem", "Maquilagem", "rosto", "Glow natural para luz de Carneiros."),
  base("sobrancelha", "Sobrancelha", "rosto", "Design que valoriza o olhar."),
  base("unha", "Unha", "unhas", "Manicure com acabamento de verão."),
  base("pe-mao", "Pé e mão", "unhas", "Cuidado completo mãos e pés."),
  base("massagem", "Massagem", "corpo", "Relaxamento após o sol."),
  base("depilacao", "Depilação", "corpo", "Protocolo limpo e confortável."),
];

export const SERVICE_CATEGORIES: {
  id: ServiceCategory;
  label: string;
  blurb: string;
  image: string;
}[] = [
  {
    id: "cabelo",
    label: "Cabelo",
    blurb: "Escova, corte, cor, mega, hidratação e lavagem.",
    image: "/images/prod-hair.jpg",
  },
  {
    id: "rosto",
    label: "Rosto",
    blurb: "Maquilagem, sobrancelha e barba.",
    image: "/images/prod-makeup.jpg",
  },
  {
    id: "unhas",
    label: "Unhas",
    blurb: "Unha, pé e mão com estética de verão.",
    image: "/images/prod-nails.jpg",
  },
  {
    id: "corpo",
    label: "Corpo",
    blurb: "Massagem, depilação e hidratação corporal.",
    image: "/images/prod-spa.jpg",
  },
];
