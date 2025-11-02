import {defineField, defineType} from 'sanity'

export const news = defineType({
  name: 'news',
  title: 'News & Updates',
  type: 'document',
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
      type: 'localizedStringNews',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: (doc) => {
          const anyDoc: any = doc as any
          const title = anyDoc?.title || {}
          // Prefer PL if showPl is on and PL title exists
          if (anyDoc?.showPl && title.pl) return title.pl
          // Else use EN if showEn is on and EN title exists
          if (anyDoc?.showEn && title.en) return title.en
          // Fallback to whichever exists
          return title.pl || title.en || ''
        },
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
      name: 'excerpt',
      title: 'Excerpt',
      type: 'localizedTextNews',
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
      name: 'gallery',
      title: 'Article Gallery',
      type: 'array',
      of: [
        {
          type: 'image',
          options: {
            hotspot: true,
          },
          fields: [
            {
              name: 'alt',
              title: 'Alt Text',
              type: 'localizedStringNews',
              description: 'Alternative text for accessibility and SEO',
            },
            {
              name: 'caption',
              title: 'Caption',
              type: 'localizedStringNews',
              description: 'Optional caption for the image',
            },
          ],
        },
      ],
      options: {
        layout: 'grid',
      },
    }),
    defineField({
      name: 'content',
      title: 'Article Content',
      type: 'localizedRichTextNews',
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
      type: 'seoNews',
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