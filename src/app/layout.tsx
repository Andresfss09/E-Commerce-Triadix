import { Plus_Jakarta_Sans, Playfair_Display, Caveat } from "next/font/google";
import "./globals.css";

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

const playfair = Playfair_Display({
  variable: "--font-serif",
  subsets: ["latin"],
  style: ["normal", "italic"],
});

const caveat = Caveat({
  variable: "--font-cursive",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    template: '%s | TRIADIX',
    default: 'TRIADIX | Ropa Urbana en Cali, Colombia',
  },
  description: 'Descubre nuestra nueva colección de ropa urbana diseñada en Cali, Colombia. Calidad premium y envíos a todo el país. Estilo diseñado para tu día a día.',
  keywords: ['ropa urbana', 'streetwear', 'cali colombia', 'cali', 'camisetas oversize', 'buzos', 'triadix'],
  authors: [{ name: 'TRIADIX' }],
  creator: 'TRIADIX',
  openGraph: {
    type: 'website',
    locale: 'es_CO',
    url: 'https://triadix.co',
    title: 'TRIADIX | Ropa Urbana en Cali, Colombia',
    description: 'Estilo urbano y de calidad desde Cali, Colombia. Envíos a todo el país.',
    siteName: 'TRIADIX',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${plusJakarta.variable} ${playfair.variable} ${caveat.variable} h-full antialiased dark`}
    >
      <body className="min-h-full flex flex-col font-sans">{children}</body>
    </html>
  );
}
