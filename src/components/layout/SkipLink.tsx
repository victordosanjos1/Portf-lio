import { classesBotao } from "@/components/ui/Button";

/** Primeiro foco da página: pula o header e vai ao <main id="conteudo">. */
export default function SkipLink() {
  return (
    <a
      href="#conteudo"
      className={`${classesBotao("primario")} sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100]`}
    >
      Pular para o conteúdo
    </a>
  );
}
