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
    showIndicators = true 
  } = props
  const { currentLanguage } = useLanguage()
  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    if (autoplay && items.length > 1) {
      const timer = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % items.length)
      }, 6000) // Zwiększamy czas żeby dać więcej czasu na podziwianie każdego slajdu
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
    <div className="relative w-full mb-16">
      <div 
        className="relative w-full overflow-hidden bg-gray-900 aspect-[21/9]"
      >
      {/* Slides with Fade Effect */}
      {items.map((item, index) => (
        <div 
          key={item._key} 
          className={`absolute inset-0 w-full h-full transition-opacity duration-700 ease-in-out ${
            index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
          }`}
        >
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
              priority={index === 0 || index === currentSlide}
            />
          )}
          
          {/* Overlay */}
          {item.overlay !== false && (
            <div className="absolute inset-0 bg-black/40" />
          )}
          
          {/* Content */}
          <div className="absolute inset-0 flex items-end justify-start pb-16 md:pb-20">
            <div className={`max-w-4xl ml-4 md:ml-8 lg:ml-16 xl:ml-24 transition-all duration-500 ${
              index === currentSlide ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
            }`}>
              {/* Content Container with White Background */}
              <div className="bg-white/80 backdrop-blur-sm p-6 md:p-8 shadow-2xl max-w-2xl">
                {item.title && (
                  <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 leading-tight text-gray-800">
                    {item.title[currentLanguage] || item.title.pl}
                  </h2>
                )}
                
                {item.content && (
                  <div className="text-base md:text-lg mb-6 leading-relaxed text-gray-700">
                    <PortableText 
                      value={item.content.pl as never} 
                    />
                  </div>
                )}
                
                {item.buttonText && item.buttonLink && (
                  <Button 
                    size="lg" 
                    className="bg-[#0abaee] hover:bg-[#0891b2] text-white text-lg px-8 py-4 mt-4"
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
        </div>
      ))}

      {/* Navigation Arrows */}
      {items.length > 1 && (
        <>
          <Button
            variant="ghost"
            size="icon"
            className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:bg-white/30 bg-black/20 backdrop-blur-sm h-12 w-12 z-20 !rounded-full"
            onClick={prevSlide}
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>
          
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:bg-white/30 bg-black/20 backdrop-blur-sm h-12 w-12 z-20 !rounded-full"
            onClick={nextSlide}
          >
            <ChevronRight className="h-6 w-6" />
          </Button>
        </>
      )}

      </div>
      
      {/* Indicators - positioned below banner, center-aligned */}
      {showIndicators && items.length > 1 && (
        <div className="mt-6 flex justify-center gap-3">
          {items.map((_, index) => (
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
  )
}