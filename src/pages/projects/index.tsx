import Link from "next/link";
import type { GetServerSideProps } from "next";

import { AppLayout } from "@/components/layout/app-layout";
import { HipotesesBadge } from "@/components/projetos/hipoteses-badge";
import { api } from "@/lib/api/client";
import type { components } from "@/types/api";

type Projeto = components["schemas"]["ProjetoOut"];
type ProjetoRow = Projeto & { hipoteses: number };

type Props = { projetos: ProjetoRow[]; erro: boolean };

export const getServerSideProps: GetServerSideProps<Props> = async () => {
  const [projetos, hipoteses] = await Promise.all([
    api.GET("/projetos", {}),
    api.GET("/hipoteses", {}),
  ]);

  if (projetos.error || !projetos.data) {
    return { props: { projetos: [], erro: true } };
  }

  const porProjeto = new Map<number, number>();
  for (const h of hipoteses.data ?? []) {
    porProjeto.set(h.projeto_id, (porProjeto.get(h.projeto_id) ?? 0) + 1);
  }

  return {
    props: {
      erro: false,
      projetos: projetos.data.map((p) => ({ ...p, hipoteses: porProjeto.get(p.id) ?? 0 })),
    },
  };
};

export default function ProjectsPage({ projetos, erro }: Props) {
  if (erro) {
    return (
      <AppLayout titulo="Projetos">
        <p className="mt-8 rounded border border-amber-300 bg-amber-50 p-4 text-sm text-amber-900">
          Não foi possível carregar os projetos. Verifique se o backend está no ar.
        </p>
      </AppLayout>
    );
  }

  return (
    <AppLayout titulo="Projetos">
      {projetos.length === 0 ? (
        <p className="mt-8 text-sm text-slate-600">Nenhum projeto cadastrado ainda.</p>
      ) : (
        <ul className="mt-8 space-y-4">
          {projetos.map((p) => (
            <li key={p.id} className="rounded border border-slate-200 p-4">
              <div className="flex items-start justify-between gap-4">
                <Link href={`/projects/${p.id}`} className="font-medium hover:underline">
                  {p.nome}
                </Link>
                <HipotesesBadge quantidade={p.hipoteses} />
              </div>
              <p className="mt-2 text-sm text-slate-600">{p.dor_usuario}</p>
            </li>
          ))}
        </ul>
      )}
    </AppLayout>
  );
}
