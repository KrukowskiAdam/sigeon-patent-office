import { defineType } from 'sanity'

export default defineType({
  name: 'localizedRichTextPublications',
  title: 'Localized Rich Text (Publications)',
  type: 'object',
  fields: [
    {
      name: 'pl',
      title: 'Polish',
      type: 'array',
      of: [{ type: 'block' }],
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'en',
      title: 'English',
      type: 'array',
      of: [{ type: 'block' }],
    },
  ],
})
