import { Page } from '@/types/sanity'
import { Language } from '@/context/LanguageContext'
import { ContentBlock } from '@/components/blocks'
import { getLocalizedText } from '@/lib/i18n'
import Link from 'next/link'

interface RegularPageComponentProps {
  page: Page
  currentLanguage: Language
}

export function RegularPageComponent({ page, currentLanguage }: RegularPageComponentProps) {
  return (
    <div>
      {/* Content Blocks */}
      {page.content && page.content.length > 0 && (
        <div>
          {page.content.map((block) => (
            <ContentBlock 
              key={block._key} 
              block={block} 
              language={currentLanguage} 
            />
          ))}
        </div>
      )}

      {/* Back to Home Button */}
      {page.buttons?.backToHome && (
        <section className="py-8">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mt-12 pt-8 border-t border-gray-200">
              <Link 
                href="/"
                className="inline-flex items-center gap-2 px-6 py-2 bg-[#0abaee] text-white font-medium rounded-lg hover:bg-[#0891b2] transition-colors duration-200"
              >
                {getLocalizedText(page.buttons.backToHome, currentLanguage)}
              </Link>
            </div>
          </div>
        </section>
      )}
    </div>
  )
}