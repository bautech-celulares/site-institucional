import { Header } from "@/components/sections/Header";
import { HeroSection } from "@/components/sections/HeroSection";
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
    <div className="flex min-h-screen flex-col bg-white text-[#302E2C]">
      <Header />
      <main className="flex-1">
        <HeroSection />
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
