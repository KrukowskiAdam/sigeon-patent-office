import React from 'react'
import { TextImageBlock as TextImageBlockType } from '@/types/sanity'
import { getLocalizedText } from '@/lib/i18n'
import { PortableText } from '@portabletext/react'
import { Language } from '@/context/LanguageContext'
import { getLocalizedPortableText } from '@/lib/portableText'
import Image from 'next/image'
import { urlFor } from '@/lib/sanity'

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
              <h2 className="text-3xl font-bold text-gray-900">
                {getLocalizedText(block.title, language as Language)}
              </h2>
            )}
            <div className="prose text-gray-700">
              <PortableText 
                value={getLocalizedPortableText(block.content, language as Language)}
              />
            </div>
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