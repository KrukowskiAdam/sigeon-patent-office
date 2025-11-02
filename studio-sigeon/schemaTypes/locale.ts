import {defineField, defineType} from 'sanity'
import {EnvelopeIcon, MobileDeviceIcon, DocumentIcon} from '@sanity/icons'

// Supported languages for the patent office
export const supportedLanguages = [
  {id: 'pl', title: 'Polski', isDefault: true},
  {id: 'en', title: 'English'},
  {id: 'zh', title: '中文'},
  {id: 'ko', title: '한국어'},
  {id: 'ja', title: '日本語'},
  {id: 'ru', title: 'Русский'},
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
      of: [
        {
          type: 'block',
          styles: [
            {title: 'Normal', value: 'normal'},
            {title: 'Head', value: 'head'},
          ],
          marks: {
            annotations: [
              {
                name: 'link',
                type: 'object',
                title: 'Link',
                fields: [
                  {
                    name: 'href',
                    type: 'string',
                    title: 'URL',
                    description: 'External URL (https://...) or internal path (/page-name)',
                    validation: (Rule: any) => Rule.required(),
                  },
                  {
                    name: 'blank',
                    type: 'boolean',
                    title: 'Open in new tab',
                    description: 'Check to open link in a new tab',
                    initialValue: false,
                  },
                ],
              },
              {
                name: 'emailLink',
                type: 'object',
                title: 'Email Link',
                icon: EnvelopeIcon,
                fields: [
                  {
                    name: 'email',
                    type: 'string',
                    title: 'Email Address',
                    validation: (Rule: any) =>
                      Rule.regex(
                        /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        {
                          name: 'email',
                          invert: false,
                        }
                      ).error('Please enter a valid email address'),
                  },
                ],
              },
              {
                name: 'phoneLink',
                type: 'object',
                title: 'Phone Link',
                icon: MobileDeviceIcon,
                fields: [
                  {
                    name: 'phone',
                    type: 'string',
                    title: 'Phone Number',
                  },
                ],
              },
              {
                name: 'faxLink',
                type: 'object',
                title: 'Fax Link',
                icon: DocumentIcon,
                fields: [
                  {
                    name: 'fax',
                    type: 'string',
                    title: 'Fax Number',
                  },
                ],
              },
            ],
          },
        },
      ],
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