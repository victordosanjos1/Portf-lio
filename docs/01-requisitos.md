# Requisitos — Portfólio pessoal (dev web)

Fonte da verdade: especificação do usuário em `docs/progresso.md`. Pesquisa: `docs/00-concorrencia.md`.

## 1. Visão do produto
Site de portfólio pessoal, em pt-BR, de um desenvolvedor web. Serve para captar clientes freelancer, ser avaliado por recrutadores e registrar projetos. Visual dark minimalista, conteúdo estático em arquivos TypeScript, sem backend, publicado na Vercel. Resultado esperado: visitante entende quem é a pessoa, vê projetos com contexto e entra em contato em 1 clique.

## 2. Público-alvo
- **Cliente freelancer** (pequena empresa ou profissional autônomo): quer ver serviços, prova de trabalho e falar rápido por WhatsApp ou e-mail. Usa muito celular.
- **Recrutador / líder técnico:** quer ver stack, projetos, papel da pessoa e CV. Usa desktop e celular.
- **Outros devs / pares:** quer ver código (GitHub) e demos.

## 3. Objetivos e métricas de sucesso
- Contato em até 1 clique a partir de qualquer ponto da página (header, hero, serviços, contato).
- Cada projeto tem página própria com problema, solução, stack, papel e resultados.
- `npm run build` e `npm run lint` sem erros.
- Lighthouse mobile: Performance ≥ 90, Acessibilidade ≥ 95, SEO ≥ 95 (meta de verificação; usa conteúdo placeholder).
- Adicionar projeto novo editando só `src/data/projetos.ts`.

## 3.1 Concorrência e diferenciais
Mínimo esperado pelo mercado: hero com posicionamento, projetos com tags e links, redes sociais, CV, tema escuro, responsivo. Diferenciais deste site: página de estudo de caso por projeto, seção Serviços com "Solicitar orçamento", CTAs de contato em várias seções, filtro por tecnologia, acessibilidade e SEO cuidados (skip link, foco visível, metadata). Detalhes em `docs/00-concorrencia.md`.

## 4. Escopo
### Dentro do escopo (v1)
- 7 itens obrigatórios: Hero, Sobre, Projetos (com filtro e página de detalhe), Serviços, Stack/Habilidades, Contato, Header fixo + Footer.
- Dados em `src/data/projetos.ts` e `src/data/perfil.ts`.
- SEO básico: metadata, Open Graph, `sitemap.ts`, `robots.ts`, `lang="pt-BR"`.
- Acessibilidade e responsividade conforme seção 7.
- README em português.
- Animações discretas com `framer-motion`, ícones com `lucide-react`.
### Fora do escopo (v1)
- Blog, i18n, tema claro, autenticação, CMS, analytics, testes E2E.
- Backend, banco de dados e formulário de contato com envio.
- Qualquer dependência além de `framer-motion` e `lucide-react` sem aprovação do usuário.
- Textos reais: tudo fica como "[PREENCHER]".

## 5. Páginas
| Página | Objetivo | Conteúdo principal |
|---|---|---|
| `/` (home, página única com âncoras) | Apresentar e converter | Header fixo, Hero, Sobre, Projetos, Serviços, Stack, Contato, Footer |
| `/projetos/[slug]` | Estudo de caso do projeto | Título, problema, solução, stack, meu papel, resultados, galeria, links demo/GitHub, voltar para projetos |
| `/sitemap.xml`, `/robots.txt` | SEO | Gerados por `sitemap.ts` e `robots.ts` |

## 6. Histórias de usuário

### HU-01 — Conhecer a pessoa no Hero
Como visitante, quero ver nome, cargo e proposta de valor logo ao abrir o site, para entender rapidamente quem é e o que oferece.
**Critérios de aceite:**
- [ ] CA-01.1 Dado a home aberta, quando carrega, então o Hero mostra nome, cargo e frase de proposta de valor vindos de `src/data/perfil.ts`.
- [ ] CA-01.2 O Hero tem os botões "Ver projetos" e "Fale comigo".
- [ ] CA-01.3 Clicar em "Ver projetos" leva à seção Projetos e "Fale comigo" leva à seção Contato (âncoras).
- [ ] CA-01.4 O nome é o único `h1` da home.

