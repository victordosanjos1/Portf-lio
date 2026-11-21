import { ArrowRight } from "lucide-react";
import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import RedesSociais from "@/components/ui/RedesSociais";
import Reveal from "@/components/ui/Reveal";
import { hrefDaSecao } from "@/data/navegacao";
import { perfil } from "@/data/perfil";
import { stack } from "@/data/stack";

/** Cascata do Hero (design, seção 10): 320 ms, y 8 -> 0, stagger 40 ms (máx. 4 itens). */
const DURACAO_HERO = 0.32;
const DESLOCAMENTO_HERO = 8;
const STAGGER_HERO = 0.04;

/** Quantos itens de cada categoria aparecem no cartão decorativo. */
const ITENS_POR_CATEGORIA = 3;

/**
 * Hero da home (#inicio). O header é fixo (64 px) e o <main> não tem padding,
 * por isso o Hero reserva o topo: pt-28 no mobile e pt-16 + altura mínima de
 * uma tela em lg+.
 */
export default function Hero() {
  return (
    <section
      id="inicio"
      aria-labelledby="inicio-titulo"
      className="relative overflow-hidden pt-28 pb-16 lg:flex lg:min-h-svh lg:items-center lg:pt-16"
    >
      {/* Brilho violeta estático no topo (token --color-glow), elíptico e difuso. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_90%_65%_at_50%_0%,var(--color-glow),transparent_70%)]"
      />

      {/* Grade decorativa estática (1 px, branco a 4%), esmaecida a partir do topo, sob o brilho. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,var(--color-grid-line)_1px,transparent_1px),linear-gradient(to_bottom,var(--color-grid-line)_1px,transparent_1px)] bg-[size:48px_48px] [mask-image:radial-gradient(ellipse_80%_60%_at_50%_0%,black_20%,transparent_75%)]"
      />

      <Container className="relative">
        <div className="grid items-center gap-12 lg:grid-cols-12">
          <div className="min-w-0 lg:col-span-7">
            <Reveal duracao={DURACAO_HERO} y={DESLOCAMENTO_HERO}>
              <p className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1.5 text-pequeno font-medium text-muted">
                <span aria-hidden="true" className="size-2 shrink-0 rounded-full bg-accent" />
                {perfil.disponibilidade}
              </p>
            </Reveal>

            {/* h1 é o LCP: anima só o deslocamento, nunca nasce invisível. */}
            <Reveal
              duracao={DURACAO_HERO}
              y={DESLOCAMENTO_HERO}
              delay={STAGGER_HERO}
              fade={false}
            >
              <h1 id="inicio-titulo" className="mt-8 text-display text-fg [overflow-wrap:anywhere]">
                {perfil.nome}
              </h1>
            </Reveal>

            <Reveal duracao={DURACAO_HERO} y={DESLOCAMENTO_HERO} delay={STAGGER_HERO * 2}>
              <p className="mt-3 text-h3 font-medium text-muted lg:text-h3-lg">
                {perfil.cargo}
              </p>
              <p className="mt-6 max-w-[36ch] text-lead text-fg sm:max-w-[52ch] lg:text-lead-lg">
                {perfil.proposta}
              </p>
            </Reveal>

            <Reveal duracao={DURACAO_HERO} y={DESLOCAMENTO_HERO} delay={STAGGER_HERO * 3}>
              <div className="mt-10 flex flex-col gap-3 sm:flex-row">
                <Button href={hrefDaSecao("projetos")} icone={ArrowRight} className="w-full sm:w-auto">
                  Ver projetos
                </Button>
                <Button href={hrefDaSecao("contato")} variante="secundario" className="w-full sm:w-auto">
                  Fale comigo
                </Button>
              </div>
              <p className="mt-3 text-pequeno text-muted">{perfil.notaResposta}</p>

              <RedesSociais className="mt-8 -ml-3" />
            </Reveal>
          </div>

          <CartaoStack />
        </div>
      </Container>
    </section>
  );
}

/** Cartão decorativo do Hero (só lg+): trecho "stack.ts" com os primeiros itens de cada categoria. */
function CartaoStack() {
  return (
    <div
      aria-hidden="true"
      className="hidden min-w-0 rounded-lg border border-border bg-surface lg:col-span-5 lg:block"
    >
      <div className="flex items-center gap-2 border-b border-border px-5 py-3">
        <span className="size-2.5 rounded-full bg-border-strong" />
        <span className="size-2.5 rounded-full bg-border-strong" />
        <span className="size-2.5 rounded-full bg-border-strong" />
        <span className="ml-3 font-mono text-label text-muted">stack.ts</span>
      </div>
      <pre className="p-5 font-mono text-label leading-relaxed tracking-normal whitespace-pre-wrap text-muted [overflow-wrap:anywhere]">
        <code>
          <span className="text-accent">export const</span> <span className="text-fg">stack</span> = {"{"}
          {"\n"}
          {stack.map((categoria) => (
            <span key={categoria.categoria}>
              {"  "}
              <span className="text-fg">&quot;{categoria.categoria}&quot;</span>: [
              {categoria.itens.slice(0, ITENS_POR_CATEGORIA).map((item, indice) => (
                <span key={item}>
                  {indice > 0 ? ", " : ""}
                  <span className="text-fg">&quot;{item}&quot;</span>
                </span>
              ))}
              ],{"\n"}
            </span>
          ))}
          {"}"};
        </code>
      </pre>
    </div>
  );
}
