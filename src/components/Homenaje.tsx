"use client";

import { EVENT_CONFIG } from "@/config/event";
import { Heart, Quote } from "lucide-react";
import FadeIn from "./FadeIn";

export default function Homenaje() {
  return (
    <section id="homenaje" className="relative px-4 py-8 max-w-xl mx-auto scroll-mt-4">
      <FadeIn>
        {/* Tarjeta de Homenaje en azul medianoche profundo con marco dorado */}
        <div className="relative rounded-3xl bg-gradient-to-b from-[#161f36]/95 to-[#101728]/95 border border-gold/30 p-6 sm:p-8 shadow-[0_8px_32px_rgba(0,0,0,0.45)] overflow-hidden">
          {/* Adorno superior dorado brillante */}
          <div
            className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-gold to-transparent"
            aria-hidden="true"
          />

          <div className="space-y-6 text-center relative z-10">
            {/* Ícono de homenaje con brillo dorado */}
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gold/15 border border-gold/40 text-gold-shimmer shadow-inner mx-auto">
              <Heart className="w-5 h-5 fill-gold/25" />
            </div>

            <div className="space-y-1">
              <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.25em] text-gold-shimmer font-semibold">
                Nuestras Raíces
              </span>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white tracking-wide drop-shadow-md">
                Un Homenaje de su Familia
              </h2>
            </div>

            {/* Mensaje de la familia con comillas doradas */}
            <div className="relative pt-1">
              <Quote className="w-8 h-8 text-gold/40 mx-auto mb-3" />
              <p className="text-base sm:text-lg text-cream-light font-serif leading-relaxed italic max-w-lg mx-auto drop-shadow-sm">
                {`"${EVENT_CONFIG.FAMILY_MESSAGE}"`}
              </p>
            </div>

            <div className="pt-2 text-xs uppercase tracking-[0.2em] text-gold-shimmer font-bold">
              Familia Torres
            </div>
          </div>
        </div>
      </FadeIn>
    </section>
  );
}
