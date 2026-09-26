# Checkpoint — Módulo 3: Scaffolding e Estrutura do Produto

> **Nota:** o material do módulo apresenta o PageShell como CLI de scaffolding (`pageshell init`). Verificado: esse comando não existe. O PageShell é a biblioteca de componentes `@parisgroup-ai/pageshell` (v30.5.2, em `pg-platform/packages/pageshell`); o scaffolding de produto novo é `pg-devkit new <produto>`. As respostas abaixo tratam do que foi efetivamente construído e verificado.

## 1. O que é o PageShell e que problema resolve no studio

**O que é:** uma biblioteca de páginas e componentes prontos — composites declarativos como `ListPage`, `FormModal`, `DashboardPage`, `KanbanBoard`, mais os tokens de tema da Paris com um preset por produto.

**O problema que resolve, num studio com vários MVPs:**

1. **Cada produto não redesenha a mesma tela.** A listagem de hipóteses foi declarada, não desenhada: campos e seus papéis (`title`, `description`, `badge`), e a aparência veio da biblioteca.
2. **Quando a Paris muda o visual, todos os produtos mudam juntos.** Tela montada à mão fica para trás; composite acompanha.
3. **Quem troca de produto reconhece os componentes.** Mobilidade de time sem custo de reaprendizado — o ativo mais escasso num studio com equipe compartilhada.

Ganhos concretos observados ao migrar a tela de hipóteses para `SimpleListPage`: alternância lista/cartão e estado vazio no padrão da casa, nenhum dos dois escritos à mão.

## 2. Estrutura de diretórios e responsabilidade de cada uma

| Pasta | Responsabilidade | O que há nela |
|---|---|---|
| `src/app/` | rotas (App Router) — cada pasta é uma URL | `hipotese/page.tsx`, `projeto/page.tsx`, `layout.tsx` |
| `src/components/` | componentes reutilizáveis | `HipotesesBadge`, `ProjetosList`, `HipotesesList`, `AppLayout` |
| `src/lib/` | código que não é tela: clientes, configuração, utilitários | `api/client.ts`, `config.ts` |
| `src/types/` | formato dos dados | `api.d.ts` — gerado do contrato, não editado à mão |
| `src/pages/` | rotas no Pages Router | `projects/index.tsx`, `projects/[id].tsx` |
| `api/` | backend FastAPI | modelos, schemas, endpoints |

Cada pasta responde uma pergunta diferente: `app/` = onde o usuário chega; `components/` = o que aparece; `lib/` = como o sistema fala com o mundo; `types/` = qual o formato do dado. Quem precisa mudar o jeito de falar com a API vai direto em `lib/` sem caçar.

**Teste da convenção:** uma função que formata data em português iria em `lib/` — não é tela, não é rota, não é tipo.

## 3. Componente de página vs. componente reutilizável

| | Página | Componente reutilizável |
|---|---|---|
| Quantas vezes é usada | uma — é uma URL | muitas |
| Quem busca os dados | ela | ninguém; recebe pronto por props |
| Papel | orquestra e entrega | desenha um pedaço |

**Exemplo do projeto:** `HipotesesBadge` é usado em três telas — na lista de projetos, em `/projects` e em `/projects/[id]` — sem uma única alteração. As três calculam o número de formas diferentes e passam pronto:

```tsx
<HipotesesBadge quantidade={row.hipoteses} />
<HipotesesBadge quantidade={p.hipoteses} />
<HipotesesBadge quantidade={hipoteses.length} />
```

Ele funciona em qualquer lugar porque só pede um número. Se buscasse os próprios dados, só funcionaria onde a API estivesse acessível.

**Regra prática:** se é preciso alterar o componente para usá-lo num lugar novo, ele está fazendo coisa demais. Componente bem feito se usa sem abrir.

## 4. Contra "faço as telas à mão, dá na mesma"

Três argumentos, do mais fraco ao mais forte:

1. Dá mais trabalho.
2. Não fica no padrão — cinco pessoas interpretam o mesmo pedido de cinco formas.
3. **O mais forte: fazer à mão custa uma vez; manter à mão custa todo mês.** No dia que a empresa muda o visual, cinco produtos feitos à mão viram cinco trabalhos.

