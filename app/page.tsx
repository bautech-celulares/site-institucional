import { Header } from "@/components/sections/Header";
import { HeroSection } from "@/components/sections/HeroSection";
import { TrustStrip } from "@/components/sections/TrustStrip";
import { PainPointsSection } from "@/components/sections/PainPointsSection";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { HowItWorksSection } from "@/components/sections/HowItWorksSection";
import { DifferentialsSection } from "@/components/sections/DifferentialsSection";
import { ReviewsSection } from "@/components/sections/ReviewsSection";
import { WarrantySection } from "@/components/sections/WarrantySection";
import { AboutSection } from "@/components/sections/AboutSection";
import { LocationSection } from "@/components/sections/LocationSection";
import { FaqSection } from "@/components/sections/FaqSection";
import { Footer } from "@/components/sections/Footer";
import { FloatingWhatsApp } from "@/components/ui/FloatingWhatsApp";
import { CookieBanner } from "@/components/ui/CookieBanner";
import { RevealController } from "@/components/ui/RevealController";

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col bg-white text-brand-dark">
      <a
        href="#conteudo"
        className="sr-only focus:not-sr-only focus:fixed focus:left-3 focus:top-3 focus:z-[60] focus:rounded-full focus:bg-brand-blue focus:px-5 focus:py-3 focus:text-sm focus:font-bold focus:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-brand-blue"
      >
        Pular para o conteúdo
      </a>
      <Header />
      <main id="conteudo" tabIndex={-1} className="flex-1 outline-none">
        <HeroSection />
        <TrustStrip />
        <PainPointsSection />
        <ServicesSection />
        <HowItWorksSection />
        <DifferentialsSection />
        <ReviewsSection />
        <WarrantySection />
        <AboutSection />
        <LocationSection />
        <FaqSection />
      </main>
      <Footer />
      <FloatingWhatsApp />
      <CookieBanner />
      <RevealController />
    </div>
  );
}
