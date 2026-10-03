import { CTABlockConfig } from '@/_components/blocks/CTA'
import { RichTextConfig } from '@/_components/blocks/RichText'
import { tFn } from '@/_config/i18n/'
import { rowField } from '@/collections/_fields/Flex'
import { TitleField } from '@/collections/_lib/Text'
import { listDisabled } from '@/lib/collectionAdminSwitches'
import type { Template } from '@/payload-types'
import type { CollectionConfig } from 'payload'

const Templates: CollectionConfig = {
  slug: 'templates',
  admin: { useAsTitle: 'title', groupBy: true, defaultColumns: ['title', 'updatedAt'] },
  labels: { singular: tFn('title:template'), plural: tFn('title:templates') },
  timestamps: true,
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Data',
          fields: [
            rowField({}, TitleField({ required: true }), {
              name: 'type',
              type: 'select',
              options: ['Call to Action', 'RichText'],
              required: true,
            }),
            {
              type: 'blocks',
              name: 'blockConfig',
              label: false,
              blocks: [CTABlockConfig, RichTextConfig],
              filterOptions: ({ siblingData }) => {
                switch ((siblingData as Template).type) {
                  case 'Call to Action':
                    return ['cta']
                  case 'RichText':
                    return ['rich-text']
                  default:
                    return []
                }
              },
              admin: { ...listDisabled, condition: (data) => data?.type },
              required: true,
              minRows: 1,
              maxRows: 1,
            },
          ],
        },
        { label: 'Metrics', fields: [{ type: 'json', name: 'usees', virtual: true }] },
        { label: 'Admin', fields: [] },
      ],
    },
  ],
}

export default Templates
