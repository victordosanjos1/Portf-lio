// Projetos do portfólio. Para adicionar um projeto, acrescente um objeto no
// array `projetos` (e a imagem em public/projetos/). Card, filtro, página de
// detalhe e sitemap são gerados a partir deste array.

import { erroDeUrl } from "@/lib/links";

export interface ImagemProjeto {
  /** Caminho a partir de public/, ex.: "/projetos/projeto-1.svg". */
  src: string;
  /** Descrição da imagem para leitores de tela. */
  alt: string;
  width: number;
  height: number;
}

export interface Projeto {
  /** Único, kebab-case. Vira a URL /projetos/<slug>/. */
  slug: string;
  titulo: string;
  /** Texto do card e meta description da página do projeto. */
  resumo: string;
  /** Capa do card (proporção 16:10). */
  imagem: ImagemProjeto;
  /** Tecnologias exibidas no card; alimentam o filtro (grafia exata). */
  tags: string[];
  problema: string;
  solucao: string;
  /** Tecnologias detalhadas na página do projeto. */
  stack: string[];
  /** Meu papel no projeto. */
  papel: string;
  resultados: string[];
  /** Opcional: URL completa (http/https). Sem valor ou "[PREENCHER]", o link de demo não aparece. */
  demoUrl?: string;
  /** Opcional: URL completa (http/https). Sem valor ou "[PREENCHER]", o link do GitHub não aparece. */
  githubUrl?: string;
  /** Opcional: vazia ou ausente, a seção Galeria é omitida. */
  galeria?: ImagemProjeto[];
}

export const projetos: Projeto[] = [
  {
    slug: "orcamentos-top-usinagem",
    titulo: "Sistema de clientes e orçamentos · TOP Usinagem",
    resumo:
      "Sistema interno para uma empresa de eletroerosão a fio: cadastro de clientes, orçamentos com numeração automática, PDF oficial e envio por e-mail.",
    imagem: {
      src: "/projetos/top-usinagem-painel.jpg",
      alt: "Painel do sistema da TOP Usinagem com indicadores do período e orçamentos recentes",
      width: 1523,
      height: 784,
    },
    tags: ["Next.js", "TypeScript", "Supabase", "PostgreSQL"],
    problema:
      "Na TOP Usinagem, empresa de eletroerosão a fio de Joinville (SC), o orçamento é a porta de entrada de todo pedido, e era aí que as coisas se perdiam. Havia números de orçamento duplicados ou pulados, contas feitas na mão com frete e desconto, documentos que mudavam depois de enviados e um histórico espalhado em e-mails e arquivos, sem nenhuma visão geral do mês.",
    solucao:
      "Criei um sistema web interno, acessado só por convite. A equipe cadastra clientes com validação de CNPJ, monta orçamentos com várias peças e gera o PDF oficial, que é enviado por e-mail. A numeração é reservada no banco com trava, então não duplica nem com duas pessoas finalizando ao mesmo tempo. A tela, o servidor e o PDF usam a mesma função de cálculo. Ao finalizar, o documento fica congelado, e qualquer mudança vira uma revisão. Um painel mostra os indicadores por período.",
    stack: [
      "Next.js 16 (App Router, Server Actions)",
      "React 19",
      "TypeScript",
      "Supabase (PostgreSQL, Auth, Storage)",
      "Row Level Security",
      "jsPDF",
      "Nodemailer (SMTP)",
      "Vercel",
    ],
    papel:
      "Projeto feito sozinho, de ponta a ponta: levantamento com a empresa, modelagem do banco, regras de segurança, interface, geração de PDF, envio de e-mail e publicação.",
    resultados: [
      "Numeração por cliente e por ano (01/2026, 02/2026…) sem duplicação, garantida por uma função SQL com trava.",
      "Valores idênticos na prévia, no banco e no PDF: um único módulo de cálculo para a tela e o servidor.",
      "Documentos finalizados nunca mudam: alterações viram revisões, com histórico e auditoria das ações.",
      "Acesso só por convite, Row Level Security em todas as tabelas e PDFs em bucket privado.",
    ],
    githubUrl: "https://github.com/victordosanjos1/Projeto-para-TopUsinagem",
    galeria: [
      {
        src: "/projetos/top-usinagem-orcamentos.jpg",
        alt: "Lista de orçamentos com filtros por número, cliente, situação e período",
        width: 1523,
        height: 784,
      },
      {
        src: "/projetos/top-usinagem-orcamento-pdf.jpg",
        alt: "Detalhe de um orçamento com o PDF oficial embutido na tela",
        width: 1523,
        height: 784,
      },
      {
        src: "/projetos/top-usinagem-clientes.jpg",
        alt: "Tela de clientes com busca instantânea e cadastro com validação de CNPJ",
        width: 1523,
        height: 784,
      },
    ],
  },
  {
    slug: "agenda-amaba",
    titulo: "Agenda de quadras e eventos · Amaba",
    resumo:
      "Sistema de agendamento para um espaço esportivo: duas quadras, espaço de eventos, times fixos com mensalidades e mensagens prontas de WhatsApp.",
    imagem: {
      src: "/projetos/amaba-agenda-dia.jpg",
      alt: "Agenda do dia no sistema Amaba, com horários da Quadra Society, do Salão e do Espaço de Eventos e os times fixos marcados",
      width: 1523,
      height: 784,
    },
    tags: ["React", "TypeScript", "Vite", "Supabase"],
    problema:
      "O dono do espaço esportivo Amaba controlava tudo num caderno: as reservas de duas quadras (Society e Salão), o aluguel do espaço de eventos e as mensalidades de dezenas de times fixos. Os pedidos chegavam por WhatsApp e telefone, havia risco de reservar o mesmo horário duas vezes e era difícil saber quem estava em dia com a mensalidade.",
    solucao:
      "Desenvolvi uma agenda web para o dono usar no celular e no computador. O banco de dados impede reservas em conflito no mesmo espaço e horário. Os times fixos aparecem na agenda toda semana sem precisar recadastrar. A página de mensalidades mostra quem pagou, quem pagou parcial e quem está devendo. O valor de cada reserva é calculado pela tabela de preços, e o sistema gera mensagens prontas de confirmação, lembrete e cobrança no WhatsApp.",
    stack: [
      "React 19",
      "TypeScript",
      "Vite",
      "Supabase (PostgreSQL, Auth)",
      "Row Level Security",
      "Vitest e Playwright",
      "GitHub Actions",
      "Cloudflare Pages",
    ],
    papel:
      "Projeto feito sozinho para um cliente real: levantamento de requisitos com o dono, modelagem do banco e das regras de conflito, interface pensada para uso com uma mão no celular, testes automatizados e publicação.",
    resultados: [
      "Em produção desde novembro de 2026, com os dados reais do espaço, no lugar do caderno.",
      "Os 46 times fixos que estavam no caderno foram importados e aparecem toda semana na agenda.",
      "Choque de horário bloqueado pelas regras do próprio banco, não só pela tela.",
      "Confirmação, lembrete e cobrança no WhatsApp em até 2 toques, com o valor já na mensagem.",
    ],
    // Nomes dos times nos prints foram trocados por nomes fictícios (privacidade dos clientes).
    galeria: [
      {
        src: "/projetos/amaba-agenda-semana.jpg",
        alt: "Visão semanal da agenda do sistema Amaba, com as duas quadras lado a lado e os times fixos de cada dia",
        width: 1523,
        height: 784,
      },
    ],
  },
];

