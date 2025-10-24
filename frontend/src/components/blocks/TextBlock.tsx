import React from 'react'
import { TextBlock as TextBlockType } from '@/types/sanity'
import { getLocalizedText } from '@/lib/i18n'
import { Language } from '@/context/LanguageContext'
import { getLocalizedPortableText } from '@/lib/portableText'
import { PortableText } from '../ui/PortableText'
import { getLinkHref, shouldOpenInNewTab } from '@/utils/linkUtils'

interface TextBlockProps {
  block: TextBlockType
  language: Language
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
            <div className="flex items-center gap-4 mb-8">
              <div className="w-1 h-[1.25em] bg-[#0abaee]"></div>
              <h2 className="text-3xl font-bold text-gray-800">
                {getLocalizedText(block.title, language as Language)}
              </h2>
            </div>
          )}
          <div className="text-gray-700">
            <PortableText 
              value={getLocalizedPortableText(block.content, language)}
            />
          </div>
          
          {block.link && block.link.text && (
            <div className={`mt-8 ${alignmentClass}`}>
              <a
                href={getLinkHref(block.link)}
                target={shouldOpenInNewTab(block.link) ? '_blank' : '_self'}
                rel={shouldOpenInNewTab(block.link) ? 'noopener noreferrer' : undefined}
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#0abaee] text-white font-medium rounded-lg hover:bg-[#0891b2] transition-colors duration-200"
              >
                {getLocalizedText(block.link.text, language)}
                {shouldOpenInNewTab(block.link) && (
                  <svg 
                    className="w-4 h-4" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" 
                    />
                  </svg>
                )}
              </a>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}