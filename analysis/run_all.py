"""Roda todas as análises e grava resultados/*.csv, resultados/resultados.json e
RESULTADOS.md. Só números que saem daqui entram no vídeo e no relatório.

Uso: python analysis/baixar_dados.py && python analysis/run_all.py
"""
import importlib
import json
from pathlib import Path

import comum

AQUI = Path(__file__).resolve().parent
SAIDA = AQUI / "resultados"
SCRIPTS = [
    ("00_escopo_estagio", "Escopo: o que é o vagas.csv"),
    ("01_monitorias", "1. A demanda por monitoria é previsível a cada semestre?"),
    ("02_bolsas_pibic", "2. Quanto existe de PIBIC e PIBITI e como varia?"),
    ("03_candidatos_potenciais", "3. Quantos candidatos potenciais cada departamento ofertante tem?"),
    ("04_interesse_academico", "4. Quantos alunos declaram interesse em pesquisa, docência ou monitoria?"),
    ("05_anuncios_internos", "5. Quantos anúncios do vagas.csv são da própria PUC-Rio?"),
]


def main() -> None:
    d = comum.carregar()
    SAIDA.mkdir(exist_ok=True)
    todos, md = {}, ["# Resultados das análises\n",
                     "Gerado por `python analysis/run_all.py`. Não edite à mão.\n"]
    for modulo, titulo in SCRIPTS:
        resumo, tabelas = importlib.import_module(modulo).calcular(d)
        todos[modulo] = resumo
        md.append(f"\n## {titulo}\n\nScript: `analysis/{modulo}.py`\n")
        md += [f"- `{k}`: {v}" for k, v in resumo.items()]
        for nome, df in tabelas.items():
            df.to_csv(SAIDA / f"{nome}.csv")
            md.append(f"\n**{nome}**\n\n{df.to_markdown()}\n")
    (SAIDA / "resultados.json").write_text(json.dumps(todos, ensure_ascii=False, indent=2, default=str))
    (AQUI / "RESULTADOS.md").write_text("\n".join(md) + "\n")
    print(f"ok: {len(SCRIPTS)} análises, saída em {SAIDA}")


if __name__ == "__main__":
    main()
