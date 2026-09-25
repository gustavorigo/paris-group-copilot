---
uid: feat-002
status: done
priority: high
scheduled: 2026-09-25
completed: 2026-09-25
pomodoros: 0
createdBy: gustavorigo
firstStartedAt: 2026-09-25T19:58:59.308212Z
filesTouched:
- .env.production.example
- .gitignore
- api/__pycache__/database.cpython-312.pyc
- api/__pycache__/main.cpython-312.pyc
- api/__pycache__/models.cpython-312.pyc
- api/__pycache__/schemas.cpython-312.pyc
- docs/TaskNotes/Tasks/FEAT-002-tipar-o-cliente-da-api-a-partir-do-contrato-openapi-e-isolar-configuracao-por-ambiente.md
- package-lock.json
- package.json
- src/app/hipotese/page.tsx
- src/components/hipoteses/hipoteses-list.tsx
- src/lib/api/client.ts
- src/lib/config.ts
- src/types/api.d.ts
commits:
- 3b6a502
- e1859af
tags:
- task
- feat
ai:
  parallelParts: 0
  needsReview: true
  uncertainty: med
  hintsInferred: true
---

# Tipar o cliente da API a partir do contrato OpenAPI e isolar configuracao por ambiente

Description here.

## Subtasks
- [x] Gerar os tipos TypeScript a partir do /openapi.json do FastAPI
- [x] Trocar o fetch com tipo escrito a mao por cliente tipado
- [x] Isolar configuracao em lib/config.ts com validacao por ambiente
## Notes
