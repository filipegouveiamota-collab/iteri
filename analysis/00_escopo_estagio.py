"""Apoio à decisão de escopo: o que é o vagas.csv.

Entra no vídeo e no relatório só com um número: a parcela do arquivo que é
estágio externo publicado por uma única empresa_id (provável agente de
integração). Por isso estágio fica fora do produto, que trata de oportunidades
internas da PUC-Rio.

O funil vaga x aluno elegível roda só quando o script é chamado direto, como
apoio; não entra em resultados nem no relatório.
"""
import pandas as pd

import comum


def calcular(d):
    v = d["vagas"]
    estagio = v.tipo.eq("Estágio")
    via_agente = v.empresa_id.eq(v.empresa_id.value_counts().index[0])
    resumo = {
        "anuncios": int(len(v)),
        "estagio": int(estagio.sum()),
        "estagio_pela_maior_empresa_id": int((estagio & via_agente).sum()),
        "pct_estagio_pela_maior_empresa_id": round(float((estagio & via_agente).mean()), 3),
        "empresa_ids": int(v.empresa_id.nunique()),
    }
    tabela = pd.DataFrame({"anuncios": v.tipo.value_counts()})
    return resumo, {"vagas_por_tipo": tabela}


def funil_apoio(d):
    alunos = d["alunos"].assign(curso_norm=comum.curso_normalizado(d["alunos"]),
                                curso_bruto=d["alunos"].curso.map(comum.chave))
    abertas = comum.vagas_abertas(d["vagas"])
    est = abertas[abertas.tipo.eq("Estágio")]
    for col in ["curso_bruto", "curso_norm"]:
        n = comum.pares_elegiveis(est, d["vaga_cursos"], alunos, col).groupby("vaga_id").size()
        n = n.reindex(est.vaga_id, fill_value=0)
        print(f"funil ({col}): {len(est)} abertos, {(n > 0).sum()} com elegível, mediana {n.median():g}")


if __name__ == "__main__":
    d = comum.carregar()
    print(calcular(d)[0])
    funil_apoio(d)
