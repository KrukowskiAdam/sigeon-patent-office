import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from '@/context/LanguageContext';

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Sigeon IP - Kancelaria Patentowa",
  description: "Profesjonalna kancelaria patentowa - patenty, znaki towarowe, wzory przemysłowe",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pl">
      <body
        className={`${montserrat.variable} font-sans antialiased`}
      >
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
