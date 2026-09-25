"use client";

import { SimpleListPage } from "@parisgroup-ai/pageshell/composites/list";

export type HipoteseRow = {
  id: number;
  se: string;
  baseline: string;
  alvo: string;
  estado: "em_teste" | "confirmada" | "inconclusiva" | "refutada";
};

export function HipotesesList({ items }: { items: HipoteseRow[] }) {
  return (
    <SimpleListPage<HipoteseRow>
      title="Hipóteses de Valor"
      items={items}
      itemKey="id"
      sectionDescription="Enquadramento do problema e hipóteses mensuráveis."
      fields={[
        { key: "se", label: "Se", cardSlot: "title" },
        { key: "baseline", label: "De", cardSlot: "description" },
        { key: "alvo", label: "Para" },
        {
          key: "estado",
          label: "Estado",
          valueType: "badge",
          valueEnum: {
            confirmada: { text: "Confirmada", status: "success" },
            em_teste: { text: "Em teste", status: "warning" },
            inconclusiva: { text: "Inconclusiva", status: "muted" },
            refutada: { text: "Refutada", status: "error" },
          },
          cardSlot: "badge",
        },
      ]}
      viewModeToggle
      emptyState={{
        title: "Nenhuma hipótese cadastrada ainda.",
        description:
          "Para cadastrar, envie um POST para /hipoteses na API — a página /docs permite fazer isso direto do navegador.",
      }}
    />
  );
}
