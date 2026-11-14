/** Filete dorado corto y sobrio. Decorativo (aria-hidden). */
export default function Ornament({ className = "" }: { className?: string; tone?: "light" | "dark" }) {
  return <div className={`w-10 h-px bg-gold mx-auto ${className}`} aria-hidden="true" />;
}
