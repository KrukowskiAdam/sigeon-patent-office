'use client'

import { getNews, getNewsPage } from '@/lib/queries'
import type { NewsArticle, NewsPage } from '@/types/sanity'
import Link from 'next/link'
import Image from 'next/image'
import { urlFor } from '@/lib/sanity'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { useLanguage } from '@/context/LanguageContext'
import { getLocalizedText } from '@/lib/i18n'
import { useEffect, useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ContentBlock } from '@/components/blocks'

export default function NewsPage() {
  const { currentLanguage, setLanguage } = useLanguage()
  const [news, setNews] = useState<NewsArticle[]>([])
  const [newsPage, setNewsPage] = useState<NewsPage | null>(null)
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
    const loadNews = async () => {
      try {
        const [newsData, pageData] = await Promise.all([
          getNews(),
          getNewsPage()
        ])

        setNews(newsData)
        setNewsPage(pageData)
      } catch (error) {
        console.error('Error loading news:', error)
      } finally {
        setLoading(false)
      }
    }

    loadNews()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="flex items-center justify-center min-h-[50vh]">
          <div className="text-xl">Ładowanie...</div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      {/* Page Content Blocks */}
      {newsPage && newsPage.blocks && newsPage.blocks.length > 0 && (
        <div>
          {newsPage.blocks.map((block) => (
            <ContentBlock key={block._key} block={block} language={currentLanguage} />
          ))}
        </div>
      )}

      {/* Content */}
      <main className="py-16 flex-grow">
        <div className="max-w-7xl mx-auto px-4">
          {news.length === 0 ? (
            <Card className="max-w-md mx-auto">
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
          ) : (
            <div className="space-y-8">
              {news
                .filter((article) => currentLanguage === 'pl' ? article.showPl === true : article.showEn === true)
                .map((article: NewsArticle, index: number) => (
                <Card key={article._id} className="overflow-hidden shadow-md hover:shadow-lg transition-shadow bg-gray-50 border-gray-200 flex flex-col h-full">
                  <div className="flex flex-col md:flex-row">
                    {/* Image on the left */}
                    {article.featuredImage ? (
                      <div className="md:w-1/3 flex items-center justify-center bg-gray-50 p-8">
                        <div className="relative w-[80%] aspect-video overflow-hidden">
                          <Image
                            src={urlFor(article.featuredImage).width(400).url()}
                            alt={getLocalizedText(article.title, currentLanguage)}
                            fill
                            sizes="(max-width: 768px) 100vw, 33vw"
                            className="object-cover"
                            priority={index === 0}
                            onError={() => console.error('Error loading image for article:', getLocalizedText(article.title, currentLanguage))}
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
                            <CardTitle className="text-xl md:text-2xl text-gray-900 leading-tight">
                              {getLocalizedText(article.title, currentLanguage)}
                            </CardTitle>
                          </div>
                        </div>
                        <CardDescription className="text-sm text-gray-500">
                          {new Date(article.publishedAt).toLocaleDateString('pl-PL')}
                        </CardDescription>
                      </CardHeader>
                      
                      <CardContent className="text-gray-700 flex-1 flex flex-col">
                        {article.excerpt && (
                          <p className="text-gray-600 mb-2 line-clamp-3">
                            {getLocalizedText(article.excerpt, currentLanguage)}
                          </p>
                        )}
                        
                        <div className="mt-4">
                          <Link 
                            href={`/news/${article.slug.current}`}
                            className="inline-flex items-center gap-2 px-6 py-2 bg-[#0abaee] text-white font-medium rounded-lg hover:bg-[#0891b2] transition-colors duration-200"
                          >
                            {newsPage?.buttons?.readMore
                              ? getLocalizedText(newsPage.buttons.readMore, currentLanguage)
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
              {newsPage?.buttons?.backToHome
                ? getLocalizedText(newsPage.buttons.backToHome, currentLanguage)
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