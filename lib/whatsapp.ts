import { CONTACTS } from "@/data/content";

/**
 * Cria URLs do WhatsApp pré-formatadas com mensagens contextuais inteligentes
 */
export function createWhatsAppUrl(customMessage?: string): string {
  if (!customMessage) {
    return CONTACTS.whatsappUrl;
  }
  return `${CONTACTS.whatsappUrl}?text=${encodeURIComponent(customMessage)}`;
}

export const WHATSAPP_INTENTS = {
  // Chamada principal no Hero
  hero: `Olá! Gostaria de um orçamento para o conserto do meu celular na Bautech.\n\n📱 Modelo do aparelho:\n🔧 Problema apresentado:`,

  // Seção de Garantia
  warranty: `Olá! Vi no site que os serviços têm até 90 dias de garantia. Gostaria de um orçamento para o meu aparelho:\n\n📱 Modelo:\n🔧 Serviço necessário:`,

  // Seção de Dúvidas (FAQ)
  faq: `Olá! Estava no site da Bautech e fiquei com uma dúvida sobre conserto. Poderiam me orientar?\n\nMinha dúvida é:`,

  // Seção Onde Estamos (visita presencial / rota)
  location: `Olá! Gostaria de confirmar o atendimento no balcão da R. Cândido José da Silva, 161, para levar meu aparelho para análise.`,

  // Rodapé / Banner final
  footer: `Olá! Gostaria de consultar valor e prazo para conserto do meu aparelho na Bautech.\n\n📱 Modelo:\n🔧 O que está acontecendo:`,

  // Botão flutuante rápido
  floating: `Olá, equipe Bautech! Gostaria de falar com um técnico sobre o meu celular.`,

  // Mensagens inteligentes dedicadas por serviço
  services: {
    "Troca de tela": `Olá! Preciso trocar a tela do meu celular na Bautech.\n\n📱 Modelo do aparelho:\n⚠️ Defeito (tela trincada, com manchas ou sem toque):\n\nPoderiam me passar o valor e prazo com garantia de 90 dias?`,
    "Troca de bateria": `Olá! Meu celular está descarregando rápido e preciso trocar a bateria na Bautech.\n\n📱 Modelo do aparelho:\n\nVocês têm essa bateria para troca e qual o valor com garantia de 60 dias?`,
    "Troca de conector": `Olá! O conector de carga do meu celular está com defeito (não carrega ou falha).\n\n📱 Modelo do aparelho:\n\nPoderiam me passar o valor do conserto com garantia?`,
    "Acessórios para celular": `Olá! Gostaria de saber se vocês têm no balcão da Bautech o acessório que preciso:\n\n🔌 Acessório (cabo, carregador, película, etc.):\n📱 Modelo do meu aparelho:`,
    "Acessórios para PC": `Olá! Gostaria de consultar se vocês têm no balcão da Bautech o seguinte acessório para computador/notebook:\n\n💻 Item que procuro:`,
    "Impressão e xérox": `Olá! Gostaria de saber como faço para enviar um arquivo para impressão ou cópia no balcão da Bautech.`,
    "Revelação de fotos": `Olá! Gostaria de informações sobre revelação de fotos na Bautech. Como posso enviar as fotos e quais os prazos?`,
    "Venda e recarga": `Olá! Gostaria de informações sobre produtos e recarga de celular no balcão da Bautech.`,
  } as Record<string, string>,
};

