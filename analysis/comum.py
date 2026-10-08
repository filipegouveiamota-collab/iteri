"""Carga dos dados e regras compartilhadas pelas análises do Case 1.

Toda regra que muda um número (data de corte, normalização de curso, taxonomia de
áreas, zonas da cidade) mora aqui, para que cada script use a mesma definição.
"""
import re
import unicodedata
from pathlib import Path

import pandas as pd

DATA = Path(__file__).resolve().parent / "data"

# Data da extração declarada no README do case. Vaga aberta = publicada até essa
# data e com data_termino maior ou igual a ela.
DATA_CORTE = pd.Timestamp("2026-08-17")


def sem_acento(texto: str) -> str:
    texto = unicodedata.normalize("NFKD", str(texto))
    return "".join(c for c in texto if not unicodedata.combining(c))


def chave(texto: str) -> str:
    """Forma canônica para comparar nomes: sem acento, maiúscula, espaços simples."""
    return re.sub(r"\s+", " ", sem_acento(texto)).strip().upper()


def carregar():
    if not (DATA / "vagas.csv").exists():
        raise SystemExit("Dados ausentes. Rode antes: python analysis/baixar_dados.py")
    vagas = pd.read_csv(DATA / "vagas.csv", parse_dates=["data_publicacao", "data_termino"])
    return {
        "vagas": vagas,
        "vaga_cursos": pd.read_csv(DATA / "vaga_cursos.csv"),
        "alunos": pd.read_csv(DATA / "alunos.csv"),
        "interesses": pd.read_csv(DATA / "aluno_interesses.csv"),
        "monitorias": pd.read_csv(DATA / "monitorias.csv"),
    }


def vagas_abertas(vagas: pd.DataFrame) -> pd.DataFrame:
    return vagas[(vagas.data_publicacao <= DATA_CORTE) & (vagas.data_termino >= DATA_CORTE)]


# --- Normalização de curso -------------------------------------------------------
# alunos.csv traz "Engenharia" como curso genérico e a ênfase em `habilitacao`;
# vaga_cursos.csv lista cada engenharia separadamente. Sem esta tabela, todo aluno
# de engenharia fica sem vaga compatível.
HABILITACAO_ENGENHARIA = {
    "Bac Em Engenharia De Produção": "ENGENHARIA DE PRODUCAO",
    "Bac Engenharia De Computação": "ENGENHARIA DE COMPUTACAO",
    "Bac Em Engenharia Mecânica": "ENGENHARIA MECANICA",
    "Bac Em Engenharia Civil": "ENGENHARIA CIVIL",
    "Bac Em Engenharia Química": "ENGENHARIA QUIMICA",
    "Bac Em Engenharia Elétrica": "ENGENHARIA ELETRICA",
    "Bac Eng Controle E Automação": "ENGENHARIA DE CONTROLE E AUTOMACAO",
    "Bac Eng Mat Nano": "ENGENHARIA DE MATERIAIS",
    "Bac Em Engenharia Ambiental": "ENGENHARIA AMBIENTAL",
}
# Mesmo curso com nomes diferentes nos dois sistemas.
SINONIMOS_CURSO = {"CIENCIAS ECONOMICAS": "ECONOMIA"}


def curso_normalizado(alunos: pd.DataFrame) -> pd.Series:
    def um(linha):
        if linha.curso == "Engenharia":
            return HABILITACAO_ENGENHARIA.get(linha.habilitacao, "ENGENHARIA")
        c = chave(linha.curso)
        return SINONIMOS_CURSO.get(c, c)

    return alunos.apply(um, axis=1)


def pares_elegiveis(vagas, vaga_cursos, alunos, coluna_curso="curso_norm"):
    """Pares (vaga, aluno) em que o curso é aceito e o período cabe na faixa."""
    vc = vaga_cursos.assign(curso_chave=vaga_cursos.curso.map(chave))
    pares = (
        vc[vc.vaga_id.isin(vagas.vaga_id)]
        .merge(alunos, left_on="curso_chave", right_on=coluna_curso, suffixes=("_vaga", ""))
        .merge(vagas[["vaga_id", "periodo_min", "periodo_max"]], on="vaga_id")
    )
    ok = (pares.periodo_atual >= pares.periodo_min) & (pares.periodo_atual <= pares.periodo_max)
    return pares.loc[ok, ["vaga_id", "aluno_id"]].drop_duplicates()
