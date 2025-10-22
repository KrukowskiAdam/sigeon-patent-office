'use client'

import { useLanguage } from '@/context/LanguageContext'
import { Header } from '@/components/Header'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function IPBusinessConsulting() {
  const { currentLanguage } = useLanguage()

  const pageContent = {
    pl: {
      title: 'Doradztwo Biznesowe IP',
      subtitle: 'Strategiczne zarządzanie własnością intelektualną w biznesie',
      description: 'Pomagamy firmom w strategicznym zarządzaniu portfelem własności intelektualnej i maksymalizacji wartości biznesowej.',
      services: [
        {
          title: 'Strategia IP',
          description: 'Opracowanie strategii ochrony własności intelektualnej dostosowanej do celów biznesowych'
        },
        {
          title: 'Audyt IP',
          description: 'Kompleksowy przegląd i ocena portfela własności intelektualnej'
        },
        {
          title: 'Due Diligence IP',
          description: 'Analiza IP w procesach fuzji, przejęć i inwestycji'
        },
        {
          title: 'Licencjonowanie',
          description: 'Strukturyzacja umów licencyjnych i strategii monetyzacji IP'
        },
        {
          title: 'Zarządzanie ryzykiem',
          description: 'Identyfikacja i minimalizacja ryzyka naruszenia praw IP'
        },
        {
          title: 'Szkolenia IP',
          description: 'Edukacja zespołów w zakresie ochrony własności intelektualnej'
        }
      ],
      contact: 'Umów konsultację'
    },
    en: {
      title: 'IP Business Consulting',
      subtitle: 'Strategic intellectual property management in business',
      description: 'We help companies strategically manage their intellectual property portfolio and maximize business value.',
      services: [
        {
          title: 'IP Strategy',
          description: 'Development of intellectual property protection strategy tailored to business objectives'
        },
        {
          title: 'IP Audit',
          description: 'Comprehensive review and assessment of intellectual property portfolio'
        },
        {
          title: 'IP Due Diligence',
          description: 'IP analysis in merger, acquisition and investment processes'
        },
        {
          title: 'Licensing',
          description: 'Structuring licensing agreements and IP monetization strategies'
        },
        {
          title: 'Risk Management',
          description: 'Identification and minimization of IP infringement risks'
        },
        {
          title: 'IP Training',
          description: 'Team education in intellectual property protection'
        }
      ],
      contact: 'Schedule consultation'
    },
    de: {
      title: 'IP-Unternehmensberatung',
      subtitle: 'Strategisches Management von geistigem Eigentum im Geschäft',
      description: 'Wir helfen Unternehmen beim strategischen Management ihres geistigen Eigentums-Portfolios und bei der Maximierung des Geschäftswerts.',
      services: [
        {
          title: 'IP-Strategie',
          description: 'Entwicklung einer auf Geschäftsziele zugeschnittenen Schutzstrategie für geistiges Eigentum'
        },
        {
          title: 'IP-Audit',
          description: 'Umfassende Überprüfung und Bewertung des geistigen Eigentums-Portfolios'
        },
        {
          title: 'IP Due Diligence',
          description: 'IP-Analyse in Fusions-, Übernahme- und Investitionsprozessen'
        },
        {
          title: 'Lizenzierung',
          description: 'Strukturierung von Lizenzverträgen und IP-Monetarisierungsstrategien'
        },
        {
          title: 'Risikomanagement',
          description: 'Identifikation und Minimierung von IP-Verletzungsrisiken'
        },
        {
          title: 'IP-Schulungen',
          description: 'Teamschulung im Schutz geistigen Eigentums'
        }
      ],
      contact: 'Beratung vereinbaren'
    }
  }

  const content = currentLanguage === 'en' ? pageContent.en : 
                  currentLanguage === 'de' ? pageContent.de : 
                  pageContent.pl

  return (
    <div className="min-h-screen">
      <Header />
      
      <main className="pt-20">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-purple-600 to-purple-800 text-white py-20">
          <div className="max-w-6xl mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              {content.title}
            </h1>
            <p className="text-xl md:text-2xl mb-8 opacity-90">
              {content.subtitle}
            </p>
            <p className="text-lg max-w-3xl mx-auto">
              {content.description}
            </p>
          </div>
        </section>

        {/* Services Section */}
        <section className="py-16">
          <div className="max-w-6xl mx-auto px-4">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {content.services.map((service, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3">
                      <Badge variant="outline" className="w-8 h-8 rounded-full flex items-center justify-center">
                        {index + 1}
                      </Badge>
                      {service.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">
                      {service.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-gray-50 py-16">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6">
              {content.contact}
            </h2>
            <Button size="lg" asChild>
              <Link href="/kontakt">
                {content.contact}
              </Link>
            </Button>
          </div>
        </section>
      </main>
    </div>
  )
}