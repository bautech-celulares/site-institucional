export const CONTACTS = {
  phone: "(12) 99153-5658",
  whatsappUrl: "https://wa.me/5512991535658",
  mapsUrl:
    "https://www.google.com/maps/search/?api=1&query=Rua+C%C3%A2ndido+Jos%C3%A9+da+Silva+161+Centro+S%C3%A3o+Bento+do+Sapuca%C3%AD",
  googleReviewsUrl:
    "https://www.google.com/maps/search/?api=1&query=Bautech+S%C3%A3o+Bento+do+Sapuca%C3%AD",
  instagram: "@bautech_celulares",
  instagramUrl: "https://www.instagram.com/bautech_celulares/",
  facebook: "/bautech.sbs",
  cnpj: "53.473.042/0001-06",
  address: {
    street: "R. Cândido José da Silva, 161",
    district: "Centro",
    city: "São Bento do Sapucaí",
    state: "SP",
    zip: "12490-000",
  },
  hours: [
    { days: "Segunda a sexta", hours: "9h às 18h" },
    { days: "Sábado", hours: "9h30 às 12h" },
    { days: "Domingo", hours: "Fechado" },
  ],
};

export const getImageUrl = (id: string, width: number) =>
  `https://api.builder.io/api/v1/image/assets/TEMP/${id}?width=${width}`;

export interface ServiceItem {
  title: string;
  description: string;
  imageId: string;
}

export const SERVICES: ServiceItem[] = [
  {
    title: "Troca de tela",
    description:
      "Tela trincada, com manchas ou sem resposta ao toque? Trocamos a tela e você segue com o mesmo aparelho, com 90 dias de garantia no serviço.",
    imageId: "fb0436a6acc5e3712bd4ab8b39b8e12930137a6f",
  },
  {
    title: "Troca de bateria",
    description:
      "O celular descarrega rápido ou desliga sozinho? Com a bateria nova, ele volta a aguentar o dia inteiro. Serviço com 60 dias de garantia.",
    imageId: "baf7a708c5e0ff57ed95f0aac09c6841da22d732",
  },
  {
    title: "Troca de conector",
    description:
      "O carregador não encaixa direito ou só carrega numa posição? Trocamos o conector de carga para você carregar sem malabarismo.",
    imageId: "ad4212104360b93141e087d5100b234cf86e5fbc",
  },
  {
    title: "Acessórios para celular",
    description:
      "Precisou de carregador, cabo ou outro acessório na correria? Você leva no mesmo balcão do conserto, sem precisar sair da cidade.",
    imageId: "c8990d7625af08ba5a69669fecc7d07ae9aa7b51",
  },
  {
    title: "Acessórios para PC",
    description:
      "Acessórios para o seu computador ou notebook, direto no Centro de São Bento do Sapucaí. Pergunte pelo WhatsApp se temos o item que você precisa.",
    imageId: "da6ce5f266f8638197a3ae3741e314a014e6682f",
  },
  {
    title: "Impressão e xérox",
    description:
      "Documentos, trabalhos escolares e cópias na hora, sem precisar ir longe. Imprima ou tire xérox no mesmo lugar do conserto do seu celular.",
    imageId: "12bda0c708a14f25fa51fa1083f2927cdddae0dd",
  },
  {
    title: "Revelação de fotos",
    description:
      "Transforme as fotos do celular em lembranças impressas. Revelamos suas fotos aqui no Centro de São Bento do Sapucaí, de forma prática e rápida.",
    imageId: "700c5ad895c3486801072ebdf9f0e4ea1e55e138",
  },
  {
    title: "Venda e recarga",
    description:
      "Venda de produtos e recarga de celular no balcão da Bautech, de segunda a sábado. Resolva tudo em uma única parada, no Centro da cidade.",
    imageId: "9b08164594913e6c138134cc4f936fb88a6dd60a",
  },
];

export interface StepItem {
  title: string;
  description: string;
}

