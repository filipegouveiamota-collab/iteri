"""Apoio à decisão de escopo: o que é o vagas.csv.

Não entra no vídeo além de uma frase. Mostra que o arquivo é quase todo estágio
externo, publicado por um único empresa_id (provável agente de integração), e por
isso fica fora do produto, que trata de oportunidades internas da PUC-Rio.

O funil vaga x aluno elegível fica como cálculo de apoio, sem uso no relatório.
"""
import comum

d = comum.carregar()
v = d["vagas"]
abertas = comum.vagas_abertas(v)

estagio = v.tipo.eq("Estágio")
emp_top = v.empresa_id.value_counts().index[0]
via_agente = v.empresa_id.eq(emp_top)

print(f"anúncios: {len(v)}")
print(f"estágio: {estagio.sum()} ({estagio.mean():.1%})")
print(f"maior empresa_id: {via_agente.sum()} ({via_agente.mean():.1%})")
print(f"estágio publicado pela maior empresa_id: {(estagio & via_agente).sum()} "
      f"({(estagio & via_agente).mean():.1%})")
print(f"abertos em {comum.DATA_CORTE.date()}: {len(abertas)}")

# Funil de apoio, só estágios abertos.
alunos = d["alunos"].assign(curso_norm=comum.curso_normalizado(d["alunos"]),
                            curso_bruto=d["alunos"].curso.map(comum.chave))
est = abertas[abertas.tipo.eq("Estágio")]
for col in ["curso_bruto", "curso_norm"]:
    n = comum.pares_elegiveis(est, d["vaga_cursos"], alunos, col).groupby("vaga_id").size()
    n = n.reindex(est.vaga_id, fill_value=0)
    print(f"funil ({col}): {len(est)} abertos, {(n > 0).sum()} com elegível, mediana {n.median():g}")
