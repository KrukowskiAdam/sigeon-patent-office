import { Language } from '@/context/LanguageContext'
import { LocalizedString, LocalizedText } from '@/types/sanity'

// Helper function to get text in current language with fallback
export function getLocalizedText(
  text: LocalizedString | LocalizedText | undefined,
  currentLanguage: Language,
  fallbackLanguage: Language = 'pl'
): string {
  if (!text) return ''
  
  // Try current language
  if (text[currentLanguage]) {
    return text[currentLanguage]
  }
  
  // Fall back to fallback language (usually Polish)
  if (text[fallbackLanguage]) {
    return text[fallbackLanguage]
  }
  
  // Fall back to any available language
  const availableLanguages = Object.keys(text) as Language[]
  for (const lang of availableLanguages) {
    if (text[lang]) {
      return text[lang]
    }
  }
  
  return ''
}

// Navigation translations
export const navigationTranslations: Record<Language, {
  home: string
  team: string
  news: string
  contact: string
  about: string
  services: string
}> = {
  pl: {
    home: 'Strona główna',
    team: 'Zespół',
    news: 'Aktualności',
    contact: 'Kontakt',
    about: 'O nas',
    services: 'Usługi',
  },
  en: {
    home: 'Home',
    team: 'Team',
    news: 'News',
    contact: 'Contact',
    about: 'About Us',
    services: 'Services',
  },
  de: {
    home: 'Startseite',
    team: 'Team',
    news: 'Nachrichten',
    contact: 'Kontakt',
    about: 'Über uns',
    services: 'Dienstleistungen',
  },
  zh: {
    home: '首页',
    team: '团队',
    news: '新闻',
    contact: '联系',
    about: '关于我们',
    services: '服务',
  },
  ko: {
    home: '홈',
    team: '팀',
    news: '뉴스',
    contact: '연락처',
    about: '회사 소개',
    services: '서비스',
  },
  ja: {
    home: 'ホーム',
    team: 'チーム',
    news: 'ニュース',
    contact: '連絡先',
    about: '会社概要',
    services: 'サービス',
  },
  ru: {
    home: 'Главная',
    team: 'Команда',
    news: 'Новости',
    contact: 'Контакты',
    about: 'О нас',
    services: 'Услуги',
  },
}