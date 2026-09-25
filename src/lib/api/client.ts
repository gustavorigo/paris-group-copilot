import createClient from "openapi-fetch";

import { config } from "@/lib/config";
import type { paths } from "@/types/api";

/**
 * Cliente HTTP tipado pelo contrato OpenAPI do backend.
 *
 * Os tipos em src/types/api.d.ts são gerados do /openapi.json do FastAPI:
 *
 *   npm run api:types
 *
 * Não edite o arquivo de tipos à mão. Se o backend mudar um campo, a
 * regeneração faz o erro aparecer na compilação — não em produção.
 */
export const api = createClient<paths>({ baseUrl: config.apiUrl });
