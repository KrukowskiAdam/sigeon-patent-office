'use client'

import { getFeaturedNews, getTeamMembers, getHomepage } from '@/lib/queries'
import { NewsArticle, TeamMember, Homepage } from '@/types/sanity'
import Link from 'next/link'
import Image from 'next/image'
import { urlFor } from '@/lib/sanity'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
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
          <div className="flex items-center gap-4 mb-12">
            <div className="w-1 h-[1.25em] bg-[#0abaee]"></div>
            <h2 className="text-3xl font-bold text-gray-900">
              {homepage?.newsSection?.title ? 
                getLocalizedText(homepage.newsSection.title, currentLanguage) : 
                'Najważniejsze aktualności'
              }
            </h2>
          </div>
          {featuredNews.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredNews.slice(0, 3).map((article: NewsArticle) => (
                <Card key={article._id} className="overflow-hidden shadow-md hover:shadow-lg transition-shadow bg-gray-50 border-gray-200 flex flex-col h-full">
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
                  <CardHeader>
                    {article.featured && (
                      <div className="mb-2">
                        <Badge variant="default" className="bg-[#0abaee] text-white text-xs">Wyróżnione</Badge>
                      </div>
                    )}
                    <CardTitle className="text-lg text-gray-900">
                      {getLocalizedText(article.title, currentLanguage)}
                    </CardTitle>
                    <CardDescription className="text-sm text-gray-500">
                      {new Date(article.publishedAt).toLocaleDateString('pl-PL')}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="flex flex-col flex-1">
                    {article.excerpt && (
                      <p className="text-gray-600 mb-4 text-sm flex-1">
                        {getLocalizedText(article.excerpt, currentLanguage)}
                      </p>
                    )}
                    <div className="mt-auto">
                      <Link 
                        href={`/news/${article.slug.current}`}
                        className="inline-flex items-center gap-2 px-6 py-2 bg-[#0abaee] text-white font-medium rounded-lg hover:bg-[#0891b2] transition-colors duration-200"
                      >
                        Czytaj więcej
                      </Link>
                    </div>
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
          {featuredNews.length > 0 && (
            <div className="text-center mt-12 pt-8 border-t border-gray-200">
              <Link 
                href="/news"
                className="inline-flex items-center gap-2 px-6 py-2 bg-[#0abaee] text-white font-medium rounded-lg hover:bg-[#0891b2] transition-colors duration-200"
              >
                Zobacz wszystkie aktualności
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Team Preview */}
      {(!homepage?.teamSection || homepage.teamSection.showTeam !== false) && (
        <section className="bg-gray-50 py-16">
          <div className="max-w-6xl mx-auto px-4">
            <div className="flex items-center gap-4 mb-12">
              <div className="w-1 h-[1.25em] bg-[#0abaee]"></div>
              <h2 className="text-3xl font-bold text-gray-900">
                {homepage?.teamSection?.title ? 
                  getLocalizedText(homepage.teamSection.title, currentLanguage) : 
                  'Nasz zespół'
                }
              </h2>
            </div>
            {homepage?.teamSection?.subtitle && (
              <p className="text-xl text-gray-600 mb-12 text-center max-w-3xl mx-auto">
                {getLocalizedText(homepage.teamSection.subtitle, currentLanguage)}
              </p>
            )}
            {team.length > 0 ? (
              <>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                  {team.slice(0, homepage?.teamSection?.maxMembers || 4).map((member: TeamMember) => (
                    <Card key={member._id} className="text-center overflow-hidden shadow-md hover:shadow-lg transition-shadow bg-gray-50 border-gray-200 flex flex-col h-full">
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
                  </Card>
                ))}
              </div>
              <div className="text-center mt-8 pt-8 border-t border-gray-200">
                <Link 
                  href="/team"
                  className="inline-flex items-center gap-2 px-6 py-2 bg-[#0abaee] text-white font-medium rounded-lg hover:bg-[#0891b2] transition-colors duration-200"
                >
                  Poznaj cały zespół
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
        </div>
      </section>
      )}

      {/* Contact Section */}
      {homepage?.contactSection && 
       homepage.contactSection.showContact !== false && 
       homepage.contactSection.content && 
       homepage.contactSection.content.length > 0 && (
        <section className="py-16">
          <div className="max-w-6xl mx-auto px-4">
            {homepage.contactSection.title && (
              <div className="flex items-center gap-4 mb-12">
                <div className="w-1 h-[1.25em] bg-[#0abaee]"></div>
                <h2 className="text-3xl font-bold text-gray-900">
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
