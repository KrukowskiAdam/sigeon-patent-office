import React from 'react'
import { ServicesBlock as ServicesBlockType } from '@/types/sanity'
import { getLocalizedText } from '@/lib/i18n'
import { PortableText } from '@portabletext/react'
import { Language } from '@/context/LanguageContext'
import { getLocalizedPortableText } from '@/lib/portableText'
import Image from 'next/image'
import { urlFor } from '@/lib/sanity'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

interface ServicesBlockProps {
  block: ServicesBlockType
  language: string
}

export function ServicesBlock({ block, language }: ServicesBlockProps) {
  const layoutClasses = {
    'grid-2': 'grid-cols-1 md:grid-cols-2',
    'grid-3': 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    'grid-4': 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
    'list': 'grid-cols-1'
  }[block.layout || 'grid-3']

  return (
    <section className="py-16">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          {block.title && (
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {getLocalizedText(block.title, language as Language)}
            </h2>
          )}
          {block.subtitle && (
            <p className="text-xl text-gray-600">
              {getLocalizedText(block.subtitle, language as Language)}
            </p>
          )}
        </div>

        {/* Services Grid */}
        <div className={`grid ${layoutClasses} gap-8`}>
          {block.services.map((service, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center gap-4 mb-4">
                  {service.icon && (
                    <div className="w-12 h-12 relative flex-shrink-0">
                      <Image
                        src={urlFor(service.icon).width(48).height(48).url()}
                        alt=""
                        fill
                        sizes="48px"
                        className="object-contain"
                      />
                    </div>
                  )}
                  <CardTitle className="flex-1">
                    {getLocalizedText(service.title, language as Language)}
                  </CardTitle>
                </div>
              </CardHeader>
              {service.description && (
                <CardContent>
                  <div className="text-gray-600 prose prose-sm">
                    <PortableText 
                      value={getLocalizedPortableText(service.description, language as Language)}
                    />
                  </div>
                </CardContent>
              )}
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}