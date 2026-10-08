"""Pergunta 2: quanto existe de PIBIC e PIBITI e como varia?

A planilha traz só bolsas OFERECIDAS por departamento e ano. Não traz bolsas
preenchidas, candidatos, valor nem orientador: não dá para falar em ociosidade.
"""
import comum

JANELA = range(2022, 2027)  # premissa: variação recente, 5 anos


def calcular(d):
    b = comum.carregar_bolsas()
    por_ano = b.pivot_table(index="ano", columns="programa", values="bolsas", aggfunc="sum", fill_value=0)
    por_ano["TOTAL"] = por_ano.sum(axis=1)

    ultimo = int(b.ano.max())
    atual = b[b.ano == ultimo].groupby("depto").bolsas.sum().sort_values(ascending=False)

    jan = b[b.ano.isin(JANELA)].groupby(["depto", "ano"]).bolsas.sum().unstack(fill_value=0)
    jan = jan.reindex(columns=list(JANELA), fill_value=0)
    variacao = jan.assign(
        minimo=jan.min(axis=1), maximo=jan.max(axis=1),
        amplitude=jan.max(axis=1) - jan.min(axis=1),
    ).sort_values(ultimo, ascending=False)

    tot = por_ano.TOTAL
    resumo = {
        "anos_pibic": f"{b[b.programa == 'PIBIC'].ano.min()} a {b[b.programa == 'PIBIC'].ano.max()}",
        "anos_pibiti": f"{b[b.programa == 'PIBITI'].ano.min()} a {b[b.programa == 'PIBITI'].ano.max()}",
        f"bolsas_{ultimo}_pibic": int(por_ano.loc[ultimo, "PIBIC"]),
        f"bolsas_{ultimo}_pibiti": int(por_ano.loc[ultimo, "PIBITI"]),
        f"bolsas_{ultimo}_total": int(tot.loc[ultimo]),
        f"departamentos_com_bolsa_{ultimo}": int((atual > 0).sum()),
        f"top5_deptos_{ultimo}": atual.head(5).to_dict(),
        f"participacao_top5_{ultimo}": round(float(atual.head(5).sum() / atual.sum()), 3),
        "total_2022_2026_min_max": [int(tot.loc[list(JANELA)].min()), int(tot.loc[list(JANELA)].max())],
        "deptos_com_amplitude_ate_1_na_janela": f"{int((variacao.amplitude <= 1).sum())} de {len(variacao)}",
    }
    return resumo, {"bolsas_por_ano": por_ano, f"bolsas_depto_{JANELA.start}_{JANELA.stop - 1}": variacao}


if __name__ == "__main__":
    r, t = calcular(comum.carregar())
    print(r)
    for nome, df in t.items():
        print(f"\n{nome}\n{df.to_string()}")
