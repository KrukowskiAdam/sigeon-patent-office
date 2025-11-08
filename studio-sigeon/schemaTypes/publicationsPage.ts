import {defineField, defineType} from 'sanity'
import {DocumentTextIcon} from '@sanity/icons'

export const publicationsPage = defineType({
  name: 'publicationsPage',
  title: 'Publications Page Settings',
  type: 'document',
  icon: DocumentTextIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Page Title',
      type: 'localizedString',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Page Description',
      type: 'localizedText',
      description: 'Brief description of the publications section',
    }),
    defineField({
      name: 'featuredPublications',
      title: 'Featured Publications',
      type: 'array',
      description: 'Select publications to feature at the top of the page',
      of: [
        {
          type: 'reference',
          to: {type: 'publications'},
        },
      ],
      validation: (Rule) => Rule.max(3),
    }),

    defineField({
      name: 'socialSharing',
      title: 'Social Media Sharing',
      type: 'object',
      description: 'Configure social sharing buttons for publications',
      fields: [
        defineField({
          name: 'enableSharing',
          title: 'Enable Social Sharing',
          type: 'boolean',
          initialValue: true,
        }),
        defineField({
          name: 'platforms',
          title: 'Enabled Platforms',
          type: 'object',
          fields: [
            defineField({
              name: 'linkedin',
              title: 'LinkedIn',
              type: 'boolean',
              initialValue: true,
            }),
            defineField({
              name: 'facebook',
              title: 'Facebook', 
              type: 'boolean',
              initialValue: true,
            }),
            defineField({
              name: 'twitter',
              title: 'Twitter/X',
              type: 'boolean',
              initialValue: true,
            }),
            defineField({
              name: 'email',
              title: 'Email',
              type: 'boolean',
              initialValue: true,
            }),
          ],
        }),
        defineField({
          name: 'shareText',
          title: 'Share Button Text',
          type: 'localizedString',
          initialValue: {
            pl: 'Udostępnij publikację',
            en: 'Share publication',
          },
        }),
      ],
    }),
    // SEO fields
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'seo',
    }),
  ],

  preview: {
    prepare() {
      return {
        title: 'Publications Page Settings',
        subtitle: 'Configure publications section',
      }
    },
  },
})