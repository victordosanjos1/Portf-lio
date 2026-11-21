import type { Metadata } from "next";
import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import { hrefDaSecao } from "@/data/navegacao";

// Vira out/404.html no static export (o Cloudflare Pages serve esse arquivo para rotas inexistentes).
// O Next já adiciona <meta name="robots" content="noindex"> nesta página.
export const metadata: Metadata = {
  title: "Página não encontrada",
  description: "A página que você procurou não existe ou mudou de endereço.",
};

export default function NotFound() {
  return (
    <section aria-labelledby="titulo-404" className="pt-28 pb-16 md:pt-32 md:pb-24">
      <Container>
        <p aria-hidden="true" className="mb-3 font-mono text-label uppercase text-muted">
          Erro 404
        </p>
        <h1 id="titulo-404" className="text-h1-pagina text-fg lg:text-h1-pagina-lg">
          Página não encontrada
        </h1>
        <p className="mt-4 max-w-[52ch] text-lead text-muted lg:text-lead-lg">
          O endereço pode estar errado ou a página mudou de lugar.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Button href="/">Voltar para o início</Button>
          <Button href={hrefDaSecao("projetos")} variante="secundario">
            Ver projetos
          </Button>
        </div>
      </Container>
    </section>
  );
}
