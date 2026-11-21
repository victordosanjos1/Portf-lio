# Arquitetura — Portfólio pessoal (dev web)

## 1. Resumo da solução

Site 100% estático em Next.js (App Router, `output: "export"`) com TypeScript e Tailwind v4, hospedado no Cloudflare Pages. A home é uma página única com âncoras (Hero, Sobre, Projetos, Serviços, Stack, Contato). Cada projeto tem uma página de estudo de caso em `/projetos/[slug]`, gerada em build com `generateStaticParams`. Todo o conteúdo vive em `src/data/*.ts`. Não há backend, banco, rota de API nem analytics.

Só dois componentes têm estado no client: o menu mobile do header e o filtro de projetos. O resto é Server Component. Animações com `framer-motion` ficam em um wrapper pequeno (`Reveal`) para limitar o JS enviado ao navegador.

Fluxo de dados: `src/data/*.ts` (tipado) -> Server Components das seções -> (só o grid de projetos) Client Component de filtro. Adicionar projeto = acrescentar um objeto em `src/data/projetos.ts`; card, filtro, rota de detalhe e sitemap derivam desse array.

## 2. Stack escolhida

| Camada | Escolha | Justificativa |
|---|---|---|
| Framework | Next.js 16.4.6 (App Router) | Decisão do usuário. SSG, `next/image`, `next/font`, metadata, `sitemap.ts`/`robots.ts` nativos. |
| Linguagem | TypeScript (strict) | Decisão do usuário. `Projeto` tipado garante o passo "só editar um arquivo". |
| Estilo | Tailwind CSS v4, tokens em `@theme` no `globals.css` | Decisão do usuário. Token único de destaque em um só lugar (CA-10.2). |
| Lint | ESLint (config do `create-next-app`, flat config) | Decisão do usuário. |
| Animação | `framer-motion` | Permitida. Só fade/slide <= 400 ms. |
| Ícones | `lucide-react` | Permitida. Ícones SVG, importados por nome (tree-shaking). |
| Fonte | Geist via `next/font/google` (fallback Inter) | Self-host automático, sem requisição externa em runtime. |
| Imagem OG | `next/og` (`ImageResponse`, já embutido no Next), com plano B em PNG estático | Sem dependência extra. Compatibilidade com export a confirmar no T18 (ver seção 6). |
| Build | `output: "export"` (saída em `out/`) e `images.unoptimized: true` | Site sem servidor. Evita `@opennextjs/cloudflare` (dependência proibida). |
| Hospedagem | Cloudflare Pages (plano gratuito) | Decisão do usuário (Checkpoint 2). Gratuito e permite uso comercial. |
| Testes | Sem framework de testes | Nenhuma lib de teste está na lista permitida e E2E está fora do escopo. Verificação por `build`, `lint`, `tsc --noEmit` e roteiro manual do Tester. |

### Alternativas descartadas
- HTML/CSS/JS puro ou Astro — stack já decidida pelo usuário.
- Vercel Hobby — termos restringem uso comercial; usuário escolheu Cloudflare Pages.
- Next em modo servidor no Cloudflare (`@opennextjs/cloudflare`) — dependência fora da lista e desnecessária para site estático.
- Pages Router — legado; o App Router dá `generateMetadata`, `sitemap.ts` e `robots.ts` nativos.
- Vitest/Playwright — exigiriam dependência fora da lista (E2E fora do escopo).
- CSS Modules / styled-components — Tailwind já decidido.
- Formspree / API Route de e-mail — requisito proíbe formulário e backend (CA-08.3).
- Imagens OG estáticas PNG — não dá para gerar binário sem ferramenta extra; `ImageResponse` resolve e personaliza por projeto.

## 3. Estrutura de pastas

Estrutura final na raiz do repositório (a pasta `.omc/` não é tocada):

