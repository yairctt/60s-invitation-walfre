"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Countdown from "./Countdown";
import { EVENT_CONFIG } from "@/config/event";
import { ChevronDown, Calendar, Clock } from "lucide-react";

export default function Hero() {
  const photoRef = useRef<HTMLDivElement>(null);

  // Parallax suave: la fotografía se desplaza más lento que el contenido.
  // Se desactiva con prefers-reduced-motion y solo anima dentro del primer viewport.
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frame = 0;
    const update = () => {
      frame = 0;
      const el = photoRef.current;
      if (!el) return;
      const y = window.scrollY;
      if (y > window.innerHeight * 1.2) return;
      el.style.transform = `translate3d(0, ${(y * 0.18).toFixed(1)}px, 0)`;
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  const scrollTo = (id: string) => (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative h-[100svh] min-h-[560px] w-full flex flex-col justify-end overflow-hidden bg-[#101626]">
      {/*
        1. FOTOGRAFÍA DE FONDO
        Sin filtros ni degradados artificiales. next/image la sirve en WebP/AVIF optimizado.
        Posicionada al 82% a la derecha para que Walfre se vea completo.
      */}
      <div ref={photoRef} className="absolute inset-0 w-full h-full z-0 pointer-events-none will-change-transform">
        <Image
          src="/hero.jpg"
          alt="Walfre Torres Antolín"
          fill
          priority
          sizes="(max-width: 460px) 100vw, 460px"
          className="object-cover"
          style={{ objectPosition: "82% top" }}
        />
      </div>

      {/* Marco dorado fino (no es un filtro: solo una línea sobre la foto) */}
      <div
        className="absolute inset-3 z-[5] border border-gold-shimmer/50 pointer-events-none"
        aria-hidden="true"
      />

      {/* 2. INFORMACIÓN a la izquierda; el lado derecho queda libre para la persona */}
      <div className="relative z-10 w-full px-7 pb-6 flex flex-col justify-end">
        <div className="w-full max-w-[64%] sm:max-w-[290px] text-left space-y-2.5 drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
          <p className="flex items-center gap-2 whitespace-nowrap text-[10.5px] uppercase tracking-[0.28em] text-gold-shimmer font-semibold drop-shadow-md">
            <span className="w-4 h-px bg-gold-shimmer/80 shrink-0" aria-hidden="true" />
            Nuestra Celebración
          </p>

          <div className="space-y-0.5">
            <h1 className="font-display text-[40px] font-semibold text-white tracking-tight drop-shadow-[0_2px_6px_rgba(0,0,0,0.95)] leading-[0.95]">
              Walfre Torres
              <span className="block text-cream-light font-medium text-[30px] tracking-wide mt-0.5">Antolín</span>
            </h1>
            <p className="font-script text-[44px] text-gold-shimmer leading-none drop-shadow-md pt-1">
              Mis 60 Años
            </p>
          </div>

          <div className="w-14 h-px bg-gold-shimmer/70 my-2" />

          <div className="flex flex-col text-[13px] text-cream-light font-medium drop-shadow-[0_1px_4px_rgba(0,0,0,0.95)] space-y-1">
            <div className="inline-flex items-center gap-2">
              <Calendar className="w-4 h-4 text-gold-shimmer shrink-0" />
              <span className="font-semibold text-white">30 de diciembre</span>
            </div>
            <div className="inline-flex items-center gap-2">
              <Clock className="w-4 h-4 text-gold-shimmer shrink-0" />
              <span>{EVENT_CONFIG.START_TIME_LABEL}</span>
            </div>
          </div>

          <div className="pt-1.5">
            <Countdown align="left" />
          </div>

          <div className="pt-2 w-full max-w-[220px]">
            <a
              href="#rsvp"
              onClick={scrollTo("rsvp")}
              className="inline-flex items-center justify-center w-full min-h-[46px] px-4 py-2 rounded-full bg-gradient-to-br from-gold-shimmer via-gold to-gold-dark text-navy-dark font-bold text-[11px] uppercase tracking-[0.18em] shadow-[0_6px_20px_rgba(201,162,39,0.45)] transition-all active:scale-95 text-center"
            >
              Confirmar asistencia
            </a>
          </div>
        </div>

        <div className="w-full flex justify-center pt-4">
          <a
            href="#homenaje"
            onClick={scrollTo("homenaje")}
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
