'use client'

import { useLanguage } from '@/context/LanguageContext'
import { Header } from '@/components/Header'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function BioMed() {
  const { currentLanguage } = useLanguage()

  const pageContent = {
    pl: {
      title: 'BioMed',
      subtitle: 'Specjalizacja w biotechnologii i farmaceutyce',
      description: 'Oferujemy wyspecjalizowane usługi w zakresie ochrony własności intelektualnej w sektorze biotechnologii, farmaceutyki i nauk medycznych.',
      services: [
        {
          title: 'Patenty biotechnologiczne',
          description: 'Ochrona wynalazków biotechnologicznych, sekwencji genetycznych i metod diagnostycznych'
        },
        {
          title: 'Patenty farmaceutyczne',
          description: 'Patentowanie leków, kompozycji farmaceutycznych i metod leczenia'
        },
        {
          title: 'Urządzenia medyczne',
          description: 'Ochrona IP dla urządzeń medycznych i technologii zdrowotnych'
        },
        {
          title: 'Regulatory Affairs',
          description: 'Wsparcie w procesach rejestracyjnych i zgodności regulacyjnej'
        },
        {
          title: 'Licencjonowanie biotech',
          description: 'Strukturyzacja umów licencyjnych w branży biotechnologicznej'
        },
        {
          title: 'Due Diligence medyczne',
          description: 'Analiza IP w transakcjach sektora medycznego i biotechnologicznego'
        }
      ],
      expertise: [
        'Biotechnologia',
        'Farmaceutyka', 
        'Urządzenia medyczne',
        'Diagnostyka',
        'Terapie genowe',
        'Nanotechnologia medyczna'
      ],
      contact: 'Skontaktuj się z ekspertami'
    },
    en: {
      title: 'BioMed',
      subtitle: 'Specialization in biotechnology and pharmaceuticals',
      description: 'We offer specialized services in intellectual property protection in biotechnology, pharmaceuticals and medical sciences.',
      services: [
        {
          title: 'Biotechnology Patents',
          description: 'Protection of biotechnological inventions, genetic sequences and diagnostic methods'
        },
        {
          title: 'Pharmaceutical Patents',
          description: 'Patenting of drugs, pharmaceutical compositions and treatment methods'
        },
        {
          title: 'Medical Devices',
          description: 'IP protection for medical devices and health technologies'
        },
        {
          title: 'Regulatory Affairs',
          description: 'Support in registration processes and regulatory compliance'
        },
        {
          title: 'Biotech Licensing',
          description: 'Structuring licensing agreements in biotechnology industry'
        },
        {
          title: 'Medical Due Diligence',
          description: 'IP analysis in medical and biotechnology sector transactions'
        }
      ],
      expertise: [
        'Biotechnology',
        'Pharmaceuticals',
        'Medical devices', 
        'Diagnostics',
        'Gene therapies',
        'Medical nanotechnology'
      ],
      contact: 'Contact experts'
    },
    de: {
      title: 'BioMed',
      subtitle: 'Spezialisierung auf Biotechnologie und Pharmazie',
      description: 'Wir bieten spezialisierte Dienstleistungen im Bereich des Schutzes geistigen Eigentums in Biotechnologie, Pharmazie und Medizinwissenschaften.',
      services: [
        {
          title: 'Biotechnologie-Patente',
          description: 'Schutz biotechnologischer Erfindungen, genetischer Sequenzen und diagnostischer Methoden'
        },
        {
          title: 'Pharmazeutische Patente',
          description: 'Patentierung von Arzneimitteln, pharmazeutischen Zusammensetzungen und Behandlungsmethoden'
        },
        {
          title: 'Medizinische Geräte',
          description: 'IP-Schutz für Medizinprodukte und Gesundheitstechnologien'
        },
        {
          title: 'Regulatory Affairs',
          description: 'Unterstützung bei Registrierungsprozessen und regulatorischer Compliance'
        },
        {
          title: 'Biotech-Lizenzierung',
          description: 'Strukturierung von Lizenzverträgen in der Biotechnologie-Industrie'
        },
        {
          title: 'Medizinische Due Diligence',
          description: 'IP-Analyse bei Transaktionen im Medizin- und Biotechnologiesektor'
        }
      ],
      expertise: [
        'Biotechnologie',
        'Pharmazeutika',
        'Medizinprodukte',
        'Diagnostik', 
        'Gentherapien',
        'Medizinische Nanotechnologie'
      ],
      contact: 'Experten kontaktieren'
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
        <section className="bg-gradient-to-r from-teal-600 to-teal-800 text-white py-20">
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

        {/* Expertise Section */}
        <section className="bg-gray-50 py-16">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">
              {currentLanguage === 'en' ? 'Areas of Expertise' : 
               currentLanguage === 'de' ? 'Fachgebiete' : 'Obszary Specjalizacji'}
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {content.expertise.map((area, index) => (
                <Card key={index} className="text-center">
                  <CardContent className="p-6">
                    <Badge variant="secondary" className="text-lg px-4 py-2">
                      {area}
                    </Badge>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16">
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