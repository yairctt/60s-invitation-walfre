import { Metadata } from "next";
import { getRsvpStore } from "@/lib/rsvp-store";
import AdminDashboard from "./AdminDashboard";
import { Lock, ShieldAlert } from "lucide-react";

export const metadata: Metadata = {
  title: "Panel de Administración · Los 60 años de Walfre",
  robots: {
    index: false,
    follow: false,
  },
};

export const dynamic = "force-dynamic";

interface AdminPageProps {
  searchParams: { key?: string };
}

export default async function AdminPage({ searchParams }: AdminPageProps) {
  const adminKey = process.env.ADMIN_KEY;
  const providedKey = searchParams.key;

  const isAuthorized = Boolean(adminKey && providedKey && providedKey === adminKey);

  if (!isAuthorized) {
    return (
      <main className="min-h-screen bg-cream text-navy flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white border border-gold/40 rounded-3xl p-8 text-center space-y-4 shadow-cake-card">
          <div className="w-14 h-14 mx-auto rounded-full bg-red-50 border border-red-300 flex items-center justify-center text-red-600">
            <Lock className="w-6 h-6" />
          </div>
          <h1 className="text-xl font-serif font-bold text-navy">
            Acceso no autorizado
          </h1>
          <p className="text-sm text-navy/70 leading-relaxed">
            Se requiere una clave de acceso válida en la URL para ver este panel (ejemplo:{" "}
            <code className="text-navy font-mono text-xs font-semibold">/admin?key=TU_CLAVE</code>).
          </p>
        </div>
      </main>
    );
  }

  const store = getRsvpStore();
  const records = await store.getAll();

  return (
    <main className="min-h-screen bg-cream text-navy p-4 sm:p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-gold/30 pb-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-gold/40 text-xs font-semibold text-navy mb-2 shadow-xs">
              <ShieldAlert className="w-3.5 h-3.5 text-gold-dark" />
              Panel Confidencial
            </div>
            <h1 className="text-2xl sm:text-3xl font-serif font-bold text-navy">
              Confirmaciones · Los 60 años de Walfre
            </h1>
            <p className="text-sm text-navy/70 mt-1 font-medium">
              Registro y control de asistencia para el evento.
            </p>
          </div>
        </header>

        <AdminDashboard records={records} adminKey={providedKey || ""} />
      </div>
    </main>
  );
}
