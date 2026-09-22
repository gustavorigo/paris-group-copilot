# Checkpoint — Módulo 1: Fundamentos de Studio, Produto e Stack

## 1. Venture Studio vs. aceleradora ou incubadora

A aceleradora investe e orienta. O studio constrói junto.

Por isso, no studio o time, a tecnologia e o histórico de aprendizados são compartilhados entre os produtos — não é acidental, é estrutural.

A consequência prática: quando se escolhe a tecnologia do produto 1, está se escolhendo também para os produtos futuros. A decisão de stack não é sobre o produto atual, é sobre a frota.

## 2. Ciclo de vida do produto com IA

As cinco etapas: **descoberta, MVP, instrumentação, qualidade do modelo e evolução**.

**Critério de conclusão do MVP:** o MVP acaba quando a hipótese de valor já pode ser testada — não quando o produto está completo.

Instrumentação e qualidade do modelo são etapas distintas, que vêm depois.

## 3. Hipótese de valor — app de transcrição de consultas médicas (produto fictício)

**Problema:** durante o atendimento, o médico perde tempo escrevendo o prontuário em vez de olhar para o paciente.

**Público:** médicos em consultório.

**Mecanismo de IA:** transcrição de áudio e geração de texto — o app grava a consulta e redige o prontuário automaticamente.

**Hipótese:** Se o app transcrever a consulta por áudio e gerar o prontuário automaticamente, então o médico vai reduzir o tempo de escrita de **10 para 2 minutos por consulta**, porque ele deixa de digitar durante o atendimento e passa apenas a revisar o texto depois.

**Métrica de validação:** minutos por consulta gastos com o prontuário.

## 4. Risco de não definir o contrato de API

**No produto:** o frontend quebra e ninguém percebe até dar erro. Backend e frontend divergem em silêncio, e o bug de integração aparece tarde, difícil de rastrear.

**No studio:** o problema se espalha para os outros produtos. Se um componente feito sem contrato é reaproveitado, cada produto que o herda herda também a inconsistência. O retrabalho se multiplica pela frota em vez de ficar contido em um produto.

## 5. Camadas padronizadas na stack reutilizável

**Frontend, backend, dados, IA e deploy.**

**Por que dados e IA não podem ser ignorados no MVP inicial:** sem decisão de padronização nessas camadas, não existe baseline para medir a qualidade do modelo depois. As etapas seguintes do ciclo — instrumentação e qualidade do modelo — dependem de algo registrado desde o MVP. Sem baseline, não há como saber se melhorou ou piorou.

## 6. Por que "colocar IA em tudo" no MVP é um erro crítico

Porque o erro é herdado por todos os produtos.

Num studio, o chassi é compartilhado: a IA desnecessária que entra no produto 1 vira custo de manutenção em todos os produtos que herdarem aquele padrão. A reutilização espalha o que é bom e o que é ruim com a mesma eficiência.

Além disso, cada função de IA sem hipótese e sem critério de aceite é uma aposta cega: se o produto vai mal, não se sabe qual delas atrapalhou, nem se alguma ajudou. E IA falha de forma difícil de diagnosticar — inventa resposta errada com cara de certa, demora demais, responde fora de política. Cada integração sem critério aumenta a superfície de falha sem oferecer diagnóstico.
