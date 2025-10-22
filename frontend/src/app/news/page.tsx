'use client'

import { getNews } from '@/lib/queries'
import { NewsArticle } from '@/types/sanity'
import Link from 'next/link'
import Image from 'next/image'
import { urlFor } from '@/lib/sanity'
import { Header } from '@/components/Header'
import { useLanguage } from '@/context/LanguageContext'
import { getLocalizedText } from '@/lib/i18n'
import { useEffect, useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

export default function NewsPage() {
  const { currentLanguage } = useLanguage()
  const [news, setNews] = useState<NewsArticle[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadNews = async () => {
      try {
        const newsData = await getNews()
        setNews(newsData)
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

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-[#0abaee] to-[#0891b2] text-white py-20">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-semibold mb-6 leading-tight tracking-tight">
            {currentLanguage === 'en' ? 'News' : 
             currentLanguage === 'de' ? 'Nachrichten' : 'Aktualności'}
          </h1>
          <p className="text-xl md:text-2xl mb-8 opacity-90">
            {currentLanguage === 'en' ? 'Latest updates from our patent office' : 
             currentLanguage === 'de' ? 'Neueste Updates aus unserem Patentbüro' : 'Najnowsze informacje z naszej kancelarii patentowej'}
          </p>
        </div>
      </section>

      {/* Content */}
      <main className="py-16 flex-grow">
        <div className="max-w-6xl mx-auto px-4">
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
                <Button asChild>
                  <a href="http://localhost:3333" target="_blank" rel="noopener noreferrer">
                    Przejdź do CMS →
                  </a>
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {news.map((article: NewsArticle) => (
                <Card key={article._id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  {article.featuredImage && (
                    <div className="h-48 relative">
                      <Image
                        src={urlFor(article.featuredImage).width(400).height(200).url()}
                        alt={getLocalizedText(article.title, currentLanguage)}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover"
                      />
                    </div>
                  )}
                  <CardHeader>
                    <div className="flex items-center gap-2 mb-2">
                      {article.category && (
                        <Badge variant="secondary">
                          {article.category}
                        </Badge>
                      )}
                      {article.featured && (
                        <Badge variant="default">Wyróżnione</Badge>
                      )}
                    </div>
                    <CardTitle className="text-xl">
                      {getLocalizedText(article.title, currentLanguage)}
                    </CardTitle>
                    <CardDescription className="text-sm text-muted-foreground">
                      {new Date(article.publishedAt).toLocaleDateString('pl-PL')}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {article.excerpt && (
                      <p className="text-muted-foreground mb-4">
                        {getLocalizedText(article.excerpt, currentLanguage)}
                      </p>
                    )}
                    <Button variant="ghost" asChild>
                      <Link href={`/news/${article.slug.current}`}>
                        Czytaj więcej →
                      </Link>
                    </Button>
                    
                    {article.tags && article.tags.length > 0 && (
                      <div className="mt-4 pt-4 border-t">
                        <div className="flex flex-wrap gap-1">
                          {article.tags.slice(0, 3).map((tag, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
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