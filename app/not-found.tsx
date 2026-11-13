import React from "react";
import Link from "next/link";
import { Logo } from "@/components/ui/Logo";
import { Button } from "@/components/ui/Button";
import { CONTACTS } from "@/data/content";
import { createWhatsAppUrl } from "@/lib/whatsapp";

export default function NotFound() {
  const helpfulLinks = [
    { label: "Nossos Serviços", href: "/#servicos", desc: "Troca de tela, bateria e conectores" },
    { label: "Como Funciona", href: "/#como-funciona", desc: "Do WhatsApp à retirada sem complicação" },
    { label: "Garantia de 90 Dias", href: "/#garantia", desc: "Termo formal por escrito em cada serviço" },
    { label: "Onde Estamos", href: "/#onde", desc: "R. Cândido José da Silva, 161 - Centro" },
    { label: "Dúvidas Frequentes", href: "/#duvidas", desc: "Respostas para as dúvidas mais comuns" },
  ];

  return (
    <div className="flex min-h-screen flex-col bg-white text-[#302E2C]">
      {/* Topo com Logo */}
      <header className="border-b border-brand-border bg-white px-5 py-4 md:px-10 md:py-5">
        <div className="mx-auto flex max-w-[1200px] items-center justify-between">
          <Link href="/" aria-label="Bautech - Início">
            <Logo className="h-8 w-auto md:h-10" />
          </Link>
          <Link
            href="/"
            className="text-sm font-bold text-brand-blue transition hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue rounded-md px-2 py-1"
          >
            &larr; Voltar ao site
          </Link>
        </div>
      </header>

      {/* Conteúdo Principal 404 */}
      <main className="flex flex-1 items-center justify-center py-12 md:py-20 px-5">
        <div className="mx-auto flex w-full max-w-[680px] flex-col items-center text-center">
          <h1 className="font-mirano text-[28px] leading-[1.2] tracking-tight text-brand-dark sm:text-[38px] md:text-[44px]">
            Essa página não está por aqui.
          </h1>

          <p className="mt-4 text-base leading-7 text-brand-muted md:text-[17px]">
            O endereço que você tentou acessar não existe ou foi alterado. Mas o balcão da{" "}
            <strong className="text-brand-dark font-bold">Bautech</strong> continua no mesmo lugar, pronto para
            resolver seu celular sem você precisar sair de São Bento do Sapucaí.
          </p>

          {/* Botões de Ação */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto">
            <Link
              href="/"
              className="inline-flex w-full sm:w-auto items-center justify-center rounded-full bg-brand-blue px-7 py-3.5 text-[15px] font-bold text-white shadow-sm transition hover:bg-brand-blue-hover active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue focus-visible:ring-offset-2"
            >
              Ir para a página inicial
            </Link>
            <Button
              href={createWhatsAppUrl(
                "Olá! Estava navegando no site da Bautech e não encontrei a página que procurava. Poderiam me ajudar?"
              )}
              variant="cyan"
              fullWidthOnMobile
            >
              Falar no WhatsApp
            </Button>
          </div>

          {/* Seção de Atalhos Rápidos */}
          <div className="mt-12 w-full rounded-2xl border border-brand-border bg-brand-surface/40 p-6 text-left">
            <h2 className="text-sm font-bold uppercase tracking-wider text-brand-dark">
              Talvez você estivesse procurando por:
            </h2>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {helpfulLinks.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="group flex flex-col rounded-xl bg-white p-3.5 shadow-2xs transition hover:border-brand-blue hover:shadow-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue"
                >
                  <span className="text-sm font-bold text-brand-blue group-hover:underline">
                    {item.label} &rarr;
                  </span>
                  <span className="mt-0.5 text-xs text-brand-muted">{item.desc}</span>
                </Link>
              ))}
            </div>
          </div>

          {/* Dados de Contato Físico */}
          <div className="mt-8 text-xs text-brand-muted">
            <p>
              Balcão físico: <strong>{CONTACTS.address.street}</strong>, Centro — São Bento do Sapucaí - SP
            </p>
            <p className="mt-1">
              WhatsApp e telefone: <strong>{CONTACTS.phone}</strong>
            </p>
          </div>
        </div>
      </main>

      {/* Rodapé Minimalista */}
      <footer className="border-t border-brand-border py-6 text-center text-xs text-brand-muted">
        <p>© {new Date().getFullYear()} Bautech Assistência Técnica. Todos os direitos reservados.</p>
      </footer>
    </div>
  );
}

