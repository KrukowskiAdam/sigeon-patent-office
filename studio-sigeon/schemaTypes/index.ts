// Locale and SEO objects
import {localizedString, localizedText, localizedRichText} from './locale'
import {seoFields} from './seo'

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
  
  // Document types
  news,
  page,
  teamMember,
]
