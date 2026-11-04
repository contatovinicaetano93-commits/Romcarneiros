import { PageHeader } from "@/components/admin/PageHeader";

export default function ClientesPage() {
  return (
    <div>
      <PageHeader title="Clientes" description="Base da operação Carneiros." />
      <p className="mt-6 text-sm text-ink/60">Nenhum cliente cadastrado.</p>
    </div>
  );
}
