import { blockLabelPath } from '@/_components/blocks/Form/_lib/paths'
import { columnField } from '@/collections/_fields/Flex'
import { BASE_FIELDS } from '@/lib/constants/FORM_FIELDS'
import { SWITCH_FIELDS } from '@/lib/constants/SWITCH_FIELDS'
import type { Block } from 'payload'
import { fieldBase } from '../_lib/fieldBase'

export const GroupFieldBlock: Block = {
  ...fieldBase('group'),
  admin: {
    group: 'Conditional & Layout Fields',
    components: {
      Label: {
        path: blockLabelPath,
      },
    },
  },
  fields: [
    columnField(
      {},
      {
        type: 'text',
        name: 'label',
      },
      {
        type: 'collapsible',
        label: 'Message',
        admin: {
          className:
            'collapsible-label:*:text-lg collapsible-label:h-10! collapsible-label:*:font-medium',
        },
        fields: [
          {
            type: 'richText',
            name: 'message',
          },
        ],
      },
      {
        type: 'collapsible',
        label: 'Fields',
        admin: {
          className:
            'collapsible-label:*:text-lg collapsible-label:h-10! collapsible-label:*:font-medium',
        },
        fields: [
          {
            type: 'blocks',
            name: 'fields',
            label: false,
            blocks: [...BASE_FIELDS, ...SWITCH_FIELDS],
          },
        ],
      }
    ),
  ],
}
