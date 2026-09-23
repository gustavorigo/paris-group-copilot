const API = process.env.API_URL ?? "http://localhost:8000";

type Hipotese = {
  id: number;
  se: string;
  baseline: string;
  alvo: string;
  estado: "em_teste" | "confirmada" | "inconclusiva" | "refutada";
};

const ESTADO_LABEL: Record<Hipotese["estado"], string> = {
  em_teste: "Em teste",
  confirmada: "Confirmada",
  inconclusiva: "Inconclusiva",
  refutada: "Refutada",
};

const ESTADO_STYLE: Record<Hipotese["estado"], string> = {
  em_teste: "bg-amber-100 text-amber-900",
  confirmada: "bg-emerald-100 text-emerald-900",
  inconclusiva: "bg-slate-200 text-slate-800",
  refutada: "bg-rose-100 text-rose-900",
};

async function buscarHipoteses(): Promise<Hipotese[] | null> {
  try {
    const res = await fetch(`${API}/hipoteses`, { cache: "no-store" });
    if (!res.ok) return null;
    return (await res.json()) as Hipotese[];
  } catch {
    return null;
  }
}

export default async function HipotesePage() {
  const hipoteses = await buscarHipoteses();

  return (
    <main className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="text-2xl font-semibold">Hipóteses de Valor</h1>
      <p className="mt-1 text-sm text-slate-600">
        Enquadramento do problema e hipóteses mensuráveis.
      </p>

      {hipoteses === null ? (
        <p className="mt-8 rounded border border-amber-300 bg-amber-50 p-4 text-sm text-amber-900">
          Não foi possível carregar as hipóteses agora. Verifique se o backend
          está no ar (<code>docker compose up</code>) e recarregue a página.
        </p>
      ) : hipoteses.length === 0 ? (
        <div className="mt-8 rounded border border-slate-200 bg-slate-50 p-6">
          <p className="font-medium">Nenhuma hipótese cadastrada ainda.</p>
          <p className="mt-2 text-sm text-slate-600">
            Para cadastrar, envie uma requisição <code>POST</code> para{" "}
            <code>/hipoteses</code> na API — a página{" "}
            <a className="underline" href={`${API}/docs`}>
              /docs
            </a>{" "}
            permite fazer isso direto do navegador.
          </p>
        </div>
      ) : (
        <ul className="mt-8 space-y-4">
          {hipoteses.map((h) => (
            <li key={h.id} className="rounded border border-slate-200 p-4">
              <div className="flex items-start justify-between gap-4">
                <p className="font-medium">Se {h.se}</p>
                <span
                  className={`shrink-0 rounded-full px-3 py-1 text-xs font-medium ${ESTADO_STYLE[h.estado]}`}
                >
                  {ESTADO_LABEL[h.estado]}
                </span>
              </div>
              <p className="mt-3 text-sm text-slate-600">
                De <strong>{h.baseline}</strong> para <strong>{h.alvo}</strong>
              </p>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
