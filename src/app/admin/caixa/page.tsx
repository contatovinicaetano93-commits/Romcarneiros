import { PageHeader } from "@/components/admin/PageHeader";

export default function CaixaPage() {
  return (
    <div>
      <PageHeader title="Caixa" description="Movimentação da temporada." />
      <p className="mt-6 text-sm text-ink/60">Sem lançamentos ainda.</p>
    </div>
  );
}
