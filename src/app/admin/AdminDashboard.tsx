"use client";

import { useState } from "react";
import { RsvpRecord } from "@/types/rsvp";
import { Download, Users, CalendarCheck, Search } from "lucide-react";

interface AdminDashboardProps {
  records: RsvpRecord[];
  adminKey: string;
}

export default function AdminDashboard({ records }: AdminDashboardProps) {
  const [searchTerm, setSearchTerm] = useState("");

  const totalGuests = records.reduce((acc, curr) => acc + (Number(curr.guestsCount) || 0), 0);
  const totalRsvps = records.length;

  const filteredRecords = records.filter(
    (r) =>
      r.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (r.phone && r.phone.includes(searchTerm)) ||
      (r.message && r.message.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleExportCsv = () => {
    // Generación de CSV con BOM UTF-8 para apertura correcta de acentos y eñes en Excel
    const headers = ["ID", "Nombre Completo", "Asistentes", "Teléfono", "Mensaje", "Fecha de Registro"];
    const rows = records.map((r) => [
      `"${r.id || ""}"`,
      `"${(r.fullName || "").replace(/"/g, '""')}"`,
      r.guestsCount || 1,
      `"${(r.phone || "").replace(/"/g, '""')}"`,
      `"${(r.message || "").replace(/"/g, '""')}"`,
      `"${r.createdAt || ""}"`,
    ]);

    const csvContent = "\uFEFF" + [headers.join(","), ...rows.map((row) => row.join(","))].join("\r\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute(
      "download",
      `confirmaciones-walfre-60-${new Date().toISOString().slice(0, 10)}.csv`
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">
      {/* Tarjetas de Estadísticas */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="bg-white border border-gold/40 rounded-3xl p-5 flex items-center justify-between shadow-cake-card">
          <div>
            <p className="text-sm font-semibold text-navy/70">Total de Asistentes</p>
            <p className="text-3xl font-serif font-bold text-navy mt-1">{totalGuests}</p>
          </div>
          <div className="p-3 bg-cream rounded-2xl text-navy">
            <Users className="w-6 h-6 text-gold-dark" />
          </div>
        </div>

        <div className="bg-white border border-gold/40 rounded-3xl p-5 flex items-center justify-between shadow-cake-card">
          <div>
            <p className="text-sm font-semibold text-navy/70">Total de Registros</p>
            <p className="text-3xl font-serif font-bold text-navy mt-1">{totalRsvps}</p>
          </div>
          <div className="p-3 bg-cream rounded-2xl text-navy">
            <CalendarCheck className="w-6 h-6 text-gold-dark" />
          </div>
        </div>
      </div>

      {/* Barra de Acciones y Búsqueda */}
      <div className="bg-white border border-gold/40 rounded-3xl p-4 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 shadow-cake-card">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-navy/40 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Buscar por nombre, teléfono o mensaje..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-cream-light/60 border border-gold/30 rounded-xl pl-9 pr-4 py-2.5 text-sm text-navy placeholder-navy/40 focus:outline-none focus:border-navy transition-colors"
          />
        </div>

        <button
          onClick={handleExportCsv}
          disabled={records.length === 0}
          className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-full bg-navy hover:bg-navy-hover active:bg-navy-dark text-white font-bold text-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-sm border border-gold/30"
        >
          <Download className="w-4 h-4 text-gold-shimmer" />
          Exportar CSV
        </button>
      </div>

      {/* Lista / Tabla de Confirmaciones */}
      <div className="bg-white border border-gold/40 rounded-3xl overflow-hidden shadow-cake-card">
        {filteredRecords.length === 0 ? (
          <div className="p-12 text-center text-navy/60 font-medium">
            {records.length === 0 ? (
              <p>Aún no hay confirmaciones registradas.</p>
            ) : (
              <p>No se encontraron registros que coincidan con la búsqueda.</p>
            )}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-cream border-b border-gold/30 text-navy/70 uppercase text-xs tracking-wider">
                <tr>
                  <th className="px-5 py-3 font-semibold">Nombre</th>
                  <th className="px-5 py-3 font-semibold text-center">Asistentes</th>
                  <th className="px-5 py-3 font-semibold">Teléfono</th>
                  <th className="px-5 py-3 font-semibold">Mensaje</th>
                  <th className="px-5 py-3 font-semibold">Fecha</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-cream-dark/60">
                {filteredRecords.map((r) => {
                  const dateStr = r.createdAt
                    ? new Date(r.createdAt).toLocaleDateString("es-MX", {
                        day: "2-digit",
                        month: "short",
                        hour: "2-digit",
                        minute: "2-digit",
                      })
                    : "-";

                  return (
                    <tr key={r.id} className="hover:bg-cream/40 transition-colors">
                      <td className="px-5 py-4 font-semibold text-navy whitespace-nowrap">
                        {r.fullName}
                      </td>
                      <td className="px-5 py-4 text-center">
                        <span className="inline-flex items-center justify-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-cream text-navy border border-gold/40">
                          {r.guestsCount}
                        </span>
                      </td>
                      <td className="px-5 py-4 text-navy/80 whitespace-nowrap font-medium">
                        {r.phone || <span className="text-navy/30">—</span>}
                      </td>
                      <td className="px-5 py-4 text-navy/80 max-w-xs break-words">
                        {r.message || <span className="text-navy/30">—</span>}
                      </td>
                      <td className="px-5 py-4 text-navy/60 text-xs whitespace-nowrap">
                        {dateStr}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
