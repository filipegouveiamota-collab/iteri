# ITERI — Arquitetura de Informação e Fluxos Completos

## Contexto

ITERI é um SaaS que conecta estudantes universitários a oportunidades remuneradas no campus (monitorias, IC, eventos, laboratórios). O objetivo é implementar a plataforma completa com três perfis: Landing Page pública, Estudante e Ofertante. O projeto já possui design system Figma importado (IteriDsTokens + IteriDsComponentes), React Router 7.13.0 instalado, 49 componentes shadcn/Radix disponíveis e o App.tsx vazio.

---

## 1. Arquitetura de Rotas

```
Router
├── / (LandingPage)                          ← NavbarPublic + Footer
├── /login
├── /register                               ← seleção de papel
│   ├── /register/student
│   └── /register/offerer
├── /opportunities/:id                      ← PÚBLICA; candidatura exige login
│
├── StudentRoute (guard: role=student + onboarding)
│   ├── /student/onboarding               ← wizard obrigatório no 1º acesso
│   ├── /student/feed                     ← feed principal
│   ├── /student/applications             ← tracker de candidaturas
│   └── /student/profile                  ← editor de currículo
│
├── OffererRoute (guard: role=offerer + onboarding)
│   ├── /offerer/onboarding
│   ├── /offerer/dashboard
│   ├── /offerer/opportunities
│   ├── /offerer/opportunities/new
│   ├── /offerer/opportunities/:id/edit
│   ├── /offerer/opportunities/:id/candidates
│   └── /offerer/opportunities/:id/candidates/:candidateId
│
└── * (NotFoundPage)
```

**Decisão-chave:** `/opportunities/:id` é pública para permitir compartilhamento (WhatsApp, grupos da universidade). A ação "Candidatar-se" redireciona para `/login?redirect=...` se o usuário não estiver autenticado.

---

## 2. Fluxos por Perfil

### Landing Page (`/`)

Seções em ordem:
1. **Hero** — Headline + dois CTAs: "Sou Estudante" (→ /register/student) e "Sou Professor/Coordenador" (→ /register/offerer) + link "Já tenho conta → Entrar"
2. **Stats Bar** — vagas ativas, universidades parceiras, total pago a estudantes
3. **Como Funciona — Estudante** — 3 passos: Crie o perfil → Explore vagas → Candidate-se em 1 clique
4. **Como Funciona — Ofertante** — 3 passos: Publique → Receba candidaturas → Selecione
5. **Oportunidades em Destaque** — 3–4 cards (JobCardNovo, JobCardUrgente) com "Ver mais"
6. **Categorias** — 4 chips: Monitoria (teal) / IC (orange) / Eventos (amber) / Laboratórios (purple)
7. **Depoimentos** — estudantes + ofertantes
8. **CTA Final** — banner teal + botão "Criar conta grátis"
9. **Footer** — ColBrand, ColStudents, ColUniversities, ColContact + FooterLine (DS)

Navbar: `NavbarPublic` do DS (Logo, links institucionais, "Entrar" + "Criar Conta").

---

### Fluxo do Estudante

**1. Cadastro (`/register/student`)**
- E-mail institucional (validar `.edu.br` ou domínios conhecidos)
- Senha + confirmação
- Verificação de e-mail → tela de espera → confirmação

**2. Onboarding (`/student/onboarding`) — wizard 3 etapas, barra de progresso**
- Etapa 1 — Dados Pessoais: nome, CPF, telefone, data de nascimento, foto
- Etapa 2 — Perfil Acadêmico: universidade (select), curso, semestre, CR, matrícula
- Etapa 3 — Currículo: habilidades (chip multi-select), idiomas + nível, bio, LinkedIn (opcional)

Todas as etapas são obrigatórias antes de acessar o feed.

**3. Feed (`/student/feed`)**
- NavbarLogged (DS) com sino de notificações + avatar
- Barra de busca + filtros: categoria (chips), universidade (dropdown), remuneração (range), ordenação
- Grid de cards responsivo (3 → 2 → 1 coluna): `JobCardDefault`, `JobCardNovo`, `JobCardUrgente`, `JobCardPreenchida`
- Estado vazio quando sem resultados

**4. Detalhes da Vaga (`/opportunities/:id`)**
- Header: título, badge de categoria, instituição
- Coluna esquerda: descrição completa, requisitos (chips de habilidades), carga horária, remuneração, prazo
- Coluna direita (sticky): card do ofertante + botão "Candidatar-se" (Primary, grande)
  - Se preenchida → botão desabilitado + badge "Preenchida"
  - Se já candidatou → "Candidatura Enviada" (state de sucesso)
  - Se não logado → redireciona para `/login?redirect=/opportunities/:id`
- Confirmação via Dialog modal antes de enviar

**5. Minhas Candidaturas (`/student/applications`)**
- Tabs: Todas / Em Análise / Aprovadas / Rejeitadas
- Tabela: título da vaga, badge de tipo, instituição, data, badge de status
  - Status: "Em Análise" (azul), "Aprovado" (verde), "Rejeitado" (vermelho)
- Clique na linha → detalhe da candidatura com timeline

