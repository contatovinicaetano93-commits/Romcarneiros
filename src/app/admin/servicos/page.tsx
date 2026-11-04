import { PageHeader } from "@/components/admin/PageHeader";
import { SERVICES } from "@/lib/catalog";

export default function ServicosAdminPage() {
  return (
    <div>
      <PageHeader title="Serviços" description="Catálogo da temporada." />
      <ul className="mt-6 divide-y divide-ink/10 rounded-2xl border border-ink/10 bg-foam">
        {SERVICES.map((service) => (
          <li key={service.id} className="flex items-center justify-between px-4 py-3 text-sm">
            <span className="font-medium text-ink">{service.name}</span>
            <span className="capitalize text-ink/45">{service.category}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
