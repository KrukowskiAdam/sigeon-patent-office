import {defineField, defineType} from 'sanity'
import {linkField} from '../objects/linkField'

export const textImageCarouselBlock = defineType({
  name: 'textImageCarouselBlock',
  title: 'Text + Image Carousel',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Section Title',
      type: 'localizedString',
      description: 'Optional main title for the entire carousel section',
    }),
    defineField({
      name: 'slides',
      title: 'Carousel Slides',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'textImageSlide',
          title: 'Text + Image Slide',
          fields: [
            defineField({
              name: 'title',
              title: 'Slide Title',
              type: 'localizedString',
            }),
            defineField({
              name: 'content',
              title: 'Slide Content',
              type: 'localizedRichText',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'image',
              title: 'Slide Image',
              type: 'image',
              options: {
                hotspot: true,
              },
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'imageAlt',
              title: 'Image Alt Text',
              type: 'localizedString',
              description: 'Alternative text for accessibility',
            }),
            defineField({
              name: 'layout',
              title: 'Slide Layout',
              type: 'string',
              options: {
                list: [
                  {title: 'Text Left, Image Right', value: 'text-left'},
                  {title: 'Image Left, Text Right', value: 'image-left'},
                ],
              },
              initialValue: 'text-left',
            }),
            defineField({
              name: 'imageSize',
              title: 'Image Size',
              type: 'string',
              options: {
                list: [
                  {title: 'Small (1/3)', value: 'small'},
                  {title: 'Medium (1/2)', value: 'medium'},
                  {title: 'Large (2/3)', value: 'large'},
                ],
              },
              initialValue: 'medium',
            }),
            linkField({
              name: 'link',
              title: 'Slide Link',
              description: 'Optional link for this slide',
            }),
          ],
          preview: {
            select: {
              title: 'title.pl',
              media: 'image',
              layout: 'layout',
            },
            prepare({title, media, layout}) {
              const layoutText = layout === 'text-left' ? 'Text + Image' : 'Image + Text'
              return {
                title: title || 'Carousel Slide',
                subtitle: layoutText,
                media,
              }
            },
          },
        },
      ],
      validation: (Rule) => Rule.required().min(1).max(10),
    }),
    defineField({
      name: 'carouselSettings',
      title: 'Carousel Settings',
      type: 'object',
      options: {
        collapsible: true,
        collapsed: false,
      },
      fields: [
        defineField({
          name: 'autoplay',
          title: 'Autoplay',
          type: 'boolean',
          description: 'Automatically advance slides',
          initialValue: false,
        }),
        defineField({
          name: 'autoplayDelay',
          title: 'Autoplay Delay (seconds)',
          type: 'number',
          description: 'Time between slide changes when autoplay is enabled',
          initialValue: 5,
          validation: (Rule) => Rule.min(1).max(15),
          hidden: ({parent}) => !parent?.autoplay,
        }),
        defineField({
          name: 'showPagination',
          title: 'Show Pagination Dots',
          type: 'boolean',
          description: 'Show dots at the bottom for navigation',
          initialValue: true,
        }),
        defineField({
          name: 'showNavigation',
          title: 'Show Navigation Arrows',
          type: 'boolean',
          description: 'Show previous/next arrows',
          initialValue: true,
        }),
        defineField({
          name: 'loop',
          title: 'Loop Slides',
          type: 'boolean',
          description: 'Return to first slide after last slide',
          initialValue: true,
        }),

      ],
    }),
  ],
  preview: {
    select: {
      title: 'title.pl',
      slides: 'slides',
    },
    prepare({title, slides}) {
      const slideCount = Array.isArray(slides) ? slides.length : 0
      return {
        title: title || 'Text + Image Carousel',
        subtitle: `${slideCount} slide${slideCount !== 1 ? 's' : ''}`,
        media: slides?.[0]?.image,
      }
    },
  },
})