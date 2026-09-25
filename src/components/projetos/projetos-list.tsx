"use client";

import { SimpleListPage } from "@parisgroup-ai/pageshell/composites/list";

import { HipotesesBadge } from "@/components/projetos/hipoteses-badge";
import type { components } from "@/types/api";

/** Tipo do projeto vindo do contrato OpenAPI. Regenerar: npm run api:types */
type Projeto = components["schemas"]["ProjetoOut"];

/** Linha da tela: o projeto do contrato mais a contagem calculada na página. */
export type ProjetoRow = Projeto & { hipoteses: number };

/** Trava de compilação: toda chave usada abaixo existe em ProjetoRow. */
const CHAVES = ["nome", "dor_usuario", "hipoteses"] as const satisfies readonly (keyof ProjetoRow)[];

export function ProjetosList({ items }: { items: ProjetoRow[] }) {
  return (
    <SimpleListPage<ProjetoRow>
      title="Projetos"
      items={items}
      itemKey="id"
      sectionDescription="Produtos do studio e o estado do enquadramento de cada um."
      fields={[
        { key: CHAVES[0], label: "Projeto", cardSlot: "title" },
        { key: CHAVES[1], label: "Dor do usuário", cardSlot: "description" },
        {
          key: CHAVES[2],
          label: "Hipóteses",
          cardSlot: "badge",
          render: (row) => <HipotesesBadge quantidade={row.hipoteses} />,
        },
      ]}
      viewModeToggle
      emptyState={{
        title: "Nenhum projeto cadastrado ainda.",
        description:
          "Para cadastrar, envie um POST para /projetos na API — a página /docs permite fazer isso direto do navegador.",
      }}
    />
  );
}
