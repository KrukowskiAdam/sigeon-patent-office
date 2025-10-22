'use client'

import { getTeamMembers } from '@/lib/queries'
import { TeamMember } from '@/types/sanity'
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

export default function TeamPage() {
  const { currentLanguage } = useLanguage()
  const [team, setTeam] = useState<TeamMember[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadTeam = async () => {
      try {
        const teamData = await getTeamMembers()
        setTeam(teamData)
      } catch (error) {
        console.error('Error loading team:', error)
      } finally {
        setLoading(false)
      }
    }

    loadTeam()
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
            {currentLanguage === 'en' ? 'Our Team' : 
             currentLanguage === 'de' ? 'Unser Team' : 'Nasz zespół'}
          </h1>
          <p className="text-xl md:text-2xl mb-8 opacity-90">
            {currentLanguage === 'en' ? 'Meet our experienced intellectual property specialists' : 
             currentLanguage === 'de' ? 'Lernen Sie unsere erfahrenen IP-Spezialisten kennen' : 'Poznaj doświadczonych specjalistów ds. własności intelektualnej'}
          </p>
        </div>
      </section>

      {/* Content */}
      <main className="py-16 flex-grow">
        <div className="max-w-6xl mx-auto px-4">
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
                <Button asChild>
                  <a href="http://localhost:3333" target="_blank" rel="noopener noreferrer">
                    Przejdź do CMS →
                  </a>
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {team.map((member: TeamMember) => (
                <Card key={member._id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  {member.photo && (
                    <div className="h-64 relative">
                      <Image
                        src={urlFor(member.photo).width(400).height(300).url()}
                        alt={member.name}
                        fill
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
                      <div className="mb-4">
                        <h3 className="text-sm font-semibold text-gray-700 mb-2">Specjalizacje:</h3>
                        <div className="flex flex-wrap gap-1">
                          {member.specializations.map((spec, index) => (
                            <Badge key={index} variant="secondary">
                              {spec}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    {member.languages && member.languages.length > 0 && (
                      <div className="mb-4">
                        <h3 className="text-sm font-semibold text-gray-700 mb-2">Języki:</h3>
                        <div className="flex flex-wrap gap-1">
                          {member.languages.map((lang, index) => (
                            <Badge key={index} variant="outline">
                              {lang}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    <div className="pt-4 border-t">
                      {member.email && (
                        <p className="text-sm text-gray-600 mb-1">
                          <span className="font-medium">Email:</span> 
                          <a href={`mailto:${member.email}`} className="text-blue-600 hover:text-blue-800 ml-1">
                            {member.email}
                          </a>
                        </p>
                      )}
                      {member.phone && (
                        <p className="text-sm text-gray-600">
                          <span className="font-medium">Telefon:</span> 
                          <a href={`tel:${member.phone}`} className="text-blue-600 hover:text-blue-800 ml-1">
                            {member.phone}
                          </a>
                        </p>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
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