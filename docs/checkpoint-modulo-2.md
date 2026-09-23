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
