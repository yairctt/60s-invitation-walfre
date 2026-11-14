"use client";

import { useEffect, useState } from "react";
import { EVENT_CONFIG } from "@/config/event";

interface TimeRemaining {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  status: "upcoming" | "today" | "passed";
}

interface CountdownProps {
  align?: "left" | "center";
}

/** Número que "cae" suavemente al cambiar de valor (la key fuerza el remontaje y la animación). */
function Tick({ value }: { value: string }) {
  return (
    <span key={value} className="inline-block animate-tick">
      {value}
    </span>
  );
}

const UNITS: { key: keyof Omit<TimeRemaining, "status">; label: string; pad: boolean }[] = [
  { key: "days", label: "Días", pad: false },
  { key: "hours", label: "Horas", pad: true },
  { key: "minutes", label: "Min", pad: true },
  { key: "seconds", label: "Seg", pad: true },
];

export default function Countdown({ align = "left" }: CountdownProps) {
  const [mounted, setMounted] = useState(false);
  const [time, setTime] = useState<TimeRemaining>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    status: "upcoming",
  });

  useEffect(() => {
    setMounted(true);

    const calculateTime = () => {
      const targetTime = new Date(EVENT_CONFIG.EVENT_DATE_ISO).getTime();
      const difference = targetTime - Date.now();

      if (difference < -24 * 60 * 60 * 1000) {
        setTime({ days: 0, hours: 0, minutes: 0, seconds: 0, status: "passed" });
        return;
      }

      if (difference <= 0) {
        setTime({ days: 0, hours: 0, minutes: 0, seconds: 0, status: "today" });
        return;
      }

      setTime({
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((difference % (1000 * 60)) / 1000),
        status: "upcoming",
      });
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const justifyClass = align === "left" ? "justify-start" : "justify-center";
  const textAlign = align === "left" ? "text-left" : "text-center";

  if (time.status === "passed" && mounted) {
    return (
      <div className={textAlign}>
        <p className="text-lg font-display font-semibold text-white drop-shadow-md">Gracias por acompañarnos</p>
      </div>
    );
  }

  if (time.status === "today" && mounted) {
    return (
      <div className={textAlign}>
        <p className="text-xl font-display font-semibold text-gold-shimmer drop-shadow-md">¡Hoy es el gran día!</p>
        <p className="text-xs text-white/90 drop-shadow-sm mt-0.5">
          {EVENT_CONFIG.START_TIME_LABEL} en {EVENT_CONFIG.VENUE_NAME}
        </p>
      </div>
    );
  }

  return (
    <div
      className={`flex items-start ${justifyClass} gap-1 select-none text-white drop-shadow-md`}
      role="timer"
      aria-label="Cuenta regresiva"
    >
      {UNITS.map((unit, i) => {
        const raw = time[unit.key];
        const text = !mounted ? "--" : unit.pad ? String(raw).padStart(2, "0") : String(raw);
        return (
          <div key={unit.key} className="flex items-start gap-1">
            <div className="flex flex-col items-center min-w-[40px]">
              <span className="text-[28px] font-display font-semibold text-white tabular-nums leading-none drop-shadow-lg">
                {mounted ? <Tick value={text} /> : text}
              </span>
              <span className="text-[10px] uppercase tracking-[0.2em] text-gold-shimmer font-semibold mt-1.5">
                {unit.label}
              </span>
            </div>
            {i < UNITS.length - 1 && (
              <span className="text-lg font-display text-gold-shimmer/80 leading-none pt-1" aria-hidden="true">
                ·
              </span>
            )}
          </div>
        );
      })}
    </div>
  );
}
