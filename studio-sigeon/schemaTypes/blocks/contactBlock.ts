import {defineField, defineType} from 'sanity'

export const contactBlock = defineType({
  name: 'contactBlock',
  title: 'Contact Block',
  type: 'object',
  fields: [
    defineField({
      name: 'leftColumnTop',
      title: 'Left Column - Top Section (Company Info)',
      type: 'localizedRichText',
      description: 'Company name, address, email, phone numbers with formatting',
    }),
    defineField({
      name: 'socialMedia',
      title: 'Social Media Links',
      type: 'object',
      description: 'Add social media profile links - icons will appear automatically',
      fields: [
        defineField({
          name: 'facebook',
          title: 'Facebook URL',
          type: 'url',
          description: 'Full Facebook profile URL (e.g., https://www.facebook.com/sigeonip)',
        }),
        defineField({
          name: 'linkedin',
          title: 'LinkedIn URL',
          type: 'url',
          description: 'Full LinkedIn company URL',
        }),
      ],
    }),
    defineField({
      name: 'leftColumnBottom',
      title: 'Left Column - Bottom Section (Legal Info)',
      type: 'localizedRichText',
      description: 'NIP, KRS, capital, legal links with formatting',
    }),
    defineField({
      name: 'contactForm',
      title: 'Contact Form (Right Column)',
      type: 'object',
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
        defineField({
          name: 'formEmail',
          title: 'Email to Send To',
          type: 'string',
          description: 'Where form submissions will be sent',
        }),
      ],
    }),
    defineField({
      name: 'mapEmbedCode',
      title: 'Google Maps Embed Code',
      type: 'text',
      rows: 8,
      description: 'Paste the iframe code from Google Maps embed',
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Contact Section',
        subtitle: '2-column layout with contact info and form',
      }
    },
  },
})