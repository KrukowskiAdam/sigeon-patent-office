// Locale and SEO objects
import {localizedString, localizedText, localizedRichText} from './locale'
import {localizedStringNews, localizedTextNews, localizedRichTextNews} from './localeNews'
import {seoFields} from './seo'
import {seoFieldsNews} from './seoNews'

// Content blocks
import {textBlock, textImageBlock, heroBlock, servicesBlock} from './blocks'
import {bannerBlock} from './blocks/bannerBlock'
import {textImageCarouselBlock} from './blocks/textImageCarouselBlock'
import {codeBlock} from './blocks/codeBlock'
import {contactBlock} from './blocks/contactBlock'
import {footerBlock} from './blocks/footerBlock'
import twoColumnTextBlock from './blocks/twoColumnTextBlock'

// Document types
import {homepage} from './homepage'
import {news} from './post'
import {newsPage} from './newsPage'
import {teamPage} from './teamPage'
import {page} from './page'
import {teamMember} from './teamMember'
import {navigation} from './navigation'
import footer from './footer'
import {redirectPage} from './redirectPage'
import {emailSettings} from './emailSettings'
import {contactSettings} from './contactSettings'
import {newsletterAssets} from './newsletterAssets'

export const schemaTypes = [
  // Object types (must be first)
  localizedString,
  localizedText, 
  localizedRichText,
  localizedStringNews,
  localizedTextNews,
  localizedRichTextNews,
  seoFieldsNews,
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
  footerBlock,
  twoColumnTextBlock,
  
  // Document types
  homepage,
  news,
  newsPage,
  teamPage,
  page,
  teamMember,
  navigation,
  footer,
  redirectPage,
  emailSettings,
  contactSettings,
  newsletterAssets,
]
