"use client";

import { EVENT_CONFIG } from "@/config/event";
import { MapPin, Navigation, ExternalLink, HeartHandshake } from "lucide-react";
import FadeIn from "./FadeIn";

export default function LocationCard() {
  return (
    <section className="relative px-4 py-8 max-w-xl mx-auto">
      <FadeIn>
        {/* Tarjeta de Ubicación en azul medianoche profundo con marco dorado */}
        <div className="relative rounded-3xl bg-gradient-to-b from-[#161f36]/95 to-[#101728]/95 border border-gold/30 p-6 sm:p-8 shadow-[0_8px_32px_rgba(0,0,0,0.45)] text-center space-y-6 overflow-hidden">
          {/* Adorno superior dorado brillante */}
          <div
            className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-gold to-transparent"
            aria-hidden="true"
          />

          {/* Ícono de ubicación con brillo dorado */}
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gold/15 border border-gold/40 text-gold-shimmer shadow-inner mx-auto relative z-10">
            <MapPin className="w-5 h-5 text-gold-shimmer" />
          </div>

          <div className="space-y-1 relative z-10">
            <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.25em] text-gold-shimmer font-semibold">
              ¿Cómo Llegar?
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white tracking-wide drop-shadow-md">
              {EVENT_CONFIG.VENUE_NAME}
            </h2>
            <p className="text-base text-cream-light/85 max-w-md mx-auto font-medium pt-1">
              {EVENT_CONFIG.VENUE_ADDRESS}
            </p>
          </div>

          {/* Botón de Google Maps táctil y dorado (homogéneo con el Hero) */}
          <div className="flex justify-center pt-2 relative z-10">
            <a
              href={EVENT_CONFIG.MAPS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 min-h-[48px] px-8 py-3.5 rounded-full bg-gold hover:bg-gold-shimmer active:bg-gold-dark text-navy font-bold text-sm uppercase tracking-wider transition-all shadow-lg hover:shadow-gold/20"
            >
              <Navigation className="w-4 h-4 text-navy" />
              <span>Abrir en Google Maps</span>
              <ExternalLink className="w-3.5 h-3.5 text-navy/70" />
            </a>
          </div>

          {/* Nota final de afecto */}
          <div className="pt-4 border-t border-gold/20 flex items-center justify-center gap-2 text-cream-light/90 text-sm italic font-medium relative z-10">
            <HeartHandshake className="w-4 h-4 text-gold-shimmer shrink-0" />
            <span>Te esperamos con mucho cariño.</span>
          </div>
        </div>
      </FadeIn>
    </section>
  );
}