### HU-02 — Ler sobre a pessoa e baixar o CV
Como recrutador, quero ler um texto curto e baixar o currículo, para avaliar o perfil.
**Critérios de aceite:**
- [ ] CA-02.1 A seção Sobre mostra texto curto (de `perfil.ts`) e uma foto placeholder via `next/image` com `alt` descritivo.
- [ ] CA-02.2 O botão "Baixar CV" aponta para `/cv.pdf`.
- [ ] CA-02.3 Existe o arquivo placeholder `public/cv.pdf` e `/cv.pdf` responde 200 no `npm run dev`.

### HU-03 — Ver projetos e filtrar por tecnologia
Como visitante, quero ver os projetos em cards e filtrar por tecnologia, para achar trabalhos relevantes para mim.
**Critérios de aceite:**
- [ ] CA-03.1 A seção Projetos mostra um grid de cards com imagem, título, resumo, tags de tecnologia e links de demo e GitHub, a partir de `src/data/projetos.ts`.
- [ ] CA-03.2 Existem 3 projetos de exemplo, com textos marcados "[PREENCHER]".
- [ ] CA-03.3 Há controle de filtro com uma opção "Todos" e uma opção por tecnologia existente nos dados (gerada dos dados, não fixa no código).
- [ ] CA-03.4 Ao escolher uma tecnologia, só aparecem projetos que a têm; "Todos" mostra todos. O filtro roda no client, sem recarregar a página.
- [ ] CA-03.5 O filtro é operável por teclado e indica a opção ativa (ex.: `aria-pressed`) além da cor.
- [ ] CA-03.6 Quando um filtro não tem resultado, aparece mensagem de estado vazio.
- [ ] CA-03.7 Cada card leva a `/projetos/[slug]`.
- [ ] CA-03.8 Imagens usam `next/image` com `alt` descritivo, arquivos locais em `public/projetos/` (SVG ou cor sólida), sem URL externa.

### HU-04 — Ler o estudo de caso de um projeto
Como recrutador ou cliente, quero abrir a página de um projeto, para entender problema, solução e resultado.
**Critérios de aceite:**
- [ ] CA-04.1 Existe rota `/projetos/[slug]` para cada projeto do array, gerada estaticamente com `generateStaticParams`.
- [ ] CA-04.2 A página mostra problema, solução, stack, meu papel, resultados e galeria de imagens.
- [ ] CA-04.3 A página tem `generateMetadata` com title, description e Open Graph próprios por projeto.
- [ ] CA-04.4 Um slug inexistente retorna 404 (`notFound()`).
- [ ] CA-04.5 Há link para voltar à seção Projetos da home.
- [ ] CA-04.6 Os slugs aparecem no `sitemap.xml`.

### HU-05 — Adicionar projeto sem mexer em componentes
Como dono do portfólio, quero adicionar um projeto só editando um arquivo, para atualizar o site sem programar componentes.
**Critérios de aceite:**
- [ ] CA-05.1 `src/data/projetos.ts` exporta um array tipado pela interface `Projeto`, com todos os campos usados nos cards e na página de detalhe.
- [ ] CA-05.2 Ao acrescentar um objeto no array (com imagens em `public/projetos/`), o card, o filtro, a página `/projetos/[slug]` e o `sitemap.xml` passam a incluí-lo, sem alterar nenhum outro arquivo.
- [ ] CA-05.3 O README explica esse passo a passo.

### HU-06 — Conhecer os serviços e pedir orçamento
Como cliente freelancer, quero ver o que o dev oferece e pedir orçamento, para contratar.
**Critérios de aceite:**
- [ ] CA-06.1 A seção Serviços mostra 3 cards (ex.: landing page, site institucional, sistema web), cada um com título e descrição curta.
- [ ] CA-06.2 Cada card tem botão "Solicitar orçamento" que leva ao contato (âncora para Contato ou WhatsApp com mensagem pré-preenchida).

### HU-07 — Ver stack e habilidades
Como recrutador, quero ver as tecnologias agrupadas por categoria, para avaliar o perfil técnico.
**Critérios de aceite:**
- [ ] CA-07.1 A seção Stack mostra tecnologias agrupadas por categoria (ex.: Front-end, Back-end, Ferramentas), com dados em arquivo em `src/data/`.
- [ ] CA-07.2 Cada categoria tem título e lista semântica (`ul`/`li`).

