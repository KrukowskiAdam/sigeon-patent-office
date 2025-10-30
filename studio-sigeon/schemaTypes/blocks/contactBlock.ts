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