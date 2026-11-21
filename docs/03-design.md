# Design — Portfólio pessoal (dev web)

Stack: Next.js 16 + Tailwind v4 (tokens em `@theme`) + `framer-motion` + `lucide-react`. Static export no Cloudflare Pages, `images.unoptimized`. Nenhuma dependência nova proposta (ver seção 11).

## 1. Direção visual

**Conceito:** **Terminal Quieto** — dark minimalista com precisão de ferramenta de dev. Superfícies chapadas, linhas finas de 1 px, rótulos de seção em fonte mono ("01 / Sobre") e um único acento violeta usado com parcimônia. Passa a ideia de quem constrói software com cuidado, sem efeitos de vitrine. O acento aparece só em: botão primário, foco, item ativo do filtro, ponto de status e links de texto.

**Palavras-chave:** sóbrio, preciso, legível, silencioso, técnico.

**Elementos de assinatura:**
1. **Rótulo de seção mono numerado** (`01 / Sobre`, Geist Mono, 13 px, `muted`, caixa alta com tracking) acima de cada `h2`. Dá ritmo e cara de "índice de documentação".
2. **Hairlines em vez de sombras:** bordas 1 px `#262626`, divisores horizontais entre seções, cards sem sombra; hover só muda a borda e eleva 2 px.
3. **Selo de status no Hero:** pílula com ponto de acento ("[PREENCHER] Disponível para projetos"), com nota curta sob os botões ("Resposta em até 24 h" placeholder), seguindo a ideia do Taste Skill de pequenos detalhes reais sob o CTA.
4. **Capa de projeto com moldura:** imagem em proporção 16:10 dentro de moldura de 1 px, canto 12 px, leve escurecimento (`brightness .9`) que some no hover.

**O que evitar:** gradiente roxo e texto com gradiente, glassmorphism em cards, três cards de vidro iguais, emojis como ícone, hero centralizado com dois botões genéricos, blobs/glow decorativo, animação em texto letra a letra, sombras coloridas. Hierarquia alinhada à esquerda (Taste Skill).

## 2. Mapa do site

```
/ (home, página única)
├── Header fixo (logo/nome · Sobre · Projetos · Serviços · Stack · Contato · [Fale comigo])
├── #inicio    Hero
├── #sobre     Sobre
├── #projetos  Projetos (filtro + grid) ──► /projetos/[slug]
├── #servicos  Serviços
├── #stack     Stack
├── #contato   Contato
└── Footer (redes · ano)
/projetos/[slug]   Estudo de caso (header e footer iguais; links do header = /#ancora)
/404               not-found
```

Ordem de `h`: home `h1` = nome (Hero); `h2` por seção; `h3` nos cards. Projeto: `h1` = título; `h2` = Problema, Solução, etc.

## 3. Fluxos principais

### Fluxo 1 — Cliente pede orçamento (HU-06, HU-08)
1. Chega pela busca no celular → Hero.
2. Lê proposta, toca "Fale comigo" → rola até Contato (ou: Serviços → "Solicitar orçamento").
3. "Solicitar orçamento" abre WhatsApp em nova aba com mensagem citando o serviço.
4. Alternativa: e-mail em Contato.

### Fluxo 2 — Recrutador avalia (HU-02, HU-03, HU-04)
1. Desktop → Hero → "Ver projetos".
2. Filtra por tecnologia (ex.: Next.js) → abre card → `/projetos/[slug]`.
3. Lê problema, solução, papel, resultados; abre GitHub/demo.
4. "Voltar para projetos" (`/#projetos`) → Sobre → "Baixar CV".

### Fluxo 3 — Navegar por teclado (HU-09)
1. Tab: "Pular para o conteúdo" → links do header → botão "Fale comigo" → conteúdo em ordem visual.
2. No celular: botão de menu → painel abre e foco vai ao 1º link → Esc fecha e devolve o foco ao botão.

## 4. Wireframes (texto)

Largura útil: `Container` = `max-w-site` (1152 px) com `px-4` (<640) / `px-6` (≥640). Seções: `py-16` mobile, `py-24` desktop (md+), com hairline superior `border-t border-border` (exceto Hero).

### Header (todas as páginas)
**Mobile (375 px)** — altura 64 px
```
┌─────────────────────────────┐
│ [Nome ●]              [ ☰ ] │  ☰ = botão 44x44, aria-label "Abrir menu"
└─────────────────────────────┘
```
**Desktop (≥768 px)**
```
┌───────────────────────────────────────────────────────────────┐
│ Nome ●      Sobre  Projetos  Serviços  Stack  Contato [Fale comigo]│
└───────────────────────────────────────────────────────────────┘
```
Fixo, `bg-bg/80` + `backdrop-blur-md`, borda inferior `border-border` (aparece após 8 px de rolagem; sem JS extra: sempre visível, simples). Logo = nome em peso 600 + ponto de acento decorativo (`aria-hidden`). Link "Fale comigo" = botão primário pequeno (h 40 px) só em desktop; no mobile fica dentro do menu.

