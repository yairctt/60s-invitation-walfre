"use client";

import { useState, useRef } from "react";
import { EVENT_CONFIG } from "@/config/event";
import { rsvpFormSchema, RsvpFormData } from "@/types/rsvp";
import {
  CheckCircle2,
  AlertCircle,
  Loader2,
  User,
  Users,
  Phone,
  MessageSquare,
  Send,
  MessageCircle,
  Clock,
} from "lucide-react";
import FadeIn from "./FadeIn";

export default function RsvpForm() {
  const [formData, setFormData] = useState<RsvpFormData>({
    fullName: "",
    guestsCount: 1,
    phone: "",
    message: "",
    honeypot: "",
  });

  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const isSubmittingRef = useRef(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "guestsCount" ? Number(value) : value,
    }));

    if (formErrors[name]) {
      setFormErrors((prev) => {
        const updated = { ...prev };
        delete updated[name];
        return updated;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (isSubmittingRef.current || status === "submitting" || status === "success") {
      return;
    }

    setErrorMessage("");
    setFormErrors({});

    const clientValidation = rsvpFormSchema.safeParse(formData);
    if (!clientValidation.success) {
      const fieldErrors: Record<string, string> = {};
      clientValidation.error.errors.forEach((err) => {
        if (err.path[0]) {
          fieldErrors[err.path[0] as string] = err.message;
        }
      });
      setFormErrors(fieldErrors);
      return;
    }

    isSubmittingRef.current = true;
    setStatus("submitting");

    try {
      const response = await fetch("/api/rsvp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        setStatus("error");
        setErrorMessage(
          data.error || "Ocurrió un error al enviar tu confirmación. Intenta de nuevo."
        );
        isSubmittingRef.current = false;
        return;
      }

      setStatus("success");
    } catch {
      setStatus("error");
      setErrorMessage("No se pudo conectar con el servidor. Revisa tu conexión a internet.");
      isSubmittingRef.current = false;
    }
  };

  const whatsappUrl = EVENT_CONFIG.WHATSAPP_NUMBER
    ? `https://wa.me/${EVENT_CONFIG.WHATSAPP_NUMBER.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(
        `¡Hola! Quiero confirmar mi asistencia para la fiesta de 60 años de ${EVENT_CONFIG.HONOREE_NAME}.`
      )}`
    : "";

  return (
    <section id="rsvp" className="relative px-4 py-8 max-w-xl mx-auto scroll-mt-6">
      <FadeIn>
        {/* Tarjeta de Confirmación en azul medianoche profundo con marco dorado */}
        <div className="relative rounded-3xl bg-gradient-to-b from-[#161f36]/95 to-[#101728]/95 border border-gold/30 p-6 sm:p-8 shadow-[0_8px_32px_rgba(0,0,0,0.45)] overflow-hidden">
          {/* Adorno superior dorado brillante */}
          <div
            className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-gold to-transparent"
            aria-hidden="true"
          />

          <div className="text-center space-y-2 mb-8 relative z-10">
            <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.25em] text-gold-shimmer font-semibold">
              Tu Presencia es Importante
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white tracking-wide drop-shadow-md">
              Confirmar Asistencia
            </h2>
            <p className="text-sm sm:text-base text-cream-light/80 max-w-sm mx-auto">
              Por favor confirma antes de acompañarnos para tener todo listo para ti.
            </p>

            {EVENT_CONFIG.RSVP_DEADLINE_LABEL && (
              <div className="inline-flex items-center gap-1.5 px-3 py-1 mt-2 rounded-full bg-gold/15 border border-gold/40 text-xs font-semibold text-gold-shimmer">
                <Clock className="w-3.5 h-3.5 text-gold-shimmer" />
                <span>Fecha límite: {EVENT_CONFIG.RSVP_DEADLINE_LABEL}</span>
              </div>
            )}
          </div>

          {/* Estado de Éxito */}
          {status === "success" ? (
            <div className="py-8 px-4 text-center space-y-4 animate-fadeIn relative z-10">
              <div className="w-16 h-16 mx-auto rounded-full bg-emerald-950/60 border border-emerald-400 flex items-center justify-center text-emerald-400 shadow-inner">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h3 className="text-2xl font-serif font-bold text-white">
                ¡Confirmación Recibida!
              </h3>
              <p className="text-cream-light text-sm sm:text-base leading-relaxed">
                Muchas gracias, <strong className="text-gold-shimmer font-bold">{formData.fullName}</strong>. Hemos
                anotado tu asistencia con <strong className="text-gold-shimmer font-bold">{formData.guestsCount}</strong>{" "}
                {formData.guestsCount === 1 ? "persona" : "personas"}.
              </p>
              <p className="text-xs text-cream-light/70 pt-2 font-medium">
                {EVENT_CONFIG.HONOREE_NAME} y su familia se alegrarán mucho de verte.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate className="space-y-5 relative z-10">
              {/* Campo Honeypot invisible */}
              <div className="hidden" aria-hidden="true">
                <label htmlFor="rsvp_fax_code">No llenar este campo:</label>
                <input
                  id="rsvp_fax_code"
                  type="text"
                  name="honeypot"
                  tabIndex={-1}
                  autoComplete="off"
                  value={formData.honeypot}
                  onChange={handleChange}
                />
              </div>

              {/* Mensaje de error */}
              {status === "error" && errorMessage && (
                <div
                  className="p-3.5 rounded-xl bg-red-950/80 border border-red-500 text-red-200 text-sm flex items-start gap-2.5"
                  role="alert"
                >
                  <AlertCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                  <span>{errorMessage}</span>
                </div>
              )}

              {/* Nombre completo */}
              <div>
                <label
                  htmlFor="fullName"
                  className="block text-sm font-semibold text-cream-light mb-1.5"
                >
                  Nombre completo <span className="text-gold-shimmer">*</span>
                </label>
                <div className="relative">
                  <User className="w-5 h-5 text-gold-shimmer/60 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    id="fullName"
                    name="fullName"
                    type="text"
                    required
                    placeholder="Ej. Juan Pérez González"
                    value={formData.fullName}
                    onChange={handleChange}
                    className={`w-full min-h-[48px] bg-[#0c1220]/90 border ${
                      formErrors.fullName ? "border-red-500" : "border-gold/25 focus:border-gold"
                    } rounded-xl pl-11 pr-4 py-3 text-base text-white placeholder-cream-light/40 focus:outline-none focus:ring-1 focus:ring-gold/50 transition-colors shadow-inner`}
                  />
                </div>
                {formErrors.fullName && (
                  <p className="mt-1 text-xs text-red-400 font-medium">{formErrors.fullName}</p>
                )}
              </div>

              {/* Número de asistentes */}
              <div>
                <label
                  htmlFor="guestsCount"
                  className="block text-sm font-semibold text-cream-light mb-1.5"
                >
                  Número de asistentes <span className="text-gold-shimmer">*</span>
                </label>
                <div className="relative">
                  <Users className="w-5 h-5 text-gold-shimmer/60 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <select
                    id="guestsCount"
                    name="guestsCount"
                    value={formData.guestsCount}
                    onChange={handleChange}
                    className={`w-full min-h-[48px] bg-[#0c1220]/90 border ${
                      formErrors.guestsCount ? "border-red-500" : "border-gold/25 focus:border-gold"
                    } rounded-xl pl-11 pr-4 py-3 text-base text-white focus:outline-none focus:ring-1 focus:ring-gold/50 transition-colors appearance-none shadow-inner`}
                  >
                    {Array.from(
                      { length: EVENT_CONFIG.MAX_GUESTS_PER_RSVP },
                      (_, i) => i + 1
                    ).map((num) => (
                      <option key={num} value={num} className="bg-[#0c1220] text-white">
                        {num} {num === 1 ? "persona (Solo yo)" : `personas en mi grupo`}
                      </option>
                    ))}
                  </select>
                </div>
                {formErrors.guestsCount && (
                  <p className="mt-1 text-xs text-red-400 font-medium">{formErrors.guestsCount}</p>
                )}
              </div>

              {/* Teléfono opcional */}
              <div>
                <label htmlFor="phone" className="block text-sm font-semibold text-cream-light mb-1.5">
                  Teléfono de contacto <span className="text-cream-light/50 text-xs font-normal">(opcional)</span>
                </label>
                <div className="relative">
                  <Phone className="w-5 h-5 text-gold-shimmer/60 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    placeholder="10 dígitos (Ej. 288 123 4567)"
                    value={formData.phone}
                    onChange={handleChange}
                    className={`w-full min-h-[48px] bg-[#0c1220]/90 border ${
                      formErrors.phone ? "border-red-500" : "border-gold/25 focus:border-gold"
                    } rounded-xl pl-11 pr-4 py-3 text-base text-white placeholder-cream-light/40 focus:outline-none focus:ring-1 focus:ring-gold/50 transition-colors shadow-inner`}
                  />
                </div>
                {formErrors.phone && <p className="mt-1 text-xs text-red-400 font-medium">{formErrors.phone}</p>}
              </div>

              {/* Mensaje opcional */}
              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-semibold text-cream-light mb-1.5"
                >
                  Mensaje para Walfre{" "}
                  <span className="text-cream-light/50 text-xs font-normal">(opcional)</span>
                </label>
                <div className="relative">
                  <MessageSquare className="w-5 h-5 text-gold-shimmer/60 absolute left-3.5 top-3.5 pointer-events-none" />
                  <textarea
                    id="message"
                    name="message"
                    rows={3}
                    placeholder="Escríbele unas palabras o un deseo con cariño..."
                    value={formData.message}
                    onChange={handleChange}
                    className={`w-full bg-[#0c1220]/90 border ${
                      formErrors.message ? "border-red-500" : "border-gold/25 focus:border-gold"
                    } rounded-xl pl-11 pr-4 py-3 text-base text-white placeholder-cream-light/40 focus:outline-none focus:ring-1 focus:ring-gold/50 transition-colors resize-none shadow-inner`}
                  />
                </div>
                {formErrors.message && (
                  <p className="mt-1 text-xs text-red-400 font-medium">{formErrors.message}</p>
                )}
              </div>

              {/* Botón de Enviar en Dorado Festivo homogéneo con el Hero */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={status === "submitting"}
                  className="w-full min-h-[48px] px-6 py-3.5 rounded-full bg-gold hover:bg-gold-shimmer active:bg-gold-dark text-navy font-bold text-sm uppercase tracking-wider transition-all shadow-lg hover:shadow-gold/20 flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {status === "submitting" ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin text-navy" />
                      <span>Registrando asistencia...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4 text-navy" />
                      <span>Enviar confirmación</span>
                    </>
                  )}
                </button>
              </div>

              {/* Confirmación WhatsApp opcional */}
              {whatsappUrl && (
                <div className="pt-3 border-t border-gold/20 text-center">
                  <p className="text-xs text-cream-light/70 mb-2 font-medium">O si lo prefieres:</p>
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 w-full min-h-[48px] px-4 py-3 rounded-full bg-[#25D366] hover:bg-[#1eb855] text-white font-semibold text-sm transition-colors shadow-sm"
                  >
                    <MessageCircle className="w-5 h-5" />
                    <span>Confirmar por WhatsApp</span>
                  </a>
                </div>
              )}
            </form>
          )}
        </div>
      </FadeIn>
    </section>
  );
}
