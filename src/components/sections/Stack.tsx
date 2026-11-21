import Reveal from "@/components/ui/Reveal";
import Section from "@/components/ui/Section";
import Tag from "@/components/ui/Tag";
import { stack } from "@/data/stack";

/** Stagger da entrada das colunas (design: 50 ms por item, máx. 3). */
const STAGGER = 0.05;

/**
 * Seção Stack (#stack): uma coluna por categoria de src/data/stack.ts.
 * Mobile: categorias empilhadas. lg+: grid de 3 colunas com hairline vertical.
 */
export default function Stack() {
  return (
    <Section id="stack" numero="04" rotulo="Stack" titulo="Stack e habilidades">
      <ul className="grid gap-10 lg:grid-cols-3 lg:gap-0 lg:divide-x lg:divide-border">
        {stack.map((grupo, indice) => {
          const tituloId = `stack-${indice}-titulo`;
          return (
            <Reveal
              key={grupo.categoria}
              as="li"
              delay={Math.min(indice, 2) * STAGGER}
              className="min-w-0 lg:px-6 lg:first:pl-0 lg:last:pr-0"
            >
              <h3 id={tituloId} className="text-h3 text-fg lg:text-h3-lg">
                {grupo.categoria}
              </h3>
              <ul aria-labelledby={tituloId} className="mt-4 flex flex-wrap gap-2">
                {grupo.itens.map((item) => (
                  <li key={item}>
                    <Tag>{item}</Tag>
                  </li>
                ))}
              </ul>
            </Reveal>
          );
        })}
      </ul>
    </Section>
  );
}
