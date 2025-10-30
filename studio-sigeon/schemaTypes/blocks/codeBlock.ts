import {defineField, defineType} from 'sanity'

export const codeBlock = defineType({
  name: 'codeBlock',
  title: 'Code/Embed Block',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Title (optional)',
      type: 'localizedString',
    }),
    defineField({
      name: 'code',
      title: 'HTML/Embed Code',
      type: 'text',
      rows: 10,
      description: 'Paste HTML code, iframe, or embed code here (e.g., Google Maps, YouTube, etc.)',
    }),
    defineField({
      name: 'description',
      title: 'Description (optional)',
      type: 'localizedText',
      description: 'Optional description displayed below the embedded content',
    }),
  ],
  preview: {
    select: {
      title: 'title.pl',
      code: 'code',
    },
    prepare(selection) {
      const {title, code} = selection
      return {
        title: title || 'Code/Embed Block',
        subtitle: code ? `${code.substring(0, 50)}...` : 'No code added',
      }
    },
  },
})