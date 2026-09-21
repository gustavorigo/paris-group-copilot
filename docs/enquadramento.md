# Enquadramento — Paris Group Copilot

> Cenário de treino. Produto e persona fictícios, usados para praticar o método de enquadramento de problema.

## 1. Contexto

Um cliente procurou o studio com um pedido específico e a ideia entrou no radar. Marina é quem conduz a descoberta: ela precisa transformar esse pedido difuso em um problema enquadrado, com hipótese de valor testável, antes que qualquer linha de código seja escrita.

Hoje isso leva cerca de 20 dias. A maior parte desse tempo não é escrevendo — é procurando o que já foi feito em produtos anteriores do studio. Hipóteses parecidas já foram testadas antes, algumas confirmadas e outras refutadas, mas esse histórico está espalhado em documentos, conversas e na memória de quem participou. Marina reconstrói do zero um conhecimento que o studio já tem.

## 2. Dor do Usuário

Marina leva **20 dias** entre receber uma ideia e ter um enquadramento pronto, a cada novo produto do studio, porque **não existe um lugar único onde os enquadramentos e hipóteses dos produtos anteriores fiquem registrados, consultáveis e reaproveitáveis**.

## 3. Hipótese de Valor

**Se** o Copilot sugerir enquadramentos baseados em MVPs anteriores, **então** Marina conseguirá reduzir o tempo entre a ideia e o enquadramento pronto **de 20 para 10 dias**, **porque** ela deixa de partir do zero — o Copilot entrega um rascunho fundamentado nos produtos anteriores, e o trabalho dela passa a ser revisar e ajustar em vez de criar.

## 4. Métrica de Validação

Acompanhar **5 enquadramentos** conduzidos com o Copilot, medindo os dias entre a entrada da ideia e o enquadramento pronto.

| Faixa | Resultado | Decisão |
|---|---|---|
| 4 ou 5 de 5 saem em ≤ 10 dias | Confirmada | Investir |
| 2 ou 3 de 5 | Inconclusiva | Há sinal — ajustar e testar de novo |
| Menos de 2 de 5 | Refutada | Matar a hipótese |

## 5. Fora de Escopo

- **Sem login e múltiplos usuários** — apenas uma pessoa conduz o teste da hipótese; autenticação não interfere na medição.
- **Sem integração com Notion** — o rascunho sugerido pelo Copilot não depende de estar dentro do Notion para ser útil ao enquadramento.
