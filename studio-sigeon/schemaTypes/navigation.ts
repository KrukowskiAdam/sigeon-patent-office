import {defineField, defineType} from 'sanity'

export const navigation = defineType({
  name: 'navigation',
  title: 'Navigation',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Navigation Title',
      type: 'string',
      description: 'Internal title for this navigation (e.g., "Main Navigation")',
    }),
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
            pl: 'Biomed',
            en: 'Biomed'
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
              title: 'Link',
              type: 'string',
              validation: Rule => Rule.required(),
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
    defineField({
      name: 'cta',
      title: 'Call to Action Button',
      type: 'object',
      description: 'Optional CTA button in navigation',
      fields: [
        {
          name: 'show',
          title: 'Show CTA Button',
          type: 'boolean',
          initialValue: false,
        },
        {
          name: 'text',
          title: 'Button Text',
          type: 'localizedString',
        },
        {
          name: 'link',
          title: 'Button Link',
          type: 'string',
        },
        {
          name: 'style',
          title: 'Button Style',
          type: 'string',
          options: {
            list: [
              {title: 'Primary', value: 'primary'},
              {title: 'Secondary', value: 'secondary'},
              {title: 'Outline', value: 'outline'},
            ],
          },
          initialValue: 'primary',
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      itemCount: 'menuItems',
    },
    prepare(selection) {
      const {title, itemCount} = selection
      const count = Array.isArray(itemCount) ? itemCount.length : 0
      return {
        title: title || 'Navigation',
        subtitle: `${count} menu item${count !== 1 ? 's' : ''}`,
      }
    },
  },
})