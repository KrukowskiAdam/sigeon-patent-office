import { defineType } from 'sanity'

export default defineType({
  name: 'localizedStringPublications',
  title: 'Localized String (Publications)',
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
