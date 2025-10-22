// Locale and SEO objects
import {localizedString, localizedText, localizedRichText} from './locale'
import {seoFields} from './seo'

// Content blocks
import {textBlock, textImageBlock, heroBlock, servicesBlock} from './blocks'
import {bannerBlock} from './blocks/bannerBlock'

// Document types
import {news} from './post'
import {page} from './page'
import {teamMember} from './teamMember'

export const schemaTypes = [
  // Object types (must be first)
  localizedString,
  localizedText, 
  localizedRichText,
  seoFields,
  
  // Content blocks
  textBlock,
  textImageBlock,
  heroBlock,
  servicesBlock,
  bannerBlock,
  
  // Document types
  news,
  page,
  teamMember,
]
