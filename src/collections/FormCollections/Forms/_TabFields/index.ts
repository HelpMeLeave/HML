import { columnField } from '@/collections/_fields/Flex'
import { ALL_FIELDS } from '@/lib/constants/ALL_FIELDS'
import type { UnnamedTab } from 'payload'

export const FieldsTab: UnnamedTab = {
  label: 'Fields',
  fields: [
    columnField(
      { label: { type: 'lg', text: 'Fields' } },
      {
        name: 'fields',
        type: 'blocks',
        label: false,
        admin: { className: '*:[header]:sr-only' },
        blocks: ALL_FIELDS,
      }
    ),
  ],
}
