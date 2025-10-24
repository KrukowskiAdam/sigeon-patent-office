import React from 'react'
import { TextImageBlock as TextImageBlockType } from '@/types/sanity'
import { getLocalizedText } from '@/lib/i18n'
import { PortableText } from '../ui/PortableText'
import { Language } from '@/context/LanguageContext'
import { getLocalizedPortableText } from '@/lib/portableText'
import Image from 'next/image'
import { urlFor } from '@/lib/sanity'
import { getLinkHref, shouldOpenInNewTab } from '@/utils/linkUtils'

interface TextImageBlockProps {
  block: TextImageBlockType
  language: string
}

export function TextImageBlock({ block, language }: TextImageBlockProps) {
  const isImageLeft = block.layout === 'image-left'
  const sizeClasses = {
    small: isImageLeft ? 'md:w-1/3' : 'md:w-1/3',
    medium: isImageLeft ? 'md:w-1/2' : 'md:w-1/2',
    large: isImageLeft ? 'md:w-2/3' : 'md:w-2/3'
  }[block.imageSize || 'medium']

  const textSizeClasses = {
    small: isImageLeft ? 'md:w-2/3' : 'md:w-2/3',
    medium: isImageLeft ? 'md:w-1/2' : 'md:w-1/2',
    large: isImageLeft ? 'md:w-1/3' : 'md:w-1/3'
  }[block.imageSize || 'medium']

  return (
    <section className="py-16">
      <div className="max-w-6xl mx-auto px-4">
        <div className={`flex flex-col md:flex-row items-center gap-12 ${
          isImageLeft ? 'md:flex-row' : 'md:flex-row-reverse'
        }`}>
          {/* Text Content */}
          <div className={`${textSizeClasses} space-y-6`}>
            {block.title && (
              <div className="flex items-center gap-4 mb-6">
                <div className="w-1 h-[1.25em] bg-[#0abaee]"></div>
                <h2 className="text-3xl font-bold text-gray-900">
                  {getLocalizedText(block.title, language as Language)}
                </h2>
              </div>
            )}
            <div className="prose text-gray-700">
              <PortableText 
                value={getLocalizedPortableText(block.content, language as Language)}
              />
            </div>
            
            {block.link && block.link.text && (
              <div className="mt-6">
                <a
                  href={getLinkHref(block.link)}
                  target={shouldOpenInNewTab(block.link) ? '_blank' : '_self'}
                  rel={shouldOpenInNewTab(block.link) ? 'noopener noreferrer' : undefined}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-[#0abaee] text-white font-medium rounded-lg hover:bg-[#0891b2] transition-colors duration-200"
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

          {/* Image */}
          <div className={`${sizeClasses}`}>
            <div className="relative aspect-video overflow-hidden">
              <Image
                src={urlFor(block.image).width(800).height(450).url()}
                alt={block.imageAlt ? getLocalizedText(block.imageAlt, language as Language) : ''}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}