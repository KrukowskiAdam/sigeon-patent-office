'use client'

import { getFeaturedNews, getTeamMembers, getHomepage } from '@/lib/queries'
import { NewsArticle, TeamMember, Homepage } from '@/types/sanity'
import Link from 'next/link'
import Image from 'next/image'
import { urlFor } from '@/lib/sanity'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Header } from '@/components/Header'
import { useLanguage } from '@/context/LanguageContext'
import { getLocalizedText } from '@/lib/i18n'
import { useEffect, useState } from 'react'
import { ContentBlock } from '@/components/blocks/ContentBlock'

export default function Home() {
  const { currentLanguage } = useLanguage()
  const [featuredNews, setFeaturedNews] = useState<NewsArticle[]>([])
  const [team, setTeam] = useState<TeamMember[]>([])
  const [homepage, setHomepage] = useState<Homepage | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadData = async () => {
      try {
        console.log('🔄 Starting data load...')
        
        // Load homepage data
        console.log('� Loading homepage...')
        const homepageData = await getHomepage()
        console.log('✅ Homepage loaded:', homepageData ? 'Found' : 'Not found')
        
        console.log('📰 Loading news...')
        const newsData = await getFeaturedNews()
        console.log('✅ News loaded:', newsData?.length || 0, 'articles')
        
        console.log('👥 Loading team...')
        const teamData = await getTeamMembers()
        console.log('✅ Team loaded:', teamData?.length || 0, 'members')
        
        console.log('📝 Setting state...')
        setHomepage(homepageData)
        setFeaturedNews(newsData)
        setTeam(teamData)
        console.log('✅ State updated successfully')
      } catch (error) {
        console.error('❌ Error loading data:', error)
        console.error('❌ Error details:', error instanceof Error ? error.message : 'Unknown error')
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [])



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
    <div className="min-h-screen flex flex-col">
      <Header />

      {/* Content Blocks from CMS */}
      {homepage?.content && homepage.content.length > 0 && (
        <>
          {homepage.content.map((block, index) => (
            <ContentBlock 
              key={block._key || index} 
              block={block} 
              language={currentLanguage} 
            />
          ))}
        </>
      )}

      {/* Featured News */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">
            {homepage?.newsSection?.title ? 
              getLocalizedText(homepage.newsSection.title, currentLanguage) : 
              'Najważniejsze aktualności'
            }
          </h2>
          {featuredNews.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredNews.slice(0, 3).map((article: NewsArticle) => (
                <Card key={article._id} className="overflow-hidden shadow-lg hover:shadow-2xl transition-shadow bg-slate-800 text-white border-slate-700">
                  {article.featuredImage && (
                    <div className="relative aspect-video">
                      <Image
                        src={urlFor(article.featuredImage).width(400).height(225).url()}
                        alt={article.title.pl}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover"
                      />
                    </div>
                  )}
                  <CardHeader className="text-white">
                    {article.featured && (
                      <div className="mb-2">
                        <Badge variant="default" className="text-xs">Wyróżnione</Badge>
                      </div>
                    )}
                    <CardTitle className="text-lg text-white">
                      {getLocalizedText(article.title, currentLanguage)}
                    </CardTitle>
                    <CardDescription className="text-xs text-slate-300">
                      {new Date(article.publishedAt).toLocaleDateString('pl-PL')}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="text-white">
                    {article.excerpt && (
                      <p className="text-slate-300 mb-4 text-sm">
                        {getLocalizedText(article.excerpt, currentLanguage)}
                      </p>
                    )}
                    <Button variant="outline" className="bg-transparent border-slate-600 text-white hover:bg-slate-700 hover:text-white" asChild>
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
                className="text-slate-700 hover:text-slate-900 font-medium"
              >
                Zobacz wszystkie aktualności →
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Team Preview */}
      {(!homepage?.teamSection || homepage.teamSection.showTeam !== false) && (
        <section className="bg-gray-50 py-16">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              {homepage?.teamSection?.title ? 
                getLocalizedText(homepage.teamSection.title, currentLanguage) : 
                'Nasz zespół'
              }
            </h2>
            {homepage?.teamSection?.subtitle && (
              <p className="text-xl text-gray-600 mb-12 text-center max-w-3xl mx-auto">
                {getLocalizedText(homepage.teamSection.subtitle, currentLanguage)}
              </p>
            )}
            {team.length > 0 ? (
              <>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                  {team.slice(0, homepage?.teamSection?.maxMembers || 4).map((member: TeamMember) => (
                    <Card key={member._id} className="text-center hover:shadow-lg transition-shadow">
                    {member.photo && (
                      <div className="h-48 relative">
                        <Image
                          src={urlFor(member.photo).width(300).height(200).url()}
                          alt={member.name}
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                          className="object-cover"
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
                  className="text-slate-700 hover:text-slate-900 font-medium"
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
      )}

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
