import { LinkField } from '@/types/sanity'

export function getLinkHref(link: LinkField): string {
  if (!link) return '#'
  
  switch (link.linkType) {
    case 'internal':
      return link.internalPath || '#'
    case 'external':
      return link.externalUrl || '#'
    case 'email':
      return `mailto:${link.email || ''}`
    case 'phone':
      return `tel:${link.phone || ''}`
    default:
      return '#'
  }
}

export function shouldOpenInNewTab(link: LinkField): boolean {
  return link?.openInNewTab === true && link?.linkType !== 'internal'
}