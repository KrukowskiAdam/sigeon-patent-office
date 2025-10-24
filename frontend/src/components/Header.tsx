'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { useLanguage } from '@/context/LanguageContext'
import { LanguageSwitcher } from '@/components/LanguageSwitcher'
import { navigationTranslations } from '@/lib/i18n'
import { getLocalizedText } from '@/lib/i18n'
import { getNavigation } from '@/lib/queries'
import { Navigation } from '@/types/sanity'
import { Button } from '@/components/ui/button'

export function Header() {
  const { currentLanguage } = useLanguage()
  const nav = navigationTranslations[currentLanguage]
  const [navigation, setNavigation] = useState<Navigation | null>(null)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    let ticking = false
    
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setIsScrolled(window.scrollY > 50)
          ticking = false
        })
        ticking = true
      }
    }
    
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const loadNavigation = async () => {
      try {
        const navData = await getNavigation()
        setNavigation(navData)
      } catch (error) {
        console.error('Error loading navigation:', error)
      }
    }
    
    loadNavigation()
  }, [])

  return (
    <header className="sticky top-0 z-50">
      {/* Górny pasek */}
      <div className="text-white py-0" style={{backgroundColor: '#0abaee'}}>
        <div className="max-w-7xl mx-auto px-6 flex justify-end items-center text-sm">
            {/* Secondary Navigation + Language Switcher */}
            <div className="flex items-center space-x-6">
              {/* Secondary Navigation */}
              <nav className="hidden sm:flex items-center space-x-4 md:space-x-6">
                {navigation?.secondaryMenuItems
                  ?.filter(item => item.showInNavigation !== false)
                  .sort((a, b) => (a.order || 0) - (b.order || 0))
                  .map((item, index) => (
                  <Link 
                    key={index}
                    href={item.link} 
                    className="hover:text-white/80 transition-colors text-xs md:text-sm font-normal"
                    target={item.isExternal ? '_blank' : undefined}
                    rel={item.isExternal ? 'noopener noreferrer' : undefined}
                  >
                    {getLocalizedText(item.label, currentLanguage)}
                  </Link>
                )) || (
                  // Fallback menu items if no CMS data
                  <>
                    <Link href="/team" className="hover:text-white/80 transition-colors text-xs md:text-sm font-normal">
                      {nav.team}
                    </Link>
                    <Link href="/news" className="hover:text-white/80 transition-colors text-xs md:text-sm font-normal">
                      {nav.news}
                    </Link>
                    <Link href="/contact" className="hover:text-white/80 transition-colors text-xs md:text-sm font-normal">
                      {nav.contact}
                    </Link>
                  </>
                )}
              </nav>

              {/* Language Switcher */}
              <div className="flex items-center">
                <LanguageSwitcher />
              </div>
            </div>
          </div>
        </div>

      {/* Main Navigation Bar */}
      <div className="text-slate-800 shadow-lg border-b border-gray-200 transition-all duration-300" style={{backgroundColor: '#d3dae4'}}>
        <div className={`max-w-7xl mx-auto px-6 transition-all duration-300 ${isScrolled ? 'py-6' : 'py-4'}`}>
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="hover:opacity-80 transition-opacity">
              <Image
                src="/SigeonIP.png"
                alt="Sigeon IP"
                width={120}
                height={40}
                className={`w-auto transition-all duration-300 ${isScrolled ? 'h-10' : 'h-8'}`}
                priority
              />
            </Link>

            {/* Right side wrapper - match top bar alignment */}
            <div className="flex items-center">
              {/* Primary Desktop Navigation */}
              <nav className="hidden md:flex items-center space-x-4 lg:space-x-6">
              {navigation?.menuItems
                .filter(item => item.showInNavigation !== false)
                .sort((a, b) => (a.order || 0) - (b.order || 0))
                .map((item, index) => (
                <Link 
                  key={index}
                  href={item.link} 
                  className={`hover:text-slate-600 transition-all duration-300 font-medium ${isScrolled ? 'text-xs lg:text-sm' : 'text-xs'}`}
                  target={item.isExternal ? '_blank' : undefined}
                  rel={item.isExternal ? 'noopener noreferrer' : undefined}
                >
                  {getLocalizedText(item.label, currentLanguage)}
                </Link>
              )) || (
                // Fallback menu items if no CMS data
                <>
                  <Link href="/rzecznicy-patentowi" className={`hover:text-slate-600 transition-all duration-300 font-medium ${isScrolled ? 'text-xs lg:text-sm' : 'text-xs'}`}>
                    {nav.patentAttorneys}
                  </Link>
                  <Link href="/uslugi-prawne" className={`hover:text-slate-600 transition-all duration-300 font-medium ${isScrolled ? 'text-xs lg:text-sm' : 'text-xs'}`}>
                    {nav.legalServices}
                  </Link>
                  <Link href="/doradztwo-biznesowe-ip" className={`hover:text-slate-600 transition-all duration-300 font-medium ${isScrolled ? 'text-xs lg:text-sm' : 'text-xs'}`}>
                    {nav.businessConsulting}
                  </Link>
                  <Link href="/biomed" className={`hover:text-slate-600 transition-all duration-300 font-medium ${isScrolled ? 'text-xs lg:text-sm' : 'text-xs'}`}>
                    {nav.biomed}
                  </Link>
                </>
              )}
            </nav>

            {/* Optional CTA Button */}
            {navigation?.cta?.show && navigation.cta.text && navigation.cta.link && (
              <div className="hidden lg:block ml-4">
                <Button 
                  asChild
                  variant={navigation.cta.style === 'outline' ? 'outline' : 'default'}
                  size="sm"
                  className={
                    navigation.cta.style === 'primary' 
                      ? 'bg-slate-800 hover:bg-slate-900 text-white' 
                      : navigation.cta.style === 'secondary'
                      ? 'bg-slate-200 hover:bg-slate-300 text-slate-800'
                      : 'border-slate-800 text-slate-800 hover:bg-slate-800 hover:text-white'
                  }
                >
                  <Link href={navigation.cta.link}>
                    {getLocalizedText(navigation.cta.text, currentLanguage)}
                  </Link>
                </Button>
              </div>
            )}

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
      </div>
    </header>
  )
}