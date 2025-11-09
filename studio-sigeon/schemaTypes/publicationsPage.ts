import {defineField, defineType} from 'sanity'

export const publicationsPage = defineType({
  name: 'publicationsPage',
  title: 'Publications Page Settings',
  type: 'document',
  icon: () => '📚',
  fields: [
    defineField({
      name: 'slug',
      title: 'URL Slug',
      type: 'slug',
      options: {
        source: (doc: any) => doc.title?.pl || 'publications',
        maxLength: 96,
      },
      validation: Rule => Rule.required(),
      description: 'URL path for this page (e.g., "publications", "publikacje")',
      initialValue: {
        current: 'publikacje'
      }
    }),
    defineField({
      name: 'title',
      title: 'Page Title',
      type: 'localizedString',
      validation: Rule => Rule.required(),
      description: 'Main title for the publications page',
      initialValue: {
        pl: 'Publikacje',
        en: 'Publications'
      }
    }),
    defineField({
      name: 'buttons',
      title: 'Buttons / Labels',
      type: 'object',
      fields: [
        defineField({
          name: 'readMore',
          title: 'Read More label',
          type: 'localizedString',
          initialValue: {
            pl: 'Czytaj więcej',
            en: 'Read more'
          }
        }),
        defineField({
          name: 'backToHome',
          title: 'Back to Home label',
          type: 'localizedString',
          initialValue: {
            pl: 'Strona główna',
            en: 'Home',
            zh: '首页',
            ko: '홈',
            ja: 'ホーム',
            ru: 'Główna'
          }
        })
      ]
    }),
    defineField({
      name: 'socialSharing',
      title: 'Social Media Sharing',
      type: 'object',
      description: 'Configure social media sharing buttons for publication articles',
      fields: [
        defineField({
          name: 'showSocialButtons',
          title: 'Show Social Sharing Buttons',
          type: 'boolean',
          description: 'Display social media sharing buttons on article pages',
          initialValue: true,
        }),
        defineField({
          name: 'shareTitle',
          title: 'Share Section Title',
          type: 'localizedStringNews',
          description: 'Title above the sharing buttons',
          initialValue: {
            pl: 'Udostępnij',
            en: 'Share'
          }
        }),
        defineField({
          name: 'showFacebook',
          title: 'Show Facebook Share Button',
          type: 'boolean',
          description: 'Enable Facebook sharing',
          initialValue: true,
        }),
        defineField({
          name: 'showLinkedIn',
          title: 'Show LinkedIn Share Button',
          type: 'boolean',
          description: 'Enable LinkedIn sharing',
          initialValue: true,
        }),
        defineField({
          name: 'showTwitter',
          title: 'Show Twitter Share Button',
          type: 'boolean',
          description: 'Enable Twitter sharing',
          initialValue: false,
        }),
      ]
    }),
    defineField({
      name: 'blocks',
      title: 'Content Blocks',
      type: 'array',
      description: 'Add content blocks above the publications list',
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
        title: 'Publications Page Settings',
        subtitle: 'Page configuration and content blocks',
      }
    },
  },
})