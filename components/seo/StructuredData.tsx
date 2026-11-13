import React from "react";
import { CONTACTS, FAQS, SERVICES, SITE_URL } from "@/data/content";

const BUSINESS_ID = `${SITE_URL}/#business`;
const WEBSITE_ID = `${SITE_URL}/#website`;
const WEBPAGE_ID = `${SITE_URL}/#webpage`;

/**
 * Dados estruturados em um único @graph (entidades ligadas por @id):
 * loja local, site, página e FAQ. O tipo da loja é MobilePhoneStore (LocalBusiness),
 * pois "ElectronicsRepairShop" não existe no schema.org.
 */
export function StructuredData() {
  const business = {
    "@type": "MobilePhoneStore",
    "@id": BUSINESS_ID,
    name: "Bautech Assistência Técnica",
    url: `${SITE_URL}/`,
    description:
      "Assistência técnica de celulares no Centro de São Bento do Sapucaí - SP: troca de tela com 90 dias de garantia, troca de bateria com 60 dias e conector de carga com 30 dias.",
    image: [
      `${SITE_URL}/img/celular-tela-trincada-540.webp`,
      `${SITE_URL}/img/fachada-bautech-sao-bento-do-sapucai-460.webp`,
    ],
    logo: {
      "@type": "ImageObject",
      url: `${SITE_URL}/icon-512.png`,
      width: 512,
      height: 512,
    },
    telephone: "+5512991535658",
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
    hasMap: CONTACTS.mapsUrl,
    areaServed: {
      "@type": "City",
      name: CONTACTS.address.city,
      containedInPlace: { "@type": "AdministrativeArea", name: "São Paulo" },
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
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
    sameAs: [CONTACTS.instagramUrl, CONTACTS.facebookUrl],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Serviços de reparo e balcão",
      itemListElement: SERVICES.map((service) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: service.warrantyDays
            ? `${service.title} com ${service.warrantyDays} dias de garantia`
            : service.title,
          description: service.description,
          provider: { "@id": BUSINESS_ID },
          areaServed: CONTACTS.address.city,
        },
      })),
    },
  };

  const website = {
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    url: `${SITE_URL}/`,
    name: "Bautech Assistência Técnica",
    inLanguage: "pt-BR",
    publisher: { "@id": BUSINESS_ID },
  };

  const webpage = {
    "@type": "WebPage",
    "@id": WEBPAGE_ID,
    url: `${SITE_URL}/`,
    name: "Conserto de Celular em São Bento do Sapucaí | Bautech",
    inLanguage: "pt-BR",
    isPartOf: { "@id": WEBSITE_ID },
    about: { "@id": BUSINESS_ID },
  };

  const faq = {
    "@type": "FAQPage",
    "@id": `${SITE_URL}/#faq`,
    isPartOf: { "@id": WEBPAGE_ID },
    mainEntity: FAQS.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };

  const graph = {
    "@context": "https://schema.org",
    "@graph": [business, website, webpage, faq],
  };

  // Evita quebra do parser HTML (XSS) ao embutir JSON em <script>
  const serializeJsonLd = (data: unknown) =>
    JSON.stringify(data).replace(/</g, "\\u003c");

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: serializeJsonLd(graph) }}
    />
  );
}
