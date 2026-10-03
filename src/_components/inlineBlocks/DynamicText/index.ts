import { columnField } from '@/collections/_fields/Flex'
import { normalizeSelectOptions } from '@/lib/normalize'
import type { Block } from 'payload'

export const DynamicTextInlineBlockConfig: Block = {
  slug: 'dynamic-text',
  interfaceName: 'DynamicTextBlock',
  admin: {
    components: {
      Label: '@/_components/inlineBlocks/DynamicText/Label',
    },
  },
  fields: [
    {
      required: true,
      type: 'select',
      name: 'value',
      options: normalizeSelectOptions('Current Date', 'Current Time', "Current User's Name"),
    },
    {
      type: 'group',
      name: 'format',
      fields: [
        columnField(
          {},
          { type: 'checkbox', name: 'bold' },
          { type: 'checkbox', name: 'italic' },
          { type: 'checkbox', name: 'underlined' }
        ),
      ],
    },
  ],
}
