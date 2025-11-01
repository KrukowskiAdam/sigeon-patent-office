import {defineField, defineType} from 'sanity'

export const teamPage = defineType({
  name: 'teamPage',
  title: 'Team Page Settings',
  type: 'document',
  fields: [
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
