import type { Metadata } from "next";
import "./globals.css";
import { LanguageProvider } from '@/context/LanguageContext';
import { Nunito_Sans, Work_Sans } from 'next/font/google';
import { getHomepage } from '@/lib/queries';

const nunitoSans = Nunito_Sans({
  subsets: ['latin', 'latin-ext'],
  weight: ['200', '300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-nunito',
});

const workSans = Work_Sans({
  subsets: ['latin', 'latin-ext'],
  weight: ['200', '300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-work',
});

export async function generateMetadata(): Promise<Metadata> {
  const homepage = await getHomepage()
  
  return {
    title: homepage?.siteTitle?.pl || "Sigeon IP - Kancelaria Patentowa",
    description: homepage?.siteDescription?.pl || "Profesjonalna kancelaria patentowa - patenty, znaki towarowe, wzory przemysłowe",
  }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pl">
      <body
        className={`${nunitoSans.variable} ${workSans.variable} font-sans antialiased`}
      >
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
