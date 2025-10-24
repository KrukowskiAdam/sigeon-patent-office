import React, { useState } from 'react'
import { TextImageCarouselBlock as TextImageCarouselBlockType } from '@/types/sanity'
import { getLocalizedText } from '@/lib/i18n'
import { Language } from '@/context/LanguageContext'
import { getLocalizedPortableText } from '@/lib/portableText'
import Image from 'next/image'
import { urlFor } from '@/lib/sanity'
import { getLinkHref, shouldOpenInNewTab } from '@/utils/linkUtils'
import { PortableText } from '../ui/PortableText'
import { Button } from '@/components/ui/button'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useEffect } from 'react'

interface TextImageCarouselBlockProps {
  block: TextImageCarouselBlockType
  language: Language
}

export function TextImageCarouselBlock({ block, language }: TextImageCarouselBlockProps) {
  const [currentSlide, setCurrentSlide] = useState(0)
  const settings = block.carouselSettings || {}

  useEffect(() => {
    if (settings.autoplay && block.slides.length > 1) {
      const timer = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % block.slides.length)
      }, (settings.autoplayDelay || 5) * 1000)
      return () => clearInterval(timer)
    }
  }, [settings.autoplay, settings.autoplayDelay, block.slides.length])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % block.slides.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + block.slides.length) % block.slides.length)
  }

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
  }

  return (
    <section className="py-16">
      <div className="max-w-6xl mx-auto px-4">
        {/* Section Title */}
        {block.title && (
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-4 mb-4">
              <div className="w-1 h-[1.25em] bg-[#0abaee]"></div>
              <h2 className="text-3xl font-bold text-gray-800">
                {getLocalizedText(block.title, language)}
              </h2>
            </div>
          </div>
        )}

        {/* Carousel with pure CSS fade like BannerBlock */}
        <div className="relative">
          {/* Ghost slide to set container height */}
          <div className="opacity-0 pointer-events-none" aria-hidden="true">
            <div className="flex flex-col md:flex-row items-center gap-12 p-8">
              <div className="md:w-1/2 space-y-6">
                <div className="h-8"></div>
                <div className="h-20"></div>
                <div className="h-12"></div>
              </div>
              <div className="md:w-1/2">
                <div className="relative aspect-video"></div>
              </div>
            </div>
          </div>
          
          {block.slides.map((slide, index) => {
              const isImageLeft = slide.layout === 'image-left'
              const sizeClasses = {
                small: isImageLeft ? 'md:w-1/3' : 'md:w-1/3',
                medium: isImageLeft ? 'md:w-1/2' : 'md:w-1/2',
                large: isImageLeft ? 'md:w-2/3' : 'md:w-2/3'
              }[slide.imageSize || 'medium']

              const textSizeClasses = {
                small: isImageLeft ? 'md:w-2/3' : 'md:w-2/3',
                medium: isImageLeft ? 'md:w-1/2' : 'md:w-1/2',
                large: isImageLeft ? 'md:w-1/3' : 'md:w-1/3'
              }[slide.imageSize || 'medium']

              return (
                <div 
                  key={slide._key || index}
                  className={`absolute top-0 left-0 w-full transition-opacity duration-700 ease-in-out ${
                    index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
                  }`}
                >
                  <div className={`flex flex-col md:flex-row items-center gap-12 p-8 ${
                    isImageLeft ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}>
                    {/* Text Content */}
                    <div className={`${textSizeClasses} space-y-6 transition-all duration-500 ${
                      index === currentSlide ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
                    }`}>
                      {slide.title && (
                        <div className="flex items-center gap-4 mb-6">
                          <div className="w-1 h-[1.25em] bg-[#0abaee]"></div>
                          <h3 className="text-2xl font-bold text-gray-900">
                            {getLocalizedText(slide.title, language)}
                          </h3>
                        </div>
                      )}
                      <div className="prose text-gray-700">
                        <PortableText 
                          value={getLocalizedPortableText(slide.content, language)}
                        />
                      </div>
                      
                      {slide.link && slide.link.text && (
                        <div className="mt-6">
                          <a
                            href={getLinkHref(slide.link)}
                            target={shouldOpenInNewTab(slide.link) ? '_blank' : '_self'}
                            rel={shouldOpenInNewTab(slide.link) ? 'noopener noreferrer' : undefined}
                            className="inline-flex items-center gap-2 px-6 py-3 bg-[#0abaee] text-white font-medium rounded-lg hover:bg-[#0891b2] transition-colors duration-200"
                          >
                            {getLocalizedText(slide.link.text, language)}
                            {shouldOpenInNewTab(slide.link) && (
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
                    <div className={`${sizeClasses} transition-all duration-500 ${
                      index === currentSlide ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
                    }`}>
                      <div className="relative aspect-video overflow-hidden">
                        <Image
                          src={urlFor(slide.image).width(800).height(450).url()}
                          alt={slide.imageAlt ? getLocalizedText(slide.imageAlt, language) : ''}
                          fill
                          sizes="(max-width: 768px) 100vw, 50vw"
                          className="object-cover"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}

          {/* Navigation Arrows - inside relative container */}
          {settings.showNavigation !== false && block.slides.length > 1 && (
            <>
              <Button
                variant="ghost"
                size="icon"
                className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:bg-white/30 bg-black/20 backdrop-blur-sm h-10 w-10 z-20 !rounded-full"
                onClick={prevSlide}
              >
                <ChevronLeft className="h-5 w-5" />
              </Button>
              
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:bg-white/30 bg-black/20 backdrop-blur-sm h-10 w-10 z-20 !rounded-full"
                onClick={nextSlide}
              >
                <ChevronRight className="h-5 w-5" />
              </Button>
            </>
          )}
        </div>
      
      {/* Indicators - positioned below carousel, center-aligned like BannerBlock */}
      {settings.showPagination !== false && block.slides.length > 1 && (
        <div className="mt-2 flex justify-center gap-3">
          {block.slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all ${
                index === currentSlide 
                  ? 'bg-slate-800 scale-125' 
                  : 'bg-slate-400 hover:bg-slate-600'
              }`}
              aria-label={`Przejdź do slajdu ${index + 1}`}
            />
          ))}
        </div>
      )}
      </div>
    </section>
  )
}