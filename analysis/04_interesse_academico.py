"""Pergunta 4: quantos alunos declaram interesse em pesquisa, docência ou monitoria?

aluno_interesses.csv é texto livre coletado num sistema de estágio. Contamos
alunos (não rótulos) cujo texto cita cada grupo de termos. "Pesquisa de mercado"
e "pesquisa de opinião" não contam como pesquisa acadêmica.
"""
import pandas as pd

import comum

GRUPOS = {
    # "acadêmico" e "científico" sozinhos ficam de fora: aparecem em frases como
    # "aplicar conhecimentos acadêmicos" e "divulgação científica".
    "Pesquisa": r"\bpesquisa(?!s? de (?:mercado|opiniao|satisfacao))",
    "Iniciação científica / PIBIC": r"\biniciacao cientifica|\bpibic|\bpibiti",
    "Docência ou ensino": r"\bdocen|\bensino\b|\bensino de|\bprofessor|\blecionar",
    "Monitoria": r"\bmonitoria",
}


def calcular(d):
    i = d["interesses"].drop_duplicates()
    texto = i.area_interesse.map(comum.sem_acento).str.lower()
    alunos_com_interesse = i.aluno_id.nunique()

    linhas, algum = [], set()
    for nome, padrao in GRUPOS.items():
        ids = set(i.loc[texto.str.contains(padrao, regex=True), "aluno_id"])
        algum |= ids
        linhas.append({"grupo": nome, "alunos": len(ids)})
    linhas.append({"grupo": "Qualquer um dos grupos", "alunos": len(algum)})
    tabela = pd.DataFrame(linhas).set_index("grupo")
    tabela["pct_dos_que_declararam"] = (tabela.alunos / alunos_com_interesse).round(3)

    resumo = {
        "alunos_cadastrados": int(len(d["alunos"])),
        "alunos_com_interesse_declarado": int(alunos_com_interesse),
        "rotulos_distintos": int(i.area_interesse.nunique()),
        "alunos_com_interesse_academico": len(algum),
        "pct_dos_que_declararam": round(len(algum) / alunos_com_interesse, 3),
        "alunos_citando_monitoria": int(tabela.loc["Monitoria", "alunos"]),
    }
    return resumo, {"interesse_academico": tabela}


if __name__ == "__main__":
    r, t = calcular(comum.carregar())
    print(r)
    for nome, df in t.items():
        print(f"\n{nome}\n{df.to_string()}")
