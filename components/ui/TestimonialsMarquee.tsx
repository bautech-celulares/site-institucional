import React from "react";
import { cn } from "@/lib/utils";

export interface TestimonialAuthor {
  name: string;
  handle?: string;
  avatar?: string;
}

export interface TestimonialItem {
  author: TestimonialAuthor;
  text: string;
  href?: string;
  stars?: number;
}

export function TestimonialCard({
  author,
  text,
  href,
  stars = 5,
  className,
}: TestimonialItem & { className?: string }) {
  const Card = href ? "a" : "div";

  return (
    <Card
      {...(href ? { href, target: "_blank", rel: "noopener noreferrer" } : {})}
      className={cn(
        "flex flex-col justify-between rounded-[20px] bg-white p-5 text-start shadow-sm border border-brand-border/40",
        "w-[280px] sm:w-[320px] shrink-0 select-none",
        "transition-[box-shadow,border-color] duration-300 hover:shadow-md hover:border-brand-blue/30",
        href && "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue",
        className
      )}
    >
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between gap-2">
          <div
            className="flex text-sm text-brand-cyan tracking-wide"
            aria-label={`${stars} de 5 estrelas`}
          >
            {"★".repeat(Math.max(1, Math.min(5, stars)))}
          </div>
          <span className="text-[11px] font-medium text-brand-muted/70">
            Google
          </span>
        </div>

        <blockquote className="text-sm leading-[22px] text-brand-dark line-clamp-4">
          “{text.replace(/^["“]|["”]$/g, "")}”
        </blockquote>
      </div>

      <div className="mt-4 flex items-center gap-3 border-t border-brand-border/20 pt-3">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-blue font-bold text-white text-xs">
          {author.name.charAt(0)}
        </div>
        <div className="flex flex-col leading-tight min-w-0">
          <span className="text-xs font-bold text-brand-dark truncate">
            {author.name}
          </span>
          {author.handle && (
            <span className="text-[11px] text-brand-muted truncate">
              {author.handle}
            </span>
          )}
        </div>
      </div>
    </Card>
  );
}

export interface TestimonialsMarqueeProps {
  testimonials: TestimonialItem[];
  duration?: string;
  className?: string;
}

export function TestimonialsMarquee({
  testimonials,
  duration = "35s",
  className,
}: TestimonialsMarqueeProps) {
  if (!testimonials || testimonials.length === 0) return null;

  return (
    <div
      className={cn(
        "group marquee-mask relative flex w-full overflow-hidden select-none",
        className
      )}
      style={{ "--duration": duration } as React.CSSProperties}
    >
      <div className="flex shrink-0 gap-4 animate-marquee will-change-transform group-hover:[animation-play-state:paused] group-focus-within:[animation-play-state:paused] group-active:[animation-play-state:paused]">
        {testimonials.map((testimonial, i) => (
          <TestimonialCard
            key={`track1-${testimonial.author.name}-${i}`}
            {...testimonial}
          />
        ))}
      </div>

      <div
        aria-hidden="true"
        className="flex shrink-0 gap-4 animate-marquee will-change-transform group-hover:[animation-play-state:paused] group-focus-within:[animation-play-state:paused] group-active:[animation-play-state:paused]"
      >
        {testimonials.map((testimonial, i) => (
          <TestimonialCard
            key={`track2-${testimonial.author.name}-${i}`}
            {...testimonial}
          />
        ))}
      </div>
    </div>
  );
}