```
.
├── .env.example                 # NEXT_PUBLIC_SITE_URL (versionado)
├── .gitignore                   # do create-next-app + !.env.example + .omc/ + out/
├── README.md                    # em português (substitui o de 1 linha)
├── eslint.config.mjs
├── next.config.ts               # output: "export", images.unoptimized, trailingSlash
├── package.json                 # name: "portfolio"
├── postcss.config.mjs
├── tsconfig.json                # alias @/* -> src/*
├── docs/                        # documentos da equipe (não faz parte do app)
├── public/
│   ├── cv.pdf                   # placeholder do currículo
│   ├── foto.svg                 # foto de perfil placeholder
│   └── projetos/                # imagens dos projetos (SVG placeholders)
│       ├── projeto-1.svg
│       ├── projeto-2.svg
│       └── projeto-3.svg
└── src/
    ├── app/
    │   ├── layout.tsx           # html lang="pt-BR", fonte, metadataBase, Header/Footer, skip link
    │   ├── page.tsx             # home: monta as seções
    │   ├── globals.css          # @import "tailwindcss"; @theme (tokens); base
    │   ├── not-found.tsx        # 404 simples com link para a home
    │   ├── opengraph-image.tsx  # OG da home (ImageResponse)
    │   ├── sitemap.ts
    │   ├── robots.ts
    │   └── projetos/[slug]/
    │       ├── page.tsx         # estudo de caso, generateStaticParams, generateMetadata
    │       └── opengraph-image.tsx  # OG por projeto
    ├── components/
    │   ├── layout/              # Header.tsx, MobileMenu.tsx ("use client"), Footer.tsx, SkipLink.tsx
    │   ├── sections/            # Hero, Sobre, Projetos, Servicos, Stack, Contato (Server Components)
    │   ├── projetos/            # ProjetosGrid.tsx ("use client", filtro), ProjetoCard.tsx
    │   └── ui/                  # Button.tsx, Section.tsx, Container.tsx, Tag.tsx, Reveal.tsx ("use client")
    ├── data/
    │   ├── perfil.ts            # nome, cargo, proposta, bio, contatos, redes
    │   ├── projetos.ts          # interface Projeto + array
    │   ├── servicos.ts          # 3 serviços
    │   ├── stack.ts             # categorias e tecnologias
    │   └── navegacao.ts         # itens do menu (rótulo + id da âncora)
    └── lib/
        ├── site.ts              # SITE_URL, nome do site
        └── links.ts             # whatsappUrl(), mailtoUrl()
```

Marcador de pasta temporária durante o scaffold: ver T01.

## 4. Convenções de código

- **Idioma:** textos do site e comentários em pt-BR. Identificadores de domínio em pt-BR sem acento (`projetos`, `servicos`, `perfil`), identificadores técnicos em inglês (`Button`, `Container`).
- **Arquivos:** componentes em `PascalCase.tsx`; dados e utilitários em `camelCase`/minúsculas (`projetos.ts`, `links.ts`). Uma exportação principal por componente.
- **Server por padrão.** `"use client"` só em `MobileMenu`, `ProjetosGrid`, `Reveal` e o que depender de estado ou `framer-motion`.
- **Tailwind:** classes utilitárias no JSX, sem CSS custom fora do `globals.css`. Repetições viram componente (`Button`, `Section`, `Tag`), não `@apply`.
- **Tokens (`globals.css`, bloco `@theme`):**
  - `--color-bg: #0a0a0a`, `--color-surface: #141414`, `--color-border: #262626`, `--color-fg: #ededed`, `--color-muted: #a1a1a1`
  - `--color-accent: #7c5cff` (único lugar do destaque; derivados via `color-mix` se precisar de hover)
  - `--font-sans` ligada à variável do `next/font`
  - `--container-site: 72rem` (1152 px)
  - Tailwind gera `bg-bg`, `bg-surface`, `border-border`, `text-fg`, `text-muted`, `text-accent`, `bg-accent`. Nunca usar hex direto em componente. Nomes e valores finais seguem `docs/03-design.md`.
