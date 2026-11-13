"use client";

import { getConsent, setConsent } from "@/lib/consent";

/** Link do rodapé que reabre o aviso de cookies para o visitante mudar de ideia. */
export function CookiePreferences({ className }: { className?: string }) {
  const reopen = () => {
    const hadAccepted = getConsent() === "accepted";
    setConsent(null);
    // O GTM já carregado não se descarrega sozinho: recarregar garante que
    // a página reabra sem rastreamento até a nova escolha.
    if (hadAccepted) window.location.reload();
  };

  return (
    <button type="button" onClick={reopen} className={className}>
      Preferências de cookies
    </button>
  );
}
