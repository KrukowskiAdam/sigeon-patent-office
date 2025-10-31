import React from 'react'
import { getLocalizedText } from '@/lib/i18n'
import { Language } from '@/context/LanguageContext'
import { PortableText } from '@/components/ui/PortableText'
import { getLocalizedPortableText } from '@/lib/portableText'
import { LocalizedString, LocalizedRichText } from '@/types/sanity'

interface FooterBlockProps {
  block: {
    _type: 'footerBlock'
    _key: string
    column1?: {
      title?: LocalizedString
      content?: LocalizedRichText
    }
    column2?: {
      title?: LocalizedString
      content?: LocalizedRichText
    }
    column3?: {
      title?: LocalizedString
      content?: LocalizedRichText
    }
    column4?: {
      title?: LocalizedString
      content?: LocalizedRichText
    }
  }
  language: Language | string
}

export function FooterBlock({ block, language }: FooterBlockProps) {
  return (
    <section className="py-8" style={{backgroundColor: '#d3dae4'}}>
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 py-8">
          {/* Column 1 */}
          {block.column1 && (
            <div>
              {block.column1.title && (
                <h4 className="font-semibold mb-4 text-gray-900">
                  {getLocalizedText(block.column1.title, language as Language)}
                </h4>
              )}
              {block.column1.content && (
                <div className="text-gray-700 text-sm">
                  <PortableText 
                    value={getLocalizedPortableText(block.column1.content, language as Language)}
                  />
                </div>
              )}
            </div>
          )}

          {/* Column 2 */}
          {block.column2 && (
            <div>
              {block.column2.title && (
                <h4 className="font-semibold mb-4 text-gray-900">
                  {getLocalizedText(block.column2.title, language as Language)}
                </h4>
              )}
              {block.column2.content && (
                <div className="text-gray-700 text-sm">
                  <PortableText 
                    value={getLocalizedPortableText(block.column2.content, language as Language)}
                  />
                </div>
              )}
            </div>
          )}

          {/* Column 3 */}
          {block.column3 && (
            <div>
              {block.column3.title && (
                <h4 className="font-semibold mb-4 text-gray-900">
                  {getLocalizedText(block.column3.title, language as Language)}
                </h4>
              )}
              {block.column3.content && (
                <div className="text-gray-700 text-sm">
                  <PortableText 
                    value={getLocalizedPortableText(block.column3.content, language as Language)}
                  />
                </div>
              )}
            </div>
          )}

          {/* Column 4 */}
          {block.column4 && (
            <div>
              {block.column4.title && (
                <h4 className="font-semibold mb-4 text-gray-900">
                  {getLocalizedText(block.column4.title, language as Language)}
                </h4>
              )}
              {block.column4.content && (
                <div className="text-gray-700 text-sm">
                  <PortableText 
                    value={getLocalizedPortableText(block.column4.content, language as Language)}
                  />
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
