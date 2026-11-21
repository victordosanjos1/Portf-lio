import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowUpRight, type LucideIcon } from "lucide-react";

export type VarianteBotao = "primario" | "secundario" | "ghost";
export type TamanhoBotao = "md" | "sm";

const BASE =
  "group inline-flex items-center justify-center gap-2 font-semibold transition-[background-color,border-color,color,transform] duration-150 ease-out";

const VARIANTES: Record<VarianteBotao, string> = {
  primario:
    "rounded-md bg-accent text-on-accent hover:bg-accent-hover motion-safe:active:scale-[0.98]",
  secundario:
    "rounded-md border border-border-strong text-fg hover:border-muted hover:bg-surface motion-safe:active:scale-[0.98]",
  ghost:
    "rounded-sm text-accent underline-offset-4 hover:text-accent-hover hover:underline",
};

const TAMANHOS: Record<VarianteBotao, Record<TamanhoBotao, string>> = {
  primario: { md: "h-12 px-5 text-corpo", sm: "h-10 px-4 text-nav" },
  secundario: { md: "h-12 px-5 text-corpo", sm: "h-10 px-4 text-nav" },
  ghost: { md: "min-h-11 text-corpo", sm: "min-h-11 text-nav" },
};

/** Classes de um botão; útil para elementos que não usam <Button> (ex.: skip link). */
export function classesBotao(
  variante: VarianteBotao = "primario",
  tamanho: TamanhoBotao = "md",
): string {
  return `${BASE} ${VARIANTES[variante]} ${TAMANHOS[variante][tamanho]}`;
}

/** Link externo = começa com http(s). Abre em nova aba com rel seguro. */
export function ehLinkExterno(href: string): boolean {
  return /^https?:\/\//i.test(href);
}

interface BaseProps {
  children: ReactNode;
  variante?: VarianteBotao;
  tamanho?: TamanhoBotao;
  /** Ícone Lucide exibido à direita do texto (decorativo). */
  icone?: LucideIcon;
  className?: string;
}

interface ButtonLinkProps extends BaseProps {
  href: string;
  /** Força abrir em nova aba (por padrão só links http(s) abrem). */
  externo?: boolean;
  /** Gera <a download> (ex.: CV). */
  download?: boolean;
  onClick?: never;
  type?: never;
}

interface ButtonAcaoProps extends BaseProps {
  href?: undefined;
  onClick: () => void;
  type?: "button" | "submit";
  externo?: never;
  download?: never;
}

export type ButtonProps = ButtonLinkProps | ButtonAcaoProps;

/**
 * Botão do site. Com `href` vira link (next/link para rotas internas,
 * <a> para âncoras, mailto:, download e externos). Sem `href`, vira <button>.
 * Links externos recebem target="_blank", rel="noopener noreferrer",
 * ícone ArrowUpRight e o aviso "(abre em nova aba)" para leitores de tela.
 */
export default function Button(props: ButtonProps) {
  const {
    children,
    variante = "primario",
    tamanho = "md",
    icone,
    className = "",
  } = props;
  const classes = `${classesBotao(variante, tamanho)} ${className}`;

  if (props.href === undefined) {
    const Icone = icone;
    return (
      <button type={props.type ?? "button"} onClick={props.onClick} className={classes}>
        {children}
        {Icone ? <IconeBotao icone={Icone} /> : null}
      </button>
    );
  }

  const { href, download = false } = props;
  const externo = props.externo ?? ehLinkExterno(href);
  const Icone = icone ?? (externo ? ArrowUpRight : undefined);

  const conteudo = (
    <>
      {children}
      {externo ? <span className="sr-only"> (abre em nova aba)</span> : null}
      {Icone ? <IconeBotao icone={Icone} /> : null}
    </>
  );

  if (externo) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={classes}>
        {conteudo}
      </a>
    );
  }

  // Rotas internas ("/..." sem download) usam next/link; o resto usa <a>.
  if (href.startsWith("/") && !download) {
    return (
      <Link href={href} className={classes}>
        {conteudo}
      </Link>
    );
  }

  return (
    <a href={href} download={download || undefined} className={classes}>
      {conteudo}
    </a>
  );
}

function IconeBotao({ icone: Icone }: { icone: LucideIcon }) {
  return (
    <Icone
      aria-hidden="true"
      size={18}
      strokeWidth={1.75}
      className="shrink-0 motion-safe:transition-transform motion-safe:duration-150 motion-safe:group-hover:translate-x-0.5"
    />
  );
}