- **Layout:** `Container` aplica `max-w-site mx-auto px-4 sm:px-6`. `Section` aplica `py-16 md:py-24` e `scroll-mt-20` (ajustar à altura do header) e recebe `id` e título `h2`.
- **Âncoras e rolagem:** `html { scroll-behavior: smooth }` dentro de `@media (prefers-reduced-motion: no-preference)`.
- **Navegação:** links do header usam `next/link` com `href="/#sobre"` etc., que funcionam na home e em `/projetos/[slug]` (CA-09.4). IDs das seções vêm de `navegacao.ts`.
- **Imagens:** sempre `next/image`, com `alt` descritivo (ou `alt=""` se decorativa), `width`/`height` ou `fill` + `sizes`. Imagens acima da dobra com `priority`, o resto lazy (padrão). Arquivos locais em `public/`. Com `output: "export"` o Next exige `images.unoptimized: true`: `next/image` continua dando `alt`, lazy, dimensões e `priority`, mas não redimensiona. Por isso os arquivos em `public/` devem já ter tamanho adequado (fotos em WebP <= 200 KB, SVG nos placeholders).
- **Acessibilidade no código:** landmarks `header`, `nav aria-label`, `main id="conteudo"`, `section aria-labelledby`, `footer`. Skip link é o primeiro filho do `body`. Foco visível global via `:focus-visible` com `outline` na cor de destaque. Filtro: `button` com `aria-pressed`. Menu mobile: `aria-expanded`, `aria-controls`, fecha com Esc e ao clicar em link. Ícone-botão sempre com texto ou `aria-label`; ícone decorativo com `aria-hidden`.
- **Links externos:** `target="_blank"` sempre com `rel="noopener noreferrer"` (centralizado no `Button`/`ExternalLink`).
- **Animação:** `Reveal` usa `framer-motion` com `useReducedMotion()`; se reduzido, renderiza sem animação. Duração <= 0.4 s, deslocamento pequeno (<= 16 px), `viewport={{ once: true }}`.
- **Formatação/lint:** `npm run lint` limpo; `tsc --noEmit` limpo. Sem Prettier (dependência fora da lista); seguir o estilo do `create-next-app` (aspas duplas, ponto e vírgula, 2 espaços).
- **Placeholders:** todo texto pendente começa com `[PREENCHER]` (ex.: `"[PREENCHER] Nome completo"`), para `grep "\[PREENCHER\]"` listar tudo no final.

### Modelo de dados

```ts
// src/data/projetos.ts
export interface ImagemProjeto {
  src: string;        // ex.: "/projetos/projeto-1.svg"
  alt: string;        // descritivo
  width: number;
  height: number;
}

export interface Projeto {
  slug: string;            // único, kebab-case, vira /projetos/<slug>
  titulo: string;
  resumo: string;          // texto do card e meta description
  imagem: ImagemProjeto;   // capa do card e fallback do OG
  tags: string[];          // tecnologias; alimentam o filtro (case exato)
  problema: string;
  solucao: string;
  stack: string[];         // tecnologias detalhadas na página de detalhe
  papel: string;           // meu papel
  resultados: string[];    // lista de resultados
  demoUrl?: string;        // opcional; ausente = link não renderizado
  githubUrl?: string;      // opcional
  galeria?: ImagemProjeto[]; // opcional; vazia/ausente = seção omitida
}

export const projetos: Projeto[] = [ /* 3 exemplos "[PREENCHER]" */ ];
```

```ts
// src/data/perfil.ts
export const perfil = {
  nome: "[PREENCHER] Seu nome",
  cargo: "[PREENCHER] Desenvolvedor Web",
  proposta: "[PREENCHER] Frase de proposta de valor",
  bio: ["[PREENCHER] parágrafo 1", "[PREENCHER] parágrafo 2"],
  foto: { src: "/foto.svg", alt: "[PREENCHER] Descrição da foto" },
  cvUrl: "/cv.pdf",
  contatos: {
    email: "[PREENCHER]",     // só o endereço
    whatsapp: "[PREENCHER]",  // DDI+DDD+número; só dígitos são usados (ex.: 5511999999999)
    linkedin: "[PREENCHER]",  // URL completa
    github: "[PREENCHER]",    // URL completa
  },
};
```

`servicos.ts`: `{ id, titulo, descricao, icone }` (`icone` = nome de ícone do `lucide-react`, mapeado em um objeto no componente, evitando importar o pacote inteiro). `stack.ts`: `{ categoria, itens: string[] }[]`.

Validação de dados: o card e o filtro derivam as tags com `Array.from(new Set(projetos.flatMap(p => p.tags))).sort()`. Slugs duplicados quebram o build do Next (chaves repetidas em `generateStaticParams` não falham, mas geram página ambígua), então `lib` inclui uma checagem simples em `projetos.ts` que lança erro em tempo de build se houver `slug` repetido.

## 5. Formulários e integrações

Sem formulário e sem API (CA-08.3, CA-NF.20).

