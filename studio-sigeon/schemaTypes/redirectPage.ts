import {defineField, defineType} from 'sanity'
import {LinkIcon} from '@sanity/icons'

export const redirectPage = defineType({
  name: 'redirectPage',
  title: 'Redirect Pages',
  type: 'document',
  icon: LinkIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Internal Title',
      type: 'string',
      description: 'For internal reference only (e.g., "Booking Link - December Newsletter")',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'URL Slug',
      type: 'slug',
      description: '⚠️ IMPORTANT: Newsletter link format will be: yourdomain.com/r/[slug]   |   Example: if you enter "book-meeting", the full link will be: yourdomain.com/r/book-meeting',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'destinationUrl',
      title: 'Destination URL',
      type: 'url',
      description: 'External URL where users will be redirected',
      validation: (Rule) => 
        Rule.required().uri({
          scheme: ['http', 'https']
        }),
    }),
    defineField({
      name: 'redirectType',
      title: 'Redirect Type',
      type: 'string',
      options: {
        list: [
          {title: 'Permanent (301) - do not change after publishing', value: '301'},
          {title: 'Temporary (302) - recommended for newsletters', value: '302'},
        ],
      },
      initialValue: '302',
      description: '💡 For newsletters choose 302 (temporary), so you can change the destination link later',
    }),
    defineField({
      name: 'isActive',
      title: 'Active',
      type: 'boolean',
      description: 'Uncheck to temporarily disable this redirect (users will see 404 error)',
      initialValue: true,
    }),
    defineField({
      name: 'description',
      title: 'Internal Notes',
      type: 'text',
      rows: 3,
      description: 'Optional notes (e.g., "Used in December 2024 newsletter campaign")',
    }),
    defineField({
      name: 'createdFor',
      title: 'Created For',
      type: 'string',
      description: 'Campaign or purpose (e.g., "November Newsletter", "Website Footer")',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      slug: 'slug.current',
      destination: 'destinationUrl',
      isActive: 'isActive',
    },
    prepare({title, slug, destination, isActive}) {
      return {
        title: title,
        subtitle: `/r/${slug} → ${destination}${!isActive ? ' (Inactive)' : ''}`,
        media: LinkIcon,
      }
    },
  },
})
