import type { ReactNode } from "react";

interface TagProps {
  children: ReactNode;
  /** Use `true` quando a tag estiver sobre fundo `surface` (ex.: dentro de card). */
  sobreSurface?: boolean;
}

/** Etiqueta não interativa (tecnologia, categoria). */
export default function Tag({ children, sobreSurface = false }: TagProps) {
  return (
    <span
      className={`inline-flex items-center rounded-sm border border-border px-2.5 py-1 text-pequeno font-medium text-muted ${
        sobreSurface ? "bg-bg" : "bg-surface"
      }`}
    >
      {children}
    </span>
  );
}
