import { TeamPage } from '@/types/sanity'
import { Language } from '@/context/LanguageContext'
import { ContentBlock } from '@/components/blocks'
import Link from 'next/link'

interface TeamPageComponentProps {
  page: TeamPage
  currentLanguage: Language
}

export function TeamPageComponent({ page, currentLanguage }: TeamPageComponentProps) {
  return (
    <div>
      {/* Content Blocks */}
      {page.blocks && page.blocks.length > 0 && (
        <div>
          {page.blocks.map((block) => (
            <ContentBlock 
              key={block._key} 
              block={block} 
              language={currentLanguage} 
            />
          ))}
        </div>
      )}

      {/* Team Section */}
      {page.teamSection?.showTeam && (
        <section className="py-16 bg-white">
          <div className="max-w-6xl mx-auto px-4">
            <div className="text-center">
              <p className="text-gray-600">
                Zespół będzie wyświetlony tutaj (wymagana implementacja komponentu TeamGrid)
              </p>
            </div>
          </div>
        </section>
      )}

      {/* Navigation Section */}
      <section className="py-8">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center pt-8 border-t border-gray-200">
            <Link
              href="/"
              className="inline-block text-white font-medium py-3 px-8 rounded-lg transition-colors bg-[#0abaee] hover:bg-[#0891b2]"
            >
              Strona główna
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}