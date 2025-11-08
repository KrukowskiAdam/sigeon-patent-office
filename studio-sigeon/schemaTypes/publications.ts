import {defineField, defineType} from 'sanity'
import {DocumentTextIcon} from '@sanity/icons'

export const publications = defineType({
  name: 'publications',
  title: 'Publications',
  type: 'document',
  icon: DocumentTextIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'localizedStringNews',
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
      type: 'localizedTextNews',
      description: 'Short description of the publication',
    }),
    defineField({
      name: 'content',
      title: 'Content',
      type: 'localizedRichTextNews',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'mainImage',
      title: 'Main image',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        defineField({
          name: 'alt',
          type: 'localizedStringNews',
          title: 'Alternative Text',
        }),
      ],
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
      name: 'showPl',
      title: 'Show in Polish',
      type: 'boolean',
      description: 'Show this publication in Polish version of the site',
      initialValue: true,
    }),
    defineField({
      name: 'showEn',
      title: 'Show in English', 
      type: 'boolean',
      description: 'Show this publication in English version of the site',
      initialValue: true,
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
      type: 'seo',
    }),
  ],

  preview: {
    select: {
      title: 'title.pl',
      author: 'authors.0.name',
      media: 'mainImage',
    },
    prepare(selection) {
      const {author, media} = selection
      return {
        title: selection.title,
        subtitle: author ? `by ${author}` : 'Publication',
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