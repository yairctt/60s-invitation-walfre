"use client";

import { useState, useEffect } from "react";
import Countdown from "./Countdown";
import { EVENT_CONFIG } from "@/config/event";
import { ChevronDown, Calendar, Clock } from "lucide-react";

export default function Hero() {
  const [photoSrc, setPhotoSrc] = useState<string | null>(null);

  useEffect(() => {
    // Detección automática de la foto
    const candidates = ["/hero.jpg", "/hero.jpeg", "/hero.png", "/hero.webp"];
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
    <section className="relative min-h-[100dvh] w-full flex flex-col justify-end overflow-hidden">
      {/* 
        1. FOTOGRAFÍA DE FONDO
        Posicionada hacia la derecha (85% horizontal) para que Walfre se vea completo 
        y no quede cortado ni centrado en la pantalla.
      */}
      <div
        className="absolute inset-0 w-full h-full z-0 bg-cover transition-all duration-700"
        style={{
          backgroundColor: "#101626",
          backgroundPosition: "85% top",
          backgroundImage: photoSrc
            ? `url('${photoSrc}')`
            : `
                radial-gradient(circle at 50% 25%, rgba(201, 162, 39, 0.4) 0%, transparent 55%),
                radial-gradient(circle at 50% 80%, rgba(10, 15, 26, 0.95) 0%, #080c14 100%)
              `,
        }}
      >
        {/* 
          Degradado lateral izquierdo y fondo:
          Oscurece solo el lado izquierdo (donde está el agua) para que las letras se lean perfecto, 
          mientras que el lado derecho (donde está Walfre) queda 100% libre, iluminado y sin obstáculos.
        */}
        <div
          className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/40 to-transparent pointer-events-none"
          aria-hidden="true"
        />
        <div
          className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-black/80 via-black/30 to-transparent pointer-events-none"
          aria-hidden="true"
        />
      </div>

      {/* 
        2. INFORMACIÓN ALINEADA A LA IZQUIERDA (ESPACIO DEL RÍO / ATARDECER)
        Ocupa un ancho máximo del 62% del celular a la izquierda.
        El 38% derecho queda completamente despejado para la cara y cuerpo de Walfre.
      */}
      <div className="relative z-10 w-full px-5 pb-6 pt-12 flex flex-col justify-end">
        <div className="w-full max-w-[62%] sm:max-w-[270px] text-left space-y-2.5">
          {/* Subtítulo */}
          <p className="text-[10px] sm:text-[11px] uppercase tracking-[0.25em] text-gold-shimmer font-semibold drop-shadow-md">
            Nuestra Celebración
          </p>

          {/* Nombre en dos líneas para no cruzar hacia la derecha */}
          <div className="space-y-0.5">
            <h1 className="text-2xl sm:text-3xl font-serif font-bold text-white tracking-wide drop-shadow-lg leading-tight">
              Walfre Torres <br />
              <span className="text-cream-light font-normal text-xl sm:text-2xl">Antolín</span>
            </h1>
            <p className="font-script text-3xl sm:text-4xl text-gold-shimmer leading-none drop-shadow-md pt-0.5">
              Mis 60 Años
            </p>
          </div>

          {/* Línea divisoria dorada fina */}
          <div className="w-12 h-px bg-gold/60 my-1.5" />

          {/* Fecha y hora */}
          <div className="flex flex-col text-xs text-cream-light font-medium drop-shadow-md space-y-0.5">
            <div className="inline-flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-gold-shimmer shrink-0" />
              <span className="font-semibold text-white">30 de diciembre</span>
            </div>
            <div className="inline-flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-gold-shimmer shrink-0" />
              <span>{EVENT_CONFIG.START_TIME_LABEL}</span>
            </div>
          </div>

          {/* Cuenta regresiva compacta alineada a la izquierda */}
          <div className="pt-1.5 pb-1">
            <Countdown align="left" />
          </div>

          {/* Botón de acción */}
          <div className="pt-1 w-full max-w-[210px]">
            <a
              href="#rsvp"
              onClick={handleScrollToRsvp}
              className="inline-flex items-center justify-center gap-1.5 w-full min-h-[42px] px-4 py-2 rounded-full bg-gold hover:bg-gold-shimmer active:bg-gold-dark text-navy font-bold text-xs uppercase tracking-wider transition-all shadow-lg active:scale-95 text-center"
            >
              <span>Confirmar asistencia</span>
            </a>
          </div>
        </div>

        {/* Flecha inferior centrada para deslizar suavemente hacia abajo */}
        <div className="w-full flex justify-center pt-3">
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
