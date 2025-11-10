'use client'

import { TwoColumnTextBlock, LocalizedRichText, LocalizedString } from '@/types/sanity'
import { PortableText } from '../ui/PortableText'
import { getLocalizedPortableText } from '@/lib/portableText'
import { Language } from '@/context/LanguageContext'

interface TwoColumnTextBlockProps {
  block: TwoColumnTextBlock
  language: string
}

export default function TwoColumnTextBlockComponent({ block, language }: TwoColumnTextBlockProps) {
  // Safety check
  if (!Array.isArray(block.leftColumn) || !Array.isArray(block.rightColumn)) {
    console.error('TwoColumnTextBlock: columns are not arrays')
    return null
  }

  if (block.leftColumn.length === 0 && block.rightColumn.length === 0) {
    console.error('TwoColumnTextBlock: no items in either column')
    return null
  }

  // Helper function to check if content exists in current language
  const hasContentInLanguage = (content: LocalizedRichText): boolean => {
    const lang = language as keyof LocalizedRichText
    return content && content[lang] !== undefined && Array.isArray(content[lang]) && (content[lang] as unknown[]).length > 0
  }

  // Helper function to check if title exists in current language
  const getTitleInLanguage = (title: LocalizedString | undefined): string | null => {
    if (!title) return null
    const lang = language as keyof LocalizedString
    // Only return title if it exists in current language, no fallback
    return title[lang] || null
  }

  // Filter items that have content in current language
  const filteredLeftColumn = block.leftColumn.filter(item => hasContentInLanguage(item.content))
  const filteredRightColumn = block.rightColumn.filter(item => hasContentInLanguage(item.content))

  // If no items in current language, don't render the block
  if (filteredLeftColumn.length === 0 && filteredRightColumn.length === 0) {
    return null
  }

  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4">
        {/* Two columns layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left Column */}
          <div className="space-y-0">
            {filteredLeftColumn.map((item) => {
              const itemBg = item.backgroundColor === 'gray' ? 'bg-gray-100' : 'bg-white'
              const titleText = getTitleInLanguage(item.title)
              return (
                <div key={item._key} className={`${itemBg} p-8 space-y-4`}>
                  {titleText && (
                    <div className="flex items-stretch gap-4">
                      <div className="w-1 bg-[#0abaee] flex-shrink-0"></div>
                      <h3 className="text-xl font-bold text-gray-900 leading-none">
                        {titleText}
                      </h3>
                    </div>
                  )}
                  <div className="prose max-w-none text-gray-700">
                    <PortableText 
                      value={getLocalizedPortableText(item.content, language as Language)}
                    />
                  </div>
                </div>
              )
            })}
          </div>

          {/* Right Column */}
          <div className="space-y-0">
            {filteredRightColumn.map((item) => {
              const itemBg = item.backgroundColor === 'gray' ? 'bg-gray-100' : 'bg-white'
              const titleText = getTitleInLanguage(item.title)
              return (
                <div key={item._key} className={`${itemBg} p-8 space-y-4`}>
                  {titleText && (
                    <div className="flex items-stretch gap-4">
                      <div className="w-1 bg-[#0abaee] flex-shrink-0"></div>
                      <h3 className="text-xl font-bold text-gray-900 leading-none">
                        {titleText}
                      </h3>
                    </div>
                  )}
                  <div className="prose max-w-none text-gray-700">
                    <PortableText 
                      value={getLocalizedPortableText(item.content, language as Language)}
                    />
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
