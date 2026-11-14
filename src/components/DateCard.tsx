import { EVENT_CONFIG } from "@/config/event";
import { getGoogleCalendarUrl } from "@/lib/calendar";
import FadeIn from "./FadeIn";
import SectionTitle from "./SectionTitle";

const MONTHS = [
  "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
  "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre",
];
const WEEKDAYS = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
const WEEKDAY_INITIALS = ["D", "L", "M", "M", "J", "V", "S"];

/**
 * "Aparta la fecha": calendario del mes del evento con el día marcado y accesos para guardarlo.
 * Se calcula a partir de EVENT_DATE_ISO usando la fecha local del evento (sin desfases de zona horaria).
 */
export default function DateCard() {
  const [year, month, day] = EVENT_CONFIG.EVENT_DATE_ISO.slice(0, 10).split("-").map(Number);
  const firstWeekday = new Date(Date.UTC(year, month - 1, 1)).getUTCDay();
  const daysInMonth = new Date(Date.UTC(year, month, 0)).getUTCDate();
  const eventWeekday = WEEKDAYS[new Date(Date.UTC(year, month - 1, day)).getUTCDay()];

  const cells: (number | null)[] = [
    ...Array.from({ length: firstWeekday }, () => null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];

  return (
    <section className="bg-navy px-8 py-20 text-center">
      <FadeIn>
        <SectionTitle
          eyebrow="Aparta la fecha"
          title={`${eventWeekday} ${day} de ${MONTHS[month - 1].toLowerCase()}`}
          tone="dark"
        />
      </FadeIn>

      <FadeIn delay={150}>
        <div className="mt-10 mx-auto max-w-[300px]">
          <p className="font-display text-lg tracking-[0.25em] uppercase text-cream-light/80">
            {MONTHS[month - 1]} {year}
          </p>

          <div
            className="mt-5 grid grid-cols-7 gap-y-1 text-center"
            role="grid"
            aria-label={`Calendario de ${MONTHS[month - 1]} ${year}`}
          >
            {WEEKDAY_INITIALS.map((w, i) => (
              <span key={i} className="text-[10px] font-medium tracking-widest text-gold-shimmer/70 pb-2">
                {w}
              </span>
            ))}
            {cells.map((c, i) =>
              c === null ? (
                <span key={`b${i}`} />
              ) : c === day ? (
                <span key={c} className="flex items-center justify-center" aria-current="date">
                  <span className="w-9 h-9 rounded-full bg-gold text-navy-dark font-semibold text-[15px] flex items-center justify-center">
                    {c}
                  </span>
                </span>
              ) : (
                <span key={c} className="h-9 flex items-center justify-center text-[13px] text-cream-light/40 tabular-nums">
                  {c}
                </span>
              )
            )}
          </div>
        </div>
      </FadeIn>

      <FadeIn delay={250}>
        <p className="mt-10 font-display text-[30px] leading-none text-cream-light">{EVENT_CONFIG.START_TIME_LABEL}</p>

        <div className="mt-8 flex flex-col items-center gap-4">
          <a
            href={getGoogleCalendarUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center min-h-[48px] px-8 py-3 rounded-sm bg-gold hover:bg-gold-shimmer text-navy-dark font-semibold text-[11px] uppercase tracking-[0.2em] transition-colors active:scale-[0.98]"
          >
            Agregar al calendario
          </a>
          <a
            href="/api/calendar"
            className="text-[12px] text-cream-light/60 hover:text-gold-shimmer underline underline-offset-4 decoration-gold/40 transition-colors py-2"
          >
            Descargar para Apple u Outlook (.ics)
          </a>
        </div>
      </FadeIn>
    </section>
  );
}
