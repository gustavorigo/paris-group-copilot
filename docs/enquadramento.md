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

### Unidade de medida

Um **enquadramento** começa quando uma ideia nova entra no radar do studio e termina quando existe um documento como este — contexto, dor, hipótese, métrica e fora de escopo — pronto para uso. O relógio corre entre esses dois pontos.

"Conduzido com o Copilot" significa que, naquele enquadramento, a ferramenta foi usada no lugar do processo antigo: em vez de abrir um documento em branco e vasculhar o histórico manualmente, a pessoa parte de um rascunho sugerido e o trabalho vira revisar e ajustar.

### Métrica principal

Acompanhar **5 enquadramentos** conduzidos com o Copilot, medindo os dias entre a entrada da ideia e o enquadramento pronto.

| Faixa | Resultado | Decisão |
|---|---|---|
| 4 ou 5 de 5 saem em ≤ 10 dias | Confirmada | Investir |
| 2 ou 3 de 5 | Inconclusiva | Ajustar e rodar nova leva |
| Menos de 2 de 5 | Refutada | Matar a hipótese |

> ⚠️ **Baseline a aferir.** Os 20 dias são uma estimativa, não uma medição. Antes de rodar o teste, medir quanto levaram de fato os últimos 3 ou 4 enquadramentos feitos sem a ferramenta. Se o baseline estiver errado, todo o resultado está errado: é possível "reduzir de 20 para 10" e descobrir que o normal já era 12.

### Métrica de guarda — qualidade do enquadramento

Cada um dos 5 enquadramentos é revisado por um integrante do time **que não participou daquele enquadramento**, contra uma régua objetiva de 5 itens:

1. Tem métrica de resultado (não de satisfação)?
2. Tem baseline e alvo, com número?
3. O segmento é listável?
4. O critério de aceite pode ser perdido?
5. O "porque" aponta mecanismo, em vez de repetir o benefício?

**Aprovado:** 5 de 5 itens.

**Regra de decisão:** a hipótese só é confirmada se a métrica principal bater **e** a métrica de guarda se mantiver. Enquadramento entregue em 8 dias que falha na régua não conta como sucesso — conta como dívida.

### Validação de problema

Antes de fechar cada enquadramento, conversar com pelo menos **2 pessoas de fora do time** que vivem a dor descrita, confirmando que ela existe e com que frequência acontece.

### Sobre a amostra

5 enquadramentos é **sinal direcional, não prova estatística**. Serve para decidir se vale continuar investindo — não para afirmar que o Copilot funciona em qualquer studio.

### Regra de saída do inconclusivo

Resultado inconclusivo (2 ou 3 de 5) → ajustar a funcionalidade e rodar nova leva de 5. **Até 3 rodadas de ajuste.** Se na quarta ainda for inconclusivo, matar a hipótese: três rodadas sem sinal claro significam que o problema não é a execução, é a tese.

## 5. Fora de Escopo

- **Sem login e múltiplos usuários** — apenas uma pessoa conduz o teste da hipótese; autenticação não interfere na medição.
- **Sem integração com Notion** — o rascunho sugerido pelo Copilot não depende dela para ser útil ao enquadramento.