### Menu mobile (aberto, < 768 px)
```
┌─────────────────────────────┐
│ [Nome ●]              [ ✕ ] │
├─────────────────────────────┤
│ Sobre                       │  links 48 px de altura, texto 20 px / 600
│ ─────────────────────────── │
│ Projetos                    │
│ ─────────────────────────── │
│ Serviços                    │
│ ─────────────────────────── │
│ Stack                       │
│ ─────────────────────────── │
│ Contato                     │
│                             │
│ [ Fale comigo ]  (primário) │
└─────────────────────────────┘
```
Painel `fixed inset-x-0 top-16 bottom-0 bg-bg`, `role="dialog"`? Não: é navegação. Usar `<nav id="menu-mobile" aria-label="Principal">`, botão com `aria-expanded` e `aria-controls="menu-mobile"`. Comportamento:
- Abre: foco vai ao 1º link; `body` com `overflow: hidden` (trava rolagem).
- **Foco preso:** `keydown` Tab/Shift+Tab em loop entre botão de fechar (o próprio botão do header) e os itens do painel; o resto da página recebe `inert` (`main`, `footer`) para leitores de tela.
- **Esc** fecha e devolve o foco ao botão.
- Clicar em link fecha o menu e navega à âncora.
- Ao passar de 768 px com menu aberto, fecha (`matchMedia`).

### Página: Home `/`

#### Hero (`#inicio`)
**Mobile (375)**
```
┌─────────────────────────────┐
│ (● [PREENCHER] Disponível   │  pílula status, 14 px
│    para projetos)           │
│                             │
│ [PREENCHER] Nome            │  h1 40 px / 800, esquerda
│ Desenvolvedor Web           │  cargo 20 px, cor muted
│                             │
│ [PREENCHER] Proposta de     │  18 px, fg, máx. 36ch
│ valor em 1 ou 2 frases.     │
│                             │
│ [ Ver projetos        → ]   │  primário, largura total
│ [ Fale comigo           ]   │  secundário, largura total
│ Resposta em até 24 h        │  nota 14 px muted
│                             │
│ [github] [linkedin] [mail]  │  ícones 44x44 com aria-label
└─────────────────────────────┘
```
**Desktop (1440 → conteúdo 1152)**
```
┌──────────────────────────────────────────────────────────┐
│ (● Disponível para projetos)                             │
│                                                          │
│ [PREENCHER] Nome Sobrenome             ┌────────────┐    │
│ Desenvolvedor Web                      │ cartão de  │    │
│ Proposta em 2 linhas, máx. 52ch        │ "stack"    │    │
│ [Ver projetos →] [Fale comigo]         │ mono (3-4  │    │
│ Resposta em até 24 h                   │ linhas)    │    │
│ [gh] [in] [mail]                       └────────────┘    │
└──────────────────────────────────────────────────────────┘
```
Coluna esquerda 7/12, direita 5/12 (`lg+`). Cartão direito é decorativo (`aria-hidden`): bloco `surface` com texto mono tipo `stack: ["Next.js","TypeScript","Tailwind"]`, valores vindos de `stack.ts` (primeiros itens). Ele evita o "hero vazio" sem foto. Abaixo de `lg` é omitido. Altura mínima do Hero: `min-h-[calc(100svh-4rem)]` só em `lg+`; em mobile `pt-28 pb-16`.
**Textos:** headline = `perfil.nome`; cargo = `perfil.cargo`; proposta = `perfil.proposta`. CTAs: "Ver projetos" (`#projetos`), "Fale comigo" (`#contato`).

#### Sobre (`#sobre`)
**Mobile**
```
01 / Sobre
Sobre mim                     h2 32 px / 800
┌───────────────┐
│  foto 1:1     │  max 280 px, moldura 1 px, raio 12
└───────────────┘
[PREENCHER] parágrafo 1       16-18 px, linha 1.7, máx. 65ch
[PREENCHER] parágrafo 2
[ Baixar CV  ⬇ ]              secundário
```
**Desktop:** grid 12 col: texto 7 col à esquerda, foto 4 col à direita (offset 1), alinhada ao topo. Foto 4:5 em `lg`. Botão CV sob o texto.

