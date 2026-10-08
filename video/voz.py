"""Gera a locução (edge-tts, pt-BR-AntonioNeural), a linha do tempo e o .srt.

Uma faixa por frase; a duração medida de cada uma define o tempo das cenas e
das legendas. Atrás de proxy com TLS reescrito, aponte EDGE_TTS_CA para o bundle.
"""
import asyncio
import json
import os
import subprocess
from pathlib import Path

import certifi

if os.environ.get("EDGE_TTS_CA"):
    certifi.where = lambda: os.environ["EDGE_TTS_CA"]
import edge_tts  # noqa: E402

from cenas import CENAS, falas

VOZ = "pt-BR-AntonioNeural"
TAXA = "+20%"
INICIO, ENTRE_FRASES, ENTRE_CENAS, FIM = 0.4, 0.2, 0.4, 1.5

AQUI = Path(__file__).resolve().parent
BUILD = AQUI / "build"
AUDIO = BUILD / "audio"


def duracao(arq: Path) -> float:
    out = subprocess.run(["ffprobe", "-v", "error", "-show_entries", "format=duration",
                          "-of", "csv=p=0", str(arq)], capture_output=True, text=True, check=True)
    return float(out.stdout)


async def sintetizar(texto: str, destino: Path) -> None:
    if destino.exists() and destino.stat().st_size > 0:
        return
    c = edge_tts.Communicate(texto, VOZ, rate=TAXA, proxy=os.environ.get("HTTPS_PROXY"))
    await c.save(str(destino))


def srt_tempo(t: float) -> str:
    ms = round(t * 1000)
    h, ms = divmod(ms, 3_600_000)
    m, ms = divmod(ms, 60_000)
    s, ms = divmod(ms, 1000)
    return f"{h:02}:{m:02}:{s:02},{ms:03}"


async def main() -> None:
    AUDIO.mkdir(parents=True, exist_ok=True)
    t = INICIO
    linha, legendas = [], []
    for ci, cena in enumerate(CENAS):
        inicio_cena = t - (INICIO if ci == 0 else ENTRE_CENAS / 2)
        trechos = []
        for fi, (fala, legenda) in enumerate(falas(cena)):
            arq = AUDIO / f"{ci:02}_{fi:02}.mp3"
            await sintetizar(fala, arq)
            d = duracao(arq)
            trechos.append({"arquivo": arq.name, "inicio": round(t, 3), "duracao": round(d, 3)})
            legendas.append((t, t + d, legenda))
            t += d + ENTRE_FRASES
        t += ENTRE_CENAS - ENTRE_FRASES
        fim_cena = t - ENTRE_CENAS / 2 if ci < len(CENAS) - 1 else t + FIM
        linha.append({"cena": cena[0], "inicio": round(inicio_cena, 3),
                      "fim": round(fim_cena, 3), "trechos": trechos})
    total = linha[-1]["fim"]
    (BUILD / "linha_do_tempo.json").write_text(json.dumps({"total": total, "cenas": linha}, indent=2))
    srt = [f"{i}\n{srt_tempo(a)} --> {srt_tempo(b)}\n{txt}\n" for i, (a, b, txt) in enumerate(legendas, 1)]
    (AQUI / "legendas.srt").write_text("\n".join(srt))
    for c in linha:
        print(f"{c['cena']:<11} {c['inicio']:6.1f} a {c['fim']:6.1f}")
    print(f"total {total:.1f}s")


if __name__ == "__main__":
    asyncio.run(main())
