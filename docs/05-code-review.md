# Code Review — Portfólio pessoal (dev web)

## Revisão 1 — 2026-11-20
**Build:** passou (`npm run build`; `npm run lint` também limpo). Rotas: `/`, `/_not-found`, 3x `/projetos/[slug]` (SSG), `/robots.txt`, `/sitemap.xml`. `out/` contém `404.html`, `og.png`, `projetos/projeto-exemplo-{1,2,3}/`.

### Crítico
Nenhum.

### Importante
- [x] CR-01 `src/lib/site.ts:7` — `SITE_URL` cai em silêncio para `https://portfolio-placeholder.pages.dev` quando `NEXT_PUBLIC_SITE_URL` não está definida. Um deploy sem a variável publica canonical, og:url, sitemap e robots apontando para um domínio inexistente (CA-NF.2, CA-NF.3, CA-NF.5). **Correção sugerida:** manter o padrão só em dev; em build de produção (`process.env.NODE_ENV === "production"`) sem a variável, emitir `console.warn` visível ou lançar erro (mesmo padrão da checagem de slug em `projetos.ts`). Lembrar no README/painel do Cloudflare. — corrigido: build segue com fallback e `next.config.ts` emite `[AVISO]` no console quando a variável falta; README seção "URL do site" explica.
- [x] CR-02 `src/components/ui/Reveal.tsx:55` (e `animacaoDoCard` em `src/components/projetos/ProjetosGrid.tsx`) — o SSR gera `opacity:0` em tudo que usa `Reveal`/cards, e com `useReducedMotion()` o cliente usa `initial={false}`. No servidor o hook devolve `null`, no cliente já pode devolver `true`: risco de mismatch de hidratação em que o HTML estático fica com `opacity:0` para quem pede movimento reduzido (e conteúdo invisível sem JS / antes da hidratação). O progresso só registra teste com movimento normal. **Correção sugerida:** testar no Chrome com `prefers-reduced-motion: reduce` emulado (home e filtro). Se aparecer invisível, trocar o estado inicial escondido por CSS (`@media (prefers-reduced-motion: no-preference)`) ou revelar via estado montado (`useEffect`), de modo que o HTML estático nunca dependa do JS para ficar visível. — corrigido: estado escondido só em CSS (`html.js` + `prefers-reduced-motion: no-preference`), sem `opacity:0` no HTML estático; testado no Chrome headless (CDP).
- [x] CR-03 `src/components/projetos/ProjetoCard.tsx:57-64` e `src/app/projetos/[slug]/page.tsx:106-116` — `demoUrl`/`githubUrl` são testados só por truthiness. Se alguém deixar `"[PREENCHER]"` (ou escrever `github.com/x` sem `https://`) vira `<a href>` relativo quebrado; o resto do site usa `ehPreenchido`. Afeta o fluxo "adicionar projeto só editando `projetos.ts`". **Correção sugerida:** filtrar com `ehPreenchido(url)` (de `@/lib/links`) nos dois lugares e, em `projetos.ts`, uma checagem em build (como a de slug) exigindo `^https?://` quando o campo existe. Mesma validação para `linkedin`/`github` em `redesDoPerfil` e `Contato.tsx:309-314`. — corrigido: `ehUrlExterna`/`erroDeUrl` em `lib/links.ts`, usados em card, página, Contato e redes; `projetos.ts` e `links.ts` quebram o build se URL preenchida não for http(s).

### Sugestão
- [ ] CR-04 `src/data/projetos.ts:121` — validar também formato do slug (`/^[a-z0-9]+(-[a-z0-9]+)*$/`) e que toda `tag` do projeto não seja vazia; slug com espaço/maiúscula quebra URL/sitemap.
- [x] CR-05 `src/components/layout/SkipLink.tsx` / `src/app/layout.tsx` (`main#conteudo`) — adicionar `tabIndex={-1}` ao `main` para que o foco realmente mova ao ativar o skip link e "Voltar ao topo" em todos os navegadores. — corrigido: `tabIndex={-1}` em `main#conteudo`.
- [ ] CR-06 `src/app/sitemap.ts:9` — `lastModified: new Date()` muda a cada build e engana crawlers; omitir o campo ou usar data fixa por projeto (campo opcional em `Projeto`).
- [ ] CR-07 `src/components/layout/Footer.tsx:7` — ano calculado no build; fica defasado até o próximo deploy. Aceitável (site estático), mas documentar no README ou forçar rebuild anual.
- [ ] CR-08 `src/app/projetos/[slug]/page.tsx:41` — indentação quebrada em `twitter.images`; rodar formatador. Considerar também incluir `OG_IMAGEM.alt` em `twitter` (`images: [{ url, alt }]`).
- [ ] CR-09 `docs/01-requisitos.md:158` — CA-NF.21 ainda diz "deploy na Vercel"; o README documenta Cloudflare Pages (decisão aprovada). Atualizar o requisito. Remover também `.vercel` do `.gitignore:37-38` (resíduo do template).
- [ ] CR-10 `src/app/globals.css:13` — `border-strong` (#3a3a3a) sobre `bg` tem ~1,7:1; contorno de botões secundários e chips de filtro tem rótulo de texto, então não reprova a AA, mas fica pouco perceptível. Considerar `#4a4a4a` se o design permitir.
- [ ] CR-11 Verificação pendente para o Tester: Lighthouse mobile Performance >= 90 e Acessibilidade >= 95 (CA-NF.8, CA-NF.15) e contraste real do acento em texto (`text-accent` sobre `surface`) não foram medidos pelo desenvolvedor.

### Pontos positivos
- Aderência alta à arquitetura: static export, `trailingSlash`, `images.unoptimized`, `force-static` em sitemap/robots, `dynamicParams = false`, sem rotas de API/formulários, só `framer-motion` e `lucide-react` extras (CA-NF.19, CA-NF.20).
- Adicionar projeto = um objeto em `projetos.ts`: card, filtro (tags geradas), página, `generateStaticParams`, sitemap e checagem de slug duplicado saem dos dados.
- Links externos sempre com `target="_blank" rel="noopener noreferrer"` e aviso "(abre em nova aba)" para leitores de tela; fallbacks de WhatsApp/e-mail evitam links quebrados.
- Acessibilidade bem cuidada: skip link, `aria-labelledby` em seções, `h1` único, filtro com `aria-pressed` + `aria-live`, menu mobile com foco preso, Esc, `inert` e `aria-expanded`; foco visível global; `scroll-behavior` condicionado a `prefers-reduced-motion`.
- Tokens em `@theme` (troca de acento em um lugar); OG por PNG estático resolve a limitação do export; `.env.example`, `.node-version` e `.gitignore` corretos, sem segredos.
