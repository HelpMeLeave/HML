import type { Block } from 'payload'

export const TemplateBlockConfig: Block = {
  slug: 'template',
  interfaceName: 'TemplateBlock',
  admin: {
    disableBlockName: true,
    images: {
      icon: {
        url: '/lexicalIcons/pageGroup.svg',
        alt: 'Call to Action Block',
      },
    },
  },
  fields: [
    {
      type: 'relationship',
      relationTo: 'templates',
      name: 'template',
      admin: {
        appearance: 'drawer',
      },
      filterOptions: {
        type: {
          equals: 'RichText',
        },
      },
      required: true,
    },
  ],
}
