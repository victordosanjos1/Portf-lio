// Tecnologias agrupadas por categoria (seção Stack).

export interface CategoriaStack {
  categoria: string;
  itens: string[];
}

export const stack: CategoriaStack[] = [
  {
    categoria: "Front-end",
    itens: ["HTML", "CSS", "JavaScript", "TypeScript", "React", "Next.js", "Vite", "Tailwind CSS"],
  },
  {
    categoria: "Back-end e dados",
    itens: ["Supabase", "PostgreSQL", "Node.js", "PHP", "MySQL", "Python"],
  },
  {
    categoria: "Ferramentas",
    itens: ["Git", "GitHub", "GitHub Actions", "Vitest", "Playwright", "Vercel", "Cloudflare Pages"],
  },
];
