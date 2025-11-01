'use client'

import { TwoColumnTextBlock, LocalizedString, LocalizedRichText } from '@/types/sanity'
import { PortableText } from '../ui/PortableText'
import { getLocalizedText } from '@/lib/i18n'
import { getLocalizedPortableText } from '@/lib/portableText'
import { Language } from '@/context/LanguageContext'

interface TwoColumnTextBlockProps {
  block: TwoColumnTextBlock
  language: string
}

export default function TwoColumnTextBlockComponent({ block, language }: TwoColumnTextBlockProps) {
  // Debug log
  console.log('TwoColumnTextBlock received:', JSON.stringify(block, null, 2))
  
  // Handle old structure (array) vs new structure (object with items)
  type ItemType = { _key: string; title?: LocalizedString; content: LocalizedRichText }
  let leftItems: ItemType[] = []
  let rightItems: ItemType[] = []
  let leftBg = 'bg-white'
  let rightBg = 'bg-white'
  
  // Check if it's the new structure (object with items)
  if (block.leftColumn && typeof block.leftColumn === 'object' && 'items' in block.leftColumn) {
    leftItems = block.leftColumn.items || []
    leftBg = block.leftColumn.backgroundColor === 'gray' ? 'bg-gray-100' : 'bg-white'
  }
  // Old structure (direct array) - fallback
  else if (Array.isArray(block.leftColumn)) {
    leftItems = block.leftColumn as ItemType[]
  }
  
  // Check if it's the new structure (object with items)
  if (block.rightColumn && typeof block.rightColumn === 'object' && 'items' in block.rightColumn) {
    rightItems = block.rightColumn.items || []
    rightBg = block.rightColumn.backgroundColor === 'gray' ? 'bg-gray-100' : 'bg-white'
  }
  // Old structure (direct array) - fallback
  else if (Array.isArray(block.rightColumn)) {
    rightItems = block.rightColumn as ItemType[]
  }
  
  // Safety check
  if (leftItems.length === 0 && rightItems.length === 0) {
    console.error('TwoColumnTextBlock: no items in either column')
    return null
  }

  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Two columns layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
          {/* Left Column */}
          <div className={`${leftBg} p-8 space-y-8`}>
            {leftItems.map((item) => (
              <div key={item._key} className="space-y-4">
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
            ))}
          </div>

          {/* Right Column */}
          <div className={`${rightBg} p-8 space-y-8`}>
            {rightItems.map((item) => (
              <div key={item._key} className="space-y-4">
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
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
