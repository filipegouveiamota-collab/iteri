# Roteiro

> **Aviso de honestidade.** O edital pede o Roteiro antes da construção. Não
> encontramos um Roteiro escrito antes do código no repositório. Este documento foi
> reconstruído depois, a partir do plano versionado em
> `plans/quero-planejar-os-fluxos-silly-blossom.md`, do histórico do git e do
> código. Onde não há evidência, está marcado [PREENCHER].

## Entendimento

O Case 1 pergunta como cruzar o que o aluno é (curso, período, interesses) com o
que está aberto na universidade. Na PUC-Rio, a oportunidade interna remunerada
(monitoria, bolsa PIBIC ou PIBITI, laboratório, apoio a eventos) fica espalhada:
monitoria mora no departamento, iniciação científica é combinada direto com o
professor. O aluno não sabe onde procurar, e quem oferece não tem um canal para
publicar e receber candidaturas comparáveis.

[PREENCHER: reescrever com as palavras da equipe, se quiserem.]

## Escopo

**Obrigatório**
- Cadastro restrito a e-mail institucional: `@aluno.puc-rio.br` para aluno e
  `@puc-rio.br` (ou subdomínio de departamento) para ofertante.
- Perfil acadêmico padronizado do aluno, preenchido uma vez no onboarding.
- Feed de oportunidades com busca e filtros por categoria: Monitoria, Iniciação
  Científica, Eventos e Laboratórios.
- Candidatura em um clique e acompanhamento de status (em análise, aprovada,
  rejeitada).
- Painel do ofertante: publicar, editar e encerrar vagas, ver candidatos e decidir.
- Notificação por e-mail quando o status muda.
- Controle de acesso no banco: o ofertante só vê o perfil de quem se candidatou a
  uma vaga dele.

**Desejável**
- Recomendação de vagas por perfil, com motivo explicável.
- Mostrar ao ofertante quantos alunos poderiam ocupar cada vaga.
- Análise dos dados do case para dimensionar a oferta interna.

**Fora**
- Estágio. O `vagas.csv` é 99,3% estágio, e 3.220 dos 3.550 anúncios (90,7%) vêm
  de uma única empresa_id, provável agente de integração. É um canal externo que
  já existe (Vagas Online da CCESP). O ITERI trata do que não tem canal: a
  oportunidade interna. (`analysis/00_escopo_estagio.py`)
- Importar os dados do case para dentro do app.
- Mestrado e pós-graduação.

## Decisões técnicas

- **Frontend:** React 18, Vite 6, React Router 7, Tailwind CSS 4, componentes
  shadcn/Radix e o design system do ITERI importado do Figma
  (`src/imports/IteriDsTokens`, `src/imports/IteriDsComponentes`).
- **Backend:** Supabase (Postgres, Auth com OTP por e-mail, Edge Functions). Sem
  servidor próprio: as regras de acesso ficam em políticas RLS nas 7 tabelas
  (`supabase/migrations/20260724120002_rls_policies.sql`).
- **E-mail:** trigger Postgres chama a Edge Function `send-notification-email`
  via `pg_net`; envio pelo Resend.
- **Hospedagem:** Vercel, com rewrite de SPA (`vercel.json`), em
  https://iteri.com.br.
- **Dados do case:** `monitorias.csv`, `PibicPibiti_vagasoferecidas.xlsx`,
  `alunos.csv`, `aluno_interesses.csv` e `vagas.csv`, analisados offline em Python
  (`analysis/`). O app não importa esses arquivos.

## Decomposição

Reconstruída do plano versionado e dos commits:

1. Arquitetura de rotas e fluxos dos três perfis: público, aluno e ofertante
   (`plans/quero-planejar-os-fluxos-silly-blossom.md`).
2. Telas a partir do design system do Figma.
3. Schema, funções, triggers e políticas RLS no Supabase (migrations de 24/07/2026).
4. Integração do frontend com o Supabase (`src/app/lib/api.ts`, hooks).
5. Pipeline de e-mail de notificação (migrations de 25/07/2026).
6. Recuperação de senha e deploy na Vercel (commits `ce15205` e `5585f84`).
7. Análise reproduzível dos dados do case (`analysis/`).
8. Vídeo de apresentação (`video/`).

[PREENCHER: confirmar a ordem real e as datas de cada etapa.]

## Critérios de aceite

- Um e-mail fora do domínio da PUC-Rio não consegue se cadastrar
  (`src/app/lib/validators.ts`).
- Um aluno logado vê vagas ativas, se candidata e vê o status mudar quando o
  ofertante decide.
- O aluno recebe e-mail quando o status muda.
- Um ofertante não consegue ler o perfil de um aluno que não se candidatou a uma
  vaga dele, mesmo chamando a API diretamente (política RLS).
- O papel do usuário não muda depois do cadastro (trigger `prevent_role_change`).
- Toda afirmação numérica do vídeo e do relatório sai de `python analysis/run_all.py`.

[PREENCHER: dizer quais critérios foram testados à mão e como.]

## Estratégia de IA

- **Claude Code** para planejar a arquitetura (o plano em `plans/` é saída do
  modo de plano), escrever o código e as migrations, depurar o pipeline de e-mail
  e, depois, refazer a análise de dados com scripts. Os commits do repositório
  trazem `Co-Authored-By: Claude`.
- **Figma Make** para gerar a base visual a partir do design system (o
  `package.json` se chama `@figma/my-make-file` e o `ATTRIBUTIONS.md` é do Figma
  Make).
- **Regra para os números:** nenhum número entra na apresentação sem um script
  versionado que o produza.

[PREENCHER: como a equipe dividiu o trabalho com a IA e o que revisava antes de aceitar.]
