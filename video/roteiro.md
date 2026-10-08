# Roteiro do vídeo

Gerado de `video/cenas.py` e da duração real da locução (`video/voz.py`).
Duração total: 1:56.7. Locução sintética pt-BR-AntonioNeural (edge-tts), legenda queimada a partir de `legendas.srt`.

Todo número sai de `analysis/RESULTADOS.md`.

| Tempo | Cena | Palavras | p/s | Fonte |
|---|---|---|---|---|
| 0:00.0 a 0:14.6 | caso | 29 | 2.0 | README do Case 1 |
| 0:14.6 a 0:30.1 | escopo | 34 | 2.2 | analysis/00_escopo_estagio.py |
| 0:30.1 a 0:42.2 | leitura | 28 | 2.3 | analysis/README.md |
| 0:42.2 a 1:05.0 | achados | 47 | 2.1 | analysis/01, 02 e 04 |
| 1:05.0 a 1:17.7 | produto | 36 | 2.8 | app em produção; telas com dados de exemplo |
| 1:17.7 a 1:29.2 | engenharia | 29 | 2.5 | supabase/migrations, supabase/functions |
| 1:29.2 a 1:44.9 | ia | 35 | 2.2 | docs/AI_LOG.md, docs/RELATORIO_FINAL.md |
| 1:44.9 a 1:56.7 | fim | 24 | 2.0 | docs/RELATORIO_FINAL.md |

Total: 262 palavras, 2.24 palavras por segundo.

## caso (0:00.0 a 0:14.6)

- ITERI. Caso 1, oportunidades integradas.
- Na PUC-Rio, monitoria, iniciação científica e vaga em laboratório circulam por indicação.
- O aluno não sabe onde procurar, e quem oferece não tem canal.

## escopo (0:14.6 a 0:30.1)

- O arquivo de vagas do caso é quase todo estágio externo.
- 3.220 dos 3.550 anúncios vêm de uma única empresa, provável agente de integração.
- Estágio já tem canal. O ITERI cuida da oportunidade interna.

## leitura (0:30.1 a 0:42.2)

- Monitoria registrada é monitoria concedida, não vaga aberta.
- A planilha de PIBIC traz bolsas oferecidas, não preenchidas.
- E os IDs de monitores não cruzam com os de alunos.

## achados (0:42.2 a 1:05.0)

- Em 2026, foram 300 bolsas PIBIC e PIBITI, total estável desde 2022. Mas Informática foi de 4 para 44.
- Monitoria se repete por departamento: só 24 das 58 disciplinas de 2025.2 já tinham monitor.
- E só 4,6% dos alunos com interesse declarado citam pesquisa, docência ou monitoria.

## produto (1:05.0 a 1:17.7)

- O ITERI está no ar em iteri.com.br.
- Cadastro com e-mail da PUC, perfil preenchido uma vez e feed de oportunidades internas.
- Candidatura em um clique, com status e aviso por e-mail.

## engenharia (1:17.7 a 1:29.2)

- React na Vercel e Supabase, com RLS nas sete tabelas.
- O ofertante só vê quem se candidatou à vaga dele.
- A recomendação por perfil ainda não está no app.

## ia (1:29.2 a 1:44.9)

- Usamos o Claude e registramos nove interações no AI Log.
- Maior erro: números do deck anterior sem código que os produzisse. Refizemos a análise com scripts.
- Menos confiável: a tabela que liga departamento a curso.

## fim (1:44.9 a 1:56.7)

- Próximos passos: interesse acadêmico no cadastro, público por departamento para o ofertante e monitorias abertas a cada semestre.
- Código e análise estão no GitHub.

## Como reproduzir

```bash
pip install edge-tts
python video/voz.py        # locução, linha do tempo e legendas.srt
node video/render.mjs       # cenas em PNG (Playwright)
python video/montar.py      # out/iteri_lia_impact_lab.mp4
```

Rodar os comandos dentro de `video/`. Atrás de proxy com TLS reescrito, defina `EDGE_TTS_CA` com o bundle de certificados.