#### Projetos (`#projetos`)
**Mobile**
```
02 / Projetos
Projetos
Texto curto (opcional) muted

Filtro (rolagem horizontal DENTRO do contêiner? NÃO: quebra de linha)
[ Todos ] [ Next.js ] [ React ] [ TypeScript ] ...   chips, flex-wrap, gap 8

┌─────────────────────────────┐
│ [capa 16:10]                │
│ Título (h3)                 │
│ Resumo 2-3 linhas           │
│ [Tag] [Tag] [Tag]           │
│ Demo ↗     GitHub ↗         │
└─────────────────────────────┘
(1 coluna)
```
**Desktop:** grid 3 colunas em `lg`, 2 em `md`, 1 em mobile; gap 24 px. Sem scroll horizontal no filtro (flex-wrap).
**Card:** o título (`h3`) contém o link `/projetos/[slug]` com `::after` absoluto cobrindo o card (card inteiro clicável, um único alvo de foco). Links Demo/GitHub ficam acima (`relative z-10`) e têm alvo 44 px de altura. Links ausentes não renderizam.
**Estado vazio:** bloco tracejado `border-dashed`, texto "Nenhum projeto com essa tecnologia ainda." + botão "Ver todos". `aria-live="polite"` na região do resultado ("3 projetos" / "1 projeto") em texto `sr-only`.

#### Serviços (`#servicos`)
**Mobile:** 3 cards empilhados. **Desktop:** 3 colunas iguais, mas **sem ícone em círculo colorido**: ícone Lucide 24 px `muted` alinhado à esquerda, número mono "01" opcional à direita.
```
┌─────────────────────────────┐
│ [icon]                 01   │
│ Landing page (h3)           │
│ Descrição curta [PREENCHER] │
│ ─────────────────────────── │
│ [ Solicitar orçamento ↗ ]   │  secundário, largura total
└─────────────────────────────┘
```
Ícones: `LayoutTemplate` (landing), `Building2` (institucional), `AppWindow` (sistema web). Botão abre WhatsApp (nova aba, `rel`), com `aria-label` não necessário (texto visível), mas incluir `<span class="sr-only"> (abre em nova aba)</span>`.

#### Stack (`#stack`)
**Mobile:** categorias empilhadas; cada uma: `h3` + `ul` de chips (`li`) com flex-wrap. **Desktop:** grid 3 colunas (uma por categoria), hairline vertical entre colunas (`divide-x divide-border`), padding 24 px. Chips sem ícone de marca (evita logos externos): texto 14-15 px, borda 1 px.

#### Contato (`#contato`)
**Mobile**
```
05 / Contato
Vamos conversar?               h2
[PREENCHER] frase curta

[ ✉  E-mail          ]  botões em lista vertical,
[ 💬 WhatsApp         ]  largura total, 56 px de altura (ícones Lucide, sem emoji)
[ in LinkedIn         ]
[ GitHub              ]
```
**Desktop:** 2 colunas: título+frase à esquerda (5 col); à direita (7 col) lista de 4 linhas-link (card `surface`, cada linha 64 px: ícone, rótulo, valor em `muted`, seta `ArrowUpRight`), divididas por hairline. WhatsApp e e-mail em destaque: a 1ª linha (WhatsApp) usa botão primário.
**Regra de placeholder (resolve pendência do Arquiteto):** LinkedIn/GitHub com `[PREENCHER]` são **omitidos** (como definido). Se sobrarem 0 links no Contato, o Desenvolvedor renderiza e-mail e WhatsApp com os fallbacks já previstos (`mailto:` e `/#contato`). Não usar `href="#"` com `aria-disabled`.

#### Footer
**Mobile:** coluna: nome, ícones sociais (44x44, `aria-label`), "© {ano} Nome", "Voltar ao topo ↑". **Desktop:** uma linha: © à esquerda, redes à direita. `border-t border-border`, `py-10`.

### Página: `/projetos/[slug]`
**Mobile (375)**
```
[← Voltar para projetos]       link texto 44 px de altura
03 / Estudo de caso            mono
Título do projeto (h1)         36 px / 800
Resumo 18 px muted
[Tag][Tag][Tag]
[ Ver demo ↗ ] [ GitHub ↗ ]    se existirem

┌─────────────────────────────┐
│ capa 16:10                  │
└─────────────────────────────┘

Meu papel     (h2) texto
Stack         (h2) chips
Problema      (h2) parágrafo
Solução       (h2) parágrafo
Resultados    (h2) lista com marcador de acento (ul)
Galeria       (h2) imagens 1 col (omitida se vazia)

[ ← Voltar para projetos ]  [ Fale comigo ]
```
**Desktop:** cabeçalho com `h1` ocupando 8 col; à direita (4 col) card `surface` "Ficha" (Papel, Stack, links Demo/GitHub), `sticky top-24`. Abaixo: capa em largura total (1152, 16:9); corpo em coluna de leitura 8 col (máx. 68ch) com Problema, Solução, Resultados; galeria em grid 2 colunas. Ordem DOM = ordem de leitura (ficha após o texto no DOM, posicionada à direita via grid; no mobile vem logo após o resumo para entrega rápida; usar `order` com cuidado: a ordem do DOM deve seguir o mobile e o desktop não pode confundir o foco; se confundir, mover a ficha para antes do corpo no DOM).
Final: faixa CTA "Gostou deste projeto? Fale comigo" com botão para `/#contato`.
**Textos:** "Voltar para projetos" (`/#projetos`), seções "Problema", "Solução", "Meu papel", "Stack", "Resultados", "Galeria".

