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
  return (
    <section className="relative bg-white py-8 text-gray-700">


      {/* Content */}
      <div className="relative max-w-7xl mx-auto px-4">
        <div className="max-w-4xl">
          {/* Title with blue line */}
          <div className="flex items-stretch gap-4 mb-6">
            <div className="w-1 bg-[#0abaee] flex-shrink-0"></div>
            <h1 className="text-2xl font-bold text-gray-800 leading-none">
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