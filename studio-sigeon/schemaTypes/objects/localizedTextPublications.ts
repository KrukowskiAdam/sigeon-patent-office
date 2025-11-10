import { defineType } from 'sanity'

export default defineType({
  name: 'localizedTextPublications',
  title: 'Localized Text (Publications)',
  type: 'object',
  fields: [
    {
      name: 'pl',
      title: 'Polish',
      type: 'text',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'en',
      title: 'English',
      type: 'text',
    },
  ],
})