## 5. Design tokens

### Decisão de contraste do destaque
`#7c5cff` mede 4,56:1 sobre `bg`, 4,24:1 sobre `surface` (falha) e 3,7:1 com texto branco (falha). **Solução adotada:** o tom do destaque sobe para **`#8b6cff`** (mesma matiz, mais claro), que passa em todas as combinações usadas, e o texto sobre fundo de acento é **escuro** (`#0a0a0a`). O valor continua um único token trocável; se o usuário trocar para `#7c5cff`, só o texto de acento sobre `surface` falharia (ver tabela "Se trocar o acento"). Branco sobre acento nunca é usado.

### Cores
Valores de contraste calculados pela fórmula WCAG (luminância relativa). L: bg 0,0030; surface 0,0070; border 0,0194; fg 0,846; muted 0,357; accent 0,233.

| Token (Tailwind) | Valor | Uso | Contraste |
|---|---|---|---|
| `--color-bg` | `#0a0a0a` | fundo da página | — |
| `--color-surface` | `#141414` | cards, cartão do hero, painel | — |
| `--color-border` | `#262626` | bordas, divisores (decorativo) | 1,3:1 sobre bg (não carrega informação sozinho) |
| `--color-border-strong` | `#3a3a3a` | borda em hover/foco de chip, campos | 1,7:1 (decorativo; estado também vai por outro sinal) |
| `--color-fg` | `#ededed` | texto principal, títulos | 16,9:1 sobre bg · 15,7:1 sobre surface |
| `--color-muted` | `#a1a1a1` | texto secundário, rótulos mono | 7,7:1 sobre bg · 7,1:1 sobre surface |
| `--color-accent` | `#8b6cff` | link de texto, foco, ponto de status, item ativo | 5,3:1 sobre bg · 5,0:1 sobre surface |
| `--color-on-accent` | `#0a0a0a` | texto sobre fundo de acento (botão primário, chip ativo) | 5,3:1 sobre accent |
| `--color-accent-hover` | `color-mix(in oklab, var(--color-accent) 80%, white)` ≈ `#9d83ff` | hover do botão primário e dos links | texto escuro sobre ele ≈ 6,7:1 |

Resumo das combinações usadas (todas AA):

| Combinação | Razão | Tamanho de texto |
|---|---|---|
| fg / bg | 16,9 | todos |
| fg / surface | 15,7 | todos |
| muted / bg | 7,7 | todos |
| muted / surface | 7,1 | todos |
| accent / bg (links, rótulos) | 5,3 | todos |
| accent / surface (link dentro de card) | 5,0 | todos |
| on-accent / accent (botão primário, chip ativo) | 5,3 | todos |
| on-accent / accent-hover | ≈ 6,7 | todos |
| anel de foco accent / bg e / surface | 5,3 / 5,0 (≥ 3 exigido p/ componente de UI) | — |

Se o usuário trocar o acento, deve conferir: texto `on-accent` sobre o novo acento ≥ 4,5:1 e acento sobre `surface` ≥ 4,5:1. Com `#7c5cff`: 4,56 (ok, justo) e 4,24 (falha em links dentro de cards). O README deve citar isso. Ferramenta sugerida para checar: contraste do DevTools.

Sem gradientes. Sem cor semântica extra (erro/sucesso não aparecem: não há formulário).

### Tipografia
Fonte: **Geist** (sans) e **Geist Mono** (rótulos), ambas via `next/font/google` (self-host, sem dependência extra). Fallback: `system-ui, sans-serif` / `ui-monospace, monospace`. Variáveis `--font-sans` e `--font-mono`.

