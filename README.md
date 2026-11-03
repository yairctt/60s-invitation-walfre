# Invitación Web · Los 60 de Walfre Torres Antolín

Invitación digital de alta elegancia desarrollada con **Next.js (App Router)**, **TypeScript** y **Tailwind CSS**, optimizada para dispositivos móviles (mobile-first a 375 px) y lista para ser desplegada en **Vercel** con el dominio personalizado `mis60walfretorres.com`.

---

## 1. Configuración de Datos del Evento (`src/config/event.ts`)

Todos los datos editables de la celebración se gestionan centralizadamente en [`src/config/event.ts`](file:///d:/60s-invitation-walfre/src/config/event.ts):

```typescript
export const EVENT_CONFIG = {
  HONOREE_NAME: "Walfre Torres Antolín",
  EVENT_DATE_ISO: "2026-12-30T14:00:00-06:00",
  START_TIME_LABEL: "2:00 p. m.",
  VENUE_NAME: "Salón Las Regaderas",
  VENUE_ADDRESS: "95560 Chacaltianguis, Veracruz",
  MAPS_URL: "https://maps.app.goo.gl/eSCuP7g7uu8iAyUr5",
  WAZE_URL: "https://waze.com/ul?q=Salon%20Las%20Regaderas%20Chacaltianguis&navigate=yes",
  WHATSAPP_NUMBER: "", // Si se define (ej. "522881234567"), habilita el botón directo a WhatsApp
  MAX_GUESTS_PER_RSVP: 5,
  RSVP_DEADLINE_LABEL: "", // Opcional (ej. "15 de diciembre")
  FAMILY_MESSAGE:
    "Sesenta años de trabajo, risas y cariño compartido. Con todo el amor de su familia, queremos celebrar a Walfre rodeado de la gente que más quiere. Tu presencia es el mejor regalo.",
} as const;
```

> **Fotografía de Walfre**: Coloca la imagen de fondo para el inicio en `public/hero.jpg` (o `hero.jpeg`).

---

## 2. Configuración del Adaptador de RSVP

El sistema incluye una interfaz desacoplada `RsvpStore` con selección automática o por variable `RSVP_STORE_TYPE`:

### Opción A: Upstash Redis (Recomendado para Vercel)
1. Crea una base de datos gratuita en [Upstash Console](https://console.upstash.com).
2. Agrega las variables de entorno:
   - `UPSTASH_REDIS_REST_URL`
   - `UPSTASH_REDIS_REST_TOKEN`

### Opción B: Webhook HTTP (Google Sheets vía Google Apps Script)
1. En una hoja de cálculo de Google Sheets, abre **Extensiones > Apps Script**.
2. Pega una función `doPost(e)` que reciba el JSON y añada la fila (`fullName`, `guestsCount`, `phone`, `message`, `createdAt`).
3. Despliega como **Aplicación web** con acceso para **Cualquier usuario** (Anyone).
4. Configura la variable de entorno:
   - `RSVP_WEBHOOK_URL="https://script.google.com/macros/s/.../exec"`

### Panel de Administración y Exportación CSV
- Ruta: `/admin?key=TU_ADMIN_KEY`
- Configura en tus variables de entorno `ADMIN_KEY="tu_clave_secreta"`.
- Permite ver el total de confirmaciones, el conteo total de asistentes, buscador en tiempo real y exportar la lista completa a archivo CSV compatible con Excel (UTF-8 con BOM).

---

## 3. Despliegue en Vercel y Dominio

1. **Subir repositorio**: Sube el código a GitHub, GitLab o Bitbucket.
2. **Importar en Vercel**:
   - Conecta el repositorio en [vercel.com/new](https://vercel.com/new).
   - Configura las variables de entorno (`ADMIN_KEY`, y las correspondientes a Upstash o Webhook).
   - Haz clic en **Deploy**.
3. **Asignar Dominio `mis60walfretorres.com`**:
   - En el proyecto de Vercel, ve a **Settings > Domains**.
   - Agrega `mis60walfretorres.com` (y opcionalmente `www.mis60walfretorres.com`).
   - En tu registrador de dominio (ej. Namecheap, GoDaddy, Cloudflare), configura los registros DNS indicados por Vercel:
     - Tipo `A` para `@` apuntando a `76.76.21.21`
     - Tipo `CNAME` para `www` apuntando a `cname.vercel-dns.com`

---

## 4. Ejecución en Local

```bash
# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev

# Compilar para producción
npm run build
```

Visita `http://localhost:3000` para la invitación y `http://localhost:3000/admin?key=walfre60_admin_secreto_2026` para el panel.

---

## 5. Checklist Final de Calidad

- [ ] **Vista previa en WhatsApp**: Compartir el enlace `https://mis60walfretorres.com` en un chat para verificar la imagen Open Graph generada dinámicamente (1200×630, monograma W60 en dorado sobre fondo oscuro, peso inferior a 300 KB).
- [ ] **Lighthouse Móvil**: Ejecutar en Chrome DevTools con emulación móvil de rendimiento y red (Puntuación de Rendimiento, Accesibilidad y Mejores Prácticas superior a 90).
- [ ] **Prueba en Celular Real**:
  - Validar legibilidad tipográfica a 375 px (Playfair Display en títulos e Inter en cuerpo, texto mínimo 16 px).
  - Tocar los botones de confirmación y navegación (Google Maps / Waze) comprobando que cumplan el área táctil mínima de 48 px.
  - Enviar una confirmación de prueba con 1 y más asistentes, verificando la animación de éxito y comprobando que no permita doble clic.
- [ ] **Verificación de Reglas Críticas**:
  - No contiene detalles de sorpresas reservadas para los invitados.
  - Solo se muestra la hora de inicio oficial ("2:00 p. m.").
  - No incluye sección de código de vestimenta.
  - Indexación bloqueada en motores de búsqueda (`robots: noindex`).
