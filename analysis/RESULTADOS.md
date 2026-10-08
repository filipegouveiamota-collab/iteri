# Resultados das análises

Gerado por `python analysis/run_all.py`. Não edite à mão.


## Escopo: o que é o vagas.csv

Script: `analysis/00_escopo_estagio.py`

- `anuncios`: 3550
- `estagio`: 3526
- `estagio_pela_maior_empresa_id`: 3220
- `pct_estagio_pela_maior_empresa_id`: 0.907
- `empresa_ids`: 122

**vagas_por_tipo**

| tipo    |   anuncios |
|:--------|-----------:|
| Estágio |       3526 |
| Emprego |         23 |
| Trainee |          1 |


## 1. A demanda por monitoria é previsível a cada semestre?

Script: `analysis/01_monitorias.py`

- `linhas_originais`: 283
- `linhas_duplicadas_removidas`: 29
- `registros`: 254
- `semestres`: [20241, 20242, 20251, 20252]
- `monitores_unicos`: 177
- `monitores_em_mais_de_um_semestre`: 10
- `disciplinas`: 131
- `disciplinas_em_3_ou_4_semestres`: 19
- `departamentos_em_todos_os_semestres`: 8
- `departamentos`: 23
- `disciplinas_20252_ja_vistas_antes`: 24 de 58
- `registros_20252_em_disciplina_ja_vista`: 0.526

**monitorias_por_semestre**

|   periodo |   registros |   monitores |   disciplinas |   departamentos |
|----------:|------------:|------------:|--------------:|----------------:|
|     20241 |          47 |          34 |            40 |              14 |
|     20242 |          62 |          42 |            50 |              15 |
|     20251 |          67 |          50 |            47 |              14 |
|     20252 |          78 |          61 |            58 |              19 |


**monitorias_depto_semestre**

| depto   |   20241 |   20242 |   20251 |   20252 |   semestres_com_monitoria |
|:--------|--------:|--------:|--------:|--------:|--------------------------:|
| PSI     |       9 |       8 |       4 |      22 |                         4 |
| ENG     |       8 |       5 |       6 |      12 |                         4 |
| MAT     |       3 |       9 |       3 |       6 |                         4 |
| COM     |       0 |       1 |       0 |       6 |                         2 |
| ART     |       1 |       4 |       6 |       5 |                         4 |
| JUR     |       0 |       2 |       1 |       4 |                         3 |
| CTC     |       4 |       3 |       5 |       3 |                         4 |
| ADM     |       1 |       3 |       0 |       3 |                         3 |
| ECO     |       5 |       6 |      14 |       2 |                         4 |
| INF     |       4 |       8 |      10 |       2 |                         4 |
| DSG     |       4 |       3 |       6 |       2 |                         4 |
| ARQ     |       0 |       5 |       4 |       2 |                         3 |
| FIS     |       2 |       3 |       0 |       2 |                         3 |
| CIN     |       0 |       0 |       0 |       2 |                         1 |
| SOC     |       1 |       0 |       1 |       1 |                         3 |
| LET     |       0 |       0 |       1 |       1 |                         2 |
| QUI     |       1 |       1 |       0 |       1 |                         3 |
| CIV     |       0 |       0 |       0 |       1 |                         1 |
| EMP     |       0 |       0 |       0 |       1 |                         1 |
| IRI     |       1 |       0 |       5 |       0 |                         2 |
| NUT     |       0 |       0 |       1 |       0 |                         1 |
| HIS     |       0 |       1 |       0 |       0 |                         1 |
| BIO     |       3 |       0 |       0 |       0 |                         1 |


## 2. Quanto existe de PIBIC e PIBITI e como varia?

Script: `analysis/02_bolsas_pibic.py`

- `anos_pibic`: 2006 a 2026
- `anos_pibiti`: 2010 a 2026
- `bolsas_2026_pibic`: 259
- `bolsas_2026_pibiti`: 41
- `bolsas_2026_total`: 300
- `departamentos_com_bolsa_2026`: 26
- `top5_deptos_2026`: {'INF': 44, 'PSI': 26, 'QUI': 22, 'IND': 16, 'COM': 15}
- `participacao_top5_2026`: 0.41
- `total_2022_2026_min_max`: [281, 300]
- `deptos_com_amplitude_ate_1_na_janela`: 3 de 27

**bolsas_por_ano**

