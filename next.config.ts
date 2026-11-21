import type { NextConfig } from "next";
import { PHASE_PRODUCTION_BUILD } from "next/constants";

// Site 100% estático (Cloudflare Pages): o build gera a pasta out/.
// cacheComponents/partialPrefetching do template foram removidos porque
// desativam `dynamicParams` e `dynamic = "force-static"`, usados na arquitetura.
const nextConfig: NextConfig = {
  output: "export",
  images: { unoptimized: true },
  trailingSlash: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

// Sem NEXT_PUBLIC_SITE_URL o build continua (dá para testar antes de ter
// domínio), mas avisa: canonical, Open Graph, sitemap e robots sairão com a URL
// padrão de src/lib/site.ts. A variável de ambiente marcadora evita repetir o
// aviso nos processos filhos do build, que herdam o ambiente.
export default function config(phase: string): NextConfig {
  if (
    phase === PHASE_PRODUCTION_BUILD &&
    !process.env.NEXT_PUBLIC_SITE_URL?.trim() &&
    !process.env.AVISO_SITE_URL_MOSTRADO
  ) {
    process.env.AVISO_SITE_URL_MOSTRADO = "1";
    console.warn(
      "\n[AVISO] NEXT_PUBLIC_SITE_URL não está definida. Canonical, Open Graph, " +
        "sitemap.xml e robots.txt vão usar a URL padrão (https://portfolio-placeholder.pages.dev).\n" +
        "        Defina a URL real (sem barra no final) em .env.local ou no painel do " +
        'Cloudflare Pages antes de publicar. Ver README, seção "URL do site".\n',
    );
  }
  return nextConfig;
}
