# Progresso — Portfólio pessoal (dev web)

**Ideia inicial:** Portfólio pessoal em Next.js (App Router) + TypeScript + Tailwind CSS, pronto para deploy na Vercel. Objetivos: conseguir clientes freelancer, mostrar a recrutadores e registrar projetos. Área: desenvolvimento web. Idioma do site: pt-BR. Estilo: dark minimalista.

### Especificação fornecida pelo usuário (resumo fiel)

**Stack e dependências**
- Next.js estável mais recente (verificado: 16.4.6), React, TypeScript, Tailwind, ESLint, pasta `src/`, alias `@/*`.
- create-next-app com nome de pacote `portfolio` (a pasta `Portf-lio` tem maiúscula e o npm recusa).
- Dependências extras permitidas: `framer-motion` e `lucide-react`. Qualquer outra precisa de aprovação do usuário.
- Sem backend e sem banco. Conteúdo em arquivos TypeScript em `src/data/`.

**Seções obrigatórias**
1. Hero: nome, cargo, frase de proposta de valor, botões "Ver projetos" e "Fale comigo".
2. Sobre: texto curto, foto (placeholder), botão "Baixar CV" apontando para `/cv.pdf` (placeholder em `public/`).
3. Projetos: grid de cards (imagem, título, resumo, tags de tecnologia, links demo e GitHub), filtro por tecnologia no client. Página de detalhe `/projetos/[slug]` (problema, solução, stack, meu papel, resultados, galeria), gerada estaticamente com `generateStaticParams`.
4. Serviços: 3 cards para clientes freelancer (ex.: landing page, site institucional, sistema web), descrição curta, botão "Solicitar orçamento".
5. Stack/Habilidades: tecnologias agrupadas por categoria.
6. Contato: botões e-mail (mailto), WhatsApp (wa.me), LinkedIn, GitHub. Sem formulário com backend.
7. Header fixo com navegação por âncoras e menu mobile. Footer com redes sociais e ano.

**Dados**
- `src/data/projetos.ts`: array tipado (interface `Projeto`), 3 projetos de exemplo marcados com "[PREENCHER]".
- `src/data/perfil.ts`: nome, cargo, bio, links e contatos, todos com "[PREENCHER]".
- Adicionar projeto = acrescentar um objeto no array, sem mexer em componentes.
- Imagens em `public/projetos/`, com placeholders locais (SVG ou cor sólida), sem URLs externas.

**Design**
- Fundo `#0a0a0a`, superfícies `#141414`, bordas `#262626`, texto `#ededed`, texto secundário `#a1a1a1`.
- Uma cor de destaque como token fácil de trocar (sugestão `#7c5cff`).
- Fonte Geist ou Inter via `next/font`. Títulos grandes e pesados. Corpo ≥ 16px.
- Largura máxima 1152px, seções com `py-24` no desktop, cards com borda sutil e hover leve.
- Animações discretas (fade/slide ao entrar, ≤ 400ms), respeitando `prefers-reduced-motion`.
- Mobile-first; testar em 375px, 768px e 1440px, sem scroll horizontal.

**Qualidade**
- SEO: metadata por página, Open Graph, `sitemap.ts`, `robots.ts`, `lang="pt-BR"`.
- `next/image` em todas as imagens, com alt descritivo.
- Acessibilidade: HTML semântico, foco visível, contraste AA, navegação completa por teclado.
- README.md em português: como rodar, como adicionar projeto, como trocar a cor de destaque, como fazer deploy na Vercel.

**Limites**
- Fora do escopo: blog, i18n, tema claro, autenticação, CMS, analytics, testes E2E.
- Perguntar antes de: instalar dependência fora da lista, apagar arquivos, commit ou push.
- Ambiente Windows.

**Pronto quando**
- `npm run build` e `npm run lint` sem erros.
- `npm run dev` sobe; todas as seções e páginas `/projetos/[slug]` renderizam.
- Entrega final: lista de arquivos criados, saída resumida de build e lint, lista de todos os "[PREENCHER]" com caminho.

**Etapa atual:** Concluído
**Última atualização:** 2026-11-20

## Etapas
- [x] 1. Descoberta e requisitos (PO) — docs/01-requisitos.md
- [x] 2. Arquitetura (Arquiteto) — docs/02-arquitetura.md
- [x] 3. Design (UI/UX) — docs/03-design.md
- [x] 4. Desenvolvimento + code review (Desenvolvedor, Arquiteto) — docs/05-code-review.md
- [x] 5. Testes (Tester) — docs/04-relatorio-testes.md

## Descoberta
<!-- perguntas do PO e respostas do usuário, por rodada -->
- Rodada 1: PO escreveu os requisitos direto, sem perguntas (especificação já completa). Premissas registradas em docs/01-requisitos.md.

