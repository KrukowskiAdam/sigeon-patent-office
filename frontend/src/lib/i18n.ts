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