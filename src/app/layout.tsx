import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Código do Toque — Por Que Alguns Homens São Inesquecíveis",
  description:
    "Descubra os princípios que despertam conexão, criam impacto emocional e fazem sua presença ser lembrada. Método desenvolvido por terapeuta tântrica com 6 anos de experiência.",
  icons: {
    icon: "/logo.svg",
    type: "image/svg+xml",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body
        className={`${cormorant.variable} ${inter.variable} antialiased intro-loading`}
        style={{ background: "#050505", color: "#fff" }}
      >
        {children}
      </body>
    </html>
  );
}