| Integração | Implementação |
|---|---|
| E-mail | `mailto:` via `mailtoUrl(perfil.contatos.email)` em `lib/links.ts`. |
| WhatsApp (Contato) | `whatsappUrl()` -> `https://wa.me/<dígitos>?text=<mensagem codificada>`. |
| "Solicitar orçamento" (Serviços) | `whatsappUrl("Olá! Vi seu portfólio e quero um orçamento de <titulo do serviço>.")`, abre em nova aba com `rel="noopener noreferrer"`. |
| LinkedIn / GitHub | URLs de `perfil.ts`, nova aba, `rel="noopener noreferrer"`. |
| CV | `<a href="/cv.pdf" download>` (arquivo em `public/cv.pdf`). |

`whatsappUrl(mensagem?)`: remove tudo que não for dígito do número. Se o resultado estiver vazio (placeholder `[PREENCHER]`), retorna `"/#contato"` para não gerar um `wa.me/` quebrado durante o desenvolvimento. Assim o botão sempre funciona. Mensagem passa por `encodeURIComponent`.

Links com valor `[PREENCHER]` em `linkedin`/`github`: um helper `ehPreenchido(valor)` (retorna `false` se começar com `[PREENCHER]`) faz o link cair em `#` ou ser omitido. Decisão: **omitir o botão** quando o valor não estiver preenchido, exceto e-mail e WhatsApp, que usam o fallback acima. Isso evita `href` inválido e deixa o site coerente quando o usuário só preencher parte dos contatos. Se o resultado deixar a seção Contato sem botões em dev, o Desenvolvedor mantém os botões visíveis com `href="#"` e `aria-disabled`; a regra final está em `docs/03-design.md` se o UI/UX definir.

## 6. SEO e performance

- **Static export:** `next.config.ts` com `output: "export"`, `images: { unoptimized: true }` e `trailingSlash: true` (gera `projetos/<slug>/index.html`). Não usar `headers()`, `redirects()`, middleware/proxy, route handlers dinâmicos, loader de imagem, ISR ou `cookies()`. Nada disso existe no projeto.
- **Compatibilidade com export:** `generateStaticParams` + `dynamicParams = false` e `not-found.tsx` (gera `404.html`, usado pelo Cloudflare Pages) são suportados. `sitemap.ts` e `robots.ts` precisam de `export const dynamic = "force-static"`. `next/font/google` baixa a fonte no build e funciona em export.
- **OG com export:** `opengraph-image.tsx` com `ImageResponse` não usa APIs dinâmicas e deve gerar o arquivo em `out/` no build; o de `[slug]` usa `generateStaticParams`. O arquivo sai sem extensão em `out/`, e o Cloudflare Pages pode servi-lo sem `Content-Type: image/png`, o que alguns crawlers rejeitam. Não consegui garantir isso sem rodar o build. O T18 confere os dois pontos (build passa e arquivo existe em `out/`). **Plano B, se falhar:** remover os `opengraph-image.tsx` e usar OG estático `public/og.png` (1200x630, cor sólida do tema), gerado uma vez por script Node com `zlib` (sem dependência) e referenciado em `metadata.openGraph.images`. Nesse caso todas as páginas compartilham a mesma imagem OG.
- **`<html lang="pt-BR">`** em `layout.tsx` (CA-NF.1).
- **URL base:** `src/lib/site.ts` exporta `SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://portfolio-placeholder.pages.dev"` (sem barra final). `metadataBase: new URL(SITE_URL)` no layout. `.env.example` documenta a variável; README explica como definir no Cloudflare Pages (CA-NF.5).
- **Metadata:** `metadata` estático na home (title com `template`, description, `openGraph`, `twitter`, `alternates.canonical`). `generateMetadata` na rota de projeto usa `titulo`, `resumo` e canonical `/projetos/<slug>`.
- **OG image:** `opengraph-image.tsx` na raiz e em `projetos/[slug]` (`ImageResponse`, 1200x630, fundo `#0a0a0a`, título em texto, cor de destaque). Evita SVG como OG, que crawlers não leem. Sem fonte customizada para não precisar de arquivo de fonte.
- **`sitemap.ts`** (com `dynamic = "force-static"`): home + `projetos.map(p => /projetos/<slug>)`, `lastModified` = data do build. **`robots.ts`** (idem): `allow: "/"`, `sitemap: SITE_URL + "/sitemap.xml"`.
- **Headings:** `h1` único na home (nome no Hero), `h2` por seção, `h3` em cards. Na página de projeto, `h1` = título do projeto.
- **404:** `notFound()` em slug inexistente; `generateStaticParams` + `export const dynamicParams = false`; `not-found.tsx` vira `404.html` no export. Em export, slug inexistente é 404 do host, não de runtime.
- **Performance:** páginas 100% estáticas; só 3 componentes client. `framer-motion` apenas em `Reveal` (usar `LazyMotion` + `domAnimation` + `m` se o bundle pesar). `lucide-react` com imports nomeados. Fonte via `next/font` com `display: swap`. Imagens SVG leves e `sizes` corretos. Sem scripts de terceiros.
- **Contraste (RESTRIÇÃO para o UI/UX resolver em `docs/03-design.md`):** `#7c5cff` sobre `#0a0a0a` dá cerca de 4,6:1 (passa por pouco), mas sobre `#141414` cai para cerca de 4,2:1 (falha para texto normal). Texto com cor de destaque só sobre `bg`, ou em tamanho grande/negrito. Texto branco sobre fundo `#7c5cff` dá cerca de 4,3:1 (falha); botão primário deve usar texto escuro `#0a0a0a` (cerca de 4,6:1) ou o design deve ajustar o tom. Decisão final no `docs/03-design.md`. O Tester confere com ferramenta.

