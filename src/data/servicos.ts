// Serviços oferecidos a clientes freelancer (seção Serviços).
// `icone` é o nome de um ícone do lucide-react mapeado no componente da seção.

export type IconeServico = "LayoutTemplate" | "Building2" | "AppWindow";

export interface Servico {
  id: string;
  /** Também entra na mensagem do WhatsApp do botão "Solicitar orçamento". */
  titulo: string;
  descricao: string;
  icone: IconeServico;
}

export const servicos: Servico[] = [
  {
    id: "landing-page",
    titulo: "Landing page",
    descricao:
      "Página única e rápida para divulgar um produto, serviço ou campanha, com botão direto para o seu WhatsApp.",
    icone: "LayoutTemplate",
  },
  {
    id: "site-institucional",
    titulo: "Site institucional",
    descricao:
      "Site da sua empresa com serviços, contato e localização, preparado para aparecer no Google e funcionar bem no celular.",
    icone: "Building2",
  },
  {
    id: "sistema-web",
    titulo: "Sistema web",
    descricao:
      "Sistema sob medida para tirar do caderno e da planilha os seus cadastros, orçamentos, agendamentos e cobranças.",
    icone: "AppWindow",
  },
];
