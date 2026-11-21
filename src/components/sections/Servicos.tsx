import { AppWindow, Building2, LayoutTemplate, type LucideIcon } from "lucide-react";
import Button from "@/components/ui/Button";
import Reveal from "@/components/ui/Reveal";
import Section from "@/components/ui/Section";
import { servicos, type IconeServico } from "@/data/servicos";
import { mensagemOrcamento, whatsappUrl } from "@/lib/links";

/** Nome do ícone em src/data/servicos.ts -> componente do lucide-react (imports nomeados). */
const ICONES: Record<IconeServico, LucideIcon> = {
  LayoutTemplate,
  Building2,
  AppWindow,
};

/** Stagger da entrada dos cards (design: 50 ms por item, máx. 3). */
const STAGGER = 0.05;

/**
 * Seção Serviços (#servicos): 3 cards. "Solicitar orçamento" abre o WhatsApp
 * com mensagem citando o serviço; enquanto o número for placeholder, o link
 * cai em /#contato (ver whatsappUrl).
 */
export default function Servicos() {
  return (
    <Section id="servicos" numero="03" rotulo="Serviços" titulo="Serviços">
      <ul className="grid gap-6 lg:grid-cols-3">
        {servicos.map((servico, indice) => {
          const Icone = ICONES[servico.icone];
          return (
            <Reveal key={servico.id} as="li" delay={indice * STAGGER} className="min-w-0">
              <article className="flex h-full flex-col rounded-lg border border-border bg-surface p-5 transition-[transform,border-color] duration-200 ease-out hover:border-border-strong motion-safe:hover:-translate-y-0.5 md:p-6">
                <div className="flex items-start justify-between gap-4">
                  <Icone aria-hidden="true" size={24} strokeWidth={1.75} className="text-muted" />
                  <span aria-hidden="true" className="font-mono text-label text-muted">
                    {String(indice + 1).padStart(2, "0")}
                  </span>
                </div>
                <h3 className="mt-6 text-h3 text-fg lg:text-h3-lg">{servico.titulo}</h3>
                <p className="mt-2 mb-6 text-corpo text-muted">{servico.descricao}</p>

                <div className="mt-auto border-t border-border pt-5">
                  <Button
                    href={whatsappUrl(mensagemOrcamento(servico.titulo))}
                    variante="secundario"
                    className="w-full"
                  >
                    Solicitar orçamento
                    <span className="sr-only"> de {servico.titulo}</span>
                  </Button>
                </div>
              </article>
            </Reveal>
          );
        })}
      </ul>
    </Section>
  );
}