**6. Perfil/Currículo (`/student/profile`)**
- Versão editável (não-wizard) das 3 etapas do onboarding
- Badge "Perfil X% Completo" com barra de progresso (DS)
- Upload de foto, dados pessoais, acadêmicos, habilidades, idiomas

---

### Fluxo do Ofertante

**1. Cadastro (`/register/offerer`)**
- E-mail institucional, nome completo
- Papel: Professor / Coordenador / Pesquisador / Técnico Administrativo (select)
- Universidade + departamento
- SIAPE ou ID institucional
- Senha + verificação de e-mail

**2. Onboarding (`/offerer/onboarding`) — wizard 2 etapas**
- Etapa 1 — Perfil Institucional: universidade, nome da unidade/departamento, logo (opcional), descrição
- Etapa 2 — Contato: e-mail de contato, telefone, URL do departamento

**3. Dashboard (`/offerer/dashboard`)**
- Layout com Sidebar (DS): Painel Geral / Vagas Ativas / Candidaturas / Documentos + avatar+nome no rodapé
- Cards de estatísticas: vagas ativas, candidaturas recebidas, pendentes de revisão, aprovados
- Tabela de candidaturas recentes: nome, vaga, data, status, ação "Revisar"
- Botão de ação rápida "Nova Vaga" (BtnIconLarge do DS)

**4. Minhas Vagas (`/offerer/opportunities`)**
- Lista/tabela com: título, tipo, status (Ativa/Rascunho/Encerrada), candidaturas, prazo
- Ações por linha: Editar / Ver Candidatos / Encerrar / Republicar
- CTA "Nova Oportunidade" no topo

**5. Publicar Vaga (`/offerer/opportunities/new`)**
Formulário em seções (página única):
- Identificação: título, tipo (select), imagem
- Detalhes: descrição, carga horária, remuneração (R$/h), data de início, prazo de candidatura
- Requisitos: habilidades (chip input), CR mínimo, curso/semestre exigido, outras observações
- Publicação: toggle "Publicar agora" vs "Salvar como rascunho"

**6. Editar Vaga (`/offerer/opportunities/:id/edit`)**
Mesmo formulário pré-preenchido. Se há candidaturas → banner de aviso de impacto.

**7. Gestão de Candidatos (`/offerer/opportunities/:id/candidates`)**
- Resumo da vaga no topo
- Tabs: Todos / Pendente / Aprovados / Rejeitados
- Tabela: avatar, nome, universidade, badge de CR, chips de habilidades, data, status
- Ações por linha: "Ver Perfil" / "Aprovar" (Primary) / "Rejeitar" (Danger)
- Seleção múltipla → aprovação/rejeição em lote

**8. Perfil do Candidato (`/offerer/opportunities/:id/candidates/:candidateId`)**
- Currículo completo do estudante em modo somente leitura
- Bar de ações no rodapé: "Aprovar Candidatura" / "Rejeitar" / "Entrar em Contato"

---

## 3. Pontos de Cruzamento entre Perfis

| Ponto | Estudante | Ofertante |
|---|---|---|
| `/opportunities/:id` | Candidata-se | Visualiza prévia da própria vaga |
| Notificações | Aprovado/Rejeitado | Nova candidatura recebida |
| Currículo do estudante | Edita | Visualiza em read-only |
| Status da candidatura | Acompanha em /applications | Define em /candidates |

**Fluxo de notificação cruzada:**
- Ofertante aprova → estudante recebe notificação "Aprovado em [Vaga X]"
- Estudante candidata → ofertante recebe notificação "Nova candidatura em [Vaga X]"
- Bell → Sheet lateral com lista de notificações linkadas

---

## 4. Gerenciamento de Estado

- **Auth:** React Context (`AuthProvider`) com `user: { id, email, role, name, avatar, onboardingCompleted } | null`, persistido em `localStorage`
- **Dados de páginas:** Loaders do React Router 7 (`loader` + `useLoaderData`) — sem Redux/Zustand
- **Formulários:** `react-hook-form` (v7.55.0) + shadcn `form.tsx`
- **Guards:** `<StudentRoute>` e `<OffererRoute>` como componentes de rota pai que renderizam `<Outlet />` após validar role + onboarding
- **Feedback:** `toast` do `sonner` para ações assíncronas; `Dialog` do shadcn para confirmações

---

## 5. Mapeamento DS → Telas

| Componente DS | Usado em |
|---|---|
| `NavbarPublic` | Landing, /login, /register, /opportunities/:id (não logado) |
| `NavbarLogged` | Todas as telas do estudante |
| `Sidebar` | Todas as telas do ofertante |
| `Footer` | Landing page |
| `JobCardDefault/Novo/Urgente/Preenchida` | Feed do estudante, landing |
| Badges de categoria (Monitoria/IC/Eventos/Labs) | Cards, detalhes da vaga, filtros |
| Badges de status (Em Análise/Aprovado/Rejeitado) | /student/applications, /offerer/candidates |
| "Perfil X% Completo" | /student/profile |
| Badge "CR: 8.2" | Tabela de candidatos |
| Chips de habilidade | Currículo, detalhes da vaga, candidatos |
| Input/Textarea/Select estados | Todos os formulários |
| `BtnIconLarge` "Criar Oportunidade" | Dashboard do ofertante |
| StatusSucesso/Erro/Alerta/Info | Feedback de ações em formulários |

---

## 6. Estrutura de Arquivos

```
src/app/
  App.tsx                         ← RouterProvider
  routes.ts                       ← createBrowserRouter completo
  contexts/
    AuthContext.tsx
    NotificationContext.tsx
  guards/
    StudentRoute.tsx
    OffererRoute.tsx
  layouts/
    PublicLayout.tsx              ← NavbarPublic + Outlet + Footer
    StudentLayout.tsx             ← NavbarLogged + Outlet
    OffererLayout.tsx             ← Sidebar + Outlet
  pages/
    public/
      LandingPage.tsx
      LoginPage.tsx
      RegisterPage.tsx
      RegisterStudentPage.tsx
      RegisterOffererPage.tsx
      OpportunityDetailPage.tsx
    student/
      OnboardingPage.tsx
      FeedPage.tsx
      ApplicationsPage.tsx
      ProfilePage.tsx
    offerer/
      OnboardingPage.tsx
      DashboardPage.tsx
      OpportunitiesPage.tsx
      NewOpportunityPage.tsx
      EditOpportunityPage.tsx
      CandidatesPage.tsx
      CandidateProfilePage.tsx
    NotFoundPage.tsx
  components/
    shared/
      JobCard.tsx                 ← variant: default|new|urgent|filled
      CategoryBadge.tsx
      StatusBadge.tsx
      NotificationSheet.tsx
      ConfirmDialog.tsx
      ProfileCompletenessBar.tsx
      SkillChipInput.tsx
      SearchFilterBar.tsx
    landing/
      HeroSection.tsx
      HowItWorks.tsx
      FeaturedOpportunities.tsx
      CategoryGrid.tsx
      TestimonialsSection.tsx
      CTABanner.tsx
    student/
      ApplicationRow.tsx
      OnboardingWizard.tsx
    offerer/
      StatCard.tsx
      OpportunityRow.tsx
      CandidateRow.tsx
      OpportunityForm.tsx         ← compartilhado entre new e edit
  lib/
    types.ts                      ← User, Opportunity, Application, Candidate
    constants.ts                  ← tipos de vaga, lista de universidades, habilidades
    validators.ts                 ← validação de e-mail institucional, CR
    api.ts                        ← fetch wrapper com auth headers (mock para MVP)
  hooks/
    useAuth.ts
    useOpportunities.ts
    useApplications.ts
    useCandidates.ts
```

---

## 7. Ordem de Implementação

### Fase 1 — Fundação
1. `lib/types.ts`, `lib/constants.ts`, `lib/validators.ts`
2. `contexts/AuthContext.tsx`
3. `guards/StudentRoute.tsx` + `OffererRoute.tsx`
4. `routes.ts` + `App.tsx` (RouterProvider)
5. Os 3 layouts (`PublicLayout`, `StudentLayout`, `OffererLayout`)

### Fase 2 — Componentes Compartilhados
6. `JobCard.tsx`, `CategoryBadge.tsx`, `StatusBadge.tsx`
7. `SearchFilterBar.tsx`, `SkillChipInput.tsx`
8. `ConfirmDialog.tsx`, `NotificationSheet.tsx`

### Fase 3 — Páginas Públicas
9. `LandingPage.tsx` (todas as seções)
10. `LoginPage.tsx`, `RegisterPage.tsx`, `RegisterStudentPage.tsx`, `RegisterOffererPage.tsx`
11. `OpportunityDetailPage.tsx`

### Fase 4 — Portal do Estudante
12. `OnboardingPage.tsx` (estudante, wizard 3 etapas)
13. `FeedPage.tsx`
14. `ApplicationsPage.tsx`
15. `ProfilePage.tsx`

### Fase 5 — Portal do Ofertante
16. `OnboardingPage.tsx` (ofertante, wizard 2 etapas)
17. `DashboardPage.tsx`
18. `OpportunitiesPage.tsx`, `NewOpportunityPage.tsx`, `EditOpportunityPage.tsx`
19. `CandidatesPage.tsx`, `CandidateProfilePage.tsx`

### Fase 6 — Cross-Cutting
20. `NotificationContext.tsx` + integração do sino
21. `NotFoundPage.tsx`
22. Redirect pós-login com parâmetro `?redirect=`

---

## 8. Verificação

- Acessar `/` e verificar todas as seções da landing page
- Completar cadastro de estudante e ser redirecionado ao onboarding
- Completar onboarding e chegar ao feed com vagas mockadas
- Clicar em vaga → detalhes → candidatura → confirmação → status "Em Análise" em /student/applications
- Completar cadastro de ofertante → onboarding → dashboard
- Publicar nova vaga → aparece em /offerer/opportunities
- Aprovar candidatura → estudante vê "Aprovado" em /student/applications
- Acessar `/opportunities/:id` sem login → clicar "Candidatar" → redirecionar para /login → após login, voltar à vaga
- Rota inválida → NotFoundPage