| Token | Fonte | Mobile / Desktop | Peso | Altura de linha | Tracking |
|---|---|---|---|---|---|
| `display` (h1 Hero) | Geist | 40 px / 72 px (`clamp(2.5rem, 7vw, 4.5rem)`) | 800 | 1.05 | -0.03em |
| `h1-pagina` (projeto) | Geist | 34 px / 52 px | 800 | 1.1 | -0.025em |
| `h2` | Geist | 30 px / 44 px | 800 | 1.15 | -0.02em |
| `h3` | Geist | 20 px / 22 px | 650 | 1.3 | -0.01em |
| `lead` | Geist | 18 px / 20 px | 400 | 1.6 | 0 |
| `corpo` | Geist | 16 px / 17 px | 400 | 1.7 | 0 |
| `pequeno` | Geist | 14 px (mín.; só metadados) | 400/500 | 1.5 | 0 |
| `label-mono` | Geist Mono | 13 px | 500 | 1.4 | 0.08em, caixa alta |

Corpo de leitura nunca abaixo de 16 px. Texto de 14 px apenas em notas e chips (ainda ≥ 4,5:1). Largura de linha: `max-w-[65ch]`.

### Espaçamentos
Escala Tailwind (4 px): 4, 8, 12, 16, 24, 32, 48, 64, 96. Seção `py-16` (mobile) / `py-24` (md+). Cabeçalho da seção → conteúdo: 40 px mobile / 56 px desktop. Gap de grids: 24 px. Padding de card: 20 px mobile / 24 px desktop.

### Outros
- Raios: `--radius-sm` 6 px (chips, tags), `--radius-md` 8 px (botões), `--radius-lg` 12 px (cards, imagens). Pílula de status: 9999 px.
- Sombras: nenhuma. Profundidade por borda e superfície.
- Bordas: 1 px sempre.
- Container: `--container-site: 72rem`.
- Altura do header: 64 px; `scroll-mt-20` nas seções (80 px).
- Breakpoints (Tailwind padrão): `sm` 640, `md` 768, `lg` 1024, `xl` 1280.
- Duração: `--dur-fast` 150 ms, `--dur-base` 250 ms, `--dur-enter` 360 ms. Easing: `--ease-out: cubic-bezier(0.22, 1, 0.36, 1)`.
- Foco global: `:focus-visible { outline: 2px solid var(--color-accent); outline-offset: 3px; border-radius: inherit }`. Sem `outline: none` em nada.
- Seleção de texto: `::selection { background: var(--color-accent); color: var(--color-on-accent) }`.
- Fundo do Hero: sem imagem. Opcional, apenas CSS: grade de linhas de 1 px (`#ffffff` a 4% de opacidade, células 48 px) com `mask-image: radial-gradient` para esmaecer nas bordas. Estático (sem animação), `aria-hidden`.
- **Brilho violeta suave (mudança de 2026-11-20, pedido do usuário no Checkpoint 4):** o fundo deixou de ser só liso. Tokens `--color-glow` = `color-mix(in oklab, var(--color-accent) 16%, transparent)` e `--color-glow-soft` = idem a 10% (em `@theme static` no `globals.css`; derivam do acento, então mudam junto com ele; a intensidade se ajusta só ali). Hero: `radial-gradient(ellipse 90% 65% at 50% 0%, glow, transparent 70%)` no topo; a grade continua, agora esmaecendo a partir do topo central (sob o brilho) em vez do canto superior esquerdo. Contato: `radial-gradient(ellipse 80% 75% at 50% 100%, glow-soft, transparent 70%)`, vindo de baixo, mais fraco. Camadas estáticas, `aria-hidden`, `pointer-events-none`, dentro de seção `relative overflow-hidden` (sem scroll horizontal). Contraste no ponto mais claro (≈ `#1f1a31`, topo do Hero): fg 14,3:1, muted 6,5:1 (AA). Isso substitui o "Sem gradientes" da seção de cores apenas para estes dois brilhos decorativos.
- **Brilho no site inteiro (ajuste de 2026-11-20, Checkpoint 4: "é para ficar no projeto todo"):** o brilho específico do Contato (e a prop `fundo` do `Section`) saiu; no lugar, uma camada global fixa na viewport (`body::before` em `globals.css`, `position: fixed; inset: 0; z-index: -1; pointer-events: none`, com `isolation: isolate` no `body`) com três luzes difusas de `--color-glow-soft` alternando os lados: `ellipse 60% 45% at 12% 8%`, `ellipse 55% 50% at 95% 50%`, `ellipse 65% 45% at 30% 100%` (todas até `transparent 70%`). Ela acompanha a rolagem em todas as seções da home, em `/projetos/[slug]` e na 404. O brilho do topo do Hero (16%, com a grade) continua sendo o ponto mais forte. Cards/superfícies seguem opacos (`surface`); o header (`bg/80` + blur) segue legível. Só gradientes, sem animação nem `filter: blur`. Pior caso de contraste (Hero 16% + global 10% somados, ≈ `#2a2246`): fg 12,7:1, muted 5,7:1 (AA).

