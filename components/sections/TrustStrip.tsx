import React from "react";
import { CONTACTS } from "@/data/content";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

const ITEMS = [
  { value: "4,9 no Google", label: "16 avaliações de clientes" },
  { value: "10+ anos", label: "atendendo São Bento do Sapucaí" },
  { value: "Garantia por escrito", label: "90 dias na tela, 60 na bateria" },
  { value: "No Centro da cidade", label: CONTACTS.address.street },
];

export function TrustStrip() {
  return (
    <section aria-label="Por que confiar na Bautech" className="pb-12 md:pb-20">
      <div className="mx-auto w-full max-w-[1200px] px-5 md:px-8 xl:px-0">
        <ScrollReveal>
          <ul className="grid grid-cols-2 gap-x-4 gap-y-5 rounded-[20px] border border-brand-border bg-white p-5 md:grid-cols-4 md:gap-x-8 md:px-8 md:py-6">
            {ITEMS.map((item) => (
              <li key={item.value} className="flex flex-col gap-0.5">
                <span className="text-base font-bold leading-tight text-brand-blue md:text-lg">
                  {item.value}
                </span>
                <span className="text-sm leading-5 text-brand-muted">{item.label}</span>
              </li>
            ))}
          </ul>
        </ScrollReveal>
      </div>
    </section>
  );
}
