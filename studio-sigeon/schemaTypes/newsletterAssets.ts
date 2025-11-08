import {defineField, defineType} from 'sanity'
import {EnvelopeIcon} from '@sanity/icons'
import { FilenameInput } from '../components/FilenameInput'

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
      description: '⬆️ Upload images for newsletters. Original filename will be preserved below.',
      of: [
        {
          type: 'image',
          options: {
            hotspot: true,
            metadata: ['blurhash', 'lqip', 'palette', 'exif', 'location']
          },
          fields: [
            defineField({
              name: 'originalFilename',
              title: '📁 Filename for Newsletter',
              type: 'string', 
              description: '✨ Filename auto-suggested from upload. Edit if needed.',
              components: {
                input: FilenameInput
              },
              validation: (Rule) => Rule.custom((filename, context) => {
                if (!filename) return 'Filename is required for newsletter links'
                if (!filename.includes('.')) {
                  return 'Filename must include extension (e.g., .jpg, .png)'
                }
                const validFilename = /^[a-zA-Z0-9._-]+\.[a-zA-Z]{2,4}$/.test(filename)
                if (!validFilename) {
                  return 'Use only letters, numbers, dots, dashes, and underscores'
                }
                return true
              })
            }),
            defineField({
              name: 'newsletterUrl',
              title: '🔗 Newsletter URL (copy this)',
              type: 'string',
              description: 'This is your final URL for newsletters - copy and paste it',
              readOnly: true,
              initialValue: (parent: any, context: any) => {
                const filename = parent?.originalFilename || 'your-image.jpg'
                return `https://sigeon.vercel.app/images/${filename}`
              }
            }),
            defineField({
              name: 'description',
              title: '📝 Description (optional)',
              type: 'string',
              description: 'What is this image for? (e.g., "November newsletter header")',
            }),
          ],
          preview: {
            select: {
              title: 'originalFilename',
              subtitle: 'description',
              media: 'asset'
            },
            prepare(selection: any) {
              const {title, subtitle, media} = selection
              return {
                title: title || 'Unnamed image',
                subtitle: subtitle || 'Newsletter image',
                media: media
              }
            }
          }
        },
      ],
    }),
    defineField({
      name: 'usageInstructions',
      title: '📋 How to use images in newsletters',
      type: 'text',
      description: 'Simple instructions for newsletter images',
      initialValue: `JAK UŻYWAĆ ZDJĘĆ W NEWSLETTERZE:

1. UPLOAD ZDJĘĆ:
   - Dodaj zdjęcie powyżej 
   - Wpisz oryginalną nazwę pliku (np. biomed.jpg)
   - System automatycznie wygeneruje gotowy link

2. KOPIOWANIE LINKU:
   - Skopiuj URL z pola "Newsletter URL" 
   - Nazwa pliku zostanie zachowana!
   - Przykład: https://sigeon.vercel.app/images/biomed.jpg

3. WKLEJ DO NEWSLETTERA:
   - Gotowe! Używaj linku bezpośrednio w newsletterze
   - Nazwa pozostaje czytelna (biomed.jpg zamiast dziwnych znaków)

UWAGA: Upewnij się że nazwa pliku jest unikalna! 📧`,
      rows: 12,
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