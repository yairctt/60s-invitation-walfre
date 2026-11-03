import { RsvpStore } from "@/types/rsvp";
import { UpstashRsvpStore } from "./upstash";
import { WebhookRsvpStore } from "./webhook";
import { memoryRsvpStore } from "./memory";

/**
 * Fábrica para instanciar el adaptador de almacenamiento correspondiente.
 * Selecciona dinámicamente entre Upstash Redis, Webhook HTTP o memoria según la configuración de entorno.
 */
let storeInstance: RsvpStore | null = null;

export function getRsvpStore(): RsvpStore {
  if (storeInstance) {
    return storeInstance;
  }

  const explicitType = (process.env.RSVP_STORE_TYPE || "").toLowerCase().trim();

  if (explicitType === "upstash") {
    storeInstance = new UpstashRsvpStore();
    return storeInstance;
  }

  if (explicitType === "webhook") {
    storeInstance = new WebhookRsvpStore();
    return storeInstance;
  }

  // Detección automática por variables disponibles
  if (process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN) {
    storeInstance = new UpstashRsvpStore();
    return storeInstance;
  }

  if (process.env.RSVP_WEBHOOK_URL) {
    storeInstance = new WebhookRsvpStore();
    return storeInstance;
  }

  // Fallback seguro a memoria si no hay proveedor configurado aún
  console.info(
    "[RsvpStore] No se detectaron credenciales de Upstash o Webhook. Utilizando adaptador en memoria."
  );
  storeInstance = memoryRsvpStore;
  return storeInstance;
}

