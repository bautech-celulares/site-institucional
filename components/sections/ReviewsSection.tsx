import React from "react";
import { CONTACTS, FEATURED_REVIEW, REVIEWS } from "@/data/content";
import { Button } from "@/components/ui/Button";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { TestimonialsMarquee } from "@/components/ui/TestimonialsMarquee";
import { createWhatsAppUrl } from "@/lib/whatsapp";

export function ReviewsSection() {
  const whatsappUrl = createWhatsAppUrl(
    "Olá! Vi as avaliações no site da Bautech e gostaria de pedir um orçamento para o meu aparelho."
  );

  return (
    <section className="bg-brand-surface py-14 md:py-24 overflow-hidden">
      <div className="mx-auto flex w-full max-w-[1200px] flex-col gap-10 px-5 md:flex-row md:items-stretch md:gap-14 lg:gap-20 md:px-8 xl:px-0">
        {/* Card Destaque 4,9 no Google */}
        <ScrollReveal className="flex flex-col items-center justify-end gap-2 rounded-[26px] bg-brand-blue px-14 py-14 text-center md:w-[380px] lg:w-[400px] md:shrink-0 md:py-16">
          <span className="text-2xl text-amber-300" aria-label="5 de 5 estrelas">
            ★★★★★
          </span>
          <span className="font-mirano text-[72px] leading-none text-white md:text-[96px]">
            4,9
          </span>
          <span className="max-w-[260px] text-[15px] leading-[21px] text-white">
            nota no Google, com 16 avaliações de clientes
          </span>
        </ScrollReveal>

        {/* Coluna de Depoimentos com Efeito Marquee */}
        <ScrollReveal
          delay={120}
          className="flex flex-1 flex-col justify-between gap-6 min-w-0 max-w-full overflow-hidden"
        >
          <div className="flex flex-col gap-3">
            <h2 className="font-mirano text-[26px] leading-[1.2] tracking-tight text-brand-dark md:text-[34px]">
              Quem já foi atendido recomenda
            </h2>
            <p className="text-[20px] sm:text-[22px] font-bold leading-[31px] text-brand-blue">
              “{FEATURED_REVIEW.text}”
            </p>
            <p className="text-[13px] text-brand-muted">
              {FEATURED_REVIEW.author.name}, avaliação de 5 estrelas no Google
            </p>
          </div>

          {/* Carrossel Infinito (Marquee) — Pausa ao passar o mouse ou focar */}
          <div className="w-full min-w-0 max-w-full overflow-hidden py-1">
            <TestimonialsMarquee
              testimonials={REVIEWS}
              duration="30s"
            />
          </div>

          {/* Botões de Ação */}
          <div className="flex flex-wrap items-center gap-6 pt-1">
            <Button href={whatsappUrl}>Chamar no WhatsApp</Button>
            <a
              href={CONTACTS.googleReviewsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[15px] font-bold text-brand-blue transition hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue focus-visible:ring-offset-2 rounded-md"
            >
              Ver as avaliações no Google
            </a>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
