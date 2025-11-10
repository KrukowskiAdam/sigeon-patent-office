import {defineField, defineType} from 'sanity'

// SEO object limited to PL/EN for Publications documents
export const seoFieldsPublications = defineType({
  name: 'seoPublications',
  title: 'SEO (PL/EN)',
  type: 'object',
  fields: [
    defineField({
      name: 'metaTitle',
      title: 'Meta Title',
      type: 'localizedStringPublications',
      description: 'Title tag for search engines (max 60 characters)',
    }),
    defineField({
      name: 'metaDescription',
      title: 'Meta Description',
      type: 'localizedTextPublications',
      description: 'Description for search engines (max 160 characters)',
    }),
    defineField({
      name: 'openGraphImage',
      title: 'Open Graph Image',
      type: 'image',
      description: 'Image for social media sharing',
      options: { hotspot: true },
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
