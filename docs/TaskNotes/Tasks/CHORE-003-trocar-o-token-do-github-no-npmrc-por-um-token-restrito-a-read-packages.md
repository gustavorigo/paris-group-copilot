---
uid: chore-003
status: done
priority: normal
scheduled: 2026-09-24
completed: 2026-09-25
pomodoros: 0
createdBy: gustavorigo
tags:
- task
- chore
ai:
  parallelParts: 0
  needsReview: false
  uncertainty: low
  hintsInferred: true
---

# Trocar o token do GitHub no ~/.npmrc por um token restrito a read:packages

Description here.

## Subtasks
- [x] Gerar PAT classic no GitHub com escopo apenas read:packages
- [x] Substituir o token em ~/.npmrc e validar com npm view @parisgroup-ai/pg-devkit
- [x] Revogar o escopo read:packages do token do gh CLI — decidido NAO revogar (ver Decisao)
## Notes

## Decisão — escopo `read:packages` mantido no token do `gh`

O objetivo da tarefa era tirar do disco o token amplo: o `~/.npmrc` guardava o token do `gh`, com acesso de leitura e escrita a todos os repositórios. **Isso foi resolvido** — o arquivo agora usa um token classic restrito a `read:packages`, verificado com instalação limpa do PageShell 30.5.4.

O escopo `read:packages` continua no token do `gh`, e isso é decisão consciente, não pendência.

**Por quê:** `gh auth refresh -s` só adiciona escopo, nunca remove — autorizações OAuth no GitHub são acumulativas. Remover exigiria revogar a autorização do GitHub CLI em `github.com/settings/applications` e refazer o `gh auth login`.

**Custo x benefício:** o token já tem `repo`, que é muito mais amplo que `read:packages`. O ganho de segurança seria marginal, e o custo é desconectar a ferramenta usada o dia inteiro, com risco de reconfiguração.

**Quando revisar:** se o token do `gh` for reduzido por outro motivo, ou se a Paris definir política de escopo mínimo para as máquinas do time.

**Estado verificado em 2026-09-25:**

| Item | Estado |
|---|---|
| Token amplo em arquivo de disco | removido |
| `~/.npmrc` com token dedicado | funcionando, instalação limpa testada |
| Secret `PG_PACKAGES_TOKEN` na CI | funcionando, última execução verde |
| `~/.npmrc.bak` com token antigo | apagado |
| Escopo extra no token do `gh` | mantido por decisão |
