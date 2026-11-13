import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { createWhatsAppUrl, WHATSAPP_INTENTS } from "@/lib/whatsapp";

export function AboutSection() {
  const aboutImage = (
    <div className="relative w-full">
      <Image
        src="tecnico-bautech-bancada"
        alt="Técnico da Bautech realizando manutenção de precisão em bancada com ferramentas especializadas"
        width={480}
        height={506}
        className="aspect-[480/506] w-full rounded-[26px] object-cover"
      />
      <div className="absolute bottom-6 left-6 flex w-[195px] flex-col justify-center gap-1 rounded-[20px] bg-white p-4 shadow-[0_8px_24px_rgba(0,0,0,0.12)]">
        <span className="text-[28px] font-bold leading-[31px] text-brand-blue">
          10+ anos
        </span>
        <span className="w-40 text-sm leading-[18px] text-brand-muted">
          atendendo São Bento do Sapucaí
        </span>
      </div>
    </div>
  );

  return (
    <section className="py-14 md:py-24">
      <div className="mx-auto flex w-full max-w-[1200px] flex-col gap-10 px-5 md:flex-row md:items-end md:gap-20 md:px-8 xl:px-0">
        <ScrollReveal className="flex flex-1 flex-col items-start gap-5">
          <h2 className="font-mirano text-[26px] leading-[1.2] tracking-tight text-brand-dark md:text-[34px]">
            Bautech, assistência técnica do Centro de São Bento do Sapucaí
          </h2>

          {/* Imagem posicionada após o título exclusivamente na versão mobile */}
          <div className="w-full my-2 md:hidden">
            {aboutImage}
          </div>

          <div className="flex flex-col gap-3 leading-[26px] text-brand-muted">
            <p>
              A Bautech cuida de celular em São Bento do Sapucaí há mais de 10
              anos. Existimos para simplificar o conserto: explicar o problema,
              indicar a solução certa e tratar cada aparelho com responsabilidade.
            </p>
            <p>
              Aqui você resolve o conserto, leva o carregador e imprime o que
              precisar no mesmo lugar, e fala com gente da cidade, sem protocolo.
            </p>
            <p>
              No nosso logotipo, a Pedra do Baú aparece dentro da tela do
              celular. É a nossa região presente em cada conserto.
            </p>
          </div>
          <Button href={createWhatsAppUrl(WHATSAPP_INTENTS.about)}>Falar com a Bautech</Button>
        </ScrollReveal>

        {/* Coluna da Imagem no desktop (mantida exatamente no layout original) */}
        <ScrollReveal delay={120} className="relative hidden w-full md:block md:w-[480px] md:shrink-0">
          {aboutImage}
        </ScrollReveal>
      </div>
    </section>
  );
}
