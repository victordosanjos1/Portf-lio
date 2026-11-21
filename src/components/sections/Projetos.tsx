import ProjetosGrid from "@/components/projetos/ProjetosGrid";
import Section from "@/components/ui/Section";
import { projetos, tagsDosProjetos } from "@/data/projetos";

/** Seção Projetos (#projetos): filtro por tecnologia + grid de cards (dados de src/data/projetos.ts). */
export default function Projetos() {
  return (
    <Section
      id="projetos"
      numero="02"
      rotulo="Projetos"
      titulo="Projetos"
      descricao="Trabalhos selecionados. Filtre por tecnologia e abra um card para ver o estudo de caso."
    >
      <ProjetosGrid projetos={projetos} tags={tagsDosProjetos} />
    </Section>
  );
}
