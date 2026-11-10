export interface StoreStatus {
  isOpen: boolean;
  label: string;
  sublabel: string;
  badgeText: string;
  responseTime: string;
}

/**
 * Calculates current business hours status for Bautech in São Bento do Sapucaí (America/Sao_Paulo)
 * Hours:
 * - Mon-Fri: 09:00 - 18:00
 * - Sat: 09:30 - 12:00
 * - Sun: Closed
 */
export function getStoreStatus(now: Date = new Date()): StoreStatus {
  try {
    const formatter = new Intl.DateTimeFormat("pt-BR", {
      timeZone: "America/Sao_Paulo",
      weekday: "short",
      hour: "numeric",
      minute: "numeric",
      hour12: false,
    });

    const parts = formatter.formatToParts(now);
    const map: Record<string, string> = {};
    for (const p of parts) {
      map[p.type] = p.value;
    }

    const weekday = (map.weekday || "").toLowerCase();
    const hour = parseInt(map.hour || "0", 10);
    const minute = parseInt(map.minute || "0", 10);
    const timeInMinutes = hour * 60 + minute;

    const isWeekday = ["seg", "ter", "qua", "qui", "sex"].some((d) =>
      weekday.startsWith(d)
    );
    const isSaturday = weekday.startsWith("sáb") || weekday.startsWith("sab");

    // Weekday: 9:00 (540m) to 18:00 (1080m)
    if (isWeekday) {
      if (timeInMinutes >= 540 && timeInMinutes < 1080) {
        return {
          isOpen: true,
          label: "Online no WhatsApp agora",
          sublabel: "Técnicos respondendo no balcão da R. Cândido José da Silva",
          badgeText: "Online agora • Aberto até 18h",
          responseTime: "Resposta média em ~5 min",
        };
      }
      if (timeInMinutes < 540) {
        return {
          isOpen: false,
          label: "Balcão abre hoje às 9h",
          sublabel: "Pode enviar sua mensagem; responderemos na abertura",
          badgeText: "Abre às 9h • Envie sua mensagem",
          responseTime: "Primeiro atendimento a partir das 9h",
        };
      }
      return {
        isOpen: false,
        label: "Balcão fechado no momento",
        sublabel: "Deixe seu modelo e defeito para o primeiro atendimento de amanhã",
        badgeText: "Fechado agora • Mensagens acolhidas",
        responseTime: "Retorno logo às 9h",
      };
    }

    // Saturday: 9:30 (570m) to 12:00 (720m)
    if (isSaturday) {
      if (timeInMinutes >= 570 && timeInMinutes < 720) {
        return {
          isOpen: true,
          label: "Balcão aberto no Centro",
          sublabel: "Atendimento presencial e WhatsApp até às 12h",
          badgeText: "Online agora • Aberto até 12h",
          responseTime: "Resposta imediata no balcão",
        };
      }
      return {
        isOpen: false,
        label: "Balcão fechado até segunda-feira",
        sublabel: "Mensagens recebidas no WhatsApp serão respondidas segunda às 9h",
        badgeText: "Abre segunda às 9h",
        responseTime: "Retorno segunda às 9h",
      };
    }

    // Sunday
    return {
      isOpen: false,
      label: "Domingo de descanso",
      sublabel: "Envie sua mensagem que responderemos segunda-feira a partir das 9h",
      badgeText: "Abre segunda às 9h",
      responseTime: "Retorno segunda às 9h",
    };
  } catch {
    // Graceful fallback
    return {
      isOpen: true,
      label: "Online no WhatsApp",
      sublabel: "Balcão na R. Cândido José da Silva, 161",
      badgeText: "Online para orçamentos",
      responseTime: "Atendimento rápido",
    };
  }
}

