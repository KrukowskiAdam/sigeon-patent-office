// Locale and SEO objects
import {localizedString, localizedText, localizedRichText} from './locale'
import {localizedStringNews, localizedTextNews, localizedRichTextNews} from './localeNews'
import localizedStringPublications from './objects/localizedStringPublications'
import localizedTextPublications from './objects/localizedTextPublications'
import localizedRichTextPublications from './objects/localizedRichTextPublications'
import {localizedStringPLEN} from './objects/localizedStringPLEN'
import {localizedRichTextPLEN} from './objects/localizedRichTextPLEN'
import {seoFields} from './seo'
import {seoFieldsNews} from './seoNews'
import {seoFieldsPublications} from './seoPublications'

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
import {publications} from './publications'
import {publicationsPage} from './publicationsPage'
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
  localizedStringPublications,
  localizedTextPublications,
  localizedRichTextPublications,
  localizedStringPLEN,
  localizedRichTextPLEN,
  seoFieldsNews,
  seoFieldsPublications,
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
  publications,
  publicationsPage,
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
