import { Language } from '@/context/LanguageContext'
import { NewsPage, TeamPage, PublicationsPage, Page } from '@/types/sanity'

// Union type for all CMS pages
export type CMSPage = NewsPage | TeamPage | PublicationsPage | Page

// Type guard functions
export function isNewsPage(page: CMSPage): page is NewsPage {
  return '_type' in page && page._type === 'newsPage'
}

export function isTeamPage(page: CMSPage): page is TeamPage {
  return '_type' in page && page._type === 'teamPage'
}

export function isPublicationsPage(page: CMSPage): page is PublicationsPage {
  return '_type' in page && page._type === 'publicationsPage'
}

export function isRegularPage(page: CMSPage): page is Page {
  return '_type' in page && page._type === 'page'
}

// Get page title based on type
export function getPageTitle(page: CMSPage, language: Language): string {
  if ('title' in page && page.title) {
    return page.title[language] || page.title.pl || ''
  }
  return ''
}

// Page type mapping for easier identification
export const PAGE_TYPES = {
  NEWS: 'newsPage',
  TEAM: 'teamPage', 
  PUBLICATIONS: 'publicationsPage',
  REGULAR: 'page'
} as const