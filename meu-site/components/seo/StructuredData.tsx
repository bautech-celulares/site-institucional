import React from "react";
import { CONTACTS, FAQS, getImageUrl } from "@/data/content";

export function StructuredData() {
  // Schema 1: LocalBusiness / ElectronicsRepairShop
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "ElectronicsRepairShop",
    name: "Bautech Assistência Técnica",
    description:
      "Assistência técnica especializada em conserto de celulares, troca de tela e bateria com 90 dias de garantia no Centro de São Bento do Sapucaí - SP.",
    image: getImageUrl("c97672a611c91e64da2aefc5c8d7838d8406c004", 1080),
    telephone: "+55-12-99153-5658",
    priceRange: "$$",
    address: {
      "@type": "PostalAddress",
      streetAddress: CONTACTS.address.street,
      addressLocality: CONTACTS.address.city,
      addressRegion: CONTACTS.address.state,
      postalCode: CONTACTS.address.zip,
      addressCountry: "BR",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: -22.6868,
      longitude: -45.7348,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
        ],
        opens: "09:00",
        closes: "18:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Saturday"],
        opens: "09:30",
        closes: "12:00",
      },
    ],
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      reviewCount: "16",
      bestRating: "5",
      worstRating: "1",
    },
    sameAs: [
      CONTACTS.instagramUrl || "https://www.instagram.com/bautech_celulares/",
      "https://facebook.com/bautech.sbs",
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Serviços de Reparo e Balcão",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Troca de tela com 90 dias de garantia",
            description:
              "Troca de tela frontal trincada, com manchas ou falha no touch, preservando dados do aparelho.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Troca de bateria com 90 dias de garantia",
            description:
              "Substituição de bateria viciada ou descarregando rápido por bateria nova com garantia formal.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Troca de conector de carga",
            description:
              "Reparo ou substituição de conector de carga que não carrega ou apresenta mau contato.",
          },
        },
      ],
    },
  };

  // Schema 2: FAQPage para rich snippets de perguntas e respostas no Google
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQS.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  // Função sanitizadora para evitar XSS via quebra de parser HTML
  const serializeJsonLd = (data: unknown) =>
    JSON.stringify(data).replace(/</g, "\\u003c");

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: serializeJsonLd(localBusinessSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: serializeJsonLd(faqSchema),
        }}
      />
    </>
  );
}

