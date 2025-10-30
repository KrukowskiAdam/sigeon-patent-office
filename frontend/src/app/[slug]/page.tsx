'use client'

import { useEffect, useState, use } from 'react'
import Link from 'next/link'
import { useLanguage } from '@/context/LanguageContext'
import { getPage } from '@/lib/queries'
import { Page } from '@/types/sanity'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { getLocalizedText } from '@/lib/i18n'
import { ContentBlock } from '@/components/blocks'
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

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="pt-0 flex-grow">        {/* Services Section - only for service pages */}
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

      {/* Navigation Section */}
      <section className="py-8">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center pt-8 border-t border-gray-200">
            <Link
              href="/"
              className="inline-block text-white font-medium py-3 px-8 rounded-lg transition-colors"
              style={{ backgroundColor: '#0abaee' }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#0891b2'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#0abaee'
              }}
            >
              Strona główna
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  )
}