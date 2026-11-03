"use client";

interface MonogramProps {
  className?: string;
  size?: "sm" | "md" | "lg";
}

/**
 * Monograma conmemorativo W60 con marco dorado de pastel,
 * detalles metálicos y azul marino profundo.
 */
export default function Monogram({ className = "", size = "md" }: MonogramProps) {
  const sizeClasses = {
    sm: "w-20 h-20 text-2xl",
    md: "w-28 h-28 sm:w-32 sm:h-32 text-3xl sm:text-4xl",
    lg: "w-36 h-36 sm:w-44 sm:h-44 text-4xl sm:text-5xl",
  }[size];

  return (
    <div
      className={`relative flex items-center justify-center select-none ${sizeClasses} ${className}`}
      aria-label="Monograma conmemorativo W60"
    >
      {/* Resplandor cálido de fondo */}
      <div
        className="absolute inset-0 rounded-full bg-gold/20 blur-md pointer-events-none"
        aria-hidden="true"
      />

      {/* SVG Ornamental circular tipo marco de fondant dorado */}
      <svg
        className="absolute inset-0 w-full h-full text-gold drop-shadow-sm"
        viewBox="0 0 160 160"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="goldMetallicGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fdf0b5" />
            <stop offset="40%" stopColor="#e6c65a" />
            <stop offset="70%" stopColor="#c9a227" />
            <stop offset="100%" stopColor="#9d7e1c" />
          </linearGradient>
          <radialGradient id="cakeBgGrad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="100%" stopColor="#f8f3e8" />
          </radialGradient>
        </defs>

        {/* Disco interior crema/marfil */}
        <circle cx="80" cy="80" r="70" fill="url(#cakeBgGrad)" />

        {/* Anillo exterior punteado */}
        <circle
          cx="80"
          cy="80"
          r="74"
          stroke="url(#goldMetallicGrad)"
          strokeWidth="1.5"
          strokeDasharray="4 4"
        />

        {/* Anillo interior sólido */}
        <circle
          cx="80"
          cy="80"
          r="66"
          stroke="url(#goldMetallicGrad)"
          strokeWidth="2"
        />

        {/* Esferas de adorno en los cuatro puntos */}
        <circle cx="80" cy="14" r="3" fill="#14213d" />
        <circle cx="80" cy="146" r="3" fill="#14213d" />
        <circle cx="14" cy="80" r="3" fill="#c9a227" />
        <circle cx="146" cy="80" r="3" fill="#c9a227" />
      </svg>

      {/* Tipografía W60 */}
      <div className="relative z-10 flex items-center justify-center font-serif font-bold tracking-tight">
        <span className="font-script text-[1.25em] bg-gradient-to-br from-gold-shimmer via-gold to-gold-dark bg-clip-text text-transparent drop-shadow-sm pr-0.5">
          W
        </span>
        <span className="text-[0.65em] font-serif font-bold text-navy tracking-tighter">
          60
        </span>
      </div>
    </div>
  );
}