## 7. Como rodar localmente

Requisitos: Node 20+ (ambiente atual: Node 26.13.1, npm 11.20.0).

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # build estático; gera a pasta out/
npx serve out      # opcional: testar o out/ (npx baixa sob demanda, não entra no package.json)
npm run lint
npx tsc --noEmit   # checagem de tipos
```

Variável opcional: copiar `.env.example` para `.env.local` e definir `NEXT_PUBLIC_SITE_URL=https://seu-dominio.com`.

## 8. Hospedagem e deploy

- **Cloudflare Pages**, plano gratuito (permite uso comercial). Site estático servido de `out/`.
- Fluxo: repositório no GitHub -> Cloudflare Dashboard -> Workers & Pages -> Create -> Pages -> Connect to Git -> escolher o repositório. Configuração:
  - Framework preset: None
  - Build command: `npm run build`
  - Build output directory: `out`
  - Variáveis de ambiente: `NEXT_PUBLIC_SITE_URL` (URL final, sem barra) e `NODE_VERSION` (ex.: `22`, LTS compatível com Next 16; o Node 26 local pode não existir no painel). O arquivo `.node-version` na raiz também é aceito.
- Cada push na branch de produção gera novo deploy (commit/push só com autorização do usuário). Alternativa sem Git: `npm run build` e upload manual da pasta `out/` (Direct Upload).
- **Custo:** R$ 0 na hospedagem (subdomínio `*.pages.dev`). Domínio próprio opcional (cerca de R$ 40/ano). Ao definir o domínio, atualizar `NEXT_PUBLIC_SITE_URL` e refazer o deploy, pois a URL é embutida no build.

## 9. Plano de tarefas

Convenção: cada tarefa termina com `npm run lint` e `npx tsc --noEmit` limpos a partir de T05 (depois do scaffold). Nada é commitado nem enviado sem pedir ao usuário.

