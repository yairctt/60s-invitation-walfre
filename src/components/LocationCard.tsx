"use client";

import { EVENT_CONFIG } from "@/config/event";
import { MapPin, Navigation, ExternalLink, HeartHandshake } from "lucide-react";
import FadeIn from "./FadeIn";

export default function LocationCard() {
  return (
    <section className="relative px-4 py-8 max-w-xl mx-auto">
      <FadeIn>
        {/* Tarjeta de Ubicación Blanca con borde dorado fino */}
        <div className="relative rounded-3xl bg-white border border-gold/40 p-6 sm:p-8 shadow-cake-card text-center space-y-6 overflow-hidden">
          {/* Ícono de ubicación */}
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-cream-light border border-gold/40 text-gold shadow-sm relative z-10">
            <MapPin className="w-5 h-5 text-gold-dark" />
          </div>

          <div className="space-y-2 relative z-10">
            <span className="text-xs uppercase tracking-widest text-navy/70 font-bold">
              ¿Cómo Llegar?
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-navy">
              {EVENT_CONFIG.VENUE_NAME}
            </h2>
            <p className="text-base text-navy/85 max-w-md mx-auto font-medium">
              {EVENT_CONFIG.VENUE_ADDRESS}
            </p>
          </div>

          {/* Botones de Navegación táctiles */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 pt-2 relative z-10">
            <a
              href={EVENT_CONFIG.MAPS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 min-h-[48px] px-6 py-3.5 rounded-full bg-navy hover:bg-navy-hover text-white font-semibold text-sm transition-colors shadow-sm border border-gold/30"
            >
              <Navigation className="w-4 h-4 text-gold-shimmer" />
              <span>Abrir en Google Maps</span>
              <ExternalLink className="w-3.5 h-3.5 text-white/70" />
            </a>

            <a
              href={EVENT_CONFIG.WAZE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 min-h-[48px] px-6 py-3.5 rounded-full bg-cream-light hover:bg-cream border border-gold/40 text-navy font-semibold text-sm transition-colors shadow-sm"
            >
              <Navigation className="w-4 h-4 text-navy" />
              <span>Abrir en Waze</span>
              <ExternalLink className="w-3.5 h-3.5 text-navy/60" />
            </a>
          </div>

          {/* Nota final de afecto */}
          <div className="pt-4 border-t border-cream-dark flex items-center justify-center gap-2 text-navy text-sm italic font-medium relative z-10">
            <HeartHandshake className="w-4 h-4 text-gold-dark shrink-0" />
            <span>Te esperamos con mucho cariño.</span>
          </div>
        </div>
      </FadeIn>
    </section>
  );
}
