'use client'

import { TwoColumnTextBlock } from '@/types/sanity'
import { PortableText } from '../ui/PortableText'
import { getLocalizedText } from '@/lib/i18n'
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
  const hasContentInLanguage = (content: { [key: string]: unknown[] | undefined }) => {
    const lang = language as keyof typeof content
    return content && content[lang] && Array.isArray(content[lang]) && content[lang].length > 0
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
              return (
                <div key={item._key} className={`${itemBg} p-8 space-y-4`}>
                  {item.title && (
                    <div className="flex items-stretch gap-4">
                      <div className="w-1 bg-[#0abaee] flex-shrink-0"></div>
                      <h3 className="text-xl font-bold text-gray-900 leading-none">
                        {getLocalizedText(item.title, language as Language)}
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
              return (
                <div key={item._key} className={`${itemBg} p-8 space-y-4`}>
                  {item.title && (
                    <div className="flex items-stretch gap-4">
                      <div className="w-1 bg-[#0abaee] flex-shrink-0"></div>
                      <h3 className="text-xl font-bold text-gray-900 leading-none">
                        {getLocalizedText(item.title, language as Language)}
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