## Decisões
- 2026-11-20 — Stack: Next.js (App Router) + TypeScript + Tailwind, deploy na Vercel — usuário
- 2026-11-20 — Estilo visual: dark minimalista, área dev web — usuário
- 2026-11-20 — Dependências extras permitidas só `framer-motion` e `lucide-react` — usuário
- 2026-11-20 — Estado do repo: só `.git`, `.omc/` (não mexer) e `README.md` de uma linha (`# Portf-lio`), que pode ser substituído pelo README novo — orquestrador
- 2026-11-20 — Ambiente: Node 26.13.1, npm 11.20.0 — orquestrador
- 2026-11-20 — Hospedagem: Cloudflare Pages (gratuito, permite uso comercial), em vez de Vercel Hobby — usuário
- 2026-11-20 — Autorizada a remoção da subpasta temporária de scaffold `portfolio/` (já vazia) na T02; é a única remoção autorizada — usuário
- 2026-11-20 — Adicionar `.omc/` ao `.gitignore` — usuário
- 2026-11-20 — Checkpoint 4: usuário gostou do site, mas pediu fundo melhor; escolheu "brilho violeta suave" (luz difusa derivada do acento no topo do Hero e perto do Contato) — usuário
- 2026-11-20 — Brilho aplicado no site todo (camada fixa body::before). Usuário não percebeu diferença com 16%/10%; orquestrador subiu para --color-glow 22% e --color-glow-soft 18%, elipses maiores (limite: muted ≥ 4,5:1 no pior caso) — usuário/orquestrador
- 2026-11-20 — Checkpoint 4 aprovado pelo usuário (com o brilho em 22%/18%). Início da etapa 5 (Testes) — usuário
- 2026-11-20 — Testes ciclo 1: 65/66 critérios passando; bugs: 1 média (LCP em /projetos/[slug]), 3 baixas. Desenvolvedor corrigindo — orquestrador
- 2026-11-20 — Bugs BUG-01 a BUG-04 corrigidos (LCP da página de projeto ≥ 90 com gzip, como no Cloudflare; e-mail placeholder não gera link). Início do ciclo 2 de testes — orquestrador
- 2026-11-20 — Testes ciclo 2: 66/66 critérios passando, 0 bugs abertos. Projeto concluído. Pendências: conteúdo real ([PREENCHER]), NEXT_PUBLIC_SITE_URL, commit e deploy (a pedido do usuário) — orquestrador
- 2026-11-20 — Conteúdo real preenchido a pedido do usuário (perfil, contatos, serviços, stack). Projetos: Sistema de orçamentos TOP Usinagem (repo público, telas fictícias copiadas do repo para public/projetos/) e Agenda Amaba (repo privado: sem link de GitHub/demo; capa ilustrativa, porque os prints locais têm dados reais). Pendentes: foto e CV reais — orquestrador
- 2026-11-20 — Foto real em public/foto.jpg (400x400). Currículo refeito a partir de "Currículo Victor dos Anjos (2).pdf": fonte em scripts/curriculo.html, PDF gerado com Chrome headless em public/cv.pdf e em Downloads ("Currículo Victor dos Anjos (atualizado).pdf"); originais intactos — orquestrador
- 2026-11-20 — Publicado a pedido do usuário no Cloudflare Pages (projeto `victordosanjos`, upload direto via wrangler, sem integração Git): https://victordosanjos.pages.dev. Build com NEXT_PUBLIC_SITE_URL=https://victordosanjos.pages.dev. Para atualizar: `npm run build` com a variável + `npx wrangler pages deploy out --project-name victordosanjos --branch main` — orquestrador
- 2026-11-20 — Imagem OG única para todas as páginas (`public/og.png`, plano B); sem OG por projeto — usuário
- 2026-11-20 — `AGENTS.md` (criado pelo create-next-app) fica na raiz e é versionado — usuário
- 2026-11-20 — Cor de destaque #8b6cff (em vez de #7c5cff, por contraste AA) — usuário
- 2026-11-20 — Design "Terminal Quieto" aprovado (Checkpoint 3); dependências de UI: nenhuma além de framer-motion e lucide-react — usuário
- 2026-11-20 — Arquitetura aprovada (Checkpoint 2) — usuário
- 2026-11-20 — "Solicitar orçamento" abre WhatsApp (wa.me) com mensagem pré-preenchida citando o serviço do card — usuário