### HU-08 — Entrar em contato
Como visitante, quero contatar por e-mail, WhatsApp, LinkedIn ou GitHub, para falar com o dev.
**Critérios de aceite:**
- [ ] CA-08.1 A seção Contato tem botões com `mailto:`, `https://wa.me/...`, LinkedIn e GitHub, com valores vindos de `perfil.ts`.
- [ ] CA-08.2 Links externos abrem com `rel="noopener noreferrer"`.
- [ ] CA-08.3 Não existe formulário de envio nem rota de API.
- [ ] CA-08.4 Todo ícone-botão tem rótulo acessível (texto visível ou `aria-label`).

### HU-09 — Navegar pelo site
Como visitante, quero um menu fixo, para ir a qualquer seção de qualquer ponto da página, inclusive no celular.
**Critérios de aceite:**
- [ ] CA-09.1 O header fica fixo no topo ao rolar e tem links por âncora para Sobre, Projetos, Serviços, Stack e Contato.
- [ ] CA-09.2 Em largura < 768 px, o menu vira botão (hambúrguer) que abre e fecha um menu mobile, com `aria-expanded` e `aria-controls`.
- [ ] CA-09.3 O menu mobile fecha ao escolher um link e ao apertar Esc.
- [ ] CA-09.4 Em `/projetos/[slug]`, os links do header levam à home com a âncora correspondente (ex.: `/#contato`).
- [ ] CA-09.5 Existe link "Pular para o conteúdo" como primeiro elemento focável.
- [ ] CA-09.6 Âncoras não ficam escondidas atrás do header fixo (`scroll-margin-top`).
- [ ] CA-09.7 O footer mostra links de redes sociais e o ano atual, calculado em código.

### HU-10 — Experiência visual dark e animações discretas
Como visitante, quero um visual escuro limpo e animações suaves, para uma leitura agradável.
**Critérios de aceite:**
- [ ] CA-10.1 Cores base: fundo `#0a0a0a`, superfícies `#141414`, bordas `#262626`, texto `#ededed`, texto secundário `#a1a1a1`.
- [ ] CA-10.2 Há uma única cor de destaque definida como token em um só lugar (sugestão `#7c5cff`); trocar esse valor muda o destaque em todo o site.
- [ ] CA-10.3 Fonte Geist ou Inter carregada via `next/font`; corpo com ≥ 16 px; títulos grandes e pesados.
- [ ] CA-10.4 Conteúdo limitado a 1152 px de largura; seções com `py-24` no desktop; cards com borda sutil e hover leve.
- [ ] CA-10.5 Animações de entrada (fade/slide) duram ≤ 400 ms.
- [ ] CA-10.6 Com `prefers-reduced-motion: reduce`, as animações de entrada e movimento ficam desligadas.

## 7. Requisitos não funcionais
- **SEO:**
  - [ ] CA-NF.1 `<html lang="pt-BR">`.
  - [ ] CA-NF.2 Metadata (title, description) na home e em cada `/projetos/[slug]`, com Open Graph (título, descrição, imagem).
  - [ ] CA-NF.3 `src/app/sitemap.ts` lista a home e todos os projetos; `src/app/robots.ts` aponta para o sitemap.
  - [ ] CA-NF.4 Headings em ordem hierárquica (um `h1` por página, seções em `h2`).
  - [ ] CA-NF.5 URL base do site em uma constante ou variável de ambiente, documentada no README.
- **Performance:**
  - [ ] CA-NF.6 Todas as imagens usam `next/image`, com `alt` descritivo (ou `alt=""` se decorativas).
  - [ ] CA-NF.7 Sem URLs de imagens externas.
  - [ ] CA-NF.8 Lighthouse mobile Performance ≥ 90 na build de produção.
- **Responsividade:**
  - [ ] CA-NF.9 Mobile-first. Em 375, 768 e 1440 px de largura não há scroll horizontal (`document.documentElement.scrollWidth <= window.innerWidth`) na home e em `/projetos/[slug]`.
  - [ ] CA-NF.10 Em 375 px os grids viram 1 coluna e nenhum texto ou botão fica cortado.
