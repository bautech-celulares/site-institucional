import React from "react";
import { cn } from "@/lib/utils";
import {
  TestimonialCard,
  type TestimonialAuthor,
} from "@/components/ui/testimonial-card";

export interface TestimonialItem {
  author: TestimonialAuthor;
  text: string;
  href?: string;
  stars?: number;
}

export interface TestimonialsMarqueeProps {
  testimonials: TestimonialItem[];
  className?: string;
  duration?: string;
  fadeColor?: string;
}

/**
 * Faixa de marquee horizontal contínua para depoimentos.
 * Inclui pausa ao passar o mouse, máscara de gradiente nas bordas
 * e duplicata acessível para transição 100% fluida e contínua.
 */
export function TestimonialsMarquee({
  testimonials,
  className,
  duration = "35s",
  fadeColor = "from-brand-surface",
}: TestimonialsMarqueeProps) {
  if (!testimonials || testimonials.length === 0) return null;

  return (
    <div
      className={cn(
        "group relative flex w-full max-w-full flex-col items-center justify-center overflow-hidden py-1",
        className
      )}
      style={{ "--duration": duration, "--gap": "1rem" } as React.CSSProperties}
    >
      <div className="flex w-full overflow-hidden [gap:var(--gap)]">
        {/* Track principal */}
        <div className="flex shrink-0 items-stretch [gap:var(--gap)] animate-marquee group-hover:[animation-play-state:paused] focus-within:[animation-play-state:paused]">
          {testimonials.map((testimonial, i) => (
            <TestimonialCard
              key={`track1-${testimonial.author.name}-${i}`}
              {...testimonial}
            />
          ))}
        </div>

        {/* Track duplicada para loop infinito sem cortes visuais */}
        <div
          className="flex shrink-0 items-stretch [gap:var(--gap)] animate-marquee group-hover:[animation-play-state:paused] focus-within:[animation-play-state:paused]"
          aria-hidden="true"
        >
          {testimonials.map((testimonial, i) => (
            <TestimonialCard
              key={`track2-${testimonial.author.name}-${i}`}
              {...testimonial}
            />
          ))}
        </div>
      </div>

      {/* Máscaras de gradiente para suavizar a entrada e saída dos cards */}
      <div
        className={cn(
          "pointer-events-none absolute inset-y-0 left-0 z-10 w-8 sm:w-16 bg-gradient-to-r to-transparent",
          fadeColor
        )}
      />
      <div
        className={cn(
          "pointer-events-none absolute inset-y-0 right-0 z-10 w-8 sm:w-16 bg-gradient-to-l to-transparent",
          fadeColor
        )}
      />
    </div>
  );
}

export interface TestimonialsSectionProps {
  title: string;
  description: string;
  testimonials: TestimonialItem[];
  className?: string;
  duration?: string;
}

/**
 * Seção completa com cabeçalho centralizado e carrossel infinito (Marquee).
 */
export function TestimonialsSection({
  title,
  description,
  testimonials,
  className,
  duration = "40s",
}: TestimonialsSectionProps) {
  return (
    <section
      className={cn(
        "bg-brand-surface text-brand-dark py-12 sm:py-20 md:py-28 px-0",
        className
      )}
    >
      <div className="mx-auto flex max-w-[1200px] flex-col items-center gap-6 text-center sm:gap-12">
        <div className="flex flex-col items-center gap-3 px-4 sm:gap-4">
          <h2 className="font-mirano max-w-[720px] text-2xl font-bold leading-tight sm:text-4xl text-brand-dark">
            {title}
          </h2>
          <p className="max-w-[600px] text-sm text-brand-muted sm:text-base">
            {description}
          </p>
        </div>

        <TestimonialsMarquee
          testimonials={testimonials}
          duration={duration}
        />
      </div>
    </section>
  );
}
