import Link from "next/link";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import MobileMenu from "@/components/layout/MobileMenu";
import { navegacao, hrefDaSecao } from "@/data/navegacao";
import { perfil } from "@/data/perfil";

/**
 * Header fixo (64 px). Desktop (>= 768 px): links de âncora + "Fale comigo".
 * Mobile: botão de menu (MobileMenu, client).
 * Em md (768–1023 px) os links usam px-2 para sobrar largura para o nome
 * (BUG-03); em lg voltam a px-3. O `truncate` do nome fica como proteção.
 * Os links usam "/#id" para funcionar também em /projetos/[slug].
 */
export default function Header() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 h-16 border-b border-border bg-bg/80 backdrop-blur-md">
      <Container className="flex h-full items-center justify-between gap-4">
        <Link
          href={hrefDaSecao("inicio")}
          className="inline-flex min-h-11 min-w-0 items-center gap-1.5 rounded-sm font-semibold text-fg"
        >
          <span className="truncate">{perfil.nome}</span>
          <span
            aria-hidden="true"
            className="size-1.5 shrink-0 rounded-full bg-accent"
          />
        </Link>

        <nav aria-label="Principal" className="hidden md:block">
          <ul className="flex items-center gap-1 lg:gap-2">
            {navegacao.map((item) => (
              <li key={item.id}>
                <Link
                  href={hrefDaSecao(item.id)}
                  className="inline-flex min-h-11 items-center rounded-sm px-2 text-nav font-medium text-muted transition-colors duration-150 hover:text-fg lg:px-3"
                >
                  {item.rotulo}
                </Link>
              </li>
            ))}
            <li className="ml-1 lg:ml-2">
              <Button href={hrefDaSecao("contato")} tamanho="sm">
                Fale comigo
              </Button>
            </li>
          </ul>
        </nav>

        <MobileMenu itens={navegacao} />
      </Container>
    </header>
  );
}
