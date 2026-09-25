import type { GetServerSideProps } from "next";

import { AppLayout } from "@/components/layout/app-layout";
import { HipotesesBadge } from "@/components/projetos/hipoteses-badge";
import { api } from "@/lib/api/client";
import type { components } from "@/types/api";

type Projeto = components["schemas"]["ProjetoOut"];
type Hipotese = components["schemas"]["HipoteseOut"];

type Props = { projeto: Projeto | null; hipoteses: Hipotese[] };

export const getServerSideProps: GetServerSideProps<Props> = async (ctx) => {
  const id = Number(ctx.params?.id);
  if (!Number.isFinite(id)) return { notFound: true };

  const [projetos, hipoteses] = await Promise.all([
    api.GET("/projetos", {}),
    api.GET("/hipoteses", {}),
  ]);

  const projeto = projetos.data?.find((p) => p.id === id) ?? null;
  if (!projeto) return { notFound: true };

  return {
    props: {
      projeto,
      hipoteses: (hipoteses.data ?? []).filter((h) => h.projeto_id === id),
    },
  };
};

export default function ProjectDetailPage({ projeto, hipoteses }: Props) {
  if (!projeto) return null;

  return (
    <AppLayout titulo={projeto.nome}>
      <div className="mt-2">
        <HipotesesBadge quantidade={hipoteses.length} />
      </div>

      <section className="mt-8">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500">Contexto</h2>
        <p className="mt-2 text-sm text-slate-700">{projeto.contexto}</p>
      </section>

      <section className="mt-6">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
          Dor do usuário
        </h2>
        <p className="mt-2 text-sm text-slate-700">{projeto.dor_usuario}</p>
      </section>

      <section className="mt-6">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500">Hipóteses</h2>
        {hipoteses.length === 0 ? (
          <p className="mt-2 text-sm text-slate-600">
            Nenhuma hipótese registrada — o enquadramento ainda não virou aposta testável.
          </p>
        ) : (
          <ul className="mt-2 space-y-3">
            {hipoteses.map((h) => (
              <li key={h.id} className="rounded border border-slate-200 p-3 text-sm">
                <p className="font-medium">Se {h.se}</p>
                <p className="mt-1 text-slate-600">
                  De <strong>{h.baseline}</strong> para <strong>{h.alvo}</strong> · {h.estado}
                </p>
              </li>
            ))}
          </ul>
        )}
      </section>
    </AppLayout>
  );
}