## 6. Componentes

### Button (`ui/Button`)
Altura: 48 px (padrão), 40 px (`sm`, só no header desktop). Raio 8 px. Padding x: 20 px. Texto 16 px / 600. Ícone Lucide 18 px à direita, `aria-hidden`.

| Variante | Normal | Hover | Foco | Ativo (pressionado) | Desabilitado/`aria-disabled` |
|---|---|---|---|---|---|
| Primário | bg `accent`, texto `on-accent` | bg `accent-hover`, ícone desloca 2 px à direita | anel de acento 2 px, offset 3 px | `scale(0.98)`, bg `accent` | opacidade .5, sem hover, `cursor-not-allowed` |
| Secundário | bg transparente, borda `border-strong`, texto `fg` | bg `surface`, borda `muted` | idem | `scale(0.98)` | idem |
| Ghost / link | sem borda, texto `accent`, sublinhado em hover | sublinhado + `accent-hover` | idem | — | idem |

Regras: um primário por área visível; links externos com `rel="noopener noreferrer"` e ícone `ArrowUpRight` + texto `sr-only` "(abre em nova aba)"; em mobile, no Hero, Serviços e Contato os botões ocupam largura total.

### Tag (`ui/Tag`)
Não interativa. `bg surface`, borda `border`, texto `muted` 13-14 px, raio 6 px, padding 4x10. Em card sobre `surface`, usar `bg bg` para manter diferença (muted/bg 7,7:1).

### Chip de filtro (`ProjetosGrid`)
`<button type="button" aria-pressed>` dentro de `<div role="group" aria-label="Filtrar projetos por tecnologia">`. Altura 44 px, padding x 16 px, raio 9999 px, texto 15 px / 500.

| Estado | Visual |
|---|---|
| Normal | borda `border-strong`, texto `fg`, fundo transparente |
| Hover | fundo `surface`, borda `muted` |
| Foco | anel de acento 2 px, offset 3 px |
| Ativo (`aria-pressed="true"`) | fundo `accent`, texto `on-accent` (5,3:1), peso 600 e ícone `Check` 16 px à esquerda: o estado não depende só da cor |
| Pressionado | `scale(0.97)` |

Teclado: Tab entre chips; Enter/Espaço ativam. Sem setas de roving (são botões, não tablist).

### Card de projeto (`ProjetoCard`)
`bg surface`, borda `border`, raio 12 px, overflow hidden. Capa 16:10 (`next/image` com `fill`, `sizes="(min-width:1024px) 33vw, (min-width:768px) 50vw, 100vw"`). Corpo padding 20 px: `h3` 20 px, resumo `muted` 16 px (3 linhas máx., `line-clamp-3`), tags, linha de links.
- Hover: borda `border-strong`, `translateY(-2px)`, capa `brightness(1)`; transição 200 ms em `transform` e `border-color`.
- Foco (no link do título): anel de acento ao redor do card inteiro (`focus-visible` no link com `::after` herdando o raio; usar `outline` no `a` e `outline-offset: -2px` se o `overflow` cortar).
- Ativo: `translateY(0)`.
- Texto "Ver estudo de caso →" opcional sob o resumo, `accent`, 15 px.

### Card de serviço
Mesmo estilo do card de projeto, sem imagem; hover igual. Botão ao fim com `margin-top: auto` (cards de mesma altura via `flex flex-col`).

### Header / Nav link
Link: texto 15 px / 500 `muted`; hover `fg`; foco com anel; página atual não aplica (home única com âncoras; sem scrollspy no v1, para economizar JS). Alvo mínimo de 44 px de altura (padding vertical).

### Botão de menu (mobile)
44x44, ícones `Menu`/`X` 24 px, `aria-label` "Abrir menu"/"Fechar menu", `aria-expanded`, `aria-controls`. Raio 8 px, hover `surface`.

### Section (`ui/Section`)
`<section id aria-labelledby>`; hairline superior; cabeçalho: `label-mono` ("01 / Sobre", `aria-hidden` porque o `h2` já nomeia) + `h2`. `scroll-mt-20`.

### Linha de contato
`<a>` 64 px, ícone 20 px, rótulo `fg` 16 px / 600, valor `muted` 14 px, seta `ArrowUpRight`. Hover: fundo `bg` e seta desloca 2 px; foco: anel interno (`outline-offset: -2px`).

### Skip link
Primeiro filho do `body`; invisível até receber foco; então fixo em `top-4 left-4`, botão primário, `z-[100]`. Texto "Pular para o conteúdo" → `#conteudo`.

## 7. Comportamento responsivo

