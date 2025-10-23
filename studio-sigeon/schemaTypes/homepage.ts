import {defineField, defineType} from 'sanity'

export const homepage = defineType({
  name: 'homepage',
  title: 'Homepage',
  type: 'document',
  fields: [
    defineField({
      name: 'content',
      title: 'Page Content',
      type: 'array',
      of: [
        {type: 'heroBlock'},
        {type: 'textBlock'},
        {type: 'textImageBlock'},
        {type: 'servicesBlock'},
        {type: 'bannerBlock'},
      ],
      description: 'Build your homepage with content blocks',
    }),
    defineField({
      name: 'featuredServices',
      title: 'Featured Services',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'title',
              title: 'Service Title',
              type: 'localizedString',
            },
            {
              name: 'description',
              title: 'Service Description',
              type: 'localizedText',
            },
            {
              name: 'icon',
              title: 'Service Icon',
              type: 'string',
              options: {
                list: [
                  {title: 'Patent', value: 'patent'},
                  {title: 'Trademark', value: 'trademark'},
                  {title: 'Design', value: 'design'},
                  {title: 'Copyright', value: 'copyright'},
                  {title: 'Legal', value: 'legal'},
                  {title: 'Consulting', value: 'consulting'},
                ],
              },
            },
            {
              name: 'link',
              title: 'Service Link',
              type: 'string',
            },
          ],
        },
      ],
      description: 'Services to highlight on the homepage',
    }),
    defineField({
      name: 'newsSection',
      title: 'News Section Settings',
      type: 'object',
      fields: [
        {
          name: 'title',
          title: 'Section Title',
          type: 'localizedString',
          initialValue: {
            pl: 'Aktualności',
            en: 'News',
            de: 'Nachrichten'
          }
        },
        {
          name: 'subtitle',
          title: 'Section Subtitle',
          type: 'localizedString',
        },
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
      title: 'Team Section Settings',
      type: 'object',
      fields: [
        {
          name: 'title',
          title: 'Section Title',
          type: 'localizedString',
          initialValue: {
            pl: 'Nasz zespół',
            en: 'Our Team',
            de: 'Unser Team'
          }
        },
        {
          name: 'subtitle',
          title: 'Section Subtitle',
          type: 'localizedString',
        },
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
      name: 'seo',
      title: 'SEO Settings',
      type: 'seo',
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