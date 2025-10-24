import {defineField} from 'sanity'

export const linkField = (options: {
  name?: string
  title?: string
  description?: string
} = {}) => {
  const {
    name = 'link',
    title = 'Link (Optional)',
    description
  } = options

  return defineField({
    name,
    title,
    description,
    type: 'object',
    fields: [
      defineField({
        name: 'text',
        title: 'Link Text',
        type: 'localizedString',
      }),
      defineField({
        name: 'linkType',
        title: 'Link Type',
        type: 'string',
        options: {
          list: [
            {title: 'Internal Link (e.g. /team, /about)', value: 'internal'},
            {title: 'External URL (e.g. https://example.com)', value: 'external'},
            {title: 'Email (e.g. info@company.com)', value: 'email'},
            {title: 'Phone (e.g. +48123456789)', value: 'phone'},
          ],
        },
        initialValue: 'internal',
      }),
      defineField({
        name: 'internalPath',
        title: 'Internal Path',
        description: 'For internal links (e.g. /team, /about, /services)',
        type: 'string',
        hidden: ({parent}) => parent?.linkType !== 'internal',
        validation: (Rule) => Rule.custom((value, context) => {
          const parent = context.parent as any
          if (parent?.linkType === 'internal' && !value) {
            return 'Internal path is required for internal links'
          }
          return true
        }),
      }),
      defineField({
        name: 'externalUrl',
        title: 'External URL',
        description: 'Full URL starting with http:// or https://',
        type: 'url',
        hidden: ({parent}) => parent?.linkType !== 'external',
        validation: (Rule) => Rule.custom((value, context) => {
          const parent = context.parent as any
          if (parent?.linkType === 'external' && !value) {
            return 'External URL is required for external links'
          }
          return true
        }),
      }),
      defineField({
        name: 'email',
        title: 'Email Address',
        type: 'email',
        hidden: ({parent}) => parent?.linkType !== 'email',
        validation: (Rule) => Rule.custom((value, context) => {
          const parent = context.parent as any
          if (parent?.linkType === 'email' && !value) {
            return 'Email address is required for email links'
          }
          return true
        }),
      }),
      defineField({
        name: 'phone',
        title: 'Phone Number',
        type: 'string',
        hidden: ({parent}) => parent?.linkType !== 'phone',
        validation: (Rule) => Rule.custom((value, context) => {
          const parent = context.parent as any
          if (parent?.linkType === 'phone' && !value) {
            return 'Phone number is required for phone links'
          }
          return true
        }),
      }),
      defineField({
        name: 'openInNewTab',
        title: 'Open in New Tab',
        type: 'boolean',
        initialValue: false,
        hidden: ({parent}) => parent?.linkType === 'internal',
      }),
    ],
  })
}