import {defineField, defineType} from 'sanity'

export const newsPage = defineType({
  name: 'newsPage',
  title: 'News Page Settings',
  type: 'document',
  icon: () => '📰',
  fields: [
    defineField({
      name: 'slug',
      title: 'URL Slug',
      type: 'slug',
      options: {
        source: () => 'news',
        maxLength: 96,
      },
      validation: Rule => Rule.required(),
      description: 'URL path for this page (e.g., "news", "aktualnosci")',
      initialValue: {
        current: 'news'
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
          name: 'backToNews',
          title: 'Back to News label',
          type: 'localizedStringNews',
          description: 'Button text to return to news list from article page',
          initialValue: {
            pl: 'Powrót do aktualności',
            en: 'Back to News'
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
            ru: 'Главна'
          }
        })
      ]
    }),
    defineField({
      name: 'socialSharing',
      title: 'Social Media Sharing',
      type: 'object',
      description: 'Configure social media sharing buttons for news articles',
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