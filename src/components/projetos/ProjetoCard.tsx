import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Button from "@/components/ui/Button";
import Tag from "@/components/ui/Tag";
import { hrefDoProjeto, type Projeto } from "@/data/projetos";
import { ehUrlExterna } from "@/lib/links";

interface ProjetoCardProps {
  projeto: Projeto;
}

/**
 * Card de projeto. O link do título cobre o card inteiro (::after), então o
 * card é um único alvo de foco; o anel de foco é desenhado no ::after.
 * Demo e GitHub ficam acima da camada do link (relative z-10) e só aparecem
 * quando existem nos dados.
 */
export default function ProjetoCard({ projeto }: ProjetoCardProps) {
  const { titulo, resumo, imagem, tags, slug } = projeto;
  // Só URLs http(s) preenchidas viram link (nunca "[PREENCHER]" nem href relativo).
  const demoUrl = ehUrlExterna(projeto.demoUrl) ? projeto.demoUrl.trim() : null;
  const githubUrl = ehUrlExterna(projeto.githubUrl) ? projeto.githubUrl.trim() : null;

  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-lg border border-border bg-surface transition-[transform,border-color] duration-200 ease-out hover:border-border-strong motion-safe:hover:-translate-y-0.5 motion-safe:active:translate-y-0">
      <div className="relative aspect-[16/10] overflow-hidden border-b border-border">
        <Image
          src={imagem.src}
          alt={imagem.alt}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
          className="object-cover brightness-90 transition-[filter] duration-200 group-hover:brightness-100"
        />
      </div>

      <div className="flex flex-1 flex-col p-5 md:p-6">
        <h3 className="text-h3 text-fg">
          <Link
            href={hrefDoProjeto(slug)}
            className="rounded-sm after:absolute after:inset-0 after:rounded-lg after:content-[''] focus-visible:outline-none focus-visible:after:outline-2 focus-visible:after:-outline-offset-2 focus-visible:after:outline-accent"
          >
            {titulo}
          </Link>
        </h3>
        <p className="mt-2 line-clamp-3 text-corpo text-muted">{resumo}</p>

        <ul aria-label="Tecnologias" className="mt-4 flex flex-wrap gap-2">
          {tags.map((tag) => (
            <li key={tag}>
              <Tag sobreSurface>{tag}</Tag>
            </li>
          ))}
        </ul>

        <p aria-hidden="true" className="mt-5 inline-flex items-center gap-1.5 text-nav font-medium text-accent">
          Ver estudo de caso
          <ArrowRight size={16} strokeWidth={1.75} className="motion-safe:transition-transform motion-safe:duration-150 motion-safe:group-hover:translate-x-0.5" />
        </p>

        {demoUrl || githubUrl ? (
          <div className="relative z-10 mt-auto flex flex-wrap gap-x-6 pt-4">
            {demoUrl ? (
              <Button href={demoUrl} variante="ghost">
                Demo<span className="sr-only"> de {titulo}</span>
              </Button>
            ) : null}
            {githubUrl ? (
              <Button href={githubUrl} variante="ghost">
                GitHub<span className="sr-only"> de {titulo}</span>
              </Button>
            ) : null}
          </div>
        ) : null}
      </div>
    </article>
  );
}
