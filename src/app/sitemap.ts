import type { MetadataRoute } from "next";
import { hrefDoProjeto, projetos } from "@/data/projetos";
import { SITE_URL } from "@/lib/site";

// Gerado no build (static export): out/sitemap.xml.
export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const geradoEm = new Date();
  return [
    {
      // Barra final, coerente com trailingSlash: true.
      url: `${SITE_URL}/`,
      lastModified: geradoEm,
      changeFrequency: "monthly",
      priority: 1,
    },
    ...projetos.map((projeto) => ({
      url: `${SITE_URL}${hrefDoProjeto(projeto.slug)}`,
      lastModified: geradoEm,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
