import { ArrowUp } from "lucide-react";
import Container from "@/components/ui/Container";
import { perfil } from "@/data/perfil";
import RedesSociais from "@/components/ui/RedesSociais";

export default function Footer() {
  const ano = new Date().getFullYear();

  return (
    <footer className="border-t border-border py-10">
      <Container className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-col gap-1">
          <p className="font-semibold text-fg md:sr-only">{perfil.nome}</p>
          <p className="text-pequeno text-muted">
            © {ano} {perfil.nome}
          </p>
        </div>

        <div className="flex flex-col gap-4 md:flex-row md:items-center md:gap-6">
          <RedesSociais />

          <a
            href="#conteudo"
            className="inline-flex min-h-11 items-center gap-2 self-start rounded-sm text-nav font-medium text-muted transition-colors duration-150 hover:text-fg md:self-auto"
          >
            Voltar ao topo
            <ArrowUp aria-hidden="true" size={18} strokeWidth={1.75} />
          </a>
        </div>
      </Container>
    </footer>
  );
}
