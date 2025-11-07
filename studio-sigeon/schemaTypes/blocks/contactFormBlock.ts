import {defineField, defineType} from 'sanity'
import {EnvelopeIcon} from '@sanity/icons'

export const contactFormBlock = defineType({
  name: 'contactFormBlock',
  title: 'Contact Form Block',
  type: 'object',
  icon: EnvelopeIcon,
  description: 'Standalone contact form that uses global form settings',
  fields: [
    defineField({
      name: 'showTitle',
      title: 'Show Form Title',
      type: 'boolean',
      description: 'Display the form title above the form',
      initialValue: true,
    }),
    defineField({
      name: 'customTitle',
      title: 'Custom Title (Optional)',
      type: 'localizedString',
      description: 'Override the default form title with a custom one',
    }),
    defineField({
      name: 'description',
      title: 'Form Description (Optional)',
      type: 'localizedText',
      description: 'Optional text displayed below the title',
    }),
    defineField({
      name: 'backgroundColor',
      title: 'Background Style',
      type: 'string',
      options: {
        list: [
          {title: 'White background', value: 'white'},
          {title: 'Light gray background', value: 'gray'},
          {title: 'Transparent', value: 'transparent'},
        ],
      },
      initialValue: 'white',
    }),
    defineField({
      name: 'padding',
      title: 'Padding',
      type: 'string',
      options: {
        list: [
          {title: 'Small padding', value: 'small'},
          {title: 'Medium padding', value: 'medium'},
          {title: 'Large padding', value: 'large'},
        ],
      },
      initialValue: 'large',
    }),
  ],
  preview: {
    select: {
      showTitle: 'showTitle',
      customTitle: 'customTitle.pl',
      backgroundColor: 'backgroundColor',
    },
    prepare({showTitle, customTitle, backgroundColor}) {
      return {
        title: 'Contact Form',
        subtitle: `${customTitle || (showTitle ? 'With title' : 'No title')} • ${backgroundColor} background`,
        media: EnvelopeIcon,
      }
    },
  },
})