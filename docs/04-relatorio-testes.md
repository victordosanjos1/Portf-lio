# Relatório de Testes — Portfólio pessoal (dev web)

## Ciclo 2 — 2026-11-20 (re-teste)
**Build:** passou (`npm run build`; 9 páginas estáticas).
**Lint / typecheck:** `npm run lint` e `npm run typecheck` limpos.
**Testes automatizados:** nenhum no repositório (sem dependência nova). Verificação por scripts descartáveis fora do projeto (Chrome headless via CDP, `npx serve out`, `npx lighthouse`).
**Resultado geral:** APROVADO

Resumo: 66 critérios — 66 passam, 0 falham, 0 não testáveis. Bugs abertos: 0 críticos, 0 altos, 0 médios, 0 baixos. BUG-01 a BUG-04 confirmados corrigidos.

### Re-teste dos bugs
| Bug | Resultado | Evidência |
|---|---|---|
| BUG-01 / CA-NF.8 | corrigido (confirmado no ciclo 2) | `npx serve out` (gzip confirmado: `Content-Encoding: gzip` em HTML e JS, como no Cloudflare Pages). Lighthouse 13 mobile, Performance: projeto-exemplo-1 **97**, -2 **96**, -3 **97**, home **97**. LCP 2,7 s, TBT 40–110 ms, CLS 0; auditoria "LCP request discovery" = 1. Referência **sem** compressão (`serve --no-compression`): 82 / 82 / 80 (LCP 5,0–5,4 s), só informativo, não representa o host. HTML da página de projeto: `<link rel="preload" as="image" href="/projetos/projeto-1.svg" fetchPriority="high"/>` e `<img ... fetchPriority="high">` na capa. |
| BUG-02 | corrigido (confirmado no ciclo 2) | 0 `a[href^="mailto:"]` e 0 `a[href=""]` em home, 3 projetos e 404. Contato mostra o botão WhatsApp (`/#contato`, visível); lista "Redes e contato" ausente (Hero/Footer) com contatos placeholder — comportamento aceito. |
| BUG-03 | corrigido (confirmado no ciclo 2) | Nome do header `scrollWidth` 188 = sem reticências em 375/768/1024/1440 (home, projeto, 404). `scrollWidth <= innerWidth` em todas (12 combinações). |
| BUG-04 | corrigido (confirmado no ciclo 2) | 375 px: fechado = sem `aria-controls` e sem `#menu-mobile`; aberto = `aria-controls="menu-mobile"`, painel presente, foco em "Sobre", `main` e `footer` `inert`; Tab em loop (…Fale comigo → botão → Sobre…), Shift+Tab volta; Esc fecha, foco volta ao botão, `aria-controls` some, `inert` sai. |

### Regressão
| Item | Status | Evidência |
|---|---|---|
| Build / lint / typecheck | ✅ | Limpos. |
| Home, 3 projetos, 404 | ✅ | 1 `h1` cada, title próprio, 0 imagens sem alt, `lang="pt-BR"`; `/projetos/xyz/` responde 404 com "Página não encontrada". |
| Skip link | ✅ | 1º Tab = "Pular para o conteúdo"; Enter foca `#conteudo`. |
| Filtro | ✅ | Todos 3, Next.js 2, Node.js 1, React 2, Tailwind CSS 2, TypeScript 2; `aria-pressed` correto. |
| Reduced motion | ✅ | `reduce`: 0 elementos com opacidade 0, `scroll-behavior: auto`, 0 animações ativas. |
| Console | ✅ | 0 erros/exceções. |
| Contraste | ✅ | 507 amostras (home 1440/375, projeto, 404): só 2 abaixo de 4,5 (mesmo falso positivo "Tailwind CSS" sob o header fixo, 1,43:1, já documentado). Mínimos reais: muted 7,13:1 no topo do Hero (5,86:1 em chips), acento 4,68–4,99:1, on-accent 5,36:1. Tokens do brilho inalterados (`globals.css`: 22% / 18%), logo o pior pixel do muted continua o do ciclo 1 (≥ 4,54:1). |

Servidores (`serve`, servidor estático local) e Chrome headless encerrados; nenhum arquivo do projeto alterado além deste relatório.

