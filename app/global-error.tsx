"use client";

import React from "react";
import { CONTACTS } from "@/data/content";

export default function GlobalError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="pt-BR">
      <body className="flex min-h-screen flex-col items-center justify-center bg-white p-5 text-[#302E2C]">
        <div className="flex max-w-md flex-col items-center text-center gap-4">
          <h2 className="text-2xl font-bold text-[#006CB3]">Algo não carregou direito</h2>
          <p className="text-sm text-[#595754]">
            Tente recarregar a página ou chame nossa equipe diretamente pelo WhatsApp para receber seu orçamento.
          </p>
          <div className="flex flex-wrap justify-center gap-3 pt-2">
            <button
              type="button"
              onClick={() => reset()}
              className="rounded-full bg-[#006CB3] px-5 py-2.5 text-sm font-bold text-white transition hover:bg-[#005a96] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#006CB3]"
            >
              Recarregar página
            </button>
            <a
              href={CONTACTS.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-[#006CB3] px-5 py-2.5 text-sm font-bold text-[#006CB3] transition hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#006CB3]"
            >
              Chamar no WhatsApp
            </a>
          </div>
        </div>
      </body>
    </html>
  );
}

