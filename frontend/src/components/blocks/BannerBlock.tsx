'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { urlFor } from '@/lib/sanity'
import { useLanguage } from '@/context/LanguageContext'
import { PortableText } from '@portabletext/react'
import { Button } from '@/components/ui/button'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import type { BannerBlock as BannerBlockProps } from '@/types/sanity'

export function BannerBlock(props: BannerBlockProps) {
  const { 
    items = [], 
    autoplay = false, 
    showIndicators = true,
    height = 'large' 
  } = props
  const { currentLanguage } = useLanguage()
  const [currentSlide, setCurrentSlide] = useState(0)

  // 21:9 aspect ratio heights (ultrawide format)
  // Mobile: 375px width = ~160px height | Tablet: 768px width = ~330px height | Desktop: 1440px width = ~617px height
  const heightClasses = {
    small: 'h-32 sm:h-40 md:h-48 lg:h-60 xl:h-72',      // Progressive scaling for 21:9
    medium: 'h-40 sm:h-48 md:h-60 lg:h-80 xl:h-96',     // Medium banner sizes
    large: 'h-48 sm:h-60 md:h-80 lg:h-96 xl:h-[28rem]', // Large banner - maintains 21:9 ratio
    full: 'min-h-[40vh] sm:min-h-[50vh] lg:min-h-[60vh]' // Responsive full height
  }

  useEffect(() => {
    if (autoplay && items.length > 1) {
      const timer = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % items.length)
      }, 5000)
      return () => clearInterval(timer)
    }
  }, [autoplay, items.length])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % items.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + items.length) % items.length)
  }

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
  }

  if (!items || items.length === 0) {
    return (
      <div className="w-full h-96 bg-gray-100 flex items-center justify-center">
        <p className="text-gray-500">Brak elementów banera</p>
      </div>
    )
  }

  return (
    <div 
      className={`relative w-full ${heightClasses[height]} overflow-hidden bg-gray-900 aspect-[21/9]`}
    >
      {/* Slides */}
      <div 
        className="flex transition-transform duration-500 ease-in-out h-full"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {items.map((item, index) => (
          <div key={item._key} className="min-w-full h-full relative">
            {/* Background Image - 21:9 aspect ratio with responsive optimization */}
            {item.image && (
              <Image
                src={urlFor(item.image)
                  .width(2100)
                  .height(900)
                  .fit('crop')
                  .crop('center')
                  .quality(85)
                  .url()}
                alt={item.image?.alt || (item.title?.[currentLanguage] || item.title?.pl) || ''}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 100vw"
                className="object-cover object-center"
                priority={index === 0}
              />
            )}
            
            {/* Overlay */}
            {item.overlay !== false && (
              <div className="absolute inset-0 bg-black/40" />
            )}
            
            {/* Content */}
            <div className="absolute inset-0 flex items-center justify-start">
              <div className="max-w-4xl ml-4 md:ml-8 lg:ml-16 xl:ml-24 px-4 text-left text-white">
                {item.title && (
                  <h2 className="text-4xl md:text-6xl font-normal mb-6 leading-tight">
                    {item.title[currentLanguage] || item.title.pl}
                  </h2>
                )}
                
                {item.content && (
                  <div className="text-xl md:text-2xl mb-8 leading-relaxed max-w-3xl">
                    <PortableText 
                      value={item.content.pl as never} 
                    />
                  </div>
                )}
                
                {item.buttonText && item.buttonLink && (
                  <Button 
                    size="lg" 
                    className="bg-[#0abaee] hover:bg-[#0891b2] text-white text-lg px-8 py-3"
                    asChild
                  >
                    <a href={item.buttonLink}>
                      {item.buttonText?.[currentLanguage] || item.buttonText?.pl}
                    </a>
                  </Button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      {items.length > 1 && (
        <>
          <Button
            variant="ghost"
            size="icon"
            className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:bg-white/20 h-12 w-12"
            onClick={prevSlide}
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>
          
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:bg-white/20 h-12 w-12"
            onClick={nextSlide}
          >
            <ChevronRight className="h-6 w-6" />
          </Button>
        </>
      )}

      {/* Indicators */}
      {showIndicators && items.length > 1 && (
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
          {items.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all ${
                index === currentSlide 
                  ? 'bg-white scale-110' 
                  : 'bg-white/50 hover:bg-white/80'
              }`}
              aria-label={`Przejdź do slajdu ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  )
}