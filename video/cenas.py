"""Roteiro do vídeo como dado: cada cena tem as falas (locução) e, quando a
legenda difere da fala, o texto da legenda. Números: ver analysis/RESULTADOS.md."""

CENAS = [
    ("caso", [
        "ITERI. Caso 1, oportunidades integradas.",
        "Na PUC-Rio, monitoria, iniciação científica e vaga em laboratório circulam por indicação.",
        "O aluno não sabe onde procurar, e quem oferece não tem canal.",
    ]),
    ("escopo", [
        "O arquivo de vagas do caso é quase todo estágio externo.",
        "3.220 dos 3.550 anúncios vêm de uma única empresa, provável agente de integração.",
        "Estágio já tem canal. O ITERI cuida da oportunidade interna.",
    ]),
    ("leitura", [
        "Monitoria registrada é monitoria concedida, não vaga aberta.",
        "A planilha de PIBIC traz bolsas oferecidas, não preenchidas.",
        "E os IDs de monitores não cruzam com os de alunos.",
    ]),
    ("achados", [
        "Em 2026, foram 300 bolsas PIBIC e PIBITI, total estável desde 2022. Mas Informática foi de 4 para 44.",
        "Monitoria se repete por departamento: só 24 das 58 disciplinas de 2025.2 já tinham monitor.",
        "E só 4,6% dos alunos com interesse declarado citam pesquisa, docência ou monitoria.",
    ]),
    ("produto", [
        ("O ITERI está no ar em iteri ponto com ponto bê erre.", "O ITERI está no ar em iteri.com.br."),
        "Cadastro com e-mail da PUC, perfil preenchido uma vez e feed de oportunidades internas.",
        "Candidatura em um clique, com status e aviso por e-mail.",
    ]),
    ("engenharia", [
        "React na Vercel e Supabase, com RLS nas sete tabelas.",
        "O ofertante só vê quem se candidatou à vaga dele.",
        "A recomendação por perfil ainda não está no app.",
    ]),
    ("ia", [
        "Usamos o Claude e registramos nove interações no AI Log.",
        "Maior erro: números do deck anterior sem código que os produzisse. Refizemos a análise com scripts.",
        "Menos confiável: a tabela que liga departamento a curso.",
    ]),
    ("fim", [
        "Próximos passos: interesse acadêmico no cadastro, público por departamento para o ofertante e monitorias abertas a cada semestre.",
        "Código e análise estão no GitHub.",
    ]),
]


def falas(cena):
    """[(texto falado, texto da legenda)] de uma cena."""
    return [f if isinstance(f, tuple) else (f, f) for f in cena[1]]
