import React from "react";
import { DIFFERENTIALS } from "@/data/content";
import { SectionHead } from "@/components/ui/SectionHead";
import { Button } from "@/components/ui/Button";
import { FeatureIcon } from "@/components/ui/FeatureIcon";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { createWhatsAppUrl, WHATSAPP_INTENTS } from "@/lib/whatsapp";

export function DifferentialsSection() {
  const whatsappUrl = createWhatsAppUrl(WHATSAPP_INTENTS.hero);

  return (
    <section className="py-14 md:py-24">
      <div className="mx-auto flex w-full max-w-[1200px] flex-col gap-10 px-5 md:gap-14 md:px-8 xl:px-0">
        <ScrollReveal>
          <SectionHead
            title="Por que consertar o celular aqui na cidade"
            ctaText="Pedir meu orçamento"
            href={whatsappUrl}
            hideCtaOnMobile
          />
        </ScrollReveal>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {DIFFERENTIALS.map((diff, index) => (
            <ScrollReveal key={diff.title} delay={index * 90}>
              <div className="flex flex-col gap-3.5">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-surface">
                  <FeatureIcon name={diff.icon} />
                </div>
                <h3 className="text-base font-bold leading-[21px] text-brand-dark">
                  {diff.title}
                </h3>
                <p className="text-sm leading-[22px] text-brand-muted">
                  {diff.description}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Botão posicionado no final da sessão exclusivamente na versão mobile */}
        <div className="flex w-full justify-center md:hidden">
          <Button href={whatsappUrl} fullWidthOnMobile>
            Pedir meu orçamento
          </Button>
        </div>
      </div>
    </section>
  );
}
