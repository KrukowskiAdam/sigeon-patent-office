'use client'

import { useEffect, useState, use } from 'react'
import { useLanguage } from '@/context/LanguageContext'
import { getPage } from '@/lib/queries'
import { Page } from '@/types/sanity'
import { Header } from '@/components/Header'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
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

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="pt-20 flex-grow">
        {/* Hero Section */}
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

      {/* Footer CTA Section */}
      <footer className="bg-gray-900 text-white py-16 mt-auto">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">
            {currentLanguage === 'en' ? 'Contact us' : 
             currentLanguage === 'de' ? 'Kontaktieren Sie uns' : 'Skontaktuj się z nami'}
          </h2>
          <Button size="lg" variant="outline" asChild>
            <Link href="/kontakt">
              {currentLanguage === 'en' ? 'Get in touch' : 
               currentLanguage === 'de' ? 'Kontakt aufnehmen' : 'Napisz do nas'}
            </Link>
          </Button>
        </div>
      </footer>
    </div>
  )
}