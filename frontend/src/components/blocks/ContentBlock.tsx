import React from 'react'
import { ContentBlock as ContentBlockType, TextBlock as TextBlockType, TextImageBlock as TextImageBlockType, HeroBlock as HeroBlockType, BannerBlock as BannerBlockType } from '@/types/sanity'
import { BannerBlock } from './BannerBlock'
import { getLocalizedText } from '@/lib/i18n'
import { PortableText } from '@portabletext/react'
import { Language } from '@/context/LanguageContext'
import { getLocalizedPortableText } from '@/lib/portableText'
import Image from 'next/image'
import { urlFor } from '@/lib/sanity'

interface ContentBlockProps {
  block: ContentBlockType
  language: string
}

// Inline TextBlock component
function TextBlock({ block, language }: { block: TextBlockType; language: string }) {
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
            <h2 className="text-3xl font-semibold mb-8 text-gray-800 leading-tight">
              {getLocalizedText(block.title, language as Language)}
            </h2>
          )}
          <div className="text-gray-700">
            <PortableText value={getLocalizedPortableText(block.content, language as Language)} />
          </div>
        </div>
      </div>
    </section>
  )
}

// Inline TextImageBlock component
function TextImageBlock({ block, language }: { block: TextImageBlockType; language: string }) {
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
              <h2 className="text-3xl font-semibold text-gray-800 leading-tight">
                {getLocalizedText(block.title, language as Language)}
              </h2>
            )}
            <div className="prose text-gray-600">
              <PortableText value={getLocalizedPortableText(block.content, language as Language)} />
            </div>
          </div>

          {/* Image */}
          <div className={`${sizeClasses}`}>
            <div className="relative aspect-video rounded-lg overflow-hidden shadow-lg">
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

// Inline HeroBlock component
function HeroBlock({ block, language }: { block: HeroBlockType; language: string }) {
  const backgroundColorClasses = {
    primary: 'bg-gradient-to-r from-[#0abaee] to-[#0891b2]',
    dark: 'bg-gradient-to-r from-[#0891b2] to-[#065f7a]',
    light: 'bg-gradient-to-r from-[#38bdf8] to-[#0abaee]',
    gray: 'bg-gradient-to-r from-gray-500 to-gray-700',
    white: 'bg-white'
  }[block.backgroundColor || 'primary']

  const textColorClasses = {
    white: 'text-white',
    dark: 'text-gray-700',
    gray: 'text-gray-600'
  }[block.textColor || 'white']

  const heightClasses = {
    small: 'py-20',
    medium: 'py-32',
    large: 'py-48',
    full: 'min-h-screen flex items-center'
  }[block.height || 'medium']

  return (
    <section className={`relative ${backgroundColorClasses} ${heightClasses} ${textColorClasses}`}>
      {block.backgroundImage && (
        <div className="absolute inset-0">
          <Image
            src={urlFor(block.backgroundImage).width(1920).height(1080).url()}
            alt=""
            fill
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>
      )}
      <div className="relative max-w-6xl mx-auto px-4 text-center">
        <h1 className="text-4xl md:text-6xl font-semibold mb-6 tracking-tight">
          {getLocalizedText(block.title, language as Language)}
        </h1>
        {block.subtitle && (
          <p className="text-xl md:text-2xl mb-8 opacity-90 font-normal leading-relaxed">
            {getLocalizedText(block.subtitle, language as Language)}
          </p>
        )}
        {block.content && (
          <div className="prose prose-lg mx-auto text-inherit">
            <PortableText value={getLocalizedPortableText(block.content, language as Language)} />
          </div>
        )}
      </div>
    </section>
  )
}

export function ContentBlock({ block, language }: ContentBlockProps) {
  switch (block._type) {
    case 'textBlock':
      return <TextBlock block={block} language={language} />
    case 'heroBlock':
      return <HeroBlock block={block} language={language} />
    case 'textImageBlock':
      return <TextImageBlock block={block} language={language} />
    case 'servicesBlock':
      return (
        <div className="py-16 text-center">
          <p>Component &quot;servicesBlock&quot; not yet implemented</p>
        </div>
      )
    case 'bannerBlock':
      return <BannerBlock {...(block as BannerBlockType)} />
    default:
      console.warn(`Unknown block type`)
      return null
  }
}