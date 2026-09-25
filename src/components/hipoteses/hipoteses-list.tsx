"use client";

import { SimpleListPage } from "@parisgroup-ai/pageshell/composites/list";

import type { components } from "@/types/api";

/**
 * O tipo da hipótese vem do contrato OpenAPI, não é escrito à mão.
 * Regenerar com: npm run api:types
 */
export type HipoteseRow = components["schemas"]["HipoteseOut"];

/**
 * Trava de compilação para as chaves usadas na tela.
 *
 * O `SimpleListPage` aceita `key` como texto livre, então um campo
 * renomeado no backend passaria despercebido. Esta linha declara que
 * toda chave abaixo existe em HipoteseRow — se o contrato mudar,
 * o erro aparece aqui, na compilação.
 */
const CHAVES = ["se", "baseline", "alvo", "estado"] as const satisfies readonly (keyof HipoteseRow)[];

export function HipotesesList({ items }: { items: HipoteseRow[] }) {
  return (
    <SimpleListPage<HipoteseRow>
      title="Hipóteses de Valor"
      items={items}
      itemKey="id"
      sectionDescription="Enquadramento do problema e hipóteses mensuráveis."
      fields={[
        { key: CHAVES[0], label: "Se", cardSlot: "title" },
        { key: CHAVES[1], label: "De", cardSlot: "description" },
        { key: CHAVES[2], label: "Para" },
        {
          key: CHAVES[3],
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
