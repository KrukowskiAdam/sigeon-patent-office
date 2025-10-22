'use client'

import { useLanguage } from '@/context/LanguageContext'
import { Header } from '@/components/Header'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function LegalServices() {
  const { currentLanguage } = useLanguage()

  const pageContent = {
    pl: {
      title: 'Usługi Prawne',
      subtitle: 'Kompleksowe wsparcie prawne w zakresie własności intelektualnej',
      description: 'Oferujemy szeroką gamę usług prawnych specjalizując się w prawie własności intelektualnej, prawie handlowym i ochronie danych.',
      services: [
        {
          title: 'Prawo patentowe',
          description: 'Doradztwo w zakresie patentów, wzorów użytkowych i przemysłowych'
        },
        {
          title: 'Prawo znaków towarowych',
          description: 'Rejestracja i ochrona znaków towarowych, doradztwo w sporach'
        },
        {
          title: 'Prawo autorskie',
          description: 'Ochrona praw autorskich, licencjonowanie, umowy o dzieło'
        },
        {
          title: 'Prawo konkurencji',
          description: 'Nieuczciwą konkurencja, tajemnice handlowe, know-how'
        },
        {
          title: 'Umowy handlowe',
          description: 'Przygotowanie i negocjacja umów licencyjnych i handlowych'
        },
        {
          title: 'Spory sądowe',
          description: 'Reprezentacja w sporach dotyczących własności intelektualnej'
        }
      ],
      contact: 'Skontaktuj się z nami'
    },
    en: {
      title: 'Legal Services',
      subtitle: 'Comprehensive legal support in intellectual property',
      description: 'We offer a wide range of legal services specializing in intellectual property law, commercial law and data protection.',
      services: [
        {
          title: 'Patent Law',
          description: 'Advice on patents, utility models and industrial designs'
        },
        {
          title: 'Trademark Law',
          description: 'Registration and protection of trademarks, dispute advice'
        },
        {
          title: 'Copyright Law',
          description: 'Copyright protection, licensing, work agreements'
        },
        {
          title: 'Competition Law',
          description: 'Unfair competition, trade secrets, know-how'
        },
        {
          title: 'Commercial Contracts',
          description: 'Preparation and negotiation of licensing and commercial agreements'
        },
        {
          title: 'Court Disputes',
          description: 'Representation in intellectual property disputes'
        }
      ],
      contact: 'Contact us'
    },
    de: {
      title: 'Rechtsdienstleistungen',
      subtitle: 'Umfassende rechtliche Unterstützung im Bereich des geistigen Eigentums',
      description: 'Wir bieten eine breite Palette von Rechtsdienstleistungen mit Spezialisierung auf Recht des geistigen Eigentums, Handelsrecht und Datenschutz.',
      services: [
        {
          title: 'Patentrecht',
          description: 'Beratung zu Patenten, Gebrauchsmustern und Geschmacksmustern'
        },
        {
          title: 'Markenrecht',
          description: 'Registrierung und Schutz von Marken, Streitberatung'
        },
        {
          title: 'Urheberrecht',
          description: 'Urheberrechtsschutz, Lizenzierung, Werkverträge'
        },
        {
          title: 'Wettbewerbsrecht',
          description: 'Unlauterer Wettbewerb, Geschäftsgeheimnisse, Know-how'
        },
        {
          title: 'Handelsverträge',
          description: 'Vorbereitung und Verhandlung von Lizenz- und Handelsverträgen'
        },
        {
          title: 'Gerichtsstreitigkeiten',
          description: 'Vertretung in Streitigkeiten über geistiges Eigentum'
        }
      ],
      contact: 'Kontaktieren Sie uns'
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
        <section className="bg-gradient-to-r from-green-600 to-green-800 text-white py-20">
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