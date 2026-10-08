"""Baixa os CSVs do Case 1 do repositório oficial do Impact Lab, fixado num commit.

Os dados não são versionados aqui: o USO-DOS-DADOS.md do repositório oficial pede
que não sejam redistribuídos fora do contexto do workshop.

Uso: python analysis/baixar_dados.py
"""
from pathlib import Path
from urllib.request import urlopen

REPO = "igor-peres/impact-lab-sieng2026"
COMMIT = "d506455be974a49c8aa79ab74cd89731a60cfefc"  # main em 01/09/2026
PASTA_REMOTA = "data/case1_oportunidades"
ARQUIVOS = [
    "vagas.csv", "vaga_cursos.csv", "alunos.csv", "aluno_interesses.csv", "monitorias.csv",
    "PibicPibiti_vagasoferecidas.xlsx",
]

DESTINO = Path(__file__).resolve().parent / "data"


def main() -> None:
    DESTINO.mkdir(exist_ok=True)
    for nome in ARQUIVOS:
        url = f"https://raw.githubusercontent.com/{REPO}/{COMMIT}/{PASTA_REMOTA}/{nome}"
        with urlopen(url, timeout=60) as resp:
            conteudo = resp.read()
        (DESTINO / nome).write_bytes(conteudo)
        print(f"{nome}: {len(conteudo):,} bytes")


if __name__ == "__main__":
    main()
