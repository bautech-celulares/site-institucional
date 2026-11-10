import React from "react";
import { cn } from "@/lib/utils";

export interface TestimonialAuthor {
  name: string;
  handle?: string;
  avatar?: string;
}

export interface TestimonialCardProps {
  author: TestimonialAuthor;
  text: string;
  href?: string;
  stars?: number;
  className?: string;
}

export function TestimonialCard({
  author,
  text,
  href,
  stars = 5,
  className,
}: TestimonialCardProps) {
  const Card = href ? "a" : "div";

  return (
    <Card
      {...(href
        ? {
            href,
            target: "_blank",
            rel: "noopener noreferrer",
          }
        : {})}
      className={cn(
        "flex flex-col justify-between rounded-[20px] bg-white p-5 text-start shadow-sm border border-brand-border/40",
        "w-[280px] sm:w-[320px] shrink-0 select-none",
        "transition-all duration-300 hover:shadow-md hover:border-brand-blue/30",
        href && "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue",
        className
      )}
    >
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between gap-2">
          {/* Estrelas de Avaliação */}
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

        {/* Texto do Depoimento */}
        <blockquote className="text-sm leading-[22px] text-brand-dark line-clamp-4">
          “{text.replace(/^["“]|["”]$/g, "")}”
        </blockquote>
      </div>

      {/* Autor do Depoimento (Sem avatar, conforme solicitado) */}
      <div className="mt-4 flex flex-col border-t border-brand-border/20 pt-3">
        <span className="text-xs font-semibold text-brand-dark">
          {author.name}
        </span>
        {author.handle && (
          <span className="text-[11px] text-brand-muted">
            {author.handle}
          </span>
        )}
      </div>
    </Card>
  );
}

