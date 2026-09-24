---
uid: chore-003
status: open
priority: normal
scheduled: 2026-09-24
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
- [ ] Gerar PAT classic no GitHub com escopo apenas read:packages
- [ ] Substituir o token em ~/.npmrc e validar com npm view @parisgroup-ai/pg-devkit
- [ ] Revogar o escopo read:packages do token do gh CLI
## Notes
