import { defineType } from 'sanity'

export default defineType({
  name: 'twoColumnTextBlock',
  title: 'Two Column Text Block',
  type: 'object',
  fields: [
    {
      name: 'leftColumn',
      title: 'Left Column',
      type: 'object',
      fields: [
        {
          name: 'backgroundColor',
          title: 'Background Color',
          type: 'string',
          options: {
            list: [
              { title: 'White', value: 'white' },
              { title: 'Gray', value: 'gray' },
            ],
          },
          initialValue: 'white',
        },
        {
          name: 'items',
          title: 'Content Items',
          type: 'array',
          of: [
            {
              type: 'object',
              name: 'textItem',
              title: 'Text Item',
              fields: [
                {
                  name: 'title',
                  title: 'Title',
                  type: 'localizedString',
                },
                {
                  name: 'content',
                  title: 'Content',
                  type: 'localizedRichText',
                  validation: (Rule) => Rule.required(),
                },
              ],
              preview: {
                select: {
                  title: 'title.pl',
                },
                prepare(selection) {
                  const { title } = selection
                  return {
                    title: title || 'Text block',
                  }
                },
              },
            },
          ],
          validation: (Rule) => Rule.required().min(1),
        },
      ],
    },
    {
      name: 'rightColumn',
      title: 'Right Column',
      type: 'object',
      fields: [
        {
          name: 'backgroundColor',
          title: 'Background Color',
          type: 'string',
          options: {
            list: [
              { title: 'White', value: 'white' },
              { title: 'Gray', value: 'gray' },
            ],
          },
          initialValue: 'white',
        },
        {
          name: 'items',
          title: 'Content Items',
          type: 'array',
          of: [
            {
              type: 'object',
              name: 'textItem',
              title: 'Text Item',
              fields: [
                {
                  name: 'title',
                  title: 'Title',
                  type: 'localizedString',
                },
                {
                  name: 'content',
                  title: 'Content',
                  type: 'localizedRichText',
                  validation: (Rule) => Rule.required(),
                },
              ],
              preview: {
                select: {
                  title: 'title.pl',
                },
                prepare(selection) {
                  const { title } = selection
                  return {
                    title: title || 'Text block',
                  }
                },
              },
            },
          ],
          validation: (Rule) => Rule.required().min(1),
        },
      ],
    },
  ],
  preview: {
    select: {
      leftCount: 'leftColumn.items',
      rightCount: 'rightColumn.items',
    },
    prepare(selection) {
      const { leftCount, rightCount } = selection
      const leftItems = Array.isArray(leftCount) ? leftCount.length : 0
      const rightItems = Array.isArray(rightCount) ? rightCount.length : 0
      return {
        title: 'Two Column Text Block',
        subtitle: `Left: ${leftItems} items | Right: ${rightItems} items`,
      }
    },
  },
})
