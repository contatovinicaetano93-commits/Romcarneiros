import { AgendaBoard } from "@/components/admin/AgendaBoard";
import { PageHeader } from "@/components/admin/PageHeader";
import { PresentationBanner } from "@/components/admin/PresentationBanner";
import { OPERATION } from "@/lib/constants";

export default function AdminAgendaPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Chão de loja"
        title="Agenda"
        description={`Grade por profissional, das ${OPERATION.openHour}h às ${OPERATION.closeHour}h. Serviços do mesmo cliente entram em sequência — ninguém ocupa duas cadeiras ao mesmo tempo.`}
      />
      <PresentationBanner />
      <div className="admin-card p-4 md:p-6">
        <AgendaBoard />
      </div>
    </div>
  );
}
