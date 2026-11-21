import { ExternalLink, Mail, type LucideIcon } from "lucide-react";
import { redesDoPerfil, type RedeDoPerfil } from "@/lib/links";

/** O lucide-react 1.77 não tem ícones de marca: LinkedIn e GitHub usam ExternalLink + rótulo. */
const ICONES: Record<RedeDoPerfil["rotulo"], LucideIcon> = {
  "E-mail": Mail,
  LinkedIn: ExternalLink,
  GitHub: ExternalLink,
};

interface RedesSociaisProps {
  className?: string;
}

/**
 * Lista de redes e contato (Hero e rodapé): e-mail, LinkedIn e GitHub só
 * quando preenchidos em src/data/perfil.ts. Sem nenhum, não renderiza nada.
 * Alvos de 44 px.
 */
export default function RedesSociais({ className = "" }: RedesSociaisProps) {
  const redes = redesDoPerfil();
  if (redes.length === 0) return null;

  return (
    <ul aria-label="Redes e contato" className={`flex flex-wrap items-center gap-2 ${className}`}>
      {redes.map((rede) => {
        const Icone = ICONES[rede.rotulo];
        return (
          <li key={rede.rotulo}>
            <a
              href={rede.href}
              {...(rede.externo
                ? { target: "_blank", rel: "noopener noreferrer" }
                : {})}
              className="inline-flex min-h-11 min-w-11 items-center justify-center gap-2 rounded-md px-3 text-nav font-medium text-muted transition-colors duration-150 hover:bg-surface hover:text-fg"
            >
              <Icone aria-hidden="true" size={18} strokeWidth={1.75} />
              {rede.rotulo}
              {rede.externo ? (
                <span className="sr-only"> (abre em nova aba)</span>
              ) : null}
            </a>
          </li>
        );
      })}
    </ul>
  );
}
