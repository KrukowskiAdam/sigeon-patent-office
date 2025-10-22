'use client'

import Link from 'next/link'
import { useLanguage } from '@/context/LanguageContext'
import { LanguageSwitcher } from '@/components/LanguageSwitcher'
import { navigationTranslations } from '@/lib/i18n'
import { Button } from '@/components/ui/button'

export function Header() {
  const { currentLanguage } = useLanguage()
  const nav = navigationTranslations[currentLanguage]

  return (
    <header className="bg-blue-900 text-white sticky top-0 z-50 shadow-lg">
      <div className="max-w-6xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="text-2xl font-bold hover:text-blue-200 transition-colors">
            Sigeon IP
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            <Link href="/" className="hover:text-blue-200 transition-colors font-medium">
              {nav.home}
            </Link>
            <Link href="/team" className="hover:text-blue-200 transition-colors font-medium">
              {nav.team}
            </Link>
            <Link href="/news" className="hover:text-blue-200 transition-colors font-medium">
              {nav.news}
            </Link>
            <Link href="/contact" className="hover:text-blue-200 transition-colors font-medium">
              {nav.contact}
            </Link>
          </nav>

          {/* Language Switcher */}
          <div className="flex items-center space-x-4">
            <LanguageSwitcher />
            
            {/* Mobile menu button - można dodać później */}
            <Button 
              variant="ghost" 
              className="lg:hidden text-white hover:text-blue-200"
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