### Como rodar (ciclo 2)
```
npm run lint && npm run typecheck && npm run build
npx serve out -l 5055        # comprime com gzip por padrão
npx lighthouse http://localhost:5055/projetos/projeto-exemplo-1/ --only-categories=performance
```

## Ciclo 1 — 2026-11-20
**Build:** passou (`npm run build`; 9 páginas estáticas; `out/` com `index.html`, `404.html`, `sitemap.xml`, `robots.txt`, `og.png`, 3x `projetos/<slug>/index.html`). Aviso esperado: `NEXT_PUBLIC_SITE_URL` não definida (usa URL placeholder).
**Lint / typecheck:** `npm run lint` limpo; `npm run typecheck` limpo.
**Testes automatizados:** nenhum arquivo de teste adicionado ao projeto (regra: sem dependência nova, `package.json` intocado). A verificação foi feita por scripts descartáveis (Chrome headless via DevTools Protocol, servidor estático local do `out/`, Lighthouse via `npx` fora do projeto), executados fora do repositório.
**Resultado geral:** APROVADO COM RESSALVAS

Resumo: 66 critérios — 65 passaram, 1 falhou (CA-NF.8, só nas páginas de projeto), 0 não testáveis. 0 críticos, 0 altos, 1 médio, 3 baixos.

### Ambiente e método
- Chrome headless (Windows) com CDP: viewports 360, 375, 768, 1024, 1440 (e 1920 no contraste), teclado real (`Input.dispatchKeyEvent`), `Emulation.setEmulatedMedia` (reduced motion), `setScriptExecutionDisabled` (sem JS).
- Servidor estático local do `out/` imitando Cloudflare Pages (`/x/` → `index.html`, rota inexistente → `404.html` com status 404).
- Lighthouse (`npx lighthouse@latest`, mobile, throttling padrão) na home e em `/projetos/projeto-exemplo-{1,2}/`.
- Contraste medido por pixels reais: texto ocultado por CSS, screenshot, pixel mais claro/escuro sob cada retângulo de texto (518 amostras em home 1440/375, projeto e 404) e varredura do pixel mais claro do brilho violeta por viewport.
- Testes mutantes em `src/data/projetos.ts` (URL inválida; projeto 4 novo); arquivo restaurado (diff idêntico ao original) e build refeito.
- Servidores e navegadores encerrados; nenhum arquivo do projeto alterado além deste relatório.

