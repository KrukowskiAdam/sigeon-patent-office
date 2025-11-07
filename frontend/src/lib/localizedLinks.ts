import { Language } from '@/context/LanguageContext'
import { MenuItem } from '@/types/sanity'

/**
 * Get the appropriate link for a menu item based on current language
 * Falls back to default link if language-specific link is not provided
 */
export function getLocalizedLink(menuItem: MenuItem, currentLanguage: Language): string {
  // If no language-specific links are configured, use default link
  if (!menuItem.languageSpecificLinks) {
    return menuItem.link
  }

  // Get language-specific link if available
  const languageLink = menuItem.languageSpecificLinks[currentLanguage]
  
  // Return language-specific link if exists, otherwise fallback to default
  return languageLink || menuItem.link
}

/**
 * Predefined language-specific routes for common pages
 * These can be used as examples in the CMS
 */
export const languageRoutes = {
  news: {
    pl: '/news',
    en: '/en/news',
    zh: '/zh/news',
    ko: '/ko/news', 
    ja: '/ja/news',
    ru: '/ru/news'
  },
  contact: {
    pl: '/contact',
    en: '/en/contact',
    zh: '/zh/contact',
    ko: '/ko/contact',
    ja: '/ja/contact', 
    ru: '/ru/contact'
  },
  team: {
    pl: '/team',
    en: '/en/team',
    zh: '/zh/team',
    ko: '/ko/team',
    ja: '/ja/team',
    ru: '/ru/team'
  }
} as const