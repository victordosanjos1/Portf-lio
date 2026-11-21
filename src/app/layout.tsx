import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import SkipLink from "@/components/layout/SkipLink";
import { perfil } from "@/data/perfil";
import { OG_BASE, OG_IMAGEM, SITE_NOME, SITE_URL } from "@/lib/site";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

// Metadata padrão do site. Cada página completa com a sua (title, description,
// canonical, openGraph). A imagem OG é public/og.png (ver OG_IMAGEM em lib/site.ts).
const TITULO_PADRAO = `${perfil.nome} · ${perfil.cargo}`;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: TITULO_PADRAO,
    template: `%s · ${perfil.nome}`,
  },
  description: perfil.proposta,
  applicationName: SITE_NOME,
  openGraph: {
    ...OG_BASE,
    type: "website",
    title: TITULO_PADRAO,
    description: perfil.proposta,
  },
  twitter: {
    card: "summary_large_image",
    images: [OG_IMAGEM.url],
    title: TITULO_PADRAO,
    description: perfil.proposta,
  },
};

const SCRIPT_JS_ATIVO = "document.documentElement.classList.add('js')";

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="pt-BR"
      className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      // O script abaixo acrescenta a classe "js" antes da hidratação.
      suppressHydrationWarning
    >
      <head>
        {/* Marca que o JS está ativo: só então o Reveal pode esconder o conteúdo (globals.css). */}
        <script dangerouslySetInnerHTML={{ __html: SCRIPT_JS_ATIVO }} />
      </head>
      <body className="flex min-h-screen flex-col bg-bg font-sans text-fg">
        {/* Skip link é o 1º foco da página. */}
        <SkipLink />
        <Header />
        {/* O header é fixo (64 px): cada página/seção reserva o espaço do topo. */}
        {/* tabIndex -1: o skip link e "Voltar ao topo" movem o foco de fato para o main. */}
        <main id="conteudo" tabIndex={-1} className="flex-1 focus:outline-none">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
