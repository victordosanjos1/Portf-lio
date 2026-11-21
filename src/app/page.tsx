import type { Metadata } from "next";
import Contato from "@/components/sections/Contato";
import Hero from "@/components/sections/Hero";
import Projetos from "@/components/sections/Projetos";
import Servicos from "@/components/sections/Servicos";
import Sobre from "@/components/sections/Sobre";
import Stack from "@/components/sections/Stack";
import { perfil } from "@/data/perfil";
import { OG_BASE } from "@/lib/site";

// Title e description são os padrões do layout. O openGraph é repetido inteiro
// porque o Next substitui (não mescla) o objeto openGraph do layout.
export const metadata: Metadata = {
  alternates: { canonical: "/" },
  openGraph: {
    ...OG_BASE,
    type: "website",
    url: "/",
    title: `${perfil.nome} · ${perfil.cargo}`,
    description: perfil.proposta,
  },
};

// Home: página única com âncoras. O <main id="conteudo"> fica no layout.
export default function Home() {
  return (
    <>
      <Hero />
      <Sobre />
      <Projetos />
      <Servicos />
      <Stack />
      <Contato />
    </>
  );
}
