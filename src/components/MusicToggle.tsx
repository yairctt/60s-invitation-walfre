"use client";

import { useEffect, useRef, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";
import { EVENT_CONFIG } from "@/config/event";

/** Evento que dispara el sobre al abrirse; ocurre dentro del gesto del usuario, lo que permite el autoplay. */
export const INVITATION_OPENED_EVENT = "invitation:opened";

/**
 * Botón de música ambiental. No se renderiza si MUSIC_SRC está vacío.
 * La música inicia al abrir el sobre (gesto del usuario) y siempre se puede silenciar.
 */
export default function MusicToggle() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    if (!EVENT_CONFIG.MUSIC_SRC) return;
    const start = () => {
      const audio = audioRef.current;
      if (!audio) return;
      audio.volume = 0.5;
      audio.play().then(() => setPlaying(true)).catch(() => setPlaying(false));
    };
    window.addEventListener(INVITATION_OPENED_EVENT, start);
    return () => window.removeEventListener(INVITATION_OPENED_EVENT, start);
  }, []);

  // Pausa la música al salir del navegador, cambiar de pestaña o bloquear la pantalla,
  // y la reanuda al volver solo si estaba sonando antes.
  useEffect(() => {
    if (!EVENT_CONFIG.MUSIC_SRC) return;

    let resumeOnReturn = false;

    const pauseIfPlaying = () => {
      const audio = audioRef.current;
      if (audio && !audio.paused) {
        resumeOnReturn = true;
        audio.pause();
      }
    };

    const onVisibility = () => {
      const audio = audioRef.current;
      if (!audio) return;
      if (document.hidden) {
        pauseIfPlaying();
      } else if (resumeOnReturn) {
        resumeOnReturn = false;
        audio.play().then(() => setPlaying(true)).catch(() => setPlaying(false));
      }
    };

    document.addEventListener("visibilitychange", onVisibility);
    window.addEventListener("pagehide", pauseIfPlaying);
    return () => {
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("pagehide", pauseIfPlaying);
    };
  }, []);

  if (!EVENT_CONFIG.MUSIC_SRC) return null;

  const toggle = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (audio.paused) {
      audio.play().then(() => setPlaying(true)).catch(() => setPlaying(false));
    } else {
      audio.pause();
      setPlaying(false);
    }
  };

  return (
    <>
      <audio ref={audioRef} src={EVENT_CONFIG.MUSIC_SRC} loop preload="none" />
      <button
        type="button"
        onClick={toggle}
        aria-label={playing ? "Silenciar música" : "Reproducir música"}
        aria-pressed={playing}
        className="fixed top-5 right-5 sm:right-[calc(50%-230px+1.25rem)] z-40 w-11 h-11 rounded-full bg-navy-dark/80 backdrop-blur-md border border-gold/60 text-gold-shimmer flex items-center justify-center shadow-[0_4px_14px_rgba(0,0,0,0.45)] transition-transform active:scale-90"
      >
        {playing ? <Volume2 className="w-[18px] h-[18px]" /> : <VolumeX className="w-[18px] h-[18px]" />}
      </button>
    </>
  );
}
