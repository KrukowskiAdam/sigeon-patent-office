import React from 'react'
import { TextBlock as TextBlockType } from '@/types/sanity'
import { getLocalizedText } from '@/lib/i18n'
import { PortableText } from '@portabletext/react'
import { Language } from '@/context/LanguageContext'
import { getLocalizedPortableText } from '@/lib/portableText'

interface TextBlockProps {
  block: TextBlockType
  language: string
}

export function TextBlock({ block, language }: TextBlockProps) {
  const alignmentClass = {
    left: 'text-left',
    center: 'text-center', 
    right: 'text-right'
  }[block.alignment || 'left']

  return (
    <section className="py-16">
      <div className="max-w-4xl mx-auto px-4">
        <div className={`prose max-w-none ${alignmentClass}`}>
          {block.title && (
            <h2 className="text-3xl font-bold mb-8">
              {getLocalizedText(block.title, language as Language)}
            </h2>
          )}
          <div className="text-gray-700">
            <PortableText 
              value={getLocalizedPortableText(block.content, language)}
            />
          </div>
        </div>
      </div>
    </section>
  )
}