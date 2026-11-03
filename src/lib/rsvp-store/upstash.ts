import { Redis } from "@upstash/redis";
import { RsvpRecord, RsvpStore } from "@/types/rsvp";

/**
 * Adaptador de almacenamiento en Upstash Redis.
 * Almacena las confirmaciones serializadas en una lista Redis para consulta cronológica rápida.
 */
export class UpstashRsvpStore implements RsvpStore {
  private redis: Redis;
  private readonly listKey = "walfre60:rsvps";

  constructor(url?: string, token?: string) {
    const redisUrl = url || process.env.UPSTASH_REDIS_REST_URL;
    const redisToken = token || process.env.UPSTASH_REDIS_REST_TOKEN;

    if (!redisUrl || !redisToken) {
      throw new Error(
        "Faltan las variables UPSTASH_REDIS_REST_URL y/o UPSTASH_REDIS_REST_TOKEN para el adaptador de Upstash."
      );
    }

    this.redis = new Redis({
      url: redisUrl,
      token: redisToken,
    });
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

      // Guardamos el registro al inicio de la lista de confirmaciones
      await this.redis.lpush(this.listKey, JSON.stringify(newRecord));

      return { success: true, id };
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Error desconocido en Upstash";
      return { success: false, id: "", error: message };
    }
  }

  async getAll(): Promise<RsvpRecord[]> {
    try {
      // Obtenemos todos los registros de la lista
      const rawRecords = await this.redis.lrange<string | RsvpRecord>(this.listKey, 0, -1);
      if (!rawRecords || rawRecords.length === 0) {
        return [];
      }

      return rawRecords.map((item) => {
        if (typeof item === "string") {
          return JSON.parse(item) as RsvpRecord;
        }
        return item as RsvpRecord;
      });
    } catch (err: unknown) {
      console.error("Error al obtener registros de Upstash Redis:", err);
      return [];
    }
  }
}

