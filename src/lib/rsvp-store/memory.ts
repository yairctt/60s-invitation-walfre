import { RsvpRecord, RsvpStore } from "@/types/rsvp";

/**
 * Adaptador de almacenamiento en memoria.
 * Útil para desarrollo local o fallback cuando no hay base de datos configurada.
 */
class MemoryRsvpStore implements RsvpStore {
  private static records: RsvpRecord[] = [];

  async save(
    data: Omit<RsvpRecord, "id" | "createdAt">
  ): Promise<{ success: boolean; id: string; error?: string }> {
    const id = `rsvp_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
    const newRecord: RsvpRecord = {
      ...data,
      id,
      createdAt: new Date().toISOString(),
    };

    MemoryRsvpStore.records.unshift(newRecord);
    return { success: true, id };
  }

  async getAll(): Promise<RsvpRecord[]> {
    return [...MemoryRsvpStore.records];
  }
}

export const memoryRsvpStore = new MemoryRsvpStore();

