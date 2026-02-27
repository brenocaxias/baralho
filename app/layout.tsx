import type { Metadata } from "next"; // Importação necessária
import { Cinzel, Cormorant_Garamond } from "next/font/google";
import "./globals.css";

const cinzel = Cinzel({
  subsets: ["latin"],
  variable: "--font-cinzel",
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-cormorant",
  display: "swap",
});

// ADICIONE ISSO AQUI:
export const metadata: Metadata = {
  title: "Oráculo de Ester",
  description: "Consultoria mística e baralho cigano",
  manifest: "/manifest.json",
  themeColor: "#2f384b",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Oráculo de Ester",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br" className={`${cinzel.variable} ${cormorant.variable}`}>
      <body className="antialiased font-body">
        {children}
      </body>
    </html>
  );
}