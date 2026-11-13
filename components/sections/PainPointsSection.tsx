import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

export function PainPointsSection() {
  return (
    <section className="bg-brand-surface py-14 md:py-24">
      <div className="mx-auto flex w-full max-w-[1200px] flex-col items-center gap-10 px-5 md:flex-row md:gap-20 md:px-8 xl:px-0">
        <ScrollReveal className="w-full md:w-[520px] md:shrink-0">
          <Image
            src="cliente-preocupada-celular-com-defeito"
            alt="Mulher preocupada olhando para o celular com defeito e segurando a cabeça"
            width={520}
            height={476}
            className="aspect-[520/476] w-full rounded-[26px] object-cover"
          />
        </ScrollReveal>
        <ScrollReveal delay={120} className="flex flex-1 flex-col items-start gap-5">
          <h2 className="font-mirano text-[26px] leading-[1.2] tracking-tight text-brand-dark md:text-[34px]">
            Quando o celular para, o seu dia para junto
          </h2>
          <div className="flex flex-col gap-3 leading-[26px] text-brand-muted">
            <p>
              Ele é seu WhatsApp de trabalho, seu banco, seu Pix e o jeito de a
              família falar com você. Aí a tela trinca, a bateria não segura o dia
              ou o carregador para de pegar, e tudo fica mais difícil.
            </p>
            <p>
              Junto vem a preocupação: perder fotos e conversas, ficar dias sem
              aparelho, pagar por uma peça que dá problema de novo, ou ter que
              sair da cidade para resolver.
            </p>
            <p>
              Antes de pensar em aparelho novo, vale saber quanto custa o
              conserto. O orçamento é rápido e começa no WhatsApp.
            </p>
          </div>
          <Button>Descobrir o valor do meu conserto</Button>
        </ScrollReveal>
      </div>
    </section>
  );
}

