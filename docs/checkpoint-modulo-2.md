# Checkpoint — Módulo 2: Colaboração com IA e Ferramentas de Execução

## 1. Pair programming com IA em ciclos curtos

**Papéis:** o humano decide e revisa; o agente implementa.

**O que caracteriza o ciclo curto:** escopo pequeno, entrega verificável e uma parada para decidir antes do próximo passo.

**Por que importa:** se o rumo estiver errado, a descoberta acontece em minutos, não em dias. É o mesmo princípio do MVP — falhar barato e cedo.

## 2. Inicialização do projeto com o devkit

> Nota: as lições deste módulo apresentaram `pg-devkit doctor` e `workflow-policy.sh set-mode pr`, não `claude-devkit init`. A resposta abaixo cobre o que esse tipo de inicialização configura, conforme ensinado.

A inicialização configura duas coisas no repositório:

**Governança de Git.** O commit vai para uma branch dedicada e alguém aprova via Pull Request antes de entrar na `main`. Não é combinado verbal — é travado por configuração no clone local, então não depende de ninguém lembrar da regra.

**Contexto para o agente.** Os arquivos `AGENTS.md` e `CLAUDE.md` na raiz do repositório carregam a arquitetura, as convenções e as regras canônicas do projeto. O agente lê antes de escrever. Sem eles, o agente chuta as regras da casa — e chute com aparência de certeza é o pior tipo de erro.

## 3. TaskNotes CLI vs. GitHub Issues

**Argumento principal:** com o `tn` não é preciso sair do terminal para registrar. Toda troca de janela custa foco, e o que custa foco não é registrado — o progresso simplesmente deixa de ser anotado.

**Argumento complementar:** as tarefas do TaskNotes são arquivos dentro do repositório, versionados junto com o código. A tarefa viaja com o projeto: quem clona recebe o histórico junto. No GitHub Issues, a tarefa mora num site, separada do código.

Os dois têm lugar: Issue serve para conversa com quem está fora do código; TaskNotes serve para quem está com a mão nele.

## 4. Elementos mínimos de um handoff

- **Contexto** — o que foi construído e o que foi testado
- **Decisões** — que caminhos foram escolhidos e por quê
- **Bloqueios com dono** — bloqueio sem responsável nomeado não é resolvido por ninguém
- **Próximos passos com prazo** — sem prazo, a lista é decorativa

## 5. Erro mais comum ao especificar um prompt

**O erro:** pedido vago, sem dizer o que é aceitar.

**Como critérios e exemplos evitam:** sabendo o que aceitar, dá para rejeitar o que não está de acordo. Sem critério declarado antes, não existe "rejeitar" — só existe concordar com o que veio.

Há ainda um efeito de segunda ordem: escrever o critério obriga quem pede a decidir o que quer. Boa parte das entregas erradas vem de pedido vago, e o pedido estava vago porque a decisão ainda não tinha sido tomada.

## 6. Template de PR padronizado

**Para que serve:** para que ninguém esqueça o que precisa informar. A padronização é inegociável num studio que mantém vários produtos simultâneos — quem revisa um PR de um produto que não conhece precisa encontrar a informação no mesmo lugar.

**Seções:**

- **Contexto** — o que mudou no código e a justificativa técnica
- **Evidência** — prova tangível de validação: typecheck sem erros, testes verdes, link do Loom
- **Rastreabilidade** — referência explícita à Issue ou à TaskNote
- **Integridade de contratos** — alinhamento com o chassi Full-TS da organização
- **Handoff** — contexto, decisões pendentes e próximos passos, para que o PR também sirva de passagem de bastão

---

## Complementos após revisão

### Complemento à pergunta 2 — inicialização do projeto

O ecossistema de devkit expõe um comando de inicialização executado **na raiz do repositório** (`claude-devkit init` no ecossistema Claude DevKit; na frota da Paris Group as lições apresentaram `pg-devkit doctor` e `workflow-policy.sh set-mode pr`).

Rodar esse comando na raiz gera a **estrutura padrão de configuração** do repositório: os arquivos de contexto para o agente (`AGENTS.md`, `CLAUDE.md`), a configuração de governança de Git que barra push direto na `main`, e os arquivos de política e diagnóstico do devkit. O efeito é que um repositório novo já nasce com as regras da casa escritas e travadas, em vez de depender de cada pessoa configurar do seu jeito.

### Complemento à pergunta 3 — rastreamento de tempo e sessão no TaskNotes

Além de não exigir sair do terminal e de versionar as tarefas junto com o código, o TaskNotes CLI é otimizado para **rastreamento de tempo, sessões de trabalho e contexto da tarefa ativa** — algo que o GitHub Issues não faz:

- `tn start <UID>` marca a tarefa como em progresso e inicia a contagem de tempo
- `tn timer start/stop` controla o cronômetro da tarefa ativa
- `tn pomo` roda ciclos de pomodoro atrelados à tarefa
- `tn time` gera relatórios de tempo
- `tn session start/log/close` registra a sessão de trabalho e prepara o handoff
- `tn context` mantém o contexto ativo do que está sendo feito

Ou seja: o Issue registra **o que foi acordado**; o TaskNotes registra **o trabalho acontecendo** — tempo gasto, sessão, foco e contexto da tarefa ativa. São complementares.

### Complemento à pergunta 6 — sinalização de código gerado por IA

Num venture studio onde agentes escrevem código, o template de PR precisa declarar **como o código foi feito**. Sem isso, quem revisa não sabe se está lendo código escrito por pessoa ou por agente — e a revisão procura problemas diferentes em cada caso.

Seção adicionada ao template deste repositório (`.github/pull_request_template.md`):

```markdown
## Código gerado por agente

**O que foi gerado pelo agente:**      → onde o revisor deve olhar
**Critérios de aceitação passados:**   → contra o que julgar a entrega
**Aceito e rejeitado na revisão:**     → prova de que houve julgamento humano
- [ ] Revisão humana linha a linha     → quem assume o código
```

Exemplo preenchido, na entrega da listagem de hipóteses:

- **Gerado pelo agente:** `src/app/hipotese/page.tsx` inteiro
- **Critérios passados:** mostrar se, baseline, alvo e estado; tratar lista vazia com mensagem e instrução de cadastro; não incluir editar, excluir ou paginação
- **Aceito além do pedido:** aviso quando o backend está fora do ar e cor na etiqueta de estado, ambos declarados pelo agente como escolha própria
- **Rejeitado em ciclo anterior:** o backend em Python como padrão da casa
