import { z } from "zod";
import { EVENT_CONFIG } from "@/config/event";

// Expresión regular para validación opcional de teléfono en México / internacional
const phoneRegex = /^(\+?[0-9]{1,3}[- ]?)?([0-9]{10})$/;

// Esquema de validación con Zod para el formulario de confirmación
export const rsvpFormSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(2, { message: "Por favor ingresa tu nombre completo (mínimo 2 letras)." })
    .max(100, { message: "El nombre no debe exceder 100 caracteres." }),
  guestsCount: z.coerce
    .number({ invalid_type_error: "Selecciona el número de asistentes." })
    .int({ message: "El número de asistentes debe ser entero." })
    .min(1, { message: "El mínimo de asistentes es 1." })
    .max(EVENT_CONFIG.MAX_GUESTS_PER_RSVP, {
      message: `El número máximo de asistentes por registro es ${EVENT_CONFIG.MAX_GUESTS_PER_RSVP}.`,
    }),
  phone: z
    .string()
    .trim()
    .optional()
    .refine((val) => !val || phoneRegex.test(val.replace(/\s+/g, "")), {
      message: "Ingresa un teléfono válido de 10 dígitos.",
    }),
  message: z
    .string()
    .trim()
    .max(500, { message: "El mensaje no puede superar los 500 caracteres." })
    .optional(),
  // Campo trampa (honeypot) para bots anti-spam. Debe llegar vacío.
  honeypot: z.string().max(0, { message: "Spam detectado." }).optional().or(z.literal("")),
});

export type RsvpFormData = z.infer<typeof rsvpFormSchema>;

// Estructura de un registro de confirmación almacenado
export interface RsvpRecord {
  id: string;
  fullName: string;
  guestsCount: number;
  phone?: string;
  message?: string;
  createdAt: string;
  ip?: string;
}

// Interfaz para desacoplar el motor de persistencia (Upstash, Webhook o Memoria)
export interface RsvpStore {
  save(
    record: Omit<RsvpRecord, "id" | "createdAt">
  ): Promise<{ success: boolean; id: string; error?: string }>;
  getAll(): Promise<RsvpRecord[]>;
}

