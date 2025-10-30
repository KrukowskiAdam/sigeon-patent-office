import { defineType } from 'sanity'
import { localizedString, localizedText } from './locale'

export default defineType({
  name: 'footer',
  title: 'Footer',
  type: 'document',
  fields: [
    {
      name: 'column1',
      title: 'Column 1',
      type: 'object',
      fields: [
        {
          name: 'title',
          title: 'Column Title',
          type: localizedString.name,
          validation: Rule => Rule.required()
        },
        {
          name: 'content',
          title: 'Column Content',
          type: localizedText.name,
          validation: Rule => Rule.required()
        },
        {
          name: 'buttonText',
          title: 'Button Text',
          type: localizedString.name,
          description: 'Text displayed on the button (optional)'
        },
        {
          name: 'buttonUrl',
          title: 'Button URL',
          type: 'string',
          description: 'URL the button should link to (e.g. /about, /team, https://example.com)'
        }
      ]
    },
    {
      name: 'column2',
      title: 'Column 2',
      type: 'object',
      fields: [
        {
          name: 'title',
          title: 'Column Title',
          type: localizedString.name,
          validation: Rule => Rule.required()
        },
        {
          name: 'content',
          title: 'Column Content',
          type: localizedText.name,
          validation: Rule => Rule.required()
        },
        {
          name: 'buttonText',
          title: 'Button Text',
          type: localizedString.name,
          description: 'Text displayed on the button (optional)'
        },
        {
          name: 'buttonUrl',
          title: 'Button URL',
          type: 'string',
          description: 'URL the button should link to (e.g. /about, /team, https://example.com)'
        }
      ]
    },
    {
      name: 'column3',
      title: 'Column 3',
      type: 'object',
      fields: [
        {
          name: 'title',
          title: 'Column Title',
          type: localizedString.name,
          validation: Rule => Rule.required()
        },
        {
          name: 'content',
          title: 'Column Content',
          type: localizedText.name,
          validation: Rule => Rule.required()
        },
        {
          name: 'buttonText',
          title: 'Button Text',
          type: localizedString.name,
          description: 'Text displayed on the button (optional)'
        },
        {
          name: 'buttonUrl',
          title: 'Button URL',
          type: 'string',
          description: 'URL the button should link to (e.g. /about, /team, https://example.com)'
        }
      ]
    },
    {
      name: 'column4',
      title: 'Column 4',
      type: 'object',
      fields: [
        {
          name: 'title',
          title: 'Column Title',
          type: localizedString.name,
          validation: Rule => Rule.required()
        },
        {
          name: 'content',
          title: 'Column Content',
          type: localizedText.name,
          validation: Rule => Rule.required()
        },
        {
          name: 'buttonText',
          title: 'Button Text',
          type: localizedString.name,
          description: 'Text displayed on the button (optional)'
        },
        {
          name: 'buttonUrl',
          title: 'Button URL',
          type: 'string',
          description: 'URL the button should link to (e.g. /about, /team, https://example.com)'
        }
      ]
    },
    {
      name: 'copyrightText',
      title: 'Copyright Text',
      type: localizedString.name,
      description: 'Text displayed at the bottom of the footer'
    }
  ],
  preview: {
    prepare() {
      return {
        title: 'Footer'
      }
    }
  }
})