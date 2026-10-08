"""Monta o vídeo final: cenas (PNG com zoom lento) + locução + legenda queimada.

Saída: out/iteri_lia_impact_lab.mp4 (1920x1080, 30 fps, H.264, AAC).
Ordem: python voz.py && node render.mjs && python montar.py
"""
import json
import subprocess
from pathlib import Path

AQUI = Path(__file__).resolve().parent
BUILD = AQUI / "build"
OUT = AQUI / "out"
FPS = 30


def rodar(cmd):
    subprocess.run(cmd, check=True)


def main() -> None:
    OUT.mkdir(exist_ok=True)
    linha = json.loads((BUILD / "linha_do_tempo.json").read_text())

    # 1. Um clipe por cena, com zoom de 1,00 a 1,03.
    clipes = []
    for c in linha["cenas"]:
        dur = c["fim"] - c["inicio"]
        frames = round(dur * FPS)
        clip = BUILD / f"clip_{c['cena']}.mp4"
        zoom = f"zoompan=z='1+0.03*on/{frames}':x='iw/2-(iw/zoom/2)':y='ih/2-(ih/zoom/2)':d={frames}:s=1920x1080:fps={FPS}"
        rodar(["ffmpeg", "-y", "-v", "error", "-i", str(BUILD / "cenas" / f"{c['cena']}.png"),
               "-vf", f"scale=3840:2160,{zoom},format=yuv420p", "-frames:v", str(frames),
               "-c:v", "libx264", "-preset", "medium", "-crf", "18", str(clip)])
        clipes.append(clip)
    lista = BUILD / "clipes.txt"
    lista.write_text("".join(f"file '{p}'\n" for p in clipes))

    # 2. Locução: cada frase posicionada no seu início.
    trechos = [t for c in linha["cenas"] for t in c["trechos"]]
    entradas, filtros = [], []
    for i, t in enumerate(trechos):
        entradas += ["-i", str(BUILD / "audio" / t["arquivo"])]
        atraso = round(t["inicio"] * 1000)
        filtros.append(f"[{i}:a]adelay={atraso}|{atraso}[a{i}]")
    mix = "".join(f"[a{i}]" for i in range(len(trechos)))
    filtros.append(f"{mix}amix=inputs={len(trechos)}:normalize=0,apad,atrim=0:{linha['total']}[voz]")
    audio = BUILD / "voz.m4a"
    rodar(["ffmpeg", "-y", "-v", "error", *entradas, "-filter_complex", ";".join(filtros),
           "-map", "[voz]", "-c:a", "aac", "-b:a", "192k", str(audio)])

    # 3. Junta, queima a legenda e grava.
    estilo = ("FontName=Inter,FontSize=15,PrimaryColour=&H00FFFFFF,OutlineColour=&H00101A1A,"
              "BackColour=&H99000000,BorderStyle=3,Outline=6,Shadow=0,MarginV=34,Alignment=2")
    final = OUT / "iteri_lia_impact_lab.mp4"
    rodar(["ffmpeg", "-y", "-v", "error", "-f", "concat", "-safe", "0", "-i", str(lista), "-i", str(audio),
           "-vf", f"subtitles={AQUI / 'legendas.srt'}:force_style='{estilo}'",
           "-c:v", "libx264", "-preset", "medium", "-crf", "20", "-pix_fmt", "yuv420p", "-r", str(FPS),
           "-c:a", "aac", "-b:a", "192k", "-shortest", "-movflags", "+faststart", str(final)])
    print(final)


if __name__ == "__main__":
    main()
