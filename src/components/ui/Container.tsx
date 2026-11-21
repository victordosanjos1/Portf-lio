import type { ReactNode } from "react";

interface ContainerProps {
  children: ReactNode;
  className?: string;
}

/** Largura máxima do site (1152 px), centralizada, com respiro lateral. */
export default function Container({ children, className = "" }: ContainerProps) {
  return (
    <div className={`mx-auto w-full max-w-site px-4 sm:px-6 ${className}`}>
      {children}
    </div>
  );
}
