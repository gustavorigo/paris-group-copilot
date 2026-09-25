/**
 * Configuração da aplicação por ambiente.
 *
 * Em produção, variável obrigatória ausente derruba a aplicação na subida,
 * com mensagem dizendo qual falta. É melhor falhar no deploy do que servir
 * requisição com configuração incompleta.
 */

type Ambiente = "development" | "production" | "test";

const ambiente = (process.env.NODE_ENV ?? "development") as Ambiente;

/** Variáveis exigidas em produção. Em desenvolvimento há padrão local. */
const OBRIGATORIAS_EM_PRODUCAO = ["NEXT_PUBLIC_API_URL", "DATABASE_URL"] as const;

function exigir(nome: string, padraoLocal?: string): string {
  const valor = process.env[nome];
  if (valor) return valor;

  if (ambiente === "production") {
    throw new Error(
      `Configuração ausente: ${nome} não está definida. ` +
        `Em produção esta variável é obrigatória — defina-a no ambiente de deploy ` +
        `antes de subir a aplicação. Referência: .env.production.example`,
    );
  }

  if (padraoLocal !== undefined) return padraoLocal;

  throw new Error(
    `Configuração ausente: ${nome}. Copie .env.production.example para .env.local e preencha.`,
  );
}

export const config = {
  ambiente,
  /** URL do backend FastAPI. */
  apiUrl: exigir("NEXT_PUBLIC_API_URL", "http://localhost:8000"),
  /** Conexão com o PostgreSQL. Só usada no servidor. */
  databaseUrl: exigir(
    "DATABASE_URL",
    "postgresql+psycopg://copilot:copilot@localhost:5433/copilot",
  ),
  /** Conexão com o Redis. Opcional enquanto não há cache. */
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
