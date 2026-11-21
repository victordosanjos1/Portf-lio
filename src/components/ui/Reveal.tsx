"use client";

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";

/** Duração de entrada do design (--dur-enter = 360 ms; limite do usuário: 400 ms). */
const DURACAO = 0.36;
/** Limite do usuário para qualquer animação: 400 ms. */
const DURACAO_MAXIMA = 0.4;
/** Soma máxima dos atrasos de stagger (design: 150 ms). */
const ATRASO_MAXIMO = 0.15;

interface RevealProps {
  children: ReactNode;
  /** Atraso em segundos (stagger). Limitado a 0,15 s. */
  delay?: number;
  /** Deslocamento vertical inicial em px (padrão 12, máx. 16). */
  y?: number;
  /** Elemento renderizado. Use "li" dentro de listas. */
  as?: "div" | "li";
  /** Duração em segundos (padrão 0,36; limitada a 0,4). */
  duracao?: number;
  /**
   * `false` anima só o deslocamento, sem esconder o conteúdo (ex.: h1 do Hero,
   * que é o LCP e não pode nascer com opacidade 0).
   */
  fade?: boolean;
  /** `true` nasce já revelado, sem animação (ex.: cards que entram por troca de filtro). */
  desativado?: boolean;
  className?: string;
}

/**
 * Entrada discreta (fade + slide de baixo) quando o bloco aparece na tela.
 * Dispara uma vez.
 *
 * O estado escondido existe só no CSS (globals.css, bloco "Reveal"), e só vale
 * com `html.js` (classe posta por um script inline no layout) e
 * `prefers-reduced-motion: no-preference`. Assim o HTML estático é sempre
 * visível: sem JS, com movimento reduzido e antes da hidratação no caso do
 * movimento reduzido. O servidor e o cliente renderizam os mesmos atributos,
 * então não há mismatch de hidratação.
 */
export default function Reveal({
  children,
  delay = 0,
  y = 12,
  as = "div",
  duracao = DURACAO,
  fade = true,
  desativado = false,
  className,
}: RevealProps) {
  const ref = useRef<HTMLElement | null>(null);
  const [visivel, setVisivel] = useState(false);
  const revelado = visivel || desativado;

  useEffect(() => {
    if (revelado) return;
    const elemento = ref.current;
    // Sem IntersectionObserver (navegador muito antigo), marca direto no DOM.
    if (!elemento || typeof IntersectionObserver === "undefined") {
      elemento?.setAttribute("data-revelado", "");
      return;
    }
    const observador = new IntersectionObserver(
      (entradas) => {
        if (entradas.some((entrada) => entrada.isIntersecting)) {
          setVisivel(true);
          observador.disconnect();
        }
      },
      { rootMargin: "0px 0px -10% 0px" },
    );
    observador.observe(elemento);
    return () => observador.disconnect();
  }, [revelado]);

  const estilo = {
    "--reveal-y": `${Math.min(Math.abs(y), 16)}px`,
    "--reveal-dur": `${Math.min(Math.max(duracao, 0), DURACAO_MAXIMA)}s`,
    "--reveal-delay": `${Math.min(Math.max(delay, 0), ATRASO_MAXIMO)}s`,
  } as CSSProperties;

  const props = {
    className,
    style: estilo,
    "data-reveal": fade ? "fade" : "slide",
    "data-revelado": revelado ? "" : undefined,
  };

  if (as === "li") {
    return (
      <li ref={(no) => { ref.current = no; }} {...props}>
        {children}
      </li>
    );
  }
  return (
    <div ref={(no) => { ref.current = no; }} {...props}>
      {children}
    </div>
  );
}
