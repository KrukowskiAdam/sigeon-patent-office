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
      name: 'excerpt',
      title: 'Excerpt',
      type: 'localizedText',
      description: 'Short description of the publication',
    }),
    defineField({
      name: 'content',
      title: 'Content',
      type: 'localizedRichText',
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
          type: 'localizedString',
          title: 'Alternative Text',
        }),
      ],
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          {title: 'Patent Law', value: 'patent-law'},
          {title: 'Trademark Law', value: 'trademark-law'},
          {title: 'IP Litigation', value: 'ip-litigation'},
          {title: 'Research & Development', value: 'research-development'},
          {title: 'Academic Papers', value: 'academic-papers'},
          {title: 'Case Studies', value: 'case-studies'},
          {title: 'Industry Analysis', value: 'industry-analysis'},
          {title: 'Legal Commentary', value: 'legal-commentary'},
        ],
      },
      validation: (Rule) => Rule.required(),
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
    defineField({
      name: 'citationInfo',
      title: 'Citation Information',
      type: 'object',
      fields: [
        defineField({
          name: 'journal',
          title: 'Journal/Conference',
          type: 'string',
        }),
        defineField({
          name: 'volume',
          title: 'Volume',
          type: 'string',
        }),
        defineField({
          name: 'issue',
          title: 'Issue',
          type: 'string',
        }),
        defineField({
          name: 'pages',
          title: 'Pages',
          type: 'string',
        }),
        defineField({
          name: 'doi',
          title: 'DOI',
          type: 'string',
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
    select: {
      title: 'title.pl',
      author: 'authors.0.name',
      media: 'mainImage',
      category: 'category',
    },
    prepare(selection) {
      const {author, category, media} = selection
      return {
        title: selection.title,
        subtitle: `${category ? category.replace('-', ' ').toUpperCase() : ''} ${author ? `• by ${author}` : ''}`,
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