# Relatório Final

Todo número abaixo sai de `python analysis/run_all.py` (ver `analysis/RESULTADOS.md`).

## O que foi entregue?

**App em produção:** https://iteri.com.br

- Cadastro só com e-mail institucional da PUC-Rio, confirmado por código (OTP).
- Onboarding e perfil acadêmico padronizado do aluno.
- Feed de oportunidades internas (Monitoria, Iniciação Científica, Eventos,
  Laboratórios) com busca e filtros.
- Candidatura em um clique, acompanhamento de status e e-mail a cada mudança.
- Painel do ofertante: publicar, editar e encerrar vagas, ver candidatos, aprovar
  ou rejeitar.
- Recuperação de senha.
- Regras de acesso no banco: RLS nas 7 tabelas; o ofertante só lê o perfil de
  quem se candidatou a uma vaga dele; o papel do usuário não muda após o cadastro;
  CPF único.

**Análise de dados reproduzível** (`analysis/`), sobre os dados oficiais do Case 1:

1. **Monitoria.** Depois de remover 29 linhas duplicadas, há 254 monitorias
   concedidas em 4 semestres, de 47 em 2024.1 a 78 em 2025.2. 8 de 23
   departamentos tiveram monitoria nos 4 semestres, mas a disciplina muda: das 58
   disciplinas com monitor em 2025.2, só 24 já tinham tido monitor antes. A
   demanda é previsível por departamento, não por disciplina.
2. **PIBIC e PIBITI.** 300 bolsas oferecidas em 2026 (259 PIBIC e 41 PIBITI), em
   26 departamentos. O total anual é estável: entre 281 e 300 de 2022 a 2026. A
   divisão muda: Informática foi de 4 para 44 bolsas no período, e Psicologia de
   38 para 26.
3. **Candidatos potenciais.** No cadastro de alunos, a mediana é de 4,2 alunos por
   bolsa do departamento. Em seis departamentos (QUI, HIS, EDU, SOC, MAT, FIS),
   com 68 bolsas em 2026, há no máximo 1 aluno por bolsa no cadastro. Isso mede o
   alcance da base (um sistema de estágio), não a falta de alunos.
4. **Interesse acadêmico.** 713 de 2.187 alunos declararam algum interesse, em
   813 rótulos de texto livre. Só 33 (4,6% deles) citam pesquisa, iniciação
   científica, docência ou monitoria; monitoria aparece para 3 alunos.
5. **Oportunidade interna no canal de estágio.** Dos 3.550 anúncios do
   `vagas.csv`, 4 citam a PUC-Rio e 1 é de fato interno (um núcleo do Departamento
   de Engenharia Mecânica).

## O que ficou de fora, por decisão consciente da equipe?

- **Estágio.** 3.220 dos 3.550 anúncios (90,7%) são estágios de uma única
  empresa_id, provável agente de integração, num canal que já existe. O ITERI cobre
  a oportunidade interna, que não tem canal.
- **Recomendação por perfil.** Não está implementada no app.
- **Importação dos dados do case para o app.** Monitoria registrada é concedida,
  não vaga aberta; o arquivo de PIBIC é um total por departamento e ano. Nenhum dos
  dois vira card de vaga.
- **Afirmações sobre ociosidade.** Nenhum arquivo informa preenchimento ou
  candidatos.

[PREENCHER: confirmar ou acrescentar.]

## Quais foram as 3 principais decisões técnicas?

1. **Regras de acesso no banco, não no frontend.** Políticas RLS em todas as
   tabelas, GRANTs explícitos por role e trigger contra troca de papel. Uma chamada
   direta à API recebe as mesmas restrições que a interface.
2. **Pipeline de e-mail próprio.** Trigger Postgres chama a Edge Function via
   `pg_net`, autenticado por segredo no Vault, com envio pelo Resend. Contorna a
   ausência do schema de Database Webhooks no projeto e o bloqueio dos IPs do
   SendGrid pela PUC-Rio.
3. **Análise reproduzível com fonte fixada.** Scripts baixam os dados de um commit
   fixo do repositório oficial, não versionam dados brutos e geram todos os números
   do relatório e do vídeo.

## Qual foi o maior erro produzido pela IA durante o processo, e como foi identificado e corrigido?

[PREENCHER: escolher. Candidatos com evidência:]

- **Números de apresentação sem código que os produzisse.** O deck anterior trazia
  números de análise e a afirmação de RLS em 12 de 12 tabelas. O repositório não
  tinha scripts nem dados, e as migrations têm 7 tabelas. Identificado ao tentar
  reproduzir cada número; corrigido refazendo a análise em `analysis/` (AI Log, 6).
- **Falsos positivos no interesse acadêmico.** "Acadêmico" e "científico" soltos
  contavam frases genéricas: 38 alunos em vez de 33. Identificado lendo todos os
  rótulos que casaram (AI Log, 8).

## Qual parte da solução a equipe considera menos confiável?

- A tabela manual que liga departamento a curso (`analysis/comum.py`), base da
  pergunta 3. Monitor e bolsista não precisam ser do curso do departamento.
- `alunos.csv` é a base do sistema de estágio, não o corpo discente: toda contagem
  de alunos é um piso, enviesado contra as ciências básicas.
- `monitorias.csv` cobre um centro só, segundo o README do case.

[PREENCHER: alguma parte do app?]

## Com mais duas horas, quais seriam as 3 próximas prioridades?

1. Perguntar no onboarding, em lista fechada, o interesse em pesquisa, monitoria e
   docência. Hoje só 4,6% dos interesses declarados tocam nisso.
2. Mostrar ao ofertante quantos alunos dos cursos ligados ao departamento estão
   cadastrados, a partir da tabela da pergunta 3.
3. Abrir a monitoria no ITERI por departamento a cada semestre, já que a
   recorrência é por departamento e não por disciplina.

[PREENCHER: confirmar.]

## Quais ferramentas de IA foram usadas, além do Claude (se houver)?

- **Figma Make**, para gerar a base visual a partir do design system. Evidência:
  `package.json` (`@figma/my-make-file`) e `ATTRIBUTIONS.md`.

[PREENCHER: outras, se houver.]
