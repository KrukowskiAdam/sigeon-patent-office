import {defineType} from 'sanity'

export const localizedRichTextPLEN = defineType({
  name: 'localizedRichTextPLEN',
  title: 'Localized Rich Text (PL/EN)',
  type: 'object',
  fields: [
    {
      name: 'pl',
      title: 'Polish',
      type: 'array',
      of: [{type: 'block'}],
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'en',
      title: 'English',
      type: 'array',
      of: [{type: 'block'}],
    },
  ],
})