O colega compara o dia da construção, onde a diferença é pequena. O custo real está na operação — o mesmo raciocínio da exceção ao chassi: a decisão não dói no dia em que é tomada.

## 5. Conexão com o contrato OpenAPI

A corrente tem cinco elos, todos no repositório:

```
FastAPI  →  /openapi.json  →  npm run api:types  →  src/types/api.d.ts
                                                          ↓
                          PageShell  ←  const CHAVES  ←  HipoteseRow
```

**O ponto de conexão** está em `src/components/hipoteses/hipoteses-list.tsx`:

```ts
export type HipoteseRow = components["schemas"]["HipoteseOut"];
```

O tipo da tela **é** o tipo do backend — não uma cópia.

**A trava extra** existe porque o `SimpleListPage` aceita `key` como texto livre; um campo renomeado passaria despercebido:

```ts
const CHAVES = ["se", "baseline", "alvo", "estado"] as const
  satisfies readonly (keyof HipoteseRow)[];
```

**Verificado na prática:** renomeando `alvo` para `meta` em `api/schemas.py` e regenerando os tipos, o typecheck falhou com `Type '"alvo"' is not assignable to ...`. Revertido, voltou a passar. A divergência deixa de ser silenciosa.

Campo novo no backend fica disponível na tela com um comando: `npm run api:types`.

## 6. Três primeiros passos para adaptar ao domínio do Copilot

**1. Gerar os tipos do contrato.** Definem o que existe no domínio: Projeto tem nome, contexto e dor; Hipótese tem se, então, porque, baseline, alvo e estado.

**2. Criar as rotas.** Dizem onde o usuário chega. E elas nascem das entidades: `/projeto` e `/hipotese` existem porque Projeto e Hipótese existem.

**3. Criar os componentes.** Desenham o que já está definido.

**Por que essa ordem:** domínio → estrutura → aparência. Começar pelos componentes significa desenhar telas para dados que talvez não existam — o erro clássico de quem parte do protótipo visual e descobre depois que o backend não tem aquele campo.

É a mesma ordem do curso: o Módulo 1 enquadrou o problema, o Módulo 2 organizou o trabalho, o Módulo 3 construiu.

**4. Registrar cada adaptação.** Toda mudança sobre a base ganha rastro, senão daqui a seis meses ninguém sabe se foi decisão ou descuido. No projeto, isso aconteceu em três camadas:

| Onde | O quê |
|---|---|
| **TaskNotes** | uma tarefa por adaptação, com subtasks refletindo o estado real — `FEAT-002` (tipar o cliente pelo contrato), `FEAT-003` (lista com selo), `CHORE-004` (rotas exigidas pelo validador) |
| **Mensagem de commit** | o *porquê*, não só o *o quê*. O commit das rotas em `pages/` registra que a duplicação de roteador existe por exigência do validador, e não por escolha de arquitetura |
| **Documentos no repositório** | `docs/arquitetura.md` justifica cada decisão de stack; `docs/pair-programming.md` registra o que foi aceito e rejeitado do que o agente gerou; `docs/curso-descompassos.md` lista onde o material diverge da stack real |

**Exemplos de decisões que ficaram documentadas em vez de implícitas:**

- **Dois roteadores no mesmo projeto.** `/projects` em Pages Router convive com `/projeto` em App Router. O commit explica que o critério do módulo exigia Pages Router enquanto o chassi define App Router.
- **`DATABASE_URL` fora das obrigatórias do frontend.** A CI quebrou com a mensagem da própria trava de configuração. Em vez de silenciar com um valor falso, a variável saiu da lista — o frontend fala com o FastAPI, não com o banco. O commit registra o raciocínio.
- **Trava de chaves com `satisfies`.** Existe porque o `SimpleListPage` aceita `key` como texto livre. O comentário no código explica o buraco que ela fecha.
- **Backend em Python mantido, mas não recomendado.** Registrado em `docs/arquitetura.md` como divergência do chassi Full-TS, com a recomendação de não adotar — e como decisão pendente no handoff do PR, com dono e prazo.

Sem esse registro, o próximo desenvolvedor encontra duas pastas de rotas e um backend fora do padrão, e não tem como distinguir decisão de descuido. Com ele, cada desvio carrega o motivo e o custo de reverter.
