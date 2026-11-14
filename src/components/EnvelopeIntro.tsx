"use client";

import { useState, useEffect, useRef } from "react";
import { EVENT_CONFIG } from "@/config/event";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  rotation: number;
  rotationSpeed: number;
  wobble: number;
  wobbleSpeed: number;
  shape: "rect" | "circle";
  opacity: number;
}

// Vértice de la solapa, en % del alto del sobre
const APEX_Y = 55;

export default function EnvelopeIntro() {
  const [isOpening, setIsOpening] = useState(false);
  const [isOpened, setIsOpened] = useState(false);
  const [isDestroyed, setIsDestroyed] = useState(false);
  const [flapBehind, setFlapBehind] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Comprobar si el usuario prefiere movimiento reducido
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (motionQuery.matches) {
      setPrefersReducedMotion(true);
    }
  }, []);

  const triggerConfetti = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const colors = ["#ffd700", "#f5df93", "#c9a227", "#fff8e7", "#ffffff", "#f3de8a", "#d4a320", "#e6c65a"];
    const count = 150;
    const originX = window.innerWidth / 2;
    const originY = window.innerHeight / 2 - 10;

    const particles: Particle[] = [];
    for (let i = 0; i < count; i++) {
      // Ángulo en abanico ascendente y radial festivo
      const angle = -Math.PI / 2 + (Math.random() - 0.5) * (Math.PI * 1.4);
      const speed = Math.random() * 15 + 7;
      particles.push({
        x: originX + (Math.random() - 0.5) * 30,
        y: originY + (Math.random() - 0.5) * 20,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 2,
        size: Math.random() * 6 + 5,
        color: colors[Math.floor(Math.random() * colors.length)],
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.25,
        wobble: Math.random() * Math.PI * 2,
        wobbleSpeed: Math.random() * 0.12 + 0.06,
        shape: Math.random() > 0.35 ? "rect" : "circle",
        opacity: 1,
      });
    }

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      let alive = false;

      particles.forEach((p) => {
        if (p.opacity <= 0) return;
        alive = true;

        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.34; // Gravedad suave
        p.vx *= 0.985;
        p.vy *= 0.985;
        p.rotation += p.rotationSpeed;
        p.wobble += p.wobbleSpeed;
        p.opacity -= 0.007;

        ctx.save();
        ctx.globalAlpha = Math.max(0, p.opacity);
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);
        ctx.scale(Math.cos(p.wobble), 1); // Efecto 3D de volteo de confeti
        ctx.fillStyle = p.color;

        if (p.shape === "circle") {
          ctx.beginPath();
          ctx.arc(0, 0, p.size / 2, 0, Math.PI * 2);
          ctx.fill();
        } else {
          ctx.fillRect(-p.size / 2, -p.size, p.size, p.size * 1.8);
        }
        ctx.restore();
      });

      if (alive) {
        requestAnimationFrame(render);
      }
    };

    requestAnimationFrame(render);
  };

  const handleOpen = () => {
    if (isOpening || isOpened) return;

    // Avisa a la música (si está configurada); se dispara dentro del gesto del usuario
    window.dispatchEvent(new Event("invitation:opened"));

    if (prefersReducedMotion) {
      setIsOpened(true);
      setIsDestroyed(true);
      return;
    }

    setIsOpening(true);

    // Confeti cuando la carta ya está saliendo
    setTimeout(triggerConfetti, 700);

    // La solapa pasa por detrás de la carta cuando está de canto
    setTimeout(() => setFlapBehind(true), 380);
    setTimeout(() => setIsOpened(true), 2400);
    setTimeout(() => setIsDestroyed(true), 3400);
  };

  if (isDestroyed) {
    return null;
  }

  return (
    <>
      {/* Canvas para la lluvia de confeti festiva */}
      <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-[60]" aria-hidden="true" />

      <div
        className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-opacity duration-1000 select-none ${
          isOpened ? "opacity-0 pointer-events-none" : "opacity-100"
        }`}
        style={{
          backgroundColor: "#0a1224",
          backgroundImage: "radial-gradient(70% 50% at 50% 42%, rgba(31,49,88,0.75) 0%, rgba(10,18,36,0) 100%)",
        }}
      >
        <div className="flex flex-col items-center w-full max-w-[380px]">
          {/* Encabezado */}
          <div
            className={`text-center mb-10 transition-all duration-500 ${
              isOpening ? "opacity-0 -translate-y-3" : "opacity-100 translate-y-0"
            }`}
          >
            <p className="text-[11px] uppercase tracking-[0.4em] text-gold-shimmer font-medium">Estás invitado</p>
            <p className="mt-2 font-display italic text-[22px] text-cream-light/90">a celebrar los 60 años de Walfre</p>
          </div>

          {/* Sobre */}
          <div className={!isOpening ? "animate-float motion-reduce:animate-none" : ""}>
            <div
              onClick={handleOpen}
              className="relative w-[min(340px,86vw)] aspect-[3/2] cursor-pointer group"
              style={{ perspective: "1100px" }}
              role="button"
              tabIndex={0}
              aria-label="Abrir sobre de invitación"
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  handleOpen();
                }
              }}
            >
              {/* Sombra proyectada */}
              <div className="absolute inset-x-4 -bottom-5 h-8 bg-black/50 blur-xl rounded-full" />

              {/* Interior del sobre */}
              <div className="absolute inset-0 rounded-md bg-gradient-to-b from-[#d9c9a6] to-[#c9b78f] shadow-[0_18px_40px_rgba(0,0,0,0.45)]" />

              {/* Carta: queda oculta tras el bolsillo hasta que se abre */}
              <div
                className="absolute inset-x-[5%] bottom-[5%] h-[88%] z-[2] rounded-[3px] bg-[#fffdf8] shadow-[0_2px_10px_rgba(0,0,0,0.25)] flex flex-col items-center justify-start text-center px-4 pt-7 transition-transform duration-[1400ms] ease-[cubic-bezier(0.22,1,0.36,1)]"
                style={{
                  transform: isOpening ? "translateY(-84%) scale(1.04)" : "translateY(0) scale(1)",
                  transitionDelay: isOpening ? "550ms" : "0ms",
                }}
              >
                <div className="absolute inset-2 border border-gold/40 rounded-[2px] pointer-events-none" />
                <p className="text-[9px] uppercase tracking-[0.35em] text-gold-dark font-semibold">Celebremos juntos</p>
                <p className="mt-2 font-display text-[26px] leading-[1.05] font-semibold text-navy">
                  Walfre Torres
                  <span className="block font-medium text-[22px]">Antolín</span>
                </p>
                <p className="mt-1.5 font-script text-[30px] leading-none text-gold-dark">Mis 60 Años</p>
                <div className="w-8 h-px bg-gold mt-3" />
                <p className="mt-2.5 text-[11px] text-navy/70 tracking-wide">
                  30 de diciembre · {EVENT_CONFIG.START_TIME_LABEL}
                </p>
              </div>

              {/* Bolsillo frontal: tres paños que cubren todo salvo la solapa */}
              <div
                className="absolute inset-0 z-[3] pointer-events-none"
                style={{ filter: "drop-shadow(0 -1px 2px rgba(60,40,0,0.18))" }}
              >
                <div
                  className="absolute inset-0 rounded-md"
                  style={{
                    clipPath: `polygon(0 0, 50% ${APEX_Y}%, 0 100%)`,
                    background: "linear-gradient(100deg, #f4ecda 0%, #e9dec4 100%)",
                  }}
                />
                <div
                  className="absolute inset-0 rounded-md"
                  style={{
                    clipPath: `polygon(100% 0, 50% ${APEX_Y}%, 100% 100%)`,
                    background: "linear-gradient(260deg, #f1e8d3 0%, #e6dabd 100%)",
                  }}
                />
                <div
                  className="absolute inset-0 rounded-md"
                  style={{
                    clipPath: `polygon(0 100%, 50% ${APEX_Y}%, 100% 100%)`,
                    background: "linear-gradient(0deg, #e2d5b8 0%, #f6efdf 100%)",
                  }}
                />
                {/* Líneas de plegado doradas */}
                <svg
                  className="absolute inset-0 w-full h-full"
                  viewBox="0 0 100 100"
                  preserveAspectRatio="none"
                  aria-hidden="true"
                >
                  {[
                    [0, 0],
                    [100, 0],
                    [0, 100],
                    [100, 100],
                  ].map(([x, y], i) => (
                    <line
                      key={i}
                      x1={x}
                      y1={y}
                      x2={50}
                      y2={APEX_Y}
                      stroke="#c9a227"
                      strokeOpacity="0.4"
                      strokeWidth="1"
                      vectorEffect="non-scaling-stroke"
                    />
                  ))}
                </svg>
              </div>

              {/* Solapa superior */}
              <div
                className="absolute inset-x-0 top-0 origin-top transition-transform duration-700 ease-in-out"
                style={{
                  height: `${APEX_Y}%`,
                  zIndex: flapBehind ? 1 : 4,
                  transform: isOpening ? "rotateX(180deg)" : "rotateX(0deg)",
                  filter: "drop-shadow(0 3px 3px rgba(60,40,0,0.25))",
                }}
              >
                <div
                  className="w-full h-full"
                  style={{
                    clipPath: "polygon(0 0, 100% 0, 50% 100%)",
                    background: isOpening
                      ? "linear-gradient(180deg, #cdbb92 0%, #b9a679 100%)"
                      : "linear-gradient(180deg, #fbf6ea 0%, #e3d6b8 100%)",
                  }}
                />
              </div>

              {/* Sello de cera */}
              <div
                className={`absolute left-1/2 z-[5] -translate-x-1/2 -translate-y-1/2 transition-all duration-500 ${
                  isOpening ? "opacity-0 scale-50 rotate-12 pointer-events-none" : "opacity-100 scale-100"
                }`}
                style={{ top: `${APEX_Y}%` }}
              >
                <div className="relative w-[54px] h-[54px]">
                  <span
                    className="absolute inset-0 rounded-full border border-gold-shimmer/70 animate-ping [animation-duration:2.6s] motion-reduce:hidden"
                    aria-hidden="true"
                  />
                  <div
                    className="relative w-full h-full flex items-center justify-center shadow-[0_4px_10px_rgba(0,0,0,0.4),inset_0_2px_3px_rgba(255,255,255,0.35),inset_0_-3px_5px_rgba(80,55,0,0.45)] transition-transform group-hover:scale-105"
                    style={{
                      borderRadius: "52% 48% 50% 50% / 50% 52% 48% 50%",
                      background: "radial-gradient(circle at 35% 30%, #f6df8a 0%, #c9a227 55%, #8a6a12 100%)",
                    }}
                  >
                    <div className="absolute inset-[5px] rounded-full border border-[#7a5a07]/40" />
                    <span className="font-script text-[30px] leading-none text-[#5a4208] drop-shadow-[0_1px_0_rgba(255,235,160,0.6)] pr-0.5">
                      W
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Indicación */}
          <button
            onClick={handleOpen}
            className={`mt-12 text-[11px] uppercase tracking-[0.3em] text-cream-light/80 hover:text-gold-shimmer font-medium transition-all py-3 px-6 rounded-full border border-gold/30 hover:border-gold/60 active:scale-95 ${
              isOpening ? "opacity-0 pointer-events-none" : "opacity-100"
            }`}
          >
            Toca para abrir
          </button>
        </div>
      </div>
    </>
  );
}
