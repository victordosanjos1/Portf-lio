"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  LazyMotion,
  domAnimation,
  m,
  useReducedMotion,
} from "framer-motion";
import { Menu, X } from "lucide-react";
import { classesBotao } from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import { hrefDaSecao, type ItemNavegacao } from "@/data/navegacao";

const ID_PAINEL = "menu-mobile";
const EASE_OUT = [0.22, 1, 0.36, 1] as const;

/** Partes da página que ficam inertes (fora do alcance do teclado e leitor de tela) com o menu aberto. */
function elementosDeFundo(): HTMLElement[] {
  return Array.from(
    document.querySelectorAll<HTMLElement>("#conteudo, body > footer"),
  );
}

function travarPagina(travar: boolean) {
  document.body.style.overflow = travar ? "hidden" : "";
  for (const elemento of elementosDeFundo()) {
    elemento.inert = travar;
  }
}

interface MobileMenuProps {
  itens: ItemNavegacao[];
}

/**
 * Menu de navegação para telas < 768 px.
 * Abre: foco vai ao 1º link, rolagem travada, resto da página inerte.
 * Tab/Shift+Tab ficam presos entre o botão e o painel. Esc fecha e devolve
 * o foco ao botão. Clicar em um link fecha o menu. Passar de 768 px fecha.
 */
export default function MobileMenu({ itens }: MobileMenuProps) {
  const [aberto, setAberto] = useState(false);
  // O ícone só faz fade depois da 1ª abertura: no HTML estático ele nunca nasce com opacity:0.
  const [usouMenu, setUsouMenu] = useState(false);
  const reduzido = useReducedMotion();
  const botaoRef = useRef<HTMLButtonElement>(null);
  const painelRef = useRef<HTMLElement>(null);

  const fechar = useCallback((devolverFoco: boolean) => {
    // Libera a página já no evento, antes da navegação até a âncora.
    travarPagina(false);
    setAberto(false);
    if (devolverFoco) botaoRef.current?.focus();
  }, []);

  // Trava/destrava a página e move o foco para o 1º link ao abrir.
  useEffect(() => {
    if (!aberto) return;
    travarPagina(true);
    painelRef.current?.querySelector<HTMLElement>("a")?.focus();
    return () => travarPagina(false);
  }, [aberto]);

  // Esc fecha; Tab fica preso entre o botão e os links do painel.
  useEffect(() => {
    if (!aberto) return;

    function aoTeclar(evento: KeyboardEvent) {
      if (evento.key === "Escape") {
        evento.preventDefault();
        fechar(true);
        return;
      }
      if (evento.key !== "Tab") return;

      const focaveis = [
        botaoRef.current,
        ...Array.from(
          painelRef.current?.querySelectorAll<HTMLElement>("a[href]") ?? [],
        ),
      ].filter((el): el is HTMLElement => el !== null);
      if (focaveis.length === 0) return;

      const primeiro = focaveis[0];
      const ultimo = focaveis[focaveis.length - 1];
      const ativo = document.activeElement;
      const dentro = focaveis.includes(ativo as HTMLElement);

      if (evento.shiftKey && (ativo === primeiro || !dentro)) {
        evento.preventDefault();
        ultimo.focus();
      } else if (!evento.shiftKey && (ativo === ultimo || !dentro)) {
        evento.preventDefault();
        primeiro.focus();
      }
    }

    document.addEventListener("keydown", aoTeclar);
    return () => document.removeEventListener("keydown", aoTeclar);
  }, [aberto, fechar]);

  // Fecha ao passar para o layout desktop (>= 768 px).
  useEffect(() => {
    if (!aberto) return;
    const consulta = window.matchMedia("(min-width: 768px)");
    function aoMudar(evento: MediaQueryListEvent) {
      if (evento.matches) fechar(false);
    }
    consulta.addEventListener("change", aoMudar);
    return () => consulta.removeEventListener("change", aoMudar);
  }, [aberto, fechar]);

  const Icone = aberto ? X : Menu;

  return (
    <LazyMotion features={domAnimation} strict>
      <div className="md:hidden">
        <button
          ref={botaoRef}
          type="button"
          aria-label={aberto ? "Fechar menu" : "Abrir menu"}
          aria-expanded={aberto}
          // O painel só existe no DOM com o menu aberto: aria-controls nunca aponta para id inexistente.
          aria-controls={aberto ? ID_PAINEL : undefined}
          onClick={() => {
            setUsouMenu(true);
            if (aberto) fechar(false);
            else setAberto(true);
          }}
          className="inline-flex size-11 items-center justify-center rounded-md text-fg transition-colors duration-150 hover:bg-surface"
        >
          <m.span
            key={aberto ? "fechar" : "abrir"}
            initial={reduzido || !usouMenu ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: reduzido ? 0 : 0.15 }}
            className="inline-flex"
          >
            <Icone aria-hidden="true" size={24} strokeWidth={1.75} />
          </m.span>
        </button>

        <AnimatePresence>
          {aberto ? (
            <m.nav
              key="painel"
              id={ID_PAINEL}
              ref={painelRef}
              aria-label="Principal"
              initial={reduzido ? false : { opacity: 0, y: -8 }}
              animate={{
                opacity: 1,
                y: 0,
                transition: { duration: reduzido ? 0 : 0.22, ease: EASE_OUT },
              }}
              exit={{
                opacity: 0,
                y: reduzido ? 0 : -8,
                transition: { duration: reduzido ? 0 : 0.16, ease: EASE_OUT },
              }}
              className="absolute inset-x-0 top-full h-[calc(100dvh-4rem)] overflow-y-auto border-t border-border bg-bg"
            >
              <Container className="flex flex-col pt-4 pb-10">
                <ul className="divide-y divide-border">
                  {itens.map((item) => (
                    <li key={item.id}>
                      <Link
                        href={hrefDaSecao(item.id)}
                        onClick={() => fechar(false)}
                        className="flex min-h-12 items-center rounded-sm py-2 text-h3 font-semibold text-fg transition-colors duration-150 hover:text-accent"
                      >
                        {item.rotulo}
                      </Link>
                    </li>
                  ))}
                </ul>
                <Link
                  href={hrefDaSecao("contato")}
                  onClick={() => fechar(false)}
                  className={`${classesBotao("primario")} mt-8 w-full`}
                >
                  Fale comigo
                </Link>
              </Container>
            </m.nav>
          ) : null}
        </AnimatePresence>
      </div>
    </LazyMotion>
  );
}
