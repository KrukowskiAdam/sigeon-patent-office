import { TypedObject } from '@portabletext/types'
import { LocalizedRichText } from '@/types/sanity'
import { Language } from '@/context/LanguageContext'

export function getLocalizedPortableText(
  content: LocalizedRichText,
  language: string
): TypedObject[] {
  const lang = language as keyof LocalizedRichText
  const text = content[lang] || content.pl
  return Array.isArray(text) ? text as TypedObject[] : []
}