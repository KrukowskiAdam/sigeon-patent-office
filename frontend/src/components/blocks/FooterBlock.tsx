import React from 'react'
import Link from 'next/link'
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
      link?: {
        text?: LocalizedString
        url?: string
        openInNewTab?: boolean
      }
    }
    column2?: {
      title?: LocalizedString
      content?: LocalizedRichText
      link?: {
        text?: LocalizedString
        url?: string
        openInNewTab?: boolean
      }
    }
    column3?: {
      title?: LocalizedString
      content?: LocalizedRichText
      link?: {
        text?: LocalizedString
        url?: string
        openInNewTab?: boolean
      }
    }
    column4?: {
      title?: LocalizedString
      content?: LocalizedRichText
      link?: {
        text?: LocalizedString
        url?: string
        openInNewTab?: boolean
      }
    }
  }
  language: Language | string
}

export function FooterBlock({ block, language }: FooterBlockProps) {
  return (
    <section className="py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="py-8 px-8 bg-gray-100">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Column 1 */}
            {block.column1 && (
              <div className="flex flex-col text-center">
                <div className="flex-grow">
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
                {block.column1.link?.text && block.column1.link?.url && (
                  <Link 
                    href={block.column1.link.url}
                    target={block.column1.link.openInNewTab ? '_blank' : undefined}
                    rel={block.column1.link.openInNewTab ? 'noopener noreferrer' : undefined}
                    className="inline-flex items-center gap-1 px-4 py-2 mt-4 bg-[#0abaee] text-white font-bold rounded-md hover:bg-[#0891b2] transition-colors duration-200 text-sm shadow-sm mx-auto"
                  >
                    {getLocalizedText(block.column1.link.text, language as Language)}
                  </Link>
                )}
              </div>
            )}

            {/* Column 2 */}
            {block.column2 && (
              <div className="flex flex-col text-center">
                <div className="flex-grow">
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
                {block.column2.link?.text && block.column2.link?.url && (
                  <Link 
                    href={block.column2.link.url}
                    target={block.column2.link.openInNewTab ? '_blank' : undefined}
                    rel={block.column2.link.openInNewTab ? 'noopener noreferrer' : undefined}
                    className="inline-flex items-center gap-1 px-4 py-2 mt-4 bg-[#0abaee] text-white font-bold rounded-md hover:bg-[#0891b2] transition-colors duration-200 text-sm shadow-sm mx-auto"
                  >
                    {getLocalizedText(block.column2.link.text, language as Language)}
                  </Link>
                )}
              </div>
            )}

            {/* Column 3 */}
            {block.column3 && (
              <div className="flex flex-col text-center">
                <div className="flex-grow">
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
                {block.column3.link?.text && block.column3.link?.url && (
                  <Link 
                    href={block.column3.link.url}
                    target={block.column3.link.openInNewTab ? '_blank' : undefined}
                    rel={block.column3.link.openInNewTab ? 'noopener noreferrer' : undefined}
                    className="inline-flex items-center gap-1 px-4 py-2 mt-4 bg-[#0abaee] text-white font-bold rounded-md hover:bg-[#0891b2] transition-colors duration-200 text-sm shadow-sm mx-auto"
                  >
                    {getLocalizedText(block.column3.link.text, language as Language)}
                  </Link>
                )}
              </div>
            )}

            {/* Column 4 */}
            {block.column4 && (
              <div className="flex flex-col text-center">
                <div className="flex-grow">
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
                {block.column4.link?.text && block.column4.link?.url && (
                  <Link 
                    href={block.column4.link.url}
                    target={block.column4.link.openInNewTab ? '_blank' : undefined}
                    rel={block.column4.link.openInNewTab ? 'noopener noreferrer' : undefined}
                    className="inline-flex items-center gap-1 px-4 py-2 mt-4 bg-[#0abaee] text-white font-bold rounded-md hover:bg-[#0891b2] transition-colors duration-200 text-sm shadow-sm mx-auto"
                  >
                    {getLocalizedText(block.column4.link.text, language as Language)}
                  </Link>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
