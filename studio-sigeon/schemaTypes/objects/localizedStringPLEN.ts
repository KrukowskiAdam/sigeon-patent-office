import {defineType} from 'sanity'

export const localizedStringPLEN = defineType({
  name: 'localizedStringPLEN',
  title: 'Localized String (PL/EN)',
  type: 'object',
  fields: [
    {
      name: 'pl',
      title: 'Polish',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'en',
      title: 'English',
      type: 'string',
    },
  ],
})
