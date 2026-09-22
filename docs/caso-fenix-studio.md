# Caso de treino — Fênix Studio

> **Caso de treino.** A Fênix Studio, as clínicas-piloto e todos os números são fictícios, criados pelo curso para praticar enquadramento, hipótese, arquitetura e ciclo de vida. Não representam cliente, produto ou dado real.

## 1. Enquadramento do problema

**Público-alvo:** clínicas de pequeno porte, sem time de TI.

**Problema central:** ninguém confirma a consulta com o paciente antes do dia marcado. A clínica não tem quem faça esse contato ativo.

**Contexto de uso:** a dor aparece na véspera, quando a recepção olha a agenda do dia seguinte e não sabe quem vai aparecer — e no dia, quando a cadeira fica vazia.

**Consequência mensurável:** 30% das consultas agendadas não acontecem. Como o custo fixo (aluguel, salário, estrutura) não cai junto com a receita, o impacto no lucro é proporcionalmente maior que 30%.

## 2. Hipótese de valor

**Se** a clínica confirmar as consultas automaticamente pelo WhatsApp, **então** ela vai reduzir os horários sem paciente **de 30% para 10%**, **porque** o paciente é lembrado e aparece, e quando não pode vir ele avisa a tempo da clínica revender o horário.

**Métrica principal:** percentual de horários sem paciente, por clínica.

**Critério de sucesso em 6 semanas:** as 3 clínicas-piloto precisam cair para 10% ou menos. O critério é por clínica, não pela soma — somar permitiria que uma clínica excepcional carregasse o resultado enquanto as outras duas não melhoram.

**Nota sobre os mecanismos:** são dois, e eles funcionam de formas diferentes. No primeiro, a falta é evitada (o paciente lembra e vem). No segundo, a falta acontece mas o horário é recuperado (o paciente avisa e a clínica revende). O segundo é mais robusto, porque não depende de convencer ninguém a mudar de ideia. Num teste mais maduro valeria separar as duas contagens, para saber qual mecanismo respondeu.

## 3. Arquitetura da stack

O studio já tem chassi. Este produto herda, não escolhe de novo:

| Camada | Escolha | Justificativa no modelo de studio |
|---|---|---|
| Frontend | Next.js | Padrão da frota; o time compartilhado entra em qualquer produto sem reaprender |
| Backend e comunicação | TypeScript + tRPC | Tipo único do dado até a tela, sem contrato manual para desatualizar |
| Dados | PostgreSQL | Mesmo backup, mesma migração e mesmo conhecimento servindo todos os produtos |
| IA | Portão único de modelos, com métrica | Observabilidade e custo centralizados; não se reinventa por produto |
| Deploy | Automático a cada mudança | Esteira já pronta; produto novo não monta pipeline do zero |

Com 4 engenheiros, 2 PMs e 1 designer dividindo três produtos ativos, reescolher stack por produto custaria mobilidade do time — que é o ativo mais escasso aqui.

### Maior risco técnico: a integração com WhatsApp

É a única camada que depende de terceiro. Quem decide é a Meta:

- a conta comercial precisa ser aprovada;
- cada modelo de mensagem automática precisa de aprovação prévia;
- se houver negativa ou demora, não existe plano B imediato.

Com prazo de 6 semanas, uma aprovação de três semanas mata o projeto. Todas as outras camadas o studio já executou três vezes — risco conhecido e baixo.

**Decisão:** o pedido de aprovação é a primeira ação da semana 1. A aprovação é tempo de espera, não tempo de trabalho: o time constrói o resto em paralelo. Se vier negativa, ainda restam cinco semanas para trocar de canal (SMS, e-mail, ligação automática).

## 4. Ciclo de vida do produto em 6 semanas

| Quando | O quê |
|---|---|
| Semana 1 | Pedido de aprovação enviado à Meta. Enquadramento e hipótese fechados. |
| Semanas 1–3 | Construção do MVP. |
| Semana 3 | Produto nas mãos das 3 clínicas-piloto. |
| Semanas 3–6 | Uso real e medição. |

**Descoberta —** entregável: este documento. Fechado na semana 1.

**MVP —** entregável: **apenas a confirmação de consultas pelo WhatsApp.** Detecção de padrões de cancelamento e sugestão de horários alternativos ficam fora do MVP: nenhuma das duas é necessária para medir se os horários vazios caem de 30% para 10%.

**Instrumentação —** entregável: contagem de horários agendados e de horários sem paciente, por clínica, gravada desde o primeiro dia de uso. Entra junto com o MVP, não depois — sem saber medir, não se sabe o que construir.

**Qualidade do modelo —** entregável: critério de aceite para as mensagens geradas pela IA. A mensagem precisa ser compreendida e respondida. Acompanhar taxa de resposta e casos em que a resposta do paciente foi interpretada errado. Sem isso, um resultado ruim não distingue falha de produto de falha do modelo.

### Feito na mão de propósito

A revenda do horário não é automatizada no MVP. O paciente responde que não pode vir, a recepcionista lê e liga para outro paciente. Se funcionar na mão, vale automatizar depois. Se não funcionar na mão, foram economizadas semanas construindo automação para algo que ninguém usa.

Metade do prazo construindo, metade medindo. Construir até a semana 6 entregaria um produto sem nenhuma evidência sobre ele.
