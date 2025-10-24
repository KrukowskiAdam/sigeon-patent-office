import {defineField, defineType} from 'sanity'
import {linkField} from '../objects/linkField'

export const textImageBlock = defineType({
  name: 'textImageBlock',
  title: 'Text + Image Block',
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
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'imageAlt',
      title: 'Image Alt Text',
      type: 'localizedString',
      description: 'Alternative text for accessibility',
    }),
    defineField({
      name: 'layout',
      title: 'Layout',
      type: 'string',
      options: {
        list: [
          {title: 'Text Left, Image Right', value: 'text-left'},
          {title: 'Image Left, Text Right', value: 'image-left'},
        ],
      },
      initialValue: 'text-left',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'imageSize',
      title: 'Image Size',
      type: 'string',
      options: {
        list: [
          {title: 'Small (1/3)', value: 'small'},
          {title: 'Medium (1/2)', value: 'medium'},
          {title: 'Large (2/3)', value: 'large'},
        ],
      },
      initialValue: 'medium',
    }),
    linkField(),
  ],
  preview: {
    select: {
      title: 'title.pl',
      media: 'image',
      layout: 'layout',
    },
    prepare({title, media, layout}) {
      const layoutText = layout === 'text-left' ? 'Text + Image' : 'Image + Text'
      return {
        title: title || 'Text + Image Block',
        subtitle: layoutText,
        media,
      }
    },
  },
})