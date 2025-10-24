import {defineField, defineType} from 'sanity'

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
      name: 'seoSettings',
      title: '🔍 SEO & Meta Settings',
      options: {collapsible: true, collapsed: true}
    }
  ],
  fields: [
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
        {type: 'servicesBlock'},
        {type: 'bannerBlock'},
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