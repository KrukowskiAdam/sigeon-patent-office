import { Language } from '@/context/LanguageContext'
import { LocalizedString, LocalizedText, LocalizedTextNews, LocalizedStringNews } from '@/types/sanity'

const LANGUAGE_KEYS: Language[] = ['pl', 'en', 'zh', 'ko', 'ja', 'ru']

function extractTextValue(value: unknown, preferredKeys: string[] = [], depth = 0): string {
  if (value == null) return ''
  if (typeof value === 'string') return value
  if (typeof value === 'number' || typeof value === 'boolean') return String(value)
  if (depth > 4) return ''

  if (Array.isArray(value)) {
    for (const entry of value) {
      const resolved = extractTextValue(entry, preferredKeys, depth + 1)
      if (resolved) return resolved
    }
    return ''
  }

  if (typeof value === 'object') {
    const obj = value as Record<string, unknown>

    // Try preferred language keys first.
    for (const key of preferredKeys) {
      const resolved = extractTextValue(obj[key], preferredKeys, depth + 1)
      if (resolved) return resolved
    }

    // Then try known language keys.
    for (const key of LANGUAGE_KEYS) {
      const resolved = extractTextValue(obj[key], preferredKeys, depth + 1)
      if (resolved) return resolved
    }

    // Finally try any field that can be converted to a string.
    for (const nested of Object.values(obj)) {
      const resolved = extractTextValue(nested, preferredKeys, depth + 1)
      if (resolved) return resolved
    }
  }

  return ''
}

// Helper function for Publications types (pl/en only)
export function getLocalizedPublicationsText(
  text: { pl: string; en?: string } | undefined,
  currentLanguage: Language = 'pl'
): string {
  if (!text) return ''
  
  // Publications logic: PL only for Polish, EN for all other languages
  if (currentLanguage === 'pl') {
    // Polish users get Polish version (with EN fallback)
    return text.pl || text.en || ''
  } else {
    // All other languages (en, zh, ko, ja, ru) get English version only
    return text.en || ''
  }
}

// Helper function for News types (pl/en only)
export function getLocalizedNewsText(
  text: LocalizedTextNews | LocalizedStringNews | undefined,
  currentLanguage: Language = 'pl'
): string {
  if (!text) return ''
  
  // News logic: PL only for Polish, EN for all other languages
  if (currentLanguage === 'pl') {
    // Polish users get Polish version (with EN fallback)
    return text.pl || text.en || ''
  } else {
    // All other languages (en, zh, ko, ja, ru) get English version only
    return text.en || ''
  }
}

// Helper function for Team Members (pl/en only)
export function getLocalizedTeamText(
  text: { pl?: string; en?: string } | string | undefined,
  currentLanguage: Language = 'pl'
): string {
  if (currentLanguage === 'pl') {
    return extractTextValue(text, ['pl', 'en'])
  }

  // Team logic: EN for all non-PL languages
  return extractTextValue(text, ['en', 'pl'])
}

// Helper function to get text in current language with fallback
export function getLocalizedText(
  text: LocalizedString | LocalizedText | undefined,
  currentLanguage: Language,
  fallbackLanguage: Language = 'pl'
): string {
  return extractTextValue(text, [currentLanguage, fallbackLanguage])
}

// Navigation translations
export const navigationTranslations: Record<Language, {
  home: string
  team: string
  news: string
  contact: string
  about: string
  services: string
  patentAttorneys: string
  legalServices: string
  businessConsulting: string
  biomed: string
}> = {
  pl: {
    home: 'Strona główna',
    team: 'Zespół',
    news: 'Aktualności',
    contact: 'Kontakt',
    about: 'O nas',
    services: 'Usługi',
    patentAttorneys: 'Rzecznicy patentowi',
    legalServices: 'Usługi prawne',
    businessConsulting: 'Doradztwo biznesowe IP',
    biomed: 'BioMed',
  },
  en: {
    home: 'Home',
    team: 'Team',
    news: 'News',
    contact: 'Contact',
    about: 'About Us',
    services: 'Services',
    patentAttorneys: 'Patent Attorneys',
    legalServices: 'Legal Services',
    businessConsulting: 'IP Business Consulting',
    biomed: 'BioMed',
  },
  zh: {
    home: '首页',
    team: '团队',
    news: '新闻',
    contact: '联系',
    about: '关于我们',
    services: '服务',
    patentAttorneys: '专利代理人',
    legalServices: '法律服务',
    businessConsulting: '知识产权商业咨询',
    biomed: '生物医学',
  },
  ko: {
    home: '홈',
    team: '팀',
    news: '뉴스',
    contact: '연락처',
    about: '회사 소개',
    services: '서비스',
    patentAttorneys: '특허 변리사',
    legalServices: '법률 서비스',
    businessConsulting: 'IP 비즈니스 컨설팅',
    biomed: '바이오메드',
  },
  ja: {
    home: 'ホーム',
    team: 'チーム',
    news: 'ニュース',
    contact: '連絡先',
    about: '会社概要',
    services: 'サービス',
    patentAttorneys: '弁理士',
    legalServices: '法的サービス',
    businessConsulting: 'IP ビジネスコンサルティング',
    biomed: 'バイオメド',
  },
  ru: {
    home: 'Главная',
    team: 'Команда',
    news: 'Новости',
    contact: 'Контакты',
    about: 'О нас',
    services: 'Услуги',
    patentAttorneys: 'Патентные поверенные',
    legalServices: 'Юридические услуги',
    businessConsulting: 'Бизнес-консалтинг по ИС',
    biomed: 'БиоМед',
  },
}