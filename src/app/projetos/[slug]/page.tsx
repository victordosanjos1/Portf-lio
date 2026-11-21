import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import Button, { classesBotao } from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import Tag from "@/components/ui/Tag";
import { hrefDaSecao } from "@/data/navegacao";
import { buscarProjeto, hrefDoProjeto, projetos } from "@/data/projetos";
import { ehUrlExterna } from "@/lib/links";
import { OG_BASE, OG_IMAGEM } from "@/lib/site";

// Só os slugs de src/data/projetos.ts existem; qualquer outro é 404 (404.html no export).
export const dynamicParams = false;

export function generateStaticParams() {
  return projetos.map((projeto) => ({ slug: projeto.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/projetos/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const projeto = buscarProjeto(slug);
  if (!projeto) return {};

  const url = hrefDoProjeto(projeto.slug);
  return {
    title: projeto.titulo,
    description: projeto.resumo,
    alternates: { canonical: url },
    openGraph: {
      ...OG_BASE,
      type: "article",
      url,
      title: projeto.titulo,
      description: projeto.resumo,
    },
    twitter: {
      card: "summary_large_image",
      images: [OG_IMAGEM.url],
      title: projeto.titulo,
      description: projeto.resumo,
    },
  };
}

const ESTILO_H2 = "text-h3 text-fg lg:text-h3-lg";

/** Link "Voltar para projetos" com a seta à esquerda (o Button põe o ícone à direita). */
function VoltarParaProjetos({ className = "" }: { className?: string }) {
  return (
    <Link
      href={hrefDaSecao("projetos")}
      className={`${classesBotao("ghost")} gap-1.5 ${className}`}
    >
      <ArrowLeft
        aria-hidden="true"
        size={18}
        strokeWidth={1.75}
        className="motion-safe:transition-transform motion-safe:duration-150 motion-safe:group-hover:-translate-x-0.5"
      />
      Voltar para projetos
    </Link>
  );
}

/**
 * Estudo de caso de um projeto. O header é fixo (64 px) e o <main> não tem
 * padding, então a página reserva o topo com pt-24 (64 px + respiro).
 * Ordem do DOM = ordem de leitura do mobile: cabeçalho, capa, ficha (papel e
 * stack), corpo (problema, solução, resultados, galeria). Em lg a ficha vai
 * para a coluna da direita, sticky.
 */
export default async function PaginaProjeto({ params }: PageProps<"/projetos/[slug]">) {
  const { slug } = await params;
  const projeto = buscarProjeto(slug);
  if (!projeto) notFound();

  const { titulo, resumo, tags, imagem, papel, stack, problema, solucao, resultados } = projeto;
  // Só URLs http(s) preenchidas viram link (nunca "[PREENCHER]" nem href relativo).
  const demoUrl = ehUrlExterna(projeto.demoUrl) ? projeto.demoUrl.trim() : null;
  const githubUrl = ehUrlExterna(projeto.githubUrl) ? projeto.githubUrl.trim() : null;
  const galeria = projeto.galeria ?? [];

  return (
    <article className="pt-24 pb-16 md:pt-28 md:pb-24">
      <Container>
        <VoltarParaProjetos className="-ml-0.5" />

        <header className="mt-8 max-w-[52rem]">
          <p aria-hidden="true" className="mb-3 font-mono text-label uppercase text-muted">
            Estudo de caso
          </p>
          <h1 className="text-h1-pagina text-fg [overflow-wrap:anywhere] lg:text-h1-pagina-lg">
            {titulo}
          </h1>
          <p className="mt-4 max-w-[65ch] text-lead text-muted lg:text-lead-lg">{resumo}</p>

          <ul aria-label="Tecnologias" className="mt-6 flex flex-wrap gap-2">
            {tags.map((tag) => (
              <li key={tag}>
                <Tag>{tag}</Tag>
              </li>
            ))}
          </ul>

          {demoUrl || githubUrl ? (
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              {demoUrl ? (
                <Button href={demoUrl} className="w-full sm:w-auto">
                  Ver demo
                </Button>
              ) : null}
              {githubUrl ? (
                <Button
                  href={githubUrl}
                  variante={demoUrl ? "secundario" : "primario"}
                  className="w-full sm:w-auto"
                >
                  GitHub
                </Button>
              ) : null}
            </div>
          ) : null}
        </header>

        <div className="relative mt-12 overflow-hidden rounded-lg border border-border bg-surface">
          <Image
            src={imagem.src}
            alt={imagem.alt}
            width={imagem.width}
            height={imagem.height}
            // Capa é o LCP: `preload` (substitui `priority`, depreciado no Next 16) gera o
            // <link rel="preload"> no HTML estático e fetchpriority="high" sobe a prioridade.
            preload
            fetchPriority="high"
            sizes="(min-width: 1200px) 1152px, 100vw"
            className="aspect-[16/10] w-full object-cover lg:aspect-video"
          />
        </div>

        <div className="mt-12 grid gap-12 lg:mt-16 lg:grid-cols-12 lg:gap-6">
          <aside
            aria-label="Ficha do projeto"
            className="min-w-0 self-start rounded-lg border border-border bg-surface p-5 md:p-6 lg:sticky lg:top-24 lg:col-span-4 lg:col-start-9 lg:row-start-1"
          >
            <h2 className={ESTILO_H2}>Meu papel</h2>
            <p className="mt-2 text-corpo text-fg">{papel}</p>

            <h2 className={`mt-8 ${ESTILO_H2}`}>Stack</h2>
            <ul className="mt-3 flex flex-wrap gap-2">
              {stack.map((tecnologia) => (
                <li key={tecnologia}>
                  <Tag sobreSurface>{tecnologia}</Tag>
                </li>
              ))}
            </ul>
          </aside>

          <div className="flex min-w-0 max-w-[68ch] flex-col gap-12 lg:col-span-8 lg:row-start-1">
            <section aria-labelledby="problema">
              <h2 id="problema" className={ESTILO_H2}>
                Problema
              </h2>
              <p className="mt-3 text-corpo text-fg md:text-corpo-lg">{problema}</p>
            </section>

            <section aria-labelledby="solucao">
              <h2 id="solucao" className={ESTILO_H2}>
                Solução
              </h2>
              <p className="mt-3 text-corpo text-fg md:text-corpo-lg">{solucao}</p>
            </section>

            <section aria-labelledby="resultados">
              <h2 id="resultados" className={ESTILO_H2}>
                Resultados
              </h2>
              <ul className="mt-3 flex flex-col gap-3 text-corpo text-fg md:text-corpo-lg">
                {resultados.map((resultado) => (
                  <li key={resultado} className="flex gap-3">
                    <span
                      aria-hidden="true"
                      className="mt-[0.7em] size-1.5 shrink-0 rounded-full bg-accent"
                    />
                    <span className="min-w-0">{resultado}</span>
                  </li>
                ))}
              </ul>
            </section>

            {galeria.length > 0 ? (
              <section aria-labelledby="galeria">
                <h2 id="galeria" className={ESTILO_H2}>
                  Galeria
                </h2>
                <ul className="mt-4 grid gap-6 md:grid-cols-2">
                  {galeria.map((foto) => (
                    <li
                      key={foto.src + foto.alt}
                      className="min-w-0 overflow-hidden rounded-lg border border-border bg-surface"
                    >
                      <Image
                        src={foto.src}
                        alt={foto.alt}
                        width={foto.width}
                        height={foto.height}
                        sizes="(min-width: 1024px) 380px, (min-width: 768px) 50vw, 100vw"
                        className="h-auto w-full"
                      />
                    </li>
                  ))}
                </ul>
              </section>
            ) : null}
          </div>
        </div>

        <section
          aria-labelledby="cta-projeto"
          className="mt-16 flex flex-col gap-6 border-t border-border pt-10 md:mt-24 md:flex-row md:items-center md:justify-between"
        >
          <h2 id="cta-projeto" className={ESTILO_H2}>
            Gostou deste projeto? Fale comigo.
          </h2>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <Button href={hrefDaSecao("contato")} className="w-full sm:w-auto">
              Fale comigo
            </Button>
            <VoltarParaProjetos className="justify-center sm:justify-start sm:px-2" />
          </div>
        </section>
      </Container>
    </article>
  );
}