| Largura | Mudanças |
|---|---|
| 375 px (base) | 1 coluna; header com menu; Hero sem cartão decorativo; botões em largura total; chips de filtro quebram de linha; h1 40 px; padding lateral 16 px |
| 640 px (`sm`) | padding lateral 24 px; botões do Hero lado a lado (largura automática) |
| 768 px (`md`) | menu desktop no header; projetos 2 colunas; Sobre em 2 colunas; seções `py-24`; h2 40 px |
| 1024 px (`lg`) | projetos 3 col; Serviços 3 col; Stack 3 col; Hero com cartão decorativo; ficha lateral sticky na página de projeto |
| 1440 px | conteúdo travado em 1152 px, centralizado; fundo continua `bg`; header usa o mesmo container |

Regras anti-scroll horizontal: `min-w-0` em itens de grid/flex com texto; `overflow-wrap: anywhere` em valores longos (e-mail, URLs); imagens `max-w-full`; nenhum elemento com largura fixa maior que 100%; grade decorativa do Hero dentro de contêiner `overflow-hidden`. Imagens com `object-cover`; capa mantém proporção por `aspect-[16/10]`.
Tipografia fluida só no `display` (`clamp`). Em 375 px, e-mail longo quebra de linha.

## 8. Imagens e ícones

- **Capas de projeto:** 16:10, 1280x800 máx., WebP ≤ 150 KB (com `images.unoptimized` o arquivo vai como está). Placeholders SVG: fundo `#141414`, mockup simplificado de janela (barra com 3 pontos e blocos de `#262626`) e uma linha de acento `#8b6cff`; sem texto embutido.
- **Galeria:** mesma proporção ou livre (mantendo `width`/`height` do dado), raio 12 px, moldura 1 px.
- **Foto de perfil:** 4:5, WebP ≤ 120 KB; tratamento: moldura 1 px e raio 12 px, sem filtro colorido. Placeholder `foto.svg` em tons de cinza. Se o usuário usar foto de banco livre ou de terceiros, creditar no rodapé (CC BY) conforme orientação do Taste Skill; foto própria dispensa.
- **`alt`:** capas e fotos descritivos; imagem puramente decorativa `alt=""`.
- **Ícones:** `lucide-react`, importação nomeada, traço 1.75, 20-24 px, `aria-hidden` quando há texto. Lista: `Menu`, `X`, `ArrowRight`, `ArrowUpRight`, `ArrowLeft`, `ArrowUp`, `Download`, `Mail`, `MessageCircle` (WhatsApp), `Github`, `Linkedin`, `Check`, `LayoutTemplate`, `Building2`, `AppWindow`. Verificar no momento da instalação se `Github`/`Linkedin` existem na versão instalada (marcas foram marcadas como obsoletas em versões recentes do Lucide); se faltarem, usar `ExternalLink` com rótulo de texto, sem criar SVG de marca.
- **OG:** definido pelo Arquiteto (fundo `#0a0a0a`, título `#ededed`, detalhe `#8b6cff`).

## 9. Checklist de acessibilidade (WCAG 2.1 AA)

- [ ] Contraste de texto ≥ 4,5:1 e de UI ≥ 3:1 (tabela da seção 5; sem branco sobre acento)
- [ ] Foco visível em todos os interativos (anel de acento 2 px, offset 3 px; 5,3:1 sobre bg)
- [ ] Navegação completa por teclado, ordem lógica (skip link, header, conteúdo, footer)
- [ ] Menu mobile: `aria-expanded`/`aria-controls`, foco entra ao abrir, foco preso, Esc fecha e devolve foco, resto da página `inert`
- [ ] Alvos de toque ≥ 44x44 px (botões 48, chips 44, ícones sociais 44, links de menu 48)
- [ ] Textos alternativos descritivos nas imagens informativas; decorativas `alt=""`/`aria-hidden`
- [ ] Ícone-botão sempre com texto visível ou `aria-label`
- [ ] Filtro: `aria-pressed`, estado também por ícone `Check` e peso, não só cor; resultado anunciado em região `aria-live="polite"`
- [ ] Links externos avisam "(abre em nova aba)" em texto `sr-only`
- [ ] Hierarquia de headings: um `h1` por página, `h2` por seção, `h3` em cards
- [ ] Landmarks: `header`, `nav aria-label="Principal"`, `main#conteudo`, `section aria-labelledby`, `footer`
- [ ] `prefers-reduced-motion: reduce` desliga entradas, hover com deslocamento e scroll suave
- [ ] Informação nunca só por cor (links de texto no corpo mantêm sublinhado)
- [ ] `lang="pt-BR"`; `scroll-margin-top` nas âncoras
- [ ] Zoom 200% e texto 16 px sem perda de conteúdo; sem scroll horizontal em 375/768/1440
- [ ] Rótulos mono decorativos (`01 / Sobre`) com `aria-hidden` para não duplicar o `h2`

