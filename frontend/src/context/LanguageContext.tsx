'use client'

import React, { createContext, useContext, useState, ReactNode } from 'react'

export type Language = 'pl' | 'en' | 'zh' | 'ko' | 'ja' | 'ru'

export const languages: Record<Language, { name: string; flag: string }> = {
  pl: { name: 'Polski', flag: '🇵🇱' },
  en: { name: 'English', flag: '🇺🇸' },
  zh: { name: '中文', flag: '🇨🇳' },
  ko: { name: '한국어', flag: '🇰🇷' },
  ja: { name: '日本語', flag: '🇯🇵' },
  ru: { name: 'Русский', flag: '🇷🇺' },
}

interface LanguageContextType {
  currentLanguage: Language
  setLanguage: (lang: Language) => void
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

interface LanguageProviderProps {
  children: ReactNode
}

export function LanguageProvider({ children }: LanguageProviderProps) {
  const [currentLanguage, setCurrentLanguage] = useState<Language>(
    (() => {
      if (typeof window !== 'undefined') {
        const saved = localStorage.getItem('language') as Language | null
        if (saved === 'pl' || saved === 'en' || saved === 'zh' || saved === 'ko' || saved === 'ja' || saved === 'ru') {
          return saved
        }
      }
      return 'pl'
    })()
  )

  const setLanguage = (lang: Language) => {
    setCurrentLanguage(lang)
    // W przyszłości można dodać localStorage lub cookies
    localStorage.setItem('language', lang)
  }

  return (
    <LanguageContext.Provider value={{ currentLanguage, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}