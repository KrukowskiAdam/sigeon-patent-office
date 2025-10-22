import {defineField, defineType} from 'sanity'

export const news = defineType({
  name: 'news',
  title: 'News & Updates',
  type: 'document',
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
      name: 'publishedAt',
      title: 'Published Date',
      type: 'datetime',
      validation: (Rule) => Rule.required(),
      initialValue: () => new Date().toISOString(),
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          {title: 'Patent News', value: 'patents'},
          {title: 'Trademark News', value: 'trademarks'},
          {title: 'Legal Updates', value: 'legal'},
          {title: 'Company News', value: 'company'},
          {title: 'Industry News', value: 'industry'},
        ],
      },
    }),
    defineField({
      name: 'excerpt',
      title: 'Excerpt',
      type: 'localizedText',
      description: 'Short description for previews and SEO',
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
      name: 'content',
      title: 'Article Content',
      type: 'localizedRichText',
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
      name: 'featured',
      title: 'Featured Article',
      type: 'boolean',
      description: 'Show this article prominently on homepage',
      initialValue: false,
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
      by: [{field: 'publishedAt', direction: 'desc'}],
    },
    {
      title: 'Published Date, Old',
      name: 'publishedAtAsc', 
      by: [{field: 'publishedAt', direction: 'asc'}],
    },
  ],
})