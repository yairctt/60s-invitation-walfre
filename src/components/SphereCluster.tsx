"use client";

interface SphereClusterProps {
  className?: string;
  variant?: "top-left" | "top-right" | "card-corner-right" | "card-corner-left";
  scale?: number;
}

/**
 * Racimo de esferas decorativas en azul marino, dorado y blanco nacarado.
 * Creadas con gradientes radiales SVG ultraligeros que emulan el estilo de las esferas del pastel.
 */
export default function SphereCluster({
  className = "",
  variant = "top-right",
}: SphereClusterProps) {
  const isRight = variant.includes("right");

  return (
    <div
      className={`pointer-events-none select-none ${className}`}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 140 140"
        className="w-24 h-24 sm:w-32 sm:h-32 drop-shadow-md"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ transform: isRight ? "none" : "scaleX(-1)" }}
      >
        <defs>
          {/* Gradiente 3D para esferas doradas reflectantes */}
          <radialGradient
            id="goldSphereGrad"
            cx="32%"
            cy="28%"
            r="68%"
            fx="28%"
            fy="24%"
          >
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
            <stop offset="18%" stopColor="#faeec2" />
            <stop offset="48%" stopColor="#e6c65a" />
            <stop offset="75%" stopColor="#c9a227" />
            <stop offset="100%" stopColor="#684f09" />
          </radialGradient>

          {/* Gradiente 3D para esferas azul marino profundo */}
          <radialGradient
            id="navySphereGrad"
            cx="32%"
            cy="28%"
            r="68%"
            fx="28%"
            fy="24%"
          >
            <stop offset="0%" stopColor="#7594d1" stopOpacity="0.85" />
            <stop offset="22%" stopColor="#2c457d" />
            <stop offset="65%" stopColor="#14213d" />
            <stop offset="100%" stopColor="#080e1b" />
          </radialGradient>

          {/* Gradiente 3D para perlas blancas */}
          <radialGradient
            id="whiteSphereGrad"
            cx="32%"
            cy="28%"
            r="68%"
            fx="28%"
            fy="24%"
          >
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="40%" stopColor="#fdfcf8" />
            <stop offset="75%" stopColor="#ded7c6" />
            <stop offset="100%" stopColor="#b3a993" />
          </radialGradient>

          {/* Filtro de sombra suave para esferas */}
          <filter id="sphereShadow" x="-20%" y="-20%" width="150%" height="150%">
            <feDropShadow dx="2" dy="3" stdDeviation="3" floodOpacity="0.25" />
          </filter>
        </defs>

        <g filter="url(#sphereShadow)">
          {/* Esfera Azul Marino Grande (Fondo del racimo) */}
          <circle cx="82" cy="72" r="26" fill="url(#navySphereGrad)" />

          {/* Esfera Dorada Principal Mediana */}
          <circle cx="50" cy="50" r="22" fill="url(#goldSphereGrad)" />

          {/* Esfera Blanca Nacarada Superior */}
          <circle cx="86" cy="36" r="16" fill="url(#whiteSphereGrad)" />

          {/* Esfera Dorada Pequeña en racimo */}
          <circle cx="42" cy="85" r="15" fill="url(#goldSphereGrad)" />

          {/* Esfera Azul Marino Pequeña Frontal */}
          <circle cx="68" cy="98" r="17" fill="url(#navySphereGrad)" />

          {/* Esfera Blanca Pequeña Acento */}
          <circle cx="106" cy="62" r="13" fill="url(#whiteSphereGrad)" />

          {/* Miniesfera Dorada de Brillo */}
          <circle cx="98" cy="88" r="9" fill="url(#goldSphereGrad)" />
        </g>
      </svg>
    </div>
  );
}

