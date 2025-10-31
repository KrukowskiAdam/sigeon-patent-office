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
      ],
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Footer Block (4 columns)',
      }
    },
  },
})
