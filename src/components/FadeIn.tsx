"use client";

import { useEffect, useRef, useState, ReactNode } from "react";

interface FadeInProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  /** Tipo de entrada: desliza hacia arriba (por defecto), solo desvanece o escala suavemente. */
  variant?: "up" | "fade" | "scale";
}

/**
 * Componente para animaciones de entrada progresiva con IntersectionObserver.
 * Respeta la preferencia del sistema 'prefers-reduced-motion'.
 */
export default function FadeIn({ children, className = "", delay = 0, variant = "up" }: FadeInProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Detección de preferencia de movimiento reducido
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (motionQuery.matches) {
      setPrefersReducedMotion(true);
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (elementRef.current) {
            observer.unobserve(elementRef.current);
          }
        }
      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -40px 0px",
      }
    );

    const currentEl = elementRef.current;
    if (currentEl) {
      observer.observe(currentEl);
    }

    return () => {
      if (currentEl) {
        observer.unobserve(currentEl);
      }
    };
  }, []);

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <div
      ref={elementRef}
      style={{
        transitionDelay: `${delay}ms`,
      }}
      className={`transition-all duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)] transform ${
        isVisible
          ? "opacity-100 translate-y-0 scale-100"
          : `opacity-0 pointer-events-none ${
              variant === "up" ? "translate-y-8" : variant === "scale" ? "scale-95" : ""
            }`
      } ${className}`}
    >
      {children}
    </div>
  );
}

