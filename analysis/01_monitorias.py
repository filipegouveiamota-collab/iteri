"""Pergunta 1: a demanda por monitoria é previsível a cada semestre?

Uma linha de monitorias.csv é uma monitoria CONCEDIDA (aluno, disciplina,
semestre), não uma vaga aberta. O arquivo cobre um centro só (README do case),
então mede forma e recorrência, não volume da PUC.
"""
import comum


def calcular(d):
    m = d["monitorias"]
    duplicadas = int(m.duplicated().sum())
    m = m.drop_duplicates().assign(depto=lambda x: x.cod_disciplina.str.extract(r"^([A-Z]+)")[0])
    semestres = sorted(m.periodo.unique())
    ultimo = semestres[-1]

    por_semestre = m.groupby("periodo").agg(
        registros=("aluno_id", "size"), monitores=("aluno_id", "nunique"),
        disciplinas=("cod_disciplina", "nunique"), departamentos=("depto", "nunique"))

    sem_por_disc = m.groupby("cod_disciplina").periodo.nunique()
    recorrentes = sem_por_disc[sem_por_disc >= 3].index

    # Previsibilidade: das disciplinas com monitor no último semestre, quantas já
    # tinham monitor em algum semestre anterior?
    antes = set(m.loc[m.periodo < ultimo, "cod_disciplina"])
    disc_ultimo = set(m.loc[m.periodo == ultimo, "cod_disciplina"])
    reg_ultimo = m[m.periodo == ultimo]

    depto_sem = m.pivot_table(index="depto", columns="periodo", values="aluno_id",
                              aggfunc="size", fill_value=0)
    depto_sem["semestres_com_monitoria"] = (depto_sem[semestres] > 0).sum(axis=1)
    depto_sem = depto_sem.sort_values(semestres[::-1], ascending=False)

    resumo = {
        "linhas_originais": int(len(d["monitorias"])),
        "linhas_duplicadas_removidas": duplicadas,
        "registros": int(len(m)),
        "semestres": [int(s) for s in semestres],
        "monitores_unicos": int(m.aluno_id.nunique()),
        "monitores_em_mais_de_um_semestre": int((m.groupby("aluno_id").periodo.nunique() > 1).sum()),
        "disciplinas": int(m.cod_disciplina.nunique()),
        "disciplinas_em_3_ou_4_semestres": int(len(recorrentes)),
        "departamentos_em_todos_os_semestres": int((depto_sem.semestres_com_monitoria == len(semestres)).sum()),
        "departamentos": int(m.depto.nunique()),
        f"disciplinas_{ultimo}_ja_vistas_antes": f"{len(disc_ultimo & antes)} de {len(disc_ultimo)}",
        f"registros_{ultimo}_em_disciplina_ja_vista": round(float(reg_ultimo.cod_disciplina.isin(antes).mean()), 3),
    }
    return resumo, {"monitorias_por_semestre": por_semestre, "monitorias_depto_semestre": depto_sem}


if __name__ == "__main__":
    r, t = calcular(comum.carregar())
    print(r)
    for nome, df in t.items():
        print(f"\n{nome}\n{df.to_string()}")
