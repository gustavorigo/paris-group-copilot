# Onboarding "Paris Group Copilot" — descompassos entre o material e a stack

**Autor:** Gustavo Rigo · **Data:** 2026-09-25
**Contexto:** levantado durante a execução do curso de onboarding (matrícula em 2026-09-04), módulos 1 a 3.

Os conceitos do curso — enquadramento de problema, hipótese de valor com métrica, ciclo de vida de produto com IA, chassi compartilhado, handoff assíncrono, critério de aceitação em prompts — estão corretos e são a parte que mais rende. Os pontos abaixo são de **comandos e estrutura**, verificados contra os repositórios e as ferramentas instaladas.

Cada item traz: o que o material diz, o que existe, como verificar e o impacto.

---

## 1. `pageshell init` não existe

**Material (Módulo 3, aula 2 e 3):** apresenta o PageShell como CLI de scaffolding.

```bash
pageshell init paris-group-copilot --template next-fastapi --with-auth --with-api ...
```

**Realidade:** não há CLI `pageshell`. O PageShell é a **biblioteca de componentes** `@parisgroup-ai/pageshell` (v30.5.2), em `pg-platform/packages/pageshell`. Os repositórios `pageshell`, `pageshell-core` e `pageshell-native` estão **arquivados** desde maio/2026, com a descrição "MIGRADO → pg-platform/packages/… (Fase 2)".

O scaffolding de produto novo é `pg-devkit new <produto>` — *"Create a new PG product from the template in one command (repo + install + devkit + .env)"*, conforme `pg-devkit --help`.

**Verificação:** `command -v pageshell` não retorna nada; `gh repo list parisgroup-ai | grep pageshell` mostra os três arquivados.

**Impacto:** o aluno não consegue executar a aula. Não há como inferir o comando certo pelo material.

---

## 2. Critérios do Módulo 3 exigem Pages Router

**Material (Módulo 3, aula 3 — critérios de aceitação):** exige `pages/index.tsx` e `pages/_app.tsx`.

**Realidade:** `pages/` é o roteador legado do Next.js. Todo o projeto do curso — inclusive as rotas criadas no Módulo 1 — usa **App Router** (`src/app/`), que é o padrão da casa e o roteador atual do framework.

**Conflito técnico:** `pages/index.tsx` e `app/page.tsx` resolvem para a mesma rota `/`. Ter os dois quebra o build. Atender o critério exige **desfazer** a estrutura construída no Módulo 1.

**Impacto:** beco sem saída. O aluno escolhe entre quebrar o projeto ou reprovar o critério. Reprovei conscientemente (65/100) e documentei a decisão.

---

## 3. Desafio do Módulo 1 contradiz a aula 3 do Módulo 1

**Aula 3 (Módulo 1):** ensina que a Paris abandonou frontend e backend em linguagens separadas com contrato OpenAPI, porque gera divergência silenciosa e alucinação de contrato em agentes. O padrão é TypeScript ponta a ponta com tRPC.

**Desafio da aula 4 (mesmo módulo):** exige backend **FastAPI** com contrato **OpenAPI**, e pede justificativa de arquitetura.

**Impacto:** o aluno constrói o padrão que a aula anterior desaconselha, três lições depois. É recuperável como exercício — construir o padrão que se vai rejeitar ensina — mas convém o enunciado dizer isso explicitamente.

---

## 4. `tn log` descrito como registro de texto

**Material (Módulo 2, aula 3):** `tn log <UID> "mensagem"` — *"Registra notas de progresso e links de PR associados."*

**Realidade:** `tn log` registra **tempo**. Com texto, falha:

```
$ tn log FEAT-001 "Lista implementada..."
✗ error: invalid duration: ... (expected: 2h, 30m, 1h30m, or plain minutes)
```

**Impacto:** baixo, mas o aluno perde tempo. Vale apontar o comando certo para anotação de contexto (`tn context`, `tn session log`).

---

## 5. Checkpoint do Módulo 2 cobra comando nunca ensinado

**Material:** a pergunta 2 do checkpoint pede os passos de `claude-devkit init` e o que ele configura.

**Realidade:** nenhuma aula do módulo apresenta `claude-devkit`. As aulas ensinam `pg-devkit doctor` e `workflow-policy.sh set-mode pr`. O binário `claude-devkit` existe — é o alias legado do `pg-devkit` — mas o aluno não tem como saber pelo material.

**Impacto:** reprova no checkpoint por conteúdo não ensinado. Ajustar a pergunta para `pg-devkit` resolve.

---

## 6. Nomenclatura: Orca vs. AsyncMe

O material alterna entre "Orca" e "AsyncMe" para a mesma ferramenta de handoff, às vezes na mesma aula. Confunde quem está chegando e não sabe se são dois produtos.

---

## 7. Atrito de acesso no onboarding

Dois bloqueios de acesso interromperam exercícios. Não são erros de conteúdo, mas afetam quem chega:

| Ferramenta | Situação |
|---|---|
| `@parisgroup-ai/pg-devkit` | está no GitHub Packages, não no npm público. Exige `read:packages` no token e `.npmrc` configurado — o material não menciona. Resolvido com `gh auth refresh -s read:packages`. |
| Loom e Orca/AsyncMe | sem conta, a aula "mundo real" do Módulo 2 não fecha. Ficou em 65/100 com o roteiro pronto, aguardando acesso. |
| PG-Vault | sem clone, `TASKNOTES_ROOT` não se configura como a aula pede. Contornado com `.tasknotes.toml` no projeto. |

**Sugestão:** um passo zero de onboarding listando os acessos necessários antes da aula 1 do Módulo 2 evitaria os três.

---

## Sugestão de encaminhamento

1. **Prioridade alta:** itens 1 e 2 — travam a execução do Módulo 3.
2. **Prioridade média:** itens 3 e 5 — contradição interna e pergunta sem aula.
3. **Prioridade baixa:** itens 4 e 6 — atrito, não bloqueio.
4. **Processo:** os erros têm um padrão comum — descrevem a stack como ela *seria*, não como ela *está*. Gerar as aulas de comando a partir da saída real de `--help` e dos README dos pacotes, e não de descrição, evitaria a recorrência.

Ofereço-me para revisar os módulos 1 a 3 contra a stack atual, se for útil.
