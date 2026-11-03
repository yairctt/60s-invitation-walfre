import type { Metadata, Viewport } from "next";
import { Great_Vibes, Playfair_Display, Inter } from "next/font/google";
import "./globals.css";

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

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://mis60walfretorres.com"),
  title: "Los 60 de Walfre",
  description: "Te invitamos a celebrar con nosotros. Confirma tu asistencia.",
  robots: {
    index: false,
    follow: false,
  },
  openGraph: {
    title: "Los 60 de Walfre",
    description: "Te invitamos a celebrar con nosotros. Confirma tu asistencia.",
    url: "https://mis60walfretorres.com",
    siteName: "Los 60 de Walfre",
    locale: "es_MX",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Los 60 de Walfre",
    description: "Te invitamos a celebrar con nosotros. Confirma tu asistencia.",
  },
};

export const viewport: Viewport = {
  themeColor: "#f8f3e8",
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
      className={`${greatVibes.variable} ${playfair.variable} ${inter.variable}`}
    >
      <body className="antialiased bg-cream text-navy selection:bg-gold/25 selection:text-navy">
        {children}
      </body>
    </html>
  );
}
