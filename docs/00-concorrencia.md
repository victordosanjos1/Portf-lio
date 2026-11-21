# Pesquisa de mercado e concorrência — Portfólio pessoal (dev web)

**Data da pesquisa:** 2026-11-20
**Buscas feitas:** "melhores portfólios desenvolvedor web freelancer exemplos"; leitura das listas Hostinger e Locaweb; análise do site de Brittany Chiang.
**Limite:** pesquisa enxuta. Só o site de Brittany Chiang foi aberto e analisado a fundo. Os demais vêm de descrições nas listas e não foram abertos um a um (marcado "via lista").

## Resumo
Portfólios de devs seguem um padrão: hero com cargo e frase de posicionamento, sobre, projetos com tags de tecnologia, links sociais e currículo. Os melhores usam fundo escuro, navegação simples e cuidam de acessibilidade. A maioria falha em conversão: poucos têm CTA claro de contato, serviços/preços para freelancer ou estudo de caso (problema, solução, resultado). A oportunidade está em unir visual de referência com foco em captar clientes e páginas de caso por projeto.

## Sites analisados
| Site | Tipo | Páginas/seções | Funcionalidades e integrações | Tecnologia | Pontos fortes | Pontos fracos |
|---|---|---|---|---|---|---|
| [Brittany Chiang](https://brittanychiang.com) | referência | Hero, Sobre, Experiência, Projetos, Artigos, rodapé | Âncoras no menu, ícones sociais, link "pular para o conteúdo", currículo | Next.js + Tailwind, Vercel (confirmado pelo rodapé e `/_next/image`) | Hierarquia clara, acessibilidade, prova social numérica, tema escuro | Sem CTA de contato, ícones sociais sem rótulo visível, seção de artigos fora do menu |
| [Matt Farley](https://mattfarley.ca/) (via lista) | referência | Quem sou, o que faço, projetos, clientes, depoimentos | Layout uniforme | não identificado | Prova social (clientes, depoimentos) | Não verificado |
| [Keita Yamada](https://p5aholic.me/) (via lista) | referência | Home com bio, projetos, contato | Alternância tema claro/escuro | não identificado | Simples e direto | Não verificado |
| [Bruno Simon](https://bruno-simon.com/) (via lista) | referência criativa | Projetos e redes, navegação 3D | Animação 3D com teclado | não identificado | Memorável | Pesado e pouco prático para recrutador e cliente; fora do escopo do projeto |
| [Ian Dunkerley](https://dunks1980.com/) (via lista) | referência | Página única: trabalho e contato | — | não identificado | Minimalista | Não verificado |
| [Rhuan Bello](https://rhuanbello.com) (via lista, BR) | concorrente direto | Página limpa com botão de currículo | Download de CV | não identificado | CV acessível na 1ª visita | Não verificado |
| [Morganna Giovanelli](https://morganna.dev) (via lista, BR) | concorrente direto | Projetos, materiais (artigos, palestras) | Downloads | não identificado | Reúne material útil ao recrutador | Não verificado |

## Padrões do mercado (o mínimo esperado)
- Hero com nome, cargo e frase de posicionamento.
- Seção de projetos com imagem, tecnologias e links (demo/GitHub).
- Links sociais (GitHub, LinkedIn) e e-mail.
- Currículo para baixar.
- Tema escuro, tipografia grande, layout responsivo.
- Erros comuns citados pela Locaweb: excesso de informação, projetos sem explicação, site lento, falta de SEO, links quebrados.

## Oportunidades de diferenciação
- Páginas de estudo de caso por projeto (`/projetos/[slug]`: problema, solução, stack, papel, resultados). Muitos só listam o projeto.
- Seção Serviços com CTA "Solicitar orçamento", voltada a clientes freelancer. Pouco comum em portfólios de devs.
- Contato direto em 1 clique (e-mail, WhatsApp). O portfólio de referência analisado não tem CTA de contato.
- Acessibilidade e SEO bem feitos (skip link, foco visível, metadata, sitemap) como prova de competência.
- Filtro por tecnologia nos projetos.

## Recomendações para o projeto
- Adotar tema escuro e hierarquia clara (Brittany Chiang).
- Incluir link "pular para o conteúdo" e rótulos acessíveis nos ícones sociais, corrigindo o ponto fraco de Brittany Chiang.
- Manter CTAs de contato visíveis no hero, em Serviços e em Contato (Brittany Chiang não tem).
- Botão de CV visível na seção Sobre (Rhuan Bello).
- Evitar animação pesada (Bruno Simon): animações discretas, ≤ 400 ms.
- Evitar links quebrados e projetos sem explicação: a página de detalhe cobre isso.
- Depoimentos e lista de clientes (Matt Farley) ficam fora da v1 por não estarem na especificação. Podem ser sugeridos como evolução.
