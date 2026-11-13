"use client";

import { setConsent } from "@/lib/consent";

/** Link do rodapé que reabre o aviso de cookies para o visitante mudar de ideia. */
export function CookiePreferences({ className }: { className?: string }) {
  return (
    <button type="button" onClick={() => setConsent(null)} className={className}>
      Preferências de cookies
    </button>
  );
}
