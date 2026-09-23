# Paris Group Copilot

Copiloto de venture studio para discovery e execução de MVPs com IA.

> Projeto de estudo. Produto e persona são um cenário de treino.

## Documentação

- [Enquadramento do problema](docs/enquadramento.md) — contexto, dor do usuário, hipótese de valor, métrica de validação e fora de escopo.
- [Arquitetura](docs/arquitetura.md) — justificativa de cada decisão de stack no contexto de venture studio.
- [Caso de treino: Fênix Studio](docs/caso-fenix-studio.md) — exercício de enquadramento, hipótese, stack e ciclo de vida em 6 semanas.
- [Pair programming com IA](docs/pair-programming.md) — o pedido com critérios, o que foi aceito e o que foi rejeitado na revisão.

## Stack

- Next.js (App Router) + TypeScript
- Tailwind CSS
- ESLint

## Rodando localmente

```bash
npm install
npm run dev
```

## Rotas

| Rota | Entidade |
|---|---|
| `/projeto` | Visão geral de um produto do studio |
| `/hipotese` | Enquadramento e hipóteses do produto |
