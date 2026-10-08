# Análise de dados do Case 1

Análise reproduzível dos dados do Case 1 (Oportunidades integradas) do
repositório oficial [igor-peres/impact-lab-sieng2026](https://github.com/igor-peres/impact-lab-sieng2026),
fixado no commit `d506455`. Os números do vídeo e do relatório saem só daqui.

```bash
pip install -r analysis/requirements.txt
python analysis/baixar_dados.py   # baixa os CSVs e a planilha para analysis/data/ (fora do git)
python analysis/run_all.py        # gera analysis/resultados/ e analysis/RESULTADOS.md
```

Os dados brutos não são versionados: o `USO-DOS-DADOS.md` do repositório oficial
pede que não sejam redistribuídos fora do workshop. Só tabelas agregadas ficam em
`resultados/`.

Esta análise é offline. O app em produção não importa nenhum desses arquivos.

## O que cada arquivo permite afirmar

| Arquivo | Uma linha é | Cobre | Permite | Não permite |
|---|---|---|---|---|
| `monitorias.csv` | monitoria **concedida** (aluno, disciplina, semestre) | 2024.1 a 2025.2, um centro só (README do case) | recorrência por departamento e disciplina | vaga aberta, candidatos, bolsa, volume da PUC |
| `PibicPibiti_vagasoferecidas.xlsx` | total de bolsas **oferecidas** por departamento e ano | PIBIC 2006 a 2026, PIBITI 2010 a 2026 | volume e variação da oferta | preenchimento, ociosidade, candidatos, valor |
| `alunos.csv` | aluno cadastrado no Vagas Online (sistema de estágio) | cadastros de jan/2024 a ago/2026 | perfil por curso e período | corpo discente da PUC; cruzar com monitorias por ID |
| `aluno_interesses.csv` | rótulo de interesse em texto livre | 713 alunos, 813 rótulos | o que o aluno escreveu | interesse de quem não preencheu |
| `vagas.csv` | anúncio do Vagas Online | ago/2025 a ago/2026 | escopo: é quase todo estágio externo | identificar a contratante (pseudônimo) |

## Perguntas e premissas

| Script | Pergunta | Premissa ou regra manual |
|---|---|---|
| `00_escopo_estagio.py` | O que é o `vagas.csv`? | Só apoio à decisão de escopo |
| `01_monitorias.py` | A demanda por monitoria é previsível a cada semestre? | Linhas duplicadas removidas; departamento = prefixo da disciplina |
| `02_bolsas_pibic.py` | Quanto existe de PIBIC e PIBITI e como varia? | Variação medida em 2022 a 2026 |
| `03_candidatos_potenciais.py` | Quantos candidatos potenciais cada departamento ofertante tem? | Graduação matriculada, sem filtro de período; tabela departamento → curso em `comum.CURSOS_DO_DEPTO` |
| `04_interesse_academico.py` | Quantos alunos declaram interesse em pesquisa, docência ou monitoria? | Termos em `GRUPOS`; "pesquisa de mercado" fica de fora |
| `05_anuncios_internos.py` | Quantos anúncios do `vagas.csv` são da própria PUC-Rio? | Candidatos lidos um a um em `revisao_anuncios_puc.csv` |

## Limitações declaradas

- Nenhum arquivo informa se uma bolsa ou monitoria foi preenchida, nem quantos
  alunos se candidataram. Não afirmamos ociosidade nem falta de candidatos.
- `alunos.csv` é a base de um sistema de estágio. Cursos de ciências básicas
  quase não aparecem nela (Química tem 1 aluno), então "candidatos por bolsa"
  mede o alcance desse cadastro, não a oferta de alunos da PUC.
- A tabela departamento → curso é uma aproximação feita à mão: monitor e
  bolsista não precisam ser do curso do departamento.
- `monitorias.csv` cobre um centro só, segundo o README do case, embora as
  disciplinas venham de 23 prefixos de departamento.
