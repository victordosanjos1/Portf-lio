# Portfólio pessoal — desenvolvimento web

Site de portfólio em uma página (Hero, Sobre, Projetos, Serviços, Stack e Contato) com uma página de estudo de caso para cada projeto em `/projetos/<slug>/`.

- Next.js 16 (App Router) + TypeScript + Tailwind CSS v4
- Site 100% estático (`output: "export"`): o build gera a pasta `out/`, publicada no Cloudflare Pages
- Sem backend, sem banco e sem formulário: todo o conteúdo fica em `src/data/*.ts`
- Dependências extras: só `framer-motion` (animações) e `lucide-react` (ícones)

## Como rodar

Requisitos: Node.js 20 ou mais novo (o deploy usa Node 22) e npm.

```bash
npm install
npm run dev          # http://localhost:3000
```

Outros comandos:

```bash
npm run build        # build estático; gera a pasta out/
npm run lint         # ESLint
npm run typecheck    # checagem de tipos (tsc --noEmit)
npx serve out        # opcional: serve a pasta out/ para testar o build (o npx baixa o serve na hora)
```

## Estrutura

```
public/
  cv.pdf               currículo (baixado pelo botão "Baixar CV")
  foto.svg             foto de perfil (placeholder)
  og.png               imagem de compartilhamento (Open Graph), 1200x630
  projetos/            imagens dos projetos (capas e galeria)
scripts/
  gerar-og.mjs         gera public/og.png com as cores do tema (sem dependências)
src/
  app/                 páginas: layout, home, /projetos/[slug], 404, sitemap e robots
  components/
    layout/            Header, menu mobile, Footer, skip link
    sections/          seções da home (Hero, Sobre, Projetos, Servicos, Stack, Contato)
    projetos/          card e grid com filtro de projetos
    ui/                Button, Section, Container, Tag, Reveal (animação)
  data/                conteúdo do site (perfil, projetos, serviços, stack, menu)
  lib/                 URL do site, imagem OG e helpers de links (WhatsApp, e-mail)
```

## Preencher os seus dados

Todo texto provisório começa com `[PREENCHER]`. Para listar o que falta:

```bash
grep -rn "\[PREENCHER\]" src public
```

Os arquivos principais são:

- `src/data/perfil.ts`: nome, cargo, proposta de valor, bio, texto alternativo da foto e contatos.
  - `email`: só o endereço (ex.: `voce@email.com`).
  - `whatsapp`: DDI + DDD + número (ex.: `5511999999999`). Enquanto estiver como placeholder, os botões de WhatsApp levam para a seção Contato.
  - `linkedin` e `github`: URL completa. Enquanto estiverem como placeholder, esses links não aparecem no site.
- `src/data/projetos.ts`: os 3 projetos de exemplo (troque ou apague).
- `src/data/servicos.ts` e `src/data/stack.ts`: serviços oferecidos e tecnologias.
- `public/cv.pdf` e `public/foto.svg`: currículo e foto (veja abaixo).

## Como adicionar um projeto

1. Coloque as imagens em `public/projetos/`. Use WebP, capa em 16:10 (ex.: 1280x800) com no máximo 150 KB (veja "Imagens" abaixo).
2. Abra `src/data/projetos.ts` e acrescente um objeto no array `projetos`:

   ```ts
   {
     slug: "loja-da-maria",            // único, minúsculas e hífens; vira /projetos/loja-da-maria/
     titulo: "Loja da Maria",
     resumo: "E-commerce de roupas com checkout pelo WhatsApp.", // card e descrição da página
     imagem: {
       src: "/projetos/loja-da-maria.webp",
       alt: "Página inicial da Loja da Maria no celular",
       width: 1280,
       height: 800,
     },
     tags: ["Next.js", "Tailwind CSS"], // aparecem no card e viram opções do filtro
     problema: "…",
     solucao: "…",
     stack: ["Next.js", "Tailwind CSS", "Cloudflare Pages"],
     papel: "Design e desenvolvimento.",
     resultados: ["+30% de vendas no primeiro mês"],
     demoUrl: "https://lojadamaria.com.br", // opcional: sem ele, o botão Demo some
     githubUrl: "https://github.com/voce/loja", // opcional
     galeria: [],                        // opcional: vazia, a seção Galeria some
   },
   ```

3. Salve. Não é preciso mexer em nenhum componente: o card, o filtro, a página `/projetos/<slug>/` e o `sitemap.xml` são gerados a partir do array.
4. Escreva as tags sempre com a mesma grafia (`"Next.js"` e `"NextJS"` viram dois filtros diferentes). Um `slug` repetido interrompe o build com uma mensagem de erro.

