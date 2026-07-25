import { useState } from "react";
import { toast } from "sonner";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

export function NewsletterBand({
  title = "Fique por dentro das novidades",
  subtitle = "Receba as novas vagas publicadas diretamente no seu email cadastrado.",
}: {
  title?: string;
  subtitle?: string;
}) {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    toast.success("Inscrição confirmada! Você receberá novidades em breve.");
    setEmail("");
  };

  return (
    <section className="bg-teal-50">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-20 py-12 flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <h2 className="text-[#111827] mb-1">{title}</h2>
          <p className="text-[#4b5563]">{subtitle}</p>
        </div>
        <form onSubmit={handleSubmit} className="flex w-full max-w-md gap-2">
          <Input
            type="email"
            placeholder="Seu email universitário..."
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-white"
          />
          <Button type="submit" className="shrink-0">
            Inscrever-se
          </Button>
        </form>
      </div>
    </section>
  );
}
