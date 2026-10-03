import { cn } from '@/lib/cn'
import { toTitleCase } from '@/lib/textCasing'
import type { Block, GroupField, RichTextField, SelectField } from 'payload'

const createFields = (name: string, count: number): GroupField => {
  const titleName = toTitleCase(name)

  const cols: RichTextField[] = []
  for (let i = 1; i <= count; i++) {
    cols.push({
      type: 'richText',
      name: `column${titleName}${i}`,
      label: 'Column',
    })
  }

  return {
    type: 'group',
    label: false,
    name: name,
    admin: {
      className: cn(`columns-block-${name}`),
      condition: (_data, _siblingData, { blockData }) => blockData?.size == name,
      hideGutter: true,
    },
    fields: cols,
  } as GroupField
}

const sizes = [
  {
    label: 'Halves',
    value: 'half',
    columns: 2,
  },
  {
    label: 'Thirds',
    value: 'third',
    columns: 3,
  },
  {
    label: 'Two Thirds | One Third',
    value: 'twoThirdsOneThird',
    columns: 2,
  },
  {
    label: 'One Third | Two Thirds',
    value: 'oneThirdTwoThirds',
    columns: 2,
  },
]

const columnSizeField: SelectField = {
  name: 'size',
  type: 'select',
  defaultValue: 'half',
  options: sizes,
}

export const ColumnsBlockConfig: Block = {
  slug: 'columns',
  interfaceName: 'ColumnsBlock',
  labels: {
    plural: 'Column Blocks',
    singular: 'Column',
  },
  admin: {
    group: 'layout',
    images: {
      icon: {
        url: '/lexicalIcons/pageGroup.svg',
        alt: 'Columns Block',
      },
    },
  },
  fields: [columnSizeField, ...sizes.map((ea) => createFields(ea.value, ea.columns))],
}