## Como trocar a cor de destaque

A cor de destaque é um único token em `src/app/globals.css`:

```css
--color-accent: #8b6cff;
```

Troque o valor e o site inteiro acompanha (botões, links, foco, filtro). O tom de hover é calculado automaticamente.

**Atenção ao contraste.** Ao trocar a cor, confira com um verificador de contraste (ex.: WebAIM Contrast Checker) que:

- o acento sobre o fundo `#0a0a0a` e sobre as superfícies `#141414` tem pelo menos 4,5:1 (é usado em texto e no anel de foco);
- o texto `#0a0a0a` (`--color-on-accent`) sobre o acento tem pelo menos 4,5:1 (texto dos botões principais).

Exemplo: `#7c5cff` parece quase igual, mas **falha** sobre a superfície `#141414` (cerca de 4,2:1). Por isso o site usa `#8b6cff`.

Depois de trocar, atualize também a imagem de compartilhamento: mude `ACENTO` em `scripts/gerar-og.mjs` e rode `node scripts/gerar-og.mjs`.

## URL do site (`NEXT_PUBLIC_SITE_URL`)

A URL pública é usada no `canonical`, nas tags Open Graph, no `sitemap.xml` e no `robots.txt`. Defina sem barra no final:

```bash
# desenvolvimento (opcional): copie o exemplo
cp .env.example .env.local
# e edite: NEXT_PUBLIC_SITE_URL=https://seu-dominio.com.br
```

Sem a variável, o build funciona normalmente (útil para testar antes de ter domínio), mas o site usa `https://portfolio-placeholder.pages.dev` e o `npm run build` mostra um aviso `[AVISO] NEXT_PUBLIC_SITE_URL não está definida`. Antes de publicar, defina a variável: se o aviso aparecer no log de build do Cloudflare Pages, o canonical, o Open Graph, o sitemap e o robots estão apontando para um domínio errado. A URL é gravada no build: ao trocar de domínio, atualize a variável no Cloudflare Pages e faça um novo deploy.

## Como trocar o CV e a foto

- **CV:** substitua `public/cv.pdf` por um PDF seu com o mesmo nome. O botão "Baixar CV" já aponta para ele.
- **Foto:** salve a foto em `public/` (ex.: `public/foto.webp`, proporção 4:5, ex.: 800x1000) e, em `src/data/perfil.ts`, atualize `foto.src`, `foto.width`, `foto.height` e `foto.alt` (descreva a foto, ex.: "Foto de rosto de Ana, sorrindo, em fundo neutro"). Depois apague o `foto.svg` antigo se não for mais usado.
- **Imagem de compartilhamento:** `public/og.png` (1200x630) é a imagem que aparece ao compartilhar o link em redes sociais e no WhatsApp. Pode ser trocada por uma arte própria com o mesmo nome e tamanho.

## Imagens: comprima antes de subir

O site é estático e usa `images.unoptimized: true`, então o Next **não** redimensiona nem converte as imagens: o arquivo vai para o visitante exatamente como está em `public/`. Antes de adicionar uma imagem:

- converta para **WebP** (ex.: [Squoosh](https://squoosh.app), no navegador);
- capas de projeto: 1280x800 no máximo, **até 150 KB**;
- foto de perfil: 800x1000 no máximo, **até 120 KB**;
- informe `width` e `height` reais da imagem nos dados (evita a página "pular" ao carregar).

## Deploy no Cloudflare Pages

1. Envie o repositório para o GitHub.
2. No painel da Cloudflare: **Workers & Pages → Create → Pages → Connect to Git** e escolha o repositório.
3. Configure o build:

   | Campo | Valor |
   |---|---|
   | Framework preset | None |
   | Build command | `npm run build` |
   | Build output directory | `out` |

4. Em **Environment variables**, adicione:
   - `NEXT_PUBLIC_SITE_URL` = URL final do site, sem barra no final (ex.: `https://seu-projeto.pages.dev` ou o seu domínio);
   - `NODE_VERSION` = `22` (o arquivo `.node-version` na raiz também indica 22).
5. Salve e faça o deploy. Cada push na branch de produção gera um deploy novo.

Sem Git: rode `npm run build` e envie a pasta `out/` pelo **Direct Upload** do Cloudflare Pages.

A hospedagem no subdomínio `*.pages.dev` é gratuita e permite uso comercial. Para usar domínio próprio, adicione-o em **Custom domains** no projeto e atualize `NEXT_PUBLIC_SITE_URL`.
