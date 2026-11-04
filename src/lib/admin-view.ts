export type AdminNavItem = {
  href: string;
  label: string;
};

export const ADMIN_NAV: AdminNavItem[] = [
  { href: "/admin", label: "Visão geral" },
  { href: "/admin/agenda", label: "Agenda" },
  { href: "/admin/reservas", label: "Reservas" },
  { href: "/admin/clientes", label: "Clientes" },
  { href: "/admin/servicos", label: "Serviços" },
  { href: "/admin/profissionais", label: "Profissionais" },
  { href: "/admin/caixa", label: "Caixa" },
];
