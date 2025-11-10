import {defineField, defineType} from 'sanity'
import {DocumentTextIcon} from '@sanity/icons'

export const publications = defineType({
  name: 'publications',
  title: 'Publications',
  type: 'document',
  icon: DocumentTextIcon,
  fields: [
    defineField({
      name: 'showPl',
      title: 'Show on Polish site (PL)',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'showEn',
      title: 'Show on English site (EN)',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'title',
      title: 'Title',
      type: 'localizedStringPublications',
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
      name: 'excerpt',
      title: 'Excerpt',
      type: 'localizedTextPublications',
      description: 'Short description of the publication',
    }),
    defineField({
      name: 'content',
      title: 'Content',
      type: 'localizedRichTextPublications',
      validation: (Rule) => Rule.required(),
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
      name: 'authors',
      title: 'Authors',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: {type: 'teamMember'},
        },
      ],
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published at',
      type: 'datetime',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'featured',
      title: 'Featured publication',
      type: 'boolean',
      description: 'Mark as featured to show prominently on homepage',
      initialValue: false,
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{type: 'string'}],
      options: {
        layout: 'tags',
      },
    }),
    defineField({
      name: 'externalLink',
      title: 'External Publication Link',
      type: 'url',
      description: 'Link to external publication (journal, conference, etc.)',
    }),

    // SEO fields
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'seoPublications',
    }),
  ],

  preview: {
    select: {
      title: 'title.pl',
      subtitle: 'category',
      media: 'featuredImage',
      publishedAt: 'publishedAt',
    },
    prepare({title, subtitle, media, publishedAt}) {
      const formattedDate = publishedAt ? new Date(publishedAt).toLocaleDateString('pl-PL') : 'No date'
      return {
        title: title || 'Untitled',
        subtitle: `${subtitle || 'Uncategorized'} • ${formattedDate}`,
        media,
      }
    },
  },

  orderings: [
    {
      title: 'Published Date, New',
      name: 'publishedAtDesc',
      by: [
        {field: 'publishedAt', direction: 'desc'}
      ]
    },
    {
      title: 'Published Date, Old',
      name: 'publishedAtAsc', 
      by: [
        {field: 'publishedAt', direction: 'asc'}
      ]
    },
    {
      title: 'Title A-Z',
      name: 'titleAsc',
      by: [
        {field: 'title.pl', direction: 'asc'}
      ]
    },
  ]
})