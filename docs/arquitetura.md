# Arquitetura — Paris Group Copilot

> Cenário de treino. As decisões abaixo são justificadas no contexto de um venture studio que cria vários produtos com o mesmo time.

## PostgreSQL, não SQLite

O SQLite trava o arquivo inteiro a cada escrita. Enquanto um processo grava, os outros esperam. Com pouca gente ninguém percebe; com o produto crescendo, vira fila. E o MVP existe para crescer.

Testar num banco e rodar em produção com outro cria uma classe de erro que só aparece na frente do cliente, porque os dois bancos se comportam diferente em detalhes. Paridade de ambiente: testar sempre no mesmo banco que roda de verdade.

**No contexto de studio:** um banco só para todos os produtos significa o mesmo procedimento de backup, a mesma estratégia de migração e o mesmo conhecimento servindo a frota inteira. Se cada produto escolhe seu banco, esse aprendizado não passa de um para o outro — e o studio deixa de ser mais rápido que uma startup isolada.

## FastAPI — construído aqui, mas não recomendado como padrão

**A favor:** o FastAPI gera o contrato OpenAPI a partir do próprio código. Contrato gerado não desatualiza. Isso pesa mais num studio do que numa empresa de produto único, porque as mesmas pessoas e os mesmos agentes de IA circulam entre produtos e precisam confiar no que leem sobre um backend que não conhecem. Documentação escrita à mão desatualiza, e quem chega confia num documento errado.

**Contra, e esta é a recomendação:** manter duas linguagens no mesmo projeto não se paga. A separação entre frontend e backend em linguagens diferentes cria divergência silenciosa — justamente o custo que o contrato automático deveria evitar. Se for necessário documentar, escrever à mão ou com outro auxílio sai mais barato do que sustentar duas linguagens, dois conjuntos de dependências e dois modelos de dados duplicados.

**No padrão canônico (TypeScript ponta a ponta), o problema não existe.** Com tRPC o tipo é o contrato: o frontend conhece o formato do dado porque é o mesmo código. Não há documento para desatualizar, porque não há documento. O FastAPI resolve bem um problema que o Full-TS simplesmente não tem.

Este backend foi construído para exercitar o padrão, não para ser adotado.

## Next.js, não Remix

Os dois resolvem o mesmo problema com qualidade equivalente. Não há vencedor técnico claro para este caso.

É exatamente por isso que o critério de decisão muda: **quando as opções empatam tecnicamente, quem decide é o padrão do studio, não a preferência do time.** Gastar reunião para escolher entre coisas equivalentes é desperdício, e escolher diferente em cada produto fragmenta a frota.

E o produto número 5 não escolhe de novo. O valor não está na escolha — está em todos usarem a mesma. Exceção ao padrão não é proibida, é encarecida: precisa de justificativa com número, porque complexidade só se paga com retorno medido.

## Docker

Cada produto carrega sua própria versão do banco declarada dentro do repositório, sem conflito com outros projetos na mesma máquina. Um desenvolvedor novo roda um comando e tem o ambiente idêntico ao de todo mundo — acaba o "na minha máquina funciona".

O ganho não aparece no primeiro dia, quando instalar direto seria mais rápido. Aparece no quinto produto e no décimo desenvolvedor.

## Estrutura do repositório

```
paris-group-copilot/
├── docker-compose.yml      db (PostgreSQL 16) + api (FastAPI)
├── docs/
│   ├── enquadramento.md    contexto, dor, hipótese, métricas, fora de escopo
│   └── arquitetura.md      este documento
├── api/                    backend Python
│   ├── main.py             endpoints /projetos e /hipoteses
│   ├── models.py           tabelas Projeto e Hipotese
│   ├── schemas.py          contratos de entrada e saída
│   └── database.py         conexão com o PostgreSQL
└── src/app/                frontend Next.js
    ├── projeto/page.tsx    rota /projeto
    └── hipotese/page.tsx   rota /hipotese
```

As entidades do backend espelham o documento de enquadramento: `Hipotese` guarda `se`, `entao`, `porque`, `metrica`, `baseline`, `alvo` e `estado`. O formato dos dados é a decisão de produto, não uma escolha técnica separada.
