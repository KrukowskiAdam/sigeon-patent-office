import { TypedObject } from '@portabletext/types'
import { LocalizedRichText } from '@/types/sanity'
import { Language } from '@/context/LanguageContext'

export function getLocalizedPortableText(
  content: LocalizedRichText,
  language: Language
): TypedObject[] {
  const lang = language as keyof LocalizedRichText
  const text = content[lang] || content.pl
  return Array.isArray(text) ? text as TypedObject[] : []
}

export function getLocalizedPublicationsPortableText(
  content: { pl: TypedObject[]; en?: TypedObject[] } | undefined,
  language: Language
): TypedObject[] {
  if (!content) return []
  
  // Publications logic: PL only for Polish, EN for all other languages
  if (language === 'pl') {
    return content.pl || content.en || []
  } else {
    // All other languages get English version only
    return content.en || []
  }
}

export function getLocalizedNewsPortableText(
  content: { pl: TypedObject[]; en?: TypedObject[] } | undefined,
  language: Language
): TypedObject[] {
  if (!content) return []
  
  // News logic: PL only for Polish, EN for all other languages
  if (language === 'pl') {
    return content.pl || content.en || []
  } else {
    // All other languages get English version only
    return content.en || []
  }
}

export function getLocalizedTeamPortableText(
  content: { pl: TypedObject[]; en?: TypedObject[] } | undefined,
  language: Language
): TypedObject[] {
  if (!content) return []
  
  // Team logic: PL only for Polish, EN for all other languages
  if (language === 'pl') {
    return content.pl || content.en || []
  } else {
    // All other languages get English version only
    return content.en || []
  }
}
