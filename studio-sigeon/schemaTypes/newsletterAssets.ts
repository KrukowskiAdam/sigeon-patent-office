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

          ],
          preview: {
            select: {
              title: 'originalFilename',
              media: 'asset'
            },
            prepare(selection: any) {
              const {title, media} = selection
              return {
                title: title || 'Unnamed image',
                subtitle: 'Newsletter image',
                media: media
              }
            }
          }
        },
      ],
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