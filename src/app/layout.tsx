import type { Metadata, Viewport } from "next";
import { Great_Vibes, Playfair_Display, Inter, Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import { EVENT_CONFIG } from "@/config/event";

const greatVibes = Great_Vibes({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-script",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-display",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

/**
 * Dirección pública base: con ella se arma la URL absoluta de la imagen de la vista previa de WhatsApp.
 * Prioridad: NEXT_PUBLIC_SITE_URL (si se define en Vercel) → EVENT_CONFIG.SITE_URL.
 */
const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || EVENT_CONFIG.SITE_URL).replace(/\/+$/, "");

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Los 60 años de Walfre",
  description: "Te invitamos a celebrar los 60 años de Walfre Torres Antolín · 30 de diciembre · Chacaltianguis, Veracruz.",
  robots: {
    index: false,
    follow: false,
  },
  openGraph: {
    title: "Los 60 años de Walfre",
    description: "Te invitamos a celebrar los 60 años de Walfre Torres Antolín · 30 de diciembre · Chacaltianguis, Veracruz.",
    url: "/",
    siteName: "Los 60 años de Walfre",
    locale: "es_MX",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Los 60 años de Walfre",
    description: "Te invitamos a celebrar los 60 años de Walfre Torres Antolín · 30 de diciembre · Chacaltianguis, Veracruz.",
  },
};

export const viewport: Viewport = {
  themeColor: "#0a1224",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es-MX"
      className={`${greatVibes.variable} ${playfair.variable} ${cormorant.variable} ${inter.variable}`}
    >
      <body className="antialiased bg-cream text-navy selection:bg-gold/25 selection:text-navy">
        {children}
      </body>
    </html>
  );
}
