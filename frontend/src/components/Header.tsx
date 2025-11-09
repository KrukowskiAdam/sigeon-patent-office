'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { useLanguage } from '@/context/LanguageContext'
import { LanguageSwitcher } from '@/components/LanguageSwitcher'
import { getLocalizedText } from '@/lib/i18n'
import { getLocalizedLink } from '@/lib/localizedLinks'
import { getCachedNavigation } from '@/lib/navigationCache'
import { Navigation } from '@/types/sanity'
import { Button } from '@/components/ui/button'

export function Header() {
  const { currentLanguage } = useLanguage()
  const [navigation, setNavigation] = useState<Navigation | null>(null)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > 20
      if (scrolled !== isScrolled) {
        setIsScrolled(scrolled)
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [isScrolled])

  useEffect(() => {
    let isMounted = true
    
    const loadNavigation = async () => {
      try {
        const navData = await getCachedNavigation()
        if (isMounted && navData) {
          setNavigation(navData)
        }
      } catch (error) {
        console.error('Error loading navigation:', error)
      }
    }
    
    loadNavigation()
    
    return () => {
      isMounted = false
    }
  }, [])

  return (
    <header className="sticky top-0 z-50 pb-8">
      {/* Górny pasek */}
      <div className="text-gray-900 py-0" style={{backgroundColor: '#0abaee'}}>
        <div className="max-w-7xl mx-auto px-2 flex justify-end items-center text-sm">
            {/* Secondary Navigation + Language Switcher */}
            <div className="flex items-center space-x-6">
              {/* Secondary Navigation */}
              <nav className="hidden sm:flex items-center space-x-4 md:space-x-6">
                {navigation?.secondaryMenuItems && navigation.secondaryMenuItems.length > 0 && (
                  navigation.secondaryMenuItems
                    .filter(item => item.showInNavigation !== false)
                    .sort((a, b) => (a.order || 0) - (b.order || 0))
                    .map((item, index) => (
                    <Link 
                      key={index}
                      href={getLocalizedLink(item)} 
                      className="hover:text-gray-700 transition-colors text-xs md:text-sm font-normal"
                      prefetch={true}
                      target={item.isExternal ? '_blank' : undefined}
                      rel={item.isExternal ? 'noopener noreferrer' : undefined}
                    >
                      {getLocalizedText(item.label, currentLanguage)}
                    </Link>
                  ))
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
      <div className={`text-slate-800 shadow-sm border-b border-gray-200 transition-all duration-300 ${isScrolled ? 'py-2' : 'py-4'}`} style={{backgroundColor: '#d3dae4'}}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="hover:opacity-80 transition-opacity" prefetch={true}>
              <Image
                src="/SigeonIP.png"
                alt="Sigeon IP"
                width={120}
                height={40}
                className={`w-auto transition-all duration-300 ${isScrolled ? 'h-6' : 'h-8'}`}
                priority
              />
            </Link>

            {/* Right side wrapper - match top bar alignment */}
            <div className="flex items-center">
              {/* Primary Desktop Navigation */}
              <nav className="hidden md:flex items-center space-x-4 lg:space-x-6">
              {navigation?.menuItems && navigation.menuItems.length > 0 && (
                navigation.menuItems
                  .filter(item => item.showInNavigation !== false)
                  .sort((a, b) => (a.order || 0) - (b.order || 0))
                  .map((item, index) => (
                  <Link 
                    key={index}
                    href={getLocalizedLink(item)} 
                    className="hover:text-slate-600 transition-colors font-medium text-sm"
                    prefetch={true}
                    target={item.isExternal ? '_blank' : undefined}
                    rel={item.isExternal ? 'noopener noreferrer' : undefined}
                  >
                    {getLocalizedText(item.label, currentLanguage)}
                  </Link>
                ))
              )}
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
      </div>
    </header>
  )
}