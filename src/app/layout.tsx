import type { Metadata } from "next";
import { Fraunces, Outfit } from "next/font/google";
import "./globals.css";
import { BRAND } from "@/lib/constants";

const display = Fraunces({
  variable: "--font-display",
  subsets: ["latin"],
});

const sans = Outfit({
  variable: "--font-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: `${BRAND.name} — Beleza na Praia dos Carneiros`,
    template: `%s · ${BRAND.name}`,
  },
  description:
    "Operação de fim de ano na Praia dos Carneiros: cabelo, rosto e unhas. Reserve com sinal de 30%.",
  metadataBase: new URL(`https://${BRAND.domain}`),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={`${display.variable} ${sans.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
