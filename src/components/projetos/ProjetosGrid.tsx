"use client";

import { useState } from "react";
import {
  AnimatePresence,
  LazyMotion,
  domAnimation,
  m,
  useReducedMotion,
} from "framer-motion";
import { Check } from "lucide-react";
import ProjetoCard from "@/components/projetos/ProjetoCard";
import Button from "@/components/ui/Button";
import Reveal from "@/components/ui/Reveal";
import type { Projeto } from "@/data/projetos";

const TODOS = "Todos";
const EASE_OUT = [0.22, 1, 0.36, 1] as const;
/** Entrada dos cards ao rolar (design: 360 ms, stagger 50 ms, máx. 3 itens). */
const STAGGER = 0.05;
const ITENS_COM_STAGGER = 3;
/** Troca de filtro: fade simples de 200 ms, sem animar layout. */
const DURACAO_FILTRO = 0.2;

interface ProjetosGridProps {
  projetos: Projeto[];
  /** Tecnologias do filtro, geradas dos dados (tagsDosProjetos). */
  tags: string[];
}

function textoResultado(quantidade: number): string {
  if (quantidade === 0) return "Nenhum projeto encontrado";
  return quantidade === 1 ? "1 projeto" : `${quantidade} projetos`;
}

/**
 * Filtro por tecnologia (no client, sem recarregar) + grid de cards.
 * Chips são <button aria-pressed>; o ativo também ganha ícone Check e peso
 * maior (o estado não depende só da cor). O total aparece em região aria-live.
 */
export default function ProjetosGrid({ projetos, tags }: ProjetosGridProps) {
  const [filtro, setFiltro] = useState<string>(TODOS);
  // Antes do 1º clique, os cards entram ao rolar; depois, a troca é um fade curto.
  const [filtrou, setFiltrou] = useState(false);
  const reduzido = useReducedMotion();

  const visiveis =
    filtro === TODOS ? projetos : projetos.filter((projeto) => projeto.tags.includes(filtro));

  function escolher(opcao: string) {
    setFiltro(opcao);
    setFiltrou(true);
  }

  const opcoes = [TODOS, ...tags];

  return (
    <LazyMotion features={domAnimation} strict>
      <div
        role="group"
        aria-label="Filtrar projetos por tecnologia"
        className="flex flex-wrap gap-2"
      >
        {opcoes.map((opcao) => {
          const ativo = opcao === filtro;
          return (
            <button
              key={opcao}
              type="button"
              aria-pressed={ativo}
              onClick={() => escolher(opcao)}
              className={`inline-flex h-11 items-center gap-1.5 rounded-full border px-4 text-nav transition-[background-color,border-color,color,transform] duration-150 ease-out motion-safe:active:scale-[0.97] ${
                ativo
                  ? "border-accent bg-accent font-semibold text-on-accent hover:border-accent-hover hover:bg-accent-hover"
                  : "border-border-strong font-medium text-fg hover:border-muted hover:bg-surface"
              }`}
            >
              {ativo ? <Check aria-hidden="true" size={16} strokeWidth={2} /> : null}
              {opcao}
            </button>
          );
        })}
      </div>

      <p className="sr-only" aria-live="polite">
        {textoResultado(visiveis.length)}
      </p>

      <div className="mt-8">
        {visiveis.length > 0 ? (
          <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <AnimatePresence>
              {visiveis.map((projeto, indice) => (
                <m.li
                  key={projeto.slug}
                  className="min-w-0"
                  {...animacaoDoCard(reduzido, filtrou)}
                >
                  {/* Entrada ao rolar só por CSS (Reveal): o HTML estático nunca nasce invisível. */}
                  <Reveal
                    desativado={filtrou}
                    delay={Math.min(indice, ITENS_COM_STAGGER - 1) * STAGGER}
                    className="h-full"
                  >
                    <ProjetoCard projeto={projeto} />
                  </Reveal>
                </m.li>
              ))}
            </AnimatePresence>
          </ul>
        ) : (
          // Monta só quando o filtro fica vazio, então o fade de entrada roda sozinho.
          <m.div
            initial={reduzido ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: reduzido ? 0 : DURACAO_FILTRO }}
            className="flex flex-col items-start gap-4 rounded-lg border border-dashed border-border-strong p-6 md:p-8"
          >
            <p className="text-corpo text-muted">Nenhum projeto com essa tecnologia ainda.</p>
            <Button variante="secundario" onClick={() => escolher(TODOS)}>
              Ver todos
            </Button>
          </m.div>
        )}
      </div>
    </LazyMotion>
  );
}

/**
 * Props de framer-motion de cada card. Antes do 1º filtro, `initial={false}`:
 * o SSR não grava opacity:0 (a entrada ao rolar é do Reveal, via CSS). Depois
 * do filtro (só no cliente, já com a preferência de movimento conhecida), fade
 * curto de 200 ms; com movimento reduzido, sem animação.
 */
function animacaoDoCard(reduzido: boolean | null, filtrou: boolean) {
  if (reduzido) {
    return { initial: false as const, transition: { duration: 0 } };
  }
  const saida = { opacity: 0, transition: { duration: DURACAO_FILTRO } };
  if (filtrou) {
    return {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      exit: saida,
      transition: { duration: DURACAO_FILTRO, ease: EASE_OUT },
    };
  }
  return { initial: false as const, exit: saida };
}
