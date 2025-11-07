import {defineField, defineType} from 'sanity'
import {EnvelopeIcon} from '@sanity/icons'

export const contactBlock = defineType({
  name: 'contactBlock',
  title: 'Contact Block',
  type: 'object',
  icon: EnvelopeIcon,
  description: 'Complete contact section with info, form and map from Contact Settings',
  fields: [
    defineField({
      name: 'placeholder',
      title: 'Placeholder',
      type: 'string',
      hidden: true,
      initialValue: 'contact',
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Contact Section',
        subtitle: 'Company info, form and map (uses Contact Settings)',
        media: EnvelopeIcon,
      }
    },
  },
})