## 10. Movimento e animações

Tudo com `framer-motion` (já aprovada), animando só `opacity` e `transform`. Sem dependência nova. Duração máxima de qualquer animação 360 ms (limite do usuário: 400 ms); atrasos de stagger somam no máximo 150 ms e não contam na duração.

| Elemento | Efeito | Fonte | Duração e easing | Versão com `prefers-reduced-motion` |
|---|---|---|---|---|
| Entrada de seções e blocos (`Reveal`) | fade + slide de baixo (`y: 12 → 0`), dispara uma vez ao entrar em ~20% do viewport | CSS/framer próprio (padrão fade/slide) | 360 ms, `[0.22,1,0.36,1]` | renderiza direto no estado final, sem movimento (`useReducedMotion`) |
| Hero (no carregamento) | itens em cascata: selo, h1, cargo, proposta, botões (`y: 8 → 0`, opacidade) | próprio | 320 ms, stagger 40 ms (máx. 4 itens = 120 ms) | sem animação |
| Cards em grid (Projetos, Serviços, Stack) | `Reveal` com stagger 50 ms por item, máx. 3 | próprio | 360 ms | sem animação |
| Hover do card | `translateY(-2px)` + borda `border-strong` | CSS (`transition` em `transform, border-color`) | 200 ms, ease-out | sem deslocamento; só troca de borda (instantânea) |
| Hover/ativo do botão | cor (150 ms); `scale(0.98)` ao pressionar (100 ms); seta desloca 2 px | CSS | 150 ms | sem `scale` nem deslocamento; só cor |
| Menu mobile abrir/fechar | painel: `opacity 0→1` e `y: -8 → 0`; ícone alterna Menu/X com fade | inspirado no "Menu dropdown" do transitions.dev (grátis), recriado em framer-motion | abre 220 ms ease-out; fecha 160 ms | troca instantânea (sem fade/slide) |
| Filtro de projetos | cards que entram/saem com fade (`AnimatePresence`, `mode="popLayout"` não; usar fade simples sem `layout`) | próprio | 200 ms | troca instantânea |
| Estado vazio do filtro | fade | próprio | 200 ms | instantâneo |
| Scroll para âncora | scroll suave nativo | CSS `scroll-behavior: smooth` | nativo | desligado fora de `@media (prefers-reduced-motion: no-preference)` |
| Fundo do Hero (grade) | estático, sem animação | CSS | — | igual |

Nenhum efeito de React Bits é usado como código; só a ideia ("textos animados" e "fundos") foi avaliada e descartada em favor do pedido de animação discreta. Nenhum item Pro.
Notas de implementação: `Reveal` aceita `delay` e `y`; usar `LazyMotion` + `domAnimation` + `m.div` para reduzir bundle; `viewport={{ once: true, margin: "0px 0px -10% 0px" }}`. Evitar animar `height`/`layout`. Hero acima da dobra: não esconder o conteúdo antes da hidratação (estado inicial `opacity: 1` no SSR com `initial={false}` quando reduzido); o h1 (LCP) não deve ficar em `opacity: 0` por mais de um frame: animar só `y` no h1, ou aceitar fade de 320 ms e conferir o LCP no Lighthouse.

## 11. Dependências de UI propostas

| Dependência | Fonte | Comando de instalação | Usada em | Motivo |
|---|---|---|---|---|
| nenhuma nova | — | — | — | `framer-motion`, `lucide-react`, Geist e Geist Mono (`next/font/google`, já embutido no Next) bastam |

Sugestão opcional (precisa de aprovação do usuário, não necessária): nenhuma. Não vale a pena adicionar libs para esta v1.

## 12. Referências consultadas
- https://www.tasteskill.dev/ — princípios: hierarquia alinhada à esquerda, evitar gradiente roxo/emoji/três cards de vidro, paleta enxuta, detalhes pequenos sob CTA, créditos de fotos CC0/CC BY.
- http://transitions.dev/ — biblioteca (cita "Menu dropdown", "Modal open/close", "Tabs sliding" como gratuitas); boas práticas: nomear propriedades em vez de `transition: all`, tokens de duração/easing e guarda de reduced-motion. O código das transições não foi acessado: o menu mobile é recriado em framer-motion.
- https://reactbits.dev/ — categorias Text Animations e Backgrounds; avaliadas e descartadas (instalam código com dependências extras; fora da restrição do usuário).
- `docs/00-concorrencia.md` — Brittany Chiang: hierarquia e skip link; lacuna de CTA de contato resolvida com CTAs em Hero, Serviços e Contato.
