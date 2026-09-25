import { HipotesesList, type HipoteseRow } from "@/components/hipoteses/hipoteses-list";

const API = process.env.API_URL ?? "http://localhost:8000";

async function buscarHipoteses(): Promise<HipoteseRow[] | null> {
  try {
    const res = await fetch(`${API}/hipoteses`, { cache: "no-store" });
    if (!res.ok) return null;
    return (await res.json()) as HipoteseRow[];
  } catch {
    return null;
  }
}

export default async function HipotesePage() {
  const hipoteses = await buscarHipoteses();

  if (hipoteses === null) {
    return (
      <main className="mx-auto max-w-3xl px-4 py-10">
        <h1 className="text-2xl font-semibold">Hipóteses de Valor</h1>
        <p className="mt-8 rounded border border-amber-300 bg-amber-50 p-4 text-sm text-amber-900">
          Não foi possível carregar as hipóteses agora. Verifique se o backend
          está no ar (<code>docker compose up</code>) e recarregue a página.
        </p>
      </main>
    );
  }

  return <HipotesesList items={hipoteses} />;
}
