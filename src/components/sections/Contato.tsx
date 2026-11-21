import { ArrowUpRight, ExternalLink, Mail, MessageCircle, type LucideIcon } from "lucide-react";
import Section from "@/components/ui/Section";
import { ehLinkExterno } from "@/components/ui/Button";
import { perfil } from "@/data/perfil";
import { ehPreenchido, ehUrlExterna, mailtoUrl, whatsappUrl } from "@/lib/links";

/** Mensagem pré-preenchida do botão de WhatsApp da seção Contato. */
const MENSAGEM_WHATSAPP = "Olá! Vi seu portfólio e quero conversar sobre um projeto.";

interface LinhaContato {
  rotulo: string;
  href: string;
  icone: LucideIcon;
  /** Texto secundário (endereço, número, perfil). Omitido enquanto for placeholder. */
  valor?: string;
  /** Linha em destaque (estilo do botão primário). */
  destaque?: boolean;
}

/** Tira o protocolo e a barra final para exibir a URL de forma curta. */
function urlCurta(url: string): string {
  return url.replace(/^https?:\/\/(www\.)?/i, "").replace(/\/+$/, "");
}

/**
 * Monta as linhas de contato a partir de src/data/perfil.ts.
 * WhatsApp sempre aparece (com o fallback "/#contato" de whatsappUrl), para a
 * seção nunca ficar sem botão. E-mail só quando preenchido (mailtoUrl devolve
 * null com placeholder); LinkedIn e GitHub só com URL http(s)
 * (docs/03-design.md).
 */
function linhasDeContato(): LinhaContato[] {
  const { email, whatsapp, linkedin, github } = perfil.contatos;
  const linhas: LinhaContato[] = [
    {
      rotulo: "WhatsApp",
      href: whatsappUrl(MENSAGEM_WHATSAPP, whatsapp),
      icone: MessageCircle,
      valor: ehPreenchido(whatsapp) ? whatsapp : undefined,
      destaque: true,
    },
  ];
  const mailto = mailtoUrl(email);
  if (mailto) {
    linhas.push({ rotulo: "E-mail", href: mailto, icone: Mail, valor: email.trim() });
  }
  if (ehUrlExterna(linkedin)) {
    linhas.push({ rotulo: "LinkedIn", href: linkedin.trim(), icone: ExternalLink, valor: urlCurta(linkedin.trim()) });
  }
  if (ehUrlExterna(github)) {
    linhas.push({ rotulo: "GitHub", href: github.trim(), icone: ExternalLink, valor: urlCurta(github.trim()) });
  }
  return linhas;
}

const LINHA_BASE =
  "group flex min-h-14 w-full items-center gap-4 rounded-md border px-5 py-3 transition-colors duration-150 ease-out focus-visible:-outline-offset-2 lg:min-h-16 lg:rounded-none lg:border-0";
const LINHA_NORMAL = "border-border-strong text-fg hover:bg-surface lg:hover:bg-bg";
const LINHA_DESTAQUE = "border-accent bg-accent text-on-accent hover:bg-accent-hover";

/**
 * Seção Contato (#contato). Sem formulário: só links (WhatsApp, e-mail,
 * LinkedIn, GitHub). Mobile: botões empilhados em largura total (56 px).
 * lg+: título à esquerda e card com linhas de 64 px divididas por hairline.
 */
export default function Contato() {
  const linhas = linhasDeContato();

  return (
    <Section
      id="contato"
      numero="05"
      rotulo="Contato"
      titulo="Vamos conversar?"
      descricao={perfil.chamadaContato}
      ladoALado
    >
      <ul className="flex flex-col gap-3 lg:gap-0 lg:divide-y lg:divide-border lg:overflow-hidden lg:rounded-lg lg:border lg:border-border lg:bg-surface">
        {linhas.map((linha) => {
          const externo = ehLinkExterno(linha.href);
          const Icone = linha.icone;
          return (
            <li key={linha.rotulo}>
              <a
                href={linha.href}
                {...(externo ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                className={`${LINHA_BASE} ${linha.destaque ? LINHA_DESTAQUE : LINHA_NORMAL}`}
              >
                <Icone aria-hidden="true" size={20} strokeWidth={1.75} className="shrink-0" />
                <span className="flex min-w-0 flex-1 flex-col sm:flex-row sm:items-baseline sm:gap-3">
                  <span className="text-corpo font-semibold">{linha.rotulo}</span>
                  {linha.valor ? (
                    <span
                      className={`text-pequeno [overflow-wrap:anywhere] ${
                        linha.destaque ? "text-on-accent" : "text-muted"
                      }`}
                    >
                      {linha.valor}
                    </span>
                  ) : null}
                </span>
                {externo ? <span className="sr-only"> (abre em nova aba)</span> : null}
                <ArrowUpRight
                  aria-hidden="true"
                  size={18}
                  strokeWidth={1.75}
                  className="shrink-0 motion-safe:transition-transform motion-safe:duration-150 motion-safe:group-hover:translate-x-0.5"
                />
              </a>
            </li>
          );
        })}
      </ul>
    </Section>
  );
}
