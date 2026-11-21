// Dados pessoais do site. Troque todo valor que começa com "[PREENCHER]".

export interface Contatos {
  /** Só o endereço, ex.: "voce@email.com". */
  email: string;
  /** DDI + DDD + número. Só os dígitos são usados, ex.: "5511999999999". */
  whatsapp: string;
  /** URL completa do perfil. Valor "[PREENCHER]" omite o link. */
  linkedin: string;
  /** URL completa do perfil. Valor "[PREENCHER]" omite o link. */
  github: string;
}

export interface Perfil {
  nome: string;
  cargo: string;
  /** Frase de proposta de valor exibida no Hero. */
  proposta: string;
  /** Texto do selo de status no Hero. */
  disponibilidade: string;
  /** Nota curta sob os botões do Hero. */
  notaResposta: string;
  /** Parágrafos da seção Sobre. */
  bio: string[];
  /** Frase curta da seção Contato. */
  chamadaContato: string;
  foto: { src: string; alt: string; width: number; height: number };
  /** Arquivo em public/. */
  cvUrl: string;
  contatos: Contatos;
}

export const perfil: Perfil = {
  nome: "Victor dos Anjos",
  cargo: "Desenvolvedor Full Stack",
  proposta:
    "Crio sistemas e sites que resolvem problemas reais de empresas: do banco de dados até a tela que a equipe usa no dia a dia.",
  disponibilidade: "Disponível para freelance e estágio",
  notaResposta: "Joinville, SC · atendo remotamente",
  bio: [
    "Sou o Victor, de Joinville (SC). Estou no 3º ano do ensino médio integrado ao curso técnico em Desenvolvimento de Sistemas. Tecnologia é um sonho de infância e é a carreira que estou construindo.",
    "Gosto de pegar um processo que hoje vive em caderno, planilha ou WhatsApp e transformar num sistema simples de usar, com regras que evitam erro. Trabalho com Next.js, React, TypeScript e Supabase, e cuido do projeto inteiro: requisitos, banco de dados, interface, testes e publicação.",
  ],
  chamadaContato:
    "Conte o que você precisa. Respondo pelo WhatsApp ou por e-mail.",
  foto: {
    src: "/foto.jpg",
    alt: "Foto de Victor dos Anjos, de óculos e camisa polo cinza, em fundo claro",
    width: 400,
    height: 400,
  },
  cvUrl: "/cv.pdf",
  contatos: {
    email: "dosanjosvictor23@gmail.com",
    whatsapp: "5547999635023",
    linkedin: "https://www.linkedin.com/in/i-victordosanjos/",
    github: "https://github.com/victordosanjos1",
  },
};
