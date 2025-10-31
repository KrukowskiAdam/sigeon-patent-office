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
        {type: 'servicesBlock'},
        {type: 'bannerBlock'},
        {type: 'codeBlock'},
        {type: 'contactBlock'},
        {type: 'footerBlock'},
      ],
      description: 'Build your page with content blocks',
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
      hidden: ({document}) => !['rzecznicy-patentowi', 'uslugi-prawne', 'doradztwo-biznesowe-ip', 'biomed'].includes((document as any)?.slug?.current),
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
      title: 'internalTitle',
      subtitle: 'slug.current',
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