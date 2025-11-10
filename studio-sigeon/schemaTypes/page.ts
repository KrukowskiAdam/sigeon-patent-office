import {defineField, defineType} from 'sanity'

export const page = defineType({
  name: 'page',
  title: 'Page',
  type: 'document',
  fields: [
    defineField({
      name: 'internalTitle',
      title: 'Internal Title (for CMS navigation only)',
      type: 'string',
      description: 'This title is only visible in CMS, not on the website. Use Hero Section or Banner for page titles.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'internalTitle',
        maxLength: 96,
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
        {type: 'textImageCarouselBlock'},
        {type: 'twoColumnTextBlock'},
        {type: 'servicesBlock'},
        {type: 'bannerBlock'},
        {type: 'codeBlock'},
        {type: 'contactBlock'},
        {type: 'footerBlock'},
      ],
      description: 'Build your page with content blocks',
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
      description: 'Whether this page appears in navigation. Order is controlled in Main Navigation settings.',
    }),
    defineField({
      name: 'buttons',
      title: 'Button Labels',
      type: 'object',
      description: 'Customize button text that appears on the page',
      fields: [
        defineField({
          name: 'backToHome',
          title: 'Back to Home Button',
          type: 'localizedString',
          description: 'Text for the button that returns to homepage',
        }),
      ],
    }),
    defineField({
      name: 'seo',
      title: 'SEO Settings',
      type: 'seo',
    }),
  ],
  preview: {
    select: {
      title: 'internalTitle',
      subtitle: 'slug.current',
      media: 'featuredImage',
    },
  },
})