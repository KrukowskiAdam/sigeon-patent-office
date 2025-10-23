'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { useLanguage } from '@/context/LanguageContext'
import { LanguageSwitcher } from '@/components/LanguageSwitcher'
import { navigationTranslations } from '@/lib/i18n'
import { Button } from '@/components/ui/button'

export function Header() {
  const { currentLanguage } = useLanguage()
  const nav = navigationTranslations[currentLanguage]
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    let ticking = false
    
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setIsScrolled(window.scrollY > 100)
          ticking = false
        })
        ticking = true
      }
    }
    
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header className="sticky top-0 z-50">
      {/* Górny pasek */}
      <div className={`bg-slate-800 text-white transition-all duration-100 ease-in-out overflow-hidden ${isScrolled ? 'max-h-0 py-0 opacity-0' : 'max-h-20 py-2 opacity-100'}`}>
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center text-sm">
            {/* Secondary Navigation */}
            <nav className="hidden sm:flex items-center space-x-4 md:space-x-6">
              <Link 
                href="/team" 
                className="hover:text-slate-300 transition-colors text-xs md:text-sm font-normal"
              >
                {nav.team}
              </Link>
              <Link 
                href="/news" 
                className="hover:text-slate-300 transition-colors text-xs md:text-sm font-normal"
              >
                {nav.news}
              </Link>
              <Link 
                href="/contact" 
                className="hover:text-slate-300 transition-colors text-xs md:text-sm font-normal"
              >
                {nav.contact}
              </Link>
            </nav>

            {/* Language Switcher */}
            <div className="flex items-center">
              <LanguageSwitcher />
            </div>
          </div>
        </div>

      {/* Main Navigation Bar */}
      <div className="bg-white text-slate-800 shadow-lg border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="hover:opacity-80 transition-opacity">
              <Image
                src="/SigeonIP.png"
                alt="Sigeon IP"
                width={120}
                height={40}
                className="h-10 w-auto"
                priority
              />
            </Link>

            {/* Primary Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-4 lg:space-x-6">
              <Link 
                href="/rzecznicy-patentowi" 
                className="hover:text-slate-600 transition-colors font-medium text-xs lg:text-sm"
              >
                {nav.patentAttorneys}
              </Link>
              <Link 
                href="/uslugi-prawne" 
                className="hover:text-slate-600 transition-colors font-medium text-xs lg:text-sm"
              >
                {nav.legalServices}
              </Link>
              <Link 
                href="/doradztwo-biznesowe-ip" 
                className="hover:text-slate-600 transition-colors font-medium text-xs lg:text-sm"
              >
                {nav.businessConsulting}
              </Link>
              <Link 
                href="/biomed" 
                className="hover:text-slate-600 transition-colors font-medium text-xs lg:text-sm"
              >
                {nav.biomed}
              </Link>
            </nav>

            {/* Mobile menu button */}
            <Button 
              variant="ghost" 
              className="md:hidden text-slate-800 hover:text-slate-600"
              size="sm"
            >
              Menu
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}