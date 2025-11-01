import {defineField, defineType} from 'sanity'
import {linkField} from './objects/linkField'

export const homepage = defineType({
  name: 'homepage',
  title: 'Homepage',
  type: 'document',
  fieldsets: [
    {
      name: 'content',
      title: '📄 Page Content',
      options: {collapsible: true, collapsed: false}
    },
    {
      name: 'newsSettings',
      title: '📰 News Section Settings', 
      options: {collapsible: true, collapsed: true}
    },
    {
      name: 'teamSettings',
      title: '👥 Team Section Settings',
      options: {collapsible: true, collapsed: true}
    },
    {
      name: 'contactSettings',
      title: '📧 Contact Section',
      options: {collapsible: true, collapsed: true}
    },
    {
      name: 'seoSettings',
      title: '🔍 SEO & Meta Settings',
      options: {collapsible: true, collapsed: true}
    }
  ],
  fields: [
    defineField({
      name: 'siteTitle',
      title: 'Site Title',
      type: 'localizedString',
      fieldset: 'seoSettings',
      description: 'Main site title shown in browser tab and search results',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'siteDescription',
      title: 'Site Description',
      type: 'localizedText',
      fieldset: 'seoSettings',
      description: 'Main site description for search engines (SEO)',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'content',
      title: 'Content Blocks',
      type: 'array',
      fieldset: 'content',
      of: [
        {type: 'heroBlock'},
        {type: 'textBlock'},
        {type: 'textImageBlock'},
        {type: 'textImageCarouselBlock'},
        {type: 'twoColumnTextBlock'},
        {type: 'servicesBlock'},
        {type: 'bannerBlock'},
        {type: 'footerBlock'},
      ],
      description: 'Build your homepage with content blocks',
    }),
    defineField({
      name: 'newsSection',
      title: 'News Section Configuration',
      type: 'object',
      fieldset: 'newsSettings',
      fields: [
        {
          name: 'title',
          title: 'Section Title',
          type: 'localizedString',
          initialValue: {
            pl: 'Aktualności',
            en: 'News'
          }
        },
        {
          name: 'subtitle',
          title: 'Section Subtitle',
          type: 'localizedString',
        },
        {
          name: 'readMoreLabel',
          title: 'Read More Button Label',
          type: 'localizedString',
          initialValue: {
            pl: 'Czytaj więcej',
            en: 'Read more'
          }
        },
        linkField({
          name: 'cta',
          title: 'CTA Button (label + link)'
        }),
        {
          name: 'showFeaturedNews',
          title: 'Show Featured News',
          type: 'boolean',
          initialValue: true,
        },
        {
          name: 'maxArticles',
          title: 'Maximum Articles to Show',
          type: 'number',
          initialValue: 4,
        },
      ],
    }),
    defineField({
      name: 'teamSection',
      title: 'Team Section Configuration',
      type: 'object',
      fieldset: 'teamSettings',
      fields: [
        {
          name: 'title',
          title: 'Section Title',
          type: 'localizedString',
          initialValue: {
            pl: 'Nasz zespół',
            en: 'Our Team'
          }
        },
        {
          name: 'subtitle',
          title: 'Section Subtitle',
          type: 'localizedString',
        },
        linkField({
          name: 'cta',
          title: 'CTA Button (label + link)'
        }),
        {
          name: 'showTeam',
          title: 'Show Team Section',
          type: 'boolean',
          initialValue: true,
        },
        {
          name: 'maxMembers',
          title: 'Maximum Team Members to Show',
          type: 'number',
          initialValue: 4,
        },
      ],
    }),
    defineField({
      name: 'contactSection',
      title: 'Contact Section Configuration',
      type: 'object',
      fieldset: 'contactSettings',
      fields: [
        {
          name: 'title',
          title: 'Section Title',
          type: 'localizedString',
          initialValue: {
            pl: 'Kontakt',
            en: 'Contact'
          }
        },
        {
          name: 'subtitle',
          title: 'Section Subtitle',
          type: 'localizedString',
        },
        {
          name: 'showContact',
          title: 'Show Contact Section',
          type: 'boolean',
          initialValue: true,
        },
        {
          name: 'content',
          title: 'Content Blocks',
          type: 'array',
          of: [
            {type: 'heroBlock'},
            {type: 'textBlock'},
            {type: 'textImageBlock'},
            {type: 'textImageCarouselBlock'},
            {type: 'servicesBlock'},
            {type: 'bannerBlock'},
            {type: 'contactBlock'},
            {type: 'footerBlock'},
          ],
          description: 'Content blocks for contact section',
        },
      ],
    }),
    defineField({
      name: 'seo',
      title: 'SEO & Meta Tags',
      type: 'seo',
      fieldset: 'seoSettings',
    }),
  ],
  preview: {
    select: {
      newsTitle: 'newsSection.title.pl',
    },
    prepare(selection) {
      const {newsTitle} = selection
      return {
        title: 'Homepage',
        subtitle: newsTitle || 'Main page content',
      }
    },
  },
})