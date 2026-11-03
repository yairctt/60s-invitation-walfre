"use client";

/**
 * Luces cálidas tipo guirnalda que adornan la parte superior del Hero.
 * Puntos dorados con resplandor suave y parpadeo accesible.
 */
export default function GarlandLights() {
  const bulbs = [
    { delay: "0s", top: "4px" },
    { delay: "0.4s", top: "14px" },
    { delay: "0.8s", top: "20px" },
    { delay: "0.2s", top: "12px" },
    { delay: "0.9s", top: "5px" },
    { delay: "0.3s", top: "16px" },
    { delay: "0.7s", top: "22px" },
    { delay: "0.1s", top: "15px" },
    { delay: "0.6s", top: "6px" },
    { delay: "1.1s", top: "18px" },
    { delay: "0.5s", top: "22px" },
    { delay: "1.0s", top: "13px" },
    { delay: "0.2s", top: "4px" },
  ];

  return (
    <div
      className="w-full max-w-4xl mx-auto h-12 relative overflow-hidden select-none pointer-events-none"
      aria-hidden="true"
    >
      {/* Hilo conector de la guirnalda */}
      <svg
        className="w-full h-8 absolute top-0 left-0 text-gold/30"
        viewBox="0 0 1000 30"
        preserveAspectRatio="none"
        fill="none"
      >
        <path
          d="M0,5 Q125,28 250,8 Q375,30 500,8 Q625,30 750,8 Q875,30 1000,5"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeDasharray="2 1"
        />
      </svg>

      {/* Focos / bombillas cálidas con resplandor */}
      <div className="w-full h-full flex justify-between items-start px-3 sm:px-8">
        {bulbs.map((bulb, idx) => (
          <div
            key={idx}
            style={{
              marginTop: bulb.top,
              animationDelay: bulb.delay,
            }}
            className="relative flex items-center justify-center animate-light-twinkle motion-reduce:animate-none"
          >
            {/* Casquillo pequeño */}
            <div className="w-1 h-1 bg-navy/60 rounded-t-sm mb-[1px]" />
            {/* Halo de luz dorada */}
            <div className="absolute w-4 h-4 rounded-full bg-gold-shimmer/40 blur-xs" />
            {/* Bombilla cálida */}
            <div className="w-2.5 h-2.5 rounded-full bg-gradient-to-b from-[#fff3cc] via-[#f3de8a] to-[#c9a227] shadow-light-glow" />
          </div>
        ))}
      </div>
    </div>
  );
}

