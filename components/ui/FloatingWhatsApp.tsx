"use client";

import React, { useState, useEffect, useRef, useSyncExternalStore } from "react";
import Image from "next/image";
import { WaIcon } from "./WaIcon";
import { useStoreStatus } from "@/lib/useStoreStatus";
import { createWhatsAppUrl, WHATSAPP_INTENTS } from "@/lib/whatsapp";
import { getImageUrl } from "@/data/content";
import { cn } from "@/lib/utils";

function subscribeTime() {
  return () => {};
}

function getClientTime() {
  if (typeof window === "undefined") return "10:00";
  const now = new Date();
  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");
  return `${hours}:${minutes}`;
}

function getServerTime() {
  return "10:00";
}

export function FloatingWhatsApp() {
  const status = useStoreStatus();
  const [isOpen, setIsOpen] = useState(false);
  const [hasOpenedBefore, setHasOpenedBefore] = useState(false);
  const [isScrolledPastHero, setIsScrolledPastHero] = useState(false);
  const messageTime = useSyncExternalStore(subscribeTime, getClientTime, getServerTime);
  const containerRef = useRef<HTMLDivElement>(null);

  // Monitora a rolagem para evitar cobrir os botões da sessão Hero no mobile
  useEffect(() => {
    const handleScroll = () => {
      // Ativa após rolar 260px (quando o usuário já passou da dobra inicial no mobile)
      setIsScrolledPastHero(window.scrollY > 260);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Fecha o balão ao clicar fora ou ao pressionar a tecla ESC
  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  const toggleOpen = () => {
    setIsOpen((prev) => {
      const next = !prev;
      if (next) setHasOpenedBefore(true);
      return next;
    });
  };

  const closeDialog = () => {
    setIsOpen(false);
  };

  const whatsappUrl = createWhatsAppUrl(WHATSAPP_INTENTS.floating);

  return (
    <div
      ref={containerRef}
      className={cn(
        "fixed bottom-5 right-5 z-50 flex flex-col items-end transition-all duration-300 md:bottom-7 md:right-7",
        isScrolledPastHero
          ? "opacity-100 pointer-events-auto translate-y-0 scale-100"
          : "opacity-0 pointer-events-none translate-y-8 scale-90 md:opacity-100 md:pointer-events-auto md:translate-y-0 md:scale-100"
      )}
    >
      {/* Balão de atendimento estilo Joinchat */}
      {isOpen && (
        <div
          role="dialog"
          aria-label="Atendimento Bautech no WhatsApp"
          className="mb-3 w-[calc(100vw-32px)] max-w-[340px] overflow-hidden rounded-[22px] shadow-[0_16px_40px_rgba(0,0,0,0.24)] border border-black/10 animate-hero-fade-up sm:max-w-[360px]"
        >
          {/* 1. Cabeçalho estilo WhatsApp / Joinchat */}
          <div className="flex items-center justify-between bg-[#0B5A4B] px-4 py-3.5 text-white">
            <div className="flex items-center gap-3">
              {/* Avatar circular do atendente com indicador */}
              <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-full border-2 border-white/20 bg-emerald-950">
                <Image
                  src={getImageUrl("e9857c5aabfd2ef05b1b5e84fb67217c6bcd5eaf", 120)}
                  alt="Técnico da Bautech"
                  width={44}
                  height={44}
                  className="h-full w-full object-cover"
                />
                <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-[#0B5A4B] bg-[#25D366]" />
              </div>

              {/* Nome, Verificado e Status Online */}
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5">
                  <span className="text-sm font-bold text-white leading-tight">
                    Bautech | Atendimento
                  </span>
                  {/* Selo azul de verificado */}
                  <svg
                    aria-hidden="true"
                    className="h-4 w-4 shrink-0 text-[#1DA1F2] fill-current"
                    viewBox="0 0 24 24"
                  >
                    <path d="M22.5 12.5c0-1.58-.875-2.95-2.148-3.6.154-.435.238-.905.238-1.4 0-2.21-1.79-4-4-4-.495 0-.965.084-1.4.238C14.55 2.475 13.18 1.6 11.6 1.6c-1.58 0-2.95.875-3.6 2.148-.435-.154-.905-.238-1.4-.238-2.21 0-4 1.79-4 4 0 .495.084.965.238 1.4C1.575 9.55.7 10.92.7 12.5c0 1.58.875 2.95 2.148 3.6-.154.435-.238.905-.238 1.4 0 2.21 1.79 4 4 4 .495 0 .965-.084 1.4-.238 1.25 1.273 2.62 2.148 4.2 2.148 1.58 0 2.95-.875 3.6-2.148.435.154.905.238 1.4.238 2.21 0 4-1.79 4-4 0-.495-.084-.965-.238-1.4 1.273-1.25 2.148-2.62 2.148-4.2zm-12.87 4.164l-4.242-4.243 1.414-1.414 2.828 2.828 6.364-6.364 1.414 1.414-7.778 7.779z" />
                  </svg>
                </div>
                <span className="text-[11px] font-medium text-emerald-300">
                  {status.isOpen ? "• Online" : "• Balcão fechado"}
                </span>
              </div>
            </div>

            {/* Botão de Fechar */}
            <button
              type="button"
              onClick={closeDialog}
              aria-label="Fechar janela de chat"
              className="flex h-8 w-8 items-center justify-center rounded-full bg-black/20 text-white/80 transition-colors hover:bg-black/35 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              <span className="text-xl leading-none">&times;</span>
            </button>
          </div>

          {/* 2. Corpo do Chat com fundo oficial do WhatsApp */}
          <div className="bg-[#ECE5DD] p-4 flex flex-col gap-3">
            {/* Balão de mensagem estilo WhatsApp com ponta lateral */}
            <div className="relative rounded-2xl rounded-tl-sm bg-white p-3.5 shadow-xs">
              {/* Ponta da fala apontando para o avatar */}
              <svg
                aria-hidden="true"
                className="absolute -left-2 top-2 h-3 w-2 fill-white"
                viewBox="0 0 8 12"
              >
                <path d="M8 0 L0 6 L8 12 Z" />
              </svg>

              <p className="text-[13px] leading-[20px] text-brand-dark">
                {status.isOpen
                  ? "Olá! Seja bem-vindo à Bautech. Quer pedir um orçamento ou tem alguma dúvida sobre o conserto do seu celular? Estou aqui para ajudar!"
                  : "Olá! Nosso balcão físico está fechado no momento, mas você já pode enviar sua mensagem que responderemos assim que abrirmos!"}
              </p>

              <div className="mt-1 flex items-center justify-end gap-1 text-[10px] text-gray-400">
                <span>{messageTime}</span>
                <span aria-hidden="true" className="text-emerald-600 font-bold">
                  ✓✓
                </span>
              </div>
            </div>

            {/* 3. Botão de Ação CTA "Sim! Falar no WhatsApp." */}
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex w-full items-center justify-center gap-2 rounded-full bg-[#25D366] px-5 py-3 text-sm font-bold text-white shadow-[0_4px_16px_rgba(37,211,102,0.4)] transition-all hover:bg-[#20ba5a] hover:shadow-[0_6px_20px_rgba(37,211,102,0.55)] active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#25D366] focus-visible:ring-offset-2"
            >
              <span>Sim! Falar no WhatsApp.</span>
              <svg
                className="h-4 w-4 shrink-0 fill-current"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
              </svg>
            </a>
          </div>
        </div>
      )}

      {/* Botão Flutuante Circular com Toggle */}
      <button
        type="button"
        onClick={toggleOpen}
        aria-expanded={isOpen}
        aria-label={
          isOpen
            ? "Fechar chat do WhatsApp"
            : "Abrir atendimento Bautech no WhatsApp"
        }
        className="group relative flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_6px_22px_rgba(37,211,102,0.45)] transition-all duration-300 hover:scale-105 active:scale-95 hover:shadow-[0_8px_28px_rgba(37,211,102,0.65)] focus:outline-none focus:ring-4 focus:ring-[#25D366]/30 focus-visible:ring-4 focus-visible:ring-[#25D366]/60 md:h-16 md:w-16"
      >
        {isOpen ? (
          <span className="text-2xl font-bold leading-none">&times;</span>
        ) : (
          <WaIcon size={30} />
        )}

        {/* Badge de Notificação Não Lida estilo Joinchat (some após o primeiro clique) */}
        {!hasOpenedBefore && !isOpen && (
          <span
            className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-[11px] font-bold text-white shadow-md animate-pulse"
            aria-hidden="true"
          >
            1
          </span>
        )}

        {/* Ponto indicador de expediente */}
        <span
          className="absolute bottom-0 right-0 flex h-4 w-4 items-center justify-center rounded-full bg-white shadow-xs"
          title={status.isOpen ? "Online agora" : "Balcão fechado"}
        >
          {status.isOpen ? (
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75 motion-reduce:hidden" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
            </span>
          ) : (
            <span className="h-2.5 w-2.5 rounded-full bg-slate-400" />
          )}
        </span>
      </button>
    </div>
  );
}
