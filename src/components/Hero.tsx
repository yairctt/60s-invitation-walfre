"use client";

import { useState, useEffect } from "react";
import Countdown from "./Countdown";
import { EVENT_CONFIG } from "@/config/event";
import { ChevronDown, Calendar, Clock } from "lucide-react";

export default function Hero() {
  const [photoSrc, setPhotoSrc] = useState<string>("/hero.jpg");

  useEffect(() => {
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
    <section className="relative min-h-screen h-[100svh] min-h-[100svh] w-full flex flex-col justify-end overflow-hidden">
      {/* 
        1. FOTOGRAFÍA DE FONDO
        100% natural, sin ningún filtro artificial, sin cortes de luz ni degradados raros.
        Posicionada al 82% a la derecha para que Walfre se vea completo sin obstrucción.
      */}
      <div
        className="absolute inset-0 w-full h-full z-0 bg-cover bg-no-repeat pointer-events-none"
        style={{
          backgroundColor: "#101626",
          backgroundPosition: "82% top",
          backgroundImage: `url('${photoSrc}')`,
        }}
      />

      {/* 
        2. INFORMACIÓN ALINEADA A LA IZQUIERDA
        Ocupa un ancho máximo del 62% a la izquierda (sobre el espacio del agua).
        El lado derecho queda 100% libre para la persona.
      */}
      <div className="relative z-10 w-full px-5 pb-5 flex flex-col justify-end">
        <div className="w-full max-w-[62%] sm:max-w-[270px] text-left space-y-2 drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
          {/* Subtítulo */}
          <p className="text-[10px] sm:text-[11px] uppercase tracking-[0.25em] text-gold-shimmer font-semibold drop-shadow-md">
            Nuestra Celebración
          </p>

          {/* Nombre en dos líneas para mantener despejado el lado derecho */}
          <div className="space-y-0.5">
            <h1 className="text-2xl sm:text-3xl font-serif font-bold text-white tracking-wide drop-shadow-[0_2px_6px_rgba(0,0,0,0.95)] leading-tight">
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
          <div className="flex flex-col text-xs text-cream-light font-medium drop-shadow-[0_1px_4px_rgba(0,0,0,0.95)] space-y-0.5">
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
          <div className="pt-1 pb-1">
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
