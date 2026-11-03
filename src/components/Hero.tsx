"use client";

import { useState, useEffect } from "react";
import Countdown from "./Countdown";
import { EVENT_CONFIG } from "@/config/event";
import { ChevronDown, Calendar, Clock } from "lucide-react";

export default function Hero() {
  const [photoSrc, setPhotoSrc] = useState<string | null>(null);

  useEffect(() => {
    // Detección automática y silenciosa de la foto en .jpeg o .jpg
    const candidates = ["/hero.jpeg", "/hero.jpg", "/hero.png", "/hero.webp"];
    let isMounted = true;

    const testCandidate = (index: number) => {
      if (index >= candidates.length || !isMounted) return;
      const src = candidates[index];
      const img = new Image();
      img.src = src;
      img.onload = () => {
        if (isMounted) {
          setPhotoSrc(src);
        }
      };
      img.onerror = () => {
        testCandidate(index + 1);
      };
    };

    testCandidate(0);

    return () => {
      isMounted = false;
    };
  }, []);

  const handleScrollToRsvp = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const rsvpElement = document.getElementById("rsvp");
    if (rsvpElement) {
      rsvpElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleScrollDown = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const nextSection = document.getElementById("homenaje");
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative min-h-[100dvh] w-full flex flex-col justify-end items-center text-center overflow-hidden">
      {/* 
        1. FOTOGRAFÍA ÚNICA DE FONDO (hero.jpg)
        Se carga como fondo CSS mediante detección limpia, sin etiquetas <img> que causen iconos rotos.
        El 65% superior queda COMPLETAMENTE LIMPIO para el rostro de Walfre.
      */}
      <div
        className="absolute inset-0 w-full h-full z-0 bg-cover bg-top transition-all duration-700"
        style={{
          backgroundColor: "#101626",
          backgroundImage: photoSrc
            ? `url('${photoSrc}')`
            : `
                radial-gradient(circle at 50% 25%, rgba(201, 162, 39, 0.4) 0%, transparent 55%),
                radial-gradient(circle at 50% 80%, rgba(10, 15, 26, 0.95) 0%, #080c14 100%)
              `,
        }}
      >
        {/* 
          Degradado suave SOLO en el tercio inferior (último 45% de la pantalla).
          La parte superior y central queda 100% despejada.
        */}
        <div
          className="absolute inset-x-0 bottom-0 h-[55%] bg-gradient-to-t from-black/95 via-black/60 to-transparent pointer-events-none"
          aria-hidden="true"
        />
      </div>

      {/* 
        2. BLOQUE DE TEXTO COMPACTO CONCENTRADO EN EL TERCIO INFERIOR
        (Distribución idéntica a la referencia de la boda)
      */}
      <div className="relative z-10 w-full px-4 pb-6 pt-12 flex flex-col items-center space-y-3">
        {/* Subtítulo elegante */}
        <p className="text-[11px] sm:text-xs uppercase tracking-[0.35em] text-gold-shimmer font-semibold drop-shadow-md">
          Nuestra Celebración
        </p>

        {/* Nombre del Homenajeado compacto y nítido */}
        <div className="space-y-0.5">
          <h1 className="text-3xl sm:text-4xl font-serif font-bold text-white tracking-wide drop-shadow-lg leading-tight">
            {EVENT_CONFIG.HONOREE_NAME}
          </h1>
          <p className="font-script text-3xl sm:text-4xl text-gold-shimmer leading-none drop-shadow-md">
            Mis 60 Años
          </p>
        </div>

        {/* Línea divisoria muy fina como en el ejemplo */}
        <div className="w-16 h-px bg-gold/50 my-1" />

        {/* Fecha y hora */}
        <div className="flex items-center gap-2 text-xs sm:text-sm text-cream-light/95 font-medium drop-shadow-md">
          <div className="inline-flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5 text-gold-shimmer" />
            <span>30 de diciembre</span>
          </div>
          <span className="text-gold font-bold">·</span>
          <div className="inline-flex items-center gap-1">
            <Clock className="w-3.5 h-3.5 text-gold-shimmer" />
            <span>{EVENT_CONFIG.START_TIME_LABEL}</span>
          </div>
        </div>

        {/* Cuenta Regresiva transparente directa sobre la foto */}
        <div className="w-full pt-1 pb-1">
          <Countdown />
        </div>

        {/* Botón de acción */}
        <div className="pt-1 w-full max-w-[280px]">
          <a
            href="#rsvp"
            onClick={handleScrollToRsvp}
            className="inline-flex items-center justify-center gap-2 w-full min-h-[46px] px-6 py-2.5 rounded-full bg-gold hover:bg-gold-shimmer active:bg-gold-dark text-navy font-bold text-xs uppercase tracking-wider transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          >
            <span>Confirmar asistencia</span>
          </a>
        </div>

        {/* Flecha inferior rebotando hacia abajo */}
        <div className="pt-2">
          <a
            href="#homenaje"
            onClick={handleScrollDown}
            className="inline-flex flex-col items-center text-white/80 hover:text-white transition-colors animate-bounce motion-reduce:animate-none"
            aria-label="Ver invitación completa"
          >
            <ChevronDown className="w-6 h-6 stroke-[2.5] drop-shadow-md" />
          </a>
        </div>
      </div>
    </section>
  );
}
