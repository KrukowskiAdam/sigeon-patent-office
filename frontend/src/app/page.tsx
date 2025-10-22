'use client'

import { getFeaturedNews, getTeamMembers } from '@/lib/queries'
import { NewsArticle, TeamMember } from '@/types/sanity'
import Link from 'next/link'
import Image from 'next/image'
import { urlFor, client } from '@/lib/sanity'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Header } from '@/components/Header'
import { useLanguage } from '@/context/LanguageContext'
import { getLocalizedText } from '@/lib/i18n'
import { useEffect, useState } from 'react'

export default function Home() {
  const { currentLanguage } = useLanguage()
  const [featuredNews, setFeaturedNews] = useState<NewsArticle[]>([])
  const [team, setTeam] = useState<TeamMember[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadData = async () => {
      try {
        // Test najprostszego zapytania
        console.log('Testing connection...')
        const testResult = await client.fetch('*[0..1]')
        console.log('Connection test result:', testResult)
        
        const [newsData, teamData] = await Promise.all([
          getFeaturedNews(),
          getTeamMembers()
        ])
        console.log('News data:', newsData)
        console.log('Team data:', teamData)
        
        setFeaturedNews(newsData)
        setTeam(teamData)
      } catch (error) {
        console.error('Error loading data:', error)
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [])

  const heroTexts = {
    pl: {
      title: 'Profesjonalna Kancelaria Patentowa',
      subtitle: 'Kompleksowa ochrona własności intelektualnej - patenty, znaki towarowe, wzory przemysłowe',
      cta: 'Skontaktuj się z nami'
    },
    en: {
      title: 'Professional Patent Office',
      subtitle: 'Comprehensive intellectual property protection - patents, trademarks, industrial designs',
      cta: 'Contact Us'
    },
    de: {
      title: 'Professionelles Patentbüro',
      subtitle: 'Umfassender Schutz des geistigen Eigentums - Patente, Marken, Industriedesigns',
      cta: 'Kontaktieren Sie uns'
    },
    zh: {
      title: '专业专利事务所',
      subtitle: '全面的知识产权保护 - 专利、商标、工业设计',
      cta: '联系我们'
    },
    ko: {
      title: '전문 특허 사무소',
      subtitle: '포괄적인 지식재산권 보호 - 특허, 상표, 산업디자인',
      cta: '문의하기'
    },
    ja: {
      title: 'プロフェッショナル特許事務所',
      subtitle: '包括的な知的財産保護 - 特許、商標、工業デザイン',
      cta: 'お問い合わせ'
    },
    ru: {
      title: 'Профессиональное патентное бюро',
      subtitle: 'Комплексная защита интеллектуальной собственности - патенты, товарные знаки, промышленные образцы',
      cta: 'Свяжитесь с нами'
    }
  }

  const currentTexts = heroTexts[currentLanguage] || heroTexts.pl

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

  return (
    <div className="min-h-screen">
      <Header />

      {/* Hero Section */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {currentTexts.title}
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            {currentTexts.subtitle}
          </p>
          <Button asChild size="lg" className="text-lg">
            <Link href="/contact">
              {currentTexts.cta}
            </Link>
          </Button>
        </div>
      </section>

      {/* Featured News */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Najważniejsze aktualności</h2>
          {featuredNews.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredNews.slice(0, 3).map((article: NewsArticle) => (
                <Card key={article._id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  {article.featuredImage && (
                    <div className="h-48 relative">
                      <Image
                        src={urlFor(article.featuredImage).width(400).height(200).url()}
                        alt={article.title.pl}
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}
                  <CardHeader>
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="secondary">
                        {article.category || 'News'}
                      </Badge>
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
                  </CardContent>
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
                <Button asChild>
                  <a href="http://localhost:3333" target="_blank" rel="noopener noreferrer">
                    Przejdź do CMS →
                  </a>
                </Button>
              </CardContent>
            </Card>
          )}
          {featuredNews.length > 0 && (
            <div className="text-center mt-8">
              <Link 
                href="/news"
                className="text-blue-600 hover:text-blue-800 font-medium"
              >
                Zobacz wszystkie aktualności →
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Team Preview */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Nasz zespół</h2>
          {team.length > 0 ? (
            <>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                {team.slice(0, 4).map((member: TeamMember) => (
                  <Card key={member._id} className="text-center hover:shadow-lg transition-shadow">
                    {member.photo && (
                      <div className="h-48 relative">
                        <Image
                          src={urlFor(member.photo).width(300).height(200).url()}
                          alt={member.name}
                          fill
                          className="object-cover rounded-t-lg"
                        />
                      </div>
                    )}
                    <CardHeader>
                      <CardTitle className="text-xl">
                        {member.name}
                      </CardTitle>
                      <CardDescription>
                        {getLocalizedText(member.position, currentLanguage)}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      {member.specializations && member.specializations.length > 0 && (
                        <div className="flex flex-wrap gap-1 justify-center">
                          {member.specializations.slice(0, 3).map((spec, index) => (
                            <Badge key={index} variant="outline">
                              {spec}
                            </Badge>
                          ))}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
              <div className="text-center mt-8">
                <Link 
                  href="/team"
                  className="text-blue-600 hover:text-blue-800 font-medium"
                >
                  Poznaj cały zespół →
                </Link>
              </div>
            </>
          ) : (
            <Card className="max-w-md mx-auto">
              <CardContent className="text-center py-12">
                <div className="text-gray-500 mb-4">
                  <svg className="w-16 h-16 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                  </svg>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Brak członków zespołu</h3>
                  <p>Profil zespołu będzie wyświetlany po dodaniu członków w CMS.</p>
                </div>
                <Button asChild>
                  <a href="http://localhost:3333" target="_blank" rel="noopener noreferrer">
                    Przejdź do CMS →
                  </a>
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
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