export const HOW_IT_WORKS_STEPS: StepItem[] = [
  {
    title: "Chame no WhatsApp",
    description:
      "Envie o modelo do celular e o que está acontecendo. Você recebe o valor e o prazo para o seu caso.",
  },
  {
    title: "Traga o aparelho",
    description:
      "Venha até a R. Cândido José da Silva, 161, no Centro. Todo aparelho passa por análise técnica.",
  },
  {
    title: "Acompanhe o conserto",
    description:
      "Serviços que não precisam de peça ficam prontos rapidamente. Quando exige peça, o prazo normal é de até 72 horas, informado antes de você deixar o aparelho.",
  },
  {
    title: "Retire com garantia",
    description:
      "Avisamos pelo WhatsApp quando estiver pronto. Você recebe o termo de garantia, que conta a partir do dia em que o aparelho fica pronto para retirada.",
  },
];

export interface DifferentialItem {
  icon: "pin" | "chat" | "shield" | "like";
  title: string;
  description: string;
}

export const DIFFERENTIALS: DifferentialItem[] = [
  {
    icon: "pin",
    title: "Próximo a você",
    description:
      "Seu celular é consertado a poucos minutos de casa, no Centro de São Bento do Sapucaí.",
  },
  {
    icon: "chat",
    title: "Valor e prazo antes de decidir",
    description:
      "Você pergunta pelo WhatsApp e sabe o que esperar antes de sair de casa.",
  },
  {
    icon: "shield",
    title: "Garantia clara",
    description:
      "90 dias para tela, 60 dias para bateria, 30 dias para conector e demais serviços. O termo diz o que cobre e o que não cobre.",
  },
  {
    icon: "like",
    title: "Atendimento personalizado",
    description:
      "Clientes destacam o atendimento atencioso, e a nota no Google é 4,9. A loja abre de segunda a sábado.",
  },
];

export interface WarrantyItem {
  period: string;
  service: string;
}

export const WARRANTY_PERIODS: WarrantyItem[] = [
  { period: "90 dias", service: "Troca de tela" },
  { period: "60 dias", service: "Troca de bateria" },
  { period: "30 dias", service: "Conector" },
  { period: "30 dias", service: "Demais serviços" },
];

export interface FaqItem {
  question: string;
  answer: string;
}

export const FAQS: FaqItem[] = [
  {
    question: "Trocar a tela apaga minhas fotos e conversas?",
    answer:
      "Em geral, não. A troca de tela não mexe na memória do aparelho. Mesmo assim, se puder, faça um backup antes. Se o seu caso tiver outro defeito, avisamos na análise.",
  },
  {
    question: "Quanto tempo vou ficar sem o celular?",
    answer:
      "Serviços que não precisam de peça de reposição ficam prontos rapidamente. Quando o conserto exige peça, o prazo normal é de até 72 horas. Mande o modelo no WhatsApp e informamos o prazo do seu caso.",
  },
  {
    question: "Quanto custa o conserto?",
    answer:
      "O valor muda conforme o modelo e o serviço. Envie o modelo e o problema pelo WhatsApp e receba o valor antes de vir à loja.",
  },
  {
    question: "Tem garantia?",
    answer:
      "Tem. Tela, 90 dias. Bateria, 60 dias. Conector de carga e demais serviços, 30 dias. A contagem começa quando o aparelho fica pronto para retirada. Aparelho que caiu na água não tem garantia.",
  },
  {
    question: "Vale consertar ou comprar outro?",
    answer:
      "Com o valor do conserto em mãos, você compara com o preço de um aparelho novo e decide com segurança. Peça o orçamento sem compromisso.",
  },
  {
    question: "Meu celular caiu na água. Tem conserto?",
    answer:
      "Depende do estado do aparelho. Desligue, não tente carregar e traga o quanto antes. A análise técnica mostra o que dá para fazer. Nesse caso, o serviço não tem garantia.",
  },
];

