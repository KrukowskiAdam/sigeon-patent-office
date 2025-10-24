import {defineField, defineType} from 'sanity'
import {linkField} from '../objects/linkField'

export const servicesBlock = defineType({
  name: 'servicesBlock',
  title: 'Services Block',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Section Title',
      type: 'localizedString',
    }),
    defineField({
      name: 'subtitle',
      title: 'Section Subtitle',
      type: 'localizedString',
    }),
    defineField({
      name: 'services',
      title: 'Services',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'title',
              title: 'Service Title',
              type: 'localizedString',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'description',
              title: 'Service Description',
              type: 'localizedRichText',
            },
            {
              name: 'icon',
              title: 'Service Icon',
              type: 'image',
              options: {
                hotspot: true,
              },
            },
            linkField({
              name: 'link',
              title: 'Service Link',
              description: 'Optional link to service page',
            }),
          ],
          preview: {
            select: {
              title: 'title.pl',
              media: 'icon',
            },
          },
        },
      ],
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: 'layout',
      title: 'Layout Style',
      type: 'string',
      options: {
        list: [
          {title: 'Grid (2 columns)', value: 'grid-2'},
          {title: 'Grid (3 columns)', value: 'grid-3'},
          {title: 'Grid (4 columns)', value: 'grid-4'},
          {title: 'List', value: 'list'},
        ],
      },
      initialValue: 'grid-3',
    }),
  ],
  preview: {
    select: {
      title: 'title.pl',
      servicesCount: 'services',
    },
    prepare({title, servicesCount}) {
      const count = Array.isArray(servicesCount) ? servicesCount.length : 0
      return {
        title: title || 'Services Block',
        subtitle: `${count} service${count !== 1 ? 's' : ''}`,
      }
    },
  },
})