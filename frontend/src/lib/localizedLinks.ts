import { MenuItem } from '@/types/sanity'

/**
 * Get the link for a menu item
 * Always returns the default link as all languages use the same URLs
 */
export function getLocalizedLink(menuItem: MenuItem): string {
  return menuItem.link
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