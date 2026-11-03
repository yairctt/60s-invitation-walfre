import Hero from "@/components/Hero";
import Homenaje from "@/components/Homenaje";
import RsvpForm from "@/components/RsvpForm";
import LocationCard from "@/components/LocationCard";
import SprinklesBand from "@/components/SprinklesBand";
import EnvelopeIntro from "@/components/EnvelopeIntro";
import { EVENT_CONFIG } from "@/config/event";
import { MessageCircle } from "lucide-react";

export default function HomePage() {
  const whatsappUrl = EVENT_CONFIG.WHATSAPP_NUMBER
    ? `https://wa.me/${EVENT_CONFIG.WHATSAPP_NUMBER.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(
        `¡Hola! Quiero confirmar mi asistencia para la fiesta de 60 años de ${EVENT_CONFIG.HONOREE_NAME}.`
      )}`
    : "";

  return (
    /* Fondo neutral para pantalla de PC: En monitores no se expande y centra la columna limpiamente */
    <div className="min-h-screen w-full bg-[#181a20] sm:py-6 sm:px-4 flex items-center justify-center">
      {/* Animación inicial interactiva: Sobre formal con sello de cera que se abre */}
      <EnvelopeIntro />

      {/* 
        Contenedor central: En PC no se expande horizontalmente (máximo 460px), 
        con sombra suave y sin bordes artificiales de celular.
      */}
      <div className="w-full max-w-[460px] min-h-screen bg-cream text-navy shadow-2xl relative overflow-hidden flex flex-col justify-between">
        <main className="w-full">
          {/* 1. Hero: Foto de fondo con degradado cinematográfico, tipografía sobre la foto y cuenta regresiva */}
          <Hero />

          {/* Separador sutil de línea dorada */}
          <SprinklesBand />

          {/* 2. Homenaje: Mensaje de la familia */}
          <Homenaje />

          {/* Separador sutil de línea dorada */}
          <SprinklesBand />

          {/* 3. RSVP: Formulario de confirmación */}
          <RsvpForm />

          {/* Separador sutil de línea dorada */}
          <SprinklesBand />

          {/* 4. Ubicación: Salón Las Regaderas, Maps y Waze */}
          <LocationCard />
        </main>

        {/* Pie de página dentro de la columna */}
        <footer className="w-full py-6 text-center text-xs text-navy/60 border-t border-gold/20 bg-white/70">
          <p className="font-serif tracking-widest uppercase text-navy font-semibold text-[11px]">
            {EVENT_CONFIG.HONOREE_NAME} · 60 Años
          </p>
          <p className="mt-0.5 text-[10px] text-navy/60">
            Chacaltianguis, Veracruz · Celebración Familiar
          </p>
        </footer>

        {/* Botón flotante de WhatsApp (si está configurado) */}
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
