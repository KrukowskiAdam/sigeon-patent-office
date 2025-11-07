import {defineField, defineType} from 'sanity'

export const contactBlock = defineType({
  name: 'contactBlock',
  title: 'Contact Info Block',
  type: 'object',
  description: 'Company contact information with address, phone, social media and map (without form)',
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
      name: 'mapEmbedCode',
      title: 'Google Maps Embed Code',
      type: 'text',
      rows: 8,
      description: 'Paste the iframe code from Google Maps embed',
    }),
    defineField({
      name: 'mapTitle',
      title: 'Map Section Title',
      type: 'localizedString',
      description: 'Title above the map (e.g., "Jak do nas dojechać?")',
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Contact Info Block',
        subtitle: 'Company info, address, social media and map (no form)',
      }
    },
  },
})