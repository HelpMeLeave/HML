import { columnField, rowField } from '@/collections/_fields/Flex'
import { createRowLabel } from '@/collections/_labels/RowLabel/rowLabelEl'
import { DescriptionField, TextConfig } from '@/collections/_lib/Text'
import { BeforeChange, RoutesBeforeChange } from '@/globals/GlobalSettings/NavTabs/_hooks'
import { toTitleCase } from '@/lib/textCasing'
import type { ArrayField, Block, Condition, RelationshipField } from 'payload'

const DropDownLinks: ArrayField = {
  type: 'array',
  name: 'links',
  admin: {
    initCollapsed: true,
    components: {
      RowLabel: createRowLabel({ slug: 'displayText', ifEmpty: '[ LINK ]' }),
    },
  },
  fields: [
    rowField(
      {},
      columnField(
        {},
        {
          type: 'relationship',
          relationTo: ['routes', 'externalResources'],
          name: 'item',
          required: true,
          hooks: {
            beforeChange: [await BeforeChange('siblingData')],
          },
        },
        TextConfig('displayText')
      ),
      DescriptionField({ admin: { rows: 6 } })
    ),
  ],
}

const DropDown = (type: 'menu' | 'link'): Block => {
  const hasLink = type == 'link'
  const condition: Condition = (_data, sibling) => !hasLink || sibling?.item

  const textField = TextConfig('displayText', { condition })
  const linkField: RelationshipField = {
    type: 'relationship',
    relationTo: 'routes',
    name: 'item',
    hooks: { beforeChange: [RoutesBeforeChange] },
  }

  return {
    slug: `${type == 'menu' ? 'menu' : 'nav'}-drop-down`,
    labels: { singular: `Dropdown ${toTitleCase(type)}`, plural: `Dropdown ${toTitleCase(type)}s` },
    fields: [
      hasLink ? rowField({}, linkField, textField) : textField,
      DescriptionField({ admin: { condition } }),
      DropDownLinks,
    ],
  }
}

export const DropdownBlock: Block = DropDown('link')
export const DropdownMenu: Block = DropDown('menu')
