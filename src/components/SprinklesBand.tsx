"use client";

/**
 * Separador elegante y sobrio de secciones con línea dorada fina.
 * Sin elementos invasivos ni esferas.
 */
export default function SprinklesBand({ className = "" }: { className?: string }) {
  return (
    <div
      className={`w-full max-w-[360px] mx-auto py-6 px-4 flex items-center justify-center gap-3 select-none pointer-events-none ${className}`}
      aria-hidden="true"
    >
      <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gold/40 to-gold/60" />
      <div className="w-1.5 h-1.5 rotate-45 bg-gold/70" />
      <div className="flex-1 h-px bg-gradient-to-r from-gold/60 via-gold/40 to-transparent" />
    </div>
  );
}
