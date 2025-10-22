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
          {title: 'Contact', value: 'contact'},
          {title: 'Team', value: 'team'},
          {title: 'Patent Attorneys', value: 'patent-attorneys'},
          {title: 'Legal Services', value: 'legal-services'},
          {title: 'IP Business Consulting', value: 'business-consulting'},
          {title: 'BioMed', value: 'biomed'},
          {title: 'Services Overview', value: 'services'},
          {title: 'Other', value: 'other'},
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'content',
      title: 'Page Content',
      type: 'array',
      of: [
        {type: 'heroBlock'},
        {type: 'textBlock'},
        {type: 'textImageBlock'},
        {type: 'servicesBlock'},
      ],
      description: 'Build your page with content blocks',
    }),
    defineField({
      name: 'subtitle',
      title: 'Page Subtitle',
      type: 'localizedString',
      description: 'Subtitle displayed under the main title',
    }),
    defineField({
      name: 'services',
      title: 'Services List',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'title',
              title: 'Service Title',
              type: 'localizedString',
            },
            {
              name: 'description', 
              title: 'Service Description',
              type: 'localizedText',
            },
          ],
        },
      ],
      hidden: ({document}) => !['patent-attorneys', 'legal-services', 'business-consulting', 'biomed'].includes(document?.pageType as string),
    }),
    defineField({
      name: 'heroColor',
      title: 'Hero Section Color',
      type: 'string',
      options: {
        list: [
          {title: 'Primary Blue (#0abaee)', value: 'primary'},
          {title: 'Dark Blue', value: 'dark'},
          {title: 'Light Blue', value: 'light'},
          {title: 'Gray', value: 'gray'},
        ],
      },
      initialValue: 'primary',
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