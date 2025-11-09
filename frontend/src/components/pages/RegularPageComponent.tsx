import { Page } from '@/types/sanity'
import { Language } from '@/context/LanguageContext'
import { ContentBlock } from '@/components/blocks'

interface RegularPageComponentProps {
  page: Page
  currentLanguage: Language
}

export function RegularPageComponent({ page, currentLanguage }: RegularPageComponentProps) {
  return (
    <div>
      {/* Page Title */}
      {page.internalTitle && (
        <div className="bg-gray-50 py-12">
          <div className="max-w-7xl mx-auto px-4">
            <h1 className="text-4xl font-bold text-gray-900 text-center">
              {page.internalTitle}
            </h1>
          </div>
        </div>
      )}

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
    </div>
  )
}