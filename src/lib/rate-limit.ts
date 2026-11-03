/**
 * Rate limiter simple en memoria para mitigar spam y ataques de fuerza bruta en la API de RSVP.
 * En entornos sin servidor (Edge/Serverless), proporciona protección por instancia
 * y se complementa con la verificación honeypot y el almacenamiento persistente.
 */

interface RateLimitRecord {
  count: number;
  resetAt: number;
}

const ipMap = new Map<string, RateLimitRecord>();

// Limpieza periódica para evitar fugas de memoria
setInterval(() => {
  const now = Date.now();
  ipMap.forEach((record, ip) => {
    if (record.resetAt <= now) {
      ipMap.delete(ip);
    }
  });
}, 60000).unref?.();

export interface RateLimitResult {
  allowed: boolean;
  remaining: number;
  resetInSeconds: number;
}

/**
 * Verifica si una dirección IP ha superado el límite de peticiones.
 * @param ip Dirección IP del cliente
 * @param limit Peticiones máximas permitidas en la ventana (por defecto 5)
 * @param windowMs Ventana de tiempo en milisegundos (por defecto 10 minutos)
 */
export function checkRateLimit(
  ip: string,
  limit: number = 5,
  windowMs: number = 10 * 60 * 1000
): RateLimitResult {
  const now = Date.now();
  const clientRecord = ipMap.get(ip);

  if (!clientRecord || clientRecord.resetAt <= now) {
    ipMap.set(ip, {
      count: 1,
      resetAt: now + windowMs,
    });
    return {
      allowed: true,
      remaining: limit - 1,
      resetInSeconds: Math.ceil(windowMs / 1000),
    };
  }

  if (clientRecord.count >= limit) {
    return {
      allowed: false,
      remaining: 0,
      resetInSeconds: Math.ceil((clientRecord.resetAt - now) / 1000),
    };
  }

  clientRecord.count += 1;
  return {
    allowed: true,
    remaining: limit - clientRecord.count,
    resetInSeconds: Math.ceil((clientRecord.resetAt - now) / 1000),
  };
}
