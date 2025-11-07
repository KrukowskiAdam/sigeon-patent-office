import {defineField, defineType} from 'sanity'
import {EnvelopeIcon} from '@sanity/icons'

export const newsletterAssets = defineType({
  name: 'newsletterAssets',
  title: 'Newsletter Assets',
  type: 'document',
  icon: EnvelopeIcon,
  groups: [
    {
      name: 'branding',
      title: 'Branding & Logos',
    },
    {
      name: 'images',
      title: 'Images & Graphics',
    },
    {
      name: 'social',
      title: 'Social Media Icons',
    },
  ],
  fields: [
    // Branding Section
    defineField({
      name: 'companyLogo',
      title: 'Company Logo',
      type: 'image',
      group: 'branding',
      description: 'Main company logo for newsletters',
      options: {
        hotspot: true,
      },
      fields: [
        defineField({
          name: 'alt',
          title: 'Alt Text',
          type: 'string',
          description: 'Alternative text for accessibility',
        }),
      ],
    }),
    defineField({
      name: 'logoVariants',
      title: 'Logo Variants',
      type: 'array',
      group: 'branding',
      description: 'Different logo versions (dark, light, small, etc.)',
      of: [
        {
          type: 'image',
          options: {
            hotspot: true,
          },
          fields: [
            defineField({
              name: 'name',
              title: 'Variant Name',
              type: 'string',
              description: 'e.g., "Dark background", "Small version", "White logo"',
            }),
            defineField({
              name: 'alt',
              title: 'Alt Text',
              type: 'string',
            }),
          ],
        },
      ],
    }),

    // Images & Graphics Section
    defineField({
      name: 'headerImages',
      title: 'Newsletter Headers',
      type: 'array',
      group: 'images',
      description: 'Header/banner images for newsletters',
      of: [
        {
          type: 'image',
          options: {
            hotspot: true,
          },
          fields: [
            defineField({
              name: 'title',
              title: 'Image Title',
              type: 'string',
              description: 'Descriptive title for this header',
            }),
            defineField({
              name: 'alt',
              title: 'Alt Text',
              type: 'string',
            }),
            defineField({
              name: 'usage',
              title: 'Usage Description',
              type: 'text',
              description: 'When to use this header (e.g., "Monthly newsletter", "Special announcements")',
              rows: 2,
            }),
          ],
        },
      ],
    }),
    defineField({
      name: 'companyPhotos',
      title: 'Company Photos',
      type: 'array',
      group: 'images',
      description: 'Office photos, team photos, events, etc.',
      of: [
        {
          type: 'image',
          options: {
            hotspot: true,
          },
          fields: [
            defineField({
              name: 'title',
              title: 'Photo Title',
              type: 'string',
            }),
            defineField({
              name: 'alt',
              title: 'Alt Text',
              type: 'string',
            }),
            defineField({
              name: 'description',
              title: 'Description',
              type: 'text',
              rows: 2,
            }),
          ],
        },
      ],
    }),
    defineField({
      name: 'decorativeElements',
      title: 'Decorative Elements',
      type: 'array',
      group: 'images',
      description: 'Icons, dividers, backgrounds, decorative graphics',
      of: [
        {
          type: 'image',
          options: {
            hotspot: true,
          },
          fields: [
            defineField({
              name: 'name',
              title: 'Element Name',
              type: 'string',
              description: 'e.g., "Divider line", "Background pattern", "Patent icon"',
            }),
            defineField({
              name: 'alt',
              title: 'Alt Text',
              type: 'string',
            }),
          ],
        },
      ],
    }),

    // Social Media Section
    defineField({
      name: 'socialIcons',
      title: 'Social Media Icons',
      type: 'object',
      group: 'social',
      description: 'Custom social media icons for newsletters',
      fields: [
        defineField({
          name: 'facebook',
          title: 'Facebook Icon',
          type: 'image',
          options: { hotspot: true },
        }),
        defineField({
          name: 'linkedin',
          title: 'LinkedIn Icon',
          type: 'image',
          options: { hotspot: true },
        }),
        defineField({
          name: 'twitter',
          title: 'Twitter Icon',
          type: 'image',
          options: { hotspot: true },
        }),
        defineField({
          name: 'youtube',
          title: 'YouTube Icon',
          type: 'image',
          options: { hotspot: true },
        }),
        defineField({
          name: 'instagram',
          title: 'Instagram Icon',
          type: 'image',
          options: { hotspot: true },
        }),
      ],
    }),
    defineField({
      name: 'socialIconSets',
      title: 'Social Icon Sets',
      type: 'array',
      group: 'social',
      description: 'Complete sets of social icons in different styles',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'setName',
              title: 'Set Name',
              type: 'string',
              description: 'e.g., "Colored icons", "White icons", "Outlined style"',
            }),
            defineField({
              name: 'facebook',
              title: 'Facebook',
              type: 'image',
              options: { hotspot: true },
            }),
            defineField({
              name: 'linkedin',
              title: 'LinkedIn',
              type: 'image',
              options: { hotspot: true },
            }),
            defineField({
              name: 'twitter',
              title: 'Twitter',
              type: 'image',
              options: { hotspot: true },
            }),
            defineField({
              name: 'youtube',
              title: 'YouTube',
              type: 'image',
              options: { hotspot: true },
            }),
            defineField({
              name: 'instagram',
              title: 'Instagram',
              type: 'image',
              options: { hotspot: true },
            }),
          ],
          preview: {
            select: {
              title: 'setName',
              media: 'facebook',
            },
          },
        },
      ],
    }),

    // Usage Instructions
    defineField({
      name: 'usageInstructions',
      title: 'Usage Instructions',
      type: 'text',
      description: 'How to use these assets in newsletters and get the URLs',
      initialValue: `JAK UŻYWAĆ GRAFIK W NEWSLETTERZE:

1. UPLOAD GRAFIK:
   - Dodaj obrazy w odpowiednich sekcjach powyżej
   - Sanity automatycznie je przetworzy i zoptymalizuje

2. POBIERANIE LINKÓW:
   - Kliknij prawym na obraz → "Copy image URL"
   - Otrzymasz link: https://cdn.sanity.io/images/pofl8c47/production/abc123...
   
3. LINK DO NEWSLETTERA:
   - Zamień "https://cdn.sanity.io/images/pofl8c47/production/" na "https://sigeon.pl/images/"
   - Przykład: https://sigeon.pl/images/abc123-500x300.jpg

4. OPTYMALIZACJA:
   - Dodaj ?w=500&h=300 na końcu dla automatycznego resize
   - Przykład: https://sigeon.pl/images/abc123.jpg?w=500&h=300

5. NAJLEPSZE PRAKTYKI:
   - Logo: maksymalnie 200px wysokości
   - Header: 600px szerokości
   - Social icons: 32x32px lub 48x48px
   - Zdjęcia: nie większe niż 800px szerokości`,
      rows: 20,
      readOnly: true,
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Newsletter Assets',
        subtitle: 'Graphics and images for email marketing',
      }
    },
  },
})