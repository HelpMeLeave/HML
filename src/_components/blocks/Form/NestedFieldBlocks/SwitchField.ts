import { SubformBlock } from '@/_components/blocks/Form/NestedFieldBlocks/SubFormField'
import { blockLabelPath, rowLabelPath } from '@/_components/blocks/Form/_lib/paths'
import { columnField, rowField } from '@/collections/_fields/Flex'
import { BASE_FIELDS } from '@/lib/constants/FORM_FIELDS'
import type { BlockFields } from '@payloadcms/richtext-lexical'
import type { Block } from 'payload'
import { fieldBase } from '../_lib/fieldBase'
import { fieldColWithRequired } from '../_lib/fieldColWithRequired'
import { labelField } from '../_lib/labelField'
import { rowDefaultValueField } from '../_lib/rowDefaultValueField'
import { rowNameLabel } from '../_lib/rowNameLabel'

export const SwitchFieldCheckbox: Block = {
  ...fieldBase('switch checkbox'),
  admin: {
    group: 'Conditional & Layout Fields',
    disableBlockName: true,
    components: {
      Label: {
        path: rowLabelPath,
      },
    },
  },
  fields: [
    columnField(
      {},
      rowDefaultValueField('checkbox'),
      rowNameLabel,
      rowField(
        {},
        {
          type: 'blocks',
          name: 'questionsIfChecked',
          label: false,
          blocks: [SubformBlock],
          defaultValue: [
            {
              blockType: 'formFieldSubform',
              blockName: 'If Checked...',
            } as BlockFields,
          ],
          maxRows: 1,
        },
        {
          type: 'blocks',
          name: 'questionsIfUnchecked',
          label: false,
          blocks: [SubformBlock],
          defaultValue: [
            {
              blockName: 'If Not Checked...',
              blockType: 'formFieldSubform',
            },
          ],
          maxRows: 1,
        }
      )
    ),
  ],
  labels: {
    plural: 'Checkbox Fields',
    singular: 'Checkbox',
  },
}

export const SwitchFieldRadio: Block = {
  ...fieldBase('switch radio'),
  admin: {
    group: 'Conditional & Layout Fields',
    components: {
      Label: {
        path: blockLabelPath,
      },
    },
  },
  fields: fieldColWithRequired(rowNameLabel, {
    type: 'array',
    name: 'options',
    admin: {
      components: {
        RowLabel: rowLabelPath,
      },
    },
    fields: [
      rowField(
        {},
        labelField({
          required: true,
        }),
        {
          type: 'text',
          name: 'value',
          required: true,
        }
      ),
      {
        type: 'blocks',
        name: 'questionsIfSelected',
        blocks: BASE_FIELDS,
        defaultValue: [],
      },
      {
        type: 'blocks',
        name: 'questionsIfUnselected',
        blocks: BASE_FIELDS,
        defaultValue: [],
      },
    ],
  }),
}
