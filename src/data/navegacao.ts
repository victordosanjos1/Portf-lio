// Itens do menu do header. `id` é o id da seção na home.
// Os links usam "/#id" para funcionar na home e em /projetos/[slug].

export interface ItemNavegacao {
  rotulo: string;
  id: string;
}

export const navegacao: ItemNavegacao[] = [
  { rotulo: "Sobre", id: "sobre" },
  { rotulo: "Projetos", id: "projetos" },
  { rotulo: "Serviços", id: "servicos" },
  { rotulo: "Stack", id: "stack" },
  { rotulo: "Contato", id: "contato" },
];

/** Href da âncora, válido em qualquer página: "/#sobre". */
export function hrefDaSecao(id: string): string {
  return `/#${id}`;
}
