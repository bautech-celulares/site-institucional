"use client";

import React, { useState } from "react";
import { Logo } from "@/components/ui/Logo";
import { WaIcon } from "@/components/ui/WaIcon";
import { useStoreStatus } from "@/lib/useStoreStatus";
import { createWhatsAppUrl, WHATSAPP_INTENTS } from "@/lib/whatsapp";

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const status = useStoreStatus();

  const navLinks = [
    { label: "Serviços", href: "#servicos" },
    { label: "Garantia", href: "#garantia" },
    { label: "Onde estamos", href: "#onde" },
    { label: "Dúvidas", href: "#duvidas" },
  ];

  return (
    <header className="sticky top-0 z-40 border-b border-brand-border bg-white/95 backdrop-blur-sm">
      <div className="mx-auto flex max-w-[1440px] items-center justify-between px-5 py-4 md:px-10 md:py-5 xl:px-[120px]">
        {/* Logo */}
        <a href="#" className="flex shrink-0 items-center rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue focus-visible:ring-offset-2" aria-label="Bautech - Início">
          <Logo className="h-8 w-auto md:h-10" />
        </a>

        {/* Navegação Desktop */}
        <nav className="hidden items-center gap-9 text-[15px] font-medium text-brand-dark lg:flex">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="rounded-md transition hover:text-brand-blue focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue focus-visible:ring-offset-2"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Ações no Header */}
        <div className="flex items-center gap-3">
          {/* Botão WhatsApp Desktop / Tablet */}
          <a
            href={createWhatsAppUrl(WHATSAPP_INTENTS.hero)}
            target="_blank"
            rel="noreferrer"
            className="hidden items-center gap-2 rounded-full bg-brand-blue px-5 py-2.5 text-sm font-bold text-white transition hover:bg-brand-blue-hover active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue focus-visible:ring-offset-2 sm:inline-flex shadow-xs"
          >
            <span className="relative flex h-2 w-2">
              {status.isOpen ? (
                <>
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75 motion-reduce:hidden" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
                </>
              ) : (
                <span className="relative inline-flex h-2 w-2 rounded-full bg-white/60" />
              )}
            </span>
            <WaIcon size={16} />
            <span>Chamar no WhatsApp</span>
          </a>

          {/* Botão Menu Hambúrguer (Mobile) */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-brand-border text-brand-dark transition hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue focus-visible:ring-offset-2 lg:hidden"
            aria-label={mobileMenuOpen ? "Fechar menu" : "Abrir menu"}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? (
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M4 4L16 16M4 16L16 4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            ) : (
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M3 5H17M3 10H17M3 15H17" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Gaveta de Navegação Mobile */}
      {mobileMenuOpen && (
        <div className="border-t border-brand-border bg-white px-5 py-4 shadow-lg lg:hidden">
          <nav className="flex flex-col gap-3 pb-4">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="rounded-lg px-3 py-2 text-base font-medium text-brand-dark transition hover:bg-brand-surface hover:text-brand-blue"
              >
                {link.label}
              </a>
            ))}
          </nav>
          <a
            href={createWhatsAppUrl(WHATSAPP_INTENTS.hero)}
            target="_blank"
            rel="noreferrer"
            onClick={() => setMobileMenuOpen(false)}
            className="flex w-full items-center justify-center gap-2 rounded-full bg-brand-blue py-3 text-center text-sm font-bold text-white shadow-sm transition hover:bg-brand-blue-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue"
          >
            <span className="relative flex h-2 w-2">
              {status.isOpen ? (
                <>
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75 motion-reduce:hidden" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
                </>
              ) : (
                <span className="relative inline-flex h-2 w-2 rounded-full bg-white/60" />
              )}
            </span>
            <WaIcon size={18} />
            <span>Pedir orçamento no WhatsApp</span>
          </a>
        </div>
      )}
    </header>
  );
}
