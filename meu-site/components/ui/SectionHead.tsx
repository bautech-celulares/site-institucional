import React from "react";
import { Button } from "./Button";
import { cn } from "@/lib/utils";

interface SectionHeadProps {
  title: string;
  ctaText?: string;
  href?: string;
  hideCtaOnMobile?: boolean;
}

export function SectionHead({
  title,
  ctaText,
  href,
  hideCtaOnMobile = false,
}: SectionHeadProps) {
  return (
    <div className="flex flex-col items-start justify-between gap-5 md:flex-row md:items-center">
      <h2 className="font-mirano text-[26px] leading-[1.2] tracking-tight text-brand-dark md:text-[34px]">
        {title}
      </h2>
      {ctaText && (
        <div className={cn(hideCtaOnMobile ? "hidden md:inline-flex" : "inline-flex")}>
          <Button href={href}>
            {ctaText}
          </Button>
        </div>
      )}
    </div>
  );
}
