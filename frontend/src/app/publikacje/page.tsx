'use client'

import { getPublications, getPublicationsPage } from '@/lib/queries'
import type { Publication, PublicationsPage } from '@/types/sanity'
import Link from 'next/link'
import Image from 'next/image'
import { urlFor } from '@/lib/sanity'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { useLanguage } from '@/context/LanguageContext'
import { getLocalizedText, getLocalizedPublicationsText } from '@/lib/i18n'
import { useEffect, useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ContentBlock } from '@/components/blocks'
import { NewsSkeleton } from '@/components/ui/news-skeleton'

export default function PublikacjePage() {
  const { currentLanguage, setLanguage } = useLanguage()
  const [publications, setPublications] = useState<Publication[]>([])
  const [publicationsPage, setPublicationsPage] = useState<PublicationsPage | null>(null)
  const [loading, setLoading] = useState(true)

  // Check for language parameter in URL
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search)
    const langParam = urlParams.get('lang')
    
    if (langParam && ['en', 'pl', 'zh', 'ko', 'ja', 'ru'].includes(langParam)) {
      setLanguage(langParam as 'en' | 'pl' | 'zh' | 'ko' | 'ja' | 'ru')
    }
  }, [setLanguage])

  useEffect(() => {
    const loadPublications = async () => {
      try {
        const [publicationsData, pageData] = await Promise.all([
          getPublications(),
          getPublicationsPage()
        ])

        setPublications(publicationsData)
        setPublicationsPage(pageData)
      } catch (error) {
        console.error('Error loading publications:', error)
      } finally {
        setLoading(false)
      }
    }

    loadPublications()
  }, [])

  // Update document title and meta tags when publications page loads
  useEffect(() => {
    if (publicationsPage) {
      // Update title
      document.title = publicationsPage.seo?.metaTitle 
        ? getLocalizedText(publicationsPage.seo.metaTitle, currentLanguage)
        : 'Publikacje | Sigeon'
      
      // Update meta description
      if (publicationsPage.seo?.metaDescription) {
        const description = getLocalizedText(publicationsPage.seo.metaDescription, currentLanguage)
        let metaDescription = document.querySelector('meta[name="description"]')
        if (!metaDescription) {
          metaDescription = document.createElement('meta')
          metaDescription.setAttribute('name', 'description')
          document.head.appendChild(metaDescription)
        }
        metaDescription.setAttribute('content', description || '')
      }
    }
  }, [publicationsPage, currentLanguage])

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow">
          <section className="py-12">
            <div className="max-w-7xl mx-auto px-4">
              <div className="flex items-stretch gap-4 mb-12">
                <div className="w-1 bg-[#0abaee] flex-shrink-0"></div>
                <h1 className="text-2xl font-bold text-gray-900 leading-none">Publikacje</h1>
              </div>
              <NewsSkeleton />
            </div>
          </section>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      {/* Page Content Blocks */}
      {publicationsPage && publicationsPage.blocks && publicationsPage.blocks.length > 0 && (
        <div>
          {publicationsPage.blocks.map((block) => (
            <ContentBlock key={block._key} block={block} language={currentLanguage} />
          ))}
        </div>
      )}

      {/* Content */}
      <main className="py-16 flex-grow">
        <div className="max-w-7xl mx-auto px-4">
          {publications.length === 0 ? (
            <Card className="max-w-md mx-auto">
              <CardContent className="text-center py-12">
                <div className="text-gray-500 mb-4">
                  <svg className="w-16 h-16 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                  </svg>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Brak publikacji</h3>
                  <p>Publikacje będą wyświetlane po dodaniu ich do systemu CMS.</p>
                </div>
                <a 
                  href="http://localhost:3333" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-2 bg-[#0abaee] text-white font-medium rounded-lg hover:bg-[#0891b2] transition-colors duration-200"
                >
                  Przejdź do CMS
                </a>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-8">
              {publications
                .filter((publication) => currentLanguage === 'pl' ? publication.showPl === true : publication.showEn === true)
                .map((publication: Publication, index: number) => (
                <Card key={publication._id} className="overflow-hidden shadow-md hover:shadow-lg transition-shadow bg-gray-50 border-gray-200 flex flex-col h-full">
                  <div className="flex flex-col md:flex-row">
                    {/* Image on the left */}
                    {publication.featuredImage ? (
                      <div className="md:w-1/3 flex items-center justify-center bg-gray-50 p-8">
                        <div className="relative w-[80%] aspect-video overflow-hidden">
                          <Image
                            src={urlFor(publication.featuredImage).width(320).height(180).quality(85).url()}
                            alt={getLocalizedPublicationsText(publication.title, currentLanguage)}
                            fill
                            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 33vw, 25vw"
                            className="object-cover"
                            priority={index === 0}
                            loading={index === 0 ? 'eager' : 'lazy'}
                            onError={() => console.error('Error loading image for publication:', getLocalizedPublicationsText(publication.title, currentLanguage))}
                          />
                        </div>
                      </div>
                    ) : (
                      <div className="md:w-1/3 bg-gray-100 flex items-center justify-center text-gray-400 p-8">
                        <div className="relative w-full aspect-video flex flex-col items-center justify-center">
                          <svg className="w-8 h-8 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          <span className="text-xs">Brak obrazu</span>
                        </div>
                      </div>
                    )}
                    
                    {/* Content on the right */}
                    <div className={`${publication.featuredImage ? 'md:w-2/3' : 'w-full'} flex flex-col`}>
                      <CardHeader className="text-gray-900 pt-8">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            {publication.featured && (
                              <div className="mb-2">
                                <Badge variant="default" className="bg-[#0abaee] text-white text-xs">Wyróżnione</Badge>
                              </div>
                            )}
                            <CardTitle className="text-lg md:text-xl text-gray-900 leading-tight">
                              {getLocalizedPublicationsText(publication.title, currentLanguage)}
                            </CardTitle>
                          </div>
                        </div>
                        <CardDescription className="text-sm text-gray-500">
                          {new Date(publication.publishedAt).toLocaleDateString('pl-PL')}
                        </CardDescription>
                      </CardHeader>
                      
                      <CardContent className="text-gray-700 flex-1 flex flex-col">
                        {publication.excerpt && getLocalizedPublicationsText(publication.excerpt, currentLanguage) && (
                          <p className="text-gray-600 mb-2 line-clamp-3">
                            {getLocalizedPublicationsText(publication.excerpt, currentLanguage)}
                          </p>
                        )}
                        
                        <div className="mt-4">
                          <Link 
                            href={`/publikacje/${publication.slug.current}`}
                            prefetch={true}
                            className="inline-flex items-center gap-2 px-6 py-2 bg-[#0abaee] text-white font-medium rounded-lg hover:bg-[#0891b2] transition-colors duration-200"
                          >
                            {publicationsPage?.buttons?.readMore
                              ? getLocalizedText(publicationsPage.buttons.readMore, currentLanguage)
                              : 'Czytaj więcej'}
                          </Link>
                        </div>
                      </CardContent>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      </main>

      {/* Navigation */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mt-12 pt-8 border-t border-gray-200">
            <Link 
              href="/"
              className="inline-flex items-center gap-2 px-6 py-2 bg-[#0abaee] text-white font-medium rounded-lg hover:bg-[#0891b2] transition-colors duration-200"
            >
              {publicationsPage?.buttons?.backToHome
                ? getLocalizedText(publicationsPage.buttons.backToHome, currentLanguage)
                : 'Strona główna'}
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  )
}