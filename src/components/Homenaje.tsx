"use client";

import { EVENT_CONFIG } from "@/config/event";
import { Heart, Quote } from "lucide-react";
import FadeIn from "./FadeIn";

export default function Homenaje() {
  return (
    <section id="homenaje" className="relative px-4 py-8 max-w-xl mx-auto scroll-mt-4">
      <FadeIn>
        {/* Tarjeta de Homenaje Blanca con borde dorado fino */}
        <div className="relative rounded-3xl bg-white border border-gold/40 p-6 sm:p-8 shadow-cake-card overflow-hidden">
          {/* Adorno superior dorado */}
          <div
            className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-gold to-transparent"
            aria-hidden="true"
          />

          <div className="space-y-6 text-center relative z-10">
            {/* Ícono de homenaje */}
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-cream-light border border-gold/40 text-gold shadow-sm">
              <Heart className="w-5 h-5 fill-gold/20" />
            </div>

            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-navy">
              Un Homenaje de su Familia
            </h2>

            {/* Mensaje de la familia con comillas doradas */}
            <div className="relative pt-2">
              <Quote className="w-8 h-8 text-gold/40 mx-auto mb-3" />
              <p className="text-base sm:text-lg text-navy/90 font-sans leading-relaxed italic max-w-lg mx-auto">
                {`"${EVENT_CONFIG.FAMILY_MESSAGE}"`}
              </p>
            </div>

            <div className="pt-2 text-xs uppercase tracking-widest text-navy/70 font-bold">
              Familia Torres
            </div>
          </div>
        </div>
      </FadeIn>
    </section>
  );
}
