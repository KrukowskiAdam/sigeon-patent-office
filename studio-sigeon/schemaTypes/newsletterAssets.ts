import {defineField, defineType} from 'sanity'
import {EnvelopeIcon} from '@sanity/icons'
import { FilenameInput } from '../components/FilenameInput'
import { NewsletterUrlInput } from '../components/NewsletterUrlInput'

export const newsletterAssets = defineType({
  name: 'newsletterAssets',
  title: 'Newsletter Images',
  type: 'document',
  icon: EnvelopeIcon,
  fields: [
    defineField({
      name: 'domain',
      title: '🌐 Newsletter URL Domain',
      type: 'string',
      description: 'Your website domain for newsletter image links (without https://). Change when switching from Vercel to custom domain.',
      placeholder: 'sigeon.vercel.app',
      initialValue: 'sigeon.vercel.app',
      validation: (Rule) => Rule.required().custom((domain) => {
        if (!domain) return 'Domain is required'
        const cleanDomain = domain.replace(/^https?:\/\//, '').replace(/\/$/, '')
        if (cleanDomain !== domain) {
          return 'Enter domain without https:// (e.g., sigeon.pl)'
        }
        return true
      })
    }),
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
              title: '🔗 Newsletter URL (auto-generated from filename)',
              type: 'string',
              description: 'Copy this URL for your newsletters. Updates automatically when you change filename.',
              components: {
                input: NewsletterUrlInput
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