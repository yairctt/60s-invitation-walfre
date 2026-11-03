"use client";

import { useState, useEffect } from "react";
import Countdown from "./Countdown";
import GarlandLights from "./GarlandLights";
import { EVENT_CONFIG } from "@/config/event";
import { ChevronDown, Calendar, Clock } from "lucide-react";

export default function Hero() {
  // Inicializamos directamente con "/hero.jpg" para evitar saltos o parpadeos en móvil
  const [photoSrc, setPhotoSrc] = useState<string>("/hero.jpg");

  useEffect(() => {
    // Verificación preventiva por si el formato en disco fuese .jpeg, .png o .webp
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
    <section className="relative min-h-screen h-[100svh] min-h-[100svh] w-full flex flex-col justify-between overflow-hidden">
      {/* 
        1. FOTOGRAFÍA DE FONDO
        - Sin 'transition-all' para que no brinque ni se fuerce al hacer scroll en celular.
        - Filtro CSS de brillo y saturación natural para resaltar a Walfre a contraluz.
        - Posición 82% a la derecha para que su rostro y silueta se aprecien completos.
      */}
      <div
        className="absolute inset-0 w-full h-full z-0 bg-cover bg-no-repeat pointer-events-none"
        style={{
          backgroundColor: "#101626",
          backgroundPosition: "82% top",
          backgroundImage: `url('${photoSrc}')`,
          filter: "brightness(1.24) contrast(1.05) saturate(1.12)",
        }}
      />

      {/* 
        2. ILUMINACIÓN SELECTIVA Y CONTRASTE INTELIGENTE:
        A. Sombra en la esquina inferior izquierda:
           Cubre ÚNICAMENTE el área del texto (máximo 68% de ancho).
           Deja el lado derecho donde está Walfre con 0% de oscurecimiento.
      */}
      <div
        className="absolute bottom-0 left-0 w-[70%] sm:w-[58%] h-[68%] pointer-events-none z-1"
        style={{
          background:
            "radial-gradient(ellipse at bottom left, rgba(0, 0, 0, 0.88) 0%, rgba(0, 0, 0, 0.45) 50%, transparent 80%)",
        }}
        aria-hidden="true"
      />

      {/* 
        B. Reflector fotográfico cálido (luz de relleno de estudio):
           Aplica un suave resplandor cálido directo sobre Walfre (zona derecha),
           levantando las sombras de su rostro y su camisa sin quemar el atardecer.
      */}
      <div
        className="absolute inset-y-0 right-0 w-[55%] pointer-events-none z-1"
        style={{
          background:
            "radial-gradient(ellipse at 78% 62%, rgba(255, 238, 200, 0.22) 0%, rgba(255, 225, 170, 0.08) 50%, transparent 75%)",
          mixBlendMode: "screen",
        }}
        aria-hidden="true"
      />

      {/* 
        3. GUIRNALDA DE LUCES EN LA PARTE SUPERIOR (CIELO)
        Llena el espacio abierto del cielo con focos dorados de celebración cálida,
        integrándose de forma natural al entorno nocturno/atardecer.
      */}
      <div className="relative z-10 w-full pt-1 pointer-events-none">
        <GarlandLights />
      </div>

      {/* 
        4. INFORMACIÓN ALINEADA A LA IZQUIERDA (ZONA DEL RÍO)
        Ocupa un ancho máximo del 62% del celular a la izquierda.
        El lado derecho queda 100% despejado y luminoso para Walfre.
      */}
      <div className="relative z-10 w-full px-5 pb-5 flex flex-col justify-end">
        <div className="w-full max-w-[62%] sm:max-w-[270px] text-left space-y-2">
          {/* Subtítulo */}
          <p className="text-[10px] sm:text-[11px] uppercase tracking-[0.25em] text-gold-shimmer font-semibold drop-shadow-md">
            Nuestra Celebración
          </p>

          {/* Nombre en dos líneas para mantener despejado el lado derecho */}
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
