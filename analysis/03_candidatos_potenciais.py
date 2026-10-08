"""Pergunta 3: quantos candidatos potenciais cada departamento ofertante tem?

Os IDs de monitorias.csv não cruzam com alunos.csv, então o cruzamento é por
curso, via a tabela manual comum.CURSOS_DO_DEPTO. alunos.csv são os cadastrados
no Vagas Online (sistema de estágio), não o corpo discente: a contagem é um piso.
"""
import comum


def calcular(d):
    grad = comum.alunos_graduacao(d["alunos"])
    cand = comum.candidatos_por_depto(grad)

    b = comum.carregar_bolsas()
    ultimo = int(b.ano.max())
    bolsas = b[b.ano == ultimo].groupby("depto").bolsas.sum()
    bolsas = bolsas[bolsas > 0]
    t_bolsas = (
        bolsas.to_frame(f"bolsas_{ultimo}")
        .assign(candidatos=cand.reindex(bolsas.index))
        .assign(candidatos_por_bolsa=lambda x: (x.candidatos / x[f"bolsas_{ultimo}"]).round(1))
        .sort_values(f"bolsas_{ultimo}", ascending=False)
    )

    m = d["monitorias"].drop_duplicates()
    sem = m.periodo.max()
    mon = m[m.periodo == sem].cod_disciplina.str.extract(r"^([A-Z]+)")[0].rename("depto").value_counts()
    t_mon = (
        mon.to_frame(f"monitorias_{sem}")
        .assign(candidatos=cand.reindex(mon.index))
        .sort_values(f"monitorias_{sem}", ascending=False)
    )

    sem_mapa = sorted(set(bolsas.index) - set(comum.CURSOS_DO_DEPTO))
    zero = t_bolsas[t_bolsas.candidatos == 0]
    resumo = {
        "alunos_graduacao_matriculados": int(len(grad)),
        "alunos_fora_do_mapa": int((~grad.curso_norm.isin(
            {c for cs in comum.CURSOS_DO_DEPTO.values() for c in cs})).sum()),
        f"deptos_com_bolsa_{ultimo}": int(len(t_bolsas)),
        "deptos_sem_mapa": sem_mapa,
        "mediana_candidatos_por_bolsa": float(t_bolsas.candidatos_por_bolsa.median()),
        "deptos_com_bolsa_e_ate_1_candidato_por_bolsa": t_bolsas[t_bolsas.candidatos_por_bolsa <= 1].index.tolist(),
        "deptos_com_bolsa_e_zero_candidatos_no_cadastro": zero.index.tolist(),
        f"bolsas_{ultimo}_em_deptos_com_ate_1_candidato_por_bolsa": int(
            t_bolsas.loc[t_bolsas.candidatos_por_bolsa <= 1, f"bolsas_{ultimo}"].sum()),
    }
    return resumo, {f"candidatos_por_bolsa_{ultimo}": t_bolsas, f"candidatos_por_monitoria_{sem}": t_mon}


if __name__ == "__main__":
    r, t = calcular(comum.carregar())
    print(r)
    for nome, df in t.items():
        print(f"\n{nome}\n{df.to_string()}")
