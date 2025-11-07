import {defineField, defineType} from 'sanity'
import {CogIcon} from '@sanity/icons'

export const contactSettings = defineType({
  name: 'contactSettings',
  title: 'Contact Settings',
  type: 'document',
  icon: CogIcon,
  groups: [
    {
      name: 'info',
      title: 'Contact Information',
    },
    {
      name: 'form',
      title: 'Contact Form',
    },
    {
      name: 'map',
      title: 'Map',
    },
  ],
  fields: [
    // Contact Information
    defineField({
      name: 'leftColumnTop',
      title: 'Left Column - Top Section (Company Info)',
      type: 'localizedRichText',
      description: 'Company name, address, email, phone numbers with formatting',
      group: 'info',
    }),
    defineField({
      name: 'socialMedia',
      title: 'Social Media Links',
      type: 'object',
      group: 'info',
      fields: [
        defineField({
          name: 'facebook',
          title: 'Facebook URL',
          type: 'url',
        }),
        defineField({
          name: 'linkedin',
          title: 'LinkedIn URL',
          type: 'url',
        }),
      ],
    }),
    defineField({
      name: 'leftColumnBottom',
      title: 'Left Column - Bottom Section (Legal Info)',
      type: 'localizedRichText',
      description: 'NIP, KRS, capital, legal links with formatting',
      group: 'info',
    }),

    // Contact Form Settings
    defineField({
      name: 'contactForm',
      title: 'Contact Form',
      type: 'object',
      group: 'form',
      fields: [
        defineField({
          name: 'title',
          title: 'Form Title',
          type: 'localizedString',
        }),
        defineField({
          name: 'subjectLabel',
          title: 'Subject Field Label',
          type: 'localizedString',
          description: 'Label for the subject/topic field',
        }),
        defineField({
          name: 'subjectPlaceholder',
          title: 'Subject Field Placeholder',
          type: 'localizedString',
          description: 'Placeholder text for subject field',
        }),
        defineField({
          name: 'emailLabel',
          title: 'Email Field Label',
          type: 'localizedString',
          description: 'Label for the email field',
        }),
        defineField({
          name: 'emailPlaceholder',
          title: 'Email Field Placeholder',
          type: 'localizedString',
          description: 'Placeholder text for email field',
        }),
        defineField({
          name: 'messageLabel',
          title: 'Message Field Label',
          type: 'localizedString',
          description: 'Label for the message/content field',
        }),
        defineField({
          name: 'messagePlaceholder',
          title: 'Message Field Placeholder',
          type: 'localizedString',
          description: 'Placeholder text for message field',
        }),
        defineField({
          name: 'submitButtonLabel',
          title: 'Submit Button Label',
          type: 'localizedString',
          description: 'Text for the submit button',
        }),
      ],
    }),

    // Map Settings
    defineField({
      name: 'mapEmbedCode',
      title: 'Map Embed Code',
      type: 'text',
      description: 'HTML iframe code from Google Maps or other map service',
      group: 'map',
    }),
    defineField({
      name: 'mapTitle',
      title: 'Map Section Title',
      type: 'localizedString',
      group: 'map',
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Contact Settings',
        subtitle: 'Configure contact information, form and map',
      }
    },
  },
})
