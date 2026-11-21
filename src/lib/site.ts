// Configuração geral do site.
// NEXT_PUBLIC_SITE_URL: URL pública, sem barra no final (ver .env.example).
// A URL é embutida no build: ao trocar de domínio, refaça o deploy.

const URL_PADRAO = "https://portfolio-placeholder.pages.dev";

const urlDefinida = process.env.NEXT_PUBLIC_SITE_URL?.trim();

// Sem a variável, usa URL_PADRAO; o build avisa no console (next.config.ts).
export const SITE_URL = (urlDefinida || URL_PADRAO).replace(/\/+$/, "");

export const SITE_NOME = "Portfólio";

/**
 * Imagem Open Graph única do site (public/og.png, 1200x630), gerada por
 * scripts/gerar-og.mjs. É um PNG estático porque, com output: "export", o
 * opengraph-image.tsx sai sem extensão em out/ e o Cloudflare Pages não
 * garante Content-Type image/png.
 */
export const OG_IMAGEM = {
  url: "/og.png",
  width: 1200,
  height: 630,
  alt: SITE_NOME,
  type: "image/png",
};

/** Campos de Open Graph comuns a todas as páginas (o Next não mescla openGraph entre layout e página). */
export const OG_BASE = {
  siteName: SITE_NOME,
  locale: "pt_BR",
  images: [OG_IMAGEM],
};
