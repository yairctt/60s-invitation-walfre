"use client";

import { useState, useEffect } from "react";
import { EVENT_CONFIG } from "@/config/event";
import { Sparkles } from "lucide-react";

export default function EnvelopeIntro() {
  const [isOpening, setIsOpening] = useState(false);
  const [isOpened, setIsOpened] = useState(false);
  const [isDestroyed, setIsDestroyed] = useState(false);

  // Comprobar si el usuario prefiere movimiento reducido
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (motionQuery.matches) {
      setPrefersReducedMotion(true);
    }
  }, []);

  const handleOpen = () => {
    if (isOpening || isOpened) return;

    if (prefersReducedMotion) {
      setIsOpened(true);
      setIsDestroyed(true);
      return;
    }

    setIsOpening(true);

    // Secuencia de animación cinematográfica:
    // 1. Romper sello y abrir solapa superior (0ms a 700ms)
    // 2. Extraer carta hacia arriba (600ms a 1400ms)
    // 3. Desvanecer la cortina y revelar la web completa (1600ms a 2200ms)
    setTimeout(() => {
      setIsOpened(true);
    }, 1500);

    setTimeout(() => {
      setIsDestroyed(true);
    }, 2200);
  };

  if (isDestroyed) {
    return null;
  }

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-opacity duration-700 select-none ${
        isOpened ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
      style={{
        backgroundColor: "rgba(10, 14, 23, 0.96)",
        backdropFilter: "blur(12px)",
      }}
    >
      <div className="flex flex-col items-center max-w-[380px] w-full">
        {/* Encabezado sobre el sobre */}
        <div
          className={`text-center space-y-1 mb-6 transition-all duration-500 ${
            isOpening ? "opacity-0 -translate-y-4" : "opacity-100 translate-y-0"
          }`}
        >
          <span className="inline-block text-[11px] uppercase tracking-[0.3em] text-gold-shimmer font-semibold">
            Invitación de Honor
          </span>
          <p className="text-sm font-serif text-cream-light/80 italic">
            Tienes una carta para una ocasión especial
          </p>
        </div>

        {/* 
          ESTRUCTURA DEL SOBRE EN 3D
        */}
        <div
          onClick={handleOpen}
          className={`relative w-[310px] sm:w-[350px] h-[210px] sm:h-[230px] cursor-pointer group transition-transform duration-300 ${
            !isOpening ? "hover:scale-[1.02] active:scale-[0.99]" : ""
          }`}
          style={{ perspective: "1000px" }}
          role="button"
          tabIndex={0}
          aria-label="Abrir sobre de invitación"
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              handleOpen();
            }
          }}
        >
          {/* Sombra proyectada del sobre */}
          <div className="absolute inset-x-4 -bottom-4 h-8 bg-black/50 blur-xl rounded-full" />

          {/* Cuerpo base trasero del sobre */}
          <div className="absolute inset-0 bg-[#ebe3d3] rounded-2xl border border-gold/40 shadow-2xl overflow-hidden">
            {/* Acuarela interior del sobre */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#f8f3e8] via-[#ebe2cf] to-[#ded2b9]" />
          </div>

          {/* 
            CARTA INTERIOR QUE SUBE AL ABRIR
          */}
          <div
            className={`absolute inset-x-3 bottom-2 h-[190px] sm:h-[210px] bg-white rounded-xl border border-gold/50 shadow-md p-4 flex flex-col justify-between items-center text-center transition-all duration-800 ease-out z-10 ${
              isOpening
                ? "-translate-y-28 sm:-translate-y-32 scale-105 shadow-2xl"
                : "translate-y-0"
            }`}
          >
            <div className="w-8 h-px bg-gold/50 mx-auto" />
            <div className="space-y-1">
              <p className="text-[10px] uppercase tracking-widest text-navy/70 font-semibold">
                60 Años
              </p>
              <p className="font-serif font-bold text-lg text-navy leading-tight">
                {EVENT_CONFIG.HONOREE_NAME}
              </p>
              <p className="text-[11px] text-gold-dark font-medium">
                30 de diciembre · 2:00 p. m.
              </p>
            </div>
            <div className="w-8 h-px bg-gold/50 mx-auto" />
          </div>

          {/* Solapa inferior y laterales frontales del sobre (bolsillo frontal) */}
          <div className="absolute inset-0 z-20 pointer-events-none overflow-hidden rounded-2xl">
            {/* Doblez lateral izquierdo */}
            <div
              className="absolute left-0 bottom-0 top-0 w-1/2 bg-[#f4ede0] border-r border-black/5 shadow-xs"
              style={{ clipPath: "polygon(0 0, 0 100%, 100% 100%)" }}
            />
            {/* Doblez lateral derecho */}
            <div
              className="absolute right-0 bottom-0 top-0 w-1/2 bg-[#f0e7d7] border-l border-black/5 shadow-xs"
              style={{ clipPath: "polygon(100% 0, 100% 100%, 0 100%)" }}
            />
            {/* Doblez frontal inferior triangular */}
            <div
              className="absolute inset-x-0 bottom-0 h-3/5 bg-gradient-to-t from-[#e8decb] to-[#f5eee1] border-t border-gold/30 shadow-md"
              style={{ clipPath: "polygon(0 100%, 50% 15%, 100% 100%)" }}
            />
          </div>

          {/* 
            SOLAPA SUPERIOR CON APERTURA EN 3D
          */}
          <div
            className="absolute inset-x-0 top-0 h-[125px] sm:h-[135px] origin-top transition-transform duration-700 ease-in-out"
            style={{
              transformStyle: "preserve-3d",
              clipPath: "polygon(0 0, 50% 100%, 100% 0)",
              transform: isOpening ? "rotateX(180deg)" : "rotateX(0deg)",
              zIndex: isOpening ? 5 : 30,
            }}
          >
            {/* Cara exterior de la solapa */}
            <div className="w-full h-full bg-gradient-to-b from-[#efe6d5] to-[#dfd3bc] border-b-2 border-gold/50 shadow-md" />
          </div>

          {/* 
            SELLO DE CERA DORADO CON RELIEVE Y PULSO
          */}
          <div
            className={`absolute left-1/2 top-[110px] sm:top-[120px] -translate-x-1/2 -translate-y-1/2 z-40 transition-all duration-500 ${
              isOpening
                ? "opacity-0 scale-50 pointer-events-none"
                : "opacity-100 scale-100"
            }`}
          >
            <div className="relative flex items-center justify-center">
              {/* Resplandor pulsante */}
              <div className="absolute inset-0 rounded-full bg-gold-shimmer/40 blur-md animate-ping pointer-events-none opacity-75" />

              {/* Botón del sello de cera dorada */}
              <div className="relative w-16 h-16 rounded-full bg-gradient-to-br from-[#fbeebc] via-gold to-[#87650d] p-1 shadow-2xl border-2 border-[#fff3cc] flex items-center justify-center group-hover:scale-110 transition-transform">
                {/* Anillo interior del sello */}
                <div className="w-full h-full rounded-full border border-gold-dark/60 flex items-center justify-center bg-gradient-to-tr from-gold to-[#fbf0c2]">
                  <span className="font-serif font-black text-navy text-xs tracking-tight">
                    W60
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Indicador táctil inferior */}
        <div
          className={`mt-8 text-center transition-opacity duration-300 ${
            isOpening ? "opacity-0" : "opacity-100"
          }`}
        >
          <button
            onClick={handleOpen}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-gold/20 hover:bg-gold/30 border border-gold/60 text-gold-shimmer text-xs uppercase tracking-widest font-bold transition-all shadow-lg active:scale-95"
          >
            <Sparkles className="w-4 h-4 text-gold-shimmer animate-spin" style={{ animationDuration: "8s" }} />
            <span>Toca para abrir</span>
          </button>
        </div>
      </div>
    </div>
  );
}
