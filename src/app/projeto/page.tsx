import { ProjetosList, type ProjetoRow } from "@/components/projetos/projetos-list";
import { api } from "@/lib/api/client";

const semCache = { fetch: (req: Request) => fetch(req, { cache: "no-store" }) };

export default async function ProjetoPage() {
  const [projetos, hipoteses] = await Promise.all([
    api.GET("/projetos", semCache),
    api.GET("/hipoteses", semCache),
  ]);

  if (projetos.error || !projetos.data) {
    return (
      <main className="mx-auto max-w-3xl px-4 py-10">
        <h1 className="text-2xl font-semibold">Projetos</h1>
        <p className="mt-8 rounded border border-amber-300 bg-amber-50 p-4 text-sm text-amber-900">
          Não foi possível carregar os projetos agora. Verifique se o backend
          está no ar (<code>docker compose up</code>) e recarregue a página.
        </p>
      </main>
    );
  }

  // A contagem por projeto é calculada aqui: a API ainda não a expõe.
  // Quando expuser, este bloco sai e o campo vem pronto do contrato.
  const porProjeto = new Map<number, number>();
  for (const h of hipoteses.data ?? []) {
    porProjeto.set(h.projeto_id, (porProjeto.get(h.projeto_id) ?? 0) + 1);
  }

  const items: ProjetoRow[] = projetos.data.map((p) => ({
    ...p,
    hipoteses: porProjeto.get(p.id) ?? 0,
  }));

  return <ProjetosList items={items} />;
}
