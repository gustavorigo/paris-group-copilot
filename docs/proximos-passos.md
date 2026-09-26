# O que falta — passo a passo

Estado em 2026-09-25. Curso em 94%, três módulos concluídos.

Quatro blocos, do mais rápido ao que depende de outras pessoas.

---

## Bloco 1 — Cinco minutos, você faz sozinho agora

### 1.1 Revogar o escopo extra do token do `gh`

O `~/.npmrc` já usa um token dedicado, então o `gh` não precisa mais de `read:packages`.

```bash
gh auth refresh -s repo,read:org,gist,admin:public_key
```

Abre o navegador para autorizar, igual antes. Depois confere:

```bash
gh auth status | grep -i scopes
# não deve mais aparecer 'read:packages'
npm view @parisgroup-ai/pageshell version
# deve continuar funcionando — usa o token do .npmrc, não o do gh
```

Fecha a `CHORE-003`.

### 1.2 Apagar o backup com o token antigo

```bash
rm ~/.npmrc.bak
```

Ele guarda o token amplo do `gh` em texto. Não serve mais.

### 1.3 Desligar o que está rodando

```bash
cd ~/www/cursos/onboarding/paris-group-copilot
docker compose down          # para o banco e a API
pkill -f "next dev"          # para o servidor do frontend
```

Para voltar depois: `docker compose up -d && npm run dev`.

---

## Bloco 2 — Depende de acesso: peça ao seu lead

Um pedido só resolve três pendências:

> "Preciso de acesso ao **Loom**, ao **Orca/AsyncMe** e ao **PG-Vault**."

### 2.1 Com o Loom e o Orca em mãos — fecha a `DOC-001`

1. Abra `docs/sprint-update.md` — o roteiro de 3 minutos está pronto
2. Suba a aplicação (`docker compose up -d && npm run dev`)
3. Grave seguindo o roteiro: 30s de contexto, 90s de demonstração em `/projeto` e `/hipotese`, 30s de bloqueios, 30s de próximos passos
4. Cole o link em `docs/sprint-update.md` (campo "Link do vídeo") e na descrição do PR #1
5. Publique o handoff no Orca e cole esse link também

Isso tira a aula "mundo real" do Módulo 2 dos 65/100.

### 2.2 Com o PG-Vault — fecha a `CHORE-002`

```bash
git clone git@github.com:parisgroup-ai/<repo-do-vault>.git ~/Vaults/PG-Vault
echo 'export TASKNOTES_ROOT="$HOME/Vaults/PG-Vault"' >> ~/.zshrc
```

A partir daí o `tn` funciona de qualquer pasta, não só dentro do projeto.

---

## Bloco 3 — Decisões que dependem do time

### 3.1 `CHORE-001` — FastAPI ou TypeScript ponta a ponta

A decisão mais crítica, e a que encarece a cada dia. Leve ao lead:

- O backend atual está em Python, divergindo do chassi Full-TS
- Trocar agora: ~1 semana. Daqui a 3 meses: ~1 mês
- A justificativa completa está em `docs/arquitetura.md`

### 3.2 `TASK-001` — medir o baseline real dos 20 dias

O número no enquadramento é estimativa. Pegue os últimos 3 ou 4 enquadramentos feitos sem a ferramenta, meça quantos dias cada um levou, calcule a média e atualize `docs/enquadramento.md`.

Sem isso, o critério de sucesso não tem chão: é possível "reduzir de 20 para 10" e descobrir que o normal já era 12.

### 3.3 Enviar o levantamento de descompassos

`docs/curso-descompassos.md` lista sete pontos onde o material do curso diverge da stack, com evidência. Leia antes de enviar e ajuste o tom se algo não soar como você falaria.

---

## Bloco 4 — Técnico, quando quiser

### 4.1 `FEAT-001` — verificar a tela de lista vazia

A única subtask que ficou aberta por honestidade: o caminho de lista vazia em `/hipotese` nunca foi exercitado.

```bash
docker compose up -d
docker compose exec db psql -U copilot -d copilot -c "DELETE FROM hipoteses;"
# abrir http://localhost:3000/hipotese e conferir a mensagem
# depois recriar as hipóteses pelo /docs da API
```

### 4.2 Decidir o destino do PR #1

Ele está aberto com todo o trabalho. Três caminhos:

- **Fazer merge** — a CI está verde, a `main` aceita
- **Deixar aberto** — serve de portfólio do onboarding
- **Fechar sem merge** — se preferir que a `main` fique como estava

Não há resposta certa. É repositório de estudo.

---

## Resumo

| Bloco | Tarefas | Depende de |
|---|---|---|
| 1 | `CHORE-003` | ninguém — 5 minutos |
| 2 | `DOC-001`, `CHORE-002` | acesso do lead |
| 3 | `CHORE-001`, `TASK-001` | decisão do time |
| 4 | `FEAT-001`, PR #1 | quando quiser |

Tudo está registrado no TaskNotes. Nada se perde:

```bash
cd ~/www/cursos/onboarding/paris-group-copilot && tn list
```