|   ano |   PIBIC |   PIBITI |   TOTAL |
|------:|--------:|---------:|--------:|
|  2006 |     189 |        0 |     189 |
|  2007 |     189 |        0 |     189 |
|  2008 |     199 |        0 |     199 |
|  2009 |     219 |        0 |     219 |
|  2010 |     230 |       35 |     265 |
|  2011 |     230 |       32 |     262 |
|  2012 |     220 |       33 |     253 |
|  2013 |     222 |       40 |     262 |
|  2014 |     226 |       35 |     261 |
|  2015 |     252 |       36 |     288 |
|  2016 |     229 |       30 |     259 |
|  2017 |     251 |       35 |     286 |
|  2018 |     250 |       35 |     285 |
|  2019 |     245 |       35 |     280 |
|  2020 |     243 |       35 |     278 |
|  2021 |     242 |       35 |     277 |
|  2022 |     245 |       36 |     281 |
|  2023 |     260 |       37 |     297 |
|  2024 |     253 |       40 |     293 |
|  2025 |     255 |       40 |     295 |
|  2026 |     259 |       41 |     300 |


**bolsas_depto_2022_2026**

| depto   |   2022 |   2023 |   2024 |   2025 |   2026 |   minimo |   maximo |   amplitude |
|:--------|-------:|-------:|-------:|-------:|-------:|---------:|---------:|------------:|
| INF     |      4 |     10 |     21 |     32 |     44 |        4 |       44 |          40 |
| PSI     |     38 |     40 |     34 |     34 |     26 |       26 |       40 |          14 |
| QUI     |     16 |     18 |     18 |     21 |     22 |       16 |       22 |           6 |
| IND     |      9 |     12 |     11 |     13 |     16 |        9 |       16 |           7 |
| COM     |     17 |     17 |     23 |     18 |     15 |       15 |       23 |           8 |
| JUR     |     12 |     13 |     15 |     15 |     15 |       12 |       15 |           3 |
| SER     |     17 |     16 |     14 |     15 |     14 |       14 |       17 |           3 |
| HIS     |     20 |     20 |     19 |     15 |     14 |       14 |       20 |           6 |
| IRI     |      8 |     11 |     12 |     11 |     14 |        8 |       14 |           6 |
| DAD     |     20 |     20 |     17 |     12 |     12 |       12 |       20 |           8 |
| EDU     |     14 |     13 |     13 |     13 |     12 |       12 |       14 |           2 |
| ECO     |     12 |     15 |     14 |     12 |     12 |       12 |       15 |           3 |
| GEO     |     15 |     16 |     13 |     12 |     10 |       10 |       16 |           6 |
| DAU     |     10 |      8 |      7 |      7 |      8 |        7 |       10 |           3 |
| SOC     |     11 |     10 |     10 |     11 |      8 |        8 |       11 |           3 |
| LET     |      9 |      9 |      9 |      8 |      7 |        7 |        9 |           2 |
| DEQM    |      9 |      9 |      6 |      5 |      7 |        5 |        9 |           4 |
| TEO     |      7 |      6 |      6 |      7 |      7 |        6 |        7 |           1 |
| MAT     |      6 |      6 |      5 |      5 |      6 |        5 |        6 |           1 |
| FIS     |      6 |      6 |      5 |      6 |      6 |        5 |        6 |           1 |
| ADM     |      4 |      5 |      6 |      5 |      5 |        4 |        6 |           2 |
| MEC     |      7 |      8 |      7 |      6 |      5 |        5 |        8 |           3 |
| ELE     |      0 |      0 |      1 |      5 |      4 |        0 |        5 |           5 |
| BIO     |      0 |      0 |      0 |      0 |      4 |        0 |        4 |           4 |
| FIL     |      3 |      3 |      5 |      3 |      4 |        3 |        5 |           2 |
| CIV     |      3 |      2 |      2 |      4 |      3 |        2 |        4 |           2 |
| CETUC   |      4 |      4 |      0 |      0 |      0 |        0 |        4 |           4 |


## 3. Quantos candidatos potenciais cada departamento ofertante tem?

Script: `analysis/03_candidatos_potenciais.py`

