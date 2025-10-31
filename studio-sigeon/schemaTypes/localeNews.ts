import {defineField, defineType} from 'sanity'
import {EnvelopeIcon, MobileDeviceIcon, DocumentIcon} from '@sanity/icons'

export const localizedStringNews = defineType({
  title: 'Localized string (PL/EN)',
  name: 'localizedStringNews',
  type: 'object',
  fields: [
    defineField({ 
      name: 'pl', 
      title: 'Polski', 
      type: 'string', 
      validation: (Rule) => Rule.custom((value, context) => {
        const doc: any = context.document
        if (doc?.showPl) {
          return value ? true : 'Wersja PL jest wymagana gdy włączone jest "Show on Polish site"'
        }
        return true
      })
    }),
    defineField({ 
      name: 'en', 
      title: 'English', 
      type: 'string',
      validation: (Rule) => Rule.custom((value, context) => {
        const doc: any = context.document
        if (doc?.showEn) {
          return value ? true : 'Wersja EN jest wymagana gdy włączone jest "Show on English site"'
        }
        return true
      })
    }),
  ],
  preview: { select: { title: 'pl' } },
})

export const localizedTextNews = defineType({
  title: 'Localized text (PL/EN)',
  name: 'localizedTextNews',
  type: 'object',
  fields: [
    defineField({ 
      name: 'pl', 
      title: 'Polski', 
      type: 'text', 
      rows: 4, 
      validation: (Rule) => Rule.custom((value, context) => {
        const doc: any = context.document
        if (doc?.showPl) {
          return value ? true : 'Wersja PL jest wymagana gdy włączone jest "Show on Polish site"'
        }
        return true
      })
    }),
    defineField({ 
      name: 'en', 
      title: 'English', 
      type: 'text', 
      rows: 4,
      validation: (Rule) => Rule.custom((value, context) => {
        const doc: any = context.document
        if (doc?.showEn) {
          return value ? true : 'Wersja EN jest wymagana gdy włączone jest "Show on English site"'
        }
        return true
      })
    }),
  ],
  preview: { select: { title: 'pl' } },
})

export const localizedRichTextNews = defineType({
  title: 'Localized rich text (PL/EN)',
  name: 'localizedRichTextNews',
  type: 'object',
  fields: [
    defineField({
      name: 'pl',
      title: 'Polski',
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
              { name: 'link', type: 'object', title: 'URL', fields: [{ name: 'href', type: 'url', title: 'URL' }] },
              { name: 'emailLink', type: 'object', title: 'Email Link', icon: EnvelopeIcon, fields: [{ name: 'email', type: 'string', title: 'Email Address' }] },
              { name: 'phoneLink', type: 'object', title: 'Phone Link', icon: MobileDeviceIcon, fields: [{ name: 'phone', type: 'string', title: 'Phone Number' }] },
              { name: 'faxLink', type: 'object', title: 'Fax Link', icon: DocumentIcon, fields: [{ name: 'fax', type: 'string', title: 'Fax Number' }] },
            ],
          },
        },
      ],
      validation: (Rule) => Rule.custom((value, context) => {
        const doc: any = context.document
        if (doc?.showPl) {
          return (Array.isArray(value) && value.length > 0) ? true : 'Wersja PL jest wymagana gdy włączone jest "Show on Polish site"'
        }
        return true
      }),
    }),
    defineField({
      name: 'en',
      title: 'English',
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
              { name: 'link', type: 'object', title: 'URL', fields: [{ name: 'href', type: 'url', title: 'URL' }] },
              { name: 'emailLink', type: 'object', title: 'Email Link', icon: EnvelopeIcon, fields: [{ name: 'email', type: 'string', title: 'Email Address' }] },
              { name: 'phoneLink', type: 'object', title: 'Phone Link', icon: MobileDeviceIcon, fields: [{ name: 'phone', type: 'string', title: 'Phone Number' }] },
              { name: 'faxLink', type: 'object', title: 'Fax Link', icon: DocumentIcon, fields: [{ name: 'fax', type: 'string', title: 'Fax Number' }] },
            ],
          },
        },
      ],
      validation: (Rule) => Rule.custom((value, context) => {
        const doc: any = context.document
        if (doc?.showEn) {
          return (Array.isArray(value) && value.length > 0) ? true : 'Wersja EN jest wymagana gdy włączone jest "Show on English site"'
        }
        return true
      }),
    }),
  ],
  preview: { select: { title: 'pl' } },
})


