"use client";

import { EVENT_CONFIG } from "@/config/event";
import FadeIn from "./FadeIn";
import SectionTitle from "./SectionTitle";

export default function LocationCard() {
  return (
    <section className="bg-navy px-8 py-20 text-center">
      <FadeIn>
        <SectionTitle eyebrow="El lugar" title={EVENT_CONFIG.VENUE_NAME} tone="dark" />
      </FadeIn>

      <FadeIn delay={150}>
        <p className="mt-8 text-[15px] text-cream-light/80 max-w-xs mx-auto leading-relaxed">
          {EVENT_CONFIG.VENUE_ADDRESS}
        </p>
        {EVENT_CONFIG.ARRIVAL_NOTE && (
          <p className="mt-3 text-sm text-cream-light/60 max-w-xs mx-auto leading-relaxed italic">
            {EVENT_CONFIG.ARRIVAL_NOTE}
          </p>
        )}
        <a
          href={EVENT_CONFIG.MAPS_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-8 inline-flex items-center justify-center min-h-[48px] px-8 py-3 rounded-sm bg-gold hover:bg-gold-shimmer text-navy-dark font-semibold text-[11px] uppercase tracking-[0.2em] transition-colors active:scale-[0.98]"
        >
          Cómo llegar
        </a>
      </FadeIn>
    </section>
  );
}
