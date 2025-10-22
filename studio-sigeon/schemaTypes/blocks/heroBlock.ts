import {defineField, defineType} from 'sanity'

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
      name: 'subtitle',
      title: 'Hero Subtitle',
      type: 'localizedString',
    }),
    defineField({
      name: 'content',
      title: 'Hero Content',
      type: 'localizedRichText',
    }),
    defineField({
      name: 'backgroundImage',
      title: 'Background Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'backgroundColor',
      title: 'Background Color',
      type: 'string',
      options: {
        list: [
          {title: 'Blue', value: 'blue'},
          {title: 'Green', value: 'green'},
          {title: 'Purple', value: 'purple'},
          {title: 'Teal', value: 'teal'},
          {title: 'Red', value: 'red'},
          {title: 'Orange', value: 'orange'},
          {title: 'Gray', value: 'gray'},
          {title: 'White', value: 'white'},
        ],
      },
      initialValue: 'blue',
    }),
    defineField({
      name: 'textColor',
      title: 'Text Color',
      type: 'string',
      options: {
        list: [
          {title: 'White', value: 'white'},
          {title: 'Black', value: 'black'},
          {title: 'Gray', value: 'gray'},
        ],
      },
      initialValue: 'white',
    }),
    defineField({
      name: 'height',
      title: 'Hero Height',
      type: 'string',
      options: {
        list: [
          {title: 'Small', value: 'small'},
          {title: 'Medium', value: 'medium'},
          {title: 'Large', value: 'large'},
          {title: 'Full Screen', value: 'full'},
        ],
      },
      initialValue: 'medium',
    }),
  ],
  preview: {
    select: {
      title: 'title.pl',
      subtitle: 'subtitle.pl',
      media: 'backgroundImage',
    },
    prepare({title, subtitle, media}) {
      return {
        title: title || 'Hero Block',
        subtitle: subtitle || 'Hero section',
        media,
      }
    },
  },
})