// Checagem em tempo de build: slugs repetidos geram páginas ambíguas.
const slugsRepetidos = projetos
  .map((projeto) => projeto.slug)
  .filter((slug, indice, slugs) => slugs.indexOf(slug) !== indice);

if (slugsRepetidos.length > 0) {
  throw new Error(
    `Slug de projeto repetido em src/data/projetos.ts: ${slugsRepetidos.join(", ")}`,
  );
}

// Checagem em tempo de build: demoUrl/githubUrl preenchidos precisam ser
// URLs completas (http:// ou https://). Vazio ou "[PREENCHER]" é aceito: o
// link só não aparece.
const urlsInvalidas = projetos.flatMap((projeto) =>
  [
    erroDeUrl(`${projeto.slug}.demoUrl`, projeto.demoUrl),
    erroDeUrl(`${projeto.slug}.githubUrl`, projeto.githubUrl),
  ].filter((erro): erro is string => erro !== null),
);

if (urlsInvalidas.length > 0) {
  throw new Error(`URL inválida em src/data/projetos.ts:\n- ${urlsInvalidas.join("\n- ")}`);
}

/** Tecnologias únicas de todos os projetos, em ordem alfabética (opções do filtro). */
export const tagsDosProjetos: string[] = Array.from(
  new Set(projetos.flatMap((projeto) => projeto.tags)),
).sort((a, b) => a.localeCompare(b, "pt-BR"));

export function buscarProjeto(slug: string): Projeto | undefined {
  return projetos.find((projeto) => projeto.slug === slug);
}

/** Caminho da página de estudo de caso (com barra final, como o export gera). */
export function hrefDoProjeto(slug: string): string {
  return `/projetos/${slug}/`;
}
