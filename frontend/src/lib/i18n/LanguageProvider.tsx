'use client'

import React, { ReactNode } from 'react'
import { LanguageProvider as ContextLanguageProvider } from '@/context/LanguageContext'

interface LanguageProviderProps {
  children: ReactNode
}

export function LanguageProvider({ children }: LanguageProviderProps) {
  return (
    <ContextLanguageProvider>
      {children}
    </ContextLanguageProvider>
  )
}