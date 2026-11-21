import { perfil } from "@/data/perfil";

const MARCADOR_PLACEHOLDER = "[PREENCHER]";

/** `false` se o valor estiver vazio ou ainda for um placeholder "[PREENCHER]". */
export function ehPreenchido(valor: string | undefined | null): valor is string {
  if (!valor) return false;
  const texto = valor.trim();
  return texto.length > 0 && !texto.startsWith(MARCADOR_PLACEHOLDER);
}

const PROTOCOLO_WEB = /^https?:\/\//i;

/**
 * `true` só para URL externa utilizável: preenchida (sem "[PREENCHER]") e
 * começando com http:// ou https://. Use antes de renderizar qualquer link
 * vindo dos dados (demo, GitHub, LinkedIn).
 */
export function ehUrlExterna(valor: string | undefined | null): valor is string {
  return ehPreenchido(valor) && PROTOCOLO_WEB.test(valor.trim());
}

/**
 * Para checagens de build: devolve a mensagem de erro se o valor estiver
 * preenchido mas não começar com http(s)://. Vazio ou "[PREENCHER]" é aceito
 * (o link só não aparece).
 */
export function erroDeUrl(campo: string, valor: string | undefined | null): string | null {
  if (!ehPreenchido(valor) || PROTOCOLO_WEB.test(valor.trim())) return null;
  return `${campo} = "${valor}" precisa começar com http:// ou https://`;
}

// Checagem em tempo de build dos links do perfil (src/data/perfil.ts).
const errosDoPerfil = [
  erroDeUrl("contatos.linkedin", perfil.contatos.linkedin),
  erroDeUrl("contatos.github", perfil.contatos.github),
].filter((erro): erro is string => erro !== null);

if (errosDoPerfil.length > 0) {
  throw new Error(`URL inválida em src/data/perfil.ts:\n- ${errosDoPerfil.join("\n- ")}`);
}

/**
 * Link do WhatsApp (wa.me) com mensagem opcional.
 * Enquanto o número for placeholder (sem dígitos), devolve "/#contato"
 * para o botão nunca gerar um link quebrado.
 */
export function whatsappUrl(
  mensagem?: string,
  numero: string = perfil.contatos.whatsapp,
): string {
  const digitos = numero.replace(/\D/g, "");
  if (digitos.length === 0) return "/#contato";
  const texto = mensagem ? `?text=${encodeURIComponent(mensagem)}` : "";
  return `https://wa.me/${digitos}${texto}`;
}

/**
 * Link mailto:. Enquanto o e-mail for placeholder (ou vazio), devolve `null`:
 * o link de e-mail não é renderizado, como LinkedIn e GitHub (nunca "mailto:" vazio).
 */
export function mailtoUrl(
  email: string = perfil.contatos.email,
  assunto?: string,
): string | null {
  if (!ehPreenchido(email)) return null;
  const parametro = assunto ? `?subject=${encodeURIComponent(assunto)}` : "";
  return `mailto:${email.trim()}${parametro}`;
}

/** Mensagem pré-preenchida do botão "Solicitar orçamento" de cada serviço. */
export function mensagemOrcamento(tituloServico: string): string {
  return `Olá! Vi seu portfólio e quero um orçamento de ${tituloServico}.`;
}

export interface RedeDoPerfil {
  rotulo: "E-mail" | "LinkedIn" | "GitHub";
  href: string;
  /** Abre em nova aba (target="_blank" + rel="noopener noreferrer"). */
  externo: boolean;
}

/**
 * Redes e contato exibidos no Hero e no rodapé. Cada item só aparece quando
 * preenchido em src/data/perfil.ts: e-mail sem "[PREENCHER]"; LinkedIn e
 * GitHub com URL http(s). Pode devolver lista vazia.
 */
export function redesDoPerfil(): RedeDoPerfil[] {
  const { email, linkedin, github } = perfil.contatos;
  const redes: RedeDoPerfil[] = [];
  const mailto = mailtoUrl(email);
  if (mailto) {
    redes.push({ rotulo: "E-mail", href: mailto, externo: false });
  }
  if (ehUrlExterna(linkedin)) {
    redes.push({ rotulo: "LinkedIn", href: linkedin.trim(), externo: true });
  }
  if (ehUrlExterna(github)) {
    redes.push({ rotulo: "GitHub", href: github.trim(), externo: true });
  }
  return redes;
}
