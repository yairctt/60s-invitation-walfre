import { EVENT_CONFIG } from "@/config/event";

const pad = (n: number) => String(n).padStart(2, "0");

/** Formato UTC compacto exigido por iCalendar y Google Calendar: 20261230T200000Z */
function toCalendarStamp(d: Date): string {
  return (
    `${d.getUTCFullYear()}${pad(d.getUTCMonth() + 1)}${pad(d.getUTCDate())}` +
    `T${pad(d.getUTCHours())}${pad(d.getUTCMinutes())}${pad(d.getUTCSeconds())}Z`
  );
}

export function getEventWindow() {
  const start = new Date(EVENT_CONFIG.EVENT_DATE_ISO);
  const end = new Date(start.getTime() + EVENT_CONFIG.CALENDAR_DURATION_HOURS * 60 * 60 * 1000);
  return { start, end };
}

const TITLE = `60 años de ${EVENT_CONFIG.HONOREE_NAME}`;
const LOCATION = `${EVENT_CONFIG.VENUE_NAME}, ${EVENT_CONFIG.VENUE_ADDRESS}`;
const DETAILS = `Celebración de los 60 años de ${EVENT_CONFIG.HONOREE_NAME}. Te esperamos con mucho cariño.`;

export function getGoogleCalendarUrl(): string {
  const { start, end } = getEventWindow();
  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: TITLE,
    dates: `${toCalendarStamp(start)}/${toCalendarStamp(end)}`,
    details: DETAILS,
    location: LOCATION,
  });
  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

const escapeIcs = (v: string) =>
  v.replace(/\\/g, "\\\\").replace(/;/g, "\\;").replace(/,/g, "\\,").replace(/\n/g, "\\n");

export function buildIcs(): string {
  const { start, end } = getEventWindow();
  return [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Invitacion 60 Walfre//ES",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "BEGIN:VEVENT",
    "UID:60-walfre-torres@mis60walfretorres.com",
    `DTSTAMP:${toCalendarStamp(new Date())}`,
    `DTSTART:${toCalendarStamp(start)}`,
    `DTEND:${toCalendarStamp(end)}`,
    `SUMMARY:${escapeIcs(TITLE)}`,
    `DESCRIPTION:${escapeIcs(DETAILS)}`,
    `LOCATION:${escapeIcs(LOCATION)}`,
    "BEGIN:VALARM",
    "TRIGGER:-P1D",
    "ACTION:DISPLAY",
    "DESCRIPTION:Mañana es la fiesta de 60 años",
    "END:VALARM",
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");
}
