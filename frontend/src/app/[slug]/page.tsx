'use client'

import { useEffect, useState, use } from 'react'
import { useLanguage } from '@/context/LanguageContext'
import { getPage } from '@/lib/queries'
import { Page } from '@/types/sanity'
import { Header } from '@/components/Header'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { getLocalizedText } from '@/lib/i18n'
import { ContentBlock } from '@/components/blocks'
import Link from 'next/link'
import { notFound } from 'next/navigation'

interface PageProps {
  params: Promise<{
    slug: string
  }>
}

export default function DynamicPage({ params }: PageProps) {
  const { currentLanguage } = useLanguage()
  const [page, setPage] = useState<Page | null>(null)
  const [loading, setLoading] = useState(true)
  
  // Unwrap params Promise with React.use()
  const resolvedParams = use(params)

  useEffect(() => {
    const loadPage = async () => {
      try {
        const pageData = await getPage(resolvedParams.slug)
        if (!pageData) {
          notFound()
          return
        }
        setPage(pageData)
      } catch (error) {
        console.error('Error loading page:', error)
        notFound()
      } finally {
        setLoading(false)
      }
    }

    loadPage()
  }, [resolvedParams.slug])

  if (loading) {
    return (
      <div className="min-h-screen">
        <Header />
        <div className="flex items-center justify-center min-h-[50vh]">
          <div className="text-xl">Ładowanie...</div>
        </div>
      </div>
    )
  }

  if (!page) {
    return notFound()
  }

  const getHeroColorClasses = (color: string) => {
    const colors = {
      primary: 'from-[#0abaee] to-[#0891b2]',
      dark: 'from-[#0891b2] to-[#065f7a]', 
      light: 'from-[#38bdf8] to-[#0abaee]',
      gray: 'from-gray-500 to-gray-700',
    }
    return colors[color as keyof typeof colors] || colors.primary
  }

  // Check if hero section should be shown (either by explicit setting or auto-detection)
  const showHeroSection = page.showHeroSection !== false && !(page.content && page.content[0]?._type === 'bannerBlock')

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className={`${showHeroSection ? 'pt-20' : 'pt-0'} flex-grow`}>
        {/* Hero Section - can be controlled via CMS or auto-hidden if first block is banner */}
        {showHeroSection && (
          <section className={`bg-gradient-to-r ${getHeroColorClasses(page.heroColor || 'blue')} text-white py-20`}>
          <div className="max-w-6xl mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-semibold mb-6 leading-tight tracking-tight">
              {getLocalizedText(page.title, currentLanguage)}
            </h1>
            {page.subtitle && (
              <p className="text-xl md:text-2xl mb-8 opacity-90">
                {getLocalizedText(page.subtitle, currentLanguage)}
              </p>
            )}
            {page.excerpt && (
              <p className="text-lg max-w-3xl mx-auto">
                {getLocalizedText(page.excerpt, currentLanguage)}
              </p>
            )}
          </div>
          </section>
        )}

        {/* Services Section - only for service pages */}
        {page.services && page.services.length > 0 && (
          <section className="py-16">
            <div className="max-w-6xl mx-auto px-4">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {page.services.map((service, index) => (
                  <Card key={index} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-3">
                        <Badge variant="outline" className="w-8 h-8 rounded-full flex items-center justify-center">
                          {index + 1}
                        </Badge>
                        {getLocalizedText(service.title, currentLanguage)}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600">
                        {getLocalizedText(service.description, currentLanguage)}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Content Blocks */}
        {page.content && page.content.length > 0 && (
          <div>
            {page.content.map((block) => (
              <ContentBlock 
                key={block._key} 
                block={block} 
                language={currentLanguage} 
              />
            ))}
          </div>
        )}

      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 mt-auto">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">Patent Office</h3>
              <p className="text-gray-300">
                Profesjonalna obsługa w zakresie ochrony własności intelektualnej.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Usługi</h4>
              <ul className="space-y-2 text-gray-300">
                <li>Patenty</li>
                <li>Znaki towarowe</li>
                <li>Wzory przemysłowe</li>
                <li>Prawo autorskie</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Firma</h4>
              <ul className="space-y-2 text-gray-300">
                <li><Link href="/about" className="hover:text-white">O nas</Link></li>
                <li><Link href="/team" className="hover:text-white">Zespół</Link></li>
                <li><Link href="/news" className="hover:text-white">Aktualności</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Kontakt</h4>
              <p className="text-gray-300">
                ul. Przykładowa 123<br />
                00-001 Warszawa<br />
                Tel: +48 123 456 789
              </p>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Patent Office. Wszystkie prawa zastrzeżone.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}