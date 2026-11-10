import React from "react";
import { HOW_IT_WORKS_STEPS } from "@/data/content";
import { SectionHead } from "@/components/ui/SectionHead";
import { Button } from "@/components/ui/Button";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { createWhatsAppUrl, WHATSAPP_INTENTS } from "@/lib/whatsapp";

export function HowItWorksSection() {
  const whatsappUrl = createWhatsAppUrl(WHATSAPP_INTENTS.hero);

  return (
    <section id="como-funciona" className="scroll-mt-20 bg-brand-surface py-14 md:py-24">
      <div className="mx-auto flex w-full max-w-[1200px] flex-col gap-10 px-5 md:gap-14 md:px-8 xl:px-0">
        <ScrollReveal>
          <SectionHead
            title="Do WhatsApp à retirada, sem complicação"
            ctaText="Pedir orçamento no WhatsApp"
            href={whatsappUrl}
            hideCtaOnMobile
          />
        </ScrollReveal>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {HOW_IT_WORKS_STEPS.map((step, index) => (
            <ScrollReveal key={step.title} delay={index * 90}>
              <div className="flex flex-col gap-3 rounded-[20px] bg-white p-6 shadow-sm h-full">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-whatsapp font-bold text-white">
                  {index + 1}
                </div>
                <h3 className="text-[17px] font-bold leading-[22px] text-brand-dark">
                  {step.title}
                </h3>
                <p className="text-sm leading-[22px] text-brand-muted">
                  {step.description}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Botão posicionado no final da sessão exclusivamente na versão mobile */}
        <div className="flex w-full justify-center md:hidden">
          <Button href={whatsappUrl} fullWidthOnMobile>
            Pedir orçamento no WhatsApp
          </Button>
        </div>
      </div>
    </section>
  );
}
