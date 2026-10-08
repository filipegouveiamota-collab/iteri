# AI Log

Só as interações que mudaram a solução. Cada entrada aponta a evidência no
repositório. Campos que dependem da memória da equipe estão marcados [PREENCHER].

Entradas 1 a 5: construção do app (julho de 2026). Entradas 6 a 9: análise de dados
refeita em outubro de 2026, numa sessão do Claude Code cujo registro completo a
equipe tem.

---

## 1. Arquitetura de rotas e fluxos

- **Objetivo:** definir telas, rotas e fluxos dos três perfis antes de codar.
- **Contexto:** design system do ITERI importado do Figma (`IteriDsTokens`,
  `IteriDsComponentes`), React Router instalado, `App.tsx` vazio.
- **Instrução:** Claude Code em modo de plano. [PREENCHER: prompt usado]
- **Resultado:** plano com árvore de rotas, guardas por papel, fluxos de aluno e
  ofertante e a decisão de deixar `/opportunities/:id` pública para compartilhar
  em grupos. Evidência: `plans/quero-planejar-os-fluxos-silly-blossom.md`.
- **Validação:** [PREENCHER]
- **Decisão:** as rotas de `src/app/routes.tsx` seguem o plano.

## 2. Controle de acesso no banco, não no frontend

- **Objetivo:** garantir que o ofertante só veja dados de quem se candidatou.
- **Contexto:** schema com 7 tabelas no Supabase.
- **Instrução:** [PREENCHER]
- **Resultado:** RLS ligado nas 7 tabelas, com políticas como
  `profiles_select_by_offerer_for_applicants`; trigger que impede mudar de papel.
  Evidência: `supabase/migrations/20260724120002_rls_policies.sql` e
  `20260724120001_functions_triggers.sql`.
- **Validação:** [PREENCHER: como foi testado que um ofertante não lê perfis alheios]
- **Decisão:** nenhuma regra de acesso depende só do frontend.

## 3. Tabelas inacessíveis apesar das políticas RLS

- **Objetivo:** fazer a API enxergar as tabelas.
- **Contexto:** erro "permission denied for table profiles", inclusive para
  `service_role` na Edge Function.
- **Instrução:** [PREENCHER]
- **Resultado:** diagnóstico de que projetos novos do Supabase não concedem
  privilégios automáticos às roles da API; o RLS só é avaliado depois do GRANT.
  Evidência: `20260725091500_api_role_grants.sql`,
  `20260725091600_anon_applications_grant.sql`, `20260725095500_service_role_grants.sql`.
- **Validação:** [PREENCHER]
- **Decisão:** GRANTs explícitos por tabela e por role, versionados em migration.

## 4. Pipeline de e-mail sem Database Webhooks

- **Objetivo:** mandar e-mail quando uma notificação é criada.
- **Contexto:** o recurso Database Webhooks do painel depende do schema
  `supabase_functions`, que não existia no projeto.
- **Instrução:** [PREENCHER]
- **Resultado:** trigger próprio chamando a Edge Function via `pg_net`, com
  segredo compartilhado lido do Vault. Uma função de diagnóstico foi criada e
  depois removida. Evidência: `20260725090000_notification_email_trigger.sql`,
  `20260725094500_debug_notification_pipeline.sql`, `20260725120000_drop_debug_rpc.sql`.
- **Validação:** a função de diagnóstico expunha o log HTTP do `pg_net`; foi
  removida quando o envio funcionou de ponta a ponta (comentário da migration
  `20260725120000`).
- **Decisão:** manter o trigger próprio; não usar Database Webhooks.

## 5. Troca de SendGrid por Resend

- **Objetivo:** entregar e-mail nos servidores da PUC-Rio.
- **Contexto:** os servidores da PUC-Rio recusavam, de forma intermitente, os IPs
  compartilhados do SendGrid (550, IP em blocklist SPAMCOP/SPAMHAUS).
- **Instrução:** [PREENCHER]
- **Resultado:** Edge Function reescrita para o Resend. Evidência: comentário no
  topo de `supabase/functions/send-notification-email/index.ts`.
- **Validação:** [PREENCHER]
- **Decisão:** Resend como provedor de e-mail.

## 6. Os números do deck antigo não eram reproduzíveis

- **Objetivo:** conferir os números do deck antes de usá-los no vídeo.
- **Contexto:** deck em PDF, repositório do app, repositório oficial do case.
- **Instrução:** listar cada número com o valor do deck, o valor recalculado e o
  arquivo de origem; marcar "não reproduzido" quando não houver código.
- **Resultado:** o repositório não tinha CSVs, scripts nem notebooks de análise.
  O deck afirmava RLS em 12 de 12 tabelas; as migrations têm 7 tabelas.
- **Validação:** busca em todas as branches, stash e histórico do git.
- **Decisão:** refazer a análise com scripts versionados em `analysis/`. Dados
  baixados de um commit fixo do repositório oficial e fora do git.

## 7. Mudança de escopo: de estágio para oportunidade interna

- **Objetivo:** escolher o que a análise e o vídeo cobrem.
- **Contexto:** a IA tinha começado um funil de estágios e uma taxonomia de áreas
  em cima do texto dos anúncios.
- **Instrução:** a equipe interrompeu: o ITERI trata de monitoria, PIBIC, PIBITI,
  laboratórios e eventos; estágio entra só como justificativa de escopo.
- **Resultado:** o trabalho de estágio foi reduzido a um script de apoio
  (`analysis/00_escopo_estagio.py`) e a taxonomia foi descartada. Cinco perguntas
  sobre oportunidades internas foram propostas; a equipe deixou as premissas a
  critério da IA, e elas ficaram registradas no código.
- **Validação:** antes de calcular, cada arquivo foi inspecionado (colunas, o que é
  uma linha, período, o que permite e não permite afirmar). Resultado em
  `analysis/README.md`.
- **Decisão:** perguntas 1 a 5 de `analysis/`.

## 8. Falsos positivos no interesse acadêmico

- **Objetivo:** contar alunos com interesse em pesquisa, docência ou monitoria.
- **Contexto:** 1.444 rótulos de texto livre (`aluno_interesses.csv`).
- **Instrução:** grupos de termos com casamento no início de palavra.
- **Resultado:** a primeira versão contava "acadêmico" e "científico" soltos, o que
  pegava frases como "aplicar meus conhecimentos acadêmicos" e "divulgação
  científica". Total inicial: 38 alunos.
- **Validação:** listar todos os rótulos que casaram e ler um a um.
- **Decisão:** remover os dois termos e excluir "pesquisa de mercado/opinião".
  Total corrigido: 33 de 713 alunos (4,6%). (`analysis/04_interesse_academico.py`)

## 9. Leitura de "candidatos por bolsa"

- **Objetivo:** estimar quantos alunos poderiam disputar cada bolsa PIBIC/PIBITI.
- **Contexto:** os IDs não cruzam; o cruzamento é por curso, via tabela manual.
- **Instrução:** contar alunos de graduação matriculados nos cursos de cada
  departamento e dividir pelas bolsas de 2026.
- **Resultado:** Química, Matemática, Física, História, Educação e Ciências
  Sociais ficaram com até 1 candidato por bolsa.
- **Validação:** conferir a distribuição de cursos em `alunos.csv`: Química tem 1
  aluno. A base é de um sistema de estágio e quase não tem alunos de ciências
  básicas.
- **Decisão:** não apresentar como "falta de candidatos". Fica como limitação: o
  cadastro de estágio não alcança o público das bolsas de pesquisa.
  (`analysis/03_candidatos_potenciais.py`)
