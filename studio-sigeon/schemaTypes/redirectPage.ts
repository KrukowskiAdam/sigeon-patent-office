import {defineField, defineType} from 'sanity'
import {LinkIcon} from '@sanity/icons'

export const redirectPage = defineType({
  name: 'redirectPage',
  title: 'Redirect Pages',
  type: 'document',
  icon: LinkIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Nazwa wewnętrzna',
      type: 'string',
      description: 'Nazwa do identyfikacji w CMS (np. "Umów spotkanie - Newsletter grudzień 2024")',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'URL Slug',
      type: 'slug',
      description: '⚠️ WAŻNE: Link w newsletterze będzie w formacie: sigeon.pl/r/[slug]   |   Przykład: jeśli wpiszesz "umow-spotkanie", pełny link to: sigeon.pl/r/umow-spotkanie',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'destinationUrl',
      title: 'Docelowy URL',
      type: 'url',
      description: 'Zewnętrzny link, na który zostanie przekierowany użytkownik (np. link do Calendly, formularza kontaktowego, itp.)',
      validation: (Rule) => 
        Rule.required().uri({
          scheme: ['http', 'https']
        }),
    }),
    defineField({
      name: 'redirectType',
      title: 'Typ przekierowania',
      type: 'string',
      options: {
        list: [
          {title: 'Permanentne (301) - nie zmieniaj po publikacji', value: '301'},
          {title: 'Tymczasowe (302) - polecane dla newsletterów', value: '302'},
        ],
      },
      initialValue: '302',
      description: '💡 Dla newsletterów wybierz 302 (tymczasowe), żeby móc zmienić docelowy link w przyszłości',
    }),
    defineField({
      name: 'isActive',
      title: 'Aktywne',
      type: 'boolean',
      description: 'Odznacz, aby tymczasowo wyłączyć przekierowanie (użytkownicy zobaczą błąd 404)',
      initialValue: true,
    }),
    defineField({
      name: 'description',
      title: 'Opis wewnętrzny',
      type: 'text',
      rows: 3,
      description: 'Opcjonalne notatki (np. "Użyte w newsletterze grudniowym 2024")',
    }),
    defineField({
      name: 'createdFor',
      title: 'Utworzone dla',
      type: 'string',
      description: 'Kampania lub cel (np. "Newsletter listopadowy", "Stopka strony")',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      slug: 'slug.current',
      destination: 'destinationUrl',
      isActive: 'isActive',
    },
    prepare({title, slug, destination, isActive}) {
      return {
        title: title,
        subtitle: `/r/${slug} → ${destination}${!isActive ? ' (Nieaktywne)' : ''}`,
        media: LinkIcon,
      }
    },
  },
})
