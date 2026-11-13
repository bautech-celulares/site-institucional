import React from "react";
import Image from "next/image";
import { WARRANTY_PERIODS } from "@/data/content";
import { Button } from "@/components/ui/Button";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { SparklesCore } from "@/components/ui/sparkles";
import { createWhatsAppUrl, WHATSAPP_INTENTS } from "@/lib/whatsapp";

export function WarrantySection() {
  return (
    <section
      id="garantia"
      className="relative scroll-mt-20 overflow-hidden bg-brand-dark py-14 text-white md:py-24"
    >
      {/* Background animado de partículas / Sparkles */}
      <div className="pointer-events-none absolute inset-0 z-0 h-full w-full overflow-hidden">
        <SparklesCore className="absolute inset-0 h-full w-full" count={44} />
        {/* Gradientes sutis para garantir profundidade e contraste do texto */}
        <div className="absolute inset-0 bg-gradient-to-b from-brand-dark via-transparent to-brand-dark opacity-60" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_20%,_#302E2C_90%)] opacity-70" />
      </div>

      <div className="relative z-10 mx-auto flex w-full max-w-[1200px] flex-col items-center gap-10 px-5 md:px-8 lg:flex-row lg:gap-[72px] xl:px-0">
        {/* Bloco de Imagem: order-1 no mobile (aparece antes do texto), order-2 no desktop */}
        <ScrollReveal
          delay={120}
          className="order-1 w-full lg:order-2 lg:w-[560px] lg:shrink-0"
        >
          <Image
            src="garantia-conserto-celular"
            alt="Técnico manuseando placa de smartphone com certificado de garantia formal"
            width={560}
            height={420}
            loading="lazy"
            sizes="(max-width: 1024px) 100vw, 560px"
            className="aspect-[560/420] w-full rounded-[26px] object-cover border border-white/10 shadow-2xl"
          />
        </ScrollReveal>

        {/* Bloco de Conteúdo: order-2 no mobile, order-1 no desktop */}
        <ScrollReveal className="order-2 flex flex-1 flex-col items-start gap-6 lg:order-1">
          <h2 className="font-mirano text-[26px] leading-[1.2] tracking-tight text-white md:text-[34px]">
            Garantia por escrito em todo conserto
          </h2>
          <p className="leading-[26px] text-brand-on-dark">
            Cada serviço sai com termo de garantia. A contagem do prazo começa
            quando o aparelho fica pronto para retirada.
          </p>
          <div className="grid w-full grid-cols-2 gap-3 sm:grid-cols-4">
            {WARRANTY_PERIODS.map((item) => (
              <div
                key={item.service}
                className="flex flex-col gap-1 rounded-2xl bg-brand-dark-card/90 backdrop-blur-sm p-4 border border-white/5 transition hover:bg-brand-dark-hover hover:border-brand-cyan/20"
              >
                <span className="text-2xl font-bold leading-[26px] text-brand-cyan">
                  {item.period}
                </span>
                <span className="text-sm leading-5 text-brand-on-dark">
                  {item.service}
                </span>
              </div>
            ))}
          </div>
          <Button
            variant="cyan"
            href={createWhatsAppUrl(WHATSAPP_INTENTS.warranty)}
          >
            Pedir orçamento com garantia
          </Button>
        </ScrollReveal>
      </div>
    </section>
  );
}
