import { Navigation } from '@/types/sanity'
import { getNavigation } from '@/lib/queries'

// Global cache for navigation data
let navigationCache: Navigation | null = null
let navigationPromise: Promise<Navigation | null> | null = null

export async function getCachedNavigation(): Promise<Navigation | null> {
  // If we already have cached data, return it immediately
  if (navigationCache) {
    return navigationCache
  }

  // If we're already loading, return the same promise
  if (navigationPromise) {
    return navigationPromise
  }

  // Start loading
  navigationPromise = getNavigation()
    .then(data => {
      navigationCache = data
      navigationPromise = null
      return data
    })
    .catch(error => {
      console.error('Error loading navigation:', error)
      navigationPromise = null
      return null
    })

  return navigationPromise
}

// Optional: Clear cache function for development
export function clearNavigationCache() {
  navigationCache = null
  navigationPromise = null
}