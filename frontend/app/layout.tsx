import type { Metadata } from "next";
import { Crimson_Text, Aclonica } from "next/font/google";
import "./globals.css";

const crimsonText = Crimson_Text({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-crimson",
});

const aclonica = Aclonica({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-aclonica",
});

export const metadata: Metadata = {
  title: "Zilla University - Gestão de Presença",
  description: "Sistema de frequência para aulas laboratoriais - EngNet",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${crimsonText.variable} ${aclonica.variable}`}
    >
      <body className="antialiased min-h-screen">{children}</body>
    </html>
  );
}
