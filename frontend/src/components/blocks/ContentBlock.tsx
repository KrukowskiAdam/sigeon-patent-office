import React from 'react'
import { ContentBlock as ContentBlockType, TextBlock as TextBlockType, TextImageBlock as TextImageBlockType, TextImageCarouselBlock as TextImageCarouselBlockType, TwoColumnTextBlock as TwoColumnTextBlockType, HeroBlock as HeroBlockType, BannerBlock as BannerBlockType, ServicesBlock as ServicesBlockType, CodeBlock as CodeBlockType } from '@/types/sanity'
import { BannerBlock } from './BannerBlock'
import { TextImageCarouselBlock } from './TextImageCarouselBlock'
import { TextImageBlock } from './TextImageBlock'
import TwoColumnTextBlockComponent from './TwoColumnTextBlock'
import { HeroBlock } from './HeroBlock'
import { ServicesBlock } from './ServicesBlock'
import { CodeBlock } from './CodeBlock'
import { ContactBlock } from './ContactBlock'
import { FooterBlock } from './FooterBlock'
import { getLocalizedText } from '@/lib/i18n'
import { PortableText } from '../ui/PortableText'
import { Language } from '@/context/LanguageContext'
import { getLocalizedPortableText } from '@/lib/portableText'
import { getLinkHref, shouldOpenInNewTab } from '@/utils/linkUtils'

interface ContentBlockProps {
  block: ContentBlockType
  language: string
}

// Inline TextBlock component
function TextBlock({ block, language }: { block: TextBlockType; language: string }) {
  const lang = language as Language
  
  // Check if content exists in current language (without fallback)
  const titleInCurrentLang = block.title?.[lang] || ''
  const contentInCurrentLang = block.content?.[lang] || null
  
  // Hide block if no content in current language
  if (!titleInCurrentLang && (!contentInCurrentLang || contentInCurrentLang.length === 0)) {
    return null
  }
  
  // Get localized content (with fallback for rendering)
  const title = block.title ? getLocalizedText(block.title, lang) : ''
  const content = block.content ? getLocalizedPortableText(block.content, lang) : null

  const alignmentClass = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right'
  }[block.alignment || 'left']

  return (
    <section className="py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className={`prose max-w-none ${alignmentClass}`}>
          {title && (
            <div className="flex items-stretch gap-4 mb-8">
              <div className="w-1 bg-[#0abaee] flex-shrink-0"></div>
              <h2 className="text-2xl font-semibold text-gray-800 leading-none">
                {title}
              </h2>
            </div>
          )}
          {content && (
            <div className="text-gray-700">
              <PortableText value={content} />
            </div>
          )}
          
          {block.link && block.link.text && (
            <div className={`mt-8 ${alignmentClass}`}>
              <a
                href={getLinkHref(block.link)}
                target={shouldOpenInNewTab(block.link) ? '_blank' : '_self'}
                rel={shouldOpenInNewTab(block.link) ? 'noopener noreferrer' : undefined}
                className="inline-flex items-center gap-2 px-6 py-2 bg-[#0abaee] text-white font-medium rounded-lg hover:bg-[#0891b2] transition-colors duration-200"
              >
                {getLocalizedText(block.link.text, language as Language)}
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




export function ContentBlock({ block, language }: ContentBlockProps) {
  switch (block._type) {
    case 'textBlock':
      return <TextBlock block={block} language={language} />
    case 'heroBlock':
      return <HeroBlock block={block as HeroBlockType} language={language} />
    case 'textImageBlock':
      return <TextImageBlock block={block as TextImageBlockType} language={language} />
    case 'textImageCarouselBlock':
      return <TextImageCarouselBlock block={block as TextImageCarouselBlockType} language={language as Language} />
    case 'twoColumnTextBlock':
      return <TwoColumnTextBlockComponent block={block as TwoColumnTextBlockType} language={language} />
    case 'servicesBlock':
      return <ServicesBlock block={block as ServicesBlockType} language={language} />
    case 'bannerBlock':
      return <BannerBlock {...(block as BannerBlockType)} />
    case 'codeBlock':
      return <CodeBlock block={block as CodeBlockType} language={language} />
    case 'contactBlock':
      return <ContactBlock language={language} />
    case 'footerBlock':
      return <FooterBlock block={block} language={language} />
    default:
      console.warn(`Unknown block type`)
      return null
  }
}