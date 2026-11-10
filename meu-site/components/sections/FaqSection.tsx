"use client";

import React, { useState } from "react";
import { FAQS } from "@/data/content";
import { Button } from "@/components/ui/Button";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { createWhatsAppUrl, WHATSAPP_INTENTS } from "@/lib/whatsapp";

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0); // Primeira pergunta aberta por padrão

  const toggleQuestion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="duvidas" className="scroll-mt-20 py-14 md:py-24">
      <div className="mx-auto flex w-full max-w-[1200px] flex-col gap-10 px-5 md:flex-row md:gap-20 md:px-8 xl:px-0">
        {/* Título e CTA Lateral */}
        <ScrollReveal className="flex flex-col items-start gap-5 md:w-[360px] md:shrink-0 md:gap-6">
          <h2 className="font-mirano text-[26px] leading-[1.2] tracking-tight text-brand-dark md:text-[34px]">
            Dúvidas frequentes
          </h2>
          <p className="text-sm text-brand-muted md:text-[15px]">
            Não encontrou sua resposta aqui? Fale direto com nossos técnicos no WhatsApp.
          </p>
          <Button
            href={createWhatsAppUrl(WHATSAPP_INTENTS.faq)}
            className="!px-6 !text-sm"
          >
            Tirar minha dúvida no WhatsApp
          </Button>
        </ScrollReveal>

        {/* Lista de Perguntas (Acordeão Interativo) */}
        <ScrollReveal delay={120} className="flex flex-1 flex-col">
          {FAQS.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={faq.question}
                className="border-b border-brand-border py-4 md:py-[22px] first:pt-0"
              >
                <button
                  id={`faq-question-${index}`}
                  type="button"
                  onClick={() => toggleQuestion(index)}
                  className="flex w-full items-center justify-between gap-4 text-left font-bold text-brand-dark transition hover:text-brand-blue focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue focus-visible:ring-offset-2 rounded-md"
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${index}`}
                >
                  <span className="text-[16px] leading-[22px] md:text-[17px] md:leading-[23px]">
                    {faq.question}
                  </span>
                  <span
                    className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-brand-surface text-brand-blue transition-transform duration-200 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  >
                    <svg
                      width="12"
                      height="8"
                      viewBox="0 0 12 8"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M1 1.5L6 6.5L11 1.5" />
                    </svg>
                  </span>
                </button>
                {isOpen && (
                  <div
                    id={`faq-answer-${index}`}
                    role="region"
                    aria-labelledby={`faq-question-${index}`}
                    className="pt-3 text-[14px] leading-6 text-brand-muted md:text-[15px]"
                  >
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </ScrollReveal>
      </div>
    </section>
  );
}
