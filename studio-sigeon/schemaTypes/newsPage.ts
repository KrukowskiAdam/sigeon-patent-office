import {defineField, defineType} from 'sanity'

export const newsPage = defineType({
  name: 'newsPage',
  title: 'News Page Settings',
  type: 'document',
  icon: () => '📰',
  fields: [
    defineField({
      name: 'blocks',
      title: 'Content Blocks',
      type: 'array',
      description: 'Add content blocks above the news articles list',
      of: [
        {type: 'heroBlock'},
        {type: 'textBlock'},
        {type: 'textImageBlock'},
        {type: 'textImageCarouselBlock'},
        {type: 'servicesBlock'},
      ],
    }),
    defineField({
      name: 'seo',
      title: 'SEO Settings',
      type: 'seo',
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'News Page Settings',
        subtitle: 'Page configuration and content blocks',
      }
    },
  },
})