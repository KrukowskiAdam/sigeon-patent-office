import { defineType } from 'sanity'
import {linkField} from '../objects/linkField'

export const bannerBlock = defineType({
  name: 'bannerBlock',
  title: 'Baner z karuzelą',
  type: 'object',
  fields: [
    {
      name: 'items',
      title: 'Elementy banera',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'image',
              title: 'Obraz tła',
              type: 'image',
              options: {
                hotspot: true
              },
              fields: [
                {
                  name: 'alt',
                  title: 'Tekst alternatywny',
                  type: 'string'
                }
              ]
            },
            {
              name: 'title',
              title: 'Tytuł',
              type: 'localizedString'
            },
            {
              name: 'content',
              title: 'Treść',
              type: 'localizedRichText'
            },
            {
              name: 'buttonText',
              title: 'Tekst przycisku',
              type: 'localizedString'
            },
            linkField({
              name: 'buttonLink',
              title: 'Link przycisku',
            }),
            {
              name: 'overlay',
              title: 'Ciemna nakładka',
              type: 'boolean',
              initialValue: true
            }
          ],
          preview: {
            select: {
              title: 'title.pl',
              media: 'image'
            }
          }
        }
      ]
    },
    {
      name: 'autoplay',
      title: 'Automatyczne przewijanie',
      type: 'boolean',
      initialValue: false
    },
    {
      name: 'showIndicators',
      title: 'Pokaż wskaźniki',
      type: 'boolean',
      initialValue: true
    },
    {
      name: 'height',
      title: 'Wysokość',
      type: 'string',
      options: {
        list: [
          { title: 'Mała', value: 'small' },
          { title: 'Średnia', value: 'medium' },
          { title: 'Duża', value: 'large' },
          { title: 'Pełny ekran', value: 'full' }
        ]
      },
      initialValue: 'large'
    }
  ],
  preview: {
    select: {
      items: 'items'
    },
    prepare({ items }) {
      const count = items?.length || 0
      return {
        title: `Baner (${count} ${count === 1 ? 'element' : 'elementów'})`
      }
    }
  }
})