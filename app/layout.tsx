import type { Metadata } from "next";
import "./globals.css";
import { StructuredData } from "@/components/seo/StructuredData";
import { Analytics } from "@/components/ui/Analytics";

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://bautech.com.br"
  ),
  title: "Bautech | Assistência Técnica de Celular em São Bento do Sapucaí",
  description:
    "Troca de tela, bateria e conector de carga no Centro de São Bento do Sapucaí, com garantia de 90 dias na tela e 60 dias na bateria. Orçamento rápido pelo WhatsApp.",
  keywords: [
    "assistência técnica são bento do sapucaí",
    "conserto de celular são bento do sapucaí",
    "troca de tela celular",
    "troca de bateria smartphone",
    "bautech são bento do sapucaí",
  ],
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: [{ url: "/favicon.svg", type: "image/svg+xml" }],
    apple: "/apple-touch-icon.png",
  },
  manifest: "/manifest.json",
  ...(process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION
    ? {
        verification: {
          google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
        },
      }
    : {}),
  openGraph: {
    title: "Bautech | Assistência Técnica de Celular em São Bento do Sapucaí",
    description:
      "Troca de tela, bateria e conector de carga no Centro de São Bento do Sapucaí, com garantia de 90 dias na tela e 60 dias na bateria.",
    url: "/",
    locale: "pt_BR",
    type: "website",
    siteName: "Bautech Assistência Técnica",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Bautech Assistência Técnica - São Bento do Sapucaí",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Bautech | Assistência Técnica de Celular em São Bento do Sapucaí",
    description:
      "Troca de tela, bateria e conector de carga no Centro de São Bento do Sapucaí, com garantia de 90 dias na tela e 60 dias na bateria.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" suppressHydrationWarning className="h-full motion-safe:scroll-smooth antialiased">
      <head>
        <link
          rel="preload"
          href="/fonts/MiranoExtended-Bold.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/Metropolis-Bold.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/Metropolis-Medium.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/Metropolis-Regular.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <StructuredData />
      </head>
      <body suppressHydrationWarning className="min-h-full flex flex-col">
        <Analytics />
        {children}
      </body>
    </html>
  );
}