- `alunos_graduacao_matriculados`: 1952
- `alunos_fora_do_mapa`: 2
- `deptos_com_bolsa_2026`: 26
- `deptos_sem_mapa`: []
- `mediana_candidatos_por_bolsa`: 4.199999999999999
- `deptos_com_bolsa_e_ate_1_candidato_por_bolsa`: ['QUI', 'HIS', 'EDU', 'SOC', 'MAT', 'FIS']
- `deptos_com_bolsa_e_zero_candidatos_no_cadastro`: []
- `bolsas_2026_em_deptos_com_ate_1_candidato_por_bolsa`: 68

**candidatos_por_bolsa_2026**

| depto   |   bolsas_2026 |   candidatos |   candidatos_por_bolsa |
|:--------|--------------:|-------------:|-----------------------:|
| INF     |            44 |          221 |                    5   |
| PSI     |            26 |          226 |                    8.7 |
| QUI     |            22 |            1 |                    0   |
| IND     |            16 |          127 |                    7.9 |
| COM     |            15 |          257 |                   17.1 |
| JUR     |            15 |          289 |                   19.3 |
| HIS     |            14 |            7 |                    0.5 |
| IRI     |            14 |           64 |                    4.6 |
| SER     |            14 |           16 |                    1.1 |
| DAD     |            12 |          171 |                   14.2 |
| ECO     |            12 |          163 |                   13.6 |
| EDU     |            12 |           10 |                    0.8 |
| GEO     |            10 |           13 |                    1.3 |
| SOC     |             8 |            8 |                    1   |
| DAU     |             8 |           61 |                    7.6 |
| DEQM    |             7 |           22 |                    3.1 |
| LET     |             7 |           25 |                    3.6 |
| TEO     |             7 |           13 |                    1.9 |
| MAT     |             6 |            2 |                    0.3 |
| FIS     |             6 |            2 |                    0.3 |
| MEC     |             5 |           25 |                    5   |
| ADM     |             5 |          164 |                   32.8 |
| BIO     |             4 |           39 |                    9.8 |
| ELE     |             4 |           15 |                    3.8 |
| FIL     |             4 |            5 |                    1.2 |
| CIV     |             3 |           20 |                    6.7 |


**candidatos_por_monitoria_20252**

| depto   |   monitorias_20252 |   candidatos |
|:--------|-------------------:|-------------:|
| PSI     |                 22 |          226 |
| ENG     |                 12 |          281 |
| COM     |                  6 |          257 |
| MAT     |                  6 |            2 |
| ART     |                  5 |          232 |
| JUR     |                  4 |          289 |
| CTC     |                  3 |          428 |
| ADM     |                  3 |          164 |
| INF     |                  2 |          221 |
| ARQ     |                  2 |           61 |
| CIN     |                  2 |          257 |
| DSG     |                  2 |          163 |
| ECO     |                  2 |          163 |
| FIS     |                  2 |            2 |
| EMP     |                  1 |          nan |
| CIV     |                  1 |           20 |
| SOC     |                  1 |            8 |
| QUI     |                  1 |            1 |
| LET     |                  1 |           25 |


## 4. Quantos alunos declaram interesse em pesquisa, docência ou monitoria?

Script: `analysis/04_interesse_academico.py`

- `alunos_cadastrados`: 2187
- `alunos_com_interesse_declarado`: 713
- `rotulos_distintos`: 813
- `alunos_com_interesse_academico`: 33
- `pct_dos_que_declararam`: 0.046
- `alunos_citando_monitoria`: 3

**interesse_academico**

| grupo                        |   alunos |   pct_dos_que_declararam |
|:-----------------------------|---------:|-------------------------:|
| Pesquisa                     |       19 |                    0.027 |
| Iniciação científica / PIBIC |        2 |                    0.003 |
| Docência ou ensino           |       10 |                    0.014 |
| Monitoria                    |        3 |                    0.004 |
| Qualquer um dos grupos       |       33 |                    0.046 |


## 5. Quantos anúncios do vagas.csv são da própria PUC-Rio?

Script: `analysis/05_anuncios_internos.py`

- `anuncios`: 3550
- `na_gavea`: 19
- `citam_puc`: 4
- `internos_confirmados`: 1
- `pct_internos`: 0.0003

**anuncios_internos**

|                                     |   anuncios |
|:------------------------------------|-----------:|
| Total no vagas.csv                  |       3550 |
| Na Gávea (bairro do campus)         |         19 |
| Texto cita a PUC-Rio                |          4 |
| Revisados como oportunidade interna |          1 |