- **Acessibilidade (WCAG 2.1 AA):**
  - [ ] CA-NF.11 HTML semântico: `header`, `nav`, `main`, `section` com título, `footer`.
  - [ ] CA-NF.12 Foco visível em todo elemento interativo.
  - [ ] CA-NF.13 Contraste mínimo de 4,5:1 para texto normal (inclusive `#a1a1a1` sobre `#0a0a0a` e `#141414`, e a cor de destaque quando usada em texto).
  - [ ] CA-NF.14 Navegação completa por teclado: menu, menu mobile, filtro, cards, botões e links, em ordem lógica.
  - [ ] CA-NF.15 Lighthouse Acessibilidade ≥ 95.
- **Build e qualidade:**
  - [ ] CA-NF.16 `npm run build` termina sem erros.
  - [ ] CA-NF.17 `npm run lint` termina sem erros.
  - [ ] CA-NF.18 `npm run dev` sobe e todas as seções e as 3 páginas `/projetos/[slug]` renderizam.
  - [ ] CA-NF.19 `package.json` só tem dependências extras `framer-motion` e `lucide-react`.
  - [ ] CA-NF.20 Sem backend, banco, rotas de API ou analytics.
- **Documentação:**
  - [ ] CA-NF.21 `README.md` em português com: como rodar, como adicionar projeto, como trocar a cor de destaque e como fazer deploy na Vercel.
- **Outros:** Next.js estável mais recente (16.4.6, verificado), React, TypeScript, Tailwind, ESLint, pasta `src/`, alias `@/*`, pacote `portfolio`. Ambiente Windows. Navegadores: versões atuais de Chrome, Edge, Firefox e Safari. Idioma pt-BR. Sem cookies nem rastreio, então LGPD não exige banner.

## 8. Conteúdo e ativos
- **Placeholder "[PREENCHER]":** nome, cargo, proposta de valor, bio, links e contatos (`perfil.ts`), 3 projetos de exemplo (`projetos.ts`), textos de serviços, lista de tecnologias.
- **Placeholders de arquivo:** foto de perfil, imagens dos projetos (SVG ou cor sólida em `public/projetos/`), `public/cv.pdf`, imagem Open Graph.
- **Entrega final:** lista de todos os "[PREENCHER]" com caminho do arquivo.

## 9. Integrações
- `mailto:`, `wa.me`, links para LinkedIn e GitHub.
- Deploy na Vercel (só documentação no README).
- Sem analytics, mapas, formulários ou APIs.

## 10. Prazo e prioridades
- **Must:** estrutura Next + dados tipados; Hero, Sobre, Projetos com filtro, página `/projetos/[slug]`, Serviços, Stack, Contato, Header/Footer; design dark com token de destaque; SEO; acessibilidade; responsividade; README; build e lint limpos.
- **Should:** animações com `framer-motion` e respeito a `prefers-reduced-motion`; link "pular para o conteúdo"; estado vazio do filtro.
- **Could (fora da v1):** depoimentos, lista de clientes, seção de experiência. Não estão na especificação e só entram com aprovação do usuário.
- **Won't (v1):** itens da seção 4, fora do escopo.
- Prazo: não informado. Premissa: sem data fixa.

## 11. Dúvidas em aberto / premissas
- Home em página única com âncoras, e `/projetos/[slug]` como única rota extra, porque a especificação define âncoras no header.
- Não haverá página `/projetos` separada: a listagem fica na seção da home.
- A URL final do site é desconhecida: usar constante/variável de ambiente (ex.: `NEXT_PUBLIC_SITE_URL`) com valor padrão placeholder, documentada no README.
- "Solicitar orçamento" leva ao Contato (âncora) ou a um link `wa.me` com mensagem pré-preenchida, e a escolha é do Arquiteto. Motivo: a especificação não define o destino.
- Galeria da página de detalhe: lista de 0 a N imagens por projeto; se vazia, a seção é omitida.
- Campos de `Projeto` (ex.: `slug`, `titulo`, `resumo`, `imagem`, `tags`, `demoUrl`, `githubUrl`, `problema`, `solucao`, `stack`, `papel`, `resultados`, `galeria`) são definidos pelo Arquiteto. `demoUrl` e `githubUrl` são opcionais, e o link ausente não é renderizado.
- Metas de Lighthouse são metas de verificação para o Tester e usam conteúdo placeholder.
- Instalação de dependência fora da lista, apagar arquivos, commit e push exigem pergunta prévia ao usuário (regra da especificação).
- Pasta `.omc/` não deve ser mexida. O `README.md` atual pode ser substituído.
