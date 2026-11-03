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

export default function Countdown() {
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
      const now = Date.now();
      const difference = targetTime - now;

      if (difference < -24 * 60 * 60 * 1000) {
        setTime({ days: 0, hours: 0, minutes: 0, seconds: 0, status: "passed" });
        return;
      }

      if (difference <= 0) {
        setTime({ days: 0, hours: 0, minutes: 0, seconds: 0, status: "today" });
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setTime({ days, hours, minutes, seconds, status: "upcoming" });
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  if (!mounted) {
    return (
      <div className="flex items-center justify-center gap-3 sm:gap-4 py-1 text-white">
        {["Días", "Horas", "Min", "Seg"].map((label, i) => (
          <div key={i} className="flex flex-col items-center min-w-[48px]">
            <span className="text-2xl sm:text-3xl font-serif font-bold text-white drop-shadow-md">--</span>
            <span className="text-[10px] uppercase tracking-wider text-white/80 font-medium drop-shadow-sm mt-0.5">
              {label}
            </span>
          </div>
        ))}
      </div>
    );
  }

  if (time.status === "passed") {
    return (
      <div className="text-center py-1">
        <p className="text-lg font-serif font-bold text-white drop-shadow-md">Gracias por acompañarnos</p>
      </div>
    );
  }

  if (time.status === "today") {
    return (
      <div className="text-center py-1">
        <p className="text-xl font-serif font-bold text-gold-shimmer drop-shadow-md">¡Hoy es el gran día!</p>
        <p className="text-xs text-white/90 drop-shadow-sm mt-0.5">
          A las {EVENT_CONFIG.START_TIME_LABEL} en {EVENT_CONFIG.VENUE_NAME}
        </p>
      </div>
    );
  }

  /* 
    Diseño minimalista transparente (igual que en la referencia de la boda):
    Sin cajas blancas opacas que tapen la fotografía.
  */
  return (
    <div
      className="flex items-center justify-center gap-2 sm:gap-3 select-none text-white drop-shadow-md"
      role="timer"
      aria-label="Cuenta regresiva"
    >
      {/* Días */}
      <div className="flex flex-col items-center min-w-[50px]">
        <span className="text-2xl sm:text-3xl font-serif font-bold text-white tabular-nums leading-none drop-shadow-lg">
          {time.days}
        </span>
        <span className="text-[10px] uppercase tracking-widest text-white/80 font-semibold mt-1 drop-shadow-sm">
          Días
        </span>
      </div>

      <span className="text-xl sm:text-2xl font-serif text-gold-shimmer font-bold -mt-3 drop-shadow-md select-none">:</span>

      {/* Horas */}
      <div className="flex flex-col items-center min-w-[50px]">
        <span className="text-2xl sm:text-3xl font-serif font-bold text-white tabular-nums leading-none drop-shadow-lg">
          {String(time.hours).padStart(2, "0")}
        </span>
        <span className="text-[10px] uppercase tracking-widest text-white/80 font-semibold mt-1 drop-shadow-sm">
          Horas
        </span>
      </div>

      <span className="text-xl sm:text-2xl font-serif text-gold-shimmer font-bold -mt-3 drop-shadow-md select-none">:</span>

      {/* Minutos */}
      <div className="flex flex-col items-center min-w-[50px]">
        <span className="text-2xl sm:text-3xl font-serif font-bold text-white tabular-nums leading-none drop-shadow-lg">
          {String(time.minutes).padStart(2, "0")}
        </span>
        <span className="text-[10px] uppercase tracking-widest text-white/80 font-semibold mt-1 drop-shadow-sm">
          Min
        </span>
      </div>

      <span className="text-xl sm:text-2xl font-serif text-gold-shimmer font-bold -mt-3 drop-shadow-md select-none">:</span>

      {/* Segundos */}
      <div className="flex flex-col items-center min-w-[50px]">
        <span className="text-2xl sm:text-3xl font-serif font-bold text-white tabular-nums leading-none drop-shadow-lg">
          {String(time.seconds).padStart(2, "0")}
        </span>
        <span className="text-[10px] uppercase tracking-widest text-white/80 font-semibold mt-1 drop-shadow-sm">
          Seg
        </span>
      </div>
    </div>
  );
}
