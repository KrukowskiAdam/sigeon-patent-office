// Locale and SEO objects
import {localizedString, localizedText, localizedRichText} from './locale'
import {seoFields} from './seo'

// Content blocks
import {textBlock, textImageBlock, heroBlock, servicesBlock} from './blocks'
import {bannerBlock} from './blocks/bannerBlock'
import {textImageCarouselBlock} from './blocks/textImageCarouselBlock'
import {codeBlock} from './blocks/codeBlock'
import {contactBlock} from './blocks/contactBlock'

// Document types
import {homepage} from './homepage'
import {news} from './post'
import {newsPage} from './newsPage'
import {teamPage} from './teamPage'
import {page} from './page'
import {teamMember} from './teamMember'
import {navigation} from './navigation'
import footer from './footer'

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
  codeBlock,
  contactBlock,
  
  // Document types
  homepage,
  news,
  newsPage,
  teamPage,
  page,
  teamMember,
  navigation,
  footer,
]
