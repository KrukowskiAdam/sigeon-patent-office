'use client'

import { useEffect, useState } from 'react'
import { Footer as FooterType } from '@/types/sanity'
import { useLanguage } from '@/context/LanguageContext'
import { getLocalizedText } from '@/lib/i18n'
import Link from 'next/link'

export function Footer() {
  const { currentLanguage } = useLanguage()
  const [footer, setFooter] = useState<FooterType | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let isMounted = true

    const loadFooter = async () => {
      try {
        const response = await fetch('/api/footer')
        if (!response.ok) {
          throw new Error('Failed to fetch footer data')
        }

        const footerData: FooterType | null = await response.json()
        if (isMounted) {
          setFooter(footerData)
        }
      } catch (error) {
        console.error('Error loading footer:', error)
        if (isMounted) {
          setFooter(null)
        }
      } finally {
        if (isMounted) {
          setLoading(false)
        }
      }
    }

    loadFooter()

    return () => {
      isMounted = false
    }
  }, [])

  if (loading) {
    return null
  }

  if (!footer) {
    // Fallback footer if no CMS data is available
    return (
      <footer className="bg-[#0abaee] text-white py-6 mt-auto">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <h4 className="font-semibold mb-4">Grzelak i Wspólnicy, Kancelaria Patentowo-Prawna</h4>
              <p className="text-white text-sm">
                Ochrona własności przemysłowej i intelektualnej, obsługa prawna i biznesowa firm i instytucji
              </p>
            </div>
            <div className="text-center">
              <h4 className="font-semibold mb-4">Usługi</h4>
              <ul className="space-y-2 text-white text-sm">
                <li>Rzecznicy patentowi</li>
                <li>Usługi prawne</li>
                <li>Doradztwo biznesowe IP</li>
                <li>Biomed</li>
              </ul>
            </div>
            <div className="text-center">
              <h4 className="font-semibold mb-4">Firma</h4>
              <ul className="space-y-2 text-white text-sm">
                <li><Link href="/about" className="hover:text-white">O nas</Link></li>
                <li><Link href="/team" className="hover:text-white">Zespół</Link></li>
                <li><Link href="/news" className="hover:text-white">Aktualności</Link></li>
              </ul>
            </div>
            <div className="text-center">
              <h4 className="font-semibold mb-4">Kontakt</h4>
              <p className="text-white text-sm">
                ul. Przykładowa 123<br />
                00-001 Warszawa<br />
                Tel: +48 123 456 789
              </p>
            </div>
          </div>
          <div className="border-t border-gray-300 mt-8 pt-8 text-center text-white">
            <p>&copy; 2024 Grzelak i Wspólnicy, Kancelaria Patentowo-Prawna. Wszystkie prawa zastrzeżone.</p>
          </div>
        </div>
      </footer>
    )
  }

  return (
    <footer className="bg-[#0abaee] text-white py-6 mt-auto">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Column 1 */}
          <div className="flex flex-col text-center">
            <div className="flex-grow">
              <h4 className="font-semibold mb-4">
                {getLocalizedText(footer.column1.title, currentLanguage)}
              </h4>
              <p className="text-white text-sm mb-4">
                {getLocalizedText(footer.column1.content, currentLanguage)}
              </p>
            </div>
            {footer.column1.buttonText && footer.column1.buttonUrl && (
              <Link 
                href={footer.column1.buttonUrl}
                className="inline-flex items-center gap-1 px-4 py-2 bg-white text-[#0abaee] font-bold rounded-md hover:bg-gray-100 transition-colors duration-200 text-sm shadow-sm mx-auto"
              >
                {getLocalizedText(footer.column1.buttonText, currentLanguage)}
              </Link>
            )}
          </div>

          {/* Column 2 */}
          <div className="flex flex-col text-center">
            <div className="flex-grow">
              <h4 className="font-semibold mb-4">
                {getLocalizedText(footer.column2.title, currentLanguage)}
              </h4>
              <div className="text-white text-sm whitespace-pre-line mb-4">
                {getLocalizedText(footer.column2.content, currentLanguage)}
              </div>
            </div>
            {footer.column2.buttonText && footer.column2.buttonUrl && (
              <Link 
                href={footer.column2.buttonUrl}
                className="inline-flex items-center gap-1 px-4 py-2 bg-white text-[#0abaee] font-bold rounded-md hover:bg-gray-100 transition-colors duration-200 text-sm shadow-sm mx-auto"
              >
                {getLocalizedText(footer.column2.buttonText, currentLanguage)}
              </Link>
            )}
          </div>

          {/* Column 3 */}
          <div className="flex flex-col text-center">
            <div className="flex-grow">
              <h4 className="font-semibold mb-4">
                {getLocalizedText(footer.column3.title, currentLanguage)}
              </h4>
              <div className="text-white text-sm whitespace-pre-line mb-4">
                {getLocalizedText(footer.column3.content, currentLanguage)}
              </div>
            </div>
            {footer.column3.buttonText && footer.column3.buttonUrl && (
              <Link 
                href={footer.column3.buttonUrl}
                className="inline-flex items-center gap-1 px-4 py-2 bg-white text-[#0abaee] font-bold rounded-md hover:bg-gray-100 transition-colors duration-200 text-sm shadow-sm mx-auto"
              >
                {getLocalizedText(footer.column3.buttonText, currentLanguage)}
              </Link>
            )}
          </div>

          {/* Column 4 */}
          <div className="flex flex-col text-center">
            <div className="flex-grow">
              <h4 className="font-semibold mb-4">
                {getLocalizedText(footer.column4.title, currentLanguage)}
              </h4>
              <div className="text-white text-sm whitespace-pre-line mb-4">
                {getLocalizedText(footer.column4.content, currentLanguage)}
              </div>
            </div>
            {footer.column4.buttonText && footer.column4.buttonUrl && (
              <Link 
                href={footer.column4.buttonUrl}
                className="inline-flex items-center gap-1 px-4 py-2 bg-white text-[#0abaee] font-bold rounded-md hover:bg-gray-100 transition-colors duration-200 text-sm shadow-sm mx-auto"
              >
                {getLocalizedText(footer.column4.buttonText, currentLanguage)}
              </Link>
            )}
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-300 mt-8 pt-8 text-center text-white">
          <p>
            {footer.copyrightText 
              ? getLocalizedText(footer.copyrightText, currentLanguage)
              : `© ${new Date().getFullYear()} Grzelak i Wspólnicy, Kancelaria Patentowo-Prawna. Wszystkie prawa zastrzeżone.`
            }
          </p>
        </div>
      </div>
    </footer>
  )
}