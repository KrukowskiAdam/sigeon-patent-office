'use client'

import { useLanguage } from '@/context/LanguageContext'
import { Header } from '@/components/Header'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function PatentAttorneys() {
  const { currentLanguage } = useLanguage()

  const pageContent = {
    pl: {
      title: 'Rzecznicy Patentowi',
      subtitle: 'Profesjonalna obsługa w zakresie własności intelektualnej',
      description: 'Nasz zespół doświadczonych rzeczników patentowych świadczy kompleksowe usługi w zakresie ochrony własności intelektualnej.',
      services: [
        {
          title: 'Zgłaszanie patentów',
          description: 'Kompleksowa obsługa zgłoszeń patentowych w Polsce, Europie i na świecie'
        },
        {
          title: 'Rejestracja znaków towarowych', 
          description: 'Ochrona marek i znaków towarowych w krajowych i międzynarodowych rejestrach'
        },
        {
          title: 'Wzory przemysłowe',
          description: 'Ochrona wzorów przemysłowych i użytkowych'
        },
        {
          title: 'Obsługa spraw spornych',
          description: 'Reprezentacja w sporach patentowych i procedurach oppositions'
        }
      ],
      contact: 'Skontaktuj się z nami'
    },
    en: {
      title: 'Patent Attorneys',
      subtitle: 'Professional intellectual property services',
      description: 'Our team of experienced patent attorneys provides comprehensive intellectual property protection services.',
      services: [
        {
          title: 'Patent Applications',
          description: 'Comprehensive handling of patent applications in Poland, Europe and worldwide'
        },
        {
          title: 'Trademark Registration',
          description: 'Protection of brands and trademarks in national and international registers'
        },
        {
          title: 'Industrial Designs',
          description: 'Protection of industrial and utility designs'
        },
        {
          title: 'Dispute Resolution',
          description: 'Representation in patent disputes and opposition procedures'
        }
      ],
      contact: 'Contact us'
    },
    de: {
      title: 'Patentanwälte',
      subtitle: 'Professionelle Dienstleistungen im Bereich des geistigen Eigentums',
      description: 'Unser Team erfahrener Patentanwälte bietet umfassende Dienstleistungen zum Schutz des geistigen Eigentums.',
      services: [
        {
          title: 'Patentanmeldungen',
          description: 'Umfassende Bearbeitung von Patentanmeldungen in Polen, Europa und weltweit'
        },
        {
          title: 'Markenregistrierung',
          description: 'Schutz von Marken und Warenzeichen in nationalen und internationalen Registern'
        },
        {
          title: 'Geschmacksmuster',
          description: 'Schutz von Geschmacks- und Gebrauchsmustern'
        },
        {
          title: 'Streitbeilegung',
          description: 'Vertretung in Patentstreitigkeiten und Einspruchsverfahren'
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
        <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
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
            <div className="grid md:grid-cols-2 gap-8">
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