| # | Tarefa | Depende de | Critérios/HU relacionados | Pronto quando |
|---|---|---|---|---|
| T01 | **Scaffold.** Na raiz, rodar `npx create-next-app@16.4.6 portfolio --ts --tailwind --eslint --app --src-dir --import-alias "@/*" --use-npm --disable-git --yes`. O nome `portfolio` (subpasta temporária dentro do repo) é válido para o npm; `_scaffold` seria recusado (nome não pode começar com `_`) e a pasta `Portf-lio` tem maiúscula. Se o `create-next-app` pedir algo não coberto pelas flags (ex.: React Compiler, `AGENTS.md`), recusar. | — | CA-NF.19, "Outros" | Existe `portfolio/package.json` com `"name": "portfolio"`, `next` 16.4.6, e `portfolio/src/app/page.tsx` |
| T02 | **Mover para a raiz.** Mover (incluindo ocultos como `.gitignore`) todo o conteúdo de `portfolio/` para a raiz, sem mexer em `.git/`, `.omc/` e `docs/`. `README.md` da raiz pode ser sobrescrito pelo gerado (será reescrito no T20). Se a raiz tiver `.gitignore`, mesclar. Remover a subpasta `portfolio/` agora vazia (remoção autorizada pelo usuário; confirmar que está vazia antes). Não commitar. | T01 | CA-NF.19 | `package.json` na raiz; `portfolio/` não existe; `.omc/` e `docs/` intactos; `node_modules` ausente (ainda não instalado) |
| T03 | `npm install` na raiz, depois `npm install framer-motion lucide-react` (únicas extras). Ajustar `.gitignore`: manter `.env*` ignorado com exceção `!.env.example`. Adicionar `.omc/` e `out/` ao `.gitignore` (`.omc/` autorizado pelo usuário). Criar `.env.example` com `NEXT_PUBLIC_SITE_URL=https://portfolio-placeholder.pages.dev`. Configurar `next.config.ts` com `output: "export"`, `images.unoptimized: true`, `trailingSlash: true`. Criar `.node-version` com `22`. | T02 | CA-NF.19, CA-NF.5 | `package.json` lista só as extras `framer-motion` e `lucide-react`; `npm run build` do template passa e gera `out/index.html` |
| T04 | Limpar o template: remover imagens e CSS de exemplo de `public/` e `page.tsx`/`globals.css`. Confirmar `strict: true` e alias `@/*` no `tsconfig.json`. Adicionar script `"typecheck": "tsc --noEmit"`. | T03 | CA-NF.16, CA-NF.17 | `npm run dev` abre página em branco; `npm run lint` e `npm run typecheck` limpos |
| T05 | **Tokens e base.** Depois de ler `docs/03-design.md`: bloco `@theme` no `globals.css` (cores, fonte, `--container-site`), estilos base (`body` com fundo/texto, `:focus-visible`, `scroll-behavior` condicionado a `prefers-reduced-motion`). Fonte Geist via `next/font` no `layout.tsx`, `lang="pt-BR"`. Conferir que `next/image` com `.svg` por string funciona com `images.unoptimized`. | T04, `docs/03-design.md` | HU-10, CA-10.1 a 10.3, CA-NF.1, CA-NF.12 | Página mostra fundo `#0a0a0a`, texto `#ededed`, fonte Geist; trocar `--color-accent` altera o destaque; `lang="pt-BR"` no HTML |
| T06 | **Dados.** Criar `src/data/perfil.ts`, `projetos.ts` (interface `Projeto` + 3 exemplos com "[PREENCHER]" + checagem de slug duplicado), `servicos.ts` (3), `stack.ts` (3+ categorias), `navegacao.ts`. Criar `src/lib/site.ts` e `src/lib/links.ts` (`whatsappUrl`, `mailtoUrl`, `ehPreenchido`). | T04 | HU-05, CA-05.1, CA-03.2, CA-07.1, CA-NF.5 | `npm run typecheck` limpo; os 3 projetos têm todos os campos obrigatórios; `whatsappUrl()` devolve `/#contato` com placeholder e `https://wa.me/...` com número real |
| T07 | **Ativos placeholder.** Criar `public/foto.svg`, `public/projetos/projeto-{1,2,3}.svg` (cor sólida/forma simples nos tons do tema) e `public/cv.pdf` (PDF mínimo válido de 1 página). | T04 | CA-02.3, CA-03.8 | `/cv.pdf` responde 200 e abre no navegador; os SVGs abrem em `/projetos/projeto-1.svg` |
| T08 | **UI base:** `Container`, `Section` (id, título `h2`, `scroll-mt`, `py-16 md:py-24`), `Button` (variantes primário/secundário/ghost, renderiza `a`/`Link`, `rel="noopener noreferrer"` automático em externo), `Tag`. | T05 | CA-10.4, CA-08.2, CA-NF.12 | Componentes compilam; `Button` externo gera `rel` correto (checar no HTML) |
| T09 | **`Reveal`** (client, `framer-motion`): fade/slide <= 0.4 s, `once`, desligado com `useReducedMotion()`. | T08 | CA-10.5, CA-10.6 | Animação visível no scroll; com reduced motion ativo no SO/DevTools, conteúdo aparece sem movimento |
| T10 | **Header + MobileMenu + SkipLink + Footer** no `layout.tsx`, com `<main id="conteudo">`. Links `/#ancora`, hambúrguer < 768 px com `aria-expanded`/`aria-controls`, fecha em link e Esc. Footer com redes e `new Date().getFullYear()`. | T06, T08 | HU-09, CA-09.1 a 09.7, CA-NF.11, CA-NF.14 | Em 375 px o menu abre/fecha por clique, teclado e Esc; skip link é o 1º foco; header não cobre âncoras |
| T11 | **Hero** (`h1` com nome, cargo, proposta, botões "Ver projetos" -> `#projetos`, "Fale comigo" -> `#contato`). Montar `page.tsx`. | T08, T09, T10 | HU-01, CA-01.1 a 01.4 | Home mostra o Hero com dados de `perfil.ts`; só 1 `h1`; botões rolam para as seções |
| T12 | **Sobre** (texto, foto com `next/image` e alt, botão "Baixar CV" -> `/cv.pdf`). | T07, T11 | HU-02, CA-02.1, CA-02.2 | Seção renderiza; botão baixa/abre `/cv.pdf` |
| T13 | **Projetos:** `ProjetoCard` e `ProjetosGrid` (client): botões de filtro "Todos" + tags geradas dos dados, `aria-pressed`, estado vazio, cards com link para `/projetos/<slug>`, links demo/GitHub só quando existirem. Seção `Projetos` na home. | T06, T07, T11 | HU-03, CA-03.1 a 03.8, CA-05.2 | 3 cards; filtro funciona sem reload; estado vazio mostrável (testar com tag temporária e reverter); links ausentes não aparecem |
| T14 | **Página `/projetos/[slug]`:** `generateStaticParams`, `dynamicParams = false`, `generateMetadata`, `notFound()`; mostra problema, solução, stack, papel, resultados, galeria (omitida se vazia), links demo/GitHub, link "Voltar para projetos" (`/#projetos`). | T13 | HU-04, CA-04.1 a 04.5, CA-NF.4 | `/projetos/<slug>` renderiza para os 3 slugs; `/projetos/xyz` dá 404; `npm run build` lista as 3 rotas como estáticas (SSG) |
| T15 | **Serviços:** 3 cards com ícone (`lucide-react`), título, descrição e botão "Solicitar orçamento" -> `whatsappUrl` com o nome do serviço. | T06, T08, T11 | HU-06, CA-06.1, CA-06.2 | Cada botão aponta para link com `text=` contendo o título do serviço (ou `/#contato` com número placeholder) |
| T16 | **Stack:** categorias com título e `ul/li`. | T06, T11 | HU-07, CA-07.1, CA-07.2 | Seção renderiza categorias vindas de `stack.ts` |
| T17 | **Contato:** botões e-mail, WhatsApp, LinkedIn, GitHub (rótulo visível ou `aria-label`), regra de placeholder da seção 5. | T06, T08, T11 | HU-08, CA-08.1 a 08.4 | Links corretos no HTML; externos com `rel="noopener noreferrer"`; sem `form` nem pasta `app/api` |
| T18 | **SEO:** metadata da home, `opengraph-image.tsx` (home e projeto), `sitemap.ts`, `robots.ts` (ambos com `export const dynamic = "force-static"`), `not-found.tsx`. Confirmar que o `opengraph-image.tsx` funciona com export; se não, aplicar o plano B da seção 6 (`public/og.png`). | T06, T14 | HU-04, CA-04.3, CA-04.6, CA-NF.2, CA-NF.3 | Build com export passa; `out/sitemap.xml` lista a home e os 3 projetos; `out/robots.txt` aponta para o sitemap; `out/404.html` existe; OG existe em `out/` (home e projetos) como PNG, ou o plano B está aplicado; `<head>` tem title, description e og:* |
| T19 | **Revisão de acessibilidade e responsividade no código:** conferir 375, 768 e 1440 px sem scroll horizontal (`scrollWidth <= innerWidth`) na home e em `/projetos/[slug]`; ordem de foco; contraste dos tokens usados conforme seção 6; headings. | T10 a T18 | CA-NF.9 a 14, HU-10 | Verificação em DevTools sem scroll horizontal nos 3 tamanhos; Tab percorre tudo em ordem lógica; ajustes aplicados |
| T20 | **README.md em português:** o que é, como rodar, estrutura, como adicionar projeto (passo a passo com imagens em `public/projetos/`), como trocar `--color-accent`, `NEXT_PUBLIC_SITE_URL`, como trocar o CV e a foto, como fazer deploy no Cloudflare Pages (build `npm run build`, saída `out`). | T18 | HU-05, CA-05.3, CA-NF.21 | README cobre os 4 tópicos obrigatórios e os comandos do capítulo 7 |
| T21 | **Verificação final:** `npm run build` (confirmar `out/` com `index.html`, `projetos/<slug>/index.html` x3, `404.html`), `npm run lint`, `npm run typecheck`; conferir `package.json` (só as 2 extras); `grep -rn "\[PREENCHER\]" src public docs --include=*.ts --include=*.tsx` e gerar a lista de pendências com caminhos (para o relatório final e para o README, se couber). | T01 a T20 | CA-NF.16, 17, 18, 19, 20 | Build e lint sem erros; as 3 rotas de projeto geradas; lista de "[PREENCHER]" entregue com caminho do arquivo |

