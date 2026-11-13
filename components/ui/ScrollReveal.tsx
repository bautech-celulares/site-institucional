import React from "react";

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number; // em milissegundos
}

/**
 * Marca o bloco para entrada suave ao rolar. É só marcação (Server Component):
 * o RevealController, único para a página inteira, aplica o efeito. Sem JavaScript
 * o conteúdo continua totalmente visível.
 */
export function ScrollReveal({ children, className, delay = 0 }: ScrollRevealProps) {
  return (
    <div
      data-reveal=""
      style={delay ? ({ "--reveal-delay": `${delay}ms` } as React.CSSProperties) : undefined}
      className={className}
    >
      {children}
    </div>
  );
}
