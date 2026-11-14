/**
 * Configuración central del evento.
 * Todos los valores editables de la celebración se gestionan aquí.
 */

export interface EventConfig {
  HONOREE_NAME: string;
  EVENT_DATE_ISO: string;
  START_TIME_LABEL: string;
  VENUE_NAME: string;
  VENUE_ADDRESS: string;
  MAPS_URL: string;
  WAZE_URL: string;
  WHATSAPP_NUMBER: string;
  MAX_GUESTS_PER_RSVP: number;
  RSVP_DEADLINE_LABEL: string;
  FAMILY_MESSAGE: string;
  CALENDAR_DURATION_HOURS: number;
  ARRIVAL_NOTE: string;
  MUSIC_SRC: string;
}

export const EVENT_CONFIG: EventConfig = {
  // Nombre del homenajeado
  HONOREE_NAME: "Walfre Torres Antolín",

  // Fecha y hora del evento en formato ISO 8601 (Zona horaria de México Centro: -06:00)
  EVENT_DATE_ISO: "2026-12-30T14:00:00-06:00",

  // Etiqueta legible de la hora de inicio
  START_TIME_LABEL: "2:00 p. m.",

  // Datos del lugar
  VENUE_NAME: "Salón Las Regaderas",
  VENUE_ADDRESS: "95560 Chacaltianguis, Veracruz",
  MAPS_URL: "https://maps.app.goo.gl/eSCuP7g7uu8iAyUr5",
  WAZE_URL: "https://waze.com/ul?q=Salon%20Las%20Regaderas%20Chacaltianguis&navigate=yes",

  // WhatsApp para confirmación opcional (si está vacío, el botón no se renderiza)
  WHATSAPP_NUMBER: "",

  // Límite máximo de asistentes por registro
  MAX_GUESTS_PER_RSVP: 5,

  // Fecha límite de confirmación (si está vacío, no se muestra)
  RSVP_DEADLINE_LABEL: "",

  // Duración (en horas) que se reserva en el calendario del invitado al guardar el evento
  CALENDAR_DURATION_HOURS: 6,

  // Nota opcional bajo el mapa (estacionamiento, referencias, etc.). Si está vacía, no se muestra.
  ARRIVAL_NOTE: "",

  // Música de fondo opcional. Coloca el archivo en /public (ej. "/musica.mp3").
  // Si está vacío, el botón de música no se muestra.
  MUSIC_SRC: "/Asi_Fue_Juanga.mp3",

  // Mensaje de la familia
  FAMILY_MESSAGE:
    "Sesenta años de trabajo, risas y cariño compartido. Con todo el amor de su familia, queremos celebrar a Walfre rodeado de la gente que más quiere. Tu presencia es el mejor regalo.",
};
