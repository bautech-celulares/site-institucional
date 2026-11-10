import React from "react";
import { CONTACTS } from "@/data/content";
import { WaIcon } from "./WaIcon";
import { cn } from "@/lib/utils";

interface ButtonProps {
  children: React.ReactNode;
  href?: string;
  variant?: "blue" | "cyan" | "white";
  className?: string;
  icon?: boolean;
  fullWidthOnMobile?: boolean;
}

export function Button({
  children,
  href = CONTACTS.whatsappUrl,
  variant = "blue",
  className = "",
  icon = true,
  fullWidthOnMobile = true,
}: ButtonProps) {
  const styles = {
    blue: "bg-brand-blue text-white hover:bg-brand-blue-hover shadow-sm",
    cyan: "bg-brand-cyan text-brand-dark hover:bg-brand-cyan-hover shadow-sm",
    white: "bg-white text-brand-blue hover:bg-slate-50 shadow-sm",
  }[variant];

  const widthClass = fullWidthOnMobile ? "w-full sm:w-auto" : "";
  const isExternal =
    href?.startsWith("http://") ||
    href?.startsWith("https://") ||
    href?.startsWith("//");

  return (
    <a
      href={href}
      {...(isExternal
        ? { target: "_blank", rel: "noopener noreferrer" }
        : {})}
      className={cn(
        "inline-flex items-center justify-center gap-1.5 rounded-full px-6 py-3.5 text-[15px] font-bold leading-[18px] transition-all hover:shadow-md hover:opacity-95 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue focus-visible:ring-offset-2 md:px-7 md:py-4",
        styles,
        widthClass,
        className
      )}
    >
      {icon && <WaIcon fill={variant === "cyan" ? "#302E2C" : "white"} />}
      <span>{children}</span>
    </a>
  );
}
