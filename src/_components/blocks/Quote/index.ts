import { editorPlainRich } from '@/_components/lexicals/plainRich'
import { normalizeSelectOptions } from '@/lib/normalize'
import type { Block } from 'payload'

export const QuoteBlockConfig: Block = {
  slug: 'quote',
  admin: {
    images: {
      icon: {
        url: '/lexicalIcons/pageGroup.svg',
        alt: 'Quote Block',
      },
    },
  },

  fields: [
    {
      type: 'select',
      name: 'style',
      options: normalizeSelectOptions('narrow', 'large', 'withImage'),
    },
    {
      type: 'group',
      name: 'by',
      fields: [
        {
          type: 'text',
          name: 'name',
          required: true,
          defaultValue: 'Anonymous',
        },
        { type: 'text', name: 'organization' },
        { type: 'text', name: 'website' },
      ],
    },
    {
      type: 'richText',
      name: 'content',
      editor: editorPlainRich,
    },
    {
      type: 'upload',
      name: 'image',
      relationTo: 'media',
      admin: {
        condition: (_data, _siblingData, { blockData }) => blockData?.style == 'withImage',
      },
    },
  ],
}
