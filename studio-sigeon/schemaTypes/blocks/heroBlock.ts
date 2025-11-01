import {defineField, defineType} from 'sanity'
import {linkField} from '../objects/linkField'

export const heroBlock = defineType({
  name: 'heroBlock',
  title: 'Hero Block',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Hero Title',
      type: 'localizedString',
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'content',
      title: 'Hero Content',
      type: 'localizedRichText',
    }),
    linkField({
      title: 'Call to Action Link',
      description: 'Optional button link for the hero section'
    }),
  ],
  preview: {
    select: {
      title: 'title.pl',
    },
    prepare({title}) {
      return {
        title: title || 'Hero Block',
        subtitle: 'Hero section',
      }
    },
  },
})