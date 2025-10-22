import {defineField, defineType} from 'sanity'

// Supported languages for the patent office
export const supportedLanguages = [
  {id: 'pl', title: 'Polski', isDefault: true},
  {id: 'en', title: 'English'},
  {id: 'de', title: 'Deutsch'},
]

// Base language list for language selector
export const baseLanguage = supportedLanguages.find((l) => l.isDefault)

// Localized string type - for multilingual text fields
export const localizedString = defineType({
  title: 'Localized string',
  name: 'localizedString',
  type: 'object',
  fields: supportedLanguages.map((lang) =>
    defineField({
      title: lang.title,
      name: lang.id,
      type: 'string',
      validation: (Rule) => {
        if (lang.isDefault) {
          return Rule.required()
        }
        return Rule
      },
    })
  ),
  preview: {
    select: {
      title: 'pl',
    },
  },
})

// Localized text type - for multilingual textarea fields
export const localizedText = defineType({
  title: 'Localized text',
  name: 'localizedText',
  type: 'object',
  fields: supportedLanguages.map((lang) =>
    defineField({
      title: lang.title,
      name: lang.id,
      type: 'text',
      rows: 4,
      validation: (Rule) => {
        if (lang.isDefault) {
          return Rule.required()
        }
        return Rule
      },
    })
  ),
  preview: {
    select: {
      title: 'pl',
    },
  },
})

// Localized rich text - for multilingual content blocks
export const localizedRichText = defineType({
  title: 'Localized rich text',
  name: 'localizedRichText',
  type: 'object',
  fields: supportedLanguages.map((lang) =>
    defineField({
      title: lang.title,
      name: lang.id,
      type: 'array',
      of: [{type: 'block'}],
      validation: (Rule) => {
        if (lang.isDefault) {
          return Rule.required()
        }
        return Rule
      },
    })
  ),
  preview: {
    select: {
      title: 'pl',
    },
  },
})