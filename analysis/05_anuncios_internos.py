"""Pergunta 5: quantos anúncios do vagas.csv são da própria PUC-Rio?

empresa_id é pseudonimizado, então a PUC não pode ser identificada como
contratante. Critério: o texto do anúncio cita a PUC-Rio, ou o anúncio fica na
Gávea (bairro do campus). Os candidatos foram lidos um a um; a classificação
manual está em revisao_anuncios_puc.csv. Anúncio na Gávea sem citar a PUC conta
como externo.
"""
from pathlib import Path

import pandas as pd

import comum

REVISAO = Path(__file__).resolve().parent / "revisao_anuncios_puc.csv"


def calcular(d):
    v = d["vagas"]
    texto = (v.atividades.fillna("") + " " + v.requisitos.fillna("") + " " + v.beneficios.fillna(""))
    texto = texto.map(comum.sem_acento).str.lower()
    cita_puc = texto.str.contains(r"\bpuc|\bpontificia")
    gavea = v.bairro.map(lambda b: comum.chave(b) if isinstance(b, str) else "").eq("GAVEA")

    revisao = pd.read_csv(REVISAO).set_index("vaga_id")
    faltando = set(v.loc[cita_puc, "vaga_id"]) - set(revisao.index)
    if faltando:
        raise SystemExit(f"Anúncios que citam a PUC sem revisão manual: {sorted(faltando)}")

    internas = revisao.index[revisao.classificacao.eq("interna")]
    tabela = pd.DataFrame({
        "anuncios": [len(v), int(gavea.sum()), int(cita_puc.sum()), int(v.vaga_id.isin(internas).sum())],
    }, index=["Total no vagas.csv", "Na Gávea (bairro do campus)", "Texto cita a PUC-Rio",
              "Revisados como oportunidade interna"])

    resumo = {
        "anuncios": int(len(v)),
        "na_gavea": int(gavea.sum()),
        "citam_puc": int(cita_puc.sum()),
        "internos_confirmados": int(len(internas)),
        "pct_internos": round(len(internas) / len(v), 4),
    }
    return resumo, {"anuncios_internos": tabela}


if __name__ == "__main__":
    r, t = calcular(comum.carregar())
    print(r)
    for nome, df in t.items():
        print(f"\n{nome}\n{df.to_string()}")
