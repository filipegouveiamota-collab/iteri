import { Link } from "react-router";
import { Button } from "../ui/button";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import campusImage from "@/imports/IteriDsComponentes/450d9f0db4d4357b23323afe55ec5841dc0b14fd.png";

export function HeroSection() {
  return (
    <section className="max-w-[1280px] mx-auto px-6 lg:px-20 pt-16 pb-20 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
      <div className="flex flex-col items-start gap-6">
        <span className="inline-flex items-center gap-2 rounded-full bg-teal-50 px-3 py-1.5 text-xs font-semibold text-teal-700">
          <span className="size-1.5 rounded-full bg-teal-500" />
          Oportunidades Ativas no seu Campus
        </span>
        <h1 className="text-[#111827] text-4xl md:text-5xl leading-tight">
          Conectando estudantes a oportunidades reais no campus
        </h1>
        <p className="max-w-lg text-lg text-[#4b5563]">
          Descubra monitorias, iniciações científicas, projetos e eventos remunerados na sua universidade. Ganhe
          experiência prática e renda sem sair do campus.
        </p>
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <Button asChild size="lg">
            <Link to="/register">Comece Agora</Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <Link to="/#como-funciona">Saiba Mais</Link>
          </Button>
        </div>
      </div>

      <div className="relative">
        <div className="rounded-2xl overflow-hidden h-[320px] shadow-lg">
          <ImageWithFallback src={campusImage} alt="Campus universitário" className="size-full object-cover" />
        </div>
        <div className="absolute bottom-4 left-4 right-4 rounded-xl bg-black/60 backdrop-blur px-4 py-3 text-white">
          <p className="font-semibold text-sm">Campus Universitário</p>
          <p className="text-xs text-white/80">Mais de 150 alunos já contratados este mês</p>
        </div>
      </div>
    </section>
  );
}
