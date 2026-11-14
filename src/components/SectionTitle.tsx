import Ornament from "./Ornament";

interface SectionTitleProps {
  eyebrow: string;
  title: string;
  tone?: "light" | "dark";
  className?: string;
}

/** Encabezado de sección: sobretítulo discreto, título y un filete. */
export default function SectionTitle({ eyebrow, title, tone = "light", className = "" }: SectionTitleProps) {
  const dark = tone === "dark";
  return (
    <header className={`text-center ${className}`}>
      <p className={`text-[11px] uppercase tracking-[0.3em] font-medium ${dark ? "text-gold-shimmer" : "text-gold-dark"}`}>
        {eyebrow}
      </p>
      <h2
        className={`mt-3 font-display text-[34px] leading-[1.08] font-medium ${
          dark ? "text-cream-light" : "text-navy"
        }`}
      >
        {title}
      </h2>
      <Ornament className="mt-5" />
    </header>
  );
}
