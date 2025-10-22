import {defineField, defineType} from 'sanity'

export const teamMember = defineType({
  name: 'teamMember',
  title: 'Team Member',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Full Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96,
      },
    }),
    defineField({
      name: 'position',
      title: 'Position/Title',
      type: 'localizedString',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'bio',
      title: 'Biography',
      type: 'localizedRichText',
    }),
    defineField({
      name: 'photo',
      title: 'Photo',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'specializations',
      title: 'Specializations',
      type: 'array',
      of: [
        {
          type: 'string',
          options: {
            list: [
              {title: 'Patents', value: 'patents'},
              {title: 'Trademarks', value: 'trademarks'},
              {title: 'Industrial Design', value: 'design'},
              {title: 'Copyright', value: 'copyright'},
              {title: 'EU Law', value: 'eu-law'},
              {title: 'Litigation', value: 'litigation'},
            ],
          },
        },
      ],
    }),
    defineField({
      name: 'qualifications',
      title: 'Qualifications & Education',
      type: 'localizedRichText',
    }),
    defineField({
      name: 'email',
      title: 'Email',
      type: 'email',
    }),
    defineField({
      name: 'phone',
      title: 'Phone',
      type: 'string',
    }),
    defineField({
      name: 'languages',
      title: 'Languages Spoken',
      type: 'array',
      of: [{type: 'string'}],
      options: {
        list: [
          {title: 'Polish', value: 'pl'},
          {title: 'English', value: 'en'},
          {title: 'German', value: 'de'},
          {title: 'French', value: 'fr'},
          {title: 'Russian', value: 'ru'},
        ],
      },
    }),
    defineField({
      name: 'displayOrder',
      title: 'Display Order',
      type: 'number',
      description: 'Order in team listings (lower numbers first)',
    }),
    defineField({
      name: 'showOnWebsite',
      title: 'Show on Website',
      type: 'boolean',
      initialValue: true,
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'position.pl',
      media: 'photo',
    },
  },
  orderings: [
    {
      title: 'Display Order',
      name: 'displayOrderAsc',
      by: [{field: 'displayOrder', direction: 'asc'}],
    },
    {
      title: 'Name',
      name: 'nameAsc',
      by: [{field: 'name', direction: 'asc'}],
    },
  ],
})