## Histórico
- 2026-11-20 — Projeto iniciado com a equipe-dev; especificação detalhada recebida do usuário.
- 2026-11-20 — PO gravou docs/00-concorrencia.md e docs/01-requisitos.md (10 histórias, CA-NF.1 a CA-NF.21). Aguardando Checkpoint 1.
- 2026-11-20 — Checkpoint 1 aprovado pelo usuário. Início da etapa 2 (Arquitetura).
- 2026-11-20 — Arquiteto gravou docs/02-arquitetura.md (21 tarefas, T01–T21). Aguardando Checkpoint 2.
- 2026-11-20 — Checkpoint 2 aprovado. Arquiteto ajustou o doc para Cloudflare Pages com `output: "export"` (images.unoptimized, trailingSlash, force-static em sitemap/robots, NODE_VERSION=22, plano B de OG estático). Início da etapa 3 (Design).
- 2026-11-20 — UI/UX gravou docs/03-design.md (direção "Terminal Quieto", acento #8b6cff, nenhuma dependência nova). Aguardando Checkpoint 3.
- 2026-11-20 — Checkpoint 3 aprovado. Início da etapa 4 (Desenvolvimento).
- 2026-11-20 — Bloco 1 (T01–T06) concluído: build, lint e typecheck passando. Início do bloco 2 (T07–T10).
- 2026-11-20 — Bloco 2 (T07–T10) concluído: build, lint e typecheck passando; menu mobile testado no Chrome a 375px. Início do bloco 3 (T11–T15).
- 2026-11-20 — Bloco 3 (T11–T15) concluído: build/lint/typecheck passando; 3 páginas de projeto SSG em out/; filtro e responsividade testados no Chrome. Início do bloco 4 (T16–T21).
- 2026-11-20 — Bloco 4 (T16–T21) concluído; OG pelo plano B (public/og.png). Code review: 0 crítico, 3 importantes, 8 sugestões. Desenvolvedor corrigindo CR-01, CR-02, CR-03 e CR-05.
- 2026-11-20 — A pedido do usuário, a tarefa de correções passou a rodar com Sonnet; a execução anterior (Opus) foi interrompida no meio e a nova continua a partir dos arquivos já editados.
- 2026-11-20 — Correções concluídas (CR-01, 02, 03, 05). Build, lint e typecheck conferidos pelo orquestrador. Aguardando Checkpoint 4.
- 2026-11-20 — Bloco 2 (T07–T10) concluído pelo Desenvolvedor: build, lint e typecheck passando.
- 2026-11-20 — Bloco 3 (T11–T15) concluído pelo Desenvolvedor: build, lint e typecheck passando; 3 rotas de projeto SSG em out/.
- 2026-11-20 — Bloco 4 (T16–T21) concluído pelo Desenvolvedor: build, lint e typecheck passando; OG pelo plano B (public/og.png); README reescrito; lista de [PREENCHER] registrada.

## Tarefas de desenvolvimento
<!-- preenchido pelo Desenvolvedor -->
- [x] T01 — Scaffold com `create-next-app@16.4.6` na subpasta temporária `portfolio/` (flags do plano + `--skip-install`, para o T02 mover sem `node_modules`) — feito (Next 16.4.6, React 19.3.0, Tailwind 4.3.3 via `@tailwindcss/turbopack`, sem `postcss.config.mjs`)
- [x] T02 — Conteúdo de `portfolio/` movido para a raiz (incluindo `.gitignore`); `README.md` da raiz sobrescrito pelo gerado (será reescrito no T20); `portfolio/` removida após confirmar que estava vazia; `.git/`, `.omc/` e `docs/` intactos — feito
- [x] T03 — `npm install` + `npm install framer-motion lucide-react` (framer-motion ^14.14.0, lucide-react ^1.77.0); `.gitignore` com `!.env.example` e `.omc/` (`/out/` já vinha do template); `.env.example`; `.node-version` (22); `next.config.ts` com `output: "export"`, `images.unoptimized`, `trailingSlash` — feito (build do template gerou `out/index.html`) (arquivos: next.config.ts, .gitignore, .env.example, .node-version, package.json, package-lock.json)
- [x] T04 — Template limpo: removidos os 5 SVGs de exemplo de `public/`, `page.tsx` virou página vazia, CSS de exemplo trocado; `strict: true` e alias `@/*` confirmados; script `"typecheck": "tsc --noEmit"` — feito (arquivos: src/app/page.tsx, package.json)
- [x] T05 — Tokens e base: `@theme` com cores (inclui `border-strong`, `on-accent`, `accent-hover` via `color-mix`), raios, container, escala tipográfica do design (`text-display`, `text-h1-pagina[-lg]`, `text-h2[-md|-lg]`, `text-h3[-lg]`, `text-lead[-lg]`, `text-corpo[-lg]`, `text-nav`, `text-pequeno`, `text-label`), easing e durações; base com `body` bg/fg, `:focus-visible`, `::selection`, `scroll-behavior` só com `prefers-reduced-motion: no-preference`; Geist + Geist Mono via `next/font` (`display: swap`); `lang="pt-BR"`. Verificado no build: CSS gera `--color-accent:#8b6cff` e `.text-accent{color:var(--color-accent)}` (trocar o token troca o destaque); `next/image` com `.svg` por string sai como `<img src="/x.svg">` com `images.unoptimized` (teste temporário removido) — feito (arquivos: src/app/globals.css, src/app/layout.tsx)
- [x] T06 — Dados e utilitários: `perfil.ts` (tipado; campos extras do design: `disponibilidade`, `notaResposta`, `chamadaContato`), `projetos.ts` (interface `Projeto`, 3 exemplos "[PREENCHER]", checagem de slug repetido, `tagsDosProjetos`, `buscarProjeto`), `servicos.ts` (3), `stack.ts` (3 categorias), `navegacao.ts` (+ `hrefDaSecao`), `lib/site.ts` (`SITE_URL` sem barra final, `SITE_NOME`), `lib/links.ts` (`ehPreenchido`, `whatsappUrl`, `mailtoUrl`, `mensagemOrcamento`). Testado com Node: `whatsappUrl()` → `/#contato` com placeholder e `https://wa.me/5511999999999?text=...` com número real; 3 projetos com todos os campos obrigatórios. Projeto 2 sem demo e sem galeria, projeto 3 sem GitHub e sem galeria (para exercitar links/seções omitidos) — feito (arquivos: src/data/perfil.ts, src/data/projetos.ts, src/data/servicos.ts, src/data/stack.ts, src/data/navegacao.ts, src/lib/site.ts, src/lib/links.ts)

Verificação do bloco T01–T06: `npm run build` passou (rotas `/` e `/_not-found` estáticas; `out/index.html` e `out/404.html` gerados), `npm run lint` limpo, `npm run typecheck` limpo.

- [x] T07 — Ativos placeholder: `foto.svg` (800x1000, 4:5, tons de cinza), `projetos/projeto-{1,2,3}.svg` (1280x800, mockup de janela em `#141414`/`#262626` com detalhe `#8b6cff`, sem texto), `cv.pdf` (PDF 1.4 válido de 1 página com texto "[PREENCHER]", gerado por script Node sem dependência; conferido abrindo o arquivo). Os 4 arquivos saem em `out/` no build — feito (arquivos: public/foto.svg, public/projetos/projeto-1.svg, public/projetos/projeto-2.svg, public/projetos/projeto-3.svg, public/cv.pdf)
- [x] T08 — UI base: `Container` (`max-w-site mx-auto px-4 sm:px-6`), `Section` (`section` com `aria-labelledby`, rótulo mono `aria-hidden` "01 / Sobre", `h2` com id `<id>-titulo`, `scroll-mt-20`, `py-16 md:py-24`, hairline superior, descrição opcional), `Button` (primário/secundário/ghost, tamanhos md 48 px e sm 40 px; `next/link` para rotas "/...", `<a>` para âncora/mailto/download, externo http(s) com `target="_blank"`, `rel="noopener noreferrer"`, ícone `ArrowUpRight` e "(abre em nova aba)" em `sr-only`; sem `href` vira `<button>`; `scale(0.98)` e deslocamento do ícone só com `motion-safe`; exporta `classesBotao` e `ehLinkExterno`), `Tag` (`sobreSurface` troca para `bg-bg`). Conferido no HTML de um build com página temporária (já revertida): externo gerou `target="_blank" rel="noopener noreferrer"`, CV gerou `download`, seção gerou `aria-labelledby` — feito (arquivos: src/components/ui/Container.tsx, src/components/ui/Section.tsx, src/components/ui/Button.tsx, src/components/ui/Tag.tsx)
- [x] T09 — `Reveal` (client): `LazyMotion` + `domAnimation` + `m.div`/`m.li` (`strict`), fade + `y: 12 → 0` (máx. 16 px), 360 ms, easing `[0.22,1,0.36,1]`, `delay` limitado a 0,15 s, `viewport={{ once: true, margin: "0px 0px -10% 0px" }}`. Com `useReducedMotion()` usa `initial={false}` e duração 0 (nasce no estado final, sem movimento). SSR gera `opacity:0;transform:translateY(12px)` (conferido no HTML). Para o Hero (T11) o design pede não esconder o h1 (LCP): não envolver o h1 com `Reveal` padrão — feito (arquivos: src/components/ui/Reveal.tsx)
- [x] T10 — `SkipLink` (1º elemento focável do `body`, visível no foco, estilo de botão primário, `z-[100]`), `Header` (fixo, 64 px, `bg-bg/80 backdrop-blur-md`, borda inferior; logo = nome + ponto de acento `aria-hidden`; `nav aria-label="Principal"` com links `/#id` e botão sm "Fale comigo" a partir de 768 px), `MobileMenu` (client; botão 44x44 `Menu`/`X` com `aria-label` "Abrir/Fechar menu", `aria-expanded`, `aria-controls="menu-mobile"`; painel `nav#menu-mobile` com `AnimatePresence`, abre 220 ms / fecha 160 ms, instantâneo com reduced motion; foco no 1º link ao abrir; `body` com `overflow: hidden`; `main#conteudo` e `footer` com `inert`; Tab/Shift+Tab presos; Esc fecha e devolve o foco; clique em link fecha e libera a página antes da navegação; `matchMedia(min-width: 768px)` fecha), `Footer` (nome, "© {ano} nome", E-mail via `mailtoUrl`, LinkedIn/GitHub só se preenchidos com `ExternalLink` + rótulo, "Voltar ao topo" → `#conteudo`), `layout.tsx` com `SkipLink`, `Header`, `<main id="conteudo">`, `Footer`. Testado no Chrome (dev server, iframe de 375 px): botão visível e nav desktop oculta; abrir → `aria-expanded=true`, foco no 1º link, rolagem travada, `main`/`footer` inertes, painel ocupa 64 px → fim da tela; Tab no último link volta ao botão e Shift+Tab no botão vai ao último link; Esc fecha, devolve o foco e libera a página; clique em link fecha e libera a página; `scrollWidth` = 375 (sem scroll horizontal). Desktop (1536 px) conferido por screenshot — feito (arquivos: src/components/layout/SkipLink.tsx, src/components/layout/Header.tsx, src/components/layout/MobileMenu.tsx, src/components/layout/Footer.tsx, src/app/layout.tsx, src/app/page.tsx)

Verificação do bloco T07–T10: `npm run build` passou (`/` e `/_not-found` estáticas; `out/cv.pdf`, `out/foto.svg`, `out/projetos/*.svg` presentes), `npm run lint` limpo, `npm run typecheck` limpo.

- [x] T11 — Hero (`section#inicio`, `aria-labelledby`): selo de status com ponto de acento, `h1` = `perfil.nome` (único `h1` da home), cargo, proposta, "Ver projetos" (primário, `ArrowRight`, `/#projetos`) e "Fale comigo" (secundário, `/#contato`), largura total no mobile e lado a lado a partir de `sm`, nota de resposta, redes (E-mail; LinkedIn/GitHub só se preenchidos), grade decorativa estática (`--color-grid-line`, `mask-image`, `aria-hidden`), cartão "stack.ts" decorativo só em `lg+` (primeiros 3 itens de cada categoria de `stack.ts`). Reserva o header fixo: `pt-28` no mobile, `lg:min-h-svh lg:pt-16` (= 64 px + `calc(100svh-4rem)`). Cascata 320 ms, `y` 8 px, stagger 40 ms; o `h1` anima só o deslocamento (`fade={false}`), nunca nasce com opacidade 0. `Reveal` ganhou as props `duracao` (limitada a 0,4 s) e `fade`. `page.tsx` monta Hero, Sobre, Projetos e Serviços — feito (arquivos: src/components/sections/Hero.tsx, src/components/ui/Reveal.tsx, src/components/ui/RedesSociais.tsx, src/lib/links.ts, src/components/layout/Footer.tsx, src/app/page.tsx)
- [x] T12 — Sobre (`#sobre`, "01 / Sobre", h2 "Sobre mim"): parágrafos de `perfil.bio`, foto com `next/image` (`fill`, `sizes`, `alt` de `perfil.foto.alt`) em moldura 1 px e raio 12 (1:1 até 280 px no mobile, 4:5 em `lg`), texto 7 col e foto 4 col à direita a partir de `md`; "Baixar CV" secundário com `Download` → `<a href="/cv.pdf" download>` (conferido no HTML) — feito (arquivos: src/components/sections/Sobre.tsx)
- [x] T13 — Projetos (`#projetos`, "02 / Projetos"): `ProjetosGrid` (client) com chips `<button aria-pressed>` em `role="group"` ("Todos" + `tagsDosProjetos`), ativo com fundo de acento, peso 600 e ícone `Check`; contagem em `<p class="sr-only" aria-live="polite">`; grid 1/2/3 colunas (`md`/`lg`), gap 24; entrada ao rolar com stagger 50 ms (máx. 3) e, depois do 1º clique, fade de 200 ms sem animar layout; com movimento reduzido tudo é instantâneo; estado vazio tracejado com "Nenhum projeto com essa tecnologia ainda." + botão "Ver todos". `ProjetoCard`: capa 16:10 com `brightness-90` que some no hover, `h3` com link `/projetos/<slug>/` cujo `::after` cobre o card (um único foco; anel desenhado no `::after`), resumo com `line-clamp-3`, tags, "Ver estudo de caso" decorativo, Demo/GitHub (ghost, `relative z-10`, nova aba + `rel`, texto `sr-only` "de <título>") só quando existem. Testado no Chrome (dev): filtro "Node.js" → 1 card, `aria-pressed=true`, aria-live "1 projeto", sem reload; "Todos" → 3 cards. Estado vazio testado com estado inicial temporário "Inexistente" (o HTML gerou a mensagem e "Ver todos"; revertido). Projeto 2 sem Demo e projeto 3 sem GitHub conferidos no HTML — feito (arquivos: src/components/projetos/ProjetosGrid.tsx, src/components/projetos/ProjetoCard.tsx, src/components/sections/Projetos.tsx, src/data/projetos.ts)
- [x] T14 — `/projetos/[slug]`: `generateStaticParams`, `dynamicParams = false`, `generateMetadata` (title, description, canonical `/projetos/<slug>/`, `openGraph` tipo article), `notFound()` se o slug não existir. Página com `pt-24` (reserva do header), link "Voltar para projetos" (`/#projetos`, `ArrowLeft`), rótulo mono "Estudo de caso", `h1` = título, resumo, tags, botões "Ver demo"/"GitHub" (só se existirem), capa com `priority` (16:10, 16:9 em `lg`), ficha `aside` (Meu papel, Stack) sticky em `lg` na coluna da direita, corpo (Problema, Solução, Resultados com marcador de acento, Galeria em 2 colunas só se houver imagens) e faixa final "Gostou deste projeto? Fale comigo." com botão para `/#contato` e voltar. Build: 3 rotas SSG, `out/projetos/projeto-exemplo-{1,2,3}/index.html` gerados, `out/projetos/xyz` não existe; no dev `/projetos/xyz/` → 404. Galeria só aparece no projeto 1 (2 e 3 não têm). Sem scroll horizontal e conteúdo abaixo do header em 375/768/1440 (home e projetos 1 e 2, medido com iframe no Chrome) — feito (arquivos: src/app/projetos/[slug]/page.tsx, src/app/layout.tsx)
- [x] T15 — Serviços (`#servicos`, "03 / Serviços"): 3 cards (`ul`/`li` com `Reveal` stagger 50 ms), ícone Lucide 24 px `muted` mapeado por nome (`LayoutTemplate`, `Building2`, `AppWindow`), número mono "01–03", `h3`, descrição, hairline e "Solicitar orçamento" secundário largura total com `whatsappUrl(mensagemOrcamento(titulo))` + `sr-only` "de <serviço>". Com número placeholder o HTML gera `href="/#contato"`; com número temporário `5511999999999` (revertido) gerou `https://wa.me/5511999999999?text=Ol%C3%A1!%20Vi%20seu%20portf%C3%B3lio%20e%20quero%20um%20or%C3%A7amento%20de%20Landing%20page.` com `target="_blank" rel="noopener noreferrer"` (idem para os outros 2) — feito (arquivos: src/components/sections/Servicos.tsx)

Verificação do bloco T11–T15: `npm run build` passou (`/` estática, `/projetos/projeto-exemplo-{1,2,3}` SSG, `out/404.html` presente, nenhum `out/projetos/xyz`), `npm run lint` limpo, `npm run typecheck` limpo.

- [x] T16 — Stack (`#stack`, "04 / Stack", h2 "Stack e habilidades"): `ul` de categorias de `stack.ts`, cada uma com `h3` e `ul`/`li` de `Tag` (lista nomeada pelo `h3` via `aria-labelledby`); empilhado no mobile, 3 colunas com hairline vertical (`divide-x`) em `lg`; `Reveal` com stagger 50 ms (máx. 3) — feito (arquivos: src/components/sections/Stack.tsx, src/app/page.tsx)
- [x] T17 — Contato (`#contato`, "05 / Contato", h2 "Vamos conversar?", frase `perfil.chamadaContato`): links WhatsApp (destaque, estilo primário), E-mail, LinkedIn e GitHub (os dois últimos só se preenchidos; WhatsApp cai em `/#contato` e e-mail em `mailto:` enquanto forem placeholder, como manda o design). Mobile: botões empilhados em largura total, 56 px; `lg`: título à esquerda (5 col) e card `surface` com linhas de 64 px divididas por hairline (7 col). Linha: ícone Lucide (`MessageCircle`, `Mail`, `ExternalLink`), rótulo visível, valor `muted` (só quando preenchido, `overflow-wrap:anywhere`), `ArrowUpRight`; externos com `target="_blank" rel="noopener noreferrer"` e "(abre em nova aba)" `sr-only`; foco com anel interno. `Section` ganhou a prop `ladoALado`. Conferido: nenhum `<form>` no HTML, nenhuma pasta `app/api` — feito (arquivos: src/components/sections/Contato.tsx, src/components/ui/Section.tsx, src/app/page.tsx)
- [x] T18 — SEO: `layout.tsx` com `title` (`default` "nome · cargo" e `template` "%s · nome"), `description` (= `perfil.proposta`), `openGraph` e `twitter` (`summary_large_image`); home com `canonical "/"` e openGraph completo; projeto com `openGraph` + `twitter`; `sitemap.ts` e `robots.ts` com `dynamic = "force-static"` (URLs com barra final: `/` e `/projetos/<slug>/`); `not-found.tsx` (h1 "Página não encontrada", botões para o início e projetos; o Next já põe `noindex`). **OG:** testei `opengraph-image.tsx` (home e `[slug]`): com export ele exige `dynamic = "force-static"` e aí gera PNG válido, mas em `out/` o arquivo sai **sem extensão** (`out/opengraph-image`, `out/projetos/<slug>/opengraph-image`) e a meta aponta para `/opengraph-image?<hash>`, então o Cloudflare Pages não garante `Content-Type: image/png`. Apliquei o **plano B**: removi os `opengraph-image.tsx`, criei `scripts/gerar-og.mjs` (Node + `zlib`, sem dependência) que gera `public/og.png` (1200x630, 9,5 KB: fundo `#0a0a0a`, grade de 48 px, faixa de acento no topo, hairline e ponto de acento; sem texto), referenciado por `OG_IMAGEM` em `src/lib/site.ts` em todas as páginas (og:image com type/width/height/alt e twitter:image). Build: `out/sitemap.xml` com 4 URLs, `out/robots.txt` com `Sitemap: <SITE_URL>/sitemap.xml`, `out/404.html`, `out/og.png`; `<head>` da home e dos projetos com title, description, canonical e og:* — feito (arquivos: src/app/layout.tsx, src/app/page.tsx, src/app/projetos/[slug]/page.tsx, src/app/sitemap.ts, src/app/robots.ts, src/app/not-found.tsx, src/lib/site.ts, scripts/gerar-og.mjs, public/og.png)
- [x] T19 — Revisão a11y/responsiva no build servido (`out/` em servidor Node local temporário, Chrome, iframes): home, 3 projetos e 404 em 375/768/1440 px sem scroll horizontal (`scrollWidth` = largura menos a barra de rolagem; nenhum elemento passa da borda); 1 `h1` por página; headings em ordem (h1, h2 por seção, h3 em cards/categorias); ordem de foco lógica (skip link, logo, menu, "Fale comigo", Hero, Sobre, filtros, cards, Serviços, Contato, footer); todos os `target="_blank"` com `rel="noopener noreferrer"`; classe de foco interno do Contato gerada no CSS. Contraste: as combinações novas (texto `on-accent` sobre acento na linha WhatsApp, `muted` sobre `surface`/`bg`) são as já aprovadas na tabela do design. Nenhum ajuste necessário além do T17/T18. Servidor e aba encerrados — feito
- [x] T20 — README.md em português: o que é, como rodar (comandos do cap. 7 + `typecheck`), estrutura, como preencher os dados (`[PREENCHER]` e regras de WhatsApp/LinkedIn/GitHub), como adicionar projeto (passo a passo com exemplo e imagens em `public/projetos/`), como trocar `--color-accent` (aviso de contraste com o exemplo `#7c5cff`, que falha sobre `surface`, e como regerar `og.png`), `NEXT_PUBLIC_SITE_URL`, trocar CV, foto e `og.png`, compressão de imagens (WebP, capas até 150 KB, foto até 120 KB, motivo: `images.unoptimized`), deploy no Cloudflare Pages (`npm run build`, saída `out`, `NODE_VERSION=22`, `NEXT_PUBLIC_SITE_URL`, Direct Upload) — feito (arquivos: README.md)
- [x] T21 — Verificação final: `npm run lint` limpo; `npm run typecheck` limpo; `npm run build` passou (`/` e `/_not-found` estáticas, `/projetos/projeto-exemplo-{1,2,3}` SSG, `/robots.txt` e `/sitemap.xml` estáticos). `out/` contém `index.html`, `404.html`, `sitemap.xml` (4 URLs), `robots.txt`, `og.png` e `projetos/projeto-exemplo-{1,2,3}/index.html`; nenhum `opengraph-image` sobrando. `package.json`: dependências só `next`, `react`, `react-dom` + as 2 extras (`framer-motion`, `lucide-react`). Lista de "[PREENCHER]" abaixo — feito

Verificação do bloco T16–T21: `npm run build` passou, `npm run lint` limpo, `npm run typecheck` limpo.

### Pendências "[PREENCHER]" (T21)
Busca: `grep -rn "\[PREENCHER\]" .` excluindo `node_modules`, `.next`, `out`, `docs`, `.git`, `.omc`.
- `src/data/perfil.ts`: linhas 34 (nome), 35 (cargo), 37 (proposta), 38 (disponibilidade), 39 (nota de resposta), 41–42 (bio), 45 (chamada do Contato), 48 (alt da foto), 54 (e-mail), 55 (WhatsApp), 56 (LinkedIn), 57 (GitHub). Linhas 1, 8 e 10 são comentários de instrução.
- `src/data/projetos.ts`: projeto 1 — linhas 42, 44, 47, 53, 55, 57, 59, 60, 62 (demoUrl), 63 (githubUrl), 67 (alt da galeria); projeto 2 — 75, 77, 80, 85, 86, 88, 90, 91, 93 (githubUrl); projeto 3 — 97, 99, 102, 107, 108, 110, 112, 113, 114, 116 (demoUrl).
- `src/data/servicos.ts`: linhas 19, 26, 33 (descrições dos 3 serviços).
- `src/data/stack.ts`: linha 2 (revisar categorias e tecnologias).
- `public/cv.pdf`: linha 17 (texto do PDF placeholder; trocar o arquivo).
- Arquivos placeholder sem marcador de texto: `public/foto.svg`, `public/projetos/projeto-{1,2,3}.svg`, `public/og.png` (opcional trocar por arte própria).
- Não são pendências: `src/lib/links.ts` linhas 3 e 5 (constante que detecta o marcador) e `README.md` linha 51 (instrução).

### Decisões do desenvolvimento
- 2026-11-20 — `next.config.ts`: removidos `cacheComponents: true` e `partialPrefetching: true` que o `create-next-app` 16.4.6 coloca por padrão. Com Cache Components ligado, o Next 16 remove `dynamicParams` e `dynamic = "force-static"` (docs em `node_modules/next/dist/docs`), e a arquitetura usa os dois (T14, T18). Mantida a regra `turbopack` do Tailwind gerada pelo template — Desenvolvedor
- 2026-11-20 — Tailwind v4 vem integrado via `@tailwindcss/turbopack` (devDependency do próprio template), sem `postcss.config.mjs`. A estrutura da arquitetura citava `postcss.config.mjs`; não foi criado porque o template não usa — Desenvolvedor
- 2026-11-20 — `lucide-react` 1.77.0 não tem `Github` nem `Linkedin` (ícones de marca removidos). Conforme o design (seção 8), usar `ExternalLink` com rótulo de texto nesses links (T10, T17) — Desenvolvedor
- 2026-11-20 — Links de exemplo `https://example.com` / `https://github.com` em `projetos.ts` marcados com comentário `// [PREENCHER]` para aparecerem no grep final — Desenvolvedor
- 2026-11-20 — Header fixo e `<main id="conteudo">` sem padding superior: cada página reserva o topo de 64 px (Hero com `pt-28` no T11; página de projeto precisa de `pt-*` equivalente no T14). `page.tsx` atual tem só `<div className="pt-16" />` até o T11 — Desenvolvedor
- 2026-11-20 — Painel do menu mobile posicionado com `absolute top-full h-[calc(100dvh-4rem)]` dentro do header, e não `fixed top-16 bottom-0` como no wireframe: o `backdrop-filter` do header vira bloco de contenção para filhos `fixed`, o que quebraria o painel. Efeito visual igual — Desenvolvedor
- 2026-11-20 — O seletor do `inert` do menu usa `#conteudo, body > footer`; o Footer precisa continuar filho direto do `body` (está no `layout.tsx`) — Desenvolvedor
- 2026-11-20 — O Next injeta `<div hidden>` vazio antes do skip link no `body` (boundary de metadata). Não é focável, então o skip link continua sendo o 1º foco — Desenvolvedor
- 2026-11-20 — "Voltar ao topo" do footer aponta para `#conteudo` (o `main` começa no topo da página e existe em todas as rotas; `#inicio` só existe na home) — Desenvolvedor
- 2026-11-20 — Não deu para emular `prefers-reduced-motion` no navegador automatizado; a versão reduzida do `Reveal` e do menu foi verificada por leitura de código (`useReducedMotion` → `initial={false}` e duração 0). O Tester deve conferir no DevTools (Rendering → Emulate CSS media feature) — Desenvolvedor
- 2026-11-20 — `metadataBase: new URL(SITE_URL)` adiantado para o `layout.tsx` no T14, porque a página de projeto já usa canonical e `og:url` relativos (sem ele o Next avisa e usa localhost). O resto da metadata (template de título, OG da home, imagens OG) continua no T18 — Desenvolvedor
- 2026-11-20 — Página de projeto: os links Demo/GitHub ficam no cabeçalho (logo após as tags, como no wireframe mobile) em todos os tamanhos, e não dentro da ficha lateral do desktop, para não duplicar links nem confundir a ordem de foco. A ficha (`aside`, sticky em `lg`) tem Meu papel e Stack e vem antes do corpo no DOM (ordem do mobile). Os `h2` da página usam o token visual `h3` (o `h2` de 30/44 px é grande demais para subseções de leitura) — Desenvolvedor
- 2026-11-20 — Card de projeto: o anel de foco é desenhado no `::after` que cobre o card (`focus-visible:after:outline-2 -outline-offset-2 outline-accent`), e o `a` do título recebe `focus-visible:outline-none` para não mostrar dois anéis. O foco continua visível (anel de acento no card inteiro), como pede o design — Desenvolvedor
- 2026-11-20 — Redes (E-mail/LinkedIn/GitHub) extraídas para `redesDoPerfil()` em `lib/links.ts` e para o componente `ui/RedesSociais.tsx`, usado no Hero e no Footer (antes a lógica estava só no Footer) — Desenvolvedor
- 2026-11-20 — `hrefDoProjeto(slug)` (com barra final) fica em `src/data/projetos.ts`, para o card, a página e o sitemap (T18) usarem o mesmo caminho — Desenvolvedor
- 2026-11-20 — Cartão decorativo do Hero: linhas longas quebram (`whitespace-pre-wrap`) em vez de serem cortadas; com os dados atuais a linha "Back-end" quebra em 2 linhas em `lg` — Desenvolvedor
- 2026-11-20 — Havia um `next dev` antigo deste projeto ainda rodando na porta 3123 (de um bloco anterior), que devolvia 500 em `/projetos/[slug]`. Foi encerrado; o servidor de teste deste bloco (porta 3124) também foi encerrado ao final. Nenhum servidor ficou rodando — Desenvolvedor

- 2026-11-20 — T18: OG pelo plano B (`public/og.png` único para o site, gerado por `scripts/gerar-og.mjs`). Motivo: `opengraph-image.tsx` com export gera o PNG sem extensão em `out/`, sem garantia de `Content-Type` no Cloudflare Pages. Alternativa não aplicada (fora do plano): manter os `opengraph-image.tsx` e criar `public/_headers` do Cloudflare forçando `Content-Type: image/png` nesses caminhos, o que daria uma imagem por projeto. A pasta `scripts/` não estava na estrutura da arquitetura; foi criada para o script ser reaproveitado ao trocar o acento — Desenvolvedor
- 2026-11-20 — `OG_BASE` (siteName, locale, images) e `OG_IMAGEM` em `src/lib/site.ts`: o Next substitui o objeto `openGraph` do layout pelo da página (não mescla), então home e projeto repetem os campos comuns via spread. As cores do `scripts/gerar-og.mjs` repetem os tokens (o script não lê CSS) — Desenvolvedor
- 2026-11-20 — Contato: a linha WhatsApp vem primeiro em todos os tamanhos (no wireframe mobile o e-mail vinha antes), para ter uma ordem só no DOM e o destaque primário no topo, como no desktop — Desenvolvedor
- 2026-11-20 — `Section` ganhou a prop opcional `ladoALado` (cabeçalho 5 col + conteúdo 7 col em `lg`), usada só no Contato — Desenvolvedor
- 2026-11-20 — Título da home deixou de ser "Portfólio" e passou a ser "nome · cargo" (de `perfil.ts`); description = `perfil.proposta`. Páginas internas usam o template "%s · nome" — Desenvolvedor
- 2026-11-20 — Build no OneDrive: o `next build` falhou com `EPERM ... unlink .next/...` porque o OneDrive transformou pastas do cache `.next/` em reparse points. Resolvido apagando a pasta `.next/` (cache gerado, recriado pelo build). Se acontecer de novo, apagar `.next/` ou pausar a sincronização do OneDrive durante o build — Desenvolvedor
- 2026-11-20 — T19 testado servindo `out/` com um servidor Node temporário (script no scratchpad, fora do projeto), já encerrado — Desenvolvedor
- 2026-11-20 — Checkpoint 4, fundo "Brilho violeta suave": tokens `--color-glow` (16%) e `--color-glow-soft` (10%) derivados de `--color-accent` em `@theme static` (`globals.css`; sem `static` o Tailwind não emite variáveis usadas só em valores arbitrários). Brilho no topo do Hero (`Hero.tsx`; grade mantida, máscara movida para o topo central, sob o brilho) e brilho fraco vindo de baixo no Contato (`Contato.tsx`, via nova prop opcional `fundo` do `Section.tsx`, que torna a seção `relative overflow-hidden`). Sem dependência nova, sem animação. Conferido: sem scroll horizontal em 375/768/1440; contraste no tom mais claro fg 14,3:1, muted 6,5:1. Atenção: o `npm run dev` na porta 3000 não recarregou o `globals.css` (tokens novos ausentes no CSS servido); a conferência visual foi feita injetando os mesmos tokens na página. Reiniciar o dev server para ver o brilho — Desenvolvedor
- 2026-11-20 — Checkpoint 4, brilho no site inteiro (pedido do usuário: "é para ficar no projeto todo"): camada global `body::before` fixa em `globals.css` (3 radiais de `--color-glow-soft`: topo-esquerda, meio-direita, base-esquerda; `z-index: -1`, `body` com `isolation: isolate`), valendo para home, `/projetos/[slug]` e 404. Brilho do Hero mantido como ponto mais forte. Removidos o brilho do Contato (`Contato.tsx`) e a prop `fundo` do `Section.tsx` (redundantes). Sem dependência, sem animação, sem `filter: blur`. Conferido no dev server da porta 3000 (que recarregou o CSS desta vez): camada presente na home (rolando), em `/projetos/projeto-exemplo-1/` e na 404; `scrollWidth` = `clientWidth`. Contraste pior caso ≈ `#2a2246`: fg 12,7:1, muted 5,7:1. `npm run lint` e `npm run typecheck` passaram — Desenvolvedor

## Dúvidas do desenvolvimento
<!-- preenchido pelo Desenvolvedor -->
- `AGENTS.md` na raiz: o `create-next-app` 16.4.6 gerou esse arquivo sem perguntar (não havia flag para recusar) e o próprio arquivo avisa que `next dev` o recria. Foi movido para a raiz junto com o resto do scaffold e **não foi apagado** (só a remoção de `portfolio/` está autorizada). **Resolvido (2026-11-20):** usuário decidiu manter e versionar.

### Correções do code review (Revisão 1) — 2026-11-20
- CR-01, CR-02, CR-03, CR-05 corrigidos (ver `docs/05-code-review.md`). CR-04, CR-06 a CR-11 não pedidos nesta rodada.
- CR-02 testado em Chrome headless via DevTools Protocol (`Emulation.setEmulatedMedia` reduce e no-preference; `setScriptExecutionDisabled` para sem JS): reduce = 0 itens ocultos; sem JS = 0 ocultos; movimento normal = ocultos até rolar (esperado); filtro e "Todos" sem opacidade 0 e 0 erros de console/hidratação. Não testado: Firefox/Safari.

### Correções dos testes (ciclo 1) — 2026-11-20
- BUG-01 a BUG-04 corrigidos (detalhes em `docs/04-relatorio-testes.md`). Arquivos: `src/app/projetos/[slug]/page.tsx`, `src/lib/links.ts`, `src/components/ui/RedesSociais.tsx`, `src/components/sections/Contato.tsx`, `src/components/layout/Header.tsx`, `src/components/layout/MobileMenu.tsx`.
- 2026-11-20 — BUG-01: no Next 16.4.6 `priority` do `next/image` está depreciado. A capa usa `preload` + `fetchPriority="high"` (gera o `<link rel="preload">` no HTML estático). O Lighthouse 13.6 (Lantern) põe no LCP simulado todo JS baixado antes de um LCP de **imagem**. Com servidor sem compressão, as páginas de projeto ficam em 80–82; com gzip (o Cloudflare Pages comprime por padrão), ficam em 97. Para medir o CA-NF.8, sirva `out/` com compressão (ex.: `npx serve out`). Testado e descartado (sem efeito no LCP): `prefetch={false}` nos links para a home, remover o blur do header, remover o brilho de fundo e remover a capa. Nenhuma dessas mudanças ficou no código. O brilho (tokens) não foi alterado — Desenvolvedor
- 2026-11-20 — BUG-02: `mailtoUrl` agora devolve `string | null` (`null` com e-mail placeholder). Enquanto e-mail, LinkedIn e GitHub forem placeholder, a lista "Redes e contato" não aparece no Hero nem no Footer. O Contato mostra só o botão WhatsApp, que cai em `/#contato` até o número ser preenchido. Ao preencher `perfil.contatos.email`, o e-mail volta nos 3 lugares — Desenvolvedor
- 2026-11-20 — BUG-03: navegação do header com `px-2` em md (768–1023 px) e `px-3` em lg. O nome placeholder (188 px) cabe a 768 px — Desenvolvedor
- 2026-11-20 — BUG-04: `aria-controls` do botão do menu só existe com o painel aberto (o painel continua montado só quando aberto, por causa da animação de saída do `AnimatePresence`) — Desenvolvedor
- Medições feitas com servidores Node temporários (scripts no scratchpad, fora do projeto) e Chrome headless, todos encerrados. Pastas temporárias `out/exp-*` usadas nos experimentos foram removidas (o build recria `out/`). Nenhuma dependência nova.
