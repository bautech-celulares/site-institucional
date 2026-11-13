import { useSyncExternalStore } from "react";

const STORAGE_KEY = "bautech_cookie_consent";

export type Consent = "accepted" | "declined" | null;

const listeners = new Set<() => void>();
// Reserva em memória para quando o navegador bloqueia o localStorage
let memoryConsent: Consent = null;

export function getConsent(): Consent {
  try {
    const value = localStorage.getItem(STORAGE_KEY);
    if (value === "accepted" || value === "declined") return value;
    return memoryConsent;
  } catch {
    return memoryConsent;
  }
}

/** Grava a escolha do visitante (null reabre o aviso) e notifica quem a observa. */
export function setConsent(choice: Consent) {
  memoryConsent = choice;
  try {
    if (choice) localStorage.setItem(STORAGE_KEY, choice);
    else localStorage.removeItem(STORAGE_KEY);
  } catch {
    // armazenamento bloqueado: a escolha vale apenas nesta sessão
  }
  listeners.forEach((listener) => listener());
}

function subscribe(callback: () => void) {
  listeners.add(callback);
  window.addEventListener("storage", callback);
  return () => {
    listeners.delete(callback);
    window.removeEventListener("storage", callback);
  };
}

export function useConsent(): Consent {
  return useSyncExternalStore(subscribe, getConsent, () => null);
}
