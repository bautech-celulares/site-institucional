"use client";

import { useStoreStatus } from "@/lib/useStoreStatus";

/** Linha de status do Hero: reflete o horário real da loja (America/Sao_Paulo). */
export function StoreStatusLine() {
  const status = useStoreStatus();

  return (
    <div className="flex items-center gap-2 text-sm font-medium text-brand-muted">
      <span className="relative flex h-2.5 w-2.5 shrink-0">
        {status.isOpen ? (
          <>
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75 motion-reduce:hidden" />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
          </>
        ) : (
          <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-slate-400" />
        )}
      </span>
      <span>
        {status.isOpen ? "Balcão no Centro" : "Balcão fechado agora"} • {status.responseTime}
      </span>
    </div>
  );
}
