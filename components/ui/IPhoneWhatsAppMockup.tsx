"use client";

import React, { useState, useEffect, useSyncExternalStore } from "react";
import Image from "next/image";
import { Phone, Video, MoreVertical, Send, CheckCheck, Smile, Paperclip } from "@/components/ui/icons";

function subscribeMotion() {
  return () => {};
}

function getClientMotion() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function getServerMotion() {
  return false;
}

export function IPhoneWhatsAppMockup() {
  const prefersReducedMotion = useSyncExternalStore(
    subscribeMotion,
    getClientMotion,
    getServerMotion
  );

  // Estados dos passos da conversa (0 a 4)
  // Se prefersReducedMotion estiver ativo, mostra todos diretamente (passo 4)
  const [step, setStep] = useState(prefersReducedMotion ? 4 : 0);
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    let isMounted = true;
    const timers: NodeJS.Timeout[] = [];

    const runScript = () => {
      // Reinicia o fluxo da simulação
      setStep(0);
      setIsTyping(false);

      // 1. Cliente mandou msg 1 (já visível no step 0)
      // 2. Bautech começa a digitar aos 2.0s (ritmo humano e desacelerado)
      timers.push(
        setTimeout(() => {
          if (!isMounted) return;
          setIsTyping(true);
        }, 2000)
      );

      // 3. Bautech envia msg 2 aos 4.5s (para de digitar e exibe mensagem com transição suave)
      timers.push(
        setTimeout(() => {
          if (!isMounted) return;
          setIsTyping(false);
          setStep(1);
        }, 4500)
      );

      // 4. Cliente responde msg 3 aos 7.5s (pausa natural para leitura)
      timers.push(
        setTimeout(() => {
          if (!isMounted) return;
          setStep(2);
        }, 7500)
      );

      // 5. Bautech digita aos 9.2s
      timers.push(
        setTimeout(() => {
          if (!isMounted) return;
          setIsTyping(true);
        }, 9200)
      );

      // 6. Bautech envia msg 4 aos 12.0s (esclarecendo a encomenda da tela para o modelo)
      timers.push(
        setTimeout(() => {
          if (!isMounted) return;
          setIsTyping(false);
          setStep(3);
        }, 12000)
      );

      // 7. Cliente finaliza aos 15.0s
      timers.push(
        setTimeout(() => {
          if (!isMounted) return;
          setStep(4);
        }, 15000)
      );

      // 8. Reinicia o ciclo após 23s (dá 8 segundos completos para o usuário ler toda a tela com calma)
      timers.push(
        setTimeout(() => {
          if (!isMounted) return;
          runScript();
        }, 23000)
      );
    };

    runScript();

    return () => {
      isMounted = false;
      timers.forEach(clearTimeout);
    };
  }, [prefersReducedMotion]);

  return (
    <div
      aria-label="Simulação de conversa no WhatsApp com a Bautech"
      role="region"
      className="relative flex justify-center items-center py-2 select-none"
    >
      {/* Moldura Externa do iPhone (Chassi baseado no conceito do snippet) */}
      <div className="relative w-[250px] sm:w-[275px] h-[480px] sm:h-[515px] bg-[#0c0d10] p-[6px] sm:p-[7px] rounded-[42px] sm:rounded-[46px] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.5),0_0_0_2px_#27282d] border border-[#37383f]">
        
        {/* Botão Power (Lado Direito) */}
        <div
          aria-hidden="true"
          className="absolute -right-[4px] top-[115px] sm:top-[125px] w-[3px] h-[46px] bg-[#3a3b42] rounded-r-[2px] shadow-sm"
        />

        {/* Chave de Silencioso (Lado Esquerdo) */}
        <div
          aria-hidden="true"
          className="absolute -left-[4px] top-[75px] sm:top-[80px] w-[3px] h-[22px] bg-[#3a3b42] rounded-l-[2px] shadow-sm"
        />

        {/* Botão Volume + (Lado Esquerdo) */}
        <div
          aria-hidden="true"
          className="absolute -left-[4px] top-[110px] sm:top-[118px] w-[3px] h-[40px] bg-[#3a3b42] rounded-l-[2px] shadow-sm"
        />

        {/* Botão Volume - (Lado Esquerdo) */}
        <div
          aria-hidden="true"
          className="absolute -left-[4px] top-[160px] sm:top-[170px] w-[3px] h-[40px] bg-[#3a3b42] rounded-l-[2px] shadow-sm"
        />

        {/* Dynamic Island (Câmera + Sensores no topo da tela) */}
        <div
          aria-hidden="true"
          className="absolute top-[13px] sm:top-[14px] left-1/2 -translate-x-1/2 w-[80px] sm:w-[88px] h-[20px] sm:h-[22px] bg-black rounded-full z-30 flex items-center justify-between px-2.5 shadow-md border border-neutral-900"
        >
          {/* Lente da Câmera com reflexo sutil */}
          <div className="w-2.5 h-2.5 rounded-full bg-[#0a0f18] ring-1 ring-[#1b2230] flex items-center justify-center">
            <div className="w-1 h-1 rounded-full bg-[#1b3b6f]/60" />
          </div>
          {/* Sensor acústico / LED */}
          <div className="w-1.5 h-1.5 rounded-full bg-[#111215]" />
        </div>

        {/* Tela Interna do iPhone */}
        <div className="relative w-full h-full rounded-[36px] sm:rounded-[39px] overflow-hidden flex flex-col bg-[#efeae2] font-sans">
          
          {/* Barra de Status do iOS */}
          <div className="bg-[#075E54] pt-2 sm:pt-2.5 pb-1 px-5 flex items-center justify-between text-white text-[10px] font-semibold tracking-tight z-20">
            <span>09:41</span>
            <div className="flex items-center gap-1.5 opacity-90">
              {/* Ícone de sinal */}
              <svg className="w-3 h-2.5 fill-current" viewBox="0 0 16 12">
                <rect x="0" y="8" width="2.5" height="4" rx="0.5" />
                <rect x="4" y="6" width="2.5" height="6" rx="0.5" />
                <rect x="8" y="3" width="2.5" height="9" rx="0.5" />
                <rect x="12" y="0" width="2.5" height="12" rx="0.5" />
              </svg>
              {/* Ícone de WiFi */}
              <svg className="w-3 h-2.5 fill-current" viewBox="0 0 16 12">
                <path d="M8 9.5a1.5 1.5 0 100 3 1.5 1.5 0 000-3zm-4.2-2.8a6 6 0 018.4 0 .8.8 0 001.1-1.1 7.6 7.6 0 00-10.6 0 .8.8 0 001.1 1.1zm-2.8-2.8a10 10 0 0114 0 .8.8 0 001.1-1.1 11.6 11.6 0 00-16.2 0 .8.8 0 001.1 1.1z" />
              </svg>
              {/* Ícone de Bateria */}
              <div className="w-4 h-2 border border-white rounded-[2px] p-[1px] flex items-center">
                <div className="w-full h-full bg-white rounded-[1px]" />
              </div>
            </div>
          </div>

          {/* Cabeçalho do WhatsApp */}
          <div className="bg-[#075E54] px-2.5 py-1.5 flex items-center justify-between text-white shadow-md z-20">
            <div className="flex items-center gap-1.5 min-w-0">
              {/* Botão Voltar */}
              <span className="text-sm font-semibold -mr-0.5 opacity-80 cursor-default">‹</span>
              {/* Foto de Perfil com Indicador Online */}
              <div className="relative w-8 h-8 rounded-full overflow-hidden shrink-0 border border-white/20 bg-slate-200">
                <Image
                  src="tecnico-bautech-bancada"
                  alt="Bautech Atendimento"
                  fill
                  className="object-cover"
                />
              </div>
              {/* Nome e Status */}
              <div className="flex flex-col min-w-0 leading-tight">
                <div className="flex items-center gap-1">
                  <span className="text-[12px] font-bold truncate">Bautech</span>
                  {/* Selo Verificado WhatsApp */}
                  <svg className="w-3 h-3 text-[#25D366] shrink-0 fill-current" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                  </svg>
                </div>
                <span className="text-[9.5px] text-[#A5D6A7] font-medium flex items-center gap-1 truncate">
                  {isTyping ? (
                    <span className="text-[#80E27E] font-semibold animate-pulse transition-opacity duration-500">
                      digitando...
                    </span>
                  ) : (
                    <>
                      <span className="w-1.5 h-1.5 rounded-full bg-[#25D366] shrink-0" />
                      online agora
                    </>
                  )}
                </span>
              </div>
            </div>

            {/* Ícones de Ação (Chamada, Vídeo, Menu) */}
            <div className="flex items-center gap-2.5 opacity-85 text-white pr-1">
              <Video className="w-3.5 h-3.5" />
              <Phone className="w-3.5 h-3.5" />
              <MoreVertical className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* Corpo do Chat com Papel de Parede */}
          <div className="flex-1 p-2 sm:p-2.5 flex flex-col justify-end gap-1.5 overflow-hidden relative bg-[#efeae2]/90">
            {/* Padrão Sutil de Fundo WhatsApp */}
            <div
              aria-hidden="true"
              className="absolute inset-0 opacity-[0.035] pointer-events-none bg-[radial-gradient(#075e54_1px,transparent_1px)] [background-size:12px_12px]"
            />

            {/* Pill de Data Centralizada */}
            <div className="flex justify-center mb-0.5">
              <span className="bg-[#ffffff]/80 backdrop-blur-xs text-[#54656f] text-[9px] font-medium px-2 py-0.5 rounded-md shadow-xs">
                HOJE
              </span>
            </div>

            {/* Mensagem 1: Cliente pergunta sobre troca de tela */}
            <div className="flex justify-end">
              <div className="max-w-[85%] bg-[#d9fdd3] text-[#111b21] rounded-lg rounded-tr-none px-2.5 py-1.5 shadow-xs text-[11px] leading-tight flex flex-col gap-0.5">
                <span>Oi! Trincou a tela do meu celular. Vocês trocam aqui em São Bento?</span>
                <div className="flex items-center justify-end gap-0.5 text-[8.5px] text-[#667781]">
                  <span>09:41</span>
                  <CheckCheck className="w-3 h-3 text-[#53bdeb]" />
                </div>
              </div>
            </div>

            {/* Mensagem 2: Bautech responde confirmando modelo (Animação aveludada e desacelerada) */}
            {step >= 1 && (
              <div className="flex justify-start animate-chat-bubble">
                <div className="max-w-[85%] bg-white text-[#111b21] rounded-lg rounded-tl-none px-2.5 py-1.5 shadow-xs text-[11px] leading-tight flex flex-col gap-0.5">
                  <span>Olá! Trocamos sim! Qual é a marca e o modelo exato do seu celular?</span>
                  <div className="flex items-center justify-end text-[8.5px] text-[#667781]">
                    <span>09:41</span>
                  </div>
                </div>
              </div>
            )}

            {/* Mensagem 3: Cliente informa o modelo */}
            {step >= 2 && (
              <div className="flex justify-end animate-chat-bubble">
                <div className="max-w-[85%] bg-[#d9fdd3] text-[#111b21] rounded-lg rounded-tr-none px-2.5 py-1.5 shadow-xs text-[11px] leading-tight flex flex-col gap-0.5">
                  <span>É um iPhone 11. Vocês têm a tela aí?</span>
                  <div className="flex items-center justify-end gap-0.5 text-[8.5px] text-[#667781]">
                    <span>09:42</span>
                    <CheckCheck className="w-3 h-3 text-[#53bdeb]" />
                  </div>
                </div>
              </div>
            )}

            {/* Mensagem 4: Bautech explica que pede a peça sob encomenda para o modelo com garantia */}
            {step >= 3 && (
              <div className="flex justify-start animate-chat-bubble">
                <div className="max-w-[85%] bg-white text-[#111b21] rounded-lg rounded-tl-none px-2.5 py-1.5 shadow-xs text-[11px] leading-tight flex flex-col gap-0.5">
                  <span>Fazemos o pedido da peça direto para o seu modelo! Chega super rápido e trocamos com garantia de 90 dias. 🛠️</span>
                  <div className="flex items-center justify-end text-[8.5px] text-[#667781]">
                    <span>09:42</span>
                  </div>
                </div>
              </div>
            )}

            {/* Mensagem 5: Cliente confirma */}
            {step >= 4 && (
              <div className="flex justify-end animate-chat-bubble">
                <div className="max-w-[85%] bg-[#d9fdd3] text-[#111b21] rounded-lg rounded-tr-none px-2.5 py-1.5 shadow-xs text-[11px] leading-tight flex flex-col gap-0.5">
                  <span>Excelente! Vou querer pedir sim, muito obrigado! 🙌</span>
                  <div className="flex items-center justify-end gap-0.5 text-[8.5px] text-[#667781]">
                    <span>09:43</span>
                    <CheckCheck className="w-3 h-3 text-[#53bdeb]" />
                  </div>
                </div>
              </div>
            )}

            {/* Balão de "Digitando..." animado aveludado sem bounce */}
            {isTyping && (
              <div className="flex justify-start animate-chat-bubble">
                <div className="bg-white text-[#111b21] rounded-lg rounded-tl-none px-3 py-2 shadow-xs flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 bg-[#8696a0] rounded-full animate-typing-dot" />
                  <span className="w-1.5 h-1.5 bg-[#8696a0] rounded-full animate-typing-dot [animation-delay:200ms]" />
                  <span className="w-1.5 h-1.5 bg-[#8696a0] rounded-full animate-typing-dot [animation-delay:400ms]" />
                </div>
              </div>
            )}
          </div>

          {/* Barra Inferior de Digitação do WhatsApp */}
          <div className="bg-[#f0f2f5] px-2 py-1.5 flex items-center gap-1.5 border-t border-slate-200/80 z-20">
            <div className="flex items-center gap-1 text-[#54656f] pl-1">
              <Smile className="w-4 h-4 opacity-75" />
            </div>
            <div className="flex-1 bg-white rounded-full px-2.5 py-1 text-[10.5px] text-[#54656f] flex items-center justify-between border border-slate-200/50">
              <span className="text-[#8696a0]">Mensagem</span>
              <Paperclip className="w-3.5 h-3.5 text-[#54656f] opacity-60" />
            </div>
            <div className="w-7 h-7 rounded-full bg-[#00a884] flex items-center justify-center text-white shadow-xs shrink-0">
              <Send className="w-3.5 h-3.5 translate-x-[1px]" />
            </div>
          </div>

          {/* Barra Home Indicator do iOS */}
          <div className="bg-[#f0f2f5] pt-0.5 pb-1 flex justify-center z-20">
            <div className="w-20 h-1 bg-black/40 rounded-full" />
          </div>

        </div>
      </div>
    </div>
  );
}
