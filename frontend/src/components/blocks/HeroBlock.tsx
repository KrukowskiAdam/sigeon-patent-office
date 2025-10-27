import React from 'react'
import { HeroBlock as HeroBlockType } from '@/types/sanity'
import { getLocalizedText } from '@/lib/i18n'
import { PortableText } from '@portabletext/react'
import { Language } from '@/context/LanguageContext'
import { getLocalizedPortableText } from '@/lib/portableText'

interface HeroBlockProps {
  block: HeroBlockType
  language: string
}

export function HeroBlock({ block, language }: HeroBlockProps) {
  const heightClasses = {
    small: 'py-10',
    medium: 'py-16',
    large: 'py-24',
    full: 'py-32'
  }[block.height || 'medium']

  return (
    <section className={`relative bg-white ${heightClasses} text-gray-700`}>


      {/* Content */}
      <div className="relative max-w-7xl mx-auto px-4">
        <div className="max-w-4xl">
          {/* Title with blue line */}
          <div className="flex items-center gap-4 mb-6">
            <div className="w-1 h-[1.25em] bg-[#0abaee]"></div>
            <h1 className="text-3xl font-bold text-gray-800">
              {getLocalizedText(block.title, language as Language)}
            </h1>
          </div>

          {/* Content */}
          {block.content && (
            <div className="prose max-w-none text-gray-700">
              <PortableText 
                value={getLocalizedPortableText(block.content, language as Language)}
              />
            </div>
          )}
        </div>
      </div>
    </section>
  )
}