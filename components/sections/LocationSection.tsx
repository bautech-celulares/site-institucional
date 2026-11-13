import React from "react";
import Image from "next/image";
import { CONTACTS } from "@/data/content";
import { Button } from "@/components/ui/Button";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { createWhatsAppUrl, WHATSAPP_INTENTS } from "@/lib/whatsapp";

export function LocationSection() {
  const { address, hours, phone, mapsUrl } = CONTACTS;

  const locationImage = (
    <Image
      src="fachada-bautech-sao-bento-do-sapucai"
      alt="Fachada e atendimento do balcão da assistência técnica Bautech no Centro de São Bento do Sapucaí"
      width={460}
      height={569}
      loading="lazy"
      sizes="(max-width: 768px) 100vw, 460px"
      className="aspect-[460/569] w-full rounded-[26px] object-cover"
    />
  );

  return (
    <section id="onde" className="scroll-mt-20 bg-brand-surface py-14 md:py-24">
      <div className="mx-auto flex w-full max-w-[1200px] flex-col items-center gap-10 px-5 md:flex-row md:gap-20 md:px-8 xl:px-0">
        <ScrollReveal className="flex flex-1 self-stretch flex-col items-start gap-5 md:self-auto">
          {/* 1. Título */}
          <h2 className="font-mirano text-[26px] leading-[1.2] tracking-tight text-brand-dark md:text-[34px]">
            Onde estamos
          </h2>

          {/* 2. Imagem: posicionada após o título exclusivamente na versão mobile */}
          <div className="w-full my-1 md:hidden">
            {locationImage}
          </div>

          {/* 3. Texto: endereço completo e contato */}
          <div className="flex flex-col gap-2">
            <address className="text-[17px] font-medium not-italic leading-[27px] text-brand-dark">
              {address.street}
              <br />
              {address.district}, {address.city}, {address.state}
              <br />
              CEP {address.zip}
            </address>
            <p className="text-[15px] font-medium text-brand-dark md:hidden">
              WhatsApp e telefone:{" "}
              <a
                href="tel:+5512991535658"
                className="font-bold text-brand-blue hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue rounded"
              >
                {phone}
              </a>
            </p>
          </div>

          {/* 4. Card: horários de funcionamento */}
          <div className="flex w-full flex-col rounded-[20px] bg-white px-6 py-2 shadow-sm">
            {hours.map((item) => (
              <div
                key={item.days}
                className="flex justify-between py-3.5 text-[15px] leading-5"
              >
                <span className="text-brand-muted">{item.days}</span>
                <span className="font-bold text-brand-dark">{item.hours}</span>
              </div>
            ))}
          </div>

          {/* No desktop, o telefone permanece no layout original logo após o card */}
          <p className="hidden text-[15px] font-medium text-brand-dark md:block">
            WhatsApp e telefone:{" "}
            <a
              href="tel:+5512991535658"
              className="font-bold text-brand-blue hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue rounded"
            >
              {phone}
            </a>
          </p>

          {/* 5. Botões de ação */}
          <div className="flex flex-wrap items-center gap-6 pt-2">
            <Button href={mapsUrl} icon={false}>
              Como chegar
            </Button>
            <a
              href={createWhatsAppUrl(WHATSAPP_INTENTS.location)}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[15px] font-bold text-brand-blue transition hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue focus-visible:ring-offset-2 rounded-md"
            >
              Chamar no WhatsApp
            </a>
          </div>
        </ScrollReveal>

        {/* Coluna da Imagem na versão desktop (mantida exatamente no layout original) */}
        <ScrollReveal delay={120} className="hidden w-full md:block md:w-[460px] md:shrink-0">
          {locationImage}
        </ScrollReveal>
      </div>
    </section>
  );
}
