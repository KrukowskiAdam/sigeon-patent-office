// Locale and SEO objects
import {localizedString, localizedText, localizedRichText} from './locale'
import {seoFields} from './seo'

// Content blocks
import {textBlock, textImageBlock, heroBlock, servicesBlock} from './blocks'
import {bannerBlock} from './blocks/bannerBlock'
import {textImageCarouselBlock} from './blocks/textImageCarouselBlock'

// Document types
import {homepage} from './homepage'
import {news} from './post'
import {page} from './page'
import {teamMember} from './teamMember'
import {navigation} from './navigation'

export const schemaTypes = [
  // Object types (must be first)
  localizedString,
  localizedText, 
  localizedRichText,
  seoFields,
  
  // Content blocks
  textBlock,
  textImageBlock,
  textImageCarouselBlock,
  heroBlock,
  servicesBlock,
  bannerBlock,
  
  // Document types
  homepage,
  news,
  page,
  teamMember,
  navigation,
]
