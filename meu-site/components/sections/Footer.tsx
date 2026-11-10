import React from "react";
import { CONTACTS } from "@/data/content";
import { Logo } from "@/components/ui/Logo";
import { Button } from "@/components/ui/Button";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { IPhoneWhatsAppMockup } from "@/components/ui/IPhoneWhatsAppMockup";
import { createWhatsAppUrl, WHATSAPP_INTENTS } from "@/lib/whatsapp";

export function Footer() {
  const { address, phone, instagram, facebook, cnpj } = CONTACTS;

  return (
    <footer className="bg-brand-surface py-14 md:py-[72px]">
      <div className="mx-auto flex w-full max-w-[1200px] flex-col gap-14 px-5 md:px-8 xl:px-0">
        {/* Banner CTA Final com Mockup de iPhone e WhatsApp */}
        <ScrollReveal>
          <div className="flex flex-col items-center justify-between gap-8 rounded-[30px] bg-brand-blue p-6 sm:p-8 md:p-12 lg:flex-row lg:items-center lg:gap-14 shadow-xl shadow-brand-blue/15">
            {/* No Desktop: Mockup do iPhone posicionado à ESQUERDA */}
            <div className="hidden lg:flex shrink-0 justify-center">
              <IPhoneWhatsAppMockup />
            </div>

            <div className="flex flex-1 flex-col gap-3.5 text-center lg:text-left w-full">
              {/* Badge */}
              <div className="inline-flex items-center justify-center lg:justify-start gap-1.5 text-xs font-bold uppercase tracking-wider text-[#99D5F9]">
                <span className="h-2 w-2 rounded-full bg-[#25D366] animate-pulse" />
                Atendimento Rápido via WhatsApp
              </div>

              {/* No Mobile: Mockup posicionado ACIMA do título e ABAIXO de 'Atendimento Rápido via WhatsApp' */}
              <div className="flex lg:hidden justify-center my-2">
                <IPhoneWhatsAppMockup />
              </div>

              {/* Título */}
              <h2 className="font-mirano text-[26px] leading-[1.19] text-white sm:text-[32px] lg:text-[36px]">
                Seu celular não precisa esperar
              </h2>

              {/* Subtítulo */}
              <p className="text-[15px] leading-6 text-[#E0F0FA] max-w-[540px] mx-auto lg:mx-0">
                Mande o modelo e o problema no WhatsApp e receba o valor e o prazo.
                Atendemos de segunda a sábado, no Centro de São Bento do Sapucaí.
              </p>

              {/* Lista de diferenciais rápidos (peça sob encomenda) */}
              <ul className="flex flex-col gap-2 text-sm text-[#E0F0FA] text-left mx-auto lg:mx-0 max-w-[420px] pt-1">
                <li className="flex items-center gap-2">
                  <span className="text-[#25D366] font-bold text-base">✓</span>
                  Orçamento imediato e sem compromisso
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-[#25D366] font-bold text-base">✓</span>
                  Peça sob encomenda para o seu modelo
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-[#25D366] font-bold text-base">✓</span>
                  Garantia de 90 dias na tela e 60 dias na bateria
                </li>
              </ul>

              {/* Botão no desktop fica aqui na coluna de texto */}
              <div className="hidden lg:block pt-3">
                <Button
                  variant="white"
                  icon={false}
                  href={createWhatsAppUrl(WHATSAPP_INTENTS.footer)}
                  className="shadow-lg hover:shadow-xl transition-all"
                >
                  Chamar a Bautech no WhatsApp
                </Button>
              </div>
            </div>

            {/* Botão no mobile fica no final da sessão */}
            <div className="block lg:hidden w-full sm:w-auto">
              <Button
                variant="white"
                icon={false}
                href={createWhatsAppUrl(WHATSAPP_INTENTS.footer)}
                className="w-full sm:w-auto shadow-lg"
              >
                Chamar a Bautech no WhatsApp
              </Button>
            </div>
          </div>
        </ScrollReveal>

        {/* Links e Informações de Contato */}
        <div className="grid gap-10 text-sm leading-[22px] text-brand-muted sm:grid-cols-2 lg:grid-cols-4 lg:gap-12">
          <div className="flex flex-col gap-3.5">
            <Logo />
            <p className="text-[15px]">Consertar pode ser simples!</p>
          </div>
          <div className="flex flex-col gap-2.5">
            <b className="text-brand-blue">Na página</b>
            <a href="#servicos" className="transition hover:text-brand-blue focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue rounded-sm">
              Serviços
            </a>
            <a href="#como-funciona" className="transition hover:text-brand-blue focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue rounded-sm">
              Como funciona
            </a>
            <a href="#garantia" className="transition hover:text-brand-blue focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue rounded-sm">
              Garantia
            </a>
            <a href="#onde" className="transition hover:text-brand-blue focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue rounded-sm">
              Onde estamos
            </a>
            <a href="#duvidas" className="transition hover:text-brand-blue focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue rounded-sm">
              Dúvidas
            </a>
          </div>
          <div className="flex flex-col gap-2.5">
            <b className="text-brand-blue">Loja</b>
            <p>
              {address.street}
              <br />
              {address.district}, {address.city}, {address.state}
              <br />
              CEP {address.zip}
            </p>
            <p>
              Segunda a sexta, das 9h às 18h
              <br />
              Sábado, das 9h30 às 12h
              <br />
              Domingo, fechado
            </p>
          </div>
          <div className="flex flex-col gap-2.5">
            <b className="text-brand-blue">Contato</b>
            <a
              href={CONTACTS.whatsappUrl}
              target="_blank"
              rel="noreferrer"
              className="transition hover:text-brand-blue focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue rounded-sm"
            >
              WhatsApp {phone}
            </a>
            <a
              href={CONTACTS.instagramUrl}
              target="_blank"
              rel="noreferrer"
              className="transition hover:text-brand-blue focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue rounded-sm"
            >
              Instagram {instagram}
            </a>
            <a
              href="https://facebook.com/bautech.sbs"
              target="_blank"
              rel="noreferrer"
              className="transition hover:text-brand-blue focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue rounded-sm"
            >
              Facebook {facebook}
            </a>
          </div>
        </div>

        <p className="text-[13px] text-brand-muted">
          © {new Date().getFullYear()} Bautech. CNPJ {cnpj}.
        </p>
      </div>
    </footer>
  );
}

