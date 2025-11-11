'use client'

import { getFeaturedNews, getHomepage } from '@/lib/queries'
import { NewsArticle, Homepage } from '@/types/sanity'
import Link from 'next/link'
import Image from 'next/image'
import { urlFor } from '@/lib/sanity'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { useLanguage } from '@/context/LanguageContext'
import { getLocalizedText, getLocalizedNewsText } from '@/lib/i18n'
import { useEffect, useState } from 'react'
import { ContentBlock } from '@/components/blocks/ContentBlock'
import { getLinkHref, shouldOpenInNewTab } from '@/utils/linkUtils'
import { hasBlockTranslation } from '@/lib/hasTranslation'

export default function Home() {
  const { currentLanguage } = useLanguage()
  const [featuredNews, setFeaturedNews] = useState<NewsArticle[]>([])
  const [homepage, setHomepage] = useState<Homepage | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadData = async () => {
      try {
        const [homepageData, newsData] = await Promise.all([
          getHomepage(),
          getFeaturedNews()
        ])
        
        setHomepage(homepageData)
        setFeaturedNews(newsData)
      } catch (error) {
        console.error('Error loading data:', error)
      } finally {
        setLoading(false)
      }
    }
    
    loadData()
  }, [])

  // Update document title and meta description based on language
  useEffect(() => {
    if (homepage) {
      const title = homepage.siteTitle 
        ? getLocalizedText(homepage.siteTitle, currentLanguage)
        : 'Sigeon IP - Kancelaria Patentowa'
      
      const description = homepage.siteDescription
        ? getLocalizedText(homepage.siteDescription, currentLanguage)
        : 'Profesjonalna kancelaria patentowa - patenty, znaki towarowe, wzory przemysłowe'
      
      document.title = title
      
      let metaDescription = document.querySelector('meta[name="description"]')
      if (!metaDescription) {
        metaDescription = document.createElement('meta')
        metaDescription.setAttribute('name', 'description')
        document.head.appendChild(metaDescription)
      }
      metaDescription.setAttribute('content', description)
    }
  }, [homepage, currentLanguage])


  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="flex-grow"></div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      {/* Content Blocks from CMS */}
      {homepage?.content && homepage.content.length > 0 && (
        <>
          {homepage.content
            .filter(block => hasBlockTranslation(block, currentLanguage))
            .map((block, index) => (
            <ContentBlock 
              key={block._key || index} 
              block={block} 
              language={currentLanguage} 
            />
          ))}
        </>
      )}

      {/* Featured News */}
      <section id="news" className="py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-stretch gap-4 mb-12">
            <div className="w-1 bg-[#0abaee] flex-shrink-0"></div>
            <h2 className="text-2xl font-bold text-gray-900 leading-none">
              {homepage?.newsSection?.title ? 
                getLocalizedText(homepage.newsSection.title, currentLanguage) : 
                'Najważniejsze aktualności'
              }
            </h2>
          </div>
          {featuredNews.length > 0 ? (
            <div className="space-y-8">
              {featuredNews
                .filter((article) => currentLanguage === 'pl' ? article.showPl === true : article.showEn === true)
                .slice(0, 3)
                .map((article: NewsArticle, index: number) => (
                <Card key={article._id} className="overflow-hidden shadow-md hover:shadow-lg transition-shadow bg-gray-50 border-gray-200 flex flex-col h-full">
                  <div className="flex flex-col md:flex-row">
                    {/* Image on the left */}
                    {article.featuredImage ? (
                      <div className="md:w-1/3 flex items-center justify-center bg-gray-50 p-8">
                        <div className="relative w-[64%] aspect-video overflow-hidden">
                          <Image
                            src={urlFor(article.featuredImage).width(256).height(144).quality(85).url()}
                            alt={getLocalizedNewsText(article.title, currentLanguage)}
                            fill
                            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 33vw, 20vw"
                            className="object-cover"
                            priority={index === 0}
                            loading={index === 0 ? 'eager' : 'lazy'}
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
                    <div className={`${article.featuredImage ? 'md:w-2/3' : 'w-full'} flex flex-col`}>
                      <CardHeader className="text-gray-900 pt-8">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            {article.featured && (
                              <div className="mb-2">
                                <Badge variant="default" className="bg-[#0abaee] text-white text-xs">Wyróżnione</Badge>
                              </div>
                            )}
                            <CardTitle className="text-lg md:text-xl text-gray-900 leading-tight">
                              {getLocalizedNewsText(article.title, currentLanguage)}
                            </CardTitle>
                          </div>
                        </div>
                        <CardDescription className="text-sm text-gray-500">
                          {new Date(article.publishedAt).toLocaleDateString('pl-PL')}
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="flex flex-col flex-1">
                        {article.excerpt && getLocalizedNewsText(article.excerpt, currentLanguage) && (
                          <p className="text-gray-600 mb-2 text-sm">
                            {getLocalizedNewsText(article.excerpt, currentLanguage)}
                          </p>
                        )}
                        <div className="mt-4">
                          <Link 
                            href={`/news/${article.slug.current}`}
                            prefetch={true}
                            className="inline-flex items-center gap-2 px-6 py-2 bg-[#0abaee] text-white font-medium rounded-lg hover:bg-[#0891b2] transition-colors duration-200"
                          >
                            {homepage?.newsSection?.readMoreLabel
                              ? getLocalizedText(homepage.newsSection.readMoreLabel, currentLanguage)
                              : 'Czytaj więcej'}
                          </Link>
                        </div>
                      </CardContent>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="text-center py-12">
                <div className="text-gray-500 mb-4">
                  <svg className="w-16 h-16 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                  </svg>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Brak aktualności</h3>
                  <p>Aktualności będą wyświetlane po dodaniu ich do systemu CMS.</p>
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
          )}
          {featuredNews.length > 0 && homepage?.newsSection?.cta?.text && (
            <div className="text-center mt-12 pt-8 border-t border-gray-200">
              <Link 
                href={getLinkHref(homepage.newsSection.cta)}
                target={shouldOpenInNewTab(homepage.newsSection.cta) ? '_blank' : undefined}
                rel={shouldOpenInNewTab(homepage.newsSection.cta) ? 'noopener noreferrer' : undefined}
                className="inline-flex items-center gap-2 px-6 py-2 bg-[#0abaee] text-white font-medium rounded-lg hover:bg-[#0891b2] transition-colors duration-200"
              >
                {getLocalizedText(homepage.newsSection.cta.text, currentLanguage) || 'Zobacz wszystkie aktualności'}
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Contact Section */}
      {homepage?.contactSection && 
       homepage.contactSection.showContact !== false && 
       homepage.contactSection.content && 
       homepage.contactSection.content.length > 0 && (
        <section id="contact" className="py-12">
          <div className="max-w-7xl mx-auto px-4">
            {homepage.contactSection.title && (
              <div className="flex items-center gap-4 mb-12">
                <div className="w-1 h-[1.25em] bg-[#0abaee]"></div>
                <h2 className="text-2xl font-bold text-gray-900">
                  {getLocalizedText(homepage.contactSection.title, currentLanguage)}
                </h2>
              </div>
            )}
            {homepage.contactSection.subtitle && (
              <p className="text-xl text-gray-600 mb-12 text-center max-w-3xl mx-auto">
                {getLocalizedText(homepage.contactSection.subtitle, currentLanguage)}
              </p>
            )}
            {homepage.contactSection.content.map((block, index) => (
              <ContentBlock 
                key={block._key || index} 
                block={block} 
                language={currentLanguage} 
              />
            ))}
          </div>
        </section>
      )}

      {/* Footer */}
      <Footer />
    </div>
  )
}
