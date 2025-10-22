import React from 'react'
import { HeroBlock as HeroBlockType } from '@/types/sanity'
import { getLocalizedText } from '@/lib/i18n'
import { PortableText } from '@portabletext/react'
import { Language } from '@/context/LanguageContext'
import { getLocalizedPortableText } from '@/lib/portableText'
import Image from 'next/image'
import { urlFor } from '@/lib/sanity'

interface HeroBlockProps {
  block: HeroBlockType
  language: string
}

export function HeroBlock({ block, language }: HeroBlockProps) {
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
      {/* Background Image */}
      {block.backgroundImage && (
        <div className="absolute inset-0">
          <Image
            src={urlFor(block.backgroundImage).width(1920).height(1080).url()}
            alt=""
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>
      )}

      {/* Content */}
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
            <PortableText 
              value={getLocalizedPortableText(block.content, language)}
            />
          </div>
        )}
      </div>
    </section>
  )
}