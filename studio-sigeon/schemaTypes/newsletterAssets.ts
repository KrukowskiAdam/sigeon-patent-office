import {defineField, defineType} from 'sanity'
import {EnvelopeIcon} from '@sanity/icons'

export const newsletterAssets = defineType({
  name: 'newsletterAssets',
  title: 'Newsletter Images',
  type: 'document',
  icon: EnvelopeIcon,
  fields: [
    defineField({
      name: 'images',
      title: 'Newsletter Images',
      type: 'array',
      description: 'Upload images for newsletters. Links will appear below each image.',
      of: [
        {
          type: 'image',
          options: {
            hotspot: true,
          },
          fields: [
            defineField({
              name: 'name',
              title: 'Image Name (optional)',
              type: 'string',
              description: 'Descriptive name for this image (e.g., "Header November 2025", "Event banner")',
            }),
          ],
        },
      ],
    }),
    defineField({
      name: 'usageInstructions',
      title: '📋 How to get image links',
      type: 'text',
      description: 'Instructions for getting newsletter-ready URLs',
      initialValue: `JAK UŻYWAĆ ZDJĘĆ W NEWSLETTERZE:

1. UPLOAD ZDJĘĆ:
   - Dodaj zdjęcia powyżej w sekcji "Newsletter Images"
   - Możesz dodać kilka banerów/headerów

2. POBIERANIE LINKU:
   - Kliknij prawym na zdjęcie → "Copy image URL"
   - Otrzymasz: https://cdn.sanity.io/images/pofl8c47/production/abc123...

3. ZAMIEŃ NA WŁASNĄ DOMENĘ:
   - Zamień: "https://cdn.sanity.io/images/pofl8c47/production/"
   - Na: "https://sigeon.vercel.app/images/"
   - Wynik: https://sigeon.vercel.app/images/abc123.jpg

4. AUTOMATYCZNY RESIZE (opcjonalnie):
   - Dodaj ?w=600&h=300 dla konkretnego rozmiaru
   - Przykład: https://sigeon.vercel.app/images/abc123.jpg?w=600&h=200

GOTOWE! Wklej link do newslettera 📧`,
      rows: 15,
      readOnly: true,
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Newsletter Images',
        subtitle: 'Upload images and get links for newsletters',
      }
    },
  },
})