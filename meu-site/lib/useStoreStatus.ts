"use client";

import { useSyncExternalStore } from "react";
import { getStoreStatus, StoreStatus } from "./storeStatus";

const defaultStatus: StoreStatus = {
  isOpen: true,
  label: "Online no WhatsApp agora",
  sublabel: "Técnicos respondendo no balcão da R. Cândido José da Silva",
  badgeText: "Online para orçamentos",
  responseTime: "Resposta média em ~5 min",
};

let currentStatus = defaultStatus;
const listeners = new Set<() => void>();
let timer: ReturnType<typeof setInterval> | null = null;

function subscribe(callback: () => void) {
  listeners.add(callback);

  // Initialize status on client subscription
  currentStatus = getStoreStatus();
  callback();

  if (!timer) {
    timer = setInterval(() => {
      currentStatus = getStoreStatus();
      listeners.forEach((listener) => listener());
    }, 60000);
  }

  return () => {
    listeners.delete(callback);
    if (listeners.size === 0 && timer) {
      clearInterval(timer);
      timer = null;
    }
  };
}

function getSnapshot(): StoreStatus {
  return currentStatus;
}

function getServerSnapshot(): StoreStatus {
  return defaultStatus;
}

export function useStoreStatus(): StoreStatus {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
