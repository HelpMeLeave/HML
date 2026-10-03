import type { NumberField } from 'payload'

export const widthField: NumberField = {
  name: 'width',
  type: 'number',
  label: 'Field Width',
  admin: {
    description: 'Width of a row (70 is 70%)',
    className: 'flex-1! min-50!',
    step: 10,
  },
  required: true,
  defaultValue: 50,
}
