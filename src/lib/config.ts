/**
 * Configuração do frontend por ambiente.
 *
 * O frontend fala com o backend FastAPI, não com o banco. Por isso a
 * única variável obrigatória aqui é a URL da API — a credencial do
 * PostgreSQL é exigida do backend, onde ela é de fato usada.
 *
 * Em produção, variável obrigatória ausente derruba a aplicação na
 * subida, com o nome do que falta. Melhor falhar no deploy do que
 * servir requisição com configuração incompleta.
 */

type Ambiente = "development" | "production" | "test";

const ambiente = (process.env.NODE_ENV ?? "development") as Ambiente;

/** Variáveis que o frontend exige em produção. */
const OBRIGATORIAS_EM_PRODUCAO = ["NEXT_PUBLIC_API_URL"] as const;

function exigir(nome: string, padraoLocal: string): string {
  const valor = process.env[nome];
  if (valor) return valor;

  if (ambiente === "production") {
    throw new Error(
      `Configuração ausente: ${nome} não está definida. ` +
        `Em produção esta variável é obrigatória — defina-a no ambiente de deploy ` +
        `antes de subir a aplicação. Referência: .env.production.example`,
    );
  }

  return padraoLocal;
}

export const config = {
  ambiente,
  /** URL do backend FastAPI. Única variável obrigatória do frontend. */
  apiUrl: exigir("NEXT_PUBLIC_API_URL", "http://localhost:8000"),
  /** Cache. Opcional enquanto não há uso no frontend. */
  redisUrl: process.env.REDIS_URL ?? null,
} as const;

/** Checagem explícita, para rodar na subida em produção. */
export function validarConfiguracao(): void {
  if (ambiente !== "production") return;
  const faltando = OBRIGATORIAS_EM_PRODUCAO.filter((n) => !process.env[n]);
  if (faltando.length > 0) {
    throw new Error(
      `Configuração incompleta para produção. Faltam: ${faltando.join(", ")}. ` +
        `Veja .env.production.example.`,
    );
  }
}
