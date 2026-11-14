import Image from "next/image";

/**
 * Franja con el atardecer sobre el río, tomada de la misma fotografía.
 * La imagen se amplía y se ancla a la izquierda para mostrar el sol y el horizonte,
 * dejando fuera a la persona y el poste (que quedan a la derecha de la foto).
 * Todo se expresa en porcentajes del ancho, así el encuadre se mantiene en cualquier pantalla.
 */
export default function PhotoBand({ className = "" }: { className?: string }) {
  return (
    <div className={`relative w-full aspect-[46/17] overflow-hidden bg-[#101626] ${className}`} aria-hidden="true">
      <Image
        src="/hero.jpg"
        alt=""
        width={1080}
        height={1440}
        sizes="(max-width: 460px) 154vw, 710px"
        className="absolute left-0 max-w-none h-auto"
        style={{ width: "154%", top: "-185%" }}
      />
    </div>
  );
}
