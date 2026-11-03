import { NextRequest, NextResponse } from "next/server";
import { rsvpFormSchema } from "@/types/rsvp";
import { checkRateLimit } from "@/lib/rate-limit";
import { getRsvpStore } from "@/lib/rsvp-store";

export async function POST(req: NextRequest) {
  try {
    // 1. Obtención de IP para Rate Limiting
    const forwarded = req.headers.get("x-forwarded-for");
    const ip = forwarded ? forwarded.split(",")[0].trim() : "127.0.0.1";

    const rateLimit = checkRateLimit(ip, 5, 10 * 60 * 1000);
    if (!rateLimit.allowed) {
      return NextResponse.json(
        {
          success: false,
          error: "Demasiados intentos. Por favor espera unos minutos antes de volver a intentar.",
        },
        {
          status: 429,
          headers: {
            "Retry-After": rateLimit.resetInSeconds.toString(),
          },
        }
      );
    }

    // 2. Parseo y validación del cuerpo de la petición
    let body;
    try {
      body = await req.json();
    } catch {
      return NextResponse.json(
        { success: false, error: "Datos de formulario inválidos." },
        { status: 400 }
      );
    }

    // 3. Verificación anti-spam Honeypot
    // Si el campo invisible 'honeypot' tiene contenido, es un bot
    if (body.honeypot && String(body.honeypot).trim().length > 0) {
      // Respondemos éxito simulado para frustrar bots sin persistir basura
      return NextResponse.json({
        success: true,
        message: "Asistencia confirmada con éxito.",
      });
    }

    // 4. Validación estricta con Zod
    const validation = rsvpFormSchema.safeParse(body);
    if (!validation.success) {
      const firstError = validation.error.errors[0]?.message || "Datos incorrectos.";
      return NextResponse.json(
        {
          success: false,
          error: firstError,
          details: validation.error.flatten(),
        },
        { status: 400 }
      );
    }

    const { fullName, guestsCount, phone, message } = validation.data;

    // 5. Persistencia mediante el adaptador configurado
    const store = getRsvpStore();
    const result = await store.save({
      fullName,
      guestsCount,
      phone: phone || "",
      message: message || "",
      ip,
    });

    if (!result.success) {
      return NextResponse.json(
        {
          success: false,
          error: result.error || "No se pudo guardar la confirmación en este momento.",
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      id: result.id,
      message: "¡Gracias! Tu asistencia ha sido confirmada con éxito.",
    });
  } catch (error: unknown) {
    console.error("Error en endpoint /api/rsvp:", error);
    return NextResponse.json(
      { success: false, error: "Ocurrió un error inesperado al procesar tu confirmación." },
      { status: 500 }
    );
  }
}

