import Image from "next/image";
import { Download } from "lucide-react";
import Button from "@/components/ui/Button";
import Reveal from "@/components/ui/Reveal";
import Section from "@/components/ui/Section";
import { perfil } from "@/data/perfil";

/**
 * Seção Sobre (#sobre): bio em parágrafos, foto e botão "Baixar CV".
 * Mobile: foto (1:1, até 280 px) acima do texto. md+: texto em 7 colunas
 * à esquerda e foto em 4 colunas à direita (4:5 em lg).
 */
export default function Sobre() {
  return (
    <Section id="sobre" numero="01" rotulo="Sobre" titulo="Sobre mim">
      <div className="grid gap-10 md:grid-cols-12 md:gap-6">
        <Reveal className="min-w-0 md:col-span-4 md:col-start-9 md:row-start-1">
          <div className="relative aspect-square w-full max-w-[280px] overflow-hidden rounded-lg border border-border bg-surface md:max-w-none lg:aspect-[4/5]">
            <Image
              src={perfil.foto.src}
              alt={perfil.foto.alt}
              fill
              sizes="(min-width: 1024px) 360px, (min-width: 768px) 33vw, 280px"
              className="object-cover"
            />
          </div>
        </Reveal>

        <Reveal delay={0.05} className="min-w-0 md:col-span-7 md:col-start-1 md:row-start-1">
          <div className="flex max-w-[65ch] flex-col gap-5 text-corpo text-fg md:text-corpo-lg">
            {perfil.bio.map((paragrafo) => (
              <p key={paragrafo}>{paragrafo}</p>
            ))}
          </div>
          <Button
            href={perfil.cvUrl}
            download
            variante="secundario"
            icone={Download}
            className="mt-8"
          >
            Baixar CV
          </Button>
        </Reveal>
      </div>
    </Section>
  );
}
