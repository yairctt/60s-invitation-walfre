"use client";

import { EVENT_CONFIG } from "@/config/event";
import FadeIn from "./FadeIn";
import SectionTitle from "./SectionTitle";

export default function Homenaje() {
  return (
    <section id="homenaje" className="px-8 py-20 text-center">
      <FadeIn>
        <SectionTitle eyebrow="Con cariño" title="Un homenaje de su familia" />
      </FadeIn>

      <FadeIn delay={150}>
        <p className="mt-10 mx-auto max-w-[330px] font-display italic text-[22px] leading-[1.5] text-navy/90">
          {EVENT_CONFIG.FAMILY_MESSAGE}
        </p>
        <p className="mt-8 text-[11px] uppercase tracking-[0.3em] text-gold-dark font-medium">Familia Torres Acuca</p>
      </FadeIn>
    </section>
  );
}
