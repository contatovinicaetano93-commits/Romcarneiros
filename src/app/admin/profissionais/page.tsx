import { PageHeader } from "@/components/admin/PageHeader";

export default function ProfissionaisPage() {
  return (
    <div>
      <PageHeader title="Profissionais" description="Equipe da temporada." />
      <p className="mt-6 text-sm text-ink/60">Cadastre a equipe quando a escala estiver pronta.</p>
    </div>
  );
}
