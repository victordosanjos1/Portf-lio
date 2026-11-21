import type { ReactNode } from "react";
import Container from "@/components/ui/Container";

interface SectionProps {
  /** Id da âncora (ex.: "sobre"). O h2 recebe o id "<id>-titulo". */
  id: string;
  /** Número do rótulo mono, ex.: "01". */
  numero: string;
  /** Texto do rótulo mono, ex.: "Sobre". */
  rotulo: string;
  titulo: string;
  /** Texto curto opcional sob o título. */
  descricao?: string;
  children: ReactNode;
  /** `true`: em lg+ o cabeçalho fica à esquerda (5 col) e o conteúdo à direita (7 col). */
  ladoALado?: boolean;
  className?: string;
}

/**
 * Seção da home: hairline superior, rótulo mono decorativo ("01 / Sobre")
 * e h2 que nomeia a região (aria-labelledby).
 */
export default function Section({
  id,
  numero,
  rotulo,
  titulo,
  descricao,
  children,
  ladoALado = false,
  className = "",
}: SectionProps) {
  const tituloId = `${id}-titulo`;

  return (
    <section
      id={id}
      aria-labelledby={tituloId}
      className={`scroll-mt-20 border-t border-border py-16 md:py-24 ${className}`}
    >
      <Container
        className={ladoALado ? "lg:grid lg:grid-cols-12 lg:gap-12" : ""}
      >
        <div className={`mb-10 md:mb-14 ${ladoALado ? "lg:col-span-5 lg:mb-0" : ""}`}>
          <p
            aria-hidden="true"
            className="mb-3 font-mono text-label uppercase text-muted"
          >
            {numero} / {rotulo}
          </p>
          <h2
            id={tituloId}
            className="text-h2 text-fg md:text-h2-md lg:text-h2-lg"
          >
            {titulo}
          </h2>
          {descricao ? (
            <p className="mt-4 max-w-[65ch] text-corpo text-muted md:text-corpo-lg">
              {descricao}
            </p>
          ) : null}
        </div>
        {ladoALado ? <div className="min-w-0 lg:col-span-7">{children}</div> : children}
      </Container>
    </section>
  );
}
