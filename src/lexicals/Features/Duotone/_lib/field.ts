import { toTitleCase } from '@/lib/textCasing'
import type { GroupField } from 'payload'
import { DUOTONES } from './DUOTONES'
import { DUOTONE_TWEAKS } from './filter'

const options = ['top', 'bottom', 'middle'].flatMap((y) =>
  ['left', 'right', 'center'].map((x) => ({
    value: `${y} ${x}`,
    label: toTitleCase(`${y} ${x}`),
  }))
)

export const duotoneFields: GroupField = {
  type: 'group',
  name: 'duotone',
  // admin: {
  //   condition: (_data, siblingData) => siblingData?.purpose == 'heading',
  // },
  fields: [
    {
      name: 'color',
      type: 'select',
      label: 'Color',
      admin: { readOnly: false },
      options: DUOTONES.map(({ value, label }) => ({ value, label })),
    },
    { type: 'select', name: 'position', options },
    {
      type: 'row',
      fields: Object.entries(DUOTONE_TWEAKS).map(([name, defaultValue]) => ({
        name,
        type: 'number',
        label: `${toTitleCase(name)} (%)`,
        defaultValue,
        min: 0,
        admin: { step: 5 },
      })),
    },
  ],
}
