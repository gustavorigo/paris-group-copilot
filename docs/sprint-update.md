# Atualização de sprint — comunicação assíncrona

> **Caso de treino.** O cenário da Vitalis, o CTO e os investidores da série B são fictícios, criados pelo curso. O conteúdo técnico abaixo é real e descreve o estado deste repositório.

Público: pessoas que decidem sobre o produto e **não participam das reuniões do time**. Por isso nenhuma decisão aqui é descrita por nome de tecnologia — cada uma termina em tempo, gargalo ou risco.

## Roteiro da demo (máx. 3 minutos)

| Tempo | Conteúdo |
|---|---|
| 0:00–0:30 | Problema e o que foi entregue |
| 0:30–2:00 | Produto funcionando na tela |
| 2:00–2:30 | Bloqueios |
| 2:30–3:00 | Próximos passos |

Metade do vídeo é demonstração. A outra metade é contexto e direção — vídeo que só mostra tela gera mais pergunta do que responde.

**0:00–0:30 — Abertura**

> "Em 3 minutos vou mostrar onde está o Paris Group Copilot. O problema que ele resolve: o studio leva cerca de 20 dias entre a ideia e o enquadramento pronto, e a maior parte desse tempo é procurando o que já foi feito em produtos anteriores. Nesta sprint entregamos a primeira tela que mostra as hipóteses registradas, com o estado de cada uma."

**0:30–2:00 — Demonstração**

> Abrir `/projeto`. Abrir `/hipotese` e mostrar as duas hipóteses, apontando o estado de cada uma — uma em teste, uma confirmada. Destacar que cada hipótese mostra de onde partimos e onde queremos chegar: 20 dias para 10.

**2:00–2:30 — Bloqueios**

> "Dois bloqueios. O primeiro é técnico: o backend está numa tecnologia diferente do padrão da empresa. Trocar agora custa uma semana; daqui a três meses, um mês. O segundo é de medição: o número de 20 dias é estimativa, ainda não medimos o real. Sem isso, não sabemos dizer se melhoramos."

**2:30–3:00 — Próximos passos**

> "Esta semana: decidir a tecnologia do backend, com o time. Na sequência: medir o tempo real dos enquadramentos anteriores e fechar a verificação da tela vazia."

**Link do vídeo:** _(a gravar — o roteiro acima é a base)_

## Decisões técnicas da sprint

**1. O backend está numa tecnologia diferente do padrão da empresa.**

Manter assim tem dois custos: só parte do time consegue mexer nele, o que vira gargalo quando essa pessoa está alocada em outro produto; e cada correção demora mais, porque exige conhecer duas tecnologias em vez de uma.

Trocar agora custa **1 semana**. Daqui a 3 meses, custaria **1 mês** — cada entrega feita em cima do padrão atual aumenta o tamanho da troca.

*Recomendação: decidir nesta semana.*

**2. A infraestrutura de dados foi escolhida pensando em crescimento, não no protótipo.**

A opção mais simples travaria quando várias pessoas usassem o sistema ao mesmo tempo, e exigiria uma troca cara mais à frente. A escolha atual suporta uso simultâneo desde o primeiro cliente e evita essa migração.

**3. O ambiente de desenvolvimento é reproduzível com um comando.**

Pessoa nova no time produz no primeiro dia, em vez de gastar dias configurando máquina. Elimina também a classe de erro que só aparece no computador de uma pessoa — o tipo mais caro de diagnosticar.

## Bloqueios ativos

| Bloqueio | Por que trava | Dono | Prazo |
|---|---|---|---|
| Tecnologia do backend indefinida | cada entrega feita sobre o padrão atual aumenta o custo da troca | lead informa, time decide | 1 semana |
| Baseline de 20 dias não medido | sem o número real, não há como afirmar que houve melhora | time | 1 semana |

**Mais crítico:** o primeiro. O custo dele cresce a cada dia. O segundo só trava quando o teste começar.

## Próximos passos

| Ação | Responsável | Prazo |
|---|---|---|
| Decidir a tecnologia do backend | lead e time | 1 semana |
| Medir o tempo real dos enquadramentos anteriores | time | 1 semana |
| Verificar a tela de lista vazia e fechar FEAT-001 | eu | 1 dia |
| Solicitar acesso ao ferramental interno | eu solicito, o lead resolve | 2 dias |
