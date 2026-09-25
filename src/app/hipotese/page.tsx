import { HipotesesList } from "@/components/hipoteses/hipoteses-list";
import { api } from "@/lib/api/client";

export default async function HipotesePage() {
  const { data, error } = await api.GET("/hipoteses", {
    fetch: (req) => fetch(req, { cache: "no-store" }),
  });

  if (error || !data) {
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

  return <HipotesesList items={data} />;
}
