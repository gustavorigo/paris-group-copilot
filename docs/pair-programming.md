# Ciclo de pair programming com IA — backend do Copilot

Registro do ciclo humano + agente na construção do backend deste repositório: o que foi pedido, com quais critérios, e o que foi aceito ou rejeitado na revisão.

## O pedido, com critérios de aceitação

Pedido que seria feito para refazer o backend no padrão da casa:

> Refaz o backend em TypeScript. Critérios:
> - tem que usar tRPC, com o tipo do banco fluindo até a tela
> - não pode ter duas linguagens no projeto
> - tem que passar no `typecheck`

Os três critérios são verificáveis sem discussão: ou o tipo vem do banco, ou não vem; ou existe uma linguagem, ou existem duas; ou o `typecheck` passa, ou não passa.

## O que foi aceito

**A estrutura das entidades.** `Projeto` e `Hipotese` refletem o documento de enquadramento: os campos `se`, `entao`, `porque`, `metrica`, `baseline`, `alvo` e `estado` são a decisão de produto virando estrutura de dados.

Isso se mantém em qualquer linguagem — é modelagem de domínio, não escolha técnica.

## O que foi rejeitado

**O backend em Python.** Duas linguagens no mesmo projeto geram divergência silenciosa entre frontend e backend — exatamente o custo que o contrato automático do FastAPI deveria evitar.

A rejeição é do padrão, não do código: ele funciona e está testado. Mas não deve virar chassi da frota. A justificativa completa está em [`arquitetura.md`](arquitetura.md).

## Aprendizado do ciclo

O agente executou bem o que foi especificado. A decisão de arquitetura continuou sendo humana — e foi contrária ao enunciado do exercício.

A qualidade do ciclo veio do critério explícito na revisão, não do volume de código gerado. Sem critério declarado antes, não há como aceitar ou rejeitar: só há como concordar com o que veio.
