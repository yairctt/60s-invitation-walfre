import { RsvpRecord, RsvpStore } from "@/types/rsvp";

/**
 * Adaptador de almacenamiento mediante Webhook HTTP.
 * Diseñado para enviar peticiones POST a Google Apps Script (Google Sheets),
 * Make, Zapier o cualquier servicio de integración backend.
 */
export class WebhookRsvpStore implements RsvpStore {
  private webhookUrl: string;

  constructor(url?: string) {
    const targetUrl = url || process.env.RSVP_WEBHOOK_URL;
    if (!targetUrl) {
      throw new Error("Falta la variable RSVP_WEBHOOK_URL para el adaptador de Webhook.");
    }
    this.webhookUrl = targetUrl;
  }

  async save(
    data: Omit<RsvpRecord, "id" | "createdAt">
  ): Promise<{ success: boolean; id: string; error?: string }> {
    try {
      const id = `rsvp_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
      const newRecord: RsvpRecord = {
        ...data,
        id,
        createdAt: new Date().toISOString(),
      };

      const response = await fetch(this.webhookUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          action: "create_rsvp",
          ...newRecord,
        }),
      });

      if (!response.ok) {
        const text = await response.text();
        return {
          success: false,
          id: "",
          error: `Error del Webhook (${response.status}): ${text || response.statusText}`,
        };
      }

      return { success: true, id };
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Error al conectar con Webhook";
      return { success: false, id: "", error: message };
    }
  }

  async getAll(): Promise<RsvpRecord[]> {
    try {
      // Intento de consulta si el endpoint soporta GET o webhook de lectura
      const response = await fetch(`${this.webhookUrl}?action=get_rsvps`, {
        method: "GET",
        headers: { Accept: "application/json" },
        cache: "no-store",
      });

      if (!response.ok) {
        return [];
      }

      const data = await response.json();
      if (Array.isArray(data)) {
        return data as RsvpRecord[];
      }
      if (data && Array.isArray(data.records)) {
        return data.records as RsvpRecord[];
      }

      return [];
    } catch (err) {
      console.warn("El Webhook no retornó lista de confirmaciones:", err);
      return [];
    }
  }
}

