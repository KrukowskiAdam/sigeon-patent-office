'use client'

import { getTeamMembers, getTeamPage } from '@/lib/queries'
import type { TeamMember, TeamPage } from '@/types/sanity'
import Link from 'next/link'
import Image from 'next/image'
import { urlFor } from '@/lib/sanity'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { ContentBlock } from '@/components/blocks'
import { useLanguage } from '@/context/LanguageContext'
import { getLocalizedText, getLocalizedTeamText, navigationTranslations } from '@/lib/i18n'
import { useEffect, useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { PortableText } from '@/components/ui/PortableText'
import { getLocalizedTeamPortableText } from '@/lib/portableText'
import { LoadingSpinner } from '@/components/ui/loading-spinner'

export default function TeamPage() {
  const { currentLanguage } = useLanguage()
  const [team, setTeam] = useState<TeamMember[]>([])
  const [teamPage, setTeamPage] = useState<TeamPage | null>(null)
  const [loading, setLoading] = useState(true)
  const [expandedMembers, setExpandedMembers] = useState<Set<string>>(new Set())

  const toggleDescription = (memberId: string) => {
    setExpandedMembers(prev => {
      const newSet = new Set(prev)
      if (newSet.has(memberId)) {
        newSet.delete(memberId)
      } else {
        newSet.add(memberId)
      }
      return newSet
    })
  }

  useEffect(() => {
    const loadData = async () => {
      try {
        const [teamData, pageData] = await Promise.all([
          getTeamMembers(),
          getTeamPage()
        ])
        
        setTeam(teamData)
        setTeamPage(pageData)
      } catch (error) {
        console.error('Error loading team:', error)
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <LoadingSpinner />
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      {/* Page Content Blocks from CMS */}
      {teamPage?.blocks && teamPage.blocks.length > 0 && (
        <>
          {teamPage.blocks.map((block, index) => (
            <ContentBlock 
              key={block._key || index} 
              block={block} 
              language={currentLanguage} 
            />
          ))}
        </>
      )}

      {/* Default Hero Section - only if no blocks in CMS */}
      {(!teamPage?.blocks || teamPage.blocks.length === 0) && (
        <section className="bg-gradient-to-r from-[#0abaee] to-[#0891b2] text-white py-20">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-semibold mb-6 leading-tight tracking-tight">
              {currentLanguage === 'en' ? 'Our Team' : 'Nasz zespół'}
            </h1>
            <p className="text-xl md:text-2xl mb-8 opacity-90">
              {currentLanguage === 'en' ? 'Meet our experienced intellectual property specialists' : 'Poznaj doświadczonych specjalistów ds. własności intelektualnej'}
            </p>
          </div>
        </section>
      )}

      {/* Team Members Section */}
      {(!teamPage?.teamSection || teamPage.teamSection.showTeam !== false) && (
        <main className="py-16 flex-grow">
          <div className="max-w-7xl mx-auto px-4">
            {team.length === 0 ? (
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
          ) : (
            <div className="space-y-8">
              {team.map((member: TeamMember) => (
                <Card key={member._id} className="overflow-hidden hover:shadow-lg transition-shadow pb-0">
                  <div className="flex flex-col md:flex-row">
                    {/* Zdjęcie po lewej - proporcje 3:2 */}
                    {member.photo && (
                      <div className="md:w-64 h-44 relative flex-shrink-0">
                        <Image
                          src={urlFor(member.photo).width(320).height(216).url()}
                          alt={member.name}
                          fill
                          sizes="(max-width: 768px) 100vw, 256px"
                          className="object-cover"
                        />
                      </div>
                    )}
                    
                    {/* Opis po prawej */}
                    <div className="flex-1">
                      <CardHeader>
                        <CardTitle className="text-2xl">
                          {member.name}
                        </CardTitle>
                        <CardDescription className="text-base">
                          {getLocalizedTeamText(member.position, currentLanguage)}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="mb-4">
                          <button
                            onClick={() => toggleDescription(member._id)}
                            className="mt-2 mb-3 text-sm text-[#0abaee] hover:text-[#0891b2] font-medium flex items-center gap-1"
                          >
                            {expandedMembers.has(member._id) ? (
                              <>
                                {currentLanguage === 'pl' ? 'Zwiń' : 'Show less'} <span className="text-xs">▲</span>
                              </>
                            ) : (
                              <>
                                {currentLanguage === 'pl' ? 'Czytaj więcej' : 'Read more'} <span className="text-xs">▼</span>
                              </>
                            )}
                          </button>
                          {expandedMembers.has(member._id) && (
                            <div>
                              {member.description && (
                                <div className="mb-4">
                                  <PortableText 
                                    value={getLocalizedTeamPortableText(
                                      member.description, 
                                      currentLanguage
                                    )} 
                                  />
                                </div>
                              )}
                              
                              <div className="pt-4 border-t space-y-2">
                                {member.email && (
                                  <p className="text-sm text-gray-600">
                                    <span className="font-medium">Email:</span> 
                                    <a href={`mailto:${member.email}`} className="text-gray-900 hover:text-gray-700 ml-1">
                                      {member.email}
                                    </a>
                                  </p>
                                )}
                                {member.phone && (
                                  <p className="text-sm text-gray-600">
                                    <span className="font-medium">Telefon:</span> 
                                    <a href={`tel:${member.phone}`} className="text-gray-900 hover:text-gray-700 ml-1">
                                      {member.phone}
                                    </a>
                                  </p>
                                )}
                              </div>
                            </div>
                          )}
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
      )}

      {/* Navigation */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mt-12 pt-8 border-t border-gray-200">
            <Link 
              href="/"
              className="inline-flex items-center gap-2 px-6 py-2 bg-[#0abaee] text-white font-medium rounded-lg hover:bg-[#0891b2] transition-colors duration-200"
            >
              {teamPage?.buttons?.backToHome
                ? getLocalizedText(teamPage.buttons.backToHome, currentLanguage)
                : navigationTranslations[currentLanguage].home}
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  )
}