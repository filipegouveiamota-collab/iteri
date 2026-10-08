# ITERI

Oportunidades remuneradas dentro da PUC-Rio, num lugar só.

O ITERI reúne as oportunidades internas da universidade (monitoria, iniciação
científica com bolsa PIBIC ou PIBITI, laboratórios e apoio a eventos) num feed
único. O aluno preenche o perfil acadêmico uma vez e se candidata em um clique;
setores e professores publicam vagas e recebem candidaturas num formato
padronizado.

- **App:** https://iteri.com.br
- **Vídeo (2 min):** [PREENCHER: link do YouTube, não listado]
- **Documentação do processo:** [Roteiro](docs/ROTEIRO.md) ·
  [AI Log](docs/AI_LOG.md) · [Relatório Final](docs/RELATORIO_FINAL.md)
- **Análise de dados:** [`analysis/`](analysis/) · [resultados](analysis/RESULTADOS.md)

## Caso escolhido

**Case 1: Oportunidades integradas**, do Impact Lab SIEng 2026 (PUC-Rio),
repositório oficial [igor-peres/impact-lab-sieng2026](https://github.com/igor-peres/impact-lab-sieng2026).

Estágio fica fora do produto: 3.220 dos 3.550 anúncios do `vagas.csv` (90,7%) são
estágios publicados por uma única empresa_id, provável agente de integração, num
canal que já existe.

## Equipe

- Filipe Gouveia Mota, [PREENCHER: curso e período]
- Pedro Henrique C. Kubrusly, [PREENCHER: curso e período]

(nomes tirados do deck anterior)

## Stack

| Camada | Tecnologia |
|---|---|
| Frontend | React 18, Vite 6, React Router 7, Tailwind CSS 4, shadcn/Radix, design system do ITERI (Figma) |
| Backend | Supabase: Postgres com RLS, Auth com OTP por e-mail, Edge Functions (Deno) |
| E-mail | Trigger Postgres → `pg_net` → Edge Function `send-notification-email` → Resend |
| Hospedagem | Vercel |
| Análise | Python 3, pandas |

## Como rodar do zero

### 1. Pré-requisitos

Node 20 ou mais recente, [Supabase CLI](https://supabase.com/docs/guides/cli),
uma conta no Supabase e uma no [Resend](https://resend.com).

### 2. Banco

```bash
supabase login
supabase link --project-ref <SEU_PROJECT_REF>
```

Antes de aplicar as migrations, troque a URL fixa da Edge Function em
`supabase/migrations/20260725090000_notification_email_trigger.sql`
(`https://oarkrgnjaheqjosgbdpj.supabase.co/...`) pela do seu projeto. Depois:

```bash
supabase db push
```

Crie o segredo que o trigger usa para chamar a função. Ele não é versionado; rode
no editor SQL do projeto:

```sql
select vault.create_secret('<SEGREDO_ALEATORIO>', 'webhook_secret');
```

### 3. Edge Function de e-mail

```bash
supabase secrets set RESEND_API_KEY=<chave> RESEND_FROM_EMAIL=<remetente verificado> \
  WEBHOOK_SECRET=<mesmo SEGREDO_ALEATORIO> SITE_URL=http://localhost:5173
supabase functions deploy send-notification-email --no-verify-jwt
```

`--no-verify-jwt` é intencional: quem chama é o trigger, autenticado pelo segredo
compartilhado.

### 4. Frontend

Crie `.env.local` na raiz (já ignorado pelo git):

```bash
VITE_SUPABASE_URL=https://<SEU_PROJECT_REF>.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=<chave publishable do projeto>
```

```bash
npm install
npm run dev     # http://localhost:5173
```

Para receber os e-mails de confirmação em ambiente local, ajuste a Site URL e as
URLs de redirecionamento em Authentication → URL Configuration no painel do
Supabase.

### 5. Análise de dados

```bash
pip install -r analysis/requirements.txt
python analysis/baixar_dados.py
python analysis/run_all.py
```

## Estrutura

```
src/app/         páginas, componentes, hooks e cliente Supabase
supabase/        migrations (schema, RLS, triggers, grants) e Edge Function
analysis/        scripts de análise do Case 1 e resultados agregados
docs/            Roteiro, AI Log e Relatório Final
video/           projeto do vídeo de apresentação
```

## Créditos

Criação com dados e apoio da PUC-Rio (Diretoria de Sistemas de Informação),
sujeita à Política de Inovação da universidade. Componentes de
[shadcn/ui](https://ui.shadcn.com/) (MIT) e fotos do [Unsplash](https://unsplash.com);
ver `ATTRIBUTIONS.md`.
