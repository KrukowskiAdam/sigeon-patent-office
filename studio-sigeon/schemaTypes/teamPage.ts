import {defineField, defineType} from 'sanity'

export const teamPage = defineType({
  name: 'teamPage',
  title: 'Team Page Settings',
  type: 'document',
  icon: () => '👥',
  fields: [
    defineField({
      name: 'slug',
      title: 'URL Slug',
      type: 'slug',
      options: {
        source: (doc: any) => doc.title?.pl || 'team',
        maxLength: 96,
      },
      validation: Rule => Rule.required(),
      description: 'URL path for this page (e.g., "team", "zespol")',
      initialValue: {
        current: 'team'
      }
    }),
    defineField({
      name: 'title',
      title: 'Page Title',
      type: 'localizedString',
      validation: Rule => Rule.required(),
      description: 'Main title for the team page',
      initialValue: {
        pl: 'Zespół',
        en: 'Team'
      }
    }),
    defineField({
      name: 'blocks',
      title: 'Page Content',
      type: 'array',
      description: 'Build your page with content blocks - these will appear before the team members section',
      of: [
        {type: 'heroBlock'},
        {type: 'textBlock'},
        {type: 'textImageBlock'},
        {type: 'textImageCarouselBlock'},
        {type: 'servicesBlock'},
        {type: 'bannerBlock'},
        {type: 'codeBlock'},
      ],
    }),
    defineField({
      name: 'teamSection',
      title: 'Team Members Section Settings',
      type: 'object',
      description: 'Configure how team members are displayed',
      fields: [
        defineField({
          name: 'showTeam',
          title: 'Show Team Members',
          type: 'boolean',
          initialValue: true,
          description: 'Toggle to show/hide team members section',
        }),
      ],
    }),
    defineField({
      name: 'buttons',
      title: 'Button Labels',
      type: 'object',
      description: 'Customize button text that appears on the page',
      fields: [
        defineField({
          name: 'backToHome',
          title: 'Back to Home Button',
          type: 'localizedString',
          description: 'Text for the button that returns to homepage',
        }),
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
        title: 'Team Page Settings',
      }
    },
  },
})