Observação sobre a lista de arquivos criados e saídas resumidas de build/lint: o Desenvolvedor registra em `docs/progresso.md` ao final do T21.

## 10. Riscos e dúvidas

1. **Nome da subpasta de scaffold.** O pedido sugeria `_scaffold`, mas o `create-next-app` usa o nome da pasta como nome do pacote e o npm recusa nomes iniciados por `_`. Plano usa a subpasta temporária `portfolio` (nome final do pacote), removida no T02. Mesmo efeito, sem renomear depois.
2. **`README.md` e `.gitignore` sobrescritos.** O scaffold traz `README.md` e `.gitignore` próprios. O README de 1 linha é substituído (autorizado). Mesclar o `.gitignore` se já existir um.
3. **`.omc/` não ignorado.** `.omc/` aparece como não rastreado no git. Decidir se entra no `.gitignore` (o Desenvolvedor só adiciona com aprovação do usuário).
4. **Contraste do destaque `#7c5cff`.** Passa por pouco sobre `#0a0a0a` (cerca de 4,6:1) e falha sobre `#141414` (cerca de 4,2:1) e com texto branco sobre fundo roxo (cerca de 4,3:1). O UI/UX precisa tratar (destaque só como fundo com texto escuro, ou texto roxo só sobre `bg`, ou tom mais claro). Valores aproximados; o Tester confirma com medição.
5. **Hospedagem (resolvido).** Cloudflare Pages gratuito, uso comercial permitido, site estático via `output: "export"`.
6. **Número do WhatsApp e URLs reais.** Enquanto forem `[PREENCHER]`, o botão de WhatsApp cai em `/#contato` e LinkedIn/GitHub ficam omitidos (regra da seção 5). O usuário precisa preencher `src/data/perfil.ts` para o botão funcionar de verdade.
7. **OG com static export.** `opengraph-image.tsx` pode falhar no export ou sair sem `Content-Type` correto no Cloudflare Pages. Plano B na seção 6 (`public/og.png`, imagem única para o site).
8. **Versão do Next.** 16.4.6 foi verificada no npm pelo orquestrador; o T01 fixa essa versão. Se o `create-next-app` mudar flags, o Desenvolvedor adapta e registra em `docs/progresso.md`.
9. **Lighthouse ≥ 90/95** depende do conteúdo real e das imagens; é meta de verificação do Tester, não garantia da arquitetura.
10. **Sem testes automatizados.** Nenhuma lib de teste está na lista permitida. Se o usuário quiser Vitest/Playwright, precisa aprovar a dependência.
11. **Sem otimização de imagens.** Com `images.unoptimized`, o Lighthouse de performance depende de entregarmos imagens já leves. Placeholders SVG não sofrem. Fotos reais do usuário devem ser comprimidas (WebP).
12. **Node no painel.** O Node local (26) pode não existir no Cloudflare Pages; fixar `NODE_VERSION`/`.node-version` em LTS. Se o Next 16.4.6 exigir mínimo maior, ajustar.
13. **`trailingSlash: true`** faz as URLs terminarem em `/` (ex.: `/projetos/slug/`). Sitemap e canonical devem usar o mesmo formato.
14. **Contraste de `#7c5cff`** é restrição registrada para o UI/UX (seção 6).
