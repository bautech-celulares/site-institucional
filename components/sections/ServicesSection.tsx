"use client";

import React, { useRef, useState, useCallback, useEffect } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "@/components/ui/icons";
import { SERVICES } from "@/data/content";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { cn } from "@/lib/utils";
import { createWhatsAppUrl, WHATSAPP_INTENTS } from "@/lib/whatsapp";

export function ServicesSection() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);

  // Verifica a possibilidade de rolar para atualizar os botões de seta com rAF
  const rafId = useRef<number | null>(null);
  const checkScrollability = useCallback(() => {
    if (rafId.current !== null) {
      cancelAnimationFrame(rafId.current);
    }
    rafId.current = requestAnimationFrame(() => {
      const container = scrollContainerRef.current;
      if (container) {
        const { scrollLeft, scrollWidth, clientWidth } = container;
        setCanScrollLeft(scrollLeft > 5);
        setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 5);
        if (clientWidth > 0) setActiveIndex(Math.round(scrollLeft / (clientWidth + 16)));
      }
    });
  }, []);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (container) {
      checkScrollability();
      container.addEventListener("scroll", checkScrollability, { passive: true });
      window.addEventListener("resize", checkScrollability);
    }
    return () => {
      if (rafId.current !== null) {
        cancelAnimationFrame(rafId.current);
      }
      if (container) {
        container.removeEventListener("scroll", checkScrollability);
        window.removeEventListener("resize", checkScrollability);
      }
    };
  }, [checkScrollability]);

  // Deslize automatico no mobile (sem loop): so roda enquanto o carrossel esta na tela,
  // avanca 1 card por vez e cessa ao fim do trilho ou ao primeiro toque do usuario
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;
    const isMobile = window.innerWidth < 640;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!isMobile || prefersReducedMotion) return;

    let stopped = false;
    let intervalId: number | undefined;

    const pause = () => {
      window.clearInterval(intervalId);
      intervalId = undefined;
    };
    const stop = () => {
      stopped = true;
      pause();
    };
    const tick = () => {
      const { scrollLeft, scrollWidth, clientWidth } = container;
      if (scrollLeft >= scrollWidth - clientWidth - 15) {
        stop();
        return;
      }
      container.scrollBy({ left: clientWidth + 16, behavior: "smooth" });
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (stopped) return;
        if (entry.isIntersecting) {
          if (intervalId === undefined) intervalId = window.setInterval(tick, 3800);
        } else {
          pause();
        }
      },
      { threshold: 0.6 }
    );
    observer.observe(container);

    container.addEventListener("touchstart", stop, { passive: true });
    container.addEventListener("pointerdown", stop, { passive: true });

    return () => {
      observer.disconnect();
      pause();
      container.removeEventListener("touchstart", stop);
      container.removeEventListener("pointerdown", stop);
    };
  }, []);

  // Manipulador de rolagem suave: no mobile rola 1 card por vez (largura total)
  const scroll = (direction: "left" | "right") => {
    const container = scrollContainerRef.current;
    if (container) {
      const isMobile = window.innerWidth < 640;
      // No mobile, desliza exatamente 1 card inteiro (largura visível + gap)
      const scrollAmount = isMobile ? container.clientWidth + 16 : container.clientWidth * 0.8;
      container.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <section id="servicos" className="scroll-mt-20 py-14 md:py-24">
      <div className="mx-auto flex w-full max-w-[1200px] flex-col gap-6 px-5 md:gap-10 md:px-8 xl:px-0">
        {/* Cabeçalho da Seção */}
        <ScrollReveal>
          <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
            <div>
              <h2 className="font-mirano text-[26px] leading-[1.2] tracking-tight text-brand-dark md:text-[34px]">
                O que a Bautech resolve:
              </h2>
              <p className="mt-1 text-sm text-brand-muted md:text-base">
                <span className="sm:hidden">Deslize para ver todos os nossos serviços e consertos</span>
                <span className="hidden sm:inline">Use as setas para ver todos os nossos serviços</span>
              </p>
            </div>

            {/* Botões de Navegação do Carrossel */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => scroll("left")}
                disabled={!canScrollLeft}
                aria-label="Rolar para esquerda"
                className={cn(
                  "flex h-11 w-11 items-center justify-center rounded-full border border-brand-border bg-white text-brand-blue shadow-sm transition-colors duration-200 hover:bg-brand-surface hover:border-brand-blue focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-30"
                )}
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                type="button"
                onClick={() => scroll("right")}
                disabled={!canScrollRight}
                aria-label="Rolar para direita"
                className={cn(
                  "flex h-11 w-11 items-center justify-center rounded-full border border-brand-border bg-white text-brand-blue shadow-sm transition-colors duration-200 hover:bg-brand-surface hover:border-brand-blue focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-30"
                )}
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>
        </ScrollReveal>

        {/* Trilho de Cards em Carrossel: no mobile 1 card preenche 100% da largura */}
        <ScrollReveal delay={100}>
          <div
            ref={scrollContainerRef}
            className="flex overflow-x-auto scroll-smooth snap-x snap-mandatory scrollbar-none pb-4 space-x-4 sm:space-x-6"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
          {SERVICES.map((service) => {
            // Tag de garantia apenas nos serviços de troca (tela, bateria, conector)
            const badge = service.warrantyDays
              ? `${service.warrantyDays} dias de garantia`
              : null;
            const waMessage =
              WHATSAPP_INTENTS.services[service.title] ||
              `Olá! Gostaria de um orçamento para o serviço de ${service.title} na Bautech.`;
            const waLink = createWhatsAppUrl(waMessage);

            return (
              <article
                key={service.title}
                className="group flex-shrink-0 w-full sm:w-[280px] lg:w-[290px] snap-center sm:snap-start flex flex-col justify-between overflow-hidden rounded-[20px] bg-brand-surface transition-[transform,box-shadow] duration-300 hover:shadow-lg hover:-translate-y-1"
              >
                <div>
                  {/* Imagem do Serviço (com tag somente se for serviço de troca) */}
                  <div className="relative h-[180px] sm:h-[155px] w-full overflow-hidden bg-slate-200">
                    <Image
                      src={service.image}
                      alt={service.title}
                      width={290}
                      height={180}
                      loading="lazy"
                      sizes="(max-width: 640px) 100vw, 290px"
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    {badge && (
                      <div className="absolute top-3 left-3">
                        <span className="inline-block rounded-full bg-brand-blue px-3 py-1 text-xs font-bold text-white shadow-sm">
                          {badge}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Informações de Texto */}
                  <div className="flex flex-col gap-2 p-5 sm:p-5">
                    <h3 className="text-[18px] sm:text-[17px] font-bold leading-[22px] text-brand-dark">
                      {service.title}
                    </h3>
                    <p className="text-sm leading-[21px] text-brand-muted">
                      {service.description}
                    </p>
                  </div>
                </div>

                {/* Ação rápida no card */}
                <div className="p-5 pt-0">
                  <a
                    href={waLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Consultar ${service.title.toLowerCase()} no WhatsApp`}
                    className="inline-flex w-full items-center justify-center rounded-full bg-white py-3 sm:py-2.5 text-sm font-bold text-brand-blue border border-brand-blue/20 shadow-xs transition-colors hover:bg-brand-blue hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue"
                  >
                    Consultar este serviço
                  </a>
                </div>
              </article>
            );
          })}
          </div>

          {/* Indicador de progresso (somente mobile, decorativo) */}
          <div aria-hidden="true" className="flex justify-center gap-1.5 sm:hidden">
            {SERVICES.map((service, i) => (
              <span
                key={service.title}
                className={cn(
                  "h-1.5 rounded-full transition-[width,background-color] duration-300",
                  i === activeIndex ? "w-5 bg-brand-blue" : "w-1.5 bg-brand-border"
                )}
              />
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
