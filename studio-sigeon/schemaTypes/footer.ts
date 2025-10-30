import { defineType } from 'sanity'
import { localizedString, localizedText } from './locale'

export default defineType({
  name: 'footer',
  title: 'Footer',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Tytuł strony',
      type: 'string',
      description: 'Wewnętrzny tytuł dla administracji',
      initialValue: 'Footer strony'
    },
    {
      name: 'column1',
      title: 'Kolumna 1',
      type: 'object',
      fields: [
        {
          name: 'title',
          title: 'Tytuł kolumny',
          type: localizedString.name,
          validation: Rule => Rule.required()
        },
        {
          name: 'content',
          title: 'Treść kolumny',
          type: localizedText.name,
          validation: Rule => Rule.required()
        },
        {
          name: 'buttonText',
          title: 'Tekst przycisku',
          type: localizedString.name,
          description: 'Tekst wyświetlany na przycisku (opcjonalne)'
        },
        {
          name: 'buttonUrl',
          title: 'URL przycisku',
          type: 'string',
          description: 'URL do którego ma kierować przycisk (np. /about, /team, https://example.com)'
        }
      ]
    },
    {
      name: 'column2',
      title: 'Kolumna 2',
      type: 'object',
      fields: [
        {
          name: 'title',
          title: 'Tytuł kolumny',
          type: localizedString.name,
          validation: Rule => Rule.required()
        },
        {
          name: 'content',
          title: 'Treść kolumny',
          type: localizedText.name,
          validation: Rule => Rule.required()
        },
        {
          name: 'buttonText',
          title: 'Tekst przycisku',
          type: localizedString.name,
          description: 'Tekst wyświetlany na przycisku (opcjonalne)'
        },
        {
          name: 'buttonUrl',
          title: 'URL przycisku',
          type: 'string',
          description: 'URL do którego ma kierować przycisk (np. /about, /team, https://example.com)'
        }
      ]
    },
    {
      name: 'column3',
      title: 'Kolumna 3',
      type: 'object',
      fields: [
        {
          name: 'title',
          title: 'Tytuł kolumny',
          type: localizedString.name,
          validation: Rule => Rule.required()
        },
        {
          name: 'content',
          title: 'Treść kolumny',
          type: localizedText.name,
          validation: Rule => Rule.required()
        },
        {
          name: 'buttonText',
          title: 'Tekst przycisku',
          type: localizedString.name,
          description: 'Tekst wyświetlany na przycisku (opcjonalne)'
        },
        {
          name: 'buttonUrl',
          title: 'URL przycisku',
          type: 'string',
          description: 'URL do którego ma kierować przycisk (np. /about, /team, https://example.com)'
        }
      ]
    },
    {
      name: 'column4',
      title: 'Kolumna 4',
      type: 'object',
      fields: [
        {
          name: 'title',
          title: 'Tytuł kolumny',
          type: localizedString.name,
          validation: Rule => Rule.required()
        },
        {
          name: 'content',
          title: 'Treść kolumny',
          type: localizedText.name,
          validation: Rule => Rule.required()
        },
        {
          name: 'buttonText',
          title: 'Tekst przycisku',
          type: localizedString.name,
          description: 'Tekst wyświetlany na przycisku (opcjonalne)'
        },
        {
          name: 'buttonUrl',
          title: 'URL przycisku',
          type: 'string',
          description: 'URL do którego ma kierować przycisk (np. /about, /team, https://example.com)'
        }
      ]
    },
    {
      name: 'copyrightText',
      title: 'Tekst copyright',
      type: localizedString.name,
      description: 'Tekst wyświetlany na dole stopki'
    }
  ],
  preview: {
    select: {
      title: 'title'
    }
  }
})