import Image from "next/image";
import Hero from "@/components/Hero";
import Homenaje from "@/components/Homenaje";
import DateCard from "@/components/DateCard";
import RsvpForm from "@/components/RsvpForm";
import LocationCard from "@/components/LocationCard";
import EnvelopeIntro from "@/components/EnvelopeIntro";
import MusicToggle from "@/components/MusicToggle";
import { EVENT_CONFIG } from "@/config/event";
import { MessageCircle } from "lucide-react";

export default function HomePage() {
  const whatsappUrl = EVENT_CONFIG.WHATSAPP_NUMBER
    ? `https://wa.me/${EVENT_CONFIG.WHATSAPP_NUMBER.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(
        `¡Hola! Quiero confirmar mi asistencia para la fiesta de 60 años de ${EVENT_CONFIG.HONOREE_NAME}.`
      )}`
    : "";

  return (
    <div className="bg-desktop-stage relative min-h-screen w-full sm:py-8 sm:px-4 flex items-start justify-center">
      {/* Escenario de escritorio: la misma fotografía, desenfocada, detrás de la columna */}
      <div className="hidden sm:block fixed inset-0 z-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <Image
          src="/hero.jpg"
          alt=""
          fill
          sizes="100vw"
          loading="lazy"
          className="object-cover scale-110 blur-3xl opacity-30"
        />
      </div>

      <EnvelopeIntro />

      {/* Columna de invitación: en PC se limita a 460px y se centra como una tarjeta */}
      <div className="w-full max-w-[460px] min-h-screen bg-cream text-navy sm:shadow-[0_40px_120px_rgba(0,0,0,0.6)] sm:rounded-sm relative overflow-hidden flex flex-col z-10">
        <MusicToggle />

        <main className="w-full">
          <Hero />
          <Homenaje />
          <DateCard />
          <RsvpForm />
          <LocationCard />
        </main>

        <footer className="bg-navy-dark px-6 py-10 text-center">
          <p className="font-display text-lg tracking-[0.2em] uppercase text-cream-light">
            {EVENT_CONFIG.HONOREE_NAME}
          </p>
          <p className="mt-2 text-[11px] tracking-[0.15em] uppercase text-cream-light/50">
            30 · 12 · 2026<br />Chacaltianguis, Veracruz
          </p>
        </footer>

        {whatsappUrl && (
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Confirmar por WhatsApp"
            className="fixed sm:absolute bottom-5 right-5 z-50 w-12 h-12 rounded-full bg-[#25D366] hover:bg-[#20ba59] text-white flex items-center justify-center shadow-lg transition-transform hover:scale-105 active:scale-95"
          >
            <MessageCircle className="w-6 h-6 fill-white text-white" />
          </a>
        )}
      </div>
    </div>
  );
}
