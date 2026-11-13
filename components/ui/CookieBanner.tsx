"use client";

import React, { useSyncExternalStore } from "react";
import { setConsent, useConsent } from "@/lib/consent";

function subscribeMount() {
  return () => {};
}

export function CookieBanner() {
  const consent = useConsent();
  // Só renderiza no cliente, depois da hidratação (o aviso depende do localStorage)
  const isMounted = useSyncExternalStore(subscribeMount, () => true, () => false);

  if (!isMounted || consent !== null) {
    return null;
  }

  return (
    <aside
      aria-label="Aviso de privacidade e cookies"
      className="fixed inset-x-3 bottom-3 z-40 motion-safe:animate-cookie-in md:inset-x-auto md:bottom-7 md:left-7 md:w-[360px]"
    >
      <div className="flex flex-col gap-3 rounded-[20px] border border-brand-border bg-white p-4 shadow-[0_8px_30px_rgba(0,0,0,0.12)] md:p-5">
        <div className="flex flex-col gap-1">
          <h2 className="text-base font-bold text-brand-dark">Cookies e privacidade</h2>
          <p className="text-sm leading-5 text-brand-muted">
            Usamos o Google Tag Manager para medir visitas, somente se você permitir. Você pode
            mudar isso a qualquer momento no rodapé.
          </p>
        </div>
        <div className="flex gap-2.5">
          <button
            type="button"
            onClick={() => setConsent("accepted")}
            className="inline-flex min-h-11 flex-1 items-center justify-center rounded-full bg-brand-blue px-5 text-sm font-bold text-white transition-[background-color,transform] hover:bg-brand-blue-hover active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue focus-visible:ring-offset-2"
          >
            Permitir
          </button>
          <button
            type="button"
            onClick={() => setConsent("declined")}
            className="inline-flex min-h-11 flex-1 items-center justify-center rounded-full border border-brand-border bg-white px-5 text-sm font-bold text-brand-dark transition-[background-color,transform] hover:bg-brand-surface active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue focus-visible:ring-offset-2"
          >
            Recusar
          </button>
        </div>
      </div>
    </aside>
  );
}
