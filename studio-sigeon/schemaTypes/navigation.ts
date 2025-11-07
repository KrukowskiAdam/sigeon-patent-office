import {defineField, defineType} from 'sanity'

export const navigation = defineType({
  name: 'navigation',
  title: 'Navigation',
  type: 'document',
  fields: [
    defineField({
      name: 'menuItems',
      title: 'Menu Items',
      type: 'array',
      initialValue: [
        {
          _type: 'menuItem',
          _key: 'patent-attorneys',
          label: {
            pl: 'Rzecznicy patentowi',
            en: 'Patent Attorneys'
          },
          link: '/rzecznicy-patentowi',
          isExternal: false,
          showInNavigation: true,
          order: 1
        },
        {
          _type: 'menuItem',
          _key: 'legal-services',
          label: {
            pl: 'Usługi prawne',
            en: 'Legal Services'
          },
          link: '/uslugi-prawne',
          isExternal: false,
          showInNavigation: true,
          order: 2
        },
        {
          _type: 'menuItem',
          _key: 'business-consulting',
          label: {
            pl: 'Doradztwo biznesowe IP',
            en: 'Business IP Consulting'
          },
          link: '/doradztwo-biznesowe-ip',
          isExternal: false,
          showInNavigation: true,
          order: 3
        },
        {
          _type: 'menuItem',
          _key: 'biomed',
          label: {
            pl: 'BioMed',
            en: 'BioMed'
          },
          link: '/biomed',
          isExternal: false,
          showInNavigation: true,
          order: 4
        }
      ],
      of: [
        {
          type: 'object',
          name: 'menuItem',
          title: 'Menu Item',
          fields: [
            {
              name: 'label',
              title: 'Label',
              type: 'localizedString',
              validation: Rule => Rule.required(),
            },
            {
              name: 'link',
              title: 'Link',
              type: 'string',
              description: 'URL or path (e.g., /about, /services, https://example.com)',
              validation: Rule => Rule.required(),
            },
            {
              name: 'isExternal',
              title: 'External Link',
              type: 'boolean',
              description: 'Check if this link opens in a new tab',
              initialValue: false,
            },
            {
              name: 'showInNavigation',
              title: 'Show in Navigation',
              type: 'boolean',
              description: 'Uncheck to hide this item from navigation',
              initialValue: true,
            },
            {
              name: 'order',
              title: 'Order',
              type: 'number',
              description: 'Order in which this item appears (lower numbers first)',
            },
            {
              name: 'subItems',
              title: 'Sub Menu Items',
              type: 'array',
              description: 'Dropdown menu items',
              of: [
                {
                  type: 'object',
                  name: 'subMenuItem',
                  title: 'Sub Menu Item',
                  fields: [
                    {
                      name: 'label',
                      title: 'Label',
                      type: 'localizedString',
                    },
                    {
                      name: 'link',
                      title: 'Link',
                      type: 'string',
                    },
                    {
                      name: 'isExternal',
                      title: 'External Link',
                      type: 'boolean',
                      initialValue: false,
                    },
                  ],
                },
              ],
            },
          ],
          preview: {
            select: {
              title: 'label.pl',
              subtitle: 'link',
              showInNav: 'showInNavigation',
            },
            prepare(selection) {
              const {title, subtitle, showInNav} = selection
              return {
                title: title || 'Untitled',
                subtitle: `${subtitle}${showInNav === false ? ' (Hidden)' : ''}`,
              }
            },
          },
        },
      ],
    }),
    defineField({
      name: 'secondaryMenuItems',
      title: 'Secondary Menu Items (Top Bar)',
      type: 'array',
      description: 'Menu items for the top navigation bar',
      initialValue: [
        {
          _type: 'menuItem',
          _key: 'team',
          label: {
            pl: 'Zespół',
            en: 'Team'
          },
          link: '/team',
          isExternal: false,
          showInNavigation: true,
          order: 1
        },
        {
          _type: 'menuItem',
          _key: 'news',
          label: {
            pl: 'Aktualności',
            en: 'News'
          },
          link: '/news',
          languageSpecificLinks: {
            pl: '/news',
            en: '/news?lang=en'
          },
          isExternal: false,
          showInNavigation: true,
          order: 2
        },
        {
          _type: 'menuItem',
          _key: 'contact',
          label: {
            pl: 'Kontakt',
            en: 'Contact'
          },
          link: '/contact',
          isExternal: false,
          showInNavigation: true,
          order: 3
        }
      ],
      of: [
        {
          type: 'object',
          name: 'menuItem',
          title: 'Menu Item',
          fields: [
            {
              name: 'label',
              title: 'Label',
              type: 'localizedString',
              validation: Rule => Rule.required(),
            },
            {
              name: 'link',
              title: 'Link (Default)',
              type: 'string',
              validation: Rule => Rule.required(),
              description: 'Default link used for all languages if no language-specific links are provided',
            },
            {
              name: 'languageSpecificLinks',
              title: 'Language-Specific Links',
              type: 'object',
              description: '🌍 Optional: Different URLs for different languages. If not provided, default link will be used.',
              fields: [
                {
                  name: 'pl',
                  title: 'Polish Link',
                  type: 'string',
                  placeholder: '/news',
                },
                {
                  name: 'en',
                  title: 'English Link',
                  type: 'string',
                  placeholder: '/en/news',
                },
                {
                  name: 'zh',
                  title: 'Chinese Link',
                  type: 'string',
                  placeholder: '/zh/news',
                },
                {
                  name: 'ko',
                  title: 'Korean Link',
                  type: 'string',
                  placeholder: '/ko/news',
                },
                {
                  name: 'ja',
                  title: 'Japanese Link',
                  type: 'string',
                  placeholder: '/ja/news',
                },
                {
                  name: 'ru',
                  title: 'Russian Link',
                  type: 'string',
                  placeholder: '/ru/news',
                },
              ],
            },
            {
              name: 'isExternal',
              title: 'External Link',
              type: 'boolean',
              initialValue: false,
            },
            {
              name: 'showInNavigation',
              title: 'Show in Navigation',
              type: 'boolean',
              initialValue: true,
            },
            {
              name: 'order',
              title: 'Order',
              type: 'number',
            },
          ],
          preview: {
            select: {
              title: 'label.pl',
              subtitle: 'link',
              showInNav: 'showInNavigation',
            },
            prepare(selection) {
              const {title, subtitle, showInNav} = selection
              return {
                title: title || 'Untitled',
                subtitle: `${subtitle}${showInNav === false ? ' (Hidden)' : ''}`,
              }
            },
          },
        },
      ],
    }),
  ],
  preview: {
    select: {
      itemCount: 'menuItems',
    },
    prepare(selection) {
      const {itemCount} = selection
      const count = Array.isArray(itemCount) ? itemCount.length : 0
      return {
        title: 'Navigation',
        subtitle: `${count} menu item${count !== 1 ? 's' : ''}`,
      }
    },
  },
})