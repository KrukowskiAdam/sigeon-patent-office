import {defineField, defineType} from 'sanity'

// SEO object for all documents
export const seoFields = defineType({
  name: 'seo',
  title: 'SEO',
  type: 'object',
  fields: [
    defineField({
      name: 'metaTitle',
      title: 'Meta Title',
      type: 'localizedString',
      description: 'Title tag for search engines (max 60 characters)',
    }),
    defineField({
      name: 'metaDescription',
      title: 'Meta Description', 
      type: 'localizedText',
      description: 'Description for search engines (max 160 characters)',
    }),
    defineField({
      name: 'openGraphImage',
      title: 'Open Graph Image',
      type: 'image',
      description: 'Image for social media sharing',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'noIndex',
      title: 'No Index',
      type: 'boolean',
      description: 'Prevent search engines from indexing this page',
      initialValue: false,
    }),
  ],
})