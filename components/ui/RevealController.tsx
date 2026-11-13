"use client";

import { useEffect } from "react";

/**
 * Um único IntersectionObserver para todos os [data-reveal] da página.
 * Só esconde blocos que ainda estão abaixo da dobra, então nada pisca no carregamento.
 */
export function RevealController() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const targets = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]")).filter(
      (el) => el.getBoundingClientRect().top > window.innerHeight * 0.9
    );
    if (targets.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.removeAttribute("data-reveal-hidden");
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );

    for (const el of targets) {
      el.setAttribute("data-reveal-hidden", "");
      observer.observe(el);
    }

    return () => {
      observer.disconnect();
      // Garante que nada fique escondido se o componente for desmontado
      for (const el of targets) el.removeAttribute("data-reveal-hidden");
    };
  }, []);

  return null;
}
