import {defineField, defineType} from 'sanity'

export const page = defineType({
  name: 'page',
  title: 'Page',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Page Title',
      type: 'localizedString',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title.pl',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'pageType',
      title: 'Page Type',
      type: 'string',
      options: {
        list: [
          {title: 'About Us', value: 'about'},
          {title: 'Services', value: 'services'},
          {title: 'Contact', value: 'contact'},
          {title: 'Team', value: 'team'},
          {title: 'Patents', value: 'patents'},
          {title: 'Trademarks', value: 'trademarks'},
          {title: 'Industrial Design', value: 'design'},
          {title: 'Other', value: 'other'},
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'content',
      title: 'Page Content',
      type: 'localizedRichText',
    }),
    defineField({
      name: 'excerpt',
      title: 'Page Excerpt',
      type: 'localizedText',
      description: 'Short description for navigation or previews',
    }),
    defineField({
      name: 'featuredImage',
      title: 'Featured Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'showInNavigation',
      title: 'Show in Navigation',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({
      name: 'navigationOrder',
      title: 'Navigation Order',
      type: 'number',
      description: 'Order in navigation menu (lower numbers first)',
    }),
    defineField({
      name: 'seo',
      title: 'SEO Settings',
      type: 'seo',
    }),
  ],
  preview: {
    select: {
      title: 'title.pl',
      subtitle: 'pageType',
      media: 'featuredImage',
    },
  },
  orderings: [
    {
      title: 'Navigation Order',
      name: 'navigationOrderAsc',
      by: [{field: 'navigationOrder', direction: 'asc'}],
    },
  ],
})