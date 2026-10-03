import { baseFields } from '@/_components/blocks/Button'
import { conditionFnBlock } from '@/lib/condition'
import { slugifyOptions } from '@/lib/normalize'
import type { Block } from 'payload'

export const ButtonModalBlockConfig: Block = {
  interfaceName: 'ButtonModalBlock',
  slug: 'button-modal',
  fields: [
    ...baseFields,
    {
      type: 'group',
      name: 'action',
      custom: {
        layout: {
          direction: 'column',
        },
        labelSize: 'base',
      },
      fields: [
        {
          type: 'select',
          name: 'type',
          options: slugifyOptions(
            'Open Modal',
            'Set Page',
            'Next Page',
            'Preview Page',
            'Redirect',
            'Close Modal'
          ),
        },
        {
          type: 'text',
          name: 'setPageSlug',
          admin: {
            condition: conditionFnBlock({
              key: 'type',
              equals: 'set-page',
            }).siblingDataEq,
          },
        },
        {
          type: 'relationship',
          relationTo: 'routes',
          name: 'redirect',
          admin: {
            condition: conditionFnBlock({
              key: 'type',
              equals: 'redirect',
            }).siblingDataEq,
          },
        },
      ],
    },
  ],
}

export const ButtonOpenModalBlockConfig: Block = {
  interfaceName: 'ButtonModalOpenBlock',
  slug: 'button-modal-open',
  fields: [...baseFields],
}
