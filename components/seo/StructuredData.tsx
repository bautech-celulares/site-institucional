import React from "react";
import { CONTACTS, FAQS, SERVICES, SITE_URL } from "@/data/content";

export function StructuredData() {
  // Schema 1: LocalBusiness / ElectronicsRepairShop
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "ElectronicsRepairShop",
    name: "Bautech Assistência Técnica",
    description:
      "Assistência técnica de celulares no Centro de São Bento do Sapucaí - SP: troca de tela com 90 dias de garantia, troca de bateria com 60 dias e conector de carga com 30 dias.",
    image: `${SITE_URL}/img/celular-tela-trincada-540.webp`,
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
      itemListElement: SERVICES.map((service) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: service.warrantyDays
            ? `${service.title} com ${service.warrantyDays} dias de garantia`
            : service.title,
          description: service.description,
        },
      })),
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