### Critérios de aceite
| ID | Critério | Status | Evidência |
|---|---|---|---|
| CA-01.1 | Hero com nome, cargo, proposta de `perfil.ts` | ✅ | `h1` = "[PREENCHER] Seu nome"; cargo/proposta presentes; `<title>` e description vêm de `perfil.ts`. |
| CA-01.2 | Botões "Ver projetos" e "Fale comigo" | ✅ | Presentes no Hero (tab order: Ver projetos, Fale comigo). |
| CA-01.3 | Âncoras para Projetos / Contato | ✅ | `href="/#projetos"` e `/#contato`; clique rola até a seção (h2 abaixo do header de 64 px). |
| CA-01.4 | Nome é o único `h1` da home | ✅ | 1 `h1` em todas as 5 páginas × 5 larguras. |
| CA-02.1 | Texto + foto `next/image` com alt descritivo | ✅ | `<img src="/foto.svg" alt="[PREENCHER] Foto de rosto de...">`, `data-nimg`, 800 px natural. |
| CA-02.2 | "Baixar CV" → `/cv.pdf` | ✅ | `<a href="/cv.pdf" download>`. |
| CA-02.3 | `public/cv.pdf` existe e responde 200 no dev | ✅ | `next dev` porta 3199: `/cv.pdf` 200; PDF 1.4 válido. |
| CA-03.1 | Grid de cards com imagem, título, resumo, tags, demo/GitHub | ✅ | 3 cards com `h3`, capa, tags; links Demo/GitHub quando existem. |
| CA-03.2 | 3 projetos de exemplo "[PREENCHER]" | ✅ | `projetos.ts`, 3 itens. |
| CA-03.3 | "Todos" + 1 opção por tecnologia dos dados | ✅ | Chips: Todos, Next.js, Node.js, React, Tailwind CSS, TypeScript (gerados de `tagsDosProjetos`). Projeto novo com tag "Python" criou o chip (teste mutante). |
| CA-03.4 | Filtro só mostra projetos com a tag, no client | ✅ | Next.js→2, Node.js→1, React→2, Tailwind→2, TypeScript→2, Todos→3; sem recarregar a página; cards removidos do DOM após o fade (200 ms). |
| CA-03.5 | Filtro por teclado e `aria-pressed` | ✅ | Tab chega aos chips; Enter aplica o filtro; `aria-pressed` muda; ícone Check + `aria-live` ("1 projeto"). |
| CA-03.6 | Estado vazio | ✅ | Inspeção de código (`ProjetosGrid.tsx`): "Nenhum projeto com essa tecnologia ainda." + botão "Ver todos". Não alcançável com os dados reais (tags vêm dos dados); o desenvolvedor também testou com estado temporário. |
| CA-03.7 | Card leva a `/projetos/[slug]` | ✅ | `href="/projetos/projeto-exemplo-N/"` nos 3 cards. |
| CA-03.8 | `next/image`, alt, arquivos locais em `public/projetos/` | ✅ | 4 `<img>` com alt descritivo, src `/projetos/projeto-N.svg`; nenhuma URL externa. |
| CA-04.1 | Rota por projeto, `generateStaticParams` | ✅ | Build lista 3 rotas SSG; `out/projetos/projeto-exemplo-{1,2,3}/index.html`. Projeto 4 temporário gerou a 4ª página sem outra edição. |
| CA-04.2 | Problema, solução, stack, papel, resultados, galeria | ✅ | h2: Meu papel, Stack, Problema, Solução, Resultados, Galeria (só projeto 1; 2 e 3 omitem, conforme premissa). |
| CA-04.3 | `generateMetadata` própria | ✅ | title, description, canonical e `og:*` próprios por projeto (OG image única `og.png`, decisão do usuário). |
| CA-04.4 | Slug inexistente → 404 | ✅ | `/projetos/xyz/` → 404 (dev e servidor do `out/`), `h1` "Página não encontrada", `noindex`; `dynamicParams=false`. |
| CA-04.5 | Link para voltar a Projetos | ✅ | "Voltar para projetos" → `/#projetos` (2x). |
| CA-04.6 | Slugs no sitemap | ✅ | `out/sitemap.xml` com 4 URLs (home + 3 projetos), barra final. |
| CA-05.1 | `Projeto` tipado com todos os campos | ✅ | Interface + `typecheck` limpo. |
| CA-05.2 | Novo objeto reflete em card, filtro, página, sitemap | ✅ | Teste mutante: projeto `projeto-teste-qa` apareceu no card, chip "Python", `out/projetos/projeto-teste-qa/index.html` e sitemap. Revertido e rebuild feito. |
| CA-05.3 | README explica o passo a passo | ✅ | Seção "Como adicionar um projeto". |
| CA-06.1 | 3 cards de serviço | ✅ | Landing page, Site institucional, Sistema web (`h3` + descrição). |
| CA-06.2 | "Solicitar orçamento" leva ao contato/WhatsApp | ✅ | Com número placeholder: `/#contato` (3 botões); com número real gera `wa.me` com texto (verificado pelo desenvolvedor, leitura de `links.ts` confere). |
| CA-07.1 | Stack agrupada por categoria, dados em `src/data/` | ✅ | Front-end, Back-end, Ferramentas (`stack.ts`). |
| CA-07.2 | Título e `ul/li` | ✅ | `h3` + `ul/li` por categoria (4 `ul` em `#stack`). |
| CA-08.1 | Botões mailto, wa.me, LinkedIn, GitHub de `perfil.ts` | ✅ | Com placeholders: WhatsApp (`/#contato`) e E-mail (`mailto:`); LinkedIn/GitHub omitidos (regra aprovada). Com valores reais são renderizados (código, `ehUrlExterna`). Ver BUG-02. |
| CA-08.2 | Externos com `rel="noopener noreferrer"` | ✅ | 4 links `http(s)` na home e os da página de projeto: todos `target="_blank" rel="noopener noreferrer"`. |
| CA-08.3 | Sem formulário nem API | ✅ | 0 `form`/`input`; `src/app/api` não existe; sem `fetch`/analytics em `src/`. |
| CA-08.4 | Ícone-botão com rótulo acessível | ✅ | Botão do menu: `aria-label` "Abrir/Fechar menu"; demais têm texto visível ou `sr-only`. Lighthouse a11y 100. |
| CA-09.1 | Header fixo com âncoras | ✅ | `position: fixed; top: 0` após rolar 3336 px; links /#sobre, /#projetos, /#servicos, /#stack, /#contato. |
| CA-09.2 | Hambúrguer < 768 px com aria-expanded/controls | ✅ | 375 px: botão 44×44, nav desktop oculta; `aria-expanded` false→true, `aria-controls="menu-mobile"`. Ver BUG-04. |
| CA-09.3 | Menu fecha ao clicar link e com Esc | ✅ | Esc fecha e devolve foco ao botão; clique em "Serviços" fecha, navega para `#servicos`, libera rolagem e `inert`; redimensionar para 1024 px fecha. |
| CA-09.4 | Header em `/projetos/[slug]` leva a `/#âncora` | ✅ | Links `/#inicio /#sobre /#projetos /#servicos /#stack /#contato`. |
| CA-09.5 | Skip link é o primeiro focável | ✅ | 1º Tab = "Pular para o conteúdo"; Enter move o foco para `main#conteudo` (`tabindex=-1`). |
| CA-09.6 | Âncoras não ficam sob o header | ✅ | Header 64 px; topo da seção em 80 px (`scroll-margin-top: 80px`) em sobre/projetos/servicos/stack/contato. |
| CA-09.7 | Footer com redes e ano calculado | ✅ | "© 2026 …", E-mail, "Voltar ao topo"; LinkedIn/GitHub omitidos com placeholder; ano via código (`getFullYear`). |
| CA-10.1 | Cores base | ✅ | `body` bg `rgb(10,10,10)`, texto `rgb(237,237,237)`; tokens `surface #141414`, `border #262626`, `muted #a1a1a1` em `globals.css`. |
| CA-10.2 | Acento único como token | ✅ | `#8b6cff` só em `globals.css:16` (nenhum hex em `src/**/*.ts(x)`); decisão do usuário (#8b6cff no lugar de #7c5cff). |
| CA-10.3 | Geist via `next/font`, corpo ≥ 16 px, títulos pesados | ✅ | `font-family: Geist…`; corpo 16 px; `h1` 72 px / peso 800. |
| CA-10.4 | 1152 px, `py-24`, cards com borda | ✅ | `max-width: 1152px`; seção `padding 96px/96px` em 1440. |
| CA-10.5 | Animações ≤ 400 ms | ✅ | Maior transição/animação CSS = 0,2 s; Reveal 360 ms (limite 400 ms em código). |
| CA-10.6 | `prefers-reduced-motion` desliga animações | ✅ | Emulado `reduce`: 0 elementos escondidos ao carregar, `scroll-behavior: auto`, 0 animações CSS, filtro instantâneo (2 cards a +0 ms). Sem JS: 0 escondidos. Movimento normal: escondidos até rolar (esperado), 0 após rolar. 0 erros de console. |
| CA-NF.1 | `lang="pt-BR"` | ✅ | `<html lang="pt-BR">`. |
| CA-NF.2 | Metadata e Open Graph | ✅ | Home e projeto: title, description, og:title/description/url/image(+type/width/height/alt), twitter. Imagem `og.png` 1200×630 PNG existe. |
| CA-NF.3 | sitemap e robots | ✅ | `sitemap.xml` (home + 3) e `robots.txt` com `Sitemap:`. |
| CA-NF.4 | Hierarquia de headings | ✅ | h1 → h2 por seção → h3 em cards/categorias; projeto: h1 → h2. |
| CA-NF.5 | URL base em constante/env documentada | ✅ | `src/lib/site.ts`, `.env.example`, README seção "URL do site"; aviso no build quando falta. |
| CA-NF.6 | Imagens com `next/image` e alt | ✅ | 4 imagens na home, todas com alt descritivo; nenhuma `<img>` sem alt. |
| CA-NF.7 | Sem imagens externas | ✅ | Nenhum `src="http…"`/`url(http…)` no HTML gerado. |
| CA-NF.8 | Lighthouse mobile Performance ≥ 90 | ❌ (ciclo 1; ✅ no ciclo 2: 96–97 com gzip) | Home: 99 e 100 (LCP 1,4 s, CLS 0). `/projetos/projeto-exemplo-1/`: 82 (e 82); `-2/`: 81 (LCP simulado 5,1–5,2 s). Ver BUG-01. |
| CA-NF.9 | Sem scroll horizontal 375/768/1440 | ✅ | `scrollWidth <= innerWidth` em 360/375/768/1024/1440 para home, 3 projetos e 404 (25 combinações) e nenhum elemento além da borda. |
| CA-NF.10 | 1 coluna em 375 px, sem texto cortado | ✅ | Projetos e Serviços em 1 coluna a 375 px (2/1 a 768; 3/3 a 1440); nenhum texto cortado. Único truncamento: logo a 768 px (BUG-03). Alvos de toque ≥ 40 px. |
| CA-NF.11 | HTML semântico | ✅ | 1 `header`, `nav`, `main`, `footer`; 6 `section` com `aria-labelledby`. |
| CA-NF.12 | Foco visível | ✅ | `outline` sólido 2 px `rgb(139,108,255)` em skip link, links, botões. Card de projeto: anel no `::after` do card. |
| CA-NF.13 | Contraste ≥ 4,5:1 | ✅ | Ver tabela de contraste abaixo. 0 falhas reais em 518 amostras; pior caso medido do brilho: muted 4,54:1 (1920×1080) e 4,62–4,67:1 (360–1440). |
| CA-NF.14 | Teclado completo | ✅ | Ordem: skip → logo → 5 links → Fale comigo → Hero → E-mail → CV → chips → cards/Demo/GitHub…; menu mobile com foco preso (Tab/Shift+Tab em loop), `main`/`footer` `inert`, Esc fecha. |
| CA-NF.15 | Lighthouse Acessibilidade ≥ 95 | ✅ | 100 na home e nas páginas de projeto. |
| CA-NF.16 | `npm run build` sem erros | ✅ | Passou (também após os testes mutantes revertidos). |
| CA-NF.17 | `npm run lint` sem erros | ✅ | Limpo. |
| CA-NF.18 | Dev sobe e renderiza tudo | ✅ | `next dev -p 3199`: `/`, 3 projetos, `/cv.pdf` → 200; `/projetos/xyz/` → 404. |
| CA-NF.19 | Só `framer-motion` e `lucide-react` extras | ✅ | `package.json`: `next`, `react`, `react-dom` + as 2 extras; devDependencies do template (tailwind, eslint, typescript). |
| CA-NF.20 | Sem backend/API/analytics | ✅ | Sem `src/app/api`, sem `fetch`, sem scripts de terceiros. |
| CA-NF.21 | README em pt-BR com os 4 tópicos | ✅ | Como rodar, adicionar projeto, trocar acento, deploy (Cloudflare Pages, equivalente ao pedido de Vercel). |

Contagem: 65 ✅ / 1 ❌ / 0 ⚠️ (HU-01..10 = 45 critérios; CA-NF = 21).

### Contraste (CA-NF.13), medido sobre o fundo real renderizado
| Combinação | Pior razão medida | Mínimo |
|---|---|---|
| fg `#ededed` (topo do Hero, ponto mais claro do brilho) | 10,0–10,3:1 (1920/1440/768/375) | 4,5 |
| muted `#a1a1a1` sobre o ponto mais claro do brilho | 4,54:1 (1920×1080), 4,62:1 (768), 4,63:1 (1440), 4,67:1 (375) | 4,5 |
| muted em texto real (retângulos de texto, todas as rolagens) | 5,86:1 (chips sobre borda) / 7,13:1 (topo do Hero) | 4,5 |
| acento `#8b6cff` em texto sobre `surface` | 4,99:1 | 4,5 |
| acento em texto sobre fundo com brilho (ex.: "Voltar para projetos") | 4,68:1 | 4,5 |
| `on-accent #0a0a0a` sobre botão acento | 5,36:1 | 4,5 |
Nota: a margem do muted no pior pixel do brilho é de ~0,04 a 0,17; não aumentar a intensidade do brilho (22% / 18%) sem remedir. Uma amostra "Tailwind CSS" (1,43:1) é falso positivo: o texto estava sob o header fixo no momento do screenshot.

### Verificações gerais
| Área | Status | Observações |
|---|---|---|
| Links | ✅ | 0 links `href` com "[PREENCHER]"; externos com `rel`; âncoras existem; CV com `download`. `mailto:` vazio com placeholder (BUG-02). |
| Formulários | ✅ | Não há formulários (CA-08.3). |
| Validação em build | ✅ | `githubUrl: "github.com/x"` → build falha: `URL inválida em src/data/projetos.ts: - projeto-exemplo-1.githubUrl = "github.com/x" precisa começar com http:// ou https://`. Revertido. |
| Responsividade | ✅ | Ver CA-NF.9/10; menu mobile OK. |
| Acessibilidade | ✅ | Skip link, foco, menu com foco preso, `aria-pressed`, `aria-live`; Lighthouse 100. |
| SEO | ✅ | Lighthouse SEO 100; title/description únicos; canonical; OG; sitemap; robots; favicon; 404 `noindex`. Atenção: sem `NEXT_PUBLIC_SITE_URL` canonical/sitemap usam `https://portfolio-placeholder.pages.dev`. |
| Performance | ⚠️ | Home 99–100. Páginas de projeto 81–82 (BUG-01). JS ~772 KB em `chunks` (disco), 803 KiB transferidos na home; fontes 184 KB; imagens SVG < 1 KB. |
| Sem JS | ✅ | Conteúdo visível (0 elementos escondidos), 3 cards e 3 serviços no HTML. |

### Bugs
#### BUG-01 — Páginas `/projetos/[slug]` abaixo de 90 no Lighthouse mobile
- **Severidade:** média
- **Onde:** `/projetos/projeto-exemplo-1/`, `-2/`, `-3/` (`src/app/projetos/[slug]/page.tsx`)
- **Passos para reproduzir:**
  1. `npm run build` e servir `out/`.
  2. `npx lighthouse http://localhost:<porta>/projetos/projeto-exemplo-1/ --only-categories=performance` (mobile padrão).
- **Resultado esperado:** Performance ≥ 90 (CA-NF.8).
- **Resultado obtido:** 82, 82 e 81 (uma execução com 51 por TBT alto, ruído). LCP simulado 5,1–5,2 s; elemento LCP é a capa (`img` 16:10 com `priority`); com throttling DevTools LCP = FCP = 2,6 s e TBT 660 ms. A home fica em 99–100. O relatório do Lighthouse indica `fetchpriority=high` ausente na capa (preload existe). Possível melhora: `fetchPriority="high"` na capa e reduzir JS carregado na página de projeto (framer-motion/Reveal).
- **Critério relacionado:** CA-NF.8
- **Status:** corrigido (confirmado no ciclo 2) — nota do desenvolvedor: capa com `preload` + `fetchPriority="high"` (no Next 16.4.6 `priority` está depreciado em favor de `preload`; conferido em `node_modules/next/dist/shared/lib/get-img-props.d.ts`). O HTML de `out/` agora tem `<link rel="preload" as="image" ... fetchPriority="high">` e `fetchpriority="high"` no `<img>`; a auditoria "LCP request discovery" passa. Causa principal do LCP alto: no Lighthouse 13.6 o Lantern só usa o grafo barato (o do FCP) quando o LCP é **texto** pintado no FCP, que é o caso da home. Com LCP de **imagem**, todo script baixado antes do LCP entra no grafo, e os ~580 KB de JS **sem compressão** do servidor de teste davam LCP simulado de 5 s. Testado e descartado: o LCP não muda sem a capa, sem o blur do header, sem o brilho de fundo nem sem o prefetch dos links. Medição (Lighthouse 13.6, mobile, `out/` servido no scratchpad), antes/depois: servidor sem compressão 80–82 / 80–82 (LCP 5,0–5,4 s); servidor com gzip, como o Cloudflare Pages serve: **97 / 97 / 97** nos 3 projetos (LCP 2,7 s, FCP 0,8 s, TBT 40–60 ms, CLS 0) e home 100. Re-testar servindo `out/` **com compressão** (ex.: `npx serve out`, que comprime por padrão)

#### BUG-02 — Link `mailto:` vazio com e-mail placeholder
- **Severidade:** baixa
- **Onde:** Hero, Contato e Footer (`src/lib/links.ts`)
- **Passos para reproduzir:** abrir a home com `perfil.contatos.email = "[PREENCHER]"` e clicar em "E-mail".
- **Resultado esperado:** link omitido ou desabilitado (como LinkedIn/GitHub).
- **Resultado obtido:** `<a href="mailto:">` abre o cliente de e-mail sem destinatário. Desaparece quando o usuário preencher o e-mail; comportamento previsto no design/arquitetura para placeholder.
- **Critério relacionado:** CA-08.1
- **Status:** corrigido (confirmado no ciclo 2) — nota do desenvolvedor: `mailtoUrl` (`src/lib/links.ts`) devolve `null` quando o e-mail não está preenchido (`ehPreenchido`). `redesDoPerfil` e o Contato só incluem o e-mail se houver link. `RedesSociais` não renderiza nada com a lista vazia (Hero e Footer ficam sem a lista enquanto e-mail, LinkedIn e GitHub forem placeholder). O Contato mantém o botão WhatsApp (fallback `/#contato`). Conferido no Chrome: 0 `href^="mailto:"` na home e no projeto

#### BUG-03 — Logo truncado com reticências a 768 px (nome placeholder)
- **Severidade:** baixa
- **Onde:** Header (`span.truncate`)
- **Passos para reproduzir:** viewport 768 px, home: texto "[PREENCHER] Seu nome" tem 188 px e a caixa 178 px.
- **Resultado esperado:** nome completo visível.
- **Resultado obtido:** truncado. Provavelmente some com nome real mais curto; nomes longos podem truncar nessa largura.
- **Critério relacionado:** CA-NF.10
- **Status:** corrigido (confirmado no ciclo 2) — nota do desenvolvedor: no `Header.tsx`, os links da navegação usam `px-2` em md e `lg:px-3` em lg, e o item "Fale comigo" usa `ml-1 lg:ml-2`. Libera ~44 px a 768 px. Conferido no Chrome: nome 188/188 px (sem reticências) a 768 e 1024 px. Sem scroll horizontal a 375/768/1024/1440. O `truncate` continua como proteção para nomes bem mais longos

#### BUG-04 — `aria-controls` aponta para id inexistente com o menu fechado
- **Severidade:** baixa
- **Onde:** `src/components/layout/MobileMenu.tsx`
- **Passos para reproduzir:** viewport 375 px, inspecionar o botão: `aria-controls="menu-mobile"` e `document.getElementById('menu-mobile')` é `null` até abrir.
- **Resultado esperado:** id existente (ou `aria-controls` só quando aberto).
- **Resultado obtido:** referência pendente; não afeta Lighthouse (100).
- **Critério relacionado:** CA-09.2
- **Status:** corrigido (confirmado no ciclo 2) — nota do desenvolvedor: `aria-controls` só é emitido com o menu aberto (`aria-controls={aberto ? "menu-mobile" : undefined}`). Painel, `AnimatePresence`, foco preso e `inert` não mudaram. Conferido no Chrome a 375 px: fechado = sem `aria-controls` e sem painel; aberto = `aria-controls="menu-mobile"` com o painel presente, foco em "Sobre" e `#conteudo` inerte; Esc = fecha, foco volta ao botão e o inert sai

### Observações (não são bugs)
- Sugestões do code review ainda abertas, confirmadas: CR-06 (`lastmod` muda a cada build), CR-09 (`.gitignore:37-38` com `.vercel`; CA-NF.21 do requisito fala em Vercel), CR-10 (`border-strong` de baixo contraste).
- Página 404 não foi avaliada pelo Lighthouse (status 404 impede a execução); testada manualmente (h1, `noindex`, sem scroll horizontal, contraste).
- Firefox/Safari não testados; apenas Chrome.
- Margem do muted sobre o brilho é mínima (ver nota de contraste).

### Como rodar os testes
Não há testes automatizados no repositório (sem dependência nova). Reprodução manual:
```
npm run lint
npm run typecheck
npm run build
npx serve out          # ou qualquer servidor estático da pasta out/
npx lighthouse http://localhost:3000/ --only-categories=performance,accessibility,seo   # fora do package.json
```
