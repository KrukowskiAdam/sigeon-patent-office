import {defineField, defineType} from 'sanity'

export const footerBlock = defineType({
  name: 'footerBlock',
  title: 'Footer Block',
  type: 'object',
  fields: [
    defineField({
      name: 'column1',
      title: 'Column 1',
      type: 'object',
      fields: [
        {
          name: 'title',
          title: 'Column Title',
          type: 'localizedString',
        },
        {
          name: 'content',
          title: 'Column Content',
          type: 'localizedRichText',
        },
        {
          name: 'link',
          title: 'Button Link',
          type: 'object',
          fields: [
            {
              name: 'text',
              title: 'Button Text',
              type: 'localizedString',
              description: 'Text displayed on the button (optional)',
            },
            {
              name: 'url',
              title: 'URL',
              type: 'string',
              description: 'Link destination (e.g., /about or https://example.com)',
            },
            {
              name: 'openInNewTab',
              title: 'Open in new tab',
              type: 'boolean',
              initialValue: false,
            },
          ],
        },
      ],
    }),
    defineField({
      name: 'column2',
      title: 'Column 2',
      type: 'object',
      fields: [
        {
          name: 'title',
          title: 'Column Title',
          type: 'localizedString',
        },
        {
          name: 'content',
          title: 'Column Content',
          type: 'localizedRichText',
        },
        {
          name: 'link',
          title: 'Button Link',
          type: 'object',
          fields: [
            {
              name: 'text',
              title: 'Button Text',
              type: 'localizedString',
              description: 'Text displayed on the button (optional)',
            },
            {
              name: 'url',
              title: 'URL',
              type: 'string',
              description: 'Link destination (e.g., /about or https://example.com)',
            },
            {
              name: 'openInNewTab',
              title: 'Open in new tab',
              type: 'boolean',
              initialValue: false,
            },
          ],
        },
      ],
    }),
    defineField({
      name: 'column3',
      title: 'Column 3',
      type: 'object',
      fields: [
        {
          name: 'title',
          title: 'Column Title',
          type: 'localizedString',
        },
        {
          name: 'content',
          title: 'Column Content',
          type: 'localizedRichText',
        },
        {
          name: 'link',
          title: 'Button Link',
          type: 'object',
          fields: [
            {
              name: 'text',
              title: 'Button Text',
              type: 'localizedString',
              description: 'Text displayed on the button (optional)',
            },
            {
              name: 'url',
              title: 'URL',
              type: 'string',
              description: 'Link destination (e.g., /about or https://example.com)',
            },
            {
              name: 'openInNewTab',
              title: 'Open in new tab',
              type: 'boolean',
              initialValue: false,
            },
          ],
        },
      ],
    }),
    defineField({
      name: 'column4',
      title: 'Column 4',
      type: 'object',
      fields: [
        {
          name: 'title',
          title: 'Column Title',
          type: 'localizedString',
        },
        {
          name: 'content',
          title: 'Column Content',
          type: 'localizedRichText',
        },
        {
          name: 'link',
          title: 'Button Link',
          type: 'object',
          fields: [
            {
              name: 'text',
              title: 'Button Text',
              type: 'localizedString',
              description: 'Text displayed on the button (optional)',
            },
            {
              name: 'url',
              title: 'URL',
              type: 'string',
              description: 'Link destination (e.g., /about or https://example.com)',
            },
            {
              name: 'openInNewTab',
              title: 'Open in new tab',
              type: 'boolean',
              initialValue: false,
            },
          ],
        },
      ],
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Footer Block (4 columns)',
        subtitle: 'Rich text content with links, email, phone support',
      }
    },
  },
})
