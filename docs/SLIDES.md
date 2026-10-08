# ITERI · Deck para depois do vídeo

Texto dos slides. Todo número sai de `analysis/RESULTADOS.md` (scripts em `analysis/`).
Dado fictício só aparece rotulado como exemplo.

---

## Slide 1 · Capa

**Eyebrow:** Caso 1 · Oportunidades integradas

**Título:** ITERI

**Subtítulo:** Oportunidades internas da PUC-Rio, num lugar só.

**Linha de apoio:** Monitoria · Iniciação científica (PIBIC e PIBITI) · Laboratórios · Apoio a eventos

**Rodapé:** Filipe Gouveia Mota · Pedro Henrique C. Kubrusly · LIA Impact Lab · PUC-Rio · iteri.com.br

> Nota do apresentador: este deck aprofunda o que o vídeo mostrou. Todo número tem um script no repositório.

---

## Slide 2 · Decisão de escopo

**Eyebrow:** Decisão de escopo

**Título:** Estágio já tem canal. O ITERI fica com o interno.

**Número grande 1:** 90,7%
**Legenda:** dos anúncios do vagas.csv (3.220 de 3.550) são estágios publicados por uma única empresa_id, provável agente de integração.

**Número grande 2:** 1
**Legenda:** anúncio do arquivo é, de fato, oportunidade interna da PUC-Rio (um núcleo do Departamento de Engenharia Mecânica).

**Rodapé (fonte):** analysis/00_escopo_estagio.py · analysis/05_anuncios_internos.py

> Nota: o caso cita estágio, monitoria e IC. Estágio já passa pelo Vagas Online da CCESP. A oportunidade interna não tem canal, e é ela que o ITERI cobre.

---

## Slide 3 · O que cada arquivo permite dizer

**Eyebrow:** Ler o dado antes de concluir

**Título:** O arquivo diz uma coisa. Concluímos só o que ele sustenta.

| O arquivo diz | O que concluímos |
|---|---|
| monitorias.csv: monitorias concedidas, de 2024.1 a 2025.2 | É histórico, não vaga aberta |
| PIBIC e PIBITI: bolsas oferecidas por departamento e ano | Não há preenchimento: não falamos em bolsa ociosa |
| IDs de monitores e de alunos vêm de sistemas diferentes | Não cruzam: o cruzamento é só por curso |
| alunos.csv: cadastrados no Vagas Online (estágio) | Não é o corpo discente: toda contagem é um piso |

**Rodapé (fonte):** analysis/README.md

---

## Slide 4 · O que o dado mostra

**Eyebrow:** O que o dado mostra

**Título:** A oferta interna existe, é estável e muda de lugar.

**Card 1:** 300 bolsas PIBIC e PIBITI em 2026 (259 + 41). Total estável desde 2022: entre 281 e 300 por ano.

**Card 2 (gráfico de barras, bolsas de Informática):** 2022: 4 · 2023: 10 · 2024: 21 · 2025: 32 · 2026: 44. Psicologia caiu de 38 para 26 no mesmo período.

**Card 3:** 24 de 58 disciplinas com monitor em 2025.2 já tinham monitor antes. A demanda se repete por departamento, não por disciplina (8 de 23 departamentos tiveram monitoria nos 4 semestres).

**Card 4:** 4,6% dos alunos com interesse declarado citam pesquisa, docência ou monitoria (33 de 713).

**Rodapé (fonte):** analysis/01_monitorias.py · 02_bolsas_pibic.py · 04_interesse_academico.py

> Nota: 4,6% mostra que o cadastro atual não capta interesse acadêmico. É por isso que o onboarding do ITERI deve perguntar isso de forma explícita.

---

## Slide 5 · O produto no ar

**Eyebrow:** No ar em iteri.com.br

**Título:** Currículo uma vez. Candidatura em um clique.

**Lista (aluno):**
- Cadastro só com e-mail @aluno.puc-rio.br, confirmado por código
- Perfil acadêmico padronizado, preenchido uma vez
- Feed com monitoria, iniciação científica, eventos e laboratórios
- Candidatura em um clique e status com aviso por e-mail

**Lista (professor ou setor):**
- Cadastro com e-mail @puc-rio.br
- Publica, edita e encerra vagas
- Vê candidatos com perfil comparável e aprova ou rejeita

**Imagem:** captura real do perfil acadêmico em produção (conta de teste), arquivo `video/assets/producao_perfil.png`. Legenda: "Produção · conta de teste".

---

## Slide 6 · Engenharia

**Eyebrow:** Arquitetura

**Título:** As regras de acesso moram no banco.

**Diagrama (linha 1):** Navegador (React + Vite na Vercel) → Supabase Auth (só e-mail da PUC, código por e-mail) → Postgres com RLS (7 de 7 tabelas)

**Diagrama (linha 2):** Trigger no Postgres (pg_net) → Edge Function send-notification-email → Resend (aviso de status por e-mail)

**Destaques:**
- O ofertante só lê o perfil de quem se candidatou a uma vaga dele
- O papel do usuário não muda depois do cadastro (trigger)
- CPF único, validado no banco

**Caixa tracejada:** Análise offline em analysis/ (Python, dados fixados no commit do repositório oficial). Gera os números do vídeo e deste deck.

**Caixa tracejada (fora do app):** recomendação por perfil ainda não implementada.

---

## Slide 7 · Processo com IA

**Eyebrow:** Processo com IA

**Título:** Usamos o Claude do começo ao fim, e registramos onde ele errou.

**Número grande:** 9
**Legenda:** interações registradas no AI Log, cada uma com evidência no repositório.

**Maior erro:**
- Antes: deck anterior com números sem código que os produzisse e "RLS em 12 de 12 tabelas".
- Depois: análise refeita em scripts reproduzíveis; o banco tem 7 tabelas, todas com RLS.

**Achado na gravação do vídeo:** a candidatura em produção falhava com "infinite recursion detected in policy for relation applications". A política de candidatura consultava profiles, que consultava applications. Correção em migration commitada (`20261008193000_fix_applications_policy_recursion.sql`). [PREENCHER: "aplicada em produção" ou "a aplicar"]

**Menos confiável:** a tabela manual que liga departamento a curso.

**Rodapé (fonte):** docs/AI_LOG.md · docs/RELATORIO_FINAL.md

---

## Slide 8 · Limitações e próximos passos

**Eyebrow:** Próximos passos

**Título:** O que vem agora.

**Próximos passos:**
1. Interesse acadêmico em lista fechada no cadastro
2. Público de cada departamento visível ao ofertante
3. Monitorias abertas por departamento a cada semestre

**Fora por decisão:** estágio, importação dos dados do caso para o app, recomendação por perfil.

**Limitações declaradas:** nenhum arquivo informa preenchimento de bolsa nem número de candidatos; alunos.csv é base de estágio; monitorias.csv cobre um centro só.

**Links (com QR code):**
- App: https://iteri.com.br
- Repositório: https://github.com/filipegouveiamota-collab/iteri

**Rodapé:** Criação com dados e apoio da PUC-Rio.
