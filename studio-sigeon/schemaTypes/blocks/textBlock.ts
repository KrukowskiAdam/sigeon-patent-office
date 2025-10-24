import {defineField, defineType} from 'sanity'
import {linkField} from '../objects/linkField'

export const textBlock = defineType({
  name: 'textBlock',
  title: 'Text Block',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'localizedString',
    }),
    defineField({
      name: 'content',
      title: 'Content',
      type: 'localizedRichText',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'alignment',
      title: 'Text Alignment',
      type: 'string',
      options: {
        list: [
          {title: 'Left', value: 'left'},
          {title: 'Center', value: 'center'},
          {title: 'Right', value: 'right'},
        ],
      },
      initialValue: 'left',
    }),
    linkField(),
  ],
  preview: {
    select: {
      title: 'title.pl',
      subtitle: 'alignment',
    },
    prepare({title, subtitle}) {
      return {
        title: title || 'Text Block',
        subtitle: `Alignment: ${subtitle}`,
      }
    },
  },
})