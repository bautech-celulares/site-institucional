import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { StoreStatusLine } from "@/components/ui/StoreStatusLine";
import { createWhatsAppUrl, WHATSAPP_INTENTS } from "@/lib/whatsapp";

export function HeroSection() {
  return (
    <section className="py-10 md:py-[88px]">
      <div className="mx-auto flex w-full max-w-[1200px] flex-col gap-8 px-5 md:px-8 lg:flex-row lg:items-end lg:gap-[60px] xl:px-0">
        {/* Bloco de Texto: no mobile fica depois da imagem (order-2), no desktop volta para a esquerda (lg:order-1) */}
        <div className="order-2 flex flex-1 flex-col items-start gap-5 md:gap-6 lg:order-1 motion-safe:animate-hero-fade-up anim-delay-100">
          <h1 className="font-mirano text-[28px] leading-[1.16] tracking-tight sm:text-[34px] md:text-[44px]">
            Trincou a tela? Não precisa comprar outro celular.
          </h1>
          <p className="text-[16px] leading-7 text-brand-muted md:text-[18px]">
            Troca de tela, bateria e conector de carga na Bautech, no Centro de
            São Bento do Sapucaí, com garantia de 90 dias na tela.
          </p>
          <p className="text-[15px] font-medium text-brand-blue md:text-base">
            Mande o modelo e o problema no WhatsApp e receba o valor e o prazo.
          </p>
          <div className="flex w-full flex-col items-start gap-3 sm:flex-row sm:items-center sm:gap-4">
            <Button href={createWhatsAppUrl(WHATSAPP_INTENTS.hero)}>
              Pedir orçamento no WhatsApp
            </Button>
            <StoreStatusLine />
          </div>
        </div>

        {/* Imagem Hero com Selo Google: no mobile fica no topo antes do título (order-1), no desktop fica na direita (lg:order-2) */}
        <div className="order-1 relative w-full lg:order-2 lg:w-[540px] lg:shrink-0">
          <Image
            src="celular-tela-trincada"
            alt="Smartphone com tela frontal severamente trincada segurado na mão pronto para reparo na Bautech"
            width={540}
            height={497}
            priority
            fetchPriority="high"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 540px"
            className="aspect-[540/497] w-full rounded-[20px] object-cover sm:rounded-[26px]"
          />
          <div className="absolute bottom-4 left-4 flex w-[200px] flex-col gap-0.5 rounded-[18px] bg-white p-3.5 shadow-[0_8px_24px_rgba(0,0,0,0.12)] sm:bottom-6 sm:left-6 sm:w-[220px] sm:gap-1 sm:rounded-[20px] sm:p-4 motion-safe:animate-hero-fade-up anim-delay-200">
            <span className="text-sm text-amber-500 sm:text-base">★★★★★</span>
            <span className="text-[28px] font-bold leading-none text-brand-blue sm:text-[32px] sm:leading-[35px]">
              4,9
            </span>
            <span className="text-[13px] leading-tight text-brand-muted sm:text-sm sm:leading-[18px]">
              nota no Google, com 16 avaliações
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
