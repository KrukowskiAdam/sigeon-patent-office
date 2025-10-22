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
    <header className="bg-gradient-to-r from-[#0abaee] to-[#0891b2] text-white sticky top-0 z-50 shadow-lg">
      <div className="max-w-6xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="text-xl font-bold hover:text-white/90 transition-colors">
            Sigeon IP
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-6">
            <Link href="/rzecznicy-patentowi" className="hover:text-white/90 transition-colors font-medium" style={{fontSize: '0.8rem'}}>
              {nav.patentAttorneys}
            </Link>
            <Link href="/uslugi-prawne" className="hover:text-white/90 transition-colors font-medium" style={{fontSize: '0.8rem'}}>
              {nav.legalServices}
            </Link>
            <Link href="/doradztwo-biznesowe-ip" className="hover:text-white/90 transition-colors font-medium" style={{fontSize: '0.8rem'}}>
              {nav.businessConsulting}
            </Link>
            <Link href="/biomed" className="hover:text-white/90 transition-colors font-medium" style={{fontSize: '0.8rem'}}>
              {nav.biomed}
            </Link>
            <Link href="/team" className="hover:text-white/90 transition-colors font-medium" style={{fontSize: '0.8rem'}}>
              {nav.team}
            </Link>
            <Link href="/news" className="hover:text-white/90 transition-colors font-medium" style={{fontSize: '0.8rem'}}>
              {nav.news}
            </Link>
            <Link href="/contact" className="hover:text-white/90 transition-colors font-medium" style={{fontSize: '0.8rem'}}>
              {nav.contact}
            </Link>
          </nav>

          {/* Language Switcher */}
          <div className="flex items-center space-x-4">
            <LanguageSwitcher />
            
            {/* Mobile menu button - można dodać później */}
            <Button 
              variant="ghost" 
              className="lg:hidden text-white hover:text-white/